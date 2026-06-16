import type {
  FamilyAccount,
  PlayerProfile,
  PlayerProgress,
} from '../types';

/**
 * Single seam between the app and persistence. v1 ships only the local
 * implementation; a cloud implementation (Firebase/Supabase) will satisfy the
 * same interface so the rest of the app doesn't change. See DESIGN.md §16.
 */
export interface StorageAdapter {
  getFamilyAccount(): Promise<FamilyAccount | null>;
  saveFamilyAccount(account: FamilyAccount): Promise<void>;

  listProfiles(): Promise<PlayerProfile[]>;
  getProfile(id: string): Promise<PlayerProfile | null>;
  saveProfile(profile: PlayerProfile): Promise<void>;
  deleteProfile(id: string): Promise<void>;

  getProgress(profileId: string): Promise<PlayerProgress | null>;
  saveProgress(progress: PlayerProgress): Promise<void>;

  /** Wipe everything. Used for testing and a "reset family" action in Parent Zone. */
  clearAll(): Promise<void>;
}
