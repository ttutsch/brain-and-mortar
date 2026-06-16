export type CharacterId =
  | 'mama_t'
  | 'dada_t'
  | 'tessa'
  | 'owen'
  | 'izzy'
  | 'caleb';

export type CharacterRole = 'parent' | 'kid';

export interface Character {
  id: CharacterId;
  displayName: string;
  role: CharacterRole;
  age: number;
  specialty: string;
  personality: string;
  /** Hex color used as a placeholder until illustrated portraits land. */
  accentColor: string;
}
