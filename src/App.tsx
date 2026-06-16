import { useCallback, useEffect, useState } from 'react';
import './styles/components.css';
import type { FamilyAccount, Mission, PlayerProfile, PlayerProgress, PlayerSettings } from './types';
import { migrateProgress } from './types';
import { getStorage } from './storage';
import { effectiveTier } from './lib/tier';
import { applyMissionOutcome, applyPurchase, applyTripOutcome } from './lib/missionFlow';
import type { Cosmetic } from './data/cosmetics';
import { FamilyAccountCreate } from './components/FamilyAccountCreate';
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
  | 'parent-zone';

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

  const refreshProfiles = useCallback(async () => {
    const list = await getStorage().listProfiles();
    setProfiles(list);
  }, []);

  // Boot
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const storage = getStorage();
      const acc = await storage.getFamilyAccount();
      const profs = await storage.listProfiles();
      if (cancelled) return;
      setAccount(acc);
      setProfiles(profs);
      setBootLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

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
  }, [activeProfile]);

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
    setActiveTrip(null);
  }

  async function handleUpdateSettings(next: PlayerSettings) {
    if (!activeProfile) return;
    const current = profiles.find((p) => p.id === activeProfile.id) ?? activeProfile;
    const updated = { ...current, settings: next };
    await getStorage().saveProfile(updated);
    await refreshProfiles();
  }

  async function handleBuyCosmetic(cosmetic: Cosmetic) {
    if (!activeProgress) return;
    const next = applyPurchase(activeProgress, cosmetic);
    if (!next) return; // already owned or can't afford — Shop disables these anyway
    setActiveProgress(next);
    await getStorage().saveProgress(next);
  }

  if (bootLoading) {
    return (
      <div className="centered-screen">
        <p className="muted">Loading…</p>
      </div>
    );
  }

  if (!account) {
    return (
      <FamilyAccountCreate
        onCreated={(acc) => {
          setAccount(acc);
          setSubview('create-profile');
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
    return (
      <ParentZoneEntry
        account={account}
        onUnlock={() => setSubview('parent-zone')}
        onCancel={() => setSubview(activeProfile ? 'home' : 'picker')}
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
          onOpenParentZone={() => setSubview('parent-zone-entry')}
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
    />
  );
}
