// Act II begins: the house is repaired, so chapters now grant UPGRADES.
// Chapter 5 · "The garage robot" (Mama T & Tessa) → garage workshop
// Chapter 6 · "Family cookbook" (Dada T & Izzy) → big kitchen island

import type { Mission } from '../types';
import type {
  CodeRobotMissionParams,
  DragMatchMissionParams,
  QuizMissionParams,
} from './missions';

/* ============================================================
 * CH5 M1 — Program the robot · Tessa (code-robot engine!)
 * ============================================================ */

export const CH5_M1_ROBOT: Mission = {
  id: 'act2.ch5.m1.robot',
  chapterId: 'act2.ch5',
  lead: 'tessa',
  subjects: ['coding'],
  skillTags: ['coding.sequencing', 'coding.planning', 'coding.debugging'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa here! Mama T and I built a real robot for the garage. It only understands three commands: forward, turn left, turn right.' },
        { text: 'Help me drive it to the star! Tap commands to build a program, then press Run.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            heading: 'Round 1 · First drive',
            intro: 'The robot starts facing up. Get it to the star!',
            cols: 3, rows: 3,
            start: { x: 0, y: 2, dir: 'up' },
            goal: { x: 2, y: 0 },
          },
          {
            heading: 'Round 2 · Around the toolbox',
            intro: 'Now there’s a toolbox in the way. Drive around it!',
            cols: 4, rows: 3,
            start: { x: 0, y: 1, dir: 'right' },
            goal: { x: 3, y: 1 },
            walls: [{ x: 2, y: 1 }],
          },
        ],
      } satisfies CodeRobotMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa here. The garage robot is working — now it needs a driver who can plan ahead.' },
        { text: 'Two courses. Watch out for the walls, and try to use as few commands as you can.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The S-curve',
            intro: 'Snake between the shelves to reach the star.',
            cols: 4, rows: 4,
            start: { x: 0, y: 3, dir: 'up' },
            goal: { x: 3, y: 0 },
            walls: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 1 }].slice(0, 3),
          },
          {
            heading: 'Round 2 · Tight squeeze',
            intro: 'A narrow path this time — plan the whole route before you run.',
            cols: 5, rows: 4,
            start: { x: 0, y: 0, dir: 'right' },
            goal: { x: 4, y: 3 },
            walls: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 3, y: 2 }],
          },
        ],
      } satisfies CodeRobotMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. Real programmers work under constraints — limited memory, limited moves. Our robot now has a command limit.' },
        { text: 'Solve each course within the command budget. Plan twice, run once.' },
      ],
      pattern: 'code-robot',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Command budget: 9',
            intro: 'Reach the star using at most 9 commands.',
            cols: 5, rows: 4,
            start: { x: 0, y: 3, dir: 'up' },
            goal: { x: 4, y: 0 },
            walls: [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
            maxCommands: 9,
          },
          {
            heading: 'Round 2 · The maze, budget: 12',
            intro: 'A real maze. 12 commands max — every turn counts.',
            cols: 5, rows: 5,
            start: { x: 0, y: 4, dir: 'up' },
            goal: { x: 4, y: 4 },
            walls: [
              { x: 1, y: 4 }, { x: 1, y: 3 }, { x: 3, y: 0 },
              { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 2 },
            ],
            maxCommands: 12,
          },
        ],
      } satisfies CodeRobotMissionParams,
    },
  },
};

/* ============================================================
 * CH5 M2 — Simple machines · Mama T
 * ============================================================ */

