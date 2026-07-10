import type { CharacterId, Mission, PlayerProgress, SkillMasteryRecord, Tier } from '../types';
import { CHAPTER_REPAIRS, MISSIONS } from '../data/missions';
import type { Trip } from '../data/trips';
import { TRIPS, TRIP_FOR_ACT } from '../data/trips';

/** Count the "items" (questions, pairs, puzzles) in a mission's tier variant. */
export function countMissionItems(mission: Mission, tier: Tier): number {
  const params = mission.tiers[tier].params as { rounds?: Array<Record<string, unknown>> };
  if (!params.rounds) return 1;
  let n = 0;
  for (const round of params.rounds) {
    if (Array.isArray(round.pairs)) n += round.pairs.length;
    else if (Array.isArray(round.questions)) n += round.questions.length;
    else if (Array.isArray(round.items)) n += round.items.length; // counting / word-problem / pattern-puzzle
    else n += 1; // code-robot / path-planner: one puzzle per round
  }
  return Math.max(1, n);
}

/** Find the next not-yet-completed mission this character leads, or null. */
export function getAvailableMissionForCharacter(
  characterId: CharacterId,
  progress: PlayerProgress | null,
): Mission | null {
  const completed = new Set(progress?.completedMissionIds ?? []);
  for (const mission of Object.values(MISSIONS)) {
    if (mission.lead === characterId && !completed.has(mission.id)) {
      return mission;
    }
  }
  return null;
}

export interface ChapterStatus {
  chapterId: string;
  /** Short display name, e.g. "Chapter 2". */
  chapterName: string;
  total: number;
  done: number;
  /** True when this mission's completion brought the chapter to completion. */
  justCompleted: boolean;
  /** The chapter's repair id, if any. */
  houseItemId: string | null;
  /** Reward tile copy for the chapter-completing finish screen. */
  rewardLabel: string;
  rewardSublabel: string;
}

/** Compute Chapter X status for a given mission's chapter, given current progress. */
export function getChapterStatus(
  chapterId: string,
  progress: PlayerProgress | null,
  previousProgress?: PlayerProgress | null,
): ChapterStatus {
  const repair = CHAPTER_REPAIRS.find((r) => r.chapterId === chapterId);
  if (!repair) {
    return {
      chapterId, chapterName: '', total: 0, done: 0,
      justCompleted: false, houseItemId: null, rewardLabel: '', rewardSublabel: '',
    };
  }
  const doneNow = new Set(progress?.completedMissionIds ?? []);
  const donePrev = new Set(previousProgress?.completedMissionIds ?? []);
  const completedNow = repair.requiredMissionIds.filter((id) => doneNow.has(id)).length;
  const completedPrev = repair.requiredMissionIds.filter((id) => donePrev.has(id)).length;
  const total = repair.requiredMissionIds.length;
  return {
    chapterId,
    chapterName: repair.chapterName,
    total,
    done: completedNow,
    justCompleted: completedNow === total && completedPrev < total,
    houseItemId: repair.houseItemId,
    rewardLabel: repair.rewardLabel,
    rewardSublabel: repair.rewardSublabel,
  };
}

/** Pure update: returns the next progress object after a mission outcome. */
export function applyMissionOutcome(
  progress: PlayerProgress,
  outcome: { missionId: string; coinsEarned: number; wrongAttempts?: number; tier?: Tier },
): PlayerProgress {
  // Idempotent, like applyTripOutcome / applyPurchase: a mission that's already
  // complete never re-awards coins or re-records mastery. Guards a double-fire of
  // handleMissionFinish (e.g. a fast double-tap) or any future replay entry point.
  if (progress.completedMissionIds.includes(outcome.missionId)) return progress;

  const completedMissionIds = [...progress.completedMissionIds, outcome.missionId];

  // Re-evaluate every chapter repair against the new mission list.
  let completedHouseItemIds = progress.completedHouseItemIds;
  const doneSet = new Set(completedMissionIds);
  for (const repair of CHAPTER_REPAIRS) {
    if (completedHouseItemIds.includes(repair.houseItemId)) continue;
    const allDone = repair.requiredMissionIds.every((id) => doneSet.has(id));
    if (allDone) {
      completedHouseItemIds = [...completedHouseItemIds, repair.houseItemId];
    }
  }

  // Record skill mastery (DESIGN.md §12): every item answered is an attempt;
  // wrong tries add extra attempts without successes, so the rate reflects
  // how cleanly the player got through. Recorded per skill tag.
  let skillMastery = progress.skillMastery;
  const mission = MISSIONS[outcome.missionId];
  if (mission && outcome.tier !== undefined) {
    const items = countMissionItems(mission, outcome.tier);
    const wrong = outcome.wrongAttempts ?? 0;
    const now = new Date().toISOString();
    skillMastery = { ...skillMastery };
    for (const tag of mission.skillTags) {
      const prev: SkillMasteryRecord = skillMastery[tag] ?? {
        skillTag: tag, attempts: 0, successes: 0, lastSeenAt: now,
      };
      skillMastery[tag] = {
        ...prev,
        attempts: prev.attempts + items + wrong,
        successes: prev.successes + items,
        lastSeenAt: now,
      };
    }
  }

  return {
    ...progress,
    coins: progress.coins + outcome.coinsEarned,
    completedMissionIds,
    completedHouseItemIds,
    skillMastery,
  };
}

