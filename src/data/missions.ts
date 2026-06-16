// Authored content lives in plain TS for v1. Each mission carries three tier
// variants and (optionally) audio/video fields that v1 doesn't fill in.
// See DESIGN.md §11 for the content-branching model.

import type { Mission } from '../types';

export interface DragMatchPair {
  /** Unique id within the mini-game. */
  id: string;
  /** The "item" label (the thing the player picks). */
  item: { label: string; sublabel?: string; shape?: ShapeHint };
  /** The matching "slot" label (the thing it goes into). */
  slot: { label: string; sublabel?: string };
}

/** Placeholder visual hint until illustrations are in. */
export type ShapeHint = 'small-square' | 'wide-short' | 'long-rect' | 'tall-thin' | 'huge-wide';

/** Single round of a drag-match. This is what the DragMatch component plays. */
export interface DragMatchParams {
  pairs: DragMatchPair[];
  /** Optional short hint shown if the player gets two wrong in a row. */
  stuckHint?: string;
}

/** Multi-round drag-match. Stored on the mission; MissionPlayer iterates the rounds. */
export interface DragMatchMissionParams {
  rounds: DragMatchRound[];
}
export interface DragMatchRound extends DragMatchParams {
  /** Story beat shown before this round starts. */
  intro?: string;
  /** Heading shown above the round (e.g. "Round 1 · Furniture sizes"). */
  heading?: string;
}

/* ---------- Quiz pattern ---------- */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** Shown after a correct answer — reinforces the concept. */
  explanation?: string;
  /** Shown after a wrong answer — nudges without giving it away. */
  hint?: string;
}

/** Single round of a quiz. This is what the QuizGame component plays. */
export interface QuizRoundParams {
  questions: QuizQuestion[];
}

/** Multi-round quiz. Stored on the mission; MissionPlayer iterates the rounds. */
export interface QuizMissionParams {
  rounds: QuizRound[];
}
export interface QuizRound extends QuizRoundParams {
  intro?: string;
  heading?: string;
}

/** Common shape MissionPlayer relies on: every pattern's params carry rounds. */
export interface MissionRoundMeta {
  intro?: string;
  heading?: string;
}

/* ---------- Code-the-robot pattern ---------- */

export type RobotDir = 'up' | 'down' | 'left' | 'right';

export interface CodeRobotRound extends MissionRoundMeta {
  cols: number;
  rows: number;
  start: { x: number; y: number; dir: RobotDir };
  goal: { x: number; y: number };
  /** Cells the robot may not enter. */
  walls?: Array<{ x: number; y: number }>;
  /** Cap on program length — forces loop-like thinking at higher tiers. */
  maxCommands?: number;
}

export interface CodeRobotMissionParams {
  rounds: CodeRobotRound[];
}

/* ---------- Path-planner pattern ---------- */

export interface PathNode {
  id: string;
  label: string;
  /** Position in the 600×340 planner viewBox. */
  x: number;
  y: number;
}

export interface PathEdge {
  from: string;
  to: string;
  cost: number;
}

export interface PathPlannerRound extends MissionRoundMeta {
  nodes: PathNode[];
  edges: PathEdge[];
  startId: string;
  goalId: string;
  /** 'min' = find the cheapest route; { budget } = arrive within budget. */
  objective: 'min' | { budget: number };
  costUnit: string;
}

export interface PathPlannerMissionParams {
  rounds: PathPlannerRound[];
}

/* ===========================================================
 * CHAPTER 1 · Move-in day (Mama T leads; ends with living-room repair)
 * =========================================================== */

