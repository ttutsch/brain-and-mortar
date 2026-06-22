import type {
  FamilyAccount,
  PlayerProfile,
  PlayerProgress,
} from '../types';
import { migrateProfile } from '../types';
import type { StorageAdapter } from './StorageAdapter';

const KEYS = {
  account: 'tfamily.account.v1',
  profiles: 'tfamily.profiles.v1',
  progressPrefix: 'tfamily.progress.v1.',
} as const;

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  // Best-effort: a full quota or a storage-disabled context (e.g. some private
  // modes) throws on setItem. Swallow it with a warning rather than letting the
  // rejection strand the player mid-flow — the in-memory state still advances.
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[storage] write failed for "${key}":`, e);
  }
}

export class LocalStorageAdapter implements StorageAdapter {
  async getFamilyAccount(): Promise<FamilyAccount | null> {
    return readJson<FamilyAccount>(KEYS.account);
  }

  async saveFamilyAccount(account: FamilyAccount): Promise<void> {
    writeJson(KEYS.account, account);
  }

  async listProfiles(): Promise<PlayerProfile[]> {
    // Defend the shape: a corrupt/legacy blob could parse to a non-array, or an
    // array with null/garbage entries. Either would crash boot (.map / reading
    // .tierOverride of null) and brick the whole family with no in-app recovery.
    const raw = readJson<PlayerProfile[]>(KEYS.profiles);
    const list = Array.isArray(raw) ? raw : [];
    return list
      .filter((p): p is PlayerProfile => !!p && typeof p === 'object')
      .map(migrateProfile);
  }

  async getProfile(id: string): Promise<PlayerProfile | null> {
    const all = await this.listProfiles();
    return all.find((p) => p.id === id) ?? null;
  }

  async saveProfile(profile: PlayerProfile): Promise<void> {
    const all = await this.listProfiles();
    const idx = all.findIndex((p) => p.id === profile.id);
    if (idx >= 0) all[idx] = profile;
    else all.push(profile);
    writeJson(KEYS.profiles, all);
  }

  async deleteProfile(id: string): Promise<void> {
    const all = await this.listProfiles();
    writeJson(KEYS.profiles, all.filter((p) => p.id !== id));
    localStorage.removeItem(KEYS.progressPrefix + id);
  }

  async getProgress(profileId: string): Promise<PlayerProgress | null> {
    return readJson<PlayerProgress>(KEYS.progressPrefix + profileId);
  }

  async saveProgress(progress: PlayerProgress): Promise<void> {
    writeJson(KEYS.progressPrefix + progress.profileId, progress);
  }

  async clearAll(): Promise<void> {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k === KEYS.account || k === KEYS.profiles || k.startsWith(KEYS.progressPrefix))) {
        toRemove.push(k);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  }
}
