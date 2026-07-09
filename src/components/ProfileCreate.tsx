import { useMemo, useState, type FormEvent } from 'react';
import type { PlayerProfile } from '../types';
import { defaultSettings, defaultProgress } from '../types';
import { AVATARS } from '../data/avatars';
import { generateId } from '../lib/crypto';
import { ageInYears, tierForAge, tierLabel } from '../lib/tier';
import { getStorage } from '../storage';
import { AvatarPicker } from './AvatarPicker';

interface Props {
  familyId: string;
  isFirst?: boolean;
  onCreated: (profile: PlayerProfile) => void;
  onCancel?: () => void;
}

function isoDateNYearsAgo(years: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().slice(0, 10);
}

export function ProfileCreate({ familyId, isFirst, onCreated, onCancel }: Props) {
  const [displayName, setDisplayName] = useState('');
  const [birthDate, setBirthDate] = useState(isoDateNYearsAgo(8));
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const previewTier = useMemo(() => {
    try {
      return tierForAge(ageInYears(birthDate));
    } catch {
      return null;
    }
  }, [birthDate]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const name = displayName.trim();
    if (name.length < 1 || name.length > 24) {
      setError('Please enter a name (1–24 characters).');
      return;
    }
    if (!birthDate) {
      setError('Please pick a birth date.');
      return;
    }
    const age = ageInYears(birthDate);
    if (age < 4) {
      setError("That birth date looks too young. Players should be at least 4.");
      return;
    }
    if (age > 18) {
      setError('Player profiles are for kids — please pick a birth date for a child.');
      return;
    }

    setBusy(true);
    try {
      const profile: PlayerProfile = {
        id: generateId('plr'),
        familyId,
        displayName: name,
        avatarId,
        birthDate,
        tierOverride: null,
        createdAt: new Date().toISOString(),
        settings: defaultSettings(),
      };
      const storage = getStorage();
      await storage.saveProfile(profile);
      await storage.saveProgress(defaultProgress(profile.id));
      onCreated(profile);
    } catch (err) {
      console.error(err);
      setError('Something went wrong creating the profile. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const initial = (displayName.trim() || 'T').slice(0, 1).toUpperCase();

  return (
    <div className="centered-screen">
      <div className="card">
        {isFirst && <span className="badge">Brain &amp; Mortar</span>}
        <h1 className="card-title">{isFirst ? 'Welcome! Create your player' : 'Add a player'}</h1>
        <p className="card-subtitle">
          {isFirst
            ? 'Pick a name, an avatar, and your age — then start playing right away. No grown-up needed; one can add a Parent Zone later.'
            : 'One profile per kid. Their age picks the right tier of content; you can adjust later in the Parent Zone.'}
        </p>

        <form onSubmit={submit} noValidate>
          <div className="row gap-lg" style={{ marginBottom: 18 }}>
            <div
              className="avatar-disc lg"
              style={{
                background: AVATARS.find((a) => a.id === avatarId)?.color ?? '#D77A52',
              }}
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="stack" style={{ flex: 1 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="profile-name">Player name</label>
                <input
                  id="profile-name"
                  type="text"
                  autoComplete="off"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={24}
                  placeholder="Their first name or a nickname"
                  required
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="profile-birthdate">Birth date</label>
            <input
              id="profile-birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              max={isoDateNYearsAgo(4)}
            />
            {previewTier !== null && (
              <span className="muted" style={{ fontSize: '0.9em' }}>
                Starting tier: <strong>{tierLabel(previewTier)}</strong>
              </span>
            )}
          </div>

          <div className="field">
            <label>Pick an avatar color</label>
            <AvatarPicker value={avatarId} onChange={setAvatarId} />
          </div>

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}

          <div className="row between">
            {onCancel ? (
              <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
                Cancel
              </button>
            ) : <span />}
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : isFirst ? 'Start playing' : 'Add player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
