import type { PlayerProfile, PlayerProgress } from '../types';
import { getSupabase } from './supabase';

function client() {
  const c = getSupabase();
  if (!c) throw new Error('Cloud sync is not configured.');
  return c;
}

export interface CloudFamily {
  id: string;
  joinCode: string;
}

/** Sign up a grown-up (family owner) with email + password. */
export async function signUpOwner(email: string, password: string) {
  const { data, error } = await client().auth.signUp({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) throw error;
  return data;
}

/** Sign in an existing grown-up (e.g. to re-link on a new device). */
export async function signInOwner(email: string, password: string) {
  const { data, error } = await client().auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOutCloud() {
  await client().auth.signOut();
}

/** Send a password-reset email. The link returns to this app in recovery mode. */
export async function requestPasswordReset(email: string) {
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await client().auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo });
  if (error) throw error;
}

/** Set a new password for the currently-authenticated user (recovery flow). */
export async function updatePassword(newPassword: string) {
  const { error } = await client().auth.updateUser({ password: newPassword });
  if (error) throw error;
}

/**
 * Subscribe to the PASSWORD_RECOVERY auth event (fired when the user returns via
 * a reset-email link). Returns an unsubscribe function.
 */
export function onPasswordRecovery(cb: () => void): () => void {
  const c = getSupabase();
  if (!c) return () => {};
  const { data } = c.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') cb();
  });
  return () => data.subscription.unsubscribe();
}

/** Ensure there's a session — anonymous if needed — so a kid device can join. */
export async function ensureAnonSession(): Promise<void> {
  const c = client();
  const { data } = await c.auth.getSession();
  if (!data.session) {
    const { error } = await c.auth.signInAnonymously();
    if (error) throw error;
  }
}

/** Create a new cloud family owned by the current user. Returns id + join code. */
export async function createFamily(): Promise<CloudFamily> {
  const { data, error } = await client().rpc('create_family');
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as { id: string; join_code: string };
  return { id: row.id, joinCode: row.join_code };
}

/** Join a family by its code. Returns the family id. */
export async function joinFamily(code: string): Promise<string> {
  const { data, error } = await client().rpc('join_family', { code: code.trim().toUpperCase() });
  if (error) throw error;
  return data as string;
}

/** Upsert one profile (and optionally its progress) into the cloud family. */
export async function pushProfile(
  familyId: string,
  profile: PlayerProfile,
  progress: PlayerProgress | null,
) {
  const c = client();
  const now = new Date().toISOString();
  const { error: pe } = await c
    .from('profiles')
    .upsert({ id: profile.id, family_id: familyId, data: profile, updated_at: now });
  if (pe) throw pe;
  if (progress) {
    const { error: ge } = await c
      .from('progress')
      .upsert({ profile_id: profile.id, family_id: familyId, data: progress, updated_at: now });
    if (ge) throw ge;
  }
}

/** Upsert just a progress record — called after each local progress save. */
export async function pushProgress(familyId: string, progress: PlayerProgress) {
  const { error } = await client()
    .from('progress')
    .upsert({
      profile_id: progress.profileId,
      family_id: familyId,
      data: progress,
      updated_at: new Date().toISOString(),
    });
  if (error) throw error;
}

export interface CloudSnapshot {
  profiles: PlayerProfile[];
  progressByProfileId: Record<string, PlayerProgress>;
}

/** Pull every profile + progress row the current user can see (their family). */
export async function pullFamily(): Promise<CloudSnapshot> {
  const c = client();
  const { data: profRows, error: pe } = await c.from('profiles').select('data');
  if (pe) throw pe;
  const { data: progRows, error: ge } = await c.from('progress').select('data');
  if (ge) throw ge;

  const profiles = (profRows ?? []).map((r) => (r as { data: PlayerProfile }).data);
  const progressByProfileId: Record<string, PlayerProgress> = {};
  for (const r of progRows ?? []) {
    const p = (r as { data: PlayerProgress }).data;
    progressByProfileId[p.profileId] = p;
  }
  return { profiles, progressByProfileId };
}
