// Account & profile types. v1 storage is local; same shape will move to cloud later.

export type Tier = 1 | 2 | 3;

export type AvatarId = string;

export interface FamilyAccount {
  id: string;
  parentEmail: string;
  parentPasswordHash: string;
  parentPasswordSalt: string;
  createdAt: string; // ISO datetime
  schemaVersion: number;
}

export interface PlayerProfile {
  id: string;
  familyId: string;
  displayName: string;
  avatarId: AvatarId;
  birthDate: string; // ISO date (YYYY-MM-DD)
  tierOverride: Tier | null;
  createdAt: string;
  settings: PlayerSettings;
}

export interface PlayerSettings {
  narration: boolean; // wired through but defaults off — no audio content in v1
  highContrast: boolean;
  reducedMotion: boolean;
  /** Dyslexia-friendlier font stack. Optional so pre-existing saves migrate cleanly. */
  dyslexiaFont?: boolean;
}

export interface PlayerProgress {
  profileId: string;
  coins: number;
  completedMissionIds: string[];
  /**
   * House items the player has completed. Each ID covers either a *repair*
   * (Act I — fix something broken) or an *upgrade* (Acts II+ — add something
   * new). The home view reads from this list to pick the visual state for
   * each region. See DESIGN.md §7.5.
   */
  completedHouseItemIds: string[];
  /** Family trips the player has completed (one per act). See DESIGN.md §13. */
  completedTripIds: string[];
  /** Cosmetics bought with coins; rendered on the house scene. See DESIGN.md §13. */
  ownedCosmeticIds: string[];
  skillMastery: Record<string, SkillMasteryRecord>;
  currentAct: number;
  currentChapter: number;
}

export interface SkillMasteryRecord {
  skillTag: string;
  attempts: number;
  successes: number;
  lastSeenAt: string;
}

export const SCHEMA_VERSION = 1;

export function defaultSettings(): PlayerSettings {
  return {
    narration: false,
    highContrast: false,
    reducedMotion: false,
    dyslexiaFont: false,
  };
}

export function defaultProgress(profileId: string): PlayerProgress {
  return {
    profileId,
    coins: 0,
    completedMissionIds: [],
    completedHouseItemIds: [],
    completedTripIds: [],
    ownedCosmeticIds: [],
    skillMastery: {},
    currentAct: 1,
    currentChapter: 1,
  };
}

/**
 * Fill in any fields missing on a loaded PlayerProgress. Necessary because
 * profiles saved before a new field existed will lack it in storage; merging
 * with `defaultProgress` lets us evolve the shape without losing data.
 */
export function migrateProgress(loaded: PlayerProgress | null, profileId: string): PlayerProgress {
  const base = defaultProgress(profileId);
  if (!loaded) return base;
  return { ...base, ...loaded };
}
