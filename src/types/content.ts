// Mission/content types. Built v0.4-style so audio + video can be added later
// without rework — see DESIGN.md §16.

import type { Tier } from './account';
import type { CharacterId } from './character';

export type MissionPattern =
  | 'quiz'
  | 'drag-match'
  | 'path-planner'
  | 'code-robot'
  | 'story-choices'
  | 'build-arrange';

export type Subject =
  | 'math'
  | 'science'
  | 'geography'
  | 'history'
  | 'coding'
  | 'reading'
  | 'social-studies';

/**
 * A piece of text that may later carry audio narration and/or a short video clip.
 * In v1, only `text` is populated; the schema is ready for the rest.
 */
export interface TextContent {
  text: string;
  audioUrl?: string;
  videoUrl?: string;
}

export interface MissionTierVariant {
  wrapper: TextContent[];
  pattern: MissionPattern;
  params: Record<string, unknown>;
}

export interface Mission {
  id: string;
  chapterId: string;
  lead: CharacterId;
  subjects: Subject[];
  skillTags: string[];
  tiers: Record<Tier, MissionTierVariant>;
}
