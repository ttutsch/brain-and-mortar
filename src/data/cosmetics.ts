// Coin-purchasable cosmetics. Each one renders as a small visual on the house
// scene once owned (see HouseSvg.tsx). Prices are deliberately reachable —
// coins are generous and there's no grinding (DESIGN.md §13).

export interface Cosmetic {
  id: string;
  name: string;
  price: number;
  description: string;
  /** Tiny emoji used in the shop list (the house renders real vector art). */
  icon: string;
}

export const COSMETICS: Cosmetic[] = [
  {
    id: 'cos.gnome',
    name: 'Garden gnome',
    price: 15,
    description: 'A cheerful little guardian for the flower bed.',
    icon: '🍄',
  },
  {
    id: 'cos.bird_feeder',
    name: 'Bird feeder',
    price: 20,
    description: 'Hangs by the oak tree. Chickadees approve.',
    icon: '🐦',
  },
  {
    id: 'cos.flag',
    name: 'Canada flag',
    price: 10,
    description: 'Flies proudly over the front porch.',
    icon: '🍁',
  },
  {
    id: 'cos.cat',
    name: 'Family cat',
    price: 40,
    description: 'A sleepy orange cat who claims the porch steps. Caleb is thrilled.',
    icon: '🐈',
  },
  {
    id: 'cos.tree_swing',
    name: 'Tree swing',
    price: 25,
    description: 'A classic rope swing on the big oak tree.',
    icon: '🌳',
  },
  {
    id: 'cos.mailbox',
    name: 'Fancy mailbox',
    price: 12,
    description: 'A little red mailbox for the front walk.',
    icon: '📬',
  },
];

export function getCosmetic(id: string): Cosmetic | undefined {
  return COSMETICS.find((c) => c.id === id);
}
