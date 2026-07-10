import { useState, type FormEvent } from 'react';
import type { FamilyAccount, PlayerProfile, Tier } from '../types';
import { effectiveTier, tierLabel } from '../lib/tier';
import type { Trip } from '../data/trips';
import { TRIPS } from '../data/trips';
import { AvatarDisc } from './AvatarDisc';
import { getStorage } from '../storage';

interface Props {
  account: FamilyAccount;
  profiles: PlayerProfile[];
  onClose: () => void;
  onProfilesChanged: () => void;
  /** Attach a grown-up (email + Parent Zone password) to the family. */
  onSetUpParent: () => void;
  /** Whether cloud sync is available on this build (Supabase configured). */
  cloudConfigured: boolean;
  /** Create a cloud family account (owner). Returns the family's join code. */
  onCreateCloudAccount: (email: string, password: string) => Promise<{ joinCode: string }>;
  onCloudSyncNow: () => Promise<void>;
  onCloudSignOut: () => Promise<void>;
  /** Preview a trip without earning its rewards — for demo purposes. */
  onPreviewTrip: (trip: Trip) => void;
}

export function ParentZone({
  account, profiles, onClose, onProfilesChanged, onPreviewTrip, onSetUpParent,
  cloudConfigured, onCreateCloudAccount, onCloudSyncNow, onCloudSignOut,
}: Props) {
  async function setOverride(profile: PlayerProfile, tier: Tier | null) {
    const updated = { ...profile, tierOverride: tier };
    await getStorage().saveProfile(updated);
    onProfilesChanged();
  }

  async function remove(profile: PlayerProfile) {
    if (!confirm(`Remove ${profile.displayName}'s profile? Their progress will be deleted.`)) return;
    await getStorage().deleteProfile(profile.id);
    onProfilesChanged();
  }

  const allTrips = Object.values(TRIPS);

  return (
    <div className="centered-screen">
      <div className="card card-wide">
        <div className="row between" style={{ marginBottom: 16 }}>
          <h1 className="card-title" style={{ margin: 0 }}>Parent Zone</h1>
          <button type="button" className="btn" onClick={onClose}>Done</button>
        </div>
        <p className="card-subtitle">
          Manage your kids’ profiles. A full dashboard (progress, time played, subject coverage) ships in a later phase.
        </p>

        <h2 className="card-title" style={{ fontSize: 18, marginTop: 10, marginBottom: 8 }}>Profiles</h2>
        {profiles.length === 0 ? (
          <p className="muted">No profiles yet. Add one from the picker.</p>
        ) : (
          <div className="stack" style={{ gap: 14 }}>
            {profiles.map((p) => {
              const tier = effectiveTier(p);
              return (
                <div key={p.id} className="row between" style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <div className="row gap-lg">
                    <AvatarDisc avatarId={p.avatarId} initial={p.displayName.slice(0, 1).toUpperCase()} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.displayName}</div>
                      <div className="muted" style={{ fontSize: '0.9em' }}>
                        Born {p.birthDate} · Tier: {tierLabel(tier)}
                        {p.tierOverride !== null && ' (manual override)'}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    <select
                      aria-label={`Override tier for ${p.displayName}`}
                      value={p.tierOverride ?? ''}
                      onChange={(e) => {
                        const v = e.target.value;
                        setOverride(p, v === '' ? null : (Number(v) as Tier));
                      }}
                      style={{ minHeight: 'var(--touch-min)', padding: '0 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                    >
                      <option value="">Auto (by age)</option>
                      <option value="1">Tier 1 (K–3)</option>
                      <option value="2">Tier 2 (4–6)</option>
                      <option value="3">Tier 3 (7–8)</option>
                    </select>
                    <button type="button" className="btn btn-ghost" onClick={() => remove(p)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <h2 className="card-title" style={{ fontSize: 18, marginTop: 26, marginBottom: 8 }}>
          Grown-up account
        </h2>
        {account.parentEmail ? (
          <p className="muted" style={{ marginTop: 0 }}>
            Linked to <strong>{account.parentEmail}</strong>. The Parent Zone is locked with a password.
          </p>
        ) : (
          <div className="row between" style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div>
              <strong>No grown-up linked yet</strong>
              <div className="muted" style={{ fontSize: '0.9em' }}>
                Add a grown-up to lock this area with a password. Optional — kids can keep playing without it.
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={onSetUpParent} style={{ flexShrink: 0 }}>
              Set up a grown-up
            </button>
          </div>
        )}

        {cloudConfigured && (
          <>
            <h2 className="card-title" style={{ fontSize: 18, marginTop: 26, marginBottom: 8 }}>
              Sync across devices
            </h2>
            <CloudSyncPanel
              account={account}
              onCreate={onCreateCloudAccount}
              onSyncNow={onCloudSyncNow}
              onSignOut={onCloudSignOut}
            />
          </>
        )}

        <h2 className="card-title" style={{ fontSize: 18, marginTop: 26, marginBottom: 8 }}>
          Demo: preview a trip
        </h2>
        <p className="muted" style={{ fontSize: '0.9em', marginTop: 0 }}>
          Trips fire automatically once an act is complete (all chapter repairs done). For now you can preview them here.
          Previewing earns no coins.
        </p>
        <div className="stack" style={{ gap: 8 }}>
          {allTrips.map((trip) => (
            <div key={trip.id} className="row between" style={{ padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <div>
                <strong>{trip.title}</strong>
                <div className="muted" style={{ fontSize: '0.85em' }}>{trip.destination} — Act I</div>
              </div>
              <button type="button" className="btn btn-ghost" onClick={() => onPreviewTrip(trip)}>
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudSyncPanel({
  account, onCreate, onSyncNow, onSignOut,
}: {
  account: FamilyAccount;
  onCreate: (email: string, password: string) => Promise<{ joinCode: string }>;
  onSyncNow: () => Promise<void>;
  onSignOut: () => Promise<void>;
}) {
  const linked = !!account.cloudFamilyId;
  const [email, setEmail] = useState(account.parentEmail ?? '');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function create(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setBusy(true);
    try {
      await onCreate(email, password);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the account.');
    } finally {
      setBusy(false);
    }
  }

  async function run(fn: () => Promise<void>, okMsg: string) {
    setBusy(true); setError(null); setStatus(null);
    try {
      await fn();
      setStatus(okMsg);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  if (linked) {
    return (
      <div className="stack" style={{ gap: 10 }}>
        <p className="muted" style={{ marginTop: 0 }}>
          {account.cloudRole === 'owner'
            ? 'This device owns the family. Share this code so your kids’ devices can join:'
            : 'This device is connected to your family and syncs automatically.'}
        </p>
        {account.cloudRole === 'owner' && account.joinCode && (
          <div
            aria-label={`Family code: ${account.joinCode.split('').join(' ')}`}
            style={{
              fontSize: 30, fontWeight: 800, letterSpacing: 8, fontFamily: 'monospace',
              background: 'var(--surface-2)', padding: '12px 16px',
              borderRadius: 'var(--radius)', textAlign: 'center',
            }}
          >
            {account.joinCode}
          </div>
        )}
        <div className="row" style={{ gap: 8 }}>
          <button type="button" className="btn btn-primary" onClick={() => run(onSyncNow, 'Synced ✓')} disabled={busy}>
            {busy ? 'Syncing…' : 'Sync now'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => run(onSignOut, 'Disconnected.')} disabled={busy}>
            Disconnect this device
          </button>
        </div>
        {status && <p className="muted" role="status" style={{ margin: 0 }}>{status}</p>}
        {error && <p className="field-error" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={create} noValidate className="stack" style={{ gap: 10 }}>
      <p className="muted" style={{ marginTop: 0 }}>
        Create a family account to sync players and progress across devices. You’ll get a
        code your kids enter on their own devices to join.
      </p>
      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="cloud-email">Grown-up email</label>
        <input id="cloud-email" type="email" autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="cloud-password">Password</label>
        <input id="cloud-password" type="password" autoComplete="new-password" value={password}
          onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Creating…' : 'Create family account'}
        </button>
      </div>
    </form>
  );
}
