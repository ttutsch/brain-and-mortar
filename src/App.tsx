import { useCallback, useEffect, useState } from 'react';
import './styles/components.css';
import type { FamilyAccount, Mission, PlayerProfile, PlayerProgress, PlayerSettings } from './types';
import { migrateProgress, unclaimedFamily, parentZoneLocked } from './types';
import { getStorage } from './storage';
import { generateId } from './lib/crypto';
import { isCloudConfigured } from './lib/supabase';
import {
  signUpOwner, signInOwner, createFamily, ensureAnonSession, joinFamily,
  pushProfile, pushProgress, pullFamily, signOutCloud,
  requestPasswordReset, onPasswordRecovery,
  type CloudSnapshot,
} from './lib/cloud';
import { effectiveTier } from './lib/tier';
import { applyMissionOutcome, applyPurchase, applyTripOutcome } from './lib/missionFlow';
import type { Cosmetic } from './data/cosmetics';
import { ParentSetup } from './components/ParentSetup';
import { SetNewPassword } from './components/SetNewPassword';
import { ProfileCreate } from './components/ProfileCreate';
import { ProfilePicker } from './components/ProfilePicker';
import { HomeView } from './components/HomeView';
import { ParentZoneEntry } from './components/ParentZoneEntry';
import { ParentZone } from './components/ParentZone';
import { MissionPlayer } from './components/MissionPlayer';
import type { MissionOutcome } from './components/MissionPlayer';
import { TripPlayer } from './components/TripPlayer';
import type { TripOutcome } from './components/TripPlayer';
import type { Trip } from './data/trips';

type Subview =
  | 'home'
  | 'picker'
  | 'create-profile'
  | 'parent-zone-entry'
  | 'parent-zone'
  | 'setup-parent';

