import { useState, type FormEvent } from 'react';
import type { FamilyAccount } from '../types';
import { SCHEMA_VERSION } from '../types';
import { generateId, generateSalt, hashPassword } from '../lib/crypto';
import { getStorage } from '../storage';

interface Props {
  onCreated: (account: FamilyAccount) => void;
}

const MIN_PASSWORD = 6;

export function FamilyAccountCreate({ onCreated }: Props) {
  const [email, setEmail] = useState('');
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
      const account: FamilyAccount = {
        id: generateId('fam'),
        parentEmail: email.trim().toLowerCase(),
        parentPasswordHash: hash,
        parentPasswordSalt: salt,
        createdAt: new Date().toISOString(),
        schemaVersion: SCHEMA_VERSION,
      };
      await getStorage().saveFamilyAccount(account);
      onCreated(account);
    } catch (err) {
      console.error(err);
      setError('Something went wrong creating your account. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="centered-screen">
      <div className="card">
        <div className="welcome-hero">
          <span className="badge">Brain &amp; Mortar</span>
          <h1 className="card-title">Welcome!</h1>
          <p className="card-subtitle">
            Start by setting up your family. The parent account holds the keys —
            your kids will each get their own player profile next.
          </p>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="parent-email">Parent email</label>
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
            <label htmlFor="parent-password">Parent password</label>
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

          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Creating…' : 'Create family account'}
          </button>
        </form>
      </div>
    </div>
  );
}
