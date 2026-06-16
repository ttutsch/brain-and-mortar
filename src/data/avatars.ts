import type { AvatarId } from '../types';

// Placeholder avatar set. Each one is a colored disc; real illustrations
// will replace these once the AI-illustration pipeline is set up (DESIGN.md §6).
export interface AvatarOption {
  id: AvatarId;
  label: string;
  color: string;
}

export const AVATARS: AvatarOption[] = [
  { id: 'av_apricot', label: 'Apricot', color: '#F5B36A' },
  { id: 'av_rose',    label: 'Rose',    color: '#E8867A' },
  { id: 'av_mint',    label: 'Mint',    color: '#8FCBB5' },
  { id: 'av_sky',     label: 'Sky',     color: '#7BAEDB' },
  { id: 'av_plum',    label: 'Plum',    color: '#A87CB5' },
  { id: 'av_clover',  label: 'Clover',  color: '#7BB85F' },
  { id: 'av_butter',  label: 'Butter',  color: '#F2D26C' },
  { id: 'av_coral',   label: 'Coral',   color: '#F08572' },
  { id: 'av_teal',    label: 'Teal',    color: '#4DA89E' },
  { id: 'av_lilac',   label: 'Lilac',   color: '#C9B0E8' },
  { id: 'av_mustard', label: 'Mustard', color: '#E8B547' },
  { id: 'av_sage',    label: 'Sage',    color: '#8FB39D' },
];

export function avatarColor(id: AvatarId): string {
  return AVATARS.find((a) => a.id === id)?.color ?? '#D77A52';
}
