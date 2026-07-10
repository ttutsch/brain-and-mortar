import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when the Supabase env vars are present — i.e. cloud sync is available. */
export function isCloudConfigured(): boolean {
  return !!url && !!key;
}

let client: SupabaseClient | null = null;

/**
 * The shared Supabase client, or null if the app isn't configured for cloud.
 * The whole game works without it (local-first); cloud is an opt-in layer.
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return client;
}
