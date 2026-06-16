import type { Character, CharacterId } from '../types';

export const CHARACTERS: Record<CharacterId, Character> = {
  mama_t: {
    id: 'mama_t',
    displayName: 'Mama T',
    role: 'parent',
    age: 40,
    specialty: 'Science & maker projects',
    personality: 'Curious, hands-on, builds things in the garage.',
    accentColor: '#4DA89E',
  },
  dada_t: {
    id: 'dada_t',
    displayName: 'Dada T',
    role: 'parent',
    age: 42,
    specialty: 'Geography & Canadian social studies',
    personality: 'Loves maps; plans every road trip down to the snack.',
    accentColor: '#2D4A6B',
  },
  tessa: {
    id: 'tessa',
    displayName: 'Tessa',
    role: 'kid',
    age: 13,
    specialty: 'Coding & current affairs',
    personality: 'Coder, debater, runs the school newspaper.',
    accentColor: '#A87CB5',
  },
  owen: {
    id: 'owen',
    displayName: 'Owen',
    role: 'kid',
    age: 11,
    specialty: 'History & sports math',
    personality: 'History buff and hockey player.',
    accentColor: '#D77A52',
  },
  izzy: {
    id: 'izzy',
    displayName: 'Izzy',
    role: 'kid',
    age: 9,
    specialty: 'Math, logic, & art',
    personality: 'Math whiz and visual artist.',
    accentColor: '#E8B547',
  },
  caleb: {
    id: 'caleb',
    displayName: 'Caleb',
    role: 'kid',
    age: 6,
    specialty: 'Reading & basic science',
    personality: "Loves animals; 'why?' about everything.",
    accentColor: '#8FB39D',
  },
};

export const CHARACTER_ORDER: CharacterId[] = [
  'mama_t', 'dada_t', 'tessa', 'owen', 'izzy', 'caleb',
];
