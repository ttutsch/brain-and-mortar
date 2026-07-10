import { useRef, useState, type FormEvent } from 'react';
import type { FamilyAccount } from '../types';
import { verifyPassword } from '../lib/crypto';
import { Modal } from './Modal';

interface Props {
  account: FamilyAccount;
  /** When true, unlock is gated by the cloud grown-up account (not a local password). */
  cloudOwner: boolean;
  onUnlock: () => void;
  onCancel: () => void;
  /** Verify the cloud password (signs in). Throws on a wrong password. */
  onCloudUnlock: (password: string) => Promise<void>;
  /** Send a password-reset email (cloud owner). */
  onForgotPassword: () => Promise<void>;
  /** Clear the legacy local password lock (no-cloud fallback). */
  onResetLocalPassword: () => Promise<void>;
}

export function ParentZoneEntry({
  account, cloudOwner, onUnlock, onCancel,
  onCloudUnlock, onForgotPassword, onResetLocalPassword,
}: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (cloudOwner) {
        await onCloudUnlock(password); // throws on wrong password
        onUnlock();
      } else {
        const ok = await verifyPassword(
          password,
          account.parentPasswordSalt ?? '',
          account.parentPasswordHash ?? '',
        );
        if (ok) onUnlock();
        else setError('That password didn’t match. Please try again.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setError(/invalid login/i.test(msg) ? 'That password didn’t match. Please try again.' : (msg || 'Could not unlock.'));
    } finally {
      setBusy(false);
    }
  }

  async function forgot() {
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (cloudOwner) {
        await onForgotPassword();
        setInfo(`We’ve emailed a reset link to ${account.parentEmail}. Open it on this device to set a new password.`);
      } else {
        if (!window.confirm('Reset the Parent Zone lock on this device? You can set a new password afterward.')) {
          return;
        }
        await onResetLocalPassword();
        onUnlock();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start the reset.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      label="Parent Zone"
      onClose={onCancel}
      cardClassName="card"
      zIndex={200}
      dismissOnBackdrop={false}
      initialFocusRef={inputRef}
    >
      <h2 className="card-title" style={{ fontSize: 26 }}>Parent Zone</h2>
      <p className="card-subtitle">
        {cloudOwner
          ? <>This area is locked. Enter the grown-up password for <strong>{account.parentEmail}</strong>.</>
          : 'This area is locked. Enter the parent password to continue.'}
      </p>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="parent-zone-password">Password</label>
          <input
            id="parent-zone-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={inputRef}
            required
          />
        </div>
        {error && <p className="field-error" role="alert">{error}</p>}
        {info && <p className="muted" role="status" style={{ marginTop: 0 }}>{info}</p>}
        <div className="row between" style={{ alignItems: 'center' }}>
          <button type="button" className="btn btn-ghost" onClick={forgot} disabled={busy}>
            Forgot password?
          </button>
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Checking…' : 'Unlock'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
