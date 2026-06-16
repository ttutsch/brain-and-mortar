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
  /** Preview a trip without earning its rewards — for demo purposes. */
  onPreviewTrip: (trip: Trip) => void;
}

export function ParentZone({
  account: _account, profiles, onClose, onProfilesChanged, onPreviewTrip,
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
