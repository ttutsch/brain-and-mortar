import { useRef, useState, type FormEvent } from 'react';
import type { FamilyAccount } from '../types';
import { verifyPassword } from '../lib/crypto';
import { Modal } from './Modal';

interface Props {
  account: FamilyAccount;
  onUnlock: () => void;
  onCancel: () => void;
}

export function ParentZoneEntry({ account, onUnlock, onCancel }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const ok = await verifyPassword(
        password,
        account.parentPasswordSalt ?? '',
        account.parentPasswordHash ?? '',
      );
      if (ok) onUnlock();
      else setError('That password didn’t match. Please try again.');
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
          This area is locked. Enter the parent password to continue.
        </p>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="parent-zone-password">Parent password</label>
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
          <div className="row between">
            <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Checking…' : 'Unlock'}
            </button>
          </div>
        </form>
    </Modal>
  );
}