const CH1_M1_MEASURING: Mission = {
  id: 'act1.ch1.m1.measuring',
  chapterId: 'act1.ch1',
  lead: 'mama_t',
  subjects: ['math', 'reading'],
  skillTags: ['math.measurement.units', 'math.measurement.estimation', 'math.measurement.comparison'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi! I’m Mama T. We just moved into our new house — and the living room is dusty and bare.' },
        { text: 'Before we buy any new furniture, I need to figure out how big everything is.' },
        { text: 'Help me out — we’ll do this in two rounds. Tap an item, then tap the right size.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · How long is each thing?',
            intro: 'Let’s start with the furniture for the living room. Match each thing to how long it is.',
            pairs: [
              { id: 'r1p1', item: { label: 'Small chair', shape: 'small-square' }, slot: { label: '60 cm' } },
              { id: 'r1p2', item: { label: 'Side table',  shape: 'small-square' }, slot: { label: '1 m' } },
              { id: 'r1p3', item: { label: 'Lamp',        shape: 'tall-thin'    }, slot: { label: '1.5 m tall' } },
              { id: 'r1p4', item: { label: 'Coffee table',shape: 'wide-short'   }, slot: { label: '2 m' } },
              { id: 'r1p5', item: { label: 'Couch',       shape: 'long-rect'    }, slot: { label: '3 m' } },
              { id: 'r1p6', item: { label: 'Living-room wall', shape: 'huge-wide' }, slot: { label: '5 m' } },
            ],
            stuckHint: 'The biggest object is the longest. Try matching the wall first.',
          },
          {
            heading: 'Round 2 · Around the house',
            intro: 'Nice work! Now let’s measure a few more things from other rooms.',
            pairs: [
              { id: 'r2p1', item: { label: 'Caleb’s toy box',    shape: 'small-square' }, slot: { label: '60 cm' } },
              { id: 'r2p2', item: { label: 'Caleb’s bed',         shape: 'wide-short'   }, slot: { label: '1 m wide' } },
              { id: 'r2p3', item: { label: 'The fridge',          shape: 'tall-thin'    }, slot: { label: '1.8 m tall' } },
              { id: 'r2p4', item: { label: 'Front door',          shape: 'tall-thin'    }, slot: { label: '2 m tall' } },
              { id: 'r2p5', item: { label: 'Kitchen counter',     shape: 'huge-wide'    }, slot: { label: '3 m long' } },
            ],
            stuckHint: 'Doors are usually about as tall as a grown-up reaching up.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Welcome to our new house! Before we buy any furniture, I want to know what will actually fit.' },
        { text: 'We’ll do this in two rounds: first convert measurements, then do some quick arithmetic.' },
        { text: 'Tap an item to pick it, then tap its matching answer.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Convert between cm and m',
            intro: 'I’ve mixed up centimetres and metres. Match each piece to the right measurement.',
            pairs: [
              { id: 'r1p1', item: { label: 'Small bookshelf', sublabel: '100 cm tall',  shape: 'tall-thin'   }, slot: { label: '1 m' } },
              { id: 'r1p2', item: { label: 'Coffee table',     sublabel: '150 cm long', shape: 'wide-short'  }, slot: { label: '1.5 m' } },
              { id: 'r1p3', item: { label: 'Couch',            sublabel: '2.5 m long',  shape: 'long-rect'   }, slot: { label: '250 cm' } },
              { id: 'r1p4', item: { label: 'Living-room wall', sublabel: '375 cm',      shape: 'huge-wide'   }, slot: { label: '3 m 75 cm' } },
              { id: 'r1p5', item: { label: 'Side table',       sublabel: '0.4 m wide',  shape: 'small-square'}, slot: { label: '40 cm' } },
              { id: 'r1p6', item: { label: 'TV stand',         sublabel: '130 cm wide', shape: 'wide-short'  }, slot: { label: '1.3 m' } },
            ],
            stuckHint: '100 cm equals 1 m. Multiply or divide by 100 to convert.',
          },
          {
            heading: 'Round 2 · Quick room math',
            intro: 'Now help me figure out how it all fits together.',
            pairs: [
              { id: 'r2p1', item: { label: '2 m couch + 1 m side table',     sublabel: 'Total length?',   shape: 'long-rect'  }, slot: { label: '3 m' } },
              { id: 'r2p2', item: { label: '5 m wall − 3 m couch',           sublabel: 'Clearance left?', shape: 'huge-wide'  }, slot: { label: '2 m' } },
              { id: 'r2p3', item: { label: 'Four 50 cm chairs in a row',     sublabel: 'Total width?',    shape: 'wide-short' }, slot: { label: '2 m' } },
              { id: 'r2p4', item: { label: 'Half of a 4.5 m room',           sublabel: 'Half length?',    shape: 'huge-wide'  }, slot: { label: '2.25 m' } },
              { id: 'r2p5', item: { label: '1 m + 100 cm',                   sublabel: 'Total?',          shape: 'wide-short' }, slot: { label: '2 m' } },
            ],
            stuckHint: 'Remember: 1 m = 100 cm. Convert everything to the same unit first.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Now that we’re settled, I want the exact layout. Some measurements are in different units, others need a quick calculation.' },
        { text: 'Two rounds: first the basics (conversions, arithmetic, area, perimeter), then the trickier ones — ratios and percentages.' },
        { text: 'Tap an item, then its equivalent value.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Decimals, area, perimeter',
            intro: 'Let’s start with the straightforward stuff. Match each item to its value.',
            pairs: [
              { id: 'r1p1', item: { label: '2.4 m couch doubled',          sublabel: '2 × 2.4 = ?',          shape: 'long-rect'  }, slot: { label: '4.8 m' } },
              { id: 'r1p2', item: { label: 'Half of a 2.4 m couch',         sublabel: '2.4 ÷ 2 = ?',          shape: 'long-rect'  }, slot: { label: '1.2 m' } },
              { id: 'r1p3', item: { label: '5 m wall − 2.4 m couch',        sublabel: 'split evenly each side', shape: 'huge-wide' }, slot: { label: '1.3 m each side' } },
              { id: 'r1p4', item: { label: '100 cm + 1.5 m + 25 cm',        sublabel: 'Total length?',        shape: 'wide-short' }, slot: { label: '2.75 m' } },
              { id: 'r1p5', item: { label: 'Floor: 4.5 m × 6 m',             sublabel: 'Area?',                shape: 'huge-wide'  }, slot: { label: '27 m²' } },
              { id: 'r1p6', item: { label: 'Floor: 4.5 m × 6 m',             sublabel: 'Perimeter?',           shape: 'huge-wide'  }, slot: { label: '21 m' } },
            ],
            stuckHint: 'Area = length × width. Perimeter = 2 × (length + width).',
          },
          {
            heading: 'Round 2 · Ratios and percentages',
            intro: 'Now the harder stuff — figure out the relationships between sizes.',
            pairs: [
              { id: 'r2p1', item: { label: 'Bookshelf 1.8 m : Couch 2.4 m', sublabel: 'Ratio (simplest form)?', shape: 'tall-thin'  }, slot: { label: '3 : 4' } },
              { id: 'r2p2', item: { label: 'Couch 2.4 m vs wall 5 m',        sublabel: 'Couch is what % of wall?', shape: 'long-rect' }, slot: { label: '48 %' } },
              { id: 'r2p3', item: { label: 'Door 0.9 m / wall 4.5 m',        sublabel: 'Door is what % of wall?',  shape: 'tall-thin' }, slot: { label: '20 %' } },
              { id: 'r2p4', item: { label: 'TV 1.2 m on 5 m wall',           sublabel: 'TV covers what %?',         shape: 'wide-short'}, slot: { label: '24 %' } },
              { id: 'r2p5', item: { label: 'Couch 2.4 m : Wall 5 m',         sublabel: 'Ratio (simplest form)?',    shape: 'huge-wide' }, slot: { label: '12 : 25' } },
            ],
            stuckHint: 'Percent = (part ÷ whole) × 100. Ratios cancel like fractions — divide both sides by the same number.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH1_M2_MATERIALS: Mission = {
  id: 'act1.ch1.m2.materials',
  chapterId: 'act1.ch1',
  lead: 'caleb',
  subjects: ['science', 'reading'],
  skillTags: ['science.materials.classify', 'science.materials.properties'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi! I’m Caleb. I’m the youngest, and I want to know what everything is made of!' },
        { text: 'Houses have all kinds of stuff — wood, glass, metal, fabric. Let’s figure out what’s what.' },
        { text: 'Two rounds — first sort by material, then figure out what each material is good for.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Sort by material',
            intro: 'What is each thing made of? Tap an item, then tap its material.',
            pairs: [
              { id: 'r1p1', item: { label: 'Front door',          shape: 'tall-thin' }, slot: { label: 'Wood' } },
              { id: 'r1p2', item: { label: 'Window pane',          shape: 'wide-short' }, slot: { label: 'Glass' } },
              { id: 'r1p3', item: { label: 'Frying pan',           shape: 'small-square' }, slot: { label: 'Metal' } },
              { id: 'r1p4', item: { label: 'Couch cushion',        shape: 'wide-short' }, slot: { label: 'Fabric' } },
              { id: 'r1p5', item: { label: 'Storage bin',          shape: 'small-square' }, slot: { label: 'Plastic' } },
              { id: 'r1p6', item: { label: 'Moving box',           shape: 'wide-short' }, slot: { label: 'Cardboard' } },
            ],
            stuckHint: 'Look at what each thing feels like. Hard and shiny? Probably metal or glass.',
          },
          {
            heading: 'Round 2 · What is each material good at?',
            intro: 'Materials are picked because they do certain jobs well. Match each material to what it’s good at.',
            pairs: [
              { id: 'r2p1', item: { label: 'Glass',  shape: 'wide-short'   }, slot: { label: 'You can see through it' } },
              { id: 'r2p2', item: { label: 'Metal',  shape: 'small-square' }, slot: { label: 'Strong and feels cold' } },
              { id: 'r2p3', item: { label: 'Wool',   shape: 'wide-short'   }, slot: { label: 'Keeps you warm' } },
              { id: 'r2p4', item: { label: 'Wood',   shape: 'tall-thin'    }, slot: { label: 'Floats on water' } },
              { id: 'r2p5', item: { label: 'Rubber', shape: 'small-square' }, slot: { label: 'Bends without breaking' } },
            ],
            stuckHint: 'Think about how each thing feels in real life. Which one is squishy? Which is see-through?',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Hey! I’m Caleb. Mama T says I ask “why?” about everything. So I’m asking — why are houses made of so many different things?' },
        { text: 'Two rounds: first we’ll classify what things are made of, then figure out *why* that material was chosen.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · What is it made of?',
            intro: 'Some things are obvious, others are tricky. Match each item to its main material.',
            pairs: [
              { id: 'r1p1', item: { label: 'Hardwood floor',       shape: 'huge-wide' }, slot: { label: 'Wood' } },
              { id: 'r1p2', item: { label: 'Steel fork',            shape: 'tall-thin' }, slot: { label: 'Metal alloy' } },
              { id: 'r1p3', item: { label: 'Cotton t-shirt',         shape: 'wide-short' }, slot: { label: 'Natural fibre' } },
              { id: 'r1p4', item: { label: 'Plastic bin',           shape: 'small-square' }, slot: { label: 'Synthetic polymer' } },
              { id: 'r1p5', item: { label: 'Brick wall',             shape: 'huge-wide' }, slot: { label: 'Ceramic / stone' } },
              { id: 'r1p6', item: { label: 'Mirror',                 shape: 'wide-short' }, slot: { label: 'Glass with coating' } },
            ],
            stuckHint: 'Synthetic means human-made (like plastic). Natural fibres come from plants or animals (like cotton or wool).',
          },
          {
            heading: 'Round 2 · Why did we use that material?',
            intro: 'Each material is picked for a reason. Match each choice to its main reason.',
            pairs: [
              { id: 'r2p1', item: { label: 'Why metal pipes for water?',      shape: 'tall-thin' }, slot: { label: 'Strong and waterproof' } },
              { id: 'r2p2', item: { label: 'Why glass for windows?',           shape: 'wide-short' }, slot: { label: 'Lets light in' } },
              { id: 'r2p3', item: { label: 'Why wool for winter blankets?',    shape: 'huge-wide' }, slot: { label: 'Traps heat' } },
              { id: 'r2p4', item: { label: 'Why plastic for kids’ toys?',      shape: 'small-square' }, slot: { label: 'Light and hard to break' } },
              { id: 'r2p5', item: { label: 'Why brick for outer walls?',       shape: 'huge-wide' }, slot: { label: 'Strong and fire-resistant' } },
            ],
            stuckHint: 'Think about what the material does. Insulators trap heat; structural things are strong.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'I’m Caleb. I have a science question: what makes some materials work the way they do?' },
        { text: 'Two rounds. Round 1 classifies materials by type. Round 2 matches each material to a key property.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Classify each material',
            intro: 'Match each material to the right scientific category.',
            pairs: [
              { id: 'r1p1', item: { label: 'Glass',              shape: 'wide-short' }, slot: { label: 'Amorphous solid' } },
              { id: 'r1p2', item: { label: 'Stainless steel',     shape: 'tall-thin' }, slot: { label: 'Metallic alloy' } },
              { id: 'r1p3', item: { label: 'Wood',                 shape: 'huge-wide' }, slot: { label: 'Composite (organic)' } },
              { id: 'r1p4', item: { label: 'Cotton fabric',         shape: 'wide-short' }, slot: { label: 'Natural polymer' } },
              { id: 'r1p5', item: { label: 'Plastic bag',          shape: 'small-square' }, slot: { label: 'Synthetic polymer' } },
              { id: 'r1p6', item: { label: 'Brick',                  shape: 'small-square' }, slot: { label: 'Ceramic' } },
            ],
            stuckHint: 'Polymers are long chain molecules — natural ones come from living things; synthetic ones are made in factories.',
          },
          {
            heading: 'Round 2 · Match each material to its property',
            intro: 'Each is a "best-known for" property — pick the strongest match.',
            pairs: [
              { id: 'r2p1', item: { label: 'Conducts electricity well', shape: 'tall-thin' }, slot: { label: 'Copper' } },
              { id: 'r2p2', item: { label: 'Excellent insulator',          shape: 'small-square' }, slot: { label: 'Rubber' } },
              { id: 'r2p3', item: { label: 'Melts at low temperature',      shape: 'small-square' }, slot: { label: 'Wax' } },
              { id: 'r2p4', item: { label: 'High specific heat',             shape: 'wide-short' }, slot: { label: 'Water' } },
              { id: 'r2p5', item: { label: 'Brittle — breaks, doesn’t bend', shape: 'wide-short' }, slot: { label: 'Glass' } },
            ],
            stuckHint: 'Specific heat is how much energy a substance absorbs before getting hot — water has a famously high one.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH1_M3_BOXES: Mission = {
  id: 'act1.ch1.m3.boxes',
  chapterId: 'act1.ch1',
  lead: 'izzy',
  subjects: ['reading'],
  skillTags: ['reading.labels', 'reading.comprehension', 'reading.inference'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi! I’m Izzy. The movers brought all our boxes inside — but they’re everywhere!' },
        { text: 'I labeled them all. Let’s read each label and pick the right room to put it in.' },
        { text: 'Two rounds, easy words first then a little trickier.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Where does it go?',
            intro: 'Read each label and pick the room it belongs in.',
            pairs: [
              { id: 'r1p1', item: { label: '“Pots and pans”',     shape: 'small-square' }, slot: { label: 'Kitchen' } },
              { id: 'r1p2', item: { label: '“Bedsheets”',          shape: 'wide-short' }, slot: { label: 'Bedroom' } },
              { id: 'r1p3', item: { label: '“Soap and towels”',     shape: 'small-square' }, slot: { label: 'Bathroom' } },
              { id: 'r1p4', item: { label: '“Bikes”',                shape: 'wide-short' }, slot: { label: 'Garage' } },
              { id: 'r1p5', item: { label: '“Garden tools”',         shape: 'tall-thin' }, slot: { label: 'Backyard shed' } },
              { id: 'r1p6', item: { label: '“Books”',                 shape: 'small-square' }, slot: { label: 'Living room' } },
            ],
            stuckHint: 'Think about where you’d use each thing. Where do you sleep? Where do you cook?',
          },
          {
            heading: 'Round 2 · Whose box is it?',
            intro: 'Some boxes belong to specific people. Read carefully!',
            pairs: [
              { id: 'r2p1', item: { label: '“Caleb’s stuffed animals”',  shape: 'small-square' }, slot: { label: 'Caleb’s bedroom' } },
              { id: 'r2p2', item: { label: '“Owen’s hockey gear”',        shape: 'tall-thin' }, slot: { label: 'Garage' } },
              { id: 'r2p3', item: { label: '“Tessa’s school books”',       shape: 'wide-short' }, slot: { label: 'Tessa’s bedroom' } },
              { id: 'r2p4', item: { label: '“Mama T’s tools”',             shape: 'wide-short' }, slot: { label: 'Workshop' } },
              { id: 'r2p5', item: { label: '“Holiday decorations”',         shape: 'huge-wide' }, slot: { label: 'Basement' } },
            ],
            stuckHint: 'Match the name on the box to where that person spends time.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Hi, I’m Izzy. I’m kind of in charge of where boxes go — I like organizing things.' },
        { text: 'Some labels are full sentences, not single words. Read each one carefully.' },
        { text: 'Two rounds: clearer ones first, then ones that need a little thinking.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Read the sentence',
            intro: 'Read each box label and pick the best room.',
            pairs: [
              { id: 'r1p1', item: { label: '“Things you cook with that go on the stove”', shape: 'wide-short' }, slot: { label: 'Kitchen' } },
              { id: 'r1p2', item: { label: '“Bedtime books — chapter books only”',         shape: 'wide-short' }, slot: { label: 'Tessa’s bedroom' } },
              { id: 'r1p3', item: { label: '“Hockey gear — sticks, pads, jerseys”',         shape: 'tall-thin'  }, slot: { label: 'Garage' } },
              { id: 'r1p4', item: { label: '“Bathroom essentials — daily use”',              shape: 'small-square' }, slot: { label: 'Bathroom' } },
              { id: 'r1p5', item: { label: '“Tools for fixing things around the house”',     shape: 'wide-short' }, slot: { label: 'Workshop' } },
              { id: 'r1p6', item: { label: '“Office supplies — for Dada’s map projects”',    shape: 'small-square' }, slot: { label: 'Office' } },
            ],
            stuckHint: 'The label tells you what’s inside. Match it to the room where you’d use those things.',
          },
          {
            heading: 'Round 2 · Read between the lines',
            intro: 'These labels don’t say the room — you have to figure it out from the clue.',
            pairs: [
              { id: 'r2p1', item: { label: '“Don’t drop — fragile glass items”',  sublabel: 'Where used daily?', shape: 'wide-short' }, slot: { label: 'Kitchen cabinet' } },
              { id: 'r2p2', item: { label: '“Soft pillows and warm blankets”',     sublabel: 'For sleep',         shape: 'wide-short' }, slot: { label: 'Bedrooms' } },
              { id: 'r2p3', item: { label: '“Cold-weather coats and boots”',         sublabel: 'For going outside', shape: 'tall-thin'  }, slot: { label: 'Front closet' } },
              { id: 'r2p4', item: { label: '“Camping gear — won’t use for months”', sublabel: 'Long-term storage', shape: 'huge-wide'  }, slot: { label: 'Basement' } },
              { id: 'r2p5', item: { label: '“Books we read every night — keep them close”', sublabel: 'For evenings', shape: 'small-square' }, slot: { label: 'Living room' } },
            ],
            stuckHint: 'What is the box really for? Think about when and where you’d open it.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'I’m Izzy. The movers’ labels are sometimes weirdly written — half clue, half cryptic.' },
        { text: 'These need real inference. Read each one carefully, decide what’s inside, then pick where it belongs.' },
        { text: 'Two rounds, each five clues.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Clue → location',
            intro: 'Each label hints at what’s inside. Decide where it belongs.',
            pairs: [
              { id: 'r1p1', item: { label: '“Heirlooms — fragile, climate-controlled”',     sublabel: 'where shown off?',        shape: 'wide-short' }, slot: { label: 'Living-room display' } },
              { id: 'r1p2', item: { label: '“Open first — kitchen essentials, daily use”',    sublabel: 'first room set up',       shape: 'small-square' }, slot: { label: 'Kitchen counter' } },
              { id: 'r1p3', item: { label: '“Sharp objects, handle with care”',                sublabel: 'used for building',       shape: 'tall-thin'   }, slot: { label: 'Workshop' } },
              { id: 'r1p4', item: { label: '“Team apparel only”',                             sublabel: 'a kid who plays sports',  shape: 'wide-short' }, slot: { label: 'Owen’s closet' } },
              { id: 'r1p5', item: { label: '“Old maps, climate-controlled”',                   sublabel: 'a geography fan',         shape: 'huge-wide'  }, slot: { label: 'Dada T’s office' } },
              { id: 'r1p6', item: { label: '“No rush — store as needed”',                      sublabel: 'long-term',                shape: 'huge-wide' }, slot: { label: 'Basement' } },
            ],
            stuckHint: 'Use sublabels as direct clues. "Daily use" means a frequently-accessed room.',
          },
          {
            heading: 'Round 2 · Why and where',
            intro: 'Now the clues are even less direct. Reason it out.',
            pairs: [
              { id: 'r2p1', item: { label: '“Won’t need until December”',          sublabel: 'seasonal',                 shape: 'huge-wide'  }, slot: { label: 'Basement storage' } },
              { id: 'r2p2', item: { label: '“Off-season — pack to the back”',       sublabel: 'rotates by weather',       shape: 'wide-short' }, slot: { label: 'Back of closet' } },
              { id: 'r2p3', item: { label: '“For our pet — fox plush + bowl + bed”', sublabel: 'companion is a stuffie',  shape: 'small-square' }, slot: { label: 'Caleb’s bedroom' } },
              { id: 'r2p4', item: { label: '“Empty — but keep, we might move again”', sublabel: 'flat storage',           shape: 'huge-wide' }, slot: { label: 'Garage shelf' } },
              { id: 'r2p5', item: { label: '“Newspaper-wrapped, top of box marked ↑”', sublabel: 'fragile + oriented',      shape: 'wide-short' }, slot: { label: 'Kitchen cabinets' } },
            ],
            stuckHint: 'The sublabel often gives the real "what" — match by who or what the items relate to.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH1_M4_NEIGHBORHOOD: Mission = {
  id: 'act1.ch1.m4.neighborhood',
  chapterId: 'act1.ch1',
  lead: 'dada_t',
  subjects: ['geography', 'social-studies'],
  skillTags: ['geo.toronto.landmarks', 'geo.ontario.basics', 'geo.canada.basics'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi, I’m Dada T! I love maps and learning about places.' },
        { text: 'Our new house is in Toronto, Ontario, Canada. Let’s learn what’s nearby and what’s farther away.' },
        { text: 'Two rounds — local landmarks first, then about Canada.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Around Toronto',
            intro: 'Match each Toronto place to what it is.',
            pairs: [
              { id: 'r1p1', item: { label: 'CN Tower',           shape: 'tall-thin' }, slot: { label: 'A very tall tower downtown' } },
              { id: 'r1p2', item: { label: 'Lake Ontario',        shape: 'huge-wide' }, slot: { label: 'A big lake south of the city' } },
              { id: 'r1p3', item: { label: 'High Park',            shape: 'wide-short' }, slot: { label: 'A big park in west Toronto' } },
              { id: 'r1p4', item: { label: 'Toronto Zoo',           shape: 'wide-short' }, slot: { label: 'Where the animals live' } },
              { id: 'r1p5', item: { label: 'Subway',                  shape: 'long-rect' }, slot: { label: 'How you get around fast' } },
              { id: 'r1p6', item: { label: 'Hockey Hall of Fame',     shape: 'small-square' }, slot: { label: 'Where the hockey trophies are' } },
            ],
            stuckHint: 'Read the description as a hint. Tall building? Tower. Animals? Zoo.',
          },
          {
            heading: 'Round 2 · Across Canada',
            intro: 'Match each part of Canada to what it is.',
            pairs: [
              { id: 'r2p1', item: { label: 'Capital of Canada',   shape: 'small-square' }, slot: { label: 'Ottawa' } },
              { id: 'r2p2', item: { label: 'Country south of us',    shape: 'huge-wide' }, slot: { label: 'United States' } },
              { id: 'r2p3', item: { label: 'Ocean to the west',       shape: 'huge-wide' }, slot: { label: 'Pacific Ocean' } },
              { id: 'r2p4', item: { label: 'Ocean to the east',       shape: 'huge-wide' }, slot: { label: 'Atlantic Ocean' } },
              { id: 'r2p5', item: { label: 'Big mountains',            shape: 'huge-wide' }, slot: { label: 'The Rockies (out west)' } },
            ],
            stuckHint: 'Think of Canada on a map. East is right, west is left.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'I’m Dada T. Now that we live in Toronto, let me show you around — first nearby, then across the country.' },
        { text: 'Two rounds: Toronto + Ontario, then Canada-wide.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Toronto and Ontario',
            intro: 'Match each fact to the right place.',
            pairs: [
              { id: 'r1p1', item: { label: 'Provincial capital',          shape: 'small-square' }, slot: { label: 'Toronto' } },
              { id: 'r1p2', item: { label: 'Famous waterfall southwest',   shape: 'wide-short' }, slot: { label: 'Niagara Falls' } },
              { id: 'r1p3', item: { label: 'Largest Great Lake by area',   shape: 'huge-wide' }, slot: { label: 'Lake Superior' } },
              { id: 'r1p4', item: { label: 'River valley in east Toronto',  shape: 'long-rect' }, slot: { label: 'Don Valley' } },
              { id: 'r1p5', item: { label: 'Islands just offshore',          shape: 'wide-short' }, slot: { label: 'Toronto Islands' } },
              { id: 'r1p6', item: { label: 'Main east-west highway',         shape: 'huge-wide' }, slot: { label: 'Highway 401' } },
            ],
            stuckHint: 'Niagara is in the same direction as the U.S. border — southwest of Toronto.',
          },
          {
            heading: 'Round 2 · Canada at a glance',
            intro: 'Match each Canadian fact to its answer.',
            pairs: [
              { id: 'r2p1', item: { label: 'Number of provinces',           shape: 'small-square' }, slot: { label: '10 provinces' } },
              { id: 'r2p2', item: { label: 'Number of territories',          shape: 'small-square' }, slot: { label: '3 territories' } },
              { id: 'r2p3', item: { label: 'Longest river',                   shape: 'huge-wide' }, slot: { label: 'Mackenzie River' } },
              { id: 'r2p4', item: { label: 'Highest mountain',                shape: 'tall-thin' }, slot: { label: 'Mount Logan' } },
              { id: 'r2p5', item: { label: 'Largest island',                   shape: 'huge-wide' }, slot: { label: 'Baffin Island' } },
            ],
            stuckHint: 'The biggest geography is mostly up north and west. The Mackenzie flows to the Arctic.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'I’m Dada T. Toronto’s a great city to land in. Let me give you the real geographic picture.' },
        { text: 'Two rounds: Toronto’s setting and structure, then Canada-wide patterns.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Toronto in context',
            intro: 'Match each fact to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: 'Toronto’s position',             sublabel: 'on which lake?',         shape: 'wide-short' }, slot: { label: 'North shore of Lake Ontario' } },
              { id: 'r1p2', item: { label: 'Major airport',                    sublabel: 'busiest in Canada',    shape: 'tall-thin' }, slot: { label: 'Pearson (YYZ)' } },
              { id: 'r1p3', item: { label: 'Dominant industries',                sublabel: 'three big ones',     shape: 'huge-wide' }, slot: { label: 'Finance, tech, media' } },
              { id: 'r1p4', item: { label: 'Climate type',                       sublabel: 'cold winters, warm summers', shape: 'wide-short' }, slot: { label: 'Humid continental' } },
              { id: 'r1p5', item: { label: 'Distance to Ottawa',                 sublabel: '~ hours by car',     shape: 'long-rect' }, slot: { label: '~ 4–5 hours' } },
              { id: 'r1p6', item: { label: 'Main public transit operator',        sublabel: 'subway + streetcars + buses', shape: 'long-rect' }, slot: { label: 'TTC' } },
            ],
            stuckHint: 'Toronto sits where Lake Ontario meets the southern shield — that climate is "humid continental."',
          },
          {
            heading: 'Round 2 · Canadian patterns',
            intro: 'Match each fact to the right province or feature.',
            pairs: [
              { id: 'r2p1', item: { label: 'Most populous province',           shape: 'huge-wide' }, slot: { label: 'Ontario' } },
              { id: 'r2p2', item: { label: 'Most French speakers',             shape: 'wide-short' }, slot: { label: 'Quebec' } },
              { id: 'r2p3', item: { label: 'Smallest by area',                  shape: 'small-square' }, slot: { label: 'Prince Edward Island' } },
              { id: 'r2p4', item: { label: 'Major oil & gas producer',          shape: 'tall-thin' }, slot: { label: 'Alberta' } },
              { id: 'r2p5', item: { label: 'Westernmost province',              shape: 'huge-wide' }, slot: { label: 'British Columbia' } },
            ],
            stuckHint: 'Think about where each province sits and what it’s famous for economically.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ===========================================================
 * CHAPTER 2 · Backyard discovery (Caleb leads; ends with yard repair)
 * =========================================================== */

const CH2_M1_BUGS: Mission = {
  id: 'act1.ch2.m1.bugs',
  chapterId: 'act1.ch2',
  lead: 'caleb',
  subjects: ['science'],
  skillTags: ['science.living-things.classify', 'science.ecosystems.roles'],
  tiers: {
    1: {
      wrapper: [
        { text: 'It’s Caleb again! Our backyard is a JUNGLE. Weeds everywhere, but also bugs!' },
        { text: 'Help me find them. Round 1 names the bugs. Round 2 figures out what each one does.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Name that bug',
            intro: 'Match each bug to its name.',
            pairs: [
              { id: 'r1p1', item: { label: 'Small, red with black spots',   shape: 'small-square' }, slot: { label: 'Ladybug' } },
              { id: 'r1p2', item: { label: 'Tiny, walks in a line',           shape: 'tall-thin' }, slot: { label: 'Ant' } },
              { id: 'r1p3', item: { label: 'Fuzzy, buzzes, yellow & black',     shape: 'small-square' }, slot: { label: 'Bee' } },
              { id: 'r1p4', item: { label: 'Big colourful wings',                shape: 'wide-short' }, slot: { label: 'Butterfly' } },
              { id: 'r1p5', item: { label: 'Eight legs, spins webs',              shape: 'small-square' }, slot: { label: 'Spider' } },
              { id: 'r1p6', item: { label: 'Long, squishy, lives in dirt',        shape: 'long-rect' }, slot: { label: 'Earthworm' } },
            ],
            stuckHint: 'How many legs? What colour? Does it fly?',
          },
          {
            heading: 'Round 2 · What do they do?',
            intro: 'Each bug has a job in the yard. Match it!',
            pairs: [
              { id: 'r2p1', item: { label: 'Bee',         shape: 'small-square' }, slot: { label: 'Makes honey, visits flowers' } },
              { id: 'r2p2', item: { label: 'Earthworm',   shape: 'long-rect'    }, slot: { label: 'Makes the soil better' } },
              { id: 'r2p3', item: { label: 'Ant',         shape: 'tall-thin'    }, slot: { label: 'Lives in groups underground' } },
              { id: 'r2p4', item: { label: 'Spider',       shape: 'small-square' }, slot: { label: 'Eats other bugs' } },
              { id: 'r2p5', item: { label: 'Butterfly',     shape: 'wide-short'  }, slot: { label: 'Helps pollinate flowers' } },
            ],
            stuckHint: 'Bees and butterflies both like flowers. Worms love dirt!',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb here! Our yard has SO MANY bugs. Some help us, some are pests — let’s figure out which is which.' },
        { text: 'Round 1: identify them more precisely. Round 2: what role does each one play in our garden?' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Specific species',
            intro: 'Match each clue to the bug.',
            pairs: [
              { id: 'r1p1', item: { label: 'Yellow & black, makes honey',          shape: 'small-square' }, slot: { label: 'Honey bee' } },
              { id: 'r1p2', item: { label: 'Tunnels in soil, no eyes',              shape: 'long-rect' }, slot: { label: 'Earthworm' } },
              { id: 'r1p3', item: { label: 'Burrows into wood',                      shape: 'tall-thin' }, slot: { label: 'Carpenter ant' } },
              { id: 'r1p4', item: { label: 'Red dome, black spots, eats aphids',     shape: 'small-square' }, slot: { label: 'Ladybug' } },
              { id: 'r1p5', item: { label: 'Spins a large round web in the garden',  shape: 'wide-short' }, slot: { label: 'Garden spider' } },
              { id: 'r1p6', item: { label: 'Hovers, fast wings, lives near water',    shape: 'wide-short' }, slot: { label: 'Dragonfly' } },
            ],
            stuckHint: 'Some clues mention the home (water? wood? web?). That tells you a lot.',
          },
          {
            heading: 'Round 2 · Yard adaptations',
            intro: 'Why is each bug built the way it is?',
            pairs: [
              { id: 'r2p1', item: { label: 'Has a stinger',                shape: 'small-square' }, slot: { label: 'Bee — defends the hive' } },
              { id: 'r2p2', item: { label: 'Wings that flap super fast',     shape: 'wide-short' }, slot: { label: 'Dragonfly — fast flying' } },
              { id: 'r2p3', item: { label: 'Hard shell on the back',         shape: 'small-square' }, slot: { label: 'Ladybug — body armour' } },
              { id: 'r2p4', item: { label: 'Builds a sticky web',             shape: 'wide-short' }, slot: { label: 'Spider — catches food' } },
              { id: 'r2p5', item: { label: 'Strong jaws (mandibles)',          shape: 'tall-thin' }, slot: { label: 'Carpenter ant — chews wood' } },
            ],
            stuckHint: 'Each adaptation gives the bug an advantage in its habitat.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb here. I’m getting more serious about backyard biology — let’s use real taxonomy.' },
        { text: 'Round 1: scientific classification. Round 2: ecological roles and life cycles.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Taxonomic groups',
            intro: 'Match each backyard creature to its scientific group.',
            pairs: [
              { id: 'r1p1', item: { label: 'Ladybug',     shape: 'small-square' }, slot: { label: 'Coleoptera (beetles)' } },
              { id: 'r1p2', item: { label: 'Honey bee',    shape: 'small-square' }, slot: { label: 'Hymenoptera' } },
              { id: 'r1p3', item: { label: 'Butterfly',     shape: 'wide-short' }, slot: { label: 'Lepidoptera' } },
              { id: 'r1p4', item: { label: 'Spider',         shape: 'small-square' }, slot: { label: 'Arachnida (not an insect)' } },
              { id: 'r1p5', item: { label: 'Earthworm',       shape: 'long-rect' }, slot: { label: 'Annelida (not an insect)' } },
              { id: 'r1p6', item: { label: 'Dragonfly',         shape: 'wide-short' }, slot: { label: 'Odonata' } },
            ],
            stuckHint: 'Spiders have 8 legs — they’re not insects. Earthworms are segmented worms (annelids).',
          },
          {
            heading: 'Round 2 · Roles & life cycles',
            intro: 'Match each clue to its bug.',
            pairs: [
              { id: 'r2p1', item: { label: 'Complete metamorphosis: egg → larva → pupa → adult', shape: 'wide-short' }, slot: { label: 'Butterfly' } },
              { id: 'r2p2', item: { label: 'Incomplete metamorphosis: egg → nymph → adult',       shape: 'wide-short' }, slot: { label: 'Dragonfly' } },
              { id: 'r2p3', item: { label: 'Eusocial: colonies with a queen and workers',          shape: 'small-square' }, slot: { label: 'Honey bee' } },
              { id: 'r2p4', item: { label: 'Predatory beetle — controls aphid populations',         shape: 'small-square' }, slot: { label: 'Ladybug' } },
              { id: 'r2p5', item: { label: 'Detritivore — feeds on decomposing matter',              shape: 'long-rect' }, slot: { label: 'Earthworm' } },
            ],
            stuckHint: 'Butterflies have four life stages; dragonflies skip the pupal one.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH2_M2_GARDEN_MATH: Mission = {
  id: 'act1.ch2.m2.garden-math',
  chapterId: 'act1.ch2',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['math.counting', 'math.area', 'math.patterns', 'math.rates'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi, Izzy here! We’re going to plant a vegetable garden in the cleaned-up yard. But first: math!' },
        { text: 'Round 1: counting and shapes. Round 2: spotting patterns.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Count and measure',
            intro: 'Match each question to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: '4 rows of 3 tomato plants',     shape: 'wide-short' }, slot: { label: '12 tomatoes' } },
              { id: 'r1p2', item: { label: '2 + 5 carrot seeds',              shape: 'tall-thin' }, slot: { label: '7 carrots' } },
              { id: 'r1p3', item: { label: 'Square bed, each side 1 m',       shape: 'small-square' }, slot: { label: '1 m² area' } },
              { id: 'r1p4', item: { label: 'Rectangle bed, 2 m × 1 m',        shape: 'wide-short' }, slot: { label: '2 m² area' } },
              { id: 'r1p5', item: { label: '10 seeds split between 2 rows',   shape: 'long-rect' }, slot: { label: '5 per row' } },
              { id: 'r1p6', item: { label: 'Half of 8 cucumber plants',         shape: 'small-square' }, slot: { label: '4 cucumbers' } },
            ],
            stuckHint: 'For a rectangle: area = length × width. Half means divide by 2.',
          },
          {
            heading: 'Round 2 · Patterns',
            intro: 'What comes next? Match each pattern to its missing piece.',
            pairs: [
              { id: 'r2p1', item: { label: '1, 2, 3, 4, ?',                     shape: 'long-rect' }, slot: { label: '5' } },
              { id: 'r2p2', item: { label: '2, 4, 6, 8, ?',                       shape: 'long-rect' }, slot: { label: '10' } },
              { id: 'r2p3', item: { label: 'Red, blue, red, blue, ?',              shape: 'wide-short' }, slot: { label: 'Red' } },
              { id: 'r2p4', item: { label: '5, 10, 15, 20, ?',                     shape: 'huge-wide' }, slot: { label: '25' } },
              { id: 'r2p5', item: { label: '⭐, ⭐⭐, ⭐⭐⭐, ?',                     shape: 'wide-short' }, slot: { label: '⭐⭐⭐⭐' } },
            ],
            stuckHint: 'Look at the difference between numbers. Counting by 1? By 2? By 5?',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy here. Planning the garden takes some real math — bed sizes, plant spacing, yields.' },
        { text: 'Round 1: areas and totals. Round 2: rates and multiplication.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Areas and totals',
            intro: 'Match each garden problem to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: 'Bed 3 m × 2 m',                  shape: 'wide-short' }, slot: { label: '6 m² area' } },
              { id: 'r1p2', item: { label: '4 beds of 6 m² each',              shape: 'huge-wide' }, slot: { label: '24 m² total' } },
              { id: 'r1p3', item: { label: 'Square bed, 12 m perimeter',       shape: 'small-square' }, slot: { label: '3 m per side' } },
              { id: 'r1p4', item: { label: 'Half a 5 m² bed',                   shape: 'wide-short' }, slot: { label: '2.5 m²' } },
              { id: 'r1p5', item: { label: '1 m² = ? square cm',                shape: 'small-square' }, slot: { label: '10 000 cm²' } },
              { id: 'r1p6', item: { label: 'Bed 2.5 m × 4 m',                   shape: 'long-rect' }, slot: { label: '10 m² area' } },
            ],
            stuckHint: 'Square units multiply too: 1 m × 1 m = 1 m² = 100 cm × 100 cm = 10 000 cm².',
          },
          {
            heading: 'Round 2 · Rates and harvests',
            intro: 'Match each problem to its answer.',
            pairs: [
              { id: 'r2p1', item: { label: '3 tomato plants × 4 rows',         shape: 'wide-short' }, slot: { label: '12 plants' } },
              { id: 'r2p2', item: { label: '4 plants × 8 tomatoes each',       shape: 'wide-short' }, slot: { label: '32 tomatoes' } },
              { id: 'r2p3', item: { label: '6 cucumbers × 5 plants',            shape: 'wide-short' }, slot: { label: '30 cucumbers' } },
              { id: 'r2p4', item: { label: '24 seeds, 4 trays',                  shape: 'long-rect' }, slot: { label: '6 seeds / tray' } },
              { id: 'r2p5', item: { label: '3 cm growth per week × 5 weeks',     shape: 'tall-thin' }, slot: { label: '15 cm' } },
            ],
            stuckHint: 'Rate × time = total. Or total ÷ groups = per group.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy here. Time to plan the garden properly: area, perimeter, scale drawings.' },
        { text: 'Round 1: area / perimeter / scale. Round 2: yields, water needs, crop rotation.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Area, perimeter, scale',
            intro: 'Match each problem to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: 'Rectangle 4.5 m × 3.2 m',          sublabel: 'area?',           shape: 'wide-short' }, slot: { label: '14.4 m²' } },
              { id: 'r1p2', item: { label: 'Rectangle 4.5 m × 3.2 m',          sublabel: 'perimeter?',     shape: 'wide-short' }, slot: { label: '15.4 m' } },
              { id: 'r1p3', item: { label: 'Triangle bed: base 4 m, height 3 m', sublabel: 'area?',         shape: 'tall-thin' }, slot: { label: '6 m²' } },
              { id: 'r1p4', item: { label: 'Bed scaled 1:50, on paper 8 cm',    sublabel: 'real length?',   shape: 'huge-wide' }, slot: { label: '4 m' } },
              { id: 'r1p5', item: { label: 'Doubling a 5 m² bed',                sublabel: 'new area?',     shape: 'wide-short' }, slot: { label: '10 m²' } },
              { id: 'r1p6', item: { label: 'L-shaped bed: 2×3 + 2×1 rectangles', sublabel: 'total area?',  shape: 'wide-short' }, slot: { label: '8 m²' } },
            ],
            stuckHint: 'Triangle area = ½ × base × height. For scale 1:50, every paper unit equals 50 real units.',
          },
          {
            heading: 'Round 2 · Yields, water, rotation',
            intro: 'Match each garden-planning problem.',
            pairs: [
              { id: 'r2p1', item: { label: 'Tomato yields 12 / m². Bed = 6 m².', sublabel: 'Total tomatoes?', shape: 'wide-short' }, slot: { label: '72 tomatoes' } },
              { id: 'r2p2', item: { label: '50 g seeds / m². Beds: 8 m².',        sublabel: 'Seed needed?',    shape: 'small-square' }, slot: { label: '400 g' } },
              { id: 'r2p3', item: { label: '4 L water / m² / day. 10 m² beds.',   sublabel: 'Daily water?',    shape: 'huge-wide' }, slot: { label: '40 L per day' } },
              { id: 'r2p4', item: { label: 'Crop rotation: 4-year cycle, start Y1', sublabel: 'When does Y1 repeat?', shape: 'long-rect' }, slot: { label: 'Year 5' } },
              { id: 'r2p5', item: { label: 'Seedling 3 cm/week × 8 weeks',          sublabel: 'Total growth?',   shape: 'tall-thin' }, slot: { label: '24 cm' } },
            ],
            stuckHint: 'Yield × area = total. Cycle lengths add to themselves to find the next "Year 1."',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH2_M3_LABELS: Mission = {
  id: 'act1.ch2.m3.labels',
  chapterId: 'act1.ch2',
  lead: 'caleb',
  subjects: ['reading', 'science'],
  skillTags: ['reading.descriptions', 'reading.inference', 'science.living-things.id'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Caleb again! I made labels for the plants and birds in our yard. Help me read them.' },
        { text: 'Round 1: plants. Round 2: birds.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Plant labels',
            intro: 'Read each label and pick the plant.',
            pairs: [
              { id: 'r1p1', item: { label: '“Yellow flower, follows the sun”',      shape: 'tall-thin' }, slot: { label: 'Sunflower' } },
              { id: 'r1p2', item: { label: '“Red and round, fruit in summer”',        shape: 'small-square' }, slot: { label: 'Tomato' } },
              { id: 'r1p3', item: { label: '“Orange root, grows in dirt”',             shape: 'long-rect' }, slot: { label: 'Carrot' } },
              { id: 'r1p4', item: { label: '“Tall tree with leaves that turn red”',     shape: 'huge-wide' }, slot: { label: 'Maple' } },
              { id: 'r1p5', item: { label: '“Climbs walls, small purple flowers”',       shape: 'tall-thin' }, slot: { label: 'Vine' } },
              { id: 'r1p6', item: { label: '“Yellow blossoms in spring, edible leaves”', shape: 'small-square' }, slot: { label: 'Dandelion' } },
            ],
            stuckHint: 'Colour and shape clues are your friend. "Red and round" = a tomato!',
          },
          {
            heading: 'Round 2 · Bird labels',
            intro: 'Read each label and pick the bird.',
            pairs: [
              { id: 'r2p1', item: { label: '“Small bird with a red chest”',         shape: 'small-square' }, slot: { label: 'Robin' } },
              { id: 'r2p2', item: { label: '“Black bird, loud caw”',                 shape: 'small-square' }, slot: { label: 'Crow' } },
              { id: 'r2p3', item: { label: '“Blue feathers, smart, eats nuts”',       shape: 'wide-short' }, slot: { label: 'Blue jay' } },
              { id: 'r2p4', item: { label: '“Tiny, black cap, chickadee-dee-dee”',     shape: 'small-square' }, slot: { label: 'Chickadee' } },
              { id: 'r2p5', item: { label: '“Yellow underneath, eats seeds”',           shape: 'small-square' }, slot: { label: 'Goldfinch' } },
            ],
            stuckHint: 'Listen to the label say it out loud. "Chickadee-dee-dee" is the chickadee’s own call!',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb. I read up on more species — these are trickier.' },
        { text: 'Round 1: more specific plant and bird IDs. Round 2: descriptors and behaviours.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Species in the yard',
            intro: 'Match each description to its species.',
            pairs: [
              { id: 'r1p1', item: { label: '“Native Canadian tree, sap makes syrup”',         shape: 'huge-wide' }, slot: { label: 'Sugar maple' } },
              { id: 'r1p2', item: { label: '“Garden veg with an underground bulb”',             shape: 'small-square' }, slot: { label: 'Onion' } },
              { id: 'r1p3', item: { label: '“Smart blue songbird, loves peanuts”',                shape: 'wide-short' }, slot: { label: 'Blue jay' } },
              { id: 'r1p4', item: { label: '“Black-and-white, says ‘chickadee-dee-dee’”',         shape: 'small-square' }, slot: { label: 'Black-capped chickadee' } },
              { id: 'r1p5', item: { label: '“Climbing vine, autumn red leaves”',                  shape: 'tall-thin' }, slot: { label: 'Virginia creeper' } },
              { id: 'r1p6', item: { label: '“Sunny yellow blossoms; leaves used in salad”',        shape: 'small-square' }, slot: { label: 'Dandelion' } },
            ],
            stuckHint: 'Maple sap = the only tree that makes syrup. Chickadees literally name themselves.',
          },
          {
            heading: 'Round 2 · Words for plants and birds',
            intro: 'Match each term to what it means.',
            pairs: [
              { id: 'r2p1', item: { label: 'Migratory',     shape: 'wide-short' }, slot: { label: 'Birds that fly south for winter' } },
              { id: 'r2p2', item: { label: 'Perennial',      shape: 'small-square' }, slot: { label: 'Plant that comes back every year' } },
              { id: 'r2p3', item: { label: 'Annual',         shape: 'small-square' }, slot: { label: 'Plant you replant every year' } },
              { id: 'r2p4', item: { label: 'Resident',        shape: 'wide-short' }, slot: { label: 'Bird that stays all year' } },
              { id: 'r2p5', item: { label: 'Evergreen',       shape: 'tall-thin' }, slot: { label: 'Leaves stay green all year' } },
            ],
            stuckHint: 'Perennial = "through the year" — keeps coming back. Annual = "yearly" — once and done.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb. Real backyard biology, with vocabulary to match.' },
        { text: 'Round 1: tricky ID clues. Round 2: ecology terms.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Tricky descriptions',
            intro: 'Each one is subtle — pick the species.',
            pairs: [
              { id: 'r1p1', item: { label: '“Native softwood, evergreen needles, fragrant”',  shape: 'tall-thin' }, slot: { label: 'Eastern white pine' } },
              { id: 'r1p2', item: { label: '“Invasive but vital host for monarchs”',             shape: 'wide-short' }, slot: { label: 'Common milkweed' } },
              { id: 'r1p3', item: { label: '“Hovers in place, drinks nectar, wings buzz”',        shape: 'small-square' }, slot: { label: 'Hummingbird' } },
              { id: 'r1p4', item: { label: '“Mimics other birds’ songs and human noises”',        shape: 'wide-short' }, slot: { label: 'Mockingbird' } },
              { id: 'r1p5', item: { label: '“Small yellow songbird, breeds in marshy thickets”',   shape: 'small-square' }, slot: { label: 'Yellow warbler' } },
              { id: 'r1p6', item: { label: '“Edible perennial, orange roots, used in syrup blends”', shape: 'long-rect' }, slot: { label: 'Carrot' } },
            ],
            stuckHint: 'Monarch butterflies famously lay eggs ONLY on milkweed.',
          },
          {
            heading: 'Round 2 · Ecology terms',
            intro: 'Match each term to its definition.',
            pairs: [
              { id: 'r2p1', item: { label: 'Habitat',     shape: 'wide-short' }, slot: { label: 'Where an organism lives' } },
              { id: 'r2p2', item: { label: 'Niche',        shape: 'small-square' }, slot: { label: 'The job an organism does in its ecosystem' } },
              { id: 'r2p3', item: { label: 'Herbivore',    shape: 'wide-short' }, slot: { label: 'Eats plants only' } },
              { id: 'r2p4', item: { label: 'Carnivore',     shape: 'small-square' }, slot: { label: 'Eats animals only' } },
              { id: 'r2p5', item: { label: 'Omnivore',      shape: 'small-square' }, slot: { label: 'Eats both plants and animals' } },
            ],
            stuckHint: '"Habitat" = the place. "Niche" = the role.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

const CH2_M4_YARD_MAP: Mission = {
  id: 'act1.ch2.m4.yard-map',
  chapterId: 'act1.ch2',
  lead: 'dada_t',
  subjects: ['geography'],
  skillTags: ['geo.maps.basics', 'geo.directions', 'geo.toronto.context'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Dada T here. I love maps! Let’s make a map of our yard.' },
        { text: 'Round 1: parts of the yard. Round 2: directions and a few Toronto basics.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Yard features',
            intro: 'Match each clue to the yard part.',
            pairs: [
              { id: 'r1p1', item: { label: 'The grass behind the house',     shape: 'huge-wide' }, slot: { label: 'Backyard' } },
              { id: 'r1p2', item: { label: 'The path from the street to door', shape: 'long-rect' }, slot: { label: 'Front walk' } },
              { id: 'r1p3', item: { label: 'Where Mama T parks her car',        shape: 'wide-short' }, slot: { label: 'Garage' } },
              { id: 'r1p4', item: { label: 'Where the lawnmower lives',          shape: 'small-square' }, slot: { label: 'Backyard shed' } },
              { id: 'r1p5', item: { label: 'Grass strip outside the windows',     shape: 'long-rect' }, slot: { label: 'Side yard' } },
              { id: 'r1p6', item: { label: 'The boundary with the neighbours',     shape: 'huge-wide' }, slot: { label: 'Fence' } },
            ],
            stuckHint: 'Think about where each part of the yard is in real life.',
          },
          {
            heading: 'Round 2 · Directions & Toronto',
            intro: 'Match each clue to its answer.',
            pairs: [
              { id: 'r2p1', item: { label: 'Where the sun rises',          shape: 'small-square' }, slot: { label: 'East' } },
              { id: 'r2p2', item: { label: 'Where the sun sets',            shape: 'small-square' }, slot: { label: 'West' } },
              { id: 'r2p3', item: { label: 'Top of a map (usually)',         shape: 'wide-short' }, slot: { label: 'North' } },
              { id: 'r2p4', item: { label: 'Big water Toronto sits on',       shape: 'huge-wide' }, slot: { label: 'Lake Ontario' } },
              { id: 'r2p5', item: { label: 'Country south of Canada',           shape: 'huge-wide' }, slot: { label: 'United States' } },
            ],
            stuckHint: 'North-East-South-West, going clockwise on a map.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Dada T. A map of the yard is just a tiny version of a map of the world. Let’s practice both.' },
        { text: 'Round 1: yard layout in map terms. Round 2: Toronto on the bigger map.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Yard in map terms',
            intro: 'Match each yard feature to its description.',
            pairs: [
              { id: 'r1p1', item: { label: 'Garage',                   shape: 'wide-short' }, slot: { label: 'Building for car storage' } },
              { id: 'r1p2', item: { label: 'Front lawn',                 shape: 'long-rect' }, slot: { label: 'Grass strip at the front' } },
              { id: 'r1p3', item: { label: 'Backyard',                    shape: 'huge-wide' }, slot: { label: 'Larger grassy area for play' } },
              { id: 'r1p4', item: { label: 'Garden plot',                  shape: 'wide-short' }, slot: { label: 'Where vegetables grow' } },
              { id: 'r1p5', item: { label: 'Shed',                          shape: 'small-square' }, slot: { label: 'Tool storage outbuilding' } },
              { id: 'r1p6', item: { label: 'Boundary trees',                 shape: 'tall-thin' }, slot: { label: 'Line of trees marking edge' } },
            ],
            stuckHint: 'Pay attention to "outbuilding" (a small extra building) vs the main house.',
          },
          {
            heading: 'Round 2 · Toronto map skills',
            intro: 'Match each Toronto fact to its answer.',
            pairs: [
              { id: 'r2p1', item: { label: 'Body of water Toronto sits on', shape: 'huge-wide' }, slot: { label: 'Lake Ontario' } },
              { id: 'r2p2', item: { label: 'Main north-south street downtown', shape: 'tall-thin' }, slot: { label: 'Yonge Street' } },
              { id: 'r2p3', item: { label: 'Downtown business core',           shape: 'wide-short' }, slot: { label: 'Financial District' } },
              { id: 'r2p4', item: { label: 'Toronto’s main airport',             shape: 'tall-thin' }, slot: { label: 'Pearson (YYZ)' } },
              { id: 'r2p5', item: { label: 'Cluster of islands in the lake',     shape: 'wide-short' }, slot: { label: 'Toronto Islands' } },
            ],
            stuckHint: 'Yonge runs north-south through the heart of the city.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Cartography time. Layer 1: our yard. Layer 2: where Toronto sits in Ontario and the world.' },
        { text: 'Two rounds.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Map terms applied',
            intro: 'Match each map concept to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: 'Map scale 1:100 — 1 cm equals…',  shape: 'small-square' }, slot: { label: '1 m in real life' } },
              { id: 'r1p2', item: { label: 'Direction toward Lake Ontario from our yard', shape: 'huge-wide' }, slot: { label: 'South' } },
              { id: 'r1p3', item: { label: 'Lines showing elevation',           shape: 'long-rect' }, slot: { label: 'Contour lines' } },
              { id: 'r1p4', item: { label: 'Symbol for a cluster of trees',      shape: 'wide-short' }, slot: { label: 'Round dotted shapes' } },
              { id: 'r1p5', item: { label: 'A line marking property edge',         shape: 'long-rect' }, slot: { label: 'Boundary line' } },
              { id: 'r1p6', item: { label: 'Map showing only a small area',         shape: 'small-square' }, slot: { label: 'Large-scale map' } },
            ],
            stuckHint: '"Large-scale" maps zoom IN to small areas — confusing but correct.',
          },
          {
            heading: 'Round 2 · Toronto in context',
            intro: 'Match each fact.',
            pairs: [
              { id: 'r2p1', item: { label: 'Toronto’s approximate latitude',   shape: 'wide-short' }, slot: { label: '~43° N' } },
              { id: 'r2p2', item: { label: 'Toronto’s position on Lake Ontario', shape: 'huge-wide' }, slot: { label: 'Northwestern shore' } },
              { id: 'r2p3', item: { label: 'Border closest to Toronto',          shape: 'long-rect' }, slot: { label: 'US border (south)' } },
              { id: 'r2p4', item: { label: 'Direction from Toronto to Ottawa',    shape: 'long-rect' }, slot: { label: 'Northeast' } },
              { id: 'r2p5', item: { label: 'Standard time zone in Toronto',        shape: 'small-square' }, slot: { label: 'Eastern (UTC-5)' } },
            ],
            stuckHint: 'Ottawa is up the St. Lawrence — northeast of Toronto.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ===========================================================
 * Aggregates
 * =========================================================== */

import { CH3_M1_LOGIC, CH3_M2_CODING, CH3_M3_GAME_MATH, CH3_M4_WORDS } from './missions-ch3';
import { CH4_M1_SPORTS_MATH, CH4_M2_ROAD_TRIP, CH4_M3_STATS, CH4_M4_HISTORY } from './missions-ch4';
import { CH5_M1_ROBOT, CH5_M2_MACHINES, CH5_M3_BUDGET, CH6_M1_FRACTIONS, CH6_M2_FOOD_GEO, CH6_M3_KITCHEN_SCI } from './missions-ch5-6';
import { CH7_M1_WORLD, CH7_M2_STORIES, CH7_M3_ROUTE, CH8_M1_WEATHER, CH8_M2_WATER, CH8_M3_STORMPROOF } from './missions-ch7-8';
import { CH9_M1_GEOMETRY, CH9_M2_BUILD_BUDGET, CH9_M3_SMARTBOT, CH10_M1_MEDIA, CH10_M2_FACT_OPINION, CH10_M3_SURVEY } from './missions-ch9-10';
import { CH11_M1_METHOD, CH11_M2_SPACE, CH11_M3_RESULTS, CH12_M1_ELECTIONS, CH12_M2_PERSUASION, CH12_M3_GOVERNMENTS } from './missions-ch11-12';

export const MISSIONS: Record<string, Mission> = {
  [CH1_M1_MEASURING.id]: CH1_M1_MEASURING,
  [CH1_M2_MATERIALS.id]: CH1_M2_MATERIALS,
  [CH1_M3_BOXES.id]: CH1_M3_BOXES,
  [CH1_M4_NEIGHBORHOOD.id]: CH1_M4_NEIGHBORHOOD,

  [CH2_M1_BUGS.id]: CH2_M1_BUGS,
  [CH2_M2_GARDEN_MATH.id]: CH2_M2_GARDEN_MATH,
  [CH2_M3_LABELS.id]: CH2_M3_LABELS,
  [CH2_M4_YARD_MAP.id]: CH2_M4_YARD_MAP,

  [CH3_M1_LOGIC.id]: CH3_M1_LOGIC,
  [CH3_M2_CODING.id]: CH3_M2_CODING,
  [CH3_M3_GAME_MATH.id]: CH3_M3_GAME_MATH,
  [CH3_M4_WORDS.id]: CH3_M4_WORDS,

  [CH4_M1_SPORTS_MATH.id]: CH4_M1_SPORTS_MATH,
  [CH4_M2_ROAD_TRIP.id]: CH4_M2_ROAD_TRIP,
  [CH4_M3_STATS.id]: CH4_M3_STATS,
  [CH4_M4_HISTORY.id]: CH4_M4_HISTORY,

  [CH5_M1_ROBOT.id]: CH5_M1_ROBOT,
  [CH5_M2_MACHINES.id]: CH5_M2_MACHINES,
  [CH5_M3_BUDGET.id]: CH5_M3_BUDGET,
  [CH6_M1_FRACTIONS.id]: CH6_M1_FRACTIONS,
  [CH6_M2_FOOD_GEO.id]: CH6_M2_FOOD_GEO,
  [CH6_M3_KITCHEN_SCI.id]: CH6_M3_KITCHEN_SCI,
  [CH7_M1_WORLD.id]: CH7_M1_WORLD,
  [CH7_M2_STORIES.id]: CH7_M2_STORIES,
  [CH7_M3_ROUTE.id]: CH7_M3_ROUTE,
  [CH8_M1_WEATHER.id]: CH8_M1_WEATHER,
  [CH8_M2_WATER.id]: CH8_M2_WATER,
  [CH8_M3_STORMPROOF.id]: CH8_M3_STORMPROOF,

  [CH9_M1_GEOMETRY.id]: CH9_M1_GEOMETRY,
  [CH9_M2_BUILD_BUDGET.id]: CH9_M2_BUILD_BUDGET,
  [CH9_M3_SMARTBOT.id]: CH9_M3_SMARTBOT,
  [CH10_M1_MEDIA.id]: CH10_M1_MEDIA,
  [CH10_M2_FACT_OPINION.id]: CH10_M2_FACT_OPINION,
  [CH10_M3_SURVEY.id]: CH10_M3_SURVEY,
  [CH11_M1_METHOD.id]: CH11_M1_METHOD,
  [CH11_M2_SPACE.id]: CH11_M2_SPACE,
  [CH11_M3_RESULTS.id]: CH11_M3_RESULTS,
  [CH12_M1_ELECTIONS.id]: CH12_M1_ELECTIONS,
  [CH12_M2_PERSUASION.id]: CH12_M2_PERSUASION,
  [CH12_M3_GOVERNMENTS.id]: CH12_M3_GOVERNMENTS,
};

/** Coins awarded per successful mission. Generous on purpose (see DESIGN.md §13). */
export const COINS_PER_MISSION = 10;

/**
 * Chapter-level repair unlocking: a chapter's repair is only granted once all
 * of its required missions are complete. See DESIGN.md §17.
 */
export interface ChapterRepair {
  chapterId: string;
  /** Short chapter name for progress UI, e.g. "Chapter 1". */
  chapterName: string;
  houseItemId: string;
  requiredMissionIds: string[];
  /** Reward tile copy on the chapter-completing mission's finish screen. */
  rewardLabel: string;
  rewardSublabel: string;
}

export const CHAPTER_REPAIRS: ChapterRepair[] = [
  {
    chapterId: 'act1.ch1',
    chapterName: 'Chapter 1',
    houseItemId: 'repair.living',
    requiredMissionIds: [
      CH1_M1_MEASURING.id,
      CH1_M2_MATERIALS.id,
      CH1_M3_BOXES.id,
      CH1_M4_NEIGHBORHOOD.id,
    ],
    rewardLabel: 'Living room scrubbed',
    rewardSublabel: 'Front door no longer squeaks',
  },
  {
    chapterId: 'act1.ch2',
    chapterName: 'Chapter 2',
    houseItemId: 'repair.yard',
    requiredMissionIds: [
      CH2_M1_BUGS.id,
      CH2_M2_GARDEN_MATH.id,
      CH2_M3_LABELS.id,
      CH2_M4_YARD_MAP.id,
    ],
    rewardLabel: 'Yard cleared & fence mended',
    rewardSublabel: 'The backyard is ready for anything',
  },
  {
    chapterId: 'act1.ch3',
    chapterName: 'Chapter 3',
    houseItemId: 'repair.basement',
    requiredMissionIds: [
      CH3_M1_LOGIC.id,
      CH3_M2_CODING.id,
      CH3_M3_GAME_MATH.id,
      CH3_M4_WORDS.id,
    ],
    rewardLabel: 'Basement dried out & cleaned',
    rewardSublabel: 'No more leak — game night has a home',
  },
  {
    chapterId: 'act1.ch4',
    chapterName: 'Chapter 4',
    houseItemId: 'repair.garage',
    requiredMissionIds: [
      CH4_M1_SPORTS_MATH.id,
      CH4_M2_ROAD_TRIP.id,
      CH4_M3_STATS.id,
      CH4_M4_HISTORY.id,
    ],
    rewardLabel: 'Garage door fixed & driveway patched',
    rewardSublabel: 'Act I complete — time to celebrate!',
  },
  {
    chapterId: 'act2.ch5',
    chapterName: 'Chapter 5',
    houseItemId: 'upgrade.workshop',
    requiredMissionIds: [CH5_M1_ROBOT.id, CH5_M2_MACHINES.id, CH5_M3_BUDGET.id],
    rewardLabel: 'Garage workshop built!',
    rewardSublabel: 'Mama T and Tessa have a maker space',
  },
  {
    chapterId: 'act2.ch6',
    chapterName: 'Chapter 6',
    houseItemId: 'upgrade.kitchen',
    requiredMissionIds: [CH6_M1_FRACTIONS.id, CH6_M2_FOOD_GEO.id, CH6_M3_KITCHEN_SCI.id],
    rewardLabel: 'Big kitchen island installed!',
    rewardSublabel: 'The cookbook has a proper test kitchen',
  },
  {
    chapterId: 'act2.ch7',
    chapterName: 'Chapter 7',
    houseItemId: 'upgrade.bedrooms',
    requiredMissionIds: [CH7_M1_WORLD.id, CH7_M2_STORIES.id, CH7_M3_ROUTE.id],
    rewardLabel: 'Bedrooms redesigned!',
    rewardSublabel: 'Every kid’s room tells their story',
  },
  {
    chapterId: 'act2.ch8',
    chapterName: 'Chapter 8',
    houseItemId: 'upgrade.pool',
    requiredMissionIds: [CH8_M1_WEATHER.id, CH8_M2_WATER.id, CH8_M3_STORMPROOF.id],
    rewardLabel: 'The POOL is in!',
    rewardSublabel: 'Act II complete — New York, here we come!',
  },
  {
    chapterId: 'act3.ch9',
    chapterName: 'Chapter 9',
    houseItemId: 'upgrade.basement',
    requiredMissionIds: [CH9_M1_GEOMETRY.id, CH9_M2_BUILD_BUDGET.id, CH9_M3_SMARTBOT.id],
    rewardLabel: 'Super-cool basement complete!',
    rewardSublabel: 'Game nights will never be the same',
  },
  {
    chapterId: 'act3.ch10',
    chapterName: 'Chapter 10',
    houseItemId: 'upgrade.familyroom',
    requiredMissionIds: [CH10_M1_MEDIA.id, CH10_M2_FACT_OPINION.id, CH10_M3_SURVEY.id],
    rewardLabel: 'Family room redesigned!',
    rewardSublabel: 'The kitchen-table news club has a headquarters',
  },
  {
    chapterId: 'act3.ch11',
    chapterName: 'Chapter 11',
    houseItemId: 'upgrade.observatory',
    requiredMissionIds: [CH11_M1_METHOD.id, CH11_M2_SPACE.id, CH11_M3_RESULTS.id],
    rewardLabel: 'Backyard observatory built!',
    rewardSublabel: 'Caleb has already named every visible star',
  },
  {
    chapterId: 'act3.ch12',
    chapterName: 'Chapter 12',
    houseItemId: 'upgrade.porch',
    requiredMissionIds: [CH12_M1_ELECTIONS.id, CH12_M2_PERSUASION.id, CH12_M3_GOVERNMENTS.id],
    rewardLabel: 'Front porch redesigned!',
    rewardSublabel: 'Act III complete — London is calling!',
  },
];

/**
 * Helpful labels for chapters (used in the UI). Keep in sync with the chapter map
 * in DESIGN.md §9.
 */
export const CHAPTER_LABELS: Record<string, string> = {
  'act1.ch1': 'Act I · Chapter 1 · Move-in day',
  'act1.ch2': 'Act I · Chapter 2 · Backyard discovery',
  'act1.ch3': 'Act I · Chapter 3 · Family game night',
  'act1.ch4': 'Act I · Chapter 4 · Hockey tournament weekend',
  'act2.ch5': 'Act II · Chapter 5 · The garage robot',
  'act2.ch6': 'Act II · Chapter 6 · Family cookbook',
  'act2.ch7': 'Act II · Chapter 7 · Where our family is from',
  'act2.ch8': 'Act II · Chapter 8 · Storm week',
  'act3.ch9': 'Act III · Chapter 9 · The basement build',
  'act3.ch10': 'Act III · Chapter 10 · News at the kitchen table',
  'act3.ch11': 'Act III · Chapter 11 · Science fair',
  'act3.ch12': 'Act III · Chapter 12 · The hometown election',
};

/** Display name per act, used by the home banner. */
export const ACT_LABELS: Record<string, string> = {
  act1: 'Act I',
  act2: 'Act II',
  act3: 'Act III',
};
