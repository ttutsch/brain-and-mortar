import { useState, type FormEvent } from 'react';
import type { FamilyAccount } from '../types';
import { verifyPassword } from '../lib/crypto';

interface Props {
  account: FamilyAccount;
  onUnlock: () => void;
  onCancel: () => void;
}

export function ParentZoneEntry({ account, onUnlock, onCancel }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const ok = await verifyPassword(
        password,
        account.parentPasswordSalt,
        account.parentPasswordHash,
      );
      if (ok) onUnlock();
      else setError('That password didn’t match. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Parent Zone"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200,
      }}
    >
      <div className="card">
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
              autoFocus
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
      </div>
    </div>
  );
}