export const CH5_M2_MACHINES: Mission = {
  id: 'act2.ch5.m2.machines',
  chapterId: 'act2.ch5',
  lead: 'mama_t',
  subjects: ['science'],
  skillTags: ['science.machines.simple', 'science.forces.basic'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Mama T here! Building the workshop means using tools — and every tool is secretly a simple machine.' },
        { text: 'Two rounds: name the machines, then pick the right tool for each job.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Name that machine',
            intro: 'Simple machines make work easier.',
            questions: [
              { id: 'q1', question: 'A ramp for rolling heavy things up is called…', options: ['A lever', 'An inclined plane', 'A pulley', 'A spring'], correctIndex: 1, explanation: 'An inclined plane (ramp) lets you raise heavy things with less push, over a longer distance.', hint: 'It’s flat and slanted.' },
              { id: 'q2', question: 'A see-saw is an example of…', options: ['A wheel', 'A wedge', 'A lever', 'A screw'], correctIndex: 2, explanation: 'A lever pivots on a point (the fulcrum) — push one end down, the other goes up.', hint: 'Think about how a see-saw moves.' },
              { id: 'q3', question: 'What helps a wagon roll instead of drag?', options: ['Wheels', 'Wedges', 'Ropes', 'Magnets'], correctIndex: 0, explanation: 'Wheels and axles turn sliding into rolling — much less friction!', hint: 'They’re round.' },
              { id: 'q4', question: 'A pulley uses a rope and wheel to help you…', options: ['Cut wood', 'Lift things up', 'Glue parts', 'Paint walls'], correctIndex: 1, explanation: 'Pull down on the rope and the load goes up — pulleys redirect your pull.', hint: 'Think of a flagpole.' },
              { id: 'q5', question: 'An axe head that splits wood is…', options: ['A wedge', 'A pulley', 'A lever', 'A wheel'], correctIndex: 0, explanation: 'A wedge is two inclined planes back-to-back — it pushes material apart.', hint: 'It’s pointy and splits things.' },
            ],
          },
          {
            heading: 'Round 2 · The right tool',
            intro: 'Pick the best machine for each workshop job.',
            questions: [
              { id: 'q1', question: 'Get a heavy toolbox onto a high shelf with a rope. Use a…', options: ['Pulley', 'Wedge', 'Screw', 'Ramp going down'], correctIndex: 0, explanation: 'A pulley on the ceiling lets you hoist it straight up.', hint: 'Rope + wheel.' },
              { id: 'q2', question: 'Roll the robot up into the trunk of the car. Use a…', options: ['Lever', 'Ramp', 'Magnet', 'Spring'], correctIndex: 1, explanation: 'A ramp (inclined plane) beats lifting straight up.', hint: 'The robot has wheels!' },
              { id: 'q3', question: 'Pry open a stuck paint can lid. Use a…', options: ['Pulley', 'Wheel', 'Lever (like a screwdriver)', 'Funnel'], correctIndex: 2, explanation: 'The screwdriver becomes a lever — small push, big pry.', hint: 'Pivot and pry.' },
              { id: 'q4', question: 'Hold two pieces of wood together really tight. Use…', options: ['Screws', 'Marbles', 'String', 'Tape only'], correctIndex: 0, explanation: 'A screw is an inclined plane wrapped around a post — it pulls itself in tight.', hint: 'Twist twist twist.' },
              { id: 'q5', question: 'Split a big piece of firewood. Use a…', options: ['Pulley', 'Wedge (axe)', 'Wheel', 'Ruler'], correctIndex: 1, explanation: 'The axe’s wedge focuses force to split the wood apart.', hint: 'Same answer as the pointy one before!' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Mama T. The workshop build is on — and it’s applied physics. Let’s talk mechanical advantage.' },
        { text: 'Round 1: how machines trade force for distance. Round 2: friction and forces.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Mechanical advantage',
            intro: 'Machines don’t give free work — they trade.',
            questions: [
              { id: 'q1', question: 'A ramp lets you push with LESS force but over a LONGER distance. The total work is…', options: ['Much less', 'About the same', 'Much more', 'Zero'], correctIndex: 1, explanation: 'Machines trade force for distance — the work (force × distance) stays about the same (a bit more with friction).', hint: 'Nothing is free in physics.' },
              { id: 'q2', question: 'To lift easiest with a lever, the load should be ____ the fulcrum, and your push ____ it.', options: ['Close to / far from', 'Far from / close to', 'On top of / under', 'It makes no difference'], correctIndex: 0, explanation: 'A long effort-arm and short load-arm multiplies your force.', hint: 'Think of a crowbar.' },
              { id: 'q3', question: 'Adding a second pulley wheel to share the load roughly…', options: ['Doubles the force needed', 'Halves the force needed', 'Changes nothing', 'Makes the rope shorter'], correctIndex: 1, explanation: 'Each supporting rope strand shares the load — two strands ≈ half the pull (but twice the rope to pull).', hint: 'More strands share the weight.' },
              { id: 'q4', question: 'Gears that connect a big wheel to a small wheel are used to change…', options: ['Colour', 'Speed and force', 'Temperature', 'Volume'], correctIndex: 1, explanation: 'Gear ratios trade speed for turning force (torque), like bike gears.', hint: 'Why does your bike have gears?' },
              { id: 'q5', question: 'A screw with closer threads (finer pitch) needs…', options: ['More turns but less force', 'Fewer turns and less force', 'More force per turn', 'A bigger screwdriver only'], correctIndex: 0, explanation: 'Finer threads = gentler inclined plane = easier turning, more turns. The same trade again!', hint: 'Same ramp logic, wrapped in a spiral.' },
            ],
          },
          {
            heading: 'Round 2 · Friction & forces',
            intro: 'The robot’s wheels, the workshop floor, and the physics between them.',
            questions: [
              { id: 'q1', question: 'Friction is a force that…', options: ['Speeds things up', 'Resists sliding between surfaces', 'Only exists in water', 'Pushes things upward'], correctIndex: 1, explanation: 'Friction opposes motion between touching surfaces — sometimes useful (brakes!), sometimes not (squeaky door).', hint: 'What made the old door squeak?' },
              { id: 'q2', question: 'The robot climbs better on rubber wheels than steel ones because rubber has…', options: ['Less mass', 'More friction (grip)', 'More electricity', 'Less colour'], correctIndex: 1, explanation: 'Higher friction between wheel and floor = better traction.', hint: 'Think of winter tires.' },
              { id: 'q3', question: 'Oil on a hinge reduces…', options: ['Gravity', 'Friction', 'Magnetism', 'Weight'], correctIndex: 1, explanation: 'Lubricants let surfaces slide with less resistance — goodbye squeak.', hint: 'We fixed a door this way once.' },
              { id: 'q4', question: 'For the robot to speed up, the forces on it must be…', options: ['Balanced', 'Unbalanced', 'Zero', 'Invisible'], correctIndex: 1, explanation: 'Unbalanced (net) force causes acceleration — Newton’s second law in action.', hint: 'Balanced forces = steady speed.' },
              { id: 'q5', question: 'The robot pushes back on the floor; the floor pushes the robot forward. That’s…', options: ['Newton’s third law', 'Magnetism', 'A glitch', 'Friction only'], correctIndex: 0, explanation: 'Every action has an equal and opposite reaction — that reaction is what drives the robot forward.', hint: 'Action and…' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Mama T. Workshop physics, properly: work, power, efficiency, and why no machine is ever 100%.' },
        { text: 'Two rounds — quantitative this time.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Work and power',
            intro: 'Work = force × distance. Power = work ÷ time.',
            questions: [
              { id: 'q1', question: 'Lifting a 50 N robot 2 m onto the bench takes how much work?', options: ['25 J', '52 J', '100 J', '200 J'], correctIndex: 2, explanation: 'W = F × d = 50 N × 2 m = 100 J.', hint: 'Multiply force by distance.' },
              { id: 'q2', question: 'Doing those 100 J in 5 seconds is a power of…', options: ['20 W', '100 W', '500 W', '5 W'], correctIndex: 0, explanation: 'P = W ÷ t = 100 J ÷ 5 s = 20 W.', hint: 'Divide work by time.' },
              { id: 'q3', question: 'A ramp is 4 m long and 1 m high. Ideal force to push a 200 N crate up it?', options: ['200 N', '50 N', '100 N', '800 N'], correctIndex: 1, explanation: 'Ideal mechanical advantage = 4 m / 1 m = 4, so 200 N ÷ 4 = 50 N (ignoring friction).', hint: 'Length ÷ height gives the advantage.' },
              { id: 'q4', question: 'With friction, the real push up that ramp is 65 N. Efficiency ≈ ?', options: ['50/65 ≈ 77%', '65/50 = 130%', '100%', '4%'], correctIndex: 0, explanation: 'Efficiency = ideal ÷ actual = 50/65 ≈ 77%. Friction eats the rest.', hint: 'Ideal over actual.' },
              { id: 'q5', question: 'A lever lifts 300 N with a 100 N push. Its mechanical advantage is…', options: ['1/3', '3', '300', '100'], correctIndex: 1, explanation: 'MA = load ÷ effort = 300 ÷ 100 = 3.', hint: 'Load over effort.' },
            ],
          },
          {
            heading: 'Round 2 · Design decisions',
            intro: 'Engineering trade-offs in the workshop.',
            questions: [
              { id: 'q1', question: 'Why can’t any machine be 100% efficient?', options: ['Bad design only', 'Friction and heat always take a share of the energy', 'Machines get tired', 'Gravity turns off'], correctIndex: 1, explanation: 'Some input energy always becomes heat/sound via friction — conservation of energy still holds, but not all goes where we want.', hint: 'Where does the “lost” energy go?' },
              { id: 'q2', question: 'The robot’s motor stalls lifting a load. Which fix gives more torque at the wheel?', options: ['Bigger gear on the motor, smaller on the wheel', 'Smaller gear on the motor, bigger on the wheel', 'Removing gears entirely', 'Painting the gears'], correctIndex: 1, explanation: 'Small driving gear → big driven gear multiplies torque (and reduces speed).', hint: 'Trade speed for force.' },
              { id: 'q3', question: 'Doubling a ramp’s length (same height) does what to the ideal force needed?', options: ['Halves it', 'Doubles it', 'Squares it', 'No change'], correctIndex: 0, explanation: 'MA = L/h, so doubling L doubles the advantage and halves the force.', hint: 'Longer, gentler slope.' },
              { id: 'q4', question: 'Ball bearings in the robot’s wheels primarily reduce…', options: ['Mass', 'Sliding friction (by converting it to rolling)', 'Air pressure', 'Cost'], correctIndex: 1, explanation: 'Bearings replace sliding contact with rolling contact — far less friction.', hint: 'Rolling beats sliding.' },
              { id: 'q5', question: 'A 60% efficient pulley system needs how much input work to deliver 120 J of lifting?', options: ['72 J', '120 J', '200 J', '180 J'], correctIndex: 2, explanation: 'Input = output ÷ efficiency = 120 ÷ 0.6 = 200 J.', hint: 'Output over efficiency.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH5 M3 — Robot-parts budget · Izzy
 * ============================================================ */

export const CH5_M3_BUDGET: Mission = {
  id: 'act2.ch5.m3.budget',
  chapterId: 'act2.ch5',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['math.money', 'math.arithmetic.applied'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy! We have $20 saved for robot parts, and I’m the family treasurer.' },
        { text: 'Help me add up prices and count change. Canadian coins, of course!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Know your coins',
            intro: 'Match each coin or bill to its value.',
            pairs: [
              { id: 'r1p1', item: { label: 'Nickel', shape: 'small-square' }, slot: { label: '5¢' } },
              { id: 'r1p2', item: { label: 'Dime', shape: 'small-square' }, slot: { label: '10¢' } },
              { id: 'r1p3', item: { label: 'Quarter', shape: 'small-square' }, slot: { label: '25¢' } },
              { id: 'r1p4', item: { label: 'Loonie', shape: 'small-square' }, slot: { label: '$1' } },
              { id: 'r1p5', item: { label: 'Toonie', shape: 'small-square' }, slot: { label: '$2' } },
            ],
            stuckHint: 'The loonie has a loon bird on it. The toonie is worth TWO loonies.',
          },
          {
            heading: 'Round 2 · Add it up',
            intro: 'Match each handful of money to its total.',
            pairs: [
              { id: 'r2p1', item: { label: 'Toonie + loonie', shape: 'wide-short' }, slot: { label: '$3' } },
              { id: 'r2p2', item: { label: '2 quarters', shape: 'small-square' }, slot: { label: '50¢' } },
              { id: 'r2p3', item: { label: 'Loonie + quarter', shape: 'wide-short' }, slot: { label: '$1.25' } },
              { id: 'r2p4', item: { label: '2 toonies + loonie', shape: 'wide-short' }, slot: { label: '$5' } },
              { id: 'r2p5', item: { label: 'Dime + nickel', shape: 'small-square' }, slot: { label: '15¢' } },
            ],
            stuckHint: 'Count the big coins first, then add the little ones.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy. Robot budget: $60. Parts list: long. Math: necessary.' },
        { text: 'Round 1: totals and change. Round 2: comparing deals.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Totals and change',
            intro: 'Match each purchase to the right amount.',
            pairs: [
              { id: 'r1p1', item: { label: 'Motor $24 + wheels $13', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$37' } },
              { id: 'r1p2', item: { label: 'Pay $20 for a $13.50 part', sublabel: 'change?', shape: 'wide-short' }, slot: { label: '$6.50' } },
              { id: 'r1p3', item: { label: 'Three $4.25 sensors', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$12.75' } },
              { id: 'r1p4', item: { label: 'Budget $60 − spent $42', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$18' } },
              { id: 'r1p5', item: { label: 'Battery $9.99 + tax $1.30', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$11.29' } },
            ],
            stuckHint: 'Line up the decimal points when adding money.',
          },
          {
            heading: 'Round 2 · Which deal?',
            intro: 'Match each comparison to the better answer.',
            pairs: [
              { id: 'r2p1', item: { label: '4 wheels for $12 vs $3.50 each', sublabel: 'cheaper way?', shape: 'wide-short' }, slot: { label: 'The $12 pack ($3 each)' } },
              { id: 'r2p2', item: { label: '$45 kit at 20% off', sublabel: 'sale price?', shape: 'wide-short' }, slot: { label: '$36' } },
              { id: 'r2p3', item: { label: '2 motors: $24 each, buy-one-get-half-off', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$36 ($24 + $12)' } },
              { id: 'r2p4', item: { label: '$5/week allowance, need $35', sublabel: 'weeks to save?', shape: 'long-rect' }, slot: { label: '7 weeks' } },
              { id: 'r2p5', item: { label: '10 bolts for $2.50', sublabel: 'price per bolt?', shape: 'small-square' }, slot: { label: '25¢' } },
            ],
            stuckHint: 'For "each" prices, divide. For percent off, find the discount first.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. Full robot budget spreadsheet: taxes, unit conversion, and a sponsorship from Mama T with conditions.' },
        { text: 'Round 1: real-world money math (13% HST!). Round 2: budgeting strategy.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Taxes and totals',
            intro: 'Ontario HST is 13%. Match each problem to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: '$40 part + 13% HST', sublabel: 'total?', shape: 'wide-short' }, slot: { label: '$45.20' } },
              { id: 'r1p2', item: { label: '$22.60 total INCLUDING 13% tax', sublabel: 'pre-tax price?', shape: 'wide-short' }, slot: { label: '$20' } },
              { id: 'r1p3', item: { label: '25% off $80, then 13% tax', sublabel: 'final?', shape: 'wide-short' }, slot: { label: '$67.80' } },
              { id: 'r1p4', item: { label: 'US part: $30 USD at 1.35 CAD/USD', sublabel: 'in CAD?', shape: 'wide-short' }, slot: { label: '$40.50' } },
              { id: 'r1p5', item: { label: '$100 budget − $67.80 − $24.85', sublabel: 'left?', shape: 'wide-short' }, slot: { label: '$7.35' } },
            ],
            stuckHint: 'Adding 13%: multiply by 1.13. Removing it: divide by 1.13.',
          },
          {
            heading: 'Round 2 · Budget strategy',
            intro: 'Match each scenario to the right call.',
            pairs: [
              { id: 'r2p1', item: { label: 'Motor A: $30, lasts 1 yr. Motor B: $50, lasts 2 yrs.', sublabel: 'better per year?', shape: 'wide-short' }, slot: { label: 'B ($25/yr vs $30/yr)' } },
              { id: 'r2p2', item: { label: 'Spent $35 of $60; sensors are $9 each', sublabel: 'max sensors?', shape: 'wide-short' }, slot: { label: '2 ($18 ≤ $25 left)' } },
              { id: 'r2p3', item: { label: 'Save $8/week with $14 saved, need $70', sublabel: 'weeks left?', shape: 'long-rect' }, slot: { label: '7 weeks' } },
              { id: 'r2p4', item: { label: 'Shipping $12 flat OR $4/item for 4 items', sublabel: 'cheaper?', shape: 'wide-short' }, slot: { label: 'Flat $12 (vs $16)' } },
              { id: 'r2p5', item: { label: 'Mama T matches every $2 saved with $1', sublabel: 'you save $30, total?', shape: 'wide-short' }, slot: { label: '$45' } },
            ],
            stuckHint: 'Cost-per-year and cost-per-item make comparisons fair.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ============================================================
 * CH6 M1 — Recipe fractions · Izzy
 * ============================================================ */

export const CH6_M1_FRACTIONS: Mission = {
  id: 'act2.ch6.m1.fractions',
  chapterId: 'act2.ch6',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['math.fractions', 'math.scaling'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy here! We’re making a family cookbook, and recipes are FULL of fractions.' },
        { text: 'Halves and quarters first. You’ve got this!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Halves and quarters',
            intro: 'Pizza math — the best kind.',
            questions: [
              { id: 'q1', question: 'A pizza is cut into 2 equal pieces. Each piece is…', options: ['A whole', 'A half', 'A quarter', 'A third'], correctIndex: 1, explanation: 'Two equal pieces = halves. Each is 1/2.', hint: 'Two pieces…' },
              { id: 'q2', question: 'Cut each half in half again. Now each piece is…', options: ['A half', 'A third', 'A quarter', 'An eighth'], correctIndex: 2, explanation: 'Four equal pieces = quarters. Each is 1/4.', hint: 'Count the pieces: 4.' },
              { id: 'q3', question: 'Which is bigger: 1/2 or 1/4?', options: ['1/2', '1/4', 'Same', 'Can’t tell'], correctIndex: 0, explanation: 'Half a pizza beats a quarter of it — fewer cuts means bigger pieces!', hint: 'Would you rather share with 1 person or 3?' },
              { id: 'q4', question: 'Two quarters together make…', options: ['A whole', 'A half', 'Three quarters', 'Nothing'], correctIndex: 1, explanation: '1/4 + 1/4 = 2/4 = 1/2.', hint: 'Put two pizza quarters side by side.' },
              { id: 'q5', question: 'The recipe needs 1/2 cup of flour. Our scoop is 1/4 cup. How many scoops?', options: ['1', '2', '3', '4'], correctIndex: 1, explanation: 'Two 1/4 scoops fill 1/2 a cup.', hint: 'How many quarters in a half?' },
            ],
          },
          {
            heading: 'Round 2 · Recipe for more people',
            intro: 'Caleb invited a friend — we need MORE food.',
            questions: [
              { id: 'q1', question: 'The cookie recipe makes 10 cookies. We double it. How many cookies?', options: ['12', '15', '20', '100'], correctIndex: 2, explanation: 'Double means ×2: 10 × 2 = 20.', hint: 'Twice as many.' },
              { id: 'q2', question: 'Doubling 1 cup of sugar gives…', options: ['1 cup', '2 cups', '3 cups', '1/2 cup'], correctIndex: 1, explanation: 'Everything doubles: 1 × 2 = 2 cups.', hint: 'Two of everything.' },
              { id: 'q3', question: 'Doubling 1/2 cup of milk gives…', options: ['1/4 cup', '1/2 cup', '1 cup', '2 cups'], correctIndex: 2, explanation: '1/2 + 1/2 = 1 whole cup.', hint: 'Two halves make a…' },
              { id: 'q4', question: 'The recipe needs 3 eggs. Doubled?', options: ['4', '5', '6', '9'], correctIndex: 2, explanation: '3 × 2 = 6 eggs.', hint: 'Three, twice.' },
              { id: 'q5', question: 'Six pancakes shared equally between 2 kids is…', options: ['2 each', '3 each', '4 each', '6 each'], correctIndex: 1, explanation: '6 ÷ 2 = 3 pancakes each. Fair is fair!', hint: 'Split 6 into 2 equal piles.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy. Real cookbook problem: Grandma’s recipes feed 4, our family is 6. Time to scale.' },
        { text: 'Round 1: fraction operations. Round 2: scaling recipes up and down.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Fraction operations',
            intro: 'Kitchen fractions in action.',
            questions: [
              { id: 'q1', question: '3/4 cup + 1/2 cup = ?', options: ['1 cup', '1 1/4 cups', '4/6 cup', '1 1/2 cups'], correctIndex: 1, explanation: '3/4 + 2/4 = 5/4 = 1 1/4 cups.', hint: 'Make the denominators match first.' },
              { id: 'q2', question: 'Which is the same as 2/4?', options: ['1/2', '1/4', '2/8', '4/2'], correctIndex: 0, explanation: '2/4 simplifies to 1/2 — divide top and bottom by 2.', hint: 'Simplify.' },
              { id: 'q3', question: 'Half of 1/3 cup is…', options: ['1/6 cup', '2/3 cup', '1/5 cup', '2/6 cup… wait that’s 1/3'], correctIndex: 0, explanation: '1/3 × 1/2 = 1/6.', hint: 'Multiply the bottoms.' },
              { id: 'q4', question: 'Which is biggest: 2/3, 3/5, or 7/10?', options: ['2/3', '3/5', '7/10', 'All equal'], correctIndex: 2, explanation: 'As decimals: 0.667, 0.6, 0.7 — so 7/10 wins.', hint: 'Convert to decimals or thirtieths.' },
              { id: 'q5', question: 'The pan holds 2 cups. The batter is 1 2/3 cups. How much room is left?', options: ['1/3 cup', '2/3 cup', '1 cup', 'None'], correctIndex: 0, explanation: '2 − 1 2/3 = 1/3 cup of breathing room.', hint: 'Subtract from 2.' },
            ],
          },
          {
            heading: 'Round 2 · Scale the recipe',
            intro: 'Grandma’s recipe serves 4. We need 6 servings — that’s ×1.5.',
            questions: [
              { id: 'q1', question: '2 cups of flour, scaled ×1.5 = ?', options: ['2.5 cups', '3 cups', '4 cups', '3.5 cups'], correctIndex: 1, explanation: '2 × 1.5 = 3 cups.', hint: 'Half of 2 is 1; add it on.' },
              { id: 'q2', question: '1/2 tsp of salt, scaled ×1.5 = ?', options: ['3/4 tsp', '1 tsp', '2/3 tsp', '1/4 tsp'], correctIndex: 0, explanation: '1/2 × 1.5 = 3/4 tsp.', hint: 'Half plus half-of-half.' },
              { id: 'q3', question: '4 eggs scaled ×1.5 = ?', options: ['5 eggs', '6 eggs', '7 eggs', '4.5 — round to 5'], correctIndex: 1, explanation: '4 × 1.5 = 6 eggs exactly.', hint: '4 + half of 4.' },
              { id: 'q4', question: 'To go from serving 6 back down to serving 2, multiply by…', options: ['1/2', '1/3', '1/4', '3'], correctIndex: 1, explanation: '2 is one third of 6 — scale by 1/3.', hint: '2 out of 6 servings.' },
              { id: 'q5', question: 'Scaled ×1.5, baking time should usually…', options: ['Also multiply by 1.5', 'Stay similar — check with a toothpick', 'Be halved', 'Double'], correctIndex: 1, explanation: 'Bake time depends on thickness more than quantity — same pan depth bakes in similar time. Test it!', hint: 'Does a bigger batch in the same depth pan need 1.5× the time?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. The cookbook’s going to print, and I’m converting Grandma’s imperial recipes to metric AND scaling them. Double math.' },
        { text: 'Round 1: ratio & unit conversion. Round 2: multi-step recipe problems.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Ratios and conversions',
            intro: '1 cup = 250 mL. 1 tbsp = 15 mL. Go.',
            questions: [
              { id: 'q1', question: '2 1/2 cups in millilitres?', options: ['500 mL', '625 mL', '750 mL', '550 mL'], correctIndex: 1, explanation: '2.5 × 250 = 625 mL.', hint: 'Quarter-litre per cup.' },
              { id: 'q2', question: 'A 3:1 flour-to-butter ratio with 90 g of butter needs how much flour?', options: ['30 g', '180 g', '270 g', '300 g'], correctIndex: 2, explanation: '3 × 90 g = 270 g of flour.', hint: 'Three parts flour per part butter.' },
              { id: 'q3', question: '4 tbsp of oil in mL?', options: ['45 mL', '60 mL', '75 mL', '20 mL'], correctIndex: 1, explanation: '4 × 15 = 60 mL.', hint: '15 per tablespoon.' },
              { id: 'q4', question: 'A juice mix uses concentrate:water at 1:4. For 1 L (1000 mL) of juice, how much concentrate?', options: ['100 mL', '200 mL', '250 mL', '400 mL'], correctIndex: 1, explanation: '1:4 = 5 parts total; 1000 ÷ 5 = 200 mL concentrate.', hint: 'How many parts in total?' },
              { id: 'q5', question: '350°F is about how many °C?', options: ['120°C', '175°C', '230°C', '350°C'], correctIndex: 1, explanation: '(350 − 32) × 5/9 ≈ 177°C — ovens round to 175.', hint: 'Subtract 32, then × 5/9.' },
            ],
          },
          {
            heading: 'Round 2 · Multi-step kitchen problems',
            intro: 'Combine scaling, conversion, and logic.',
            questions: [
              { id: 'q1', question: 'Recipe serves 4 with 300 g pasta. We need 10 servings. Pasta needed?', options: ['600 g', '750 g', '900 g', '1200 g'], correctIndex: 1, explanation: '10/4 = 2.5×; 300 × 2.5 = 750 g.', hint: 'Find the scale factor first.' },
              { id: 'q2', question: 'Cookies need 12 min per tray; the oven fits 2 trays at once. Time for 6 trays?', options: ['36 min', '72 min', '24 min', '12 min'], correctIndex: 0, explanation: '6 trays ÷ 2 per bake = 3 bakes × 12 min = 36 min.', hint: 'How many oven rounds?' },
              { id: 'q3', question: 'A 1.5 kg roast needs 40 min/kg plus 20 min resting. Total time?', options: ['60 min', '70 min', '80 min', '95 min'], correctIndex: 2, explanation: '1.5 × 40 = 60 min + 20 min rest = 80 min.', hint: 'Cook time, then add the rest.' },
              { id: 'q4', question: 'Batter fills 2/3 of each muffin cup; the tray has 12 cups of 80 mL. Batter needed?', options: ['640 mL', '720 mL', '800 mL', '960 mL'], correctIndex: 0, explanation: '80 × 2/3 ≈ 53.3 mL per cup × 12 = 640 mL.', hint: 'Per-cup amount × 12.' },
              { id: 'q5', question: 'Dinner at 6:00 pm. Roast: 80 min. Potatoes: 45 min (can overlap). Start the roast at…', options: ['4:40 pm', '4:55 pm', '5:15 pm', '4:00 pm'], correctIndex: 0, explanation: 'Work backwards: 6:00 − 80 min = 4:40 pm. Potatoes go in at 5:15.', hint: 'Subtract the longest task from 6:00.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH6 M2 — Where food comes from · Dada T
 * ============================================================ */

export const CH6_M2_FOOD_GEO: Mission = {
  id: 'act2.ch6.m2.food-geo',
  chapterId: 'act2.ch6',
  lead: 'dada_t',
  subjects: ['geography'],
  skillTags: ['geo.world.basics', 'geo.food.origins'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Dada T! Every dish in our cookbook comes from somewhere. Let’s find out where.' },
        { text: 'Round 1: foods and their home countries. Round 2: where food grows.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Dish detectives',
            intro: 'Match each dish to where it comes from.',
            pairs: [
              { id: 'r1p1', item: { label: 'Pizza', shape: 'small-square' }, slot: { label: 'Italy' } },
              { id: 'r1p2', item: { label: 'Sushi', shape: 'small-square' }, slot: { label: 'Japan' } },
              { id: 'r1p3', item: { label: 'Tacos', shape: 'small-square' }, slot: { label: 'Mexico' } },
              { id: 'r1p4', item: { label: 'Poutine', shape: 'small-square' }, slot: { label: 'Canada (Quebec!)' } },
              { id: 'r1p5', item: { label: 'Butter chicken', shape: 'small-square' }, slot: { label: 'India' } },
            ],
            stuckHint: 'Poutine — fries, gravy, cheese curds — is proudly from Quebec.',
          },
          {
            heading: 'Round 2 · Where food grows',
            intro: 'Match each food to where it comes from.',
            pairs: [
              { id: 'r2p1', item: { label: 'Maple syrup', shape: 'small-square' }, slot: { label: 'Maple trees (Canada!)' } },
              { id: 'r2p2', item: { label: 'Bananas', shape: 'small-square' }, slot: { label: 'Warm tropical places' } },
              { id: 'r2p3', item: { label: 'Wheat for bread', shape: 'huge-wide' }, slot: { label: 'Prairie farms' } },
              { id: 'r2p4', item: { label: 'Salmon', shape: 'long-rect' }, slot: { label: 'Oceans and rivers' } },
              { id: 'r2p5', item: { label: 'Apples', shape: 'small-square' }, slot: { label: 'Orchards' } },
            ],
            stuckHint: 'Canada’s prairies grow LOTS of wheat. Bananas need heat.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Dada T. Our cookbook is secretly a world atlas — every recipe is a pin on the map.' },
        { text: 'Round 1: cuisines and continents. Round 2: why food grows where it does.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Cuisine atlas',
            intro: 'Match each cuisine clue to the right place.',
            pairs: [
              { id: 'r1p1', item: { label: 'Pad thai and green curry', shape: 'small-square' }, slot: { label: 'Thailand (Asia)' } },
              { id: 'r1p2', item: { label: 'Couscous and tagine', shape: 'small-square' }, slot: { label: 'Morocco (Africa)' } },
              { id: 'r1p3', item: { label: 'Pierogi and borscht', shape: 'small-square' }, slot: { label: 'Eastern Europe' } },
              { id: 'r1p4', item: { label: 'Ceviche and empanadas', shape: 'small-square' }, slot: { label: 'South America' } },
              { id: 'r1p5', item: { label: 'Jerk chicken and rice & peas', shape: 'small-square' }, slot: { label: 'Jamaica (Caribbean)' } },
              { id: 'r1p6', item: { label: 'Bannock and Saskatoon-berry jam', shape: 'small-square' }, slot: { label: 'Indigenous Canada' } },
            ],
            stuckHint: 'Tagine pots are North African; pierogi are Polish/Ukrainian comfort food.',
          },
          {
            heading: 'Round 2 · Climate grows the menu',
            intro: 'Match each crop to the climate it needs.',
            pairs: [
              { id: 'r2p1', item: { label: 'Rice paddies', shape: 'huge-wide' }, slot: { label: 'Hot + very wet' } },
              { id: 'r2p2', item: { label: 'Cocoa (chocolate!)', shape: 'small-square' }, slot: { label: 'Tropical rainforest belt' } },
              { id: 'r2p3', item: { label: 'Canadian wheat', shape: 'huge-wide' }, slot: { label: 'Dry-summer prairie' } },
              { id: 'r2p4', item: { label: 'Olives', shape: 'small-square' }, slot: { label: 'Mediterranean (mild, dry summers)' } },
              { id: 'r2p5', item: { label: 'Ice wine grapes', shape: 'small-square' }, slot: { label: 'Niagara — needs a real winter!' } },
            ],
            stuckHint: 'Ice wine is a Canadian specialty — the grapes must FREEZE on the vine.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Dada T. Food geography, advanced: trade routes, staple crops, and how dishes travel and transform.' },
        { text: 'Two rounds. This is my favourite mission so far, can you tell?' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Staples of the world',
            intro: 'Match each staple crop to its heartland.',
            pairs: [
              { id: 'r1p1', item: { label: 'Rice', sublabel: 'feeds the most people', shape: 'small-square' }, slot: { label: 'East & South Asia' } },
              { id: 'r1p2', item: { label: 'Maize (corn)', sublabel: 'first domesticated where?', shape: 'small-square' }, slot: { label: 'Mesoamerica (Mexico)' } },
              { id: 'r1p3', item: { label: 'Potatoes', sublabel: 'original home?', shape: 'small-square' }, slot: { label: 'Andes (Peru/Bolivia)' } },
              { id: 'r1p4', item: { label: 'Teff', sublabel: 'injera flatbread grain', shape: 'small-square' }, slot: { label: 'Ethiopia' } },
              { id: 'r1p5', item: { label: 'Durum wheat', sublabel: 'Canada exports tons for…', shape: 'huge-wide' }, slot: { label: 'Pasta (much grown in Saskatchewan)' } },
              { id: 'r1p6', item: { label: 'Wild rice', sublabel: 'traditionally harvested by canoe', shape: 'long-rect' }, slot: { label: 'Anishinaabe lands (Great Lakes)' } },
            ],
            stuckHint: 'Potatoes and corn are New World crops — Europe only met them after 1492.',
          },
          {
            heading: 'Round 2 · Dishes that travelled',
            intro: 'Food migrates with people. Match the journey.',
            pairs: [
              { id: 'r2p1', item: { label: 'Tomatoes in Italian food', sublabel: 'arrived from…', shape: 'small-square' }, slot: { label: 'The Americas (after 1500)' } },
              { id: 'r2p2', item: { label: 'Tikka masala', sublabel: 'Indian flavours, invented in…', shape: 'small-square' }, slot: { label: 'Britain (immigrant chefs)' } },
              { id: 'r2p3', item: { label: 'Ramen', sublabel: 'Japanese icon with roots in…', shape: 'small-square' }, slot: { label: 'Chinese wheat noodles' } },
              { id: 'r2p4', item: { label: 'California roll', sublabel: 'sushi invented in…', shape: 'small-square' }, slot: { label: 'North America' } },
              { id: 'r2p5', item: { label: 'Hawaiian pizza', sublabel: 'pineapple-on-pizza born in…', shape: 'small-square' }, slot: { label: 'Chatham, Ontario (really!)' } },
            ],
            stuckHint: 'Hawaiian pizza was invented by Sam Panopoulos in Ontario in 1962. Canada strikes again.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ============================================================
 * CH6 M3 — Kitchen science · Caleb
 * ============================================================ */

export const CH6_M3_KITCHEN_SCI: Mission = {
  id: 'act2.ch6.m3.kitchen-sci',
  chapterId: 'act2.ch6',
  lead: 'caleb',
  subjects: ['science'],
  skillTags: ['science.matter.states', 'science.matter.changes'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Caleb! Did you know the kitchen is a science lab? Ice melts! Water boils! Bread RISES!' },
        { text: 'Round 1: solids, liquids, gases. Round 2: kitchen changes.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Solid, liquid, or gas?',
            intro: 'Everything in the kitchen is one of three states.',
            questions: [
              { id: 'q1', question: 'An ice cube is a…', options: ['Solid', 'Liquid', 'Gas', 'Mystery'], correctIndex: 0, explanation: 'Ice is solid water — it holds its shape.', hint: 'Can you stack it?' },
              { id: 'q2', question: 'Milk is a…', options: ['Solid', 'Liquid', 'Gas', 'Both solid and gas'], correctIndex: 1, explanation: 'Liquids flow and take the shape of their container.', hint: 'It pours.' },
              { id: 'q3', question: 'The steam above boiling soup is a…', options: ['Solid', 'Liquid', 'Gas', 'Spice'], correctIndex: 2, explanation: 'Steam is water as a gas — it spreads out to fill space.', hint: 'Can you hold it?' },
              { id: 'q4', question: 'When an ice cube warms up, it…', options: ['Disappears forever', 'Melts into liquid water', 'Turns to stone', 'Gets colder'], correctIndex: 1, explanation: 'Melting: solid → liquid. Same water, new state!', hint: 'What’s in the glass after?' },
              { id: 'q5', question: 'When water boils away, it becomes…', options: ['Nothing', 'Steam (gas)', 'Salt', 'Ice'], correctIndex: 1, explanation: 'Evaporation: liquid → gas. The water is still there — in the air!', hint: 'Watch above the pot.' },
            ],
          },
          {
            heading: 'Round 2 · Kitchen changes',
            intro: 'Some changes can be undone, some can’t!',
            questions: [
              { id: 'q1', question: 'Melted chocolate can be cooled back into solid chocolate. This change is…', options: ['Reversible', 'Forever', 'Magic', 'Impossible'], correctIndex: 0, explanation: 'Melting and freezing are reversible — the chocolate is still chocolate.', hint: 'Can you get it back?' },
              { id: 'q2', question: 'A baked cake can’t turn back into batter. That change is…', options: ['Reversible', 'Not reversible', 'A trick', 'Only on Tuesdays'], correctIndex: 1, explanation: 'Baking changes the ingredients into something new — no going back. (Good thing cake is better than batter!)', hint: 'Can you un-bake it?' },
              { id: 'q3', question: 'Popcorn pops because the water inside the kernel…', options: ['Freezes', 'Turns to steam and bursts out', 'Falls asleep', 'Turns to butter'], correctIndex: 1, explanation: 'Heated water becomes steam, pressure builds, and POP!', hint: 'What does heat do to water?' },
              { id: 'q4', question: 'Stirring sugar into warm water makes it…', options: ['Disappear forever', 'Dissolve — it’s still there, just spread out', 'Turn to ice', 'Bounce'], correctIndex: 1, explanation: 'Dissolving spreads the sugar through the water — taste it and you’ll know it’s still there!', hint: 'Is the water sweet now?' },
              { id: 'q5', question: 'Where do the water drops on a cold glass come from?', options: ['Through the glass', 'Water vapour in the air condensing', 'The glass is crying', 'Underground'], correctIndex: 1, explanation: 'Condensation: gas → liquid. Air’s invisible water vapour turns to drops on the cold surface.', hint: 'The air is full of invisible water.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb. Cooking is chemistry you can eat. Today: states of matter and mixtures, kitchen edition.' },
        { text: 'Round 1: state changes by name. Round 2: mixtures and solutions.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · State changes by name',
            intro: 'Scientists have a word for every change.',
            questions: [
              { id: 'q1', question: 'Solid → liquid is called…', options: ['Freezing', 'Melting', 'Boiling', 'Condensing'], correctIndex: 1, explanation: 'Melting, like butter in a pan.', hint: 'Ice cream in the sun.' },
              { id: 'q2', question: 'Gas → liquid is called…', options: ['Evaporation', 'Sublimation', 'Condensation', 'Melting'], correctIndex: 2, explanation: 'Condensation — fog on the bathroom mirror.', hint: 'The cold-glass effect.' },
              { id: 'q3', question: 'Dry ice goes straight from solid to gas. That’s…', options: ['Melting', 'Sublimation', 'Boiling', 'Dissolving'], correctIndex: 1, explanation: 'Sublimation skips the liquid state entirely.', hint: 'It never gets wet.' },
              { id: 'q4', question: 'Water boils at ____ at sea level.', options: ['0°C', '50°C', '100°C', '212°C'], correctIndex: 2, explanation: '100°C (212°F). At altitude it boils a little cooler.', hint: 'Freezes at 0, boils at…' },
              { id: 'q5', question: 'Salt sprinkled on icy steps works because salt…', options: ['Heats the ice', 'Lowers water’s freezing point', 'Paints the ice', 'Makes ice heavier'], correctIndex: 1, explanation: 'Salt water freezes below 0°C, so the ice melts even though it’s cold out.', hint: 'Why do trucks salt the roads?' },
            ],
          },
          {
            heading: 'Round 2 · Mixtures and solutions',
            intro: 'What’s really in the bowl?',
            questions: [
              { id: 'q1', question: 'Sugar fully stirred into tea makes a…', options: ['Solution', 'Suspension', 'Solid', 'Reaction'], correctIndex: 0, explanation: 'A solution: the sugar dissolves evenly and you can’t see it anymore.', hint: 'Can you see the sugar?' },
              { id: 'q2', question: 'Trail mix (nuts + raisins + chocolate) is a…', options: ['Solution', 'Mixture you can separate by hand', 'Pure substance', 'Gas'], correctIndex: 1, explanation: 'A mechanical mixture — every piece keeps its identity. (Caleb separates out the chocolate.)', hint: 'Can you pick the bits apart?' },
              { id: 'q3', question: 'Oil and vinegar dressing separates into layers because…', options: ['Oil is magic', 'Oil and water-based liquids don’t mix', 'Vinegar is solid', 'It’s broken'], correctIndex: 1, explanation: 'They’re immiscible — shake to mix temporarily, then they settle apart.', hint: 'Why do you shake the bottle?' },
              { id: 'q4', question: 'Hot water dissolves sugar faster than cold because heat makes particles…', options: ['Bigger', 'Move faster', 'Sticky', 'Disappear'], correctIndex: 1, explanation: 'Faster-moving particles bump into the sugar more, breaking it apart sooner.', hint: 'Heat = particle speed.' },
              { id: 'q5', question: 'To get the salt back OUT of salt water, you could…', options: ['Filter it', 'Evaporate the water away', 'Freeze it solid', 'Stir backwards'], correctIndex: 1, explanation: 'Evaporation leaves the dissolved salt behind — how sea salt is made!', hint: 'Filters can’t catch dissolved things.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb (with Mama T checking my work). Kitchen chemistry for real: particle theory, heat transfer, and why baking works.' },
        { text: 'Two rounds of delicious science.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Particle theory in the kitchen',
            intro: 'Everything is particles; cooking is particle management.',
            questions: [
              { id: 'q1', question: 'As water heats from 20°C to 90°C, its particles…', options: ['Shrink', 'Move faster and spread slightly apart', 'Stop moving', 'Multiply'], correctIndex: 1, explanation: 'Temperature IS average particle motion — hotter means faster.', hint: 'Temperature measures motion.' },
              { id: 'q2', question: 'A pot’s metal handle gets hot via…', options: ['Conduction', 'Convection', 'Radiation', 'Condensation'], correctIndex: 0, explanation: 'Conduction: particle-to-particle energy transfer through the solid metal.', hint: 'Touching transfer.' },
              { id: 'q3', question: 'Soup circulating as hot liquid rises and cool sinks is…', options: ['Conduction', 'Convection', 'Radiation', 'Rotation'], correctIndex: 1, explanation: 'Convection currents stir fluids as density changes with temperature.', hint: 'Rising and sinking loops.' },
              { id: 'q4', question: 'A broiler browning the top of a casserole heats mostly by…', options: ['Conduction', 'Convection', 'Radiation', 'Conjugation'], correctIndex: 2, explanation: 'Radiant heat — infrared — travels as waves, no contact needed.', hint: 'Like sunshine, but in the oven.' },
              { id: 'q5', question: 'Why does steam at 100°C burn worse than water at 100°C?', options: ['It’s hotter', 'Condensing steam releases extra (latent) energy', 'It’s sharper', 'It isn’t worse'], correctIndex: 1, explanation: 'Steam dumps its latent heat of vaporization into your skin as it condenses — extra energy beyond its temperature.', hint: 'Energy was stored to turn it into gas; it returns on the way back.' },
            ],
          },
          {
            heading: 'Round 2 · The chemistry of baking',
            intro: 'Bread is applied chemistry.',
            questions: [
              { id: 'q1', question: 'Yeast makes bread rise by producing…', options: ['Oxygen', 'Carbon dioxide', 'Salt', 'Steam only'], correctIndex: 1, explanation: 'Yeast eats sugars and releases CO₂, inflating the dough.', hint: 'Same gas as your exhale.' },
              { id: 'q2', question: 'Baking soda needs an ____ to fizz and lift cakes.', options: ['Acid (like buttermilk)', 'Oil', 'Extra sugar', 'Hour of rest'], correctIndex: 0, explanation: 'Base + acid → CO₂. That’s why recipes pair soda with buttermilk, yogurt, or lemon.', hint: 'Think volcano experiment.' },
              { id: 'q3', question: 'The browning of toast is the ____ reaction.', options: ['Maillard', 'Newton', 'Pasteur', 'Photosynthesis'], correctIndex: 0, explanation: 'The Maillard reaction between sugars and proteins creates hundreds of flavour compounds.', hint: 'Named for a French chemist.' },
              { id: 'q4', question: 'Egg whites going from clear to white when cooked is protein…', options: ['Melting', 'Denaturation', 'Evaporation', 'Fermentation'], correctIndex: 1, explanation: 'Heat unravels (denatures) the proteins, which tangle into an opaque solid — irreversibly.', hint: 'The structure changes for good.' },
              { id: 'q5', question: 'Which is a chemical change (not physical)?', options: ['Ice melting', 'Sugar dissolving', 'Bread baking', 'Water boiling'], correctIndex: 2, explanation: 'Baking creates new substances (crust, CO₂, Maillard compounds). The others just change state or mix.', hint: 'Which one can’t be undone?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};
