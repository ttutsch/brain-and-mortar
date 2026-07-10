import { useState, type FormEvent } from 'react';
import type { PlayerProfile } from '../types';
import { effectiveTier, tierLabel } from '../lib/tier';
import { AvatarDisc } from './AvatarDisc';

interface Props {
  profiles: PlayerProfile[];
  onPick: (profile: PlayerProfile) => void;
  onAddProfile: () => void;
  /** Whether cloud sync is available on this build (Supabase configured). */
  cloudConfigured: boolean;
  /** Whether this device is already linked to a cloud family. */
  cloudLinked: boolean;
  /** Join a family with a code the grown-up shared. */
  onJoinFamily: (code: string) => Promise<void>;
}

export function ProfilePicker({
  profiles, onPick, onAddProfile, cloudConfigured, cloudLinked, onJoinFamily,
}: Props) {
  const [joinOpen, setJoinOpen] = useState(false);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function join(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (code.trim().length < 4) {
      setError('Enter the family code your grown-up shared.');
      return;
    }
    setBusy(true);
    try {
      await onJoinFamily(code);
      setJoinOpen(false);
      setCode('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not join — check the code and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="centered-screen">
      <div className="card card-wide">
        <h1 className="card-title">Who’s playing?</h1>
        <p className="card-subtitle">Tap your name to keep going.</p>

        <div className="picker-grid">
          {profiles.map((p) => {
            const tier = effectiveTier(p);
            const initial = p.displayName.slice(0, 1).toUpperCase();
            return (
              <button
                key={p.id}
                type="button"
                className="picker-tile"
                onClick={() => onPick(p)}
                aria-label={`Play as ${p.displayName}`}
              >
                <AvatarDisc avatarId={p.avatarId} initial={initial} />
                <span className="name">{p.displayName}</span>
                <span className="meta">{tierLabel(tier)}</span>
              </button>
            );
          })}

          <button
            type="button"
            className="picker-tile add"
            onClick={onAddProfile}
            aria-label="Add a new player"
          >
            <span className="avatar-disc" style={{ background: 'transparent', color: 'currentColor', boxShadow: 'none', border: '2px dashed currentColor' }}>+</span>
            <span className="name">Add player</span>
            <span className="meta">New profile</span>
          </button>
        </div>

        {cloudConfigured && !cloudLinked && (
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            {joinOpen ? (
              <form onSubmit={join} className="stack" style={{ gap: 10, maxWidth: 320, margin: '0 auto' }}>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor="join-code">Family code</label>
                  <input
                    id="join-code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    maxLength={8}
                    style={{ letterSpacing: 4, textAlign: 'center', fontFamily: 'monospace' }}
                    autoFocus
                  />
                </div>
                {error && <p className="field-error" role="alert">{error}</p>}
                <div className="row between">
                  <button type="button" className="btn btn-ghost" onClick={() => { setJoinOpen(false); setError(null); }} disabled={busy}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={busy}>
                    {busy ? 'Joining…' : 'Join family'}
                  </button>
                </div>
              </form>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => setJoinOpen(true)}>
                Have a family code? Join a family
              </button>
            )}
          </div>
        )}
        {cloudConfigured && cloudLinked && (
          <p className="muted" style={{ textAlign: 'center', marginTop: 18, fontSize: '0.9em' }}>
            ✓ Connected to your family — players sync across devices.
          </p>
        )}
      </div>
    </div>
  );
}
