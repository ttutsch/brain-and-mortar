import type { PlayerProfile, Tier } from '../types';

/**
 * Map an age in years to a tier.
 * Tier 1 = K–Grade 3 (ages 5–8); Tier 2 = Grades 4–6 (ages 9–11);
 * Tier 3 = Grades 7–8 (ages 12–13). Ages 14+ are deferred (Tier 4); for
 * those, we cap at Tier 3 so the game stays playable until Tier 4 ships.
 */
export function tierForAge(ageYears: number): Tier {
  // A corrupt/missing birthDate yields NaN (and a future date a negative age).
  // Default to the gentlest tier rather than letting NaN fall through every
  // comparison to Tier 3 (the hardest content) — better too easy than too hard.
  if (!Number.isFinite(ageYears)) return 1;
  if (ageYears < 9) return 1;
  if (ageYears < 12) return 2;
  return 3;
}

export function ageInYears(birthDate: string, asOf: Date = new Date()): number {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return NaN; // malformed/empty date string
  const diffMs = asOf.getTime() - birth.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 365.25);
}

export function effectiveTier(profile: PlayerProfile, asOf: Date = new Date()): Tier {
  // Belt-and-suspenders: only honour an override that is a real tier, so a
  // stale/hand-edited value can never index a missing mission variant.
  const o = profile.tierOverride;
  if (o === 1 || o === 2 || o === 3) return o;
  return tierForAge(ageInYears(profile.birthDate, asOf));
}

export function tierLabel(tier: Tier): string {
  switch (tier) {
    case 1: return 'Explorers (K–Grade 3)';
    case 2: return 'Navigators (Grades 4–6)';
    case 3: return 'Pathfinders (Grades 7–8)';
    default: return 'Explorers (K–Grade 3)';
  }
}
