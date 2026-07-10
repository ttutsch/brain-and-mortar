import { useState, type FormEvent } from 'react';
import { updatePassword } from '../lib/cloud';

interface Props {
  /** Called after the password is successfully changed. */
  onDone: () => void;
}

const MIN_PASSWORD = 6;

/**
 * Shown when the app opens via a password-reset email link (Supabase fires
 * PASSWORD_RECOVERY). The user is already in a temporary recovery session, so we
 * just set a new password on the account.
 */
export function SetNewPassword({ onDone }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
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
      await updatePassword(password);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the password.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="centered-screen">
      <div className="card">
        <h1 className="card-title">Set a new password</h1>
        <p className="card-subtitle">
          Choose a new grown-up password. You’ll use it to enter the Parent Zone.
        </p>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={MIN_PASSWORD}
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="new-password-confirm">Confirm password</label>
            <input
              id="new-password-confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save new password'}
          </button>
        </form>
      </div>
    </div>
  );
}
