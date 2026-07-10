// Act III: Chapter 9 · "The basement build" (Mama T) → super-cool basement rec room
//          Chapter 10 · "News at the kitchen table" (Tessa) → family room redesign

import type { Mission } from '../types';
import type {
  CodeRobotMissionParams,
  DragMatchMissionParams,
  MixedMissionParams,
  QuizMissionParams,
} from './missions';

/* ============================================================
 * CH9 M1 — Geometry of the build · Mama T
 * ============================================================ */

export const CH9_M1_GEOMETRY: Mission = {
  id: 'act3.ch9.m1.geometry',
  chapterId: 'act3.ch9',
  lead: 'mama_t',
  subjects: ['math'],
  skillTags: ['math.geometry', 'math.measurement.applied'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Mama T! The basement is dry and clean — now we make it AWESOME. First: shapes and measuring!' },
        { text: 'Round 1: name the shapes. Round 2: measure the room. Round 3: count the build pieces!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Shapes in the basement',
            intro: 'Everything we build starts with a shape.',
            questions: [
              { id: 'q1', question: 'The rug we picked is round. A round shape is a…', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correctIndex: 1, explanation: 'A circle — perfectly round, no corners!', hint: 'No corners at all.' },
              { id: 'q2', question: 'The TV screen has 4 corners, longer than tall. It’s a…', options: ['Circle', 'Triangle', 'Rectangle', 'Hexagon'], correctIndex: 2, explanation: 'A rectangle: 4 right-angle corners, opposite sides equal.', hint: 'Like a door lying down.' },
              { id: 'q3', question: 'The shelf bracket is a 3-sided shape — a…', options: ['Triangle', 'Square', 'Star', 'Oval'], correctIndex: 0, explanation: 'Triangles are the strong shape — that’s why brackets use them!', hint: 'Count the sides: 3.' },
              { id: 'q4', question: 'How many corners does a square foam tile have?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'Squares have 4 equal sides and 4 corners.', hint: 'Same as its sides.' },
              { id: 'q5', question: 'The stop-sign clock has 8 sides. That shape is an…', options: ['Octagon', 'Oval', 'Oblong', 'Octopus'], correctIndex: 0, explanation: '“Octo” means eight — octagon!', hint: 'Octopus has 8 legs…' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Measure it up',
            intro: 'Builders measure twice!',
            questions: [
              { id: 'q1', question: 'The couch is 2 m long. The wall is 5 m. Does the couch fit?', options: ['Yes, with room to spare', 'No, too big', 'Exactly equal', 'Can’t know'], correctIndex: 0, explanation: '2 is less than 5 — it fits with 3 m left over.', hint: 'Compare 2 and 5.' },
              { id: 'q2', question: 'Foam tiles are 1 m each. The wall is 5 m. How many tiles in a row?', options: ['3', '4', '5', '10'], correctIndex: 2, explanation: '5 ÷ 1 = 5 tiles.', hint: 'One metre each, five metres total.' },
              { id: 'q3', question: 'The beanbag corner is 2 m wide and 2 m long. It’s shaped like a…', options: ['Rectangle that’s longer than wide', 'Square', 'Circle', 'Triangle'], correctIndex: 1, explanation: 'Equal width and length = a square.', hint: 'Both sides the same.' },
              { id: 'q4', question: 'The game shelf is 80 cm. Izzy’s games stack is 1 m. Does it fit on one shelf?', options: ['Yes', 'No — 1 m is more than 80 cm', 'They’re equal', 'Only on Tuesdays'], correctIndex: 1, explanation: '1 m = 100 cm, which is more than 80 cm. Time for two stacks!', hint: 'How many cm in a metre?' },
              { id: 'q5', question: 'Around the whole rug edge is called its…', options: ['Area', 'Perimeter', 'Volume', 'Diameter'], correctIndex: 1, explanation: 'Perimeter is the distance around — like walking the edge.', hint: 'The walk-around-it measurement.' },
            ],
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the build pieces',
            intro: 'The build crates are open! Count the shape pieces so nothing goes missing.',
            items: [
              {
                id: 'c1',
                prompt: 'How many triangle brackets did Dada T unpack for the shelves?',
                groups: [{ emoji: '🔺', count: 6 }],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: 'Touch each triangle as you count it.',
                explanation: 'Six strong triangle brackets — triangles hold shelves up!',
              },
              {
                id: 'c2',
                prompt: 'Caleb sorted square tiles: 3 in the first box and 4 in the second. How many squares in all?',
                groups: [
                  { emoji: '🟦', count: 3, label: 'First box' },
                  { emoji: '🟦', count: 4, label: 'Second box' },
                ],
                answer: 7,
                options: [5, 6, 7, 8],
                hint: 'Count the first box, then keep counting into the second.',
                explanation: '3 + 4 = 7 square tiles!',
              },
              {
                id: 'c3',
                prompt: 'How many round rug pads did Mama T roll out?',
                groups: [{ emoji: '🔵', count: 5 }],
                answer: 5,
                options: [3, 4, 5, 6],
                hint: 'Count each circle one at a time.',
                explanation: 'Five round pads — perfect circles, no corners!',
              },
              {
                id: 'c4',
                prompt: 'Izzy found 2 diamond stickers and Owen found 6 more. How many diamonds together?',
                groups: [
                  { emoji: '🔷', count: 2, label: 'Izzy’s' },
                  { emoji: '🔷', count: 6, label: 'Owen’s' },
                ],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Start at the bigger group, 6, then count 2 more.',
                explanation: '2 + 6 = 8 shiny diamonds for the wall.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Mama T. Basement blueprints in hand. Today we calculate like real builders: area, perimeter, and materials.' },
        { text: 'Round 1: area and perimeter. Round 2: materials math. Round 3: word problems you work out yourself.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Area & perimeter',
            intro: 'The rec room is 6 m × 4 m.',
            questions: [
              { id: 'q1', question: 'Floor area of the 6 m × 4 m room?', options: ['10 m²', '20 m²', '24 m²', '28 m²'], correctIndex: 2, explanation: '6 × 4 = 24 m².', hint: 'Length × width.' },
              { id: 'q2', question: 'Perimeter of the room?', options: ['10 m', '20 m', '24 m', '48 m'], correctIndex: 1, explanation: '2 × (6 + 4) = 20 m of baseboard!', hint: 'Add all four sides.' },
              { id: 'q3', question: 'Foam tiles are 50 cm × 50 cm. How many per square metre?', options: ['2', '4', '8', '50'], correctIndex: 1, explanation: 'Each tile is 0.25 m²; four make 1 m².', hint: 'Picture a 1 m square split in quarters.' },
              { id: 'q4', question: 'Tiles needed for the whole 24 m² floor?', options: ['48', '72', '96', '120'], correctIndex: 2, explanation: '24 m² × 4 tiles/m² = 96 tiles.', hint: 'Use your last answer.' },
              { id: 'q5', question: 'The round rug has a diameter of 2 m. Its radius is…', options: ['4 m', '2 m', '1 m', '0.5 m'], correctIndex: 2, explanation: 'Radius is half the diameter: 1 m.', hint: 'Half-way across.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Materials math',
            intro: 'Build-shopping with a calculator.',
            questions: [
              { id: 'q1', question: 'Paint covers 10 m² per litre. Walls total 38 m². Litres needed (whole cans)?', options: ['3', '3.8 exactly', '4', '38'], correctIndex: 2, explanation: '38 ÷ 10 = 3.8 → round UP to 4 cans. You can’t buy 0.8 of a can!', hint: 'Builders always round up.' },
              { id: 'q2', question: 'Baseboard comes in 2.5 m lengths. For 20 m of wall, how many pieces?', options: ['6', '7', '8', '10'], correctIndex: 2, explanation: '20 ÷ 2.5 = 8 pieces exactly.', hint: 'How many 2.5s in 20?' },
              { id: 'q3', question: 'The ceiling is 2.4 m high; shelving units are 0.8 m tall. How many stack safely (max 3 high rule)?', options: ['2', '3', '4', '8'], correctIndex: 1, explanation: '3 × 0.8 = 2.4 m — exactly ceiling height, and within the safety rule.', hint: 'Multiply up to the ceiling.' },
              { id: 'q4', question: 'Carpet costs $18/m². Carpeting half the 24 m² floor costs…', options: ['$216', '$316', '$432', '$118'], correctIndex: 0, explanation: '12 m² × $18 = $216.', hint: 'Half the floor first.' },
              { id: 'q5', question: 'The TV wall is 6 m wide; the TV is 1.4 m. Equal space each side = ?', options: ['1.8 m', '2.3 m', '2.8 m', '4.6 m'], correctIndex: 1, explanation: '(6 − 1.4) ÷ 2 = 2.3 m per side.', hint: 'Subtract, then halve.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Blueprint word problems',
            intro: 'No answer choices now — work each one out and type the number!',
            items: [
              {
                id: 'w1',
                visual: '🍿📐',
                problem: 'The snack corner of the rec room is 3 m long and 2 m wide. What is its area?',
                answer: 6,
                unit: 'm²',
                hint: 'Area = length × width.',
                explanation: '3 × 2 = 6 m² of snack space.',
              },
              {
                id: 'w2',
                visual: '🖼️📏',
                problem: 'Owen’s poster wall is 4 m wide and 2 m tall. A trim strip goes all the way around its edge. How many metres of trim does he need?',
                answer: 12,
                unit: 'm',
                hint: 'Perimeter: add all four sides — 4 + 2 + 4 + 2.',
                explanation: '2 × (4 + 2) = 12 m of trim.',
              },
              {
                id: 'w3',
                visual: '🟦🟦🟦',
                problem: 'Foam tiles are 1 m × 1 m squares. Tessa tiles a game zone that is 5 m long and 3 m wide. How many tiles does she need?',
                answer: 15,
                unit: 'tiles',
                hint: 'Each tile covers exactly 1 m² — find the area of the zone.',
                explanation: '5 × 3 = 15 m², so 15 tiles.',
              },
              {
                id: 'w4',
                visual: '🪚🪵',
                problem: 'A shelf board is 120 cm long. Mama T saws it into 4 equal pieces. How long is each piece?',
                answer: 30,
                unit: 'cm',
                hint: '120 shared equally 4 ways — divide.',
                explanation: '120 ÷ 4 = 30 cm each.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Mama T. Final design pass: circles, angles, volume, and the Pythagorean theorem — because the big TV has to fit up the stairwell.' },
        { text: 'Three rounds of builder geometry — the last one you calculate yourself.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Circles, angles, volume',
            intro: 'π ≈ 3.14. Sharpen your pencil.',
            questions: [
              { id: 'q1', question: 'Circumference of the 2 m-diameter rug?', options: ['3.14 m', '6.28 m', '12.56 m', '4 m'], correctIndex: 1, explanation: 'C = πd = 3.14 × 2 ≈ 6.28 m.', hint: 'π times diameter.' },
              { id: 'q2', question: 'Area of that rug?', options: ['3.14 m²', '6.28 m²', '12.56 m²', '1 m²'], correctIndex: 0, explanation: 'A = πr² = 3.14 × 1² = 3.14 m².', hint: 'Radius is 1.' },
              { id: 'q3', question: 'The stair stringer rises 2.4 m over a 3.2 m run. The straight length (hypotenuse)?', options: ['4 m', '5.6 m', '2.8 m', '3.6 m'], correctIndex: 0, explanation: '√(2.4² + 3.2²) = √(5.76 + 10.24) = √16 = 4 m. A 3-4-5 triangle scaled!', hint: 'a² + b² = c².' },
              { id: 'q4', question: 'The room is 6 × 4 × 2.4 m. Its volume is…', options: ['57.6 m³', '48 m³', '24 m³', '12.4 m³'], correctIndex: 0, explanation: '6 × 4 × 2.4 = 57.6 cubic metres of awesome.', hint: 'Multiply all three.' },
              { id: 'q5', question: 'A ramp for the games cart needs a gentle 10° angle. The complement of 10° is…', options: ['80°', '90°', '170°', '100°'], correctIndex: 0, explanation: 'Complementary angles sum to 90°: 90 − 10 = 80°.', hint: 'They make a right angle together.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Will it fit?',
            intro: 'The famous moving-day geometry problems.',
            questions: [
              { id: 'q1', question: 'The doorway is 0.9 m × 2 m. The TV box is 1.5 m × 0.2 m × 0.9 m. Can it pass through upright?', options: ['No way', 'Yes — 0.9 m width and 1.5 m height clear the 0.9 × 2 m frame', 'Only diagonally', 'Only in pieces'], correctIndex: 1, explanation: 'Stand it on end: 0.9 m wide ≤ 0.9 m, 1.5 m tall ≤ 2 m. Through it goes (snugly!).', hint: 'Try each orientation against the frame.' },
              { id: 'q2', question: 'A 4.2 m beam must go diagonally across a 6 m × 4 m room. Will it fit flat on the floor?', options: ['Yes — the diagonal is about 7.2 m', 'No — too long', 'Exactly equal', 'Only bent'], correctIndex: 0, explanation: 'Room diagonal = √(36+16) = √52 ≈ 7.2 m, plenty for a 4.2 m beam.', hint: 'Compute the room’s diagonal first.' },
              { id: 'q3', question: 'Scale plan is 1:50. The 6 m wall is how long on paper?', options: ['8.3 cm', '12 cm', '30 cm', '3 cm'], correctIndex: 1, explanation: '6 m = 600 cm; 600 ÷ 50 = 12 cm.', hint: 'Divide by the scale.' },
              { id: 'q4', question: 'The projector needs its screen width = distance ÷ 1.5. At 4.5 m viewing distance, screen width = ?', options: ['2 m', '3 m', '4.5 m', '6.75 m'], correctIndex: 1, explanation: '4.5 ÷ 1.5 = 3 m wide. Movie nights, upgraded.', hint: 'A single division.' },
              { id: 'q5', question: 'Foam tiles cut at 45° meet in a corner to form what angle together?', options: ['45°', '90°', '135°', '180°'], correctIndex: 1, explanation: 'Two 45° mitre cuts join into a clean 90° corner — the carpenter’s classic.', hint: 'That’s why it’s called a mitre joint.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Work it out on paper',
            intro: 'Real contractor calculations — pencil out each answer and type it in.',
            items: [
              {
                id: 'w1',
                visual: '📦📏',
                problem: 'The toy storage bench is a box 1.5 m long, 0.6 m wide, and 0.5 m tall. What is its volume?',
                answer: 0.45,
                tolerance: 0.01,
                unit: 'm³',
                hint: 'Volume = length × width × height.',
                explanation: '1.5 × 0.6 × 0.5 = 0.45 m³ of toy space.',
              },
              {
                id: 'w2',
                visual: '🎨🧱',
                problem: 'One can of paint covers 9 m². The feature wall is 6 m wide and 2.4 m tall. How many whole cans must Mama T buy?',
                answer: 2,
                unit: 'cans',
                hint: 'Find the wall area, divide by 9, then round UP — you can’t buy part of a can.',
                explanation: '6 × 2.4 = 14.4 m²; 14.4 ÷ 9 = 1.6, so she buys 2 cans.',
              },
              {
                id: 'w3',
                visual: '🎲⭕',
                problem: 'The round games table has a radius of 0.8 m. What is its area? (Use π ≈ 3.14.)',
                answer: 2.01,
                tolerance: 0.02,
                unit: 'm²',
                hint: 'A = πr² — square the radius first.',
                explanation: '3.14 × 0.8² = 3.14 × 0.64 ≈ 2.01 m².',
              },
              {
                id: 'w4',
                visual: '🔩📐',
                problem: 'Tessa braces the shelf frame with a diagonal strut. The frame is 0.9 m tall and 1.2 m wide. How long is the strut?',
                answer: 1.5,
                tolerance: 0.01,
                unit: 'm',
                hint: 'a² + b² = c² — it’s a 3-4-5 triangle in disguise.',
                explanation: '0.9² + 1.2² = 0.81 + 1.44 = 2.25, and √2.25 = 1.5 m.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH9 M2 — Build budget showdown · Izzy
 * ============================================================ */

export const CH9_M2_BUILD_BUDGET: Mission = {
  id: 'act3.ch9.m2.build-budget',
  chapterId: 'act3.ch9',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['math.money', 'math.percent', 'math.decisions'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy! The basement budget is $100 and EVERYONE wants something different. Treasurer Izzy to the rescue.' },
        { text: 'Match the money problems, then count the build supplies!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Spending the $100',
            intro: 'Match each purchase to what’s left.',
            pairs: [
              { id: 'r1p1', item: { label: 'Start $100, buy rug $30', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$70' } },
              { id: 'r1p2', item: { label: 'Then beanbag $25', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$45' } },
              { id: 'r1p3', item: { label: 'Then game shelf $20', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$25' } },
              { id: 'r1p4', item: { label: 'Poster $5 each — Caleb wants 3', sublabel: 'cost?', shape: 'small-square' }, slot: { label: '$15' } },
              { id: 'r1p5', item: { label: 'After the posters', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$10' } },
            ],
            stuckHint: 'Subtract each purchase from what was left before.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Fair shares',
            intro: 'Four kids, one budget. Match the sharing problems.',
            pairs: [
              { id: 'r2p1', item: { label: '$20 split between 4 kids', shape: 'wide-short' }, slot: { label: '$5 each' } },
              { id: 'r2p2', item: { label: '12 snacks for 4 kids', shape: 'wide-short' }, slot: { label: '3 each' } },
              { id: 'r2p3', item: { label: '2 controllers, 4 kids', shape: 'wide-short' }, slot: { label: 'Take turns!' } },
              { id: 'r2p4', item: { label: '8 pillows in 2 corners', shape: 'wide-short' }, slot: { label: '4 per corner' } },
              { id: 'r2p5', item: { label: 'Movie pick: 4 kids, 4 Fridays', shape: 'wide-short' }, slot: { label: 'One Friday each' } },
            ],
            stuckHint: 'Sharing fairly means dividing into equal groups.',
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the supplies',
            intro: 'Izzy dumped the supply bin on the table. Count everything before we shop!',
            items: [
              {
                id: 'c1',
                prompt: 'How many loonies are in Izzy’s budget jar?',
                groups: [{ emoji: '🪙', count: 8 }],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Line the coins up and count them one by one.',
                explanation: 'Eight shiny loonies for the build fund!',
              },
              {
                id: 'c2',
                prompt: 'Caleb has 4 helper stickers and Izzy gives him 3 more. How many stickers now?',
                groups: [
                  { emoji: '⭐', count: 4, label: 'Caleb’s' },
                  { emoji: '⭐', count: 3, label: 'From Izzy' },
                ],
                answer: 7,
                options: [5, 6, 7, 8],
                hint: 'Start at 4 and count up 3 more.',
                explanation: '4 + 3 = 7 stickers — best helper ever!',
              },
              {
                id: 'c3',
                prompt: 'How many paint brushes did Dada T bring down?',
                groups: [{ emoji: '🖌️', count: 5 }],
                answer: 5,
                options: [4, 5, 6, 7],
                hint: 'Point at each brush as you count.',
                explanation: 'Five brushes — one for each painter!',
              },
              {
                id: 'c4',
                prompt: 'Owen counts screws: 5 in the small bag and 5 in the big bag. How many in all?',
                groups: [
                  { emoji: '🔩', count: 5, label: 'Small bag' },
                  { emoji: '🔩', count: 5, label: 'Big bag' },
                ],
                answer: 10,
                options: [8, 9, 10, 11],
                hint: '5 and 5 — count on your fingers!',
                explanation: '5 + 5 = 10 screws, enough for the whole shelf.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy. Real budget: $400, and the wish list is $600. Welcome to trade-off city, population: us.' },
        { text: 'Round 1: discounts and totals. Round 2: the great trade-off. Round 3: receipt math — type the totals.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Sale-rack math',
            intro: 'Match each deal to its price.',
            pairs: [
              { id: 'r1p1', item: { label: '$80 chair at 25% off', shape: 'wide-short' }, slot: { label: '$60' } },
              { id: 'r1p2', item: { label: '$120 TV stand at 50% off', shape: 'wide-short' }, slot: { label: '$60 too!' } },
              { id: 'r1p3', item: { label: '$45 lamp + $15 bulb pack', shape: 'wide-short' }, slot: { label: '$60 again!' } },
              { id: 'r1p4', item: { label: '3 shelves at $22 each', shape: 'wide-short' }, slot: { label: '$66' } },
              { id: 'r1p5', item: { label: '$200 couch, pay 1/4 now', sublabel: 'deposit?', shape: 'wide-short' }, slot: { label: '$50' } },
            ],
            stuckHint: '25% off means pay 75%. 50% off means pay half.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · The great trade-off',
            intro: 'Wish list: couch $200, TV $250, console $150, table $80, lights $40. Budget: $400.',
            pairs: [
              { id: 'r2p1', item: { label: 'Couch + console + lights', sublabel: 'total?', shape: 'huge-wide' }, slot: { label: '$390 — under budget ✓' } },
              { id: 'r2p2', item: { label: 'TV + console', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$400 — exactly budget' } },
              { id: 'r2p3', item: { label: 'Everything on the list', sublabel: 'over by?', shape: 'huge-wide' }, slot: { label: '$320 over' } },
              { id: 'r2p4', item: { label: 'Couch + table + lights', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$320 — $80 left' } },
              { id: 'r2p5', item: { label: 'Cheapest 3 items', sublabel: 'which + total?', shape: 'wide-short' }, slot: { label: 'Lights + table + console = $270' } },
            ],
            stuckHint: 'List totals first, then compare against $400.',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Receipt math',
            intro: 'Izzy hands you the receipts — no answer choices, just you and the numbers.',
            items: [
              {
                id: 'w1',
                visual: '🛋️🧾',
                problem: 'The beanbag costs $35 and the game shelf costs $48. What do they cost together?',
                answer: 83,
                unit: 'dollars',
                hint: 'Add the two prices.',
                explanation: '35 + 48 = $83.',
              },
              {
                id: 'w2',
                visual: '🪑🪑🪑🪑',
                problem: 'Four folding chairs cost $24 each. What is the total for all four?',
                answer: 96,
                unit: 'dollars',
                hint: 'Four groups of 24 — multiply.',
                explanation: '4 × 24 = $96.',
              },
              {
                id: 'w3',
                visual: '💰🧮',
                problem: 'Izzy’s budget is $400. So far the family has spent $268. How much is left?',
                answer: 132,
                unit: 'dollars',
                hint: 'Start at 400 and subtract 268.',
                explanation: '400 − 268 = $132 still in the jar.',
              },
              {
                id: 'w4',
                visual: '🏷️✂️',
                problem: 'The $60 rug is on sale for half price. What does it cost now?',
                answer: 30,
                unit: 'dollars',
                hint: 'Half price means divide by 2.',
                explanation: '60 ÷ 2 = $30 — Izzy loves a sale.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. Spreadsheet open. We’re optimizing: cost per use, financing traps, and opportunity cost. The basement deserves rigour.' },
        { text: 'Three rounds of sharp-pencil decisions — the last one you compute yourself.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Smart-money calculations',
            intro: 'Match each scenario to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: '$300 console ÷ 150 game nights', sublabel: 'cost per night?', shape: 'wide-short' }, slot: { label: '$2/night' } },
              { id: 'r1p2', item: { label: '“$25/month for 12 months!” vs $250 cash', sublabel: 'financing costs extra…', shape: 'huge-wide' }, slot: { label: '$50 more' } },
              { id: 'r1p3', item: { label: '$180 chair, 13% HST', sublabel: 'out the door?', shape: 'wide-short' }, slot: { label: '$203.40' } },
              { id: 'r1p4', item: { label: 'Used couch $90 vs new $240', sublabel: 'savings %?', shape: 'wide-short' }, slot: { label: '62.5%' } },
              { id: 'r1p5', item: { label: '20% off, then extra 10% off $100', sublabel: 'final?', shape: 'wide-short' }, slot: { label: '$72 (not $70!)' } },
            ],
            stuckHint: 'Stacked discounts multiply: 0.8 × 0.9 = 0.72 of the price.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Opportunity cost',
            intro: 'Every dollar spent is a dollar not spent elsewhere.',
            pairs: [
              { id: 'r2p1', item: { label: 'Opportunity cost', sublabel: 'definition?', shape: 'huge-wide' }, slot: { label: 'The best alternative you give up' } },
              { id: 'r2p2', item: { label: 'Spend all $400 on a TV', sublabel: 'opportunity cost?', shape: 'wide-short' }, slot: { label: 'Nowhere to sit watching it' } },
              { id: 'r2p3', item: { label: 'DIY shelf: $30 wood + 4 hrs vs $90 bought', sublabel: 'your time is worth…', shape: 'huge-wide' }, slot: { label: '$15/hr to break even' } },
              { id: 'r2p4', item: { label: 'Buy now vs save 2 months for better', sublabel: 'economists call waiting…', shape: 'wide-short' }, slot: { label: 'Delayed gratification' } },
              { id: 'r2p5', item: { label: 'Budget leftover: invest in shared items vs one kid’s wish', sublabel: 'fairest test?', shape: 'huge-wide' }, slot: { label: 'Who benefits, how often?' } },
            ],
            stuckHint: 'Opportunity cost = what ELSE that money/time could have done.',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · The treasurer’s ledger',
            intro: 'Izzy’s final audit. Show your work, type your answers.',
            items: [
              {
                id: 'w1',
                visual: '🛒🏷️',
                problem: 'A $250 couch is 30% off. What is the sale price?',
                answer: 175,
                unit: 'dollars',
                hint: '30% off means you pay 70% of the price.',
                explanation: '250 × 0.70 = $175.',
              },
              {
                id: 'w2',
                visual: '🔊🧾',
                problem: 'The speaker set costs $140 plus 13% HST. What is the total at the register?',
                answer: 158.2,
                tolerance: 0.01,
                unit: 'dollars',
                hint: 'Find 13% of 140, then add it on — or multiply by 1.13.',
                explanation: '13% of 140 = $18.20, so 140 + 18.20 = $158.20.',
              },
              {
                id: 'w3',
                visual: '📽️🐖',
                problem: 'Izzy saves $12 a week toward a $300 projector. She already has $84. How many weeks until she can buy it?',
                answer: 18,
                unit: 'weeks',
                hint: 'Find what’s still needed first, then divide by 12.',
                explanation: '300 − 84 = 216, and 216 ÷ 12 = 18 weeks.',
              },
              {
                id: 'w4',
                visual: '🏷️🏷️',
                problem: 'A $120 table is 25% off, then an EXTRA 10% off the sale price. What is the final price?',
                answer: 81,
                unit: 'dollars',
                hint: 'Take the discounts one at a time — they multiply, they don’t add.',
                explanation: '120 × 0.75 = 90, then 90 × 0.90 = $81 (not $78!).',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH9 M3 — The smart-basement bot · Tessa (code-robot, harder)
 * ============================================================ */

export const CH9_M3_SMARTBOT: Mission = {
  id: 'act3.ch9.m3.smartbot',
  chapterId: 'act3.ch9',
  lead: 'tessa',
  subjects: ['coding'],
  skillTags: ['coding.planning', 'coding.optimization'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa! The garage robot got promoted — it now delivers snacks in the new basement. Beep beep!' },
        { text: 'Drive it from the stairs to the snack table.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Snack run',
            intro: 'From the stairs to the snack table!',
            cols: 4, rows: 3,
            start: { x: 0, y: 0, dir: 'down' },
            goal: { x: 3, y: 2 },
          },
          {
            heading: 'Round 2 · Mind the beanbags',
            intro: 'Beanbags block the floor. Go around!',
            cols: 4, rows: 4,
            start: { x: 0, y: 3, dir: 'up' },
            goal: { x: 3, y: 0 },
            walls: [{ x: 1, y: 2 }, { x: 2, y: 1 }],
          },
        ],
      } satisfies CodeRobotMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. The snack-bot’s floor plan got complicated — couch, table, shelf, all in the way.' },
        { text: 'Two deliveries, then decode the bot’s beeping number patterns.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            kind: 'code-robot',
            heading: 'Round 1 · The living-corner loop',
            intro: 'Around the couch to the far corner.',
            cols: 5, rows: 4,
            start: { x: 0, y: 0, dir: 'right' },
            goal: { x: 0, y: 3 },
            walls: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
          },
          {
            kind: 'code-robot',
            heading: 'Round 2 · Shelf alley',
            intro: 'Snake through the shelf aisle.',
            cols: 5, rows: 5,
            start: { x: 2, y: 4, dir: 'up' },
            goal: { x: 2, y: 0 },
            walls: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · The bot’s number code',
            intro: 'The snack-bot beeps in patterns. Predict the next beep to unlock its turbo mode!',
            items: [
              {
                id: 'p1',
                prompt: 'The bot beeps: 2, 4, 6, 8… what comes next?',
                sequence: ['2', '4', '6', '8'],
                options: ['9', '10', '12', '14'],
                correctIndex: 1,
                hint: 'The bot is counting by 2s.',
                explanation: 'Add 2 each time: 8 + 2 = 10.',
              },
              {
                id: 'p2',
                prompt: 'Now it doubles: 1, 2, 4, 8, 16… next?',
                sequence: ['1', '2', '4', '8', '16'],
                options: ['18', '24', '32', '20'],
                correctIndex: 2,
                hint: 'Each number is double the one before.',
                explanation: 'Doubling again: 16 × 2 = 32.',
              },
              {
                id: 'p3',
                prompt: 'Battery countdown: 100, 90, 81, 73… next?',
                sequence: ['100', '90', '81', '73'],
                options: ['66', '65', '63', '70'],
                correctIndex: 0,
                hint: 'Look at how much it drops each step: 10, then 9, then 8…',
                explanation: 'The drop shrinks by 1 each time, so 73 − 7 = 66.',
              },
              {
                id: 'p4',
                prompt: 'The bot’s program repeats: F, F, L, F, F, L, F, F… what command comes next?',
                sequence: ['F', 'F', 'L', 'F', 'F', 'L', 'F', 'F'],
                options: ['F', 'L', 'R', '⏸'],
                correctIndex: 1,
                hint: 'The loop is forward, forward, turn — over and over.',
                explanation: 'The repeating block is F-F-L, so after two Fs comes L. That’s a loop!',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. Final boss: the bot must thread the full basement under a strict command budget. Think in shortest-paths.' },
        { text: 'Both rounds are tight. Count your moves before you tap.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Budget: 11 commands',
            intro: 'One clean line through the clutter.',
            cols: 5, rows: 5,
            start: { x: 0, y: 4, dir: 'right' },
            goal: { x: 4, y: 0 },
            walls: [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 1, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 1 }],
            maxCommands: 11,
          },
          {
            heading: 'Round 2 · Budget: 14 commands',
            intro: 'The grand tour — stairs to snack table, the long way around the pool table.',
            cols: 6, rows: 5,
            start: { x: 0, y: 0, dir: 'down' },
            goal: { x: 5, y: 4 },
            walls: [
              { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
              { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 1, y: 3 },
            ],
            maxCommands: 14,
          },
        ],
      } satisfies CodeRobotMissionParams,
    },
  },
};

/* ============================================================
 * CH10 M1 — Real or not? · Tessa (media literacy)
 * ============================================================ */

export const CH10_M1_MEDIA: Mission = {
  id: 'act3.ch10.m1.media',
  chapterId: 'act3.ch10',
  lead: 'tessa',
  subjects: ['reading', 'social-studies'],
  skillTags: ['media.literacy', 'reading.critical'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa here. At the kitchen table we read the news together — and learn to ask: is this REAL?' },
        { text: 'Round 1: real or pretend? Round 2: ads versus news. Round 3: spot the pattern!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Real or pretend?',
            intro: 'Some things we read are true, some are stories, some are tricks.',
            questions: [
              { id: 'q1', visual: '🐉🛣️', question: '“Dragons closed the highway today.” This is probably…', options: ['Real news', 'Pretend — dragons aren’t real', 'A weather report', 'A recipe'], correctIndex: 1, explanation: 'Dragons are fantasy! Real news is about things that actually happen.', hint: 'Have you ever met a dragon?' },
              { id: 'q2', visual: '🌧️📻', question: '“It will rain tomorrow, says Environment Canada.” This is…', options: ['A made-up story', 'A real forecast from real scientists', 'A joke', 'An ad'], correctIndex: 1, explanation: 'Weather forecasts come from scientists measuring the real sky.', hint: 'Who is saying it?' },
              { id: 'q3', visual: '📺🐶', question: 'A cartoon about a talking dog is…', options: ['News', 'A story for fun — and that’s okay!', 'A lie', 'A documentary'], correctIndex: 1, explanation: 'Stories and shows are pretend ON PURPOSE — that’s entertainment, not tricking.', hint: 'Is it trying to fool you, or fun you?' },
              { id: 'q4', visual: '🌐💻📱', question: 'Who can put things on the internet?', options: ['Only teachers', 'Only news people', 'Almost anyone', 'Only robots'], correctIndex: 2, explanation: 'Anyone can post — which is why we check before we believe!', hint: 'Could YOU post a picture?' },
              { id: 'q5', visual: '🤯📱', question: 'If something online seems too amazing to be true, you should…', options: ['Believe it right away', 'Ask a grown-up and check together', 'Share it fast', 'Cry'], correctIndex: 1, explanation: 'Checking together is what smart readers do. Amazing claims need good proof.', hint: 'Who can help you check?' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Ads vs news',
            intro: 'Ads want something from you. Can you spot them?',
            questions: [
              { id: 'q1', visual: '👟💨', question: '“SUPER-ZOOM SHOES make you run FASTER! Buy now!” This is…', options: ['News', 'An ad — it wants you to buy', 'Science', 'A warning'], correctIndex: 1, explanation: '“Buy now!” is the giveaway — ads sell things.', hint: 'What does it want you to DO?' },
              { id: 'q2', visual: '🧸📺', question: 'Why do toy ads make toys look extra fun?', options: ['Toys are always like that', 'To make you want them', 'It’s the law', 'Cameras are magic'], correctIndex: 1, explanation: 'Ads show the very best moments (and sometimes more) to make you want the thing.', hint: 'Ads are made by the sellers.' },
              { id: 'q3', visual: '🍬📹', question: 'A YouTuber says “this candy is amazing” and the video says “#sponsored.” That means…', options: ['They’re paid to say it', 'They grew the candy', 'It’s a news report', 'Nothing'], correctIndex: 0, explanation: '“Sponsored” means the company paid for the praise. Worth knowing!', hint: 'Look up what "sponsor" means.' },
              { id: 'q4', question: 'News tries to tell you what happened. Ads try to…', options: ['Teach math', 'Sell you something', 'Make you sleepy', 'Report weather'], correctIndex: 1, explanation: 'That’s the core difference — informing vs selling.', hint: 'Follow the money.' },
              { id: 'q5', visual: '🥣', question: 'The cereal box says “KIDS LOVE IT!” Who wrote that?', options: ['Scientists', 'The cereal company', 'Your school', 'The government'], correctIndex: 1, explanation: 'The company selling the cereal wrote it — they’re not exactly neutral!', hint: 'Whose box is it?' },
            ],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Spot the pattern',
            intro: 'Tessa says: sharp eyes spot patterns — and pattern-spotters are hard to fool!',
            items: [
              {
                id: 'p1',
                prompt: 'On the kitchen table: TV guide, newspaper, TV guide, newspaper… what comes next?',
                sequence: ['📺', '📰', '📺', '📰', '📺'],
                options: ['📺', '📰', '📱', '🎬'],
                correctIndex: 1,
                hint: 'They take turns: TV, paper, TV, paper…',
                explanation: 'The pattern alternates, so after 📺 comes 📰.',
              },
              {
                id: 'p2',
                prompt: 'Owen’s reading pile repeats: phone, phone, book… what comes next?',
                sequence: ['📱', '📱', '📚', '📱', '📱'],
                options: ['📱', '📚', '📺', '🎧'],
                correctIndex: 1,
                hint: 'Two phones, then a book — again and again.',
                explanation: 'The repeating block is 📱📱📚, so a 📚 is next.',
              },
              {
                id: 'p3',
                prompt: 'Movie night snacks line up: what comes next?',
                sequence: ['🎬', '🍿', '🍿', '🎬', '🍿', '🍿', '🎬'],
                options: ['🎬', '🍿', '🧃', '🍎'],
                correctIndex: 1,
                hint: 'One movie, then TWO popcorns.',
                explanation: 'The block is 🎬🍿🍿 — after 🎬 come the popcorns.',
              },
              {
                id: 'p4',
                prompt: 'Caleb rates his shows with stars. The rows grow: what comes next?',
                sequence: ['⭐', '⭐⭐', '⭐⭐⭐'],
                options: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
                correctIndex: 3,
                hint: 'Each row gets one more star.',
                explanation: 'One more star each time — four stars come next.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. Kitchen-table news club, level two: sources, headlines, and the tricks that fool smart people.' },
        { text: 'Round 1: checking sources. Round 2: headline tricks. Round 3: the algorithm game.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Check the source',
            intro: 'WHO says it matters as much as WHAT they say.',
            questions: [
              { id: 'q1', question: 'The most trustworthy source for a science claim is…', options: ['A random comment', 'A meme', 'Scientists/organizations who study it, cited by name', 'The loudest post'], correctIndex: 2, explanation: 'Named experts and organizations can be checked; anonymous claims can’t.', hint: 'Can you verify who said it?' },
              { id: 'q2', visual: '💊🖥️', question: 'A website selling vitamins says “doctors don’t want you to know this!” Be cautious because…', options: ['Doctors are shy', 'The site profits if you believe it — a conflict of interest', 'Websites can’t lie', 'Vitamins are illegal'], correctIndex: 1, explanation: 'When the claimer profits from your belief, demand stronger evidence.', hint: 'Who makes money here?' },
              { id: 'q3', question: 'Two unrelated news outlets AND a government data page report the same fact. This is called…', options: ['A coincidence', 'Corroboration — and it strengthens the claim', 'Copying', 'A conspiracy'], correctIndex: 1, explanation: 'Independent sources agreeing is the backbone of verification — same as Owen’s hockey history lesson!', hint: 'Multiple independent witnesses.' },
              { id: 'q4', visual: '📷❗', question: 'A photo looks shocking but has no date or place. First move?', options: ['Share immediately', 'Reverse-image-search it / check where it’s really from', 'Believe the caption', 'Print it'], correctIndex: 1, explanation: 'Old photos with new captions are the #1 misinformation trick. Check the original.', hint: 'Photos travel; captions change.' },
              { id: 'q5', question: '“A study says…” — the best follow-up question is:', options: ['Which study, by whom, of how many?', 'What font was it in?', 'Was it long?', 'No questions'], correctIndex: 0, explanation: 'A real study has authors, methods, and sample sizes you can examine.', hint: 'Demand the details.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Headline tricks',
            intro: 'Spot the technique.',
            questions: [
              { id: 'q1', visual: '😱📱', question: '“You WON’T BELIEVE what this hockey player did!!” is…', options: ['Clickbait — it hides the story to farm clicks', 'Great journalism', 'A stats report', 'A quote'], correctIndex: 0, explanation: 'Withholding the actual news to force a click is clickbait’s whole business model.', hint: 'Does it inform, or tease?' },
              { id: 'q2', question: '“Scientists SLAM new park plan” — “slam” is doing what?', options: ['Reporting neutrally', 'Loading the emotion — they likely “criticized” or “questioned”', 'Quoting someone', 'Nothing'], correctIndex: 1, explanation: 'Emotionally loaded verbs shape your feelings before the facts arrive.', hint: 'Compare: “scientists question…”' },
              { id: 'q3', visual: '🗳️👧👦', question: 'A poll of 6 friends becomes “EVERYONE hates the new rule.” The trick is…', options: ['Tiny sample presented as everyone', 'Math error', 'Honest reporting', 'A typo'], correctIndex: 0, explanation: 'Six people isn’t “everyone” — sample size matters (Tessa’s goalie lesson again).', hint: 'How many people is "everyone"?' },
              { id: 'q4', visual: '🍦📈', question: '“Ice cream sales and sunburns rise together — ice cream causes sunburn!” The error?', options: ['No error', 'Correlation mistaken for causation (summer causes both)', 'Bad spelling', 'Sample size'], correctIndex: 1, explanation: 'A third factor — sunny weather — drives both. Classic correlation trap.', hint: 'What ELSE happens in summer?' },
              { id: 'q5', visual: '🏒📰', question: 'An outlet only ever reports bad news about one hockey team and good news about its rival. That pattern is…', options: ['Bias by selection — true stories, slanted picture', 'Fine', 'Illegal', 'Impossible'], correctIndex: 0, explanation: 'Even with every story true, choosing WHICH stories to tell shapes the picture. Read across outlets.', hint: 'What’s missing matters.' },
            ],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · The algorithm game',
            intro: 'Feeds run on patterns — they predict what you’ll tap next. Can you out-predict them?',
            items: [
              {
                id: 'p1',
                prompt: 'You tapped hockey videos all week. What does the feed serve next?',
                sequence: ['🏒', '🏒', '🏒', '🏒'],
                options: ['🏒', '🌱', '📚', '🎻'],
                correctIndex: 0,
                hint: 'Algorithms repeat whatever got your last click.',
                explanation: 'More hockey! Feeds echo your clicks — that’s how echo chambers start.',
              },
              {
                id: 'p2',
                prompt: 'A silly video gets 1 share, then 2, then 4, then 8. If the doubling keeps up, how many next?',
                sequence: ['1', '2', '4', '8'],
                options: ['12', '16', '10', '24'],
                correctIndex: 1,
                hint: 'Each number is double the one before.',
                explanation: '8 × 2 = 16 shares. Doubling is why things go viral fast.',
              },
              {
                id: 'p3',
                prompt: 'The fact-checking club grows: 2, 5, 8, 11 members each month. Next month?',
                sequence: ['2', '5', '8', '11'],
                options: ['13', '14', '15', '12'],
                correctIndex: 1,
                hint: 'How many join each month? It’s the same jump every time.',
                explanation: 'Up 3 each month: 11 + 3 = 14 members.',
              },
              {
                id: 'p4',
                prompt: 'Owen trims his scroll time: 60, 50, 40, 30 minutes each week. Next week?',
                sequence: ['60', '50', '40', '30'],
                options: ['25', '20', '10', '35'],
                correctIndex: 1,
                hint: 'The minutes drop by the same amount every week.',
                explanation: 'Down 10 each week: 30 − 10 = 20 minutes. More time for the rec room!',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. I’m teaching the kitchen-table masterclass now: misinformation mechanics, platform incentives, and how to actually verify.' },
        { text: 'Round 1: how misinformation works. Round 2: the verification toolkit.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Misinformation mechanics',
            intro: 'Know the machine to resist it.',
            questions: [
              { id: 'q1', question: 'Misinformation vs disinformation: the difference is…', options: ['Spelling', 'Intent — disinformation is deliberately false; misinformation may be shared in good faith', 'Length', 'Platform'], correctIndex: 1, explanation: 'Both are false; disinformation is built to deceive. Your aunt resharing it in good faith is misinformation.', hint: 'One word implies a liar.' },
              { id: 'q2', visual: '📱💨', question: 'False news often spreads faster than true news online because…', options: ['It’s better written', 'Novel + emotional content gets shared more, and algorithms amplify engagement', 'Truth is boring by law', 'Hackers'], correctIndex: 1, explanation: 'Research (MIT, 2018) found falsehood spreads farther/faster — outrage and novelty drive shares, and feeds optimize for engagement.', hint: 'What do algorithms reward?' },
              { id: 'q3', question: 'An “echo chamber” is…', options: ['A recording studio', 'An information space where you mostly meet views like your own', 'A library', 'A podcast'], correctIndex: 1, explanation: 'Personalized feeds + chosen communities can filter out disagreement — beliefs harden unchallenged.', hint: 'What bounces back at you?' },
              { id: 'q4', question: 'Confirmation bias makes us…', options: ['Check everything equally', 'Accept claims that fit our beliefs more easily than ones that don’t', 'Believe nothing', 'Forget names'], correctIndex: 1, explanation: 'We all do it — the fix is applying the SAME scrutiny to claims we like.', hint: 'Which claims do you fact-check least?' },
              { id: 'q5', visual: '🎥❓', question: 'Deepfakes mean that for video evidence…', options: ['Seeing is always believing', 'Provenance (who filmed it, when, original source) matters more than ever', 'Video is banned', 'Nothing changed'], correctIndex: 1, explanation: 'When fabrication is cheap, the chain of custody — Owen’s “provenance” — becomes the real evidence.', hint: 'The museum lesson applies to video now.' },
            ],
          },
          {
            heading: 'Round 2 · The verification toolkit',
            intro: 'What pros actually do, in order.',
            questions: [
              { id: 'q1', question: 'SIFT method, first move when you see a wild claim:', options: ['Stop — don’t share before checking', 'Share with a question mark', 'Screenshot it', 'Reply angrily'], correctIndex: 0, explanation: 'S = Stop. The pause before sharing is the single highest-value habit.', hint: 'The S in SIFT.' },
              { id: 'q2', question: '“Lateral reading” means…', options: ['Reading lying down', 'Leaving the page to check what OTHER sources say about the claim and the site', 'Reading the whole article', 'Reading comments'], correctIndex: 1, explanation: 'Fact-checkers open new tabs immediately — the page about itself is the least reliable witness.', hint: 'Sideways, to other tabs.' },
              { id: 'q3', question: 'Best quick check for a suspicious quote attributed to a famous person:', options: ['Assume it’s real if it sounds like them', 'Search the exact quote + a fact-check site', 'Count the likes', 'Check the font'], correctIndex: 1, explanation: 'Fabricated quotes are everywhere; exact-phrase search plus Snopes/AFP/Reuters checks settles most in a minute.', hint: 'Exact words, quoted search.' },
              { id: 'q4', question: 'A primary source for “the city cut library funding” would be…', options: ['A tweet about it', 'The city’s published budget document', 'A meme', 'An opinion column'], correctIndex: 1, explanation: 'The budget itself is the document of record — everything else is interpretation.', hint: 'The document of record.' },
              { id: 'q5', visual: '😬📱', question: 'You shared something that turned out false. The responsible move is…', options: ['Delete quietly and move on', 'Correct it as visibly as you shared it', 'Defend it', 'Blame the algorithm'], correctIndex: 1, explanation: 'Visible corrections repair the damage and build credibility — the correction should travel as far as the mistake.', hint: 'Same audience, same volume.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH10 M2 — Fact vs opinion · Owen
 * ============================================================ */

export const CH10_M2_FACT_OPINION: Mission = {
  id: 'act3.ch10.m2.fact-opinion',
  chapterId: 'act3.ch10',
  lead: 'owen',
  subjects: ['reading'],
  skillTags: ['reading.fact-opinion', 'reading.critical'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Owen here. Tessa says good readers can tell FACTS from OPINIONS. Game on.' },
        { text: 'Facts can be checked. Opinions are what someone feels. Sort them — then a lightning quiz!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Fact or opinion?',
            intro: 'Match each statement to what it is.',
            pairs: [
              { id: 'r1p1', item: { label: '“Hockey is played on ice.”', shape: 'wide-short' }, slot: { label: 'Fact — you can check it' } },
              { id: 'r1p2', item: { label: '“Hockey is the BEST sport.”', shape: 'wide-short' }, slot: { label: 'Opinion — someone’s feeling' } },
              { id: 'r1p3', item: { label: '“Canada has 10 provinces.”', shape: 'wide-short' }, slot: { label: 'Fact — count them!' } },
              { id: 'r1p4', item: { label: '“Winter is too cold.”', shape: 'wide-short' }, slot: { label: 'Opinion — Caleb disagrees!' } },
              { id: 'r1p5', item: { label: '“Our house has a trampoline.”', shape: 'wide-short' }, slot: { label: 'Fact — go look!' } },
            ],
            stuckHint: 'Ask: could we CHECK this? Or is it how someone FEELS?',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Spot the clue words',
            intro: 'Some words signal opinions. Match them!',
            pairs: [
              { id: 'r2p1', item: { label: '“The best / the worst”', shape: 'wide-short' }, slot: { label: 'Opinion words' } },
              { id: 'r2p2', item: { label: '“Measured 30 cm”', shape: 'wide-short' }, slot: { label: 'Fact words' } },
              { id: 'r2p3', item: { label: '“I think / I feel”', shape: 'wide-short' }, slot: { label: 'Opinion starters' } },
              { id: 'r2p4', item: { label: '“Happened on Tuesday”', shape: 'wide-short' }, slot: { label: 'Checkable detail' } },
              { id: 'r2p5', item: { label: '“Beautiful / boring / yucky”', shape: 'wide-short' }, slot: { label: 'Feeling words' } },
            ],
            stuckHint: 'Numbers and dates can be checked. "Best" and "yucky" live in someone’s head.',
          },
          {
            kind: 'quiz',
            heading: 'Round 3 · Lightning round',
            intro: 'Last check, detective! Look at each scene and call it: fact or opinion?',
            questions: [
              { id: 'q1', visual: '❄️🧤', question: '“Snow is cold.” Fact or opinion?', options: ['Fact — a thermometer can check it', 'Opinion', 'A joke', 'A question'], correctIndex: 0, explanation: 'You can measure snow’s temperature — checkable means fact!', hint: 'Could you check it with a thermometer?' },
              { id: 'q2', visual: '🍕', question: '“Pizza is the yummiest food ever.” Fact or opinion?', options: ['Fact', 'Opinion — “yummiest” is a feeling word', 'A recipe', 'News'], correctIndex: 1, explanation: '“Yummiest” lives in someone’s head — Izzy might pick tacos!', hint: 'Can you measure “yummiest”?' },
              { id: 'q3', visual: '🐕🐾', question: '“Dogs have four legs.” Fact or opinion?', options: ['Opinion', 'Fact — you can count them!', 'A story', 'A wish'], correctIndex: 1, explanation: 'Counting is checking — that makes it a fact.', hint: 'Could you check it by looking at a dog?' },
              { id: 'q4', visual: '📚🛏️', question: '“Bedtime stories are boring,” says Owen. That is…', options: ['A fact', 'Owen’s opinion — Caleb loves them!', 'A rule', 'News'], correctIndex: 1, explanation: '“Boring” is a feeling word — it changes from person to person.', hint: 'Does everyone feel the same about stories?' },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Owen. It gets trickier: opinions dressed up as facts, and facts wrapped in opinions. Detective mode.' },
        { text: 'Two rounds of close reading.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Dressed-up statements',
            intro: 'Match each statement to its true nature.',
            pairs: [
              { id: 'r1p1', item: { label: '“Clearly, everyone loves the new rink.”', shape: 'huge-wide' }, slot: { label: 'Opinion wearing a “clearly” costume' } },
              { id: 'r1p2', item: { label: '“The rink cost $2.1M to build.”', shape: 'wide-short' }, slot: { label: 'Fact — checkable in city records' } },
              { id: 'r1p3', item: { label: '“The rink opened in 2024 and it’s fantastic.”', shape: 'huge-wide' }, slot: { label: 'Fact AND opinion in one sentence' } },
              { id: 'r1p4', item: { label: '“Experts agree it’s the nicest in Ontario.”', shape: 'huge-wide' }, slot: { label: '“Nicest” is opinion, even from experts' } },
              { id: 'r1p5', item: { label: '“Attendance doubled since opening.”', shape: 'wide-short' }, slot: { label: 'Fact — the numbers exist' } },
            ],
            stuckHint: '"Clearly" and "everyone knows" usually decorate opinions, not facts.',
          },
          {
            heading: 'Round 2 · Strong opinions, good evidence',
            intro: 'Opinions aren’t bad — good ones cite facts! Match each.',
            pairs: [
              { id: 'r2p1', item: { label: '“We need a longer lunch (kids rush in 20 min).”', shape: 'huge-wide' }, slot: { label: 'Opinion SUPPORTED by a fact' } },
              { id: 'r2p2', item: { label: '“Lunch should be longer because I said so.”', shape: 'wide-short' }, slot: { label: 'Opinion with no support' } },
              { id: 'r2p3', item: { label: '“The library logged 4,000 visits last month.”', shape: 'wide-short' }, slot: { label: 'Evidence a writer could use' } },
              { id: 'r2p4', item: { label: '“Therefore the library deserves more funding.”', shape: 'wide-short' }, slot: { label: 'A conclusion built on evidence' } },
              { id: 'r2p5', item: { label: 'Facts chosen + conclusion drawn', shape: 'wide-short' }, slot: { label: 'An argument — judge its strength!' } },
            ],
            stuckHint: 'The best opinions show their homework.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Owen. Advanced class: claims of fact, claims of value, claims of policy — and the evidence each one needs.' },
        { text: 'Sort like an editor.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Three kinds of claims',
            intro: 'Match each claim to its type.',
            pairs: [
              { id: 'r1p1', item: { label: '“The city spent $40M on roads in 2025.”', shape: 'huge-wide' }, slot: { label: 'Claim of FACT — verify with records' } },
              { id: 'r1p2', item: { label: '“Road quality matters more than transit.”', shape: 'huge-wide' }, slot: { label: 'Claim of VALUE — argue with priorities' } },
              { id: 'r1p3', item: { label: '“The city SHOULD double the bike-lane budget.”', shape: 'huge-wide' }, slot: { label: 'Claim of POLICY — argue with outcomes' } },
              { id: 'r1p4', item: { label: 'Best evidence for a fact claim', shape: 'wide-short' }, slot: { label: 'Documents, data, records' } },
              { id: 'r1p5', item: { label: 'Best support for a policy claim', shape: 'wide-short' }, slot: { label: 'Costs, benefits, precedents' } },
            ],
            stuckHint: '“Should” signals policy. “Is/was/costs” signals fact. “Matters/better” signals value.',
          },
          {
            heading: 'Round 2 · Editor’s desk',
            intro: 'Match each editing call.',
            pairs: [
              { id: 'r2p1', item: { label: '“Sources say the mayor might resign.”', sublabel: 'editor asks…', shape: 'huge-wide' }, slot: { label: 'WHICH sources? How many? How placed?' } },
              { id: 'r2p2', item: { label: 'A verified fact that makes our side look bad', shape: 'huge-wide' }, slot: { label: 'Publish it — credibility over comfort' } },
              { id: 'r2p3', item: { label: 'Opinion column vs news report', sublabel: 'difference?', shape: 'wide-short' }, slot: { label: 'Labelled judgment vs sourced account' } },
              { id: 'r2p4', item: { label: '“Allegedly” before an unproven accusation', shape: 'wide-short' }, slot: { label: 'Precision AND fairness — keep it' } },
              { id: 'r2p5', item: { label: 'Two solid sources conflict', sublabel: 'the story says…', shape: 'wide-short' }, slot: { label: 'Both accounts, clearly attributed' } },
            ],
            stuckHint: 'Editors protect the reader’s ability to judge — not the writer’s comfort.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ============================================================
 * CH10 M3 — The family survey · Izzy
 * ============================================================ */

export const CH10_M3_SURVEY: Mission = {
  id: 'act3.ch10.m3.survey',
  chapterId: 'act3.ch10',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['math.data.collection', 'math.data.charts'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy! For the family-room redesign, I surveyed everyone about colours and snacks. DATA!' },
        { text: 'Three rounds: colour votes, the snack survey, then count the movie-night hands!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Count the votes',
            intro: 'Colour votes: Teal: Mama T, Tessa, Caleb. Yellow: Izzy, Owen. Coral: Dada T.',
            questions: [
              { id: 'q1', question: 'How many votes did teal get?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: 'Mama T + Tessa + Caleb = 3 votes.', hint: 'Count the names.' },
              { id: 'q2', question: 'Which colour WON?', options: ['Teal', 'Yellow', 'Coral', 'Tie'], correctIndex: 0, explanation: 'Teal’s 3 beats yellow’s 2 and coral’s 1.', hint: 'Most votes wins.' },
              { id: 'q3', question: 'How many people voted in all?', options: ['4', '5', '6', '7'], correctIndex: 2, explanation: '3 + 2 + 1 = 6 — the whole family!', hint: 'Add all the votes.' },
              { id: 'q4', question: 'How many MORE votes did teal get than coral?', options: ['1', '2', '3', '0'], correctIndex: 1, explanation: '3 − 1 = 2 more votes.', hint: 'Subtract.' },
              { id: 'q5', question: 'On a bar chart, the tallest bar would be…', options: ['Teal', 'Yellow', 'Coral', 'All equal'], correctIndex: 0, explanation: 'Most votes = tallest bar. Charts make winners easy to see!', hint: 'Tallest = most.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Snack survey',
            intro: 'Movie-snack votes: Popcorn 𝍸 (5)… wait, that’s more than 6! Caleb voted twice!',
            questions: [
              { id: 'q1', question: 'If 6 people vote once each, the votes should total…', options: ['5', '6', '7', '12'], correctIndex: 1, explanation: 'One person, one vote: 6 voters = 6 votes.', hint: 'One each.' },
              { id: 'q2', question: 'My tally shows 7 votes. That means…', options: ['Math is broken', 'Someone voted twice — check the data!', 'It’s fine', 'A ghost voted'], correctIndex: 1, explanation: 'When data doesn’t add up, good scientists check for errors. (It was Caleb.)', hint: '7 > 6…' },
              { id: 'q3', question: 'After fixing it: popcorn 4, fruit 2. Popcorn won by…', options: ['1', '2', '3', '6'], correctIndex: 1, explanation: '4 − 2 = 2 votes.', hint: 'Subtract the loser from the winner.' },
              { id: 'q4', question: 'A pictograph uses 1 🍿 = 1 vote. Popcorn’s row shows…', options: ['2 🍿', '4 🍿', '6 🍿', '8 🍿'], correctIndex: 1, explanation: 'Four votes = four popcorn symbols.', hint: 'One symbol per vote.' },
              { id: 'q5', question: 'Next survey, how do we stop double votes?', options: ['No rules', 'Check names off a list as they vote', 'Let Caleb count', 'Vote by yelling'], correctIndex: 1, explanation: 'A checklist makes one-person-one-vote stick. Good data starts with good collecting!', hint: 'How do real elections do it?' },
            ],
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the hands',
            intro: 'One last vote — movie night! Hands up, and Izzy counts.',
            items: [
              {
                id: 'c1',
                prompt: 'How many hands went up for the superhero movie?',
                groups: [{ emoji: '✋', count: 4 }],
                answer: 4,
                options: [3, 4, 5, 6],
                hint: 'Count each hand one at a time.',
                explanation: 'Four hands for the superhero movie!',
              },
              {
                id: 'c2',
                prompt: 'The dinosaur movie got 2 kid votes and 1 grown-up vote. How many votes in all?',
                groups: [
                  { emoji: '✋', count: 2, label: 'Kids' },
                  { emoji: '✋', count: 1, label: 'Grown-ups' },
                ],
                answer: 3,
                options: [2, 3, 4, 5],
                hint: 'Count the kids’ hands, then one more.',
                explanation: '2 + 1 = 3 votes for dinosaurs. Rawr!',
              },
              {
                id: 'c3',
                prompt: 'Drink vote! How many cups mark the juice row on Izzy’s chart?',
                groups: [{ emoji: '🥤', count: 6 }],
                answer: 6,
                options: [5, 6, 7, 8],
                hint: 'One cup for each vote — count the cups.',
                explanation: 'Six cups means six juice votes!',
              },
              {
                id: 'c4',
                prompt: 'Izzy let the cousins vote too! Comedy got 5 votes and the space movie got 4. How many votes in all?',
                groups: [
                  { emoji: '🎬', count: 5, label: 'Comedy' },
                  { emoji: '🚀', count: 4, label: 'Space movie' },
                ],
                answer: 9,
                options: [7, 8, 9, 10],
                hint: 'Start at 5 and count 4 more.',
                explanation: '5 + 4 = 9 votes — what a crowd!',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy. The redesign survey went to the whole street — 40 responses! Now: real data analysis.' },
        { text: 'Round 1: percentages and charts. Round 2: asking good questions. Round 3: survey word problems.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · The numbers',
            intro: '40 neighbours answered: Reading nook 16, Game zone 12, Plant corner 8, Mini gym 4.',
            questions: [
              { id: 'q1', question: 'Reading nook’s share of the 40 votes is…', options: ['16%', '25%', '40%', '50%'], correctIndex: 2, explanation: '16/40 = 0.4 = 40%.', hint: '16 out of 40.' },
              { id: 'q2', question: 'On a pie chart, the game zone (12/40) gets what fraction of the circle?', options: ['1/4', '3/10', '1/3', '1/2'], correctIndex: 1, explanation: '12/40 = 3/10 of the pie.', hint: 'Simplify 12/40.' },
              { id: 'q3', question: 'Mini gym’s 4 votes as a percent?', options: ['4%', '10%', '14%', '40%'], correctIndex: 1, explanation: '4/40 = 10%.', hint: 'One in ten.' },
              { id: 'q4', question: 'The top two choices together hold…', options: ['28 votes (70%)', '20 votes (50%)', '24 votes (60%)', '16 votes (40%)'], correctIndex: 0, explanation: '16 + 12 = 28 of 40 = 70%. A clear mandate for cozy + fun.', hint: 'Add the top two.' },
              { id: 'q5', question: 'A pictograph uses 1 symbol = 4 votes. The reading nook row shows…', options: ['4 symbols', '8 symbols', '16 symbols', '2 symbols'], correctIndex: 0, explanation: '16 ÷ 4 = 4 symbols. Keys make pictographs compact!', hint: 'Divide by the key.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Survey design',
            intro: 'The data is only as good as the questions.',
            questions: [
              { id: 'q1', question: 'Which question is FAIR (not leading)?', options: ['“Don’t you agree the room needs a TV?”', '“What should the room include?”', '“Only boring people want plants, right?”', '“TV or bad taste?”'], correctIndex: 1, explanation: 'Open and neutral. The others push the answer — leading questions poison data.', hint: 'Which one doesn’t push?' },
              { id: 'q2', question: 'I surveyed only kids at the playground about nap corners. The flaw is…', options: ['Sample bias — playground kids aren’t everyone', 'Too much math', 'Naps are bad', 'No flaw'], correctIndex: 0, explanation: 'WHO you ask shapes what you hear — a playground sample skews young and energetic.', hint: 'Who never got asked?' },
              { id: 'q3', question: '“Do you prefer teal, or the obviously wrong colours?” is broken because…', options: ['Teal is bad', 'The options are loaded/unbalanced', 'Too short', 'Too long'], correctIndex: 1, explanation: 'Answer options need to be neutral and complete, not jokes plus a favourite.', hint: 'Look at the choices, not the question.' },
              { id: 'q4', question: '5 of my 40 forms came back blank. Honest reporting says…', options: ['Pretend they’re teal votes', 'Report “n = 35 of 40 responded”', 'Throw away the survey', 'Fill them in myself'], correctIndex: 1, explanation: 'Non-responses get disclosed, never invented. n matters.', hint: 'What would a scientist write?' },
              { id: 'q5', question: 'Survey says 70% want quiet spaces; my brother LOUDLY disagrees. The data…', options: ['Is wrong because he’s loud', 'Still stands — one loud voice isn’t a majority', 'Must be redone', 'Should exclude him'], correctIndex: 1, explanation: 'Volume ≠ votes. (We’ll build Owen a small loud corner.)', hint: 'How many is he?' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Crunch the results',
            intro: 'Izzy slides the tally sheets across the table. Work each answer out and type it.',
            items: [
              {
                id: 'w1',
                visual: '🌿📊',
                problem: 'The plant corner got 8 of the 40 votes. What percent of the votes is that?',
                answer: 20,
                unit: '%',
                hint: 'Part ÷ whole, then × 100.',
                explanation: '8 ÷ 40 = 0.2, which is 20%.',
              },
              {
                id: 'w2',
                visual: '📚🏋️',
                problem: 'The reading nook got 16 votes and the mini gym got 4. How many MORE votes did the reading nook get?',
                answer: 12,
                unit: 'votes',
                hint: 'Subtract the smaller count from the bigger one.',
                explanation: '16 − 4 = 12 more votes for cozy reading.',
              },
              {
                id: 'w3',
                visual: '🖊️📋',
                problem: 'Izzy marks votes in tally groups of 5. She has 6 full groups and 3 extra marks. How many votes is that?',
                answer: 33,
                unit: 'votes',
                hint: 'Multiply the full groups by 5 first, then add the extras.',
                explanation: '6 × 5 = 30, plus 3 extras = 33 votes.',
              },
              {
                id: 'w4',
                visual: '🍿🍎',
                problem: 'The snack question got 40 answers: 25 chose popcorn and the rest chose fruit. How many chose fruit?',
                answer: 15,
                unit: 'votes',
                hint: 'Everyone answered — take the popcorn votes away from 40.',
                explanation: '40 − 25 = 15 fruit fans.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. Publishing the survey in Tessa’s paper means defending the methodology. Bring statistics.' },
        { text: 'Round 1: deeper analysis. Round 2: methodology defence. Round 3: compute the statistics yourself.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Deeper analysis',
            intro: 'Same data, sharper tools. (40 responses; ages 6–78.)',
            questions: [
              { id: 'q1', question: 'Respondent ages: most are 30–45, a few are 70+. The 70+ values pull which statistic up most?', options: ['Mode', 'Median', 'Mean', 'Minimum'], correctIndex: 2, explanation: 'Means chase outliers; medians resist them — the ice-time lesson, generalized.', hint: 'Which stat did the 46-minute shift break?' },
              { id: 'q2', question: 'Cross-tab: kids prefer game zone 9:3, adults prefer reading nook 13:3. The insight is…', options: ['The street is confused', 'Preference differs BY GROUP — segment the design', 'Data error', 'Adults are wrong'], correctIndex: 1, explanation: 'Aggregates hide structure; cross-tabulation reveals it. Zones for both!', hint: 'Split the data by age.' },
              { id: 'q3', question: 'If I resurveyed a different random 40 people, results would…', options: ['Be identical', 'Vary somewhat — sampling variability is normal', 'Be opposite', 'Be invalid'], correctIndex: 1, explanation: 'Samples wobble around the true value — that’s why bigger n gives steadier answers.', hint: 'Would 40 coin flips repeat exactly?' },
              { id: 'q4', question: 'A result is called “statistically significant” when…', options: ['It’s important', 'It’s unlikely to be explained by random chance alone', 'It’s large', 'A journalist liked it'], correctIndex: 1, explanation: 'Significance is about chance, not importance — small boring effects can be significant, big ones can fail the test in tiny samples.', hint: 'It’s a claim about luck.' },
              { id: 'q5', question: 'Margin of error mostly shrinks when…', options: ['You ask nicer', 'Sample size grows', 'You round more', 'Charts get bigger'], correctIndex: 1, explanation: 'More independent responses = tighter estimates (roughly ∝ 1/√n).', hint: 'n is the lever.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Defend the methodology',
            intro: 'The editor (Tessa) interrogates. Answer well.',
            questions: [
              { id: 'q1', question: '“Your survey was online only. Who’s missing?”', options: ['No one', 'Neighbours without internet access or comfort — likely older residents', 'Everyone answered', 'Robots'], correctIndex: 1, explanation: 'Mode of collection biases the sample — supplement with paper/door-knock for coverage.', hint: 'Who doesn’t do online forms?' },
              { id: 'q2', question: '“40 of 200 households responded. Can you claim ‘the street wants’?”', options: ['Yes, confidently', 'Carefully — report it as ‘of those who responded’ (20% response rate)', 'No, delete everything', 'Round 40 up to 200'], correctIndex: 1, explanation: 'Non-response bias is real: responders may differ from silent neighbours. Scope your claims.', hint: 'Who answers surveys? People who care.' },
              { id: 'q3', question: '“You offered candy for completing it. Problem?”', options: ['None', 'Incentives can skew WHO responds (sweet tooths!) — disclose it', 'Candy is data', 'Yes — cancel the survey'], correctIndex: 1, explanation: 'Incentives boost response but shape samples; transparency lets readers judge.', hint: 'Disclose, don’t hide.' },
              { id: 'q4', question: '“One person filled it in for their whole family of 5.” That breaks…', options: ['Nothing', 'Independence of responses — it’s 1 opinion weighted ×5', 'The internet', 'The pie chart'], correctIndex: 1, explanation: 'Units of analysis matter: 5 forms ≠ 5 independent voices.', hint: 'Caleb’s double-vote, all grown up.' },
              { id: 'q5', question: 'The strongest line in my methods section is…', options: ['“Trust me”', '“Here’s exactly what I asked, who answered, and what I can’t conclude”', '“The data speaks for itself”', '“Statistics prove it”'], correctIndex: 1, explanation: 'Transparent limits ARE credibility — readers trust work that shows its boundaries.', hint: 'Science is honest about its edges.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · The statistics desk',
            intro: 'Before Tessa prints anything, every number gets recomputed by hand. Your turn.',
            items: [
              {
                id: 'w1',
                visual: '🧒📊',
                problem: 'Of the 40 responses, 22 came from adults and the rest from kids. What percent of responses came from kids?',
                answer: 45,
                unit: '%',
                hint: 'Find the kid count first, then divide by 40 and × 100.',
                explanation: '40 − 22 = 18 kids; 18 ÷ 40 = 0.45 → 45%.',
              },
              {
                id: 'w2',
                visual: '🏘️📈',
                problem: 'The street has 200 households and 40 responded this year. Next year Izzy wants a 30% response rate. How many responses is that?',
                answer: 60,
                unit: 'responses',
                hint: '30% of 200 — convert the percent to a decimal and multiply.',
                explanation: '200 × 0.30 = 60 responses.',
              },
              {
                id: 'w3',
                visual: '🛋️⏱️',
                problem: 'Five families reported their weekly family-room hours: 6, 8, 10, 7, and 9. What is the mean?',
                answer: 8,
                unit: 'hours',
                hint: 'Add them all, then divide by how many there are.',
                explanation: '6 + 8 + 10 + 7 + 9 = 40, and 40 ÷ 5 = 8 hours.',
              },
              {
                id: 'w4',
                visual: '🥧📐',
                problem: 'On a pie chart of all 40 votes, how many degrees should the game zone’s 12-vote slice get?',
                answer: 108,
                unit: 'degrees',
                hint: 'The whole circle is 360°. Find the fraction 12/40 first.',
                explanation: '12 ÷ 40 = 0.3, and 0.3 × 360 = 108°.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};