export function App() {
  const [bootLoading, setBootLoading] = useState(true);
  const [account, setAccount] = useState<FamilyAccount | null>(null);
  const [profiles, setProfiles] = useState<PlayerProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<PlayerProfile | null>(null);
  const [activeProgress, setActiveProgress] = useState<PlayerProgress | null>(null);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [activeTrip, setActiveTrip] = useState<{ trip: Trip; replay: boolean } | null>(null);
  /** House item (or trampoline coda) that just landed — drives the glow celebration. */
  const [celebrateItemId, setCelebrateItemId] = useState<string | null>(null);
  const [subview, setSubview] = useState<Subview>('picker');
  /** True when the app was opened via a password-reset email link. */
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  const refreshProfiles = useCallback(async () => {
    const list = await getStorage().listProfiles();
    setProfiles(list);
  }, []);

  // Boot
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const storage = getStorage();
      // Kid-first: if there's no family yet, create an unclaimed one so the first
      // player can be made and start playing immediately — no grown-up required.
      let acc = await storage.getFamilyAccount();
      if (!acc) {
        acc = unclaimedFamily(generateId('fam'), new Date().toISOString());
        await storage.saveFamilyAccount(acc);
      }
      const profs = await storage.listProfiles();
      if (cancelled) return;
      setAccount(acc);
      setProfiles(profs);
      setBootLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // A password-reset email link returns to the app in recovery mode.
  useEffect(() => onPasswordRecovery(() => setPasswordRecovery(true)), []);

  // Load progress whenever the active profile changes; migrate older shapes.
  useEffect(() => {
    if (!activeProfile) {
      setActiveProgress(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const storage = getStorage();
      const raw = await storage.getProgress(activeProfile.id);
      const migrated = migrateProgress(raw, activeProfile.id);
      // Persist if we actually changed anything (i.e., added missing fields).
      if (raw === null || JSON.stringify(raw) !== JSON.stringify(migrated)) {
        await storage.saveProgress(migrated);
      }
      if (!cancelled) setActiveProgress(migrated);
    })();
    return () => { cancelled = true; };
    // Keyed on the profile *identity*: reload progress when the active profile
    // changes, but not when only its settings object is replaced (see
    // handleUpdateSettings) — storage already holds the latest progress.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile?.id]);

  // ---- Cloud sync (Phase 2, opt-in) ----------------------------------------
  // Cloud is source of truth on pull; every local save pushes. Simple
  // last-write-wins — fine for a family game; real conflict handling is future.
  async function mergeSnapshot(snap: CloudSnapshot) {
    const storage = getStorage();
    for (const p of snap.profiles) await storage.saveProfile(p);
    for (const pid of Object.keys(snap.progressByProfileId)) {
      await storage.saveProgress(snap.progressByProfileId[pid]);
    }
  }

  /** Push every local profile + its progress into the given cloud family. */
  async function pushAllLocal(familyId: string) {
    const storage = getStorage();
    const local = await storage.listProfiles();
    for (const p of local) {
      await pushProfile(familyId, p, await storage.getProgress(p.id));
    }
  }

  // Pull the family down whenever this device is linked (boot + right after linking).
  useEffect(() => {
    if (!isCloudConfigured() || !account?.cloudFamilyId) return;
    let cancelled = false;
    (async () => {
      try {
        const snap = await pullFamily();
        if (cancelled) return;
        await mergeSnapshot(snap);
        await refreshProfiles();
      } catch (e) {
        console.warn('[cloud] pull failed', e);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.cloudFamilyId]);

  async function handleCreateCloudAccount(email: string, password: string) {
    if (!account) throw new Error('No family yet');
    await signUpOwner(email, password);
    const fam = await createFamily();
    const updated: FamilyAccount = {
      ...account,
      parentEmail: email.trim().toLowerCase(),
      cloudFamilyId: fam.id,
      joinCode: fam.joinCode,
      cloudRole: 'owner',
    };
    await getStorage().saveFamilyAccount(updated);
    setAccount(updated);
    await pushAllLocal(fam.id); // upload the players already on this device
    return fam;
  }

  async function handleJoinFamily(code: string) {
    if (!account) throw new Error('No family yet');
    await ensureAnonSession();
    const familyId = await joinFamily(code);
    const updated: FamilyAccount = {
      ...account,
      cloudFamilyId: familyId,
      joinCode: code.trim().toUpperCase(),
      cloudRole: 'member',
    };
    await getStorage().saveFamilyAccount(updated);
    await pushAllLocal(familyId);        // contribute this device's players…
    await mergeSnapshot(await pullFamily()); // …then pull the whole family down
    await refreshProfiles();
    setAccount(updated); // set last so the pull effect doesn't double-run mid-join
  }

  async function handleCloudSyncNow() {
    if (!account?.cloudFamilyId) return;
    await pushAllLocal(account.cloudFamilyId);
    await mergeSnapshot(await pullFamily());
    await refreshProfiles();
  }

  async function handleCloudSignOut() {
    if (!account) return;
    try { await signOutCloud(); } catch (e) { console.warn('[cloud] sign-out', e); }
    const updated: FamilyAccount = { ...account };
    delete updated.cloudFamilyId;
    delete updated.joinCode;
    delete updated.cloudRole;
    await getStorage().saveFamilyAccount(updated);
    setAccount(updated);
  }

  async function handleMissionFinish(outcome: MissionOutcome) {
    if (!activeProgress) {
      setActiveMission(null);
      return;
    }
    const next = applyMissionOutcome(activeProgress, outcome);
    const newItem = next.completedHouseItemIds.find(
      (id) => !activeProgress.completedHouseItemIds.includes(id)
    );
    if (newItem) setCelebrateItemId(newItem);
    setActiveProgress(next);
    await getStorage().saveProgress(next);
    if (account?.cloudFamilyId) {
      pushProgress(account.cloudFamilyId, next).catch((e) => console.warn('[cloud] push', e));
    }
    setActiveMission(null);
  }

  async function handleTripFinish(outcome: TripOutcome) {
    if (!activeProgress || activeTrip?.replay) {
      setActiveTrip(null);
      return;
    }
    const firstOttawa =
      outcome.tripId === 'trip.act1.ottawa' &&
      !activeProgress.completedTripIds.includes(outcome.tripId);
    const next = applyTripOutcome(activeProgress, outcome);
    if (firstOttawa) setCelebrateItemId('coda.trampoline');
    setActiveProgress(next);
    await getStorage().saveProgress(next);
    if (account?.cloudFamilyId) {
      pushProgress(account.cloudFamilyId, next).catch((e) => console.warn('[cloud] push', e));
    }
    setActiveTrip(null);
  }

  async function handleUpdateSettings(next: PlayerSettings) {
    if (!activeProfile) return;
    const current = profiles.find((p) => p.id === activeProfile.id) ?? activeProfile;
    const updated = { ...current, settings: next };
    await getStorage().saveProfile(updated);
    // Keep the active profile in sync so the theme classes used by the mission
    // and trip screens (activeThemeClasses, below) reflect the new settings —
    // e.g. reduced-motion / high-contrast must reach the mini-games, not just home.
    setActiveProfile(updated);
    await refreshProfiles();
  }

  async function handleBuyCosmetic(cosmetic: Cosmetic) {
    if (!activeProgress) return;
    const next = applyPurchase(activeProgress, cosmetic);
    if (!next) return; // already owned or can't afford — Shop disables these anyway
    setActiveProgress(next);
    await getStorage().saveProgress(next);
    if (account?.cloudFamilyId) {
      pushProgress(account.cloudFamilyId, next).catch((e) => console.warn('[cloud] push', e));
    }
  }

  // account is auto-created at boot, so this also covers the brief pre-boot gap.
  if (bootLoading || !account) {
    return (
      <div className="centered-screen">
        <p className="muted">Loading…</p>
      </div>
    );
  }

  // Arrived via a password-reset email link — take priority over everything.
  if (passwordRecovery) {
    return (
      <SetNewPassword
        onDone={() => {
          setPasswordRecovery(false);
          setSubview(activeProfile ? 'home' : 'picker');
        }}
      />
    );
  }

  const isFirstProfile = profiles.length === 0;

  if (isFirstProfile || subview === 'create-profile') {
    return (
      <ProfileCreate
        familyId={account.id}
        isFirst={isFirstProfile}
        onCreated={async (profile) => {
          await refreshProfiles();
          if (account.cloudFamilyId) {
            pushProfile(account.cloudFamilyId, profile, await getStorage().getProgress(profile.id))
              .catch((e) => console.warn('[cloud] push profile', e));
          }
          if (isFirstProfile) {
            setActiveProfile(profile);
            setSubview('home');
          } else {
            setSubview('picker');
          }
        }}
        onCancel={isFirstProfile ? undefined : () => setSubview('picker')}
      />
    );
  }

  if (subview === 'parent-zone-entry') {
    const cloudOwner = isCloudConfigured() && account.cloudRole === 'owner' && !!account.parentEmail;
    return (
      <ParentZoneEntry
        account={account}
        cloudOwner={cloudOwner}
        onUnlock={() => setSubview('parent-zone')}
        onCancel={() => setSubview(activeProfile ? 'home' : 'picker')}
        onCloudUnlock={(password) => signInOwner(account.parentEmail!, password).then(() => {})}
        onForgotPassword={() => requestPasswordReset(account.parentEmail!)}
        onResetLocalPassword={async () => {
          const updated: FamilyAccount = { ...account };
          delete updated.parentPasswordHash;
          delete updated.parentPasswordSalt;
          await getStorage().saveFamilyAccount(updated);
          setAccount(updated);
        }}
      />
    );
  }

  if (subview === 'setup-parent') {
    return (
      <ParentSetup
        account={account}
        onDone={(claimed) => {
          setAccount(claimed);
          setSubview('parent-zone');
        }}
        onCancel={() => setSubview('parent-zone')}
      />
    );
  }

  if (subview === 'parent-zone') {
    return (
      <ParentZone
        account={account}
        profiles={profiles}
        onClose={() => setSubview('picker')}
        onProfilesChanged={refreshProfiles}
        onSetUpParent={() => setSubview('setup-parent')}
        cloudConfigured={isCloudConfigured()}
        onCreateCloudAccount={handleCreateCloudAccount}
        onCloudSyncNow={handleCloudSyncNow}
        onCloudSignOut={handleCloudSignOut}
        onPreviewTrip={(trip) => {
          setActiveTrip({ trip, replay: true });
          setSubview('home');
        }}
      />
    );
  }

  const activeThemeClasses = activeProfile
    ? [
        activeProfile.settings.highContrast ? 'theme-contrast' : '',
        activeProfile.settings.dyslexiaFont ? 'font-dyslexic' : '',
        activeProfile.settings.reducedMotion ? 'reduce-motion' : '',
      ].filter(Boolean).join(' ')
    : '';

  // Trip takes priority over mission (a trip is the biggest reward).
  if (activeTrip && activeProfile) {
    return (
      <div className={`app-theme ${activeThemeClasses}`}>
        <TripPlayer
          trip={activeTrip.trip}
          replay={activeTrip.replay}
          onFinish={handleTripFinish}
          onCancel={() => setActiveTrip(null)}
        />
      </div>
    );
  }

  // An active mission takes priority over the home view.
  if (activeMission && activeProfile) {
    return (
      <div className={`app-theme ${activeThemeClasses}`}>
        <MissionPlayer
          mission={activeMission}
          tier={effectiveTier(activeProfile)}
          progress={activeProgress}
          onFinish={handleMissionFinish}
          onCancel={() => setActiveMission(null)}
          reducedMotion={activeProfile.settings.reducedMotion}
        />
      </div>
    );
  }

  if (subview === 'home' && activeProfile) {
    const fresh = profiles.find((p) => p.id === activeProfile.id) ?? activeProfile;
    const themeClasses = [
      fresh.settings.highContrast ? 'theme-contrast' : '',
      fresh.settings.dyslexiaFont ? 'font-dyslexic' : '',
      fresh.settings.reducedMotion ? 'reduce-motion' : '',
    ].filter(Boolean).join(' ');
    return (
      <div className={`app-theme ${themeClasses}`}>
        <HomeView
          profile={fresh}
          progress={activeProgress}
          onExit={() => {
            setActiveProfile(null);
            setSubview('picker');
          }}
          onOpenParentZone={() =>
            setSubview(parentZoneLocked(account, isCloudConfigured()) ? 'parent-zone-entry' : 'parent-zone')
          }
          onStartMission={(m) => setActiveMission(m)}
          onStartTrip={(t) => setActiveTrip({ trip: t, replay: false })}
          onReliveTrip={(t) => setActiveTrip({ trip: t, replay: true })}
          onBuyCosmetic={handleBuyCosmetic}
          onUpdateSettings={handleUpdateSettings}
          celebrateItemId={celebrateItemId}
          onCelebrationDone={() => setCelebrateItemId(null)}
        />
      </div>
    );
  }

  return (
    <ProfilePicker
      profiles={profiles}
      onPick={(profile) => {
        setActiveProfile(profile);
        setSubview('home');
      }}
      onAddProfile={() => setSubview('create-profile')}
      cloudConfigured={isCloudConfigured()}
      cloudLinked={!!account.cloudFamilyId}
      onJoinFamily={handleJoinFamily}
    />
  );
}
