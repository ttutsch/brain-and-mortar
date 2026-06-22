// Account & profile types. v1 storage is local; same shape will move to cloud later.

export type Tier = 1 | 2 | 3;

export type AvatarId = string;

/**
 * Local family account. SECURITY NOTE (adversarial-review #11): the Parent Zone
 * is a best-effort gate for kids, NOT a security boundary — anyone with devtools
 * can read this blob, and the unlock only flips client state. `parentEmail` is
 * stored in plaintext, which is acceptable for v1 (local-only, single device);
 * before any cloud sync (DESIGN.md §16), do not persist PII unencrypted and treat
 * the password as a real credential.
 */
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
 * with `defaultProgress` lets us evolve the shape without losing data. Also
 * coerces the collection fields so a corrupt/null value in storage can't crash
 * later `.includes` / iteration.
 */
export function migrateProgress(loaded: PlayerProgress | null, profileId: string): PlayerProgress {
  const base = defaultProgress(profileId);
  if (!loaded || typeof loaded !== 'object') return base;
  const merged = { ...base, ...loaded };
  const num = (v: unknown, fallback: number) =>
    typeof v === 'number' && Number.isFinite(v) ? v : fallback;
  return {
    ...merged,
    profileId, // never trust a stale id baked into the stored blob
    coins: num(merged.coins, 0), // a non-number coins would make `coins + earned` concatenate
    currentAct: num(merged.currentAct, 1),
    currentChapter: num(merged.currentChapter, 1),
    completedMissionIds: Array.isArray(merged.completedMissionIds) ? merged.completedMissionIds : [],
    completedHouseItemIds: Array.isArray(merged.completedHouseItemIds) ? merged.completedHouseItemIds : [],
    completedTripIds: Array.isArray(merged.completedTripIds) ? merged.completedTripIds : [],
    ownedCosmeticIds: Array.isArray(merged.ownedCosmeticIds) ? merged.ownedCosmeticIds : [],
    skillMastery: merged.skillMastery && typeof merged.skillMastery === 'object' ? merged.skillMastery : {},
  };
}

/**
 * Backfill a loaded PlayerProfile so profiles saved by an older build gain any
 * fields added since — notably new settings flags and a valid `tierOverride`
 * (effectiveTier expects a Tier or null, never undefined).
 */
export function migrateProfile(loaded: PlayerProfile): PlayerProfile {
  // Only 1/2/3 are valid tiers; anything else (undefined, null, a future Tier 4,
  // or junk from hand-edited storage) falls back to age-based tiering so we never
  // index mission.tiers[invalid] and crash.
  const t = loaded.tierOverride;
  return {
    ...loaded,
    tierOverride: t === 1 || t === 2 || t === 3 ? t : null,
    settings: { ...defaultSettings(), ...(loaded.settings ?? {}) },
  };
}
