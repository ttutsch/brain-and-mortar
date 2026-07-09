import { useState, type FormEvent } from 'react';
import type { FamilyAccount } from '../types';
import { generateSalt, hashPassword } from '../lib/crypto';
import { getStorage } from '../storage';

interface Props {
  /** The existing (kid-first) family to attach a grown-up to. */
  account: FamilyAccount;
  onDone: (claimed: FamilyAccount) => void;
  onCancel: () => void;
}

const MIN_PASSWORD = 6;

/**
 * Optional "set up a grown-up" step. Kid-first onboarding means the family
 * already exists; this *claims* it by attaching a parent email + Parent Zone
 * password. Reached from the Parent Zone, never as a front door.
 */
export function ParentSetup({ account, onDone, onCancel }: Props) {
  const [email, setEmail] = useState(account.parentEmail ?? '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords don’t match.');
      return;
    }

    setBusy(true);
    try {
      const salt = generateSalt();
      const hash = await hashPassword(password, salt);
      const claimed: FamilyAccount = {
        ...account,
        parentEmail: email.trim().toLowerCase(),
        parentPasswordHash: hash,
        parentPasswordSalt: salt,
      };
      await getStorage().saveFamilyAccount(claimed);
      onDone(claimed);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="centered-screen">
      <div className="card">
        <h1 className="card-title">Set up a grown-up</h1>
        <p className="card-subtitle">
          Add a grown-up’s email and a password to lock the Parent Zone. This is
          optional — kids can keep playing without it.
        </p>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="parent-email">Grown-up email</label>
            <input
              id="parent-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="parent-password">Parent Zone password</label>
            <input
              id="parent-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={MIN_PASSWORD}
            />
            <span className="muted" style={{ fontSize: '0.85em' }}>
              At least {MIN_PASSWORD} characters. Used to enter the Parent Zone.
            </span>
          </div>

          <div className="field">
            <label htmlFor="parent-password-confirm">Confirm password</label>
            <input
              id="parent-password-confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}

          <div className="row between">
            <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save grown-up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