/* ---------- Trips ---------- */

/** True when every chapter repair in the given act is unlocked. */
export function isActComplete(actId: string, progress: PlayerProgress | null): boolean {
  if (!progress) return false;
  const actRepairs = CHAPTER_REPAIRS.filter((r) => r.chapterId.startsWith(`${actId}.`));
  if (actRepairs.length === 0) return false;
  const unlocked = new Set(progress.completedHouseItemIds);
  return actRepairs.every((r) => unlocked.has(r.houseItemId));
}

/** The unfinished trip the player has earned (or null). */
export function getAvailableTrip(progress: PlayerProgress | null): Trip | null {
  if (!progress) return null;
  for (const [actId, tripId] of Object.entries(TRIP_FOR_ACT)) {
    if (!isActComplete(actId, progress)) continue;
    if (progress.completedTripIds.includes(tripId)) continue;
    const trip = TRIPS[tripId];
    if (trip) return trip;
  }
  return null;
}

/** Apply a trip outcome: mark complete and award coins (first completion only). */
export function applyTripOutcome(
  progress: PlayerProgress,
  outcome: { tripId: string; coinsEarned: number },
): PlayerProgress {
  // Replays and previews never re-award: a completed trip is a no-op.
  if (progress.completedTripIds.includes(outcome.tripId)) return progress;
  return {
    ...progress,
    coins: progress.coins + outcome.coinsEarned,
    completedTripIds: [...progress.completedTripIds, outcome.tripId],
  };
}

/* ---------- Overall progress ---------- */

export interface OverallProgress {
  done: number;
  total: number;
  /** 0–100, rounded. */
  percent: number;
}

/**
 * Adventure progress across all *authored* content: every mission in every
 * defined chapter, plus the trip of any act that has chapters. Moves a little
 * with every mission so the meter always feels alive.
 */
export function getOverallProgress(progress: PlayerProgress | null): OverallProgress {
  const doneMissions = new Set(progress?.completedMissionIds ?? []);
  const doneTrips = new Set(progress?.completedTripIds ?? []);

  let total = 0;
  let done = 0;
  const actsWithContent = new Set<string>();
  for (const repair of CHAPTER_REPAIRS) {
    total += repair.requiredMissionIds.length;
    done += repair.requiredMissionIds.filter((id) => doneMissions.has(id)).length;
    actsWithContent.add(repair.chapterId.split('.')[0]);
  }
  for (const actId of actsWithContent) {
    const tripId = TRIP_FOR_ACT[actId];
    if (!tripId) continue;
    total += 1;
    if (doneTrips.has(tripId)) done += 1;
  }
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

/* ---------- Cosmetics shop ---------- */

/**
 * Buy a cosmetic. Returns the updated progress, or null if the purchase is
 * invalid (already owned, or not enough coins) — callers treat null as a no-op.
 */
export function applyPurchase(
  progress: PlayerProgress,
  cosmetic: { id: string; price: number },
): PlayerProgress | null {
  if (progress.ownedCosmeticIds.includes(cosmetic.id)) return null;
  if (progress.coins < cosmetic.price) return null;
  return {
    ...progress,
    coins: progress.coins - cosmetic.price,
    ownedCosmeticIds: [...progress.ownedCosmeticIds, cosmetic.id],
  };
}
