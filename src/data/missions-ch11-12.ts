// Act III: Chapter 11 · "Science fair" (Izzy) → backyard observatory
//          Chapter 12 · "The hometown election" (Dada T) → front-porch redesign

import type { Mission } from '../types';
import type { DragMatchMissionParams, QuizMissionParams, MixedMissionParams } from './missions';

/* ============================================================
 * CH11 M1 — The scientific method · Izzy
 * ============================================================ */

export const CH11_M1_METHOD: Mission = {
  id: 'act3.ch11.m1.method',
  chapterId: 'act3.ch11',
  lead: 'izzy',
  subjects: ['science'],
  skillTags: ['science.method', 'science.experiments'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy! The science fair is coming and my project is about plants. Science has STEPS — let’s learn them!' },
        { text: 'Round 1: the steps of science. Round 2: my bean-plant experiment. Round 3: count everything in my lab!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · How scientists work',
            intro: 'Science is asking questions the careful way.',
            questions: [
              { id: 'q1', visual: '🔬🧪', question: 'Science usually starts with…', options: ['A nap', 'A question about the world', 'A trophy', 'An answer'], correctIndex: 1, explanation: 'Everything starts with wondering — like “why do plants bend toward windows?”', hint: 'What makes you say "hmm"?' },
              { id: 'q2', question: 'A guess you can TEST is called a…', options: ['Hypothesis', 'Wish', 'Rumour', 'Joke'], correctIndex: 0, explanation: 'A hypothesis is a testable guess — “I think plants grow toward light.”', hint: 'A fancy word for a careful guess.' },
              { id: 'q3', question: 'To test a guess, scientists do an…', options: ['Argument', 'Experiment', 'Exam', 'Errand'], correctIndex: 1, explanation: 'Experiments are fair tests that check the guess against reality.', hint: 'You set one up and watch what happens.' },
              { id: 'q4', question: 'While the experiment runs, scientists carefully…', options: ['Forget about it', 'Observe and write things down', 'Shake it', 'Hide it'], correctIndex: 1, explanation: 'Observations get recorded — memory is leaky, notebooks aren’t.', hint: 'Why do scientists carry notebooks?' },
              { id: 'q5', question: 'At the end, scientists share their…', options: ['Snacks', 'Results — even surprising ones', 'Secrets', 'Plants'], correctIndex: 1, explanation: 'Sharing results lets others check and build on the work.', hint: 'Science is a team sport.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · The bean-plant test',
            intro: 'My experiment: two identical bean plants. One by the window, one in the closet. Same water.',
            questions: [
              { id: 'q1', visual: '🌱🌱', question: 'My question is: do plants need ____ to grow well?', options: ['Music', 'Light', 'Stories', 'Toys'], correctIndex: 1, explanation: 'The window plant gets light; the closet one doesn’t. That’s the test!', hint: 'What’s different about the closet?' },
              { id: 'q2', question: 'Why do both plants get the SAME amount of water?', options: ['To save water', 'So light is the only difference', 'Plants share', 'No reason'], correctIndex: 1, explanation: 'A fair test changes only ONE thing — otherwise we can’t tell what caused the result.', hint: 'What are we testing — light or water?' },
              { id: 'q3', visual: '🌱🥀', question: 'After 2 weeks: window plant is tall and green; closet plant is pale and droopy. Light…', options: ['Doesn’t matter', 'Matters a lot!', 'Hurts plants', 'Is the same as water'], correctIndex: 1, explanation: 'The only difference was light, and the difference in growth was huge.', hint: 'What was the only difference?' },
              { id: 'q4', question: 'My drawing of both plants each day is my…', options: ['Decoration', 'Observations (data!)', 'Homework', 'Guessing'], correctIndex: 1, explanation: 'Daily drawings + measurements = recorded observations. Real data!', hint: 'It’s the careful record.' },
              { id: 'q5', question: 'A friend asks “are you SURE?” The best scientist answer is…', options: ['“Just trust me”', '“Try it yourself — here’s exactly what I did”', '“No questions allowed”', '“It’s magic”'], correctIndex: 1, explanation: 'Repeatability is the heart of science — anyone can re-run the test.', hint: 'Science loves being double-checked.' },
            ],
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count Izzy’s lab',
            intro: 'A good scientist counts EVERYTHING. Help me check my supplies!',
            items: [
              {
                id: 'c1',
                prompt: 'How many baby bean sprouts popped up in Izzy’s tray?',
                groups: [{ emoji: '🌱', count: 8 }],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Point at each sprout as you count.',
                explanation: 'Eight sprouts — the experiment is ON!',
              },
              {
                id: 'c2',
                prompt: 'Izzy put 4 pots by the window and 3 pots in the closet. How many pots in all?',
                groups: [
                  { emoji: '🪴', count: 4, label: 'By the window' },
                  { emoji: '🪴', count: 3, label: 'In the closet' },
                ],
                answer: 7,
                options: [5, 6, 7, 8],
                hint: 'Count the window pots first, then keep counting the closet pots.',
                explanation: '4 + 3 = 7 pots — a fair test needs both groups!',
              },
              {
                id: 'c3',
                prompt: 'How many magnifying glasses are on the science table?',
                groups: [{ emoji: '🔍', count: 5 }],
                answer: 5,
                options: [3, 4, 5, 6],
                hint: 'Count each one slowly — no peeking twice at the same one!',
                explanation: 'Five magnifying glasses for five curious eyes.',
              },
              {
                id: 'c4',
                prompt: 'Izzy earned 2 star stickers on Monday and 4 on Tuesday. How many stars in her notebook?',
                groups: [
                  { emoji: '⭐', count: 2, label: 'Monday' },
                  { emoji: '⭐', count: 4, label: 'Tuesday' },
                ],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: 'Start at 2, then count up 4 more.',
                explanation: '2 + 4 = 6 shiny stars of science.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy. Science-fair project: “Does music affect plant growth?” Time to design it properly — variables, controls, the works.' },
        { text: 'Round 1: variables and controls. Round 2: judging experiments. Round 3: crunch my real measurements.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Variables & controls',
            intro: 'The vocabulary that makes tests fair.',
            questions: [
              { id: 'q1', visual: '🎵🌱', question: 'The thing I deliberately change (music vs no music) is the…', options: ['Dependent variable', 'Independent variable', 'Control', 'Constant'], correctIndex: 1, explanation: 'The independent variable is what YOU change on purpose.', hint: 'You are independent — you choose it.' },
              { id: 'q2', question: 'The thing I measure (plant height) is the…', options: ['Independent variable', 'Dependent variable', 'Hypothesis', 'Conclusion'], correctIndex: 1, explanation: 'The dependent variable responds — its value depends on what you changed.', hint: 'It depends on the music.' },
              { id: 'q3', question: 'Light, water, soil, and pot size must be…', options: ['Different for each plant', 'Kept the same (controlled)', 'Ignored', 'Maximized'], correctIndex: 1, explanation: 'Controlled variables stay identical so only music varies.', hint: 'The fair-test rule.' },
              { id: 'q4', question: 'The no-music plant group is called the…', options: ['Loser group', 'Control group', 'B-team', 'Variable'], correctIndex: 1, explanation: 'The control group shows what happens with NO treatment — the baseline.', hint: 'What you compare against.' },
              { id: 'q5', question: 'Using 6 plants per group instead of 1 each is better because…', options: ['More pots look nice', 'One odd plant can’t skew the result', 'Plants get lonely', 'It’s not better'], correctIndex: 1, explanation: 'Replication smooths out individual weirdness — one sickly seed shouldn’t decide the science.', hint: 'Remember sample size from the surveys!' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Judge these experiments',
            intro: 'Spot what’s wrong (or right!) in each setup.',
            questions: [
              { id: 'q1', question: 'Owen tests two fertilizers — but plant A is by the window, plant B in the basement. The flaw?', options: ['Too many plants', 'Light differs too — two variables changed at once', 'Fertilizer is boring', 'No flaw'], correctIndex: 1, explanation: 'You can’t tell if fertilizer or light caused any difference. One variable at a time!', hint: 'Count the differences between groups.' },
              { id: 'q2', visual: '🧦⚽', question: 'Caleb concludes “my lucky socks made it rain” after one rainy soccer game. The problem is…', options: ['Wrong socks', 'One event, no test, no mechanism — coincidence isn’t causation', 'It rains too much', 'Socks are waterproof'], correctIndex: 1, explanation: 'A single coincidence proves nothing — he’d need many trials and a reason WHY socks affect clouds.', hint: 'How many times did he test it?' },
              { id: 'q3', question: 'Tessa measures plant height with a ruler each day at 5 pm exactly. This is good because…', options: ['5 pm is lucky', 'Consistent measurement removes sneaky variation', 'Rulers are fancy', 'Plants nap at 5'], correctIndex: 1, explanation: 'Same tool, same time, same method = comparable data points.', hint: 'Consistency is the quiet hero of science.' },
              { id: 'q4', question: 'My results surprised me: music made NO difference. I should…', options: ['Hide the result', 'Report it honestly — null results are real science', 'Change the data', 'Quit'], correctIndex: 1, explanation: '“No effect” is a finding! Honest nulls save everyone from believing pretty myths.', hint: 'What would a real scientist do?' },
              { id: 'q5', question: 'Before I claim “music helps plants,” the result should be…', options: ['Exciting', 'Repeatable by me — and ideally by someone else', 'On a poster', 'Loud'], correctIndex: 1, explanation: 'If it only works once, it wasn’t the music — replication is the test of truth.', hint: 'Once is luck, twice is interesting, many times is science.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Crunch the numbers',
            intro: 'Real measurements from my plant notebook — work each one out and type the answer!',
            items: [
              {
                id: 'w1',
                visual: '🌱📏',
                problem: 'Izzy’s three music-group plants measure 12 cm, 15 cm, and 18 cm. What do their heights add up to?',
                answer: 45,
                unit: 'cm',
                hint: 'Add all three heights together.',
                explanation: '12 + 15 + 18 = 45 cm of plant!',
              },
              {
                id: 'w2',
                visual: '🌱📓',
                problem: 'The tallest plant started at 9 cm and finished at 24 cm. How many centimetres did it grow?',
                answer: 15,
                unit: 'cm',
                hint: 'Finish height minus start height.',
                explanation: '24 − 9 = 15 cm of growth. Go, plant, go!',
              },
              {
                id: 'w3',
                visual: '💧🪴',
                problem: 'Each of Izzy’s 12 plants gets exactly 250 mL of water. How many millilitres does she pour in total?',
                answer: 3000,
                unit: 'mL',
                hint: 'Try 12 × 25 first, then add a zero.',
                explanation: '12 × 250 = 3000 mL — that’s 3 whole litres of watering.',
              },
              {
                id: 'w4',
                visual: '📓🗓️',
                problem: 'Izzy measures every plant once a day for 3 full weeks. How many measurements does she record for ONE plant?',
                answer: 21,
                unit: 'measurements',
                hint: 'How many days are in 3 weeks?',
                explanation: '3 weeks × 7 days = 21 measurements per plant. Consistency!',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. My project made the regional fair! The judges grill you on methodology — error bars, bias, the whole gauntlet. Train me.' },
        { text: 'Round 1: rigour. Round 2: the judges’ questions. Round 3: the data gauntlet.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Rigour',
            intro: 'The difference between a project and SCIENCE.',
            questions: [
              { id: 'q1', question: 'A “blind” measurement (the measurer doesn’t know which group is which) prevents…', options: ['Fun', 'Unconscious bias nudging the readings', 'Plant stress', 'Replication'], correctIndex: 1, explanation: 'Expectation subtly bends judgment — blinding removes the thumb from the scale.', hint: 'Hope can bend a ruler reading half a millimetre.' },
              { id: 'q2', question: 'My two groups differ by 0.4 cm, but daily measurements wobble ±0.5 cm. The difference is…', options: ['Proven', 'Within the noise — can’t conclude an effect', 'Huge', 'Negative'], correctIndex: 1, explanation: 'A signal smaller than the measurement noise isn’t a signal yet — more data or finer tools needed.', hint: 'Compare effect size to wobble size.' },
              { id: 'q3', visual: '🧃🥀', question: 'Outlier: one music-group plant died (Caleb “watered” it with juice). The defensible move is…', options: ['Keep it silently', 'Exclude it AND disclose why', 'Delete the whole group', 'Average it anyway'], correctIndex: 1, explanation: 'Documented, justified exclusions are fine; silent ones are data tampering.', hint: 'Transparency makes the call legitimate.' },
              { id: 'q4', question: 'Plotting each plant’s daily height over 3 weeks calls for a…', options: ['Pie chart', 'Line graph (time series)', 'Single number', 'Pictograph'], correctIndex: 1, explanation: 'Change over time = line graph. (Pie charts are for shares of a whole.)', hint: 'What shows trends best?' },
              { id: 'q5', question: 'My hypothesis was wrong. The project is…', options: ['A failure', 'A success — the method worked and produced a real answer', 'Unusable', 'Embarrassing'], correctIndex: 1, explanation: 'Science succeeds when the QUESTION gets answered honestly — either way.', hint: 'The method is the project.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Face the judges',
            intro: 'Real questions from real science-fair judges.',
            questions: [
              { id: 'q1', question: '“Why six plants per group and not two?”', options: ['Six is lucky', 'Larger samples reduce the chance that individual variation masquerades as an effect', 'The store had six', 'Judges like six'], correctIndex: 1, explanation: 'Replication buys statistical confidence — individual quirks average out.', hint: 'The same answer the surveys taught.' },
              { id: 'q2', question: '“Could anything OTHER than music explain your difference?”', options: ['“No, impossible”', '“I controlled light, water, soil, and position — but I can’t rule out everything; here’s what I’d tighten next”', '“Music is magic”', '“The plants told me”'], correctIndex: 1, explanation: 'Confidence + humility + a next step — the judge’s favourite combination.', hint: 'Strong claims, honest limits.' },
              { id: 'q3', question: '“Your speaker also emits heat. How would you separate music from warmth?”', options: ['Ignore it', 'Add a control with a silent heat source matching the speaker’s warmth', 'Turn the music up', 'Use colder songs'], correctIndex: 1, explanation: 'Isolate the confound: match everything about the speaker except the sound.', hint: 'Build a "fake speaker" condition.' },
              { id: 'q4', question: '“If you repeated this 100 times, what would convince you the effect is real?”', options: ['One great run', 'A consistent effect across the repetitions, larger than the noise', 'Louder music', 'Bigger pots'], correctIndex: 1, explanation: 'Consistency across replications, beating measurement noise — that’s an effect.', hint: 'Signal, repeatedly, above noise.' },
              { id: 'q5', question: '“What’s your next experiment?” The strongest answer shows…', options: ['You’re done forever', 'The result generated NEW testable questions (frequency? volume? plant species?)', 'A bigger poster', 'More glitter'], correctIndex: 1, explanation: 'Science that opens doors beats science that closes them. Judges fund curiosity.', hint: 'Good answers end with better questions.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · The data gauntlet',
            intro: 'Judges love numbers. Compute mine exactly — paper allowed.',
            items: [
              {
                id: 'w1',
                visual: '🌱📏',
                problem: 'Four music-group plants measure 12.5 cm, 14.0 cm, 13.5 cm, and 16.0 cm. What is their mean height?',
                answer: 14,
                tolerance: 0.01,
                unit: 'cm',
                hint: 'Add the four heights, then divide by 4.',
                explanation: '12.5 + 14.0 + 13.5 + 16.0 = 56.0, and 56 ÷ 4 = 14 cm.',
              },
              {
                id: 'w2',
                visual: '🎵🤫',
                problem: 'The music group’s mean is 14.0 cm and the control group’s mean is 13.2 cm. How many centimetres higher is the music group’s mean?',
                answer: 0.8,
                tolerance: 0.01,
                unit: 'cm',
                hint: 'Subtract the control mean from the music mean.',
                explanation: '14.0 − 13.2 = 0.8 cm — tiny! Remember the ±0.5 cm wobble before celebrating.',
              },
              {
                id: 'w3',
                visual: '🌱✅',
                problem: 'Izzy started with 24 plants; 18 survived to the end of the experiment. What percent survived?',
                answer: 75,
                unit: '%',
                hint: 'Part ÷ whole, then × 100.',
                explanation: '18 ÷ 24 = 0.75 → 75% made it. (Caleb’s juice took out one of the rest.)',
              },
              {
                id: 'w4',
                visual: '🌱💰',
                problem: 'Seed packets cost $2.50 each and hold 10 seeds, but only half the seeds sprout. How many dollars does Izzy spend to get 20 sprouted plants?',
                answer: 10,
                unit: 'dollars',
                hint: 'How many seeds does she need for 20 sprouts? Then how many packets?',
                explanation: '20 sprouts needs 40 seeds → 4 packets → 4 × $2.50 = $10.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH11 M2 — Sky watch · Caleb
 * ============================================================ */

export const CH11_M2_SPACE: Mission = {
  id: 'act3.ch11.m2.space',
  chapterId: 'act3.ch11',
  lead: 'caleb',
  subjects: ['science'],
  skillTags: ['science.space', 'science.earth.cycles'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Caleb! The observatory is coming and I’ve been learning about SPACE. Did you know the Sun is a STAR?!' },
        { text: 'Round 1: our sky. Round 2: day, night, and seasons. Round 3: count the night sky!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Things in our sky',
            intro: 'Match each space thing to what it is.',
            pairs: [
              { id: 'r1p1', item: { label: 'The Sun', emoji: '☀️' }, slot: { label: 'Our star — a giant ball of hot gas' } },
              { id: 'r1p2', item: { label: 'The Moon', emoji: '🌙' }, slot: { label: 'Rocky ball circling Earth' } },
              { id: 'r1p3', item: { label: 'Stars at night', emoji: '✨' }, slot: { label: 'Faraway suns' } },
              { id: 'r1p4', item: { label: 'Earth', emoji: '🌎' }, slot: { label: 'Our planet — the one with us on it!' } },
              { id: 'r1p5', item: { label: 'A shooting star', emoji: '💫' }, slot: { label: 'A space rock burning up — not a star!' } },
            ],
            stuckHint: 'Every twinkling night star is a sun — just very, very far away.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Day, night, seasons',
            intro: 'Match each happening to its cause.',
            pairs: [
              { id: 'r2p1', item: { label: 'Day turns to night because…', shape: 'wide-short' }, slot: { label: 'Earth spins' } },
              { id: 'r2p2', item: { label: 'One full spin takes…', shape: 'small-square' }, slot: { label: '24 hours — one day' } },
              { id: 'r2p3', item: { label: 'One trip around the Sun takes…', shape: 'wide-short' }, slot: { label: 'One year' } },
              { id: 'r2p4', item: { label: 'The Moon seems to change shape because…', shape: 'wide-short' }, slot: { label: 'We see different sunlit parts' } },
              { id: 'r2p5', item: { label: 'The Sun "rises" because…', shape: 'wide-short' }, slot: { label: 'Our side of Earth turns toward it' } },
            ],
            stuckHint: 'The Sun never moves for us — WE spin past it!',
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the night sky',
            intro: 'The backyard is dark and the sky is out — count what we can see!',
            items: [
              {
                id: 'c1',
                prompt: 'How many stars can Caleb see over the backyard?',
                groups: [{ emoji: '⭐', count: 9 }],
                answer: 9,
                options: [7, 8, 9, 10],
                hint: 'Point at each star and count slowly.',
                explanation: 'Nine stars! On a really dark night we’d see thousands.',
              },
              {
                id: 'c2',
                prompt: 'Izzy spotted 5 stars and Caleb spotted 3 more. How many stars did they spot together?',
                groups: [
                  { emoji: '⭐', count: 5, label: 'Izzy’s stars' },
                  { emoji: '⭐', count: 3, label: 'Caleb’s stars' },
                ],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Count Izzy’s stars first, then keep going with Caleb’s.',
                explanation: '5 and 3 make 8 stars!',
              },
              {
                id: 'c3',
                prompt: 'Caleb drew every planet in the solar system on his star map. Count them!',
                groups: [{ emoji: '🪐', count: 8 }],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Count each planet once — no skipping!',
                explanation: 'Eight planets — exactly how many circle our real Sun!',
              },
              {
                id: 'c4',
                prompt: 'Toy rockets! Caleb has 2 on his shelf and 4 in the toy box. How many rockets in all?',
                groups: [
                  { emoji: '🚀', count: 2, label: 'On the shelf' },
                  { emoji: '🚀', count: 4, label: 'In the toy box' },
                ],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: 'Start at 2 and count up 4 more.',
                explanation: '2 + 4 = 6 rockets, ready for lift-off!',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb. Observatory countdown! I memorized the solar system and HALF the constellations. Test me. No wait — I test YOU.' },
        { text: 'Round 1: the solar system. Round 2: what we’ll see from the backyard. Round 3: space math!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Solar-system tour',
            intro: 'Match each body to its claim to fame.',
            pairs: [
              { id: 'r1p1', item: { label: 'Mercury', shape: 'small-square' }, slot: { label: 'Closest to the Sun' } },
              { id: 'r1p2', item: { label: 'Venus', shape: 'small-square' }, slot: { label: 'Hottest — thick heat-trapping clouds' } },
              { id: 'r1p3', item: { label: 'Mars', shape: 'small-square' }, slot: { label: 'The red planet — rusty dust!' } },
              { id: 'r1p4', item: { label: 'Jupiter', shape: 'huge-wide' }, slot: { label: 'Biggest — a gas giant with a great red spot' } },
              { id: 'r1p5', item: { label: 'Saturn', shape: 'wide-short' }, slot: { label: 'Famous rings of ice and rock' } },
              { id: 'r1p6', item: { label: 'Neptune', shape: 'small-square' }, slot: { label: 'Farthest planet, fierce winds' } },
            ],
            stuckHint: 'Venus beats Mercury for heat — its atmosphere works like a greenhouse.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Backyard astronomy',
            intro: 'Match each sight to the fact.',
            pairs: [
              { id: 'r2p1', item: { label: 'The Big Dipper', shape: 'wide-short' }, slot: { label: 'Points the way to the North Star' } },
              { id: 'r2p2', item: { label: 'The North Star (Polaris)', emoji: '⭐' }, slot: { label: 'Sits nearly still — true north all night' } },
              { id: 'r2p3', item: { label: 'The Milky Way band', emoji: '🌌' }, slot: { label: 'Our own galaxy, seen edge-on' } },
              { id: 'r2p4', item: { label: 'City light pollution', emoji: '🏙️' }, slot: { label: 'Why Toronto hides faint stars' } },
              { id: 'r2p5', item: { label: 'Northern lights (aurora)', shape: 'huge-wide' }, slot: { label: 'Sun particles hitting our atmosphere' } },
              { id: 'r2p6', item: { label: 'A planet vs a star, by eye', emoji: '🔭' }, slot: { label: 'Planets shine steady; stars twinkle' } },
            ],
            stuckHint: 'Find the Dipper’s outer bowl edge, follow it up — that’s Polaris.',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Space math',
            intro: 'Astronomers calculate EVERYTHING. Your turn — type each answer.',
            items: [
              {
                id: 'w1',
                visual: '☀️➡️🌎',
                problem: 'Sunlight takes about 8 minutes to reach Earth. How many seconds is that?',
                answer: 480,
                unit: 'seconds',
                hint: 'One minute is 60 seconds — multiply.',
                explanation: '8 × 60 = 480 seconds of travel for every sunbeam.',
              },
              {
                id: 'w2',
                visual: '🌙🌎',
                problem: 'The Moon takes about 27 days to circle Earth once. About how many days do 3 full trips take?',
                answer: 81,
                unit: 'days',
                hint: '27 + 27 + 27 — or 3 × 27.',
                explanation: '3 × 27 = 81 days for three laps around Earth.',
              },
              {
                id: 'w3',
                visual: '🔴🗓️',
                problem: 'A year on Mars lasts about 687 Earth days. Earth’s year is 365 days. How many days longer is the Mars year?',
                answer: 322,
                unit: 'days',
                hint: 'Subtract Earth’s year from Mars’s year.',
                explanation: '687 − 365 = 322 extra days — birthdays on Mars are rare!',
              },
              {
                id: 'w4',
                visual: '🔭🌙',
                problem: 'Galileo discovered 4 big moons around Jupiter. Owen watches each one through the telescope for 15 minutes. How many minutes is that in total?',
                answer: 60,
                unit: 'minutes',
                hint: 'Four moons, 15 minutes each.',
                explanation: '4 × 15 = 60 minutes — a full hour of moon-gazing.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb (Tessa says I’m “surprisingly rigorous for a seven-year-old” — I’m EIGHT next month). Real astronomy: scale, light, and gravity.' },
        { text: 'Three rounds. Mind = blown, guaranteed.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Scale and light',
            intro: 'Space is big. Match each mind-bender.',
            pairs: [
              { id: 'r1p1', item: { label: 'A light-year measures…', shape: 'long-rect' }, slot: { label: 'Distance — how far light travels in a year' } },
              { id: 'r1p2', item: { label: 'Sunlight reaching Earth takes…', emoji: '☀️' }, slot: { label: 'About 8 minutes' } },
              { id: 'r1p3', item: { label: 'Looking at distant stars means…', shape: 'wide-short' }, slot: { label: 'Looking back in time' } },
              { id: 'r1p4', item: { label: 'Proxima Centauri (nearest star after the Sun)', shape: 'small-square' }, slot: { label: 'About 4.2 light-years away' } },
              { id: 'r1p5', item: { label: 'Stars twinkle because…', emoji: '✨' }, slot: { label: 'Earth’s moving air bends their light' } },
              { id: 'r1p6', item: { label: 'The Moon causes ocean tides via…', emoji: '🌊' }, slot: { label: 'Gravity pulling the near-side water' } },
            ],
            stuckHint: 'If a star is 100 light-years away, tonight’s view left it 100 years ago.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Observatory engineering',
            intro: 'Building OUR observatory takes science too.',
            pairs: [
              { id: 'r2p1', item: { label: 'Telescopes gather…', shape: 'wide-short' }, slot: { label: 'Light — aperture beats magnification' } },
              { id: 'r2p2', item: { label: 'The dome opens with a slit because…', shape: 'wide-short' }, slot: { label: 'Less wind + stray light than full-open' } },
              { id: 'r2p3', item: { label: 'Best backyard viewing nights', shape: 'small-square' }, slot: { label: 'Clear, dry, moonless, stable air' } },
              { id: 'r2p4', item: { label: 'Red flashlights at night because…', emoji: '🔦' }, slot: { label: 'Red light preserves dark-adapted eyes' } },
              { id: 'r2p5', item: { label: 'Why observatories sit away from cities', shape: 'huge-wide' }, slot: { label: 'Escaping light pollution and heat shimmer' } },
              { id: 'r2p6', item: { label: 'A star map app uses your location + time to…', shape: 'wide-short' }, slot: { label: 'Compute exactly which sky is overhead' } },
            ],
            stuckHint: 'Your eyes take ~20 minutes to fully dark-adapt — one white flash resets them.',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Light-speed math',
            intro: 'Real astronomy runs on arithmetic. Handy fact: light travels about 300,000 km every second.',
            items: [
              {
                id: 'w1',
                visual: '🌙💡',
                problem: 'The Moon is about 384,000 km away. At 300,000 km per second, how many seconds does moonlight take to reach Earth? (Answer to two decimals.)',
                answer: 1.28,
                tolerance: 0.01,
                unit: 'seconds',
                hint: 'Distance ÷ speed. Cancel the thousands: 384 ÷ 300.',
                explanation: '384,000 ÷ 300,000 = 1.28 s — you always see the Moon 1.28 seconds in the past.',
              },
              {
                id: 'w2',
                visual: '☀️🌎',
                problem: 'The Sun is about 150,000,000 km away. At 300,000 km per second, how many seconds does sunlight take to reach us?',
                answer: 500,
                unit: 'seconds',
                hint: 'Cancel the zeros first: 1,500 ÷ 3.',
                explanation: '150,000,000 ÷ 300,000 = 500 s — about 8 minutes 20 seconds. That’s where the “8 minutes” fact comes from!',
              },
              {
                id: 'w3',
                visual: '🚀✨',
                problem: 'Proxima Centauri is about 4.2 light-years away. A probe travelling at one-tenth of light speed covers 1 light-year every 10 years. How many years would the trip take?',
                answer: 42,
                unit: 'years',
                hint: '10 years per light-year, and 4.2 light-years to cover.',
                explanation: '4.2 × 10 = 42 years — pack carefully.',
              },
              {
                id: 'w4',
                visual: '🎒🌙',
                problem: 'Moon gravity is about one-sixth of Earth’s. Tessa’s camping backpack reads 18 kg on the scale at home. What would a Moon scale read?',
                answer: 3,
                unit: 'kg',
                hint: 'One-sixth means divide by 6.',
                explanation: '18 ÷ 6 = 3 kg — same backpack, one-sixth the pull. (Its mass never changed, only its weight!)',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH11 M3 — Reading the results · Mama T
 * ============================================================ */

export const CH11_M3_RESULTS: Mission = {
  id: 'act3.ch11.m3.results',
  chapterId: 'act3.ch11',
  lead: 'mama_t',
  subjects: ['science', 'math'],
  skillTags: ['science.data', 'math.data.interpretation'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Mama T! Science-fair night is here, and the gym is FULL of charts. Let’s read them together.' },
        { text: 'Round 1: reading project charts. Round 2: what do the results mean? Round 3: count the fair!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Read the charts',
            intro: 'Izzy’s plant chart: Window plant: week 1: 4 cm, week 2: 9 cm, week 3: 15 cm. Closet plant: 3, 4, 4 cm.',
            questions: [
              { id: 'q1', question: 'How tall was the window plant at week 3?', options: ['4 cm', '9 cm', '15 cm', '20 cm'], correctIndex: 2, explanation: 'Week 3, window column: 15 cm!', hint: 'Find week 3.' },
              { id: 'q2', question: 'How much did the window plant grow from week 1 to week 3?', options: ['11 cm', '15 cm', '4 cm', '9 cm'], correctIndex: 0, explanation: '15 − 4 = 11 cm of growth.', hint: 'End minus start.' },
              { id: 'q3', question: 'The closet plant from week 2 to 3 grew…', options: ['A lot', 'Not at all', '5 cm', 'Backwards'], correctIndex: 1, explanation: '4 cm to 4 cm — it stopped growing without light.', hint: 'Compare the last two numbers.' },
              { id: 'q4', question: 'Which plant would you call the “winner”?', options: ['Closet plant', 'Window plant', 'Tie', 'Neither'], correctIndex: 1, explanation: 'The window plant grew almost 3 times as tall!', hint: '15 vs 4.' },
              { id: 'q5', question: 'The experiment shows plants really do need…', options: ['Closets', 'Light', 'Luck', 'Music'], correctIndex: 1, explanation: 'Light was the only difference — and what a difference!', hint: 'What did the closet take away?' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Science fair gym walk',
            intro: 'Other kids’ results — what do they mean?',
            questions: [
              { id: 'q1', visual: '🌋', question: 'A volcano project erupted 3 times out of 3 tries. The result is…', options: ['Reliable — it worked every time', 'Random', 'A failure', 'Too messy to count'], correctIndex: 0, explanation: '3 for 3 is wonderfully repeatable (and wonderfully messy).', hint: 'Did it repeat?' },
              { id: 'q2', visual: '✈️', question: 'A paper-plane test: wide wings flew 6 m, narrow wings 4 m. Wide wings flew…', options: ['2 m farther', '4 m farther', 'The same', 'Backwards'], correctIndex: 0, explanation: '6 − 4 = 2 m farther.', hint: 'Subtract.' },
              { id: 'q3', question: 'One kid’s chart has NO labels. The problem is…', options: ['It’s ugly', 'Nobody can tell what the numbers mean', 'Too colourful', 'Too small'], correctIndex: 1, explanation: 'Labels tell us what was measured — without them a chart is just decoration.', hint: 'What is the chart ABOUT?' },
              { id: 'q4', question: '“My hamster runs more at night” was tested by watching… one night. We’d trust it more with…', options: ['Many nights of watching', 'A louder hamster', 'A bigger wheel', 'No changes'], correctIndex: 0, explanation: 'More nights = more data = more trust. One night might be a fluke.', hint: 'Once is a fluke…' },
              { id: 'q5', question: 'The best part of a science fair is…', options: ['Winning only', 'Learning how everyone found things out', 'The snacks', 'Going home'], correctIndex: 1, explanation: 'Okay, the snacks are good too. But the methods are the magic!', hint: 'It’s in the spirit of the whole mission.' },
            ],
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the science fair',
            intro: 'One last walk around the gym — count what you see!',
            items: [
              {
                id: 'c1',
                prompt: 'The judges gave out medals today. How many medals?',
                groups: [{ emoji: '🏅', count: 8 }],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Count each medal one at a time.',
                explanation: 'Eight shiny medals for eight great projects!',
              },
              {
                id: 'c2',
                prompt: 'Izzy’s table has 4 bean plants and Owen’s table has 3. How many plants on the two tables?',
                groups: [
                  { emoji: '🌱', count: 4, label: 'Izzy’s table' },
                  { emoji: '🌱', count: 3, label: 'Owen’s table' },
                ],
                answer: 7,
                options: [5, 6, 7, 8],
                hint: 'Count Izzy’s plants, then keep counting Owen’s.',
                explanation: '4 + 3 = 7 plants in the gym.',
              },
              {
                id: 'c3',
                prompt: 'How many charts are hanging in the poster row?',
                groups: [{ emoji: '📊', count: 5 }],
                answer: 5,
                options: [3, 4, 5, 6],
                hint: 'Touch each chart as you count.',
                explanation: 'Five charts — and every one has labels!',
              },
              {
                id: 'c4',
                prompt: 'The volcano erupted 3 times in the morning show and 3 times in the afternoon. How many eruptions in all?',
                groups: [
                  { emoji: '🌋', count: 3, label: 'Morning show' },
                  { emoji: '🌋', count: 3, label: 'Afternoon show' },
                ],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: '3 and 3 — count them all together.',
                explanation: '3 + 3 = 6 gloriously messy eruptions.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Mama T. Judging day — I volunteered as a parent-judge! Help me score fairly: claims, evidence, and chart quality.' },
        { text: 'Round 1: score the evidence. Round 2: chart quality control. Round 3: recompute the numbers yourself.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Score the evidence',
            intro: 'Four projects, four claims. How strong is each?',
            questions: [
              { id: 'q1', visual: '🧊🧊', question: '“Cold water freezes faster” — tested once, with different freezers. Strength?', options: ['Strong', 'Weak — one trial AND uncontrolled freezers', 'Perfect', 'Medium-strong'], correctIndex: 1, explanation: 'Two flaws stack: no replication, plus a confounding variable (different freezers).', hint: 'Count the problems.' },
              { id: 'q2', question: '“Basil grows better with compost” — 8 plants/group, same light/water, repeated twice. Strength?', options: ['Weak', 'Strong — replicated, controlled, repeated', 'Unfair to basil', 'Unknowable'], correctIndex: 1, explanation: 'Good sample, controls, AND a repeat run. Gold-star methodology.', hint: 'Check the fair-test boxes.' },
              { id: 'q3', question: '“My dog prefers red balls” — the red ball is also the NEWEST. The flaw is called…', options: ['A confound (two things differ at once)', 'A miracle', 'Bias against blue', 'Dog error'], correctIndex: 0, explanation: 'Colour and newness are tangled — can’t credit red until newness is matched.', hint: 'Same trap as the window/basement fertilizer plants.' },
              { id: 'q4', question: 'A project measured ONCE with a stretchy fabric tape. Biggest measurement worry?', options: ['Tape colour', 'Inconsistent tool = unreliable readings', 'Too quick', 'Wrong gym'], correctIndex: 1, explanation: 'A stretchy tape gives different lengths per pull — tool consistency matters.', hint: 'Would a ruler agree with itself?' },
              { id: 'q5', question: 'Two projects got OPPOSITE results on the same question. As a judge I conclude…', options: ['Someone cheated', 'Interesting! Compare their methods to find why', 'Science is broken', 'Flip a coin'], correctIndex: 1, explanation: 'Conflicting results are a doorway: method differences usually explain them.', hint: 'Disagreement is data.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Chart quality control',
            intro: 'The visual half of the score sheet.',
            questions: [
              { id: 'q1', question: 'A bar chart of plant heights MUST have…', options: ['3D effects', 'Labelled axes with units', 'Rainbow bars', 'A mascot'], correctIndex: 1, explanation: 'Axes + units = meaning. Everything else is garnish.', hint: 'What makes numbers readable?' },
              { id: 'q2', question: 'A y-axis starting at 14 cm (not 0) makes a 15-vs-16 cm difference look…', options: ['Honest', 'Twice as tall — visually exaggerated', 'Smaller', 'Invisible'], correctIndex: 1, explanation: 'The truncated axis strikes again (Tessa’s newsletter lesson!).', hint: 'We’ve met this trick twice now.' },
              { id: 'q3', question: 'Growth over 21 days is best shown as a…', options: ['Pie chart', 'Line graph', 'Single bar', 'Table only'], correctIndex: 1, explanation: 'Time on the x-axis, height on the y — trends leap out of line graphs.', hint: 'Change over time.' },
              { id: 'q4', question: 'Error bars on a chart show…', options: ['Mistakes the student made', 'The spread/uncertainty in the measurements', 'Decoration', 'Where to cut'], correctIndex: 1, explanation: 'They visualize variability — overlapping error bars say “difference not proven.”', hint: 'Uncertainty, drawn honestly.' },
              { id: 'q5', question: 'The winning poster shows its ugly data point AND explains it. I score that as…', options: ['Sloppy', 'Integrity — top marks', 'Cheating', 'Confusing'], correctIndex: 1, explanation: 'Showing the wart and explaining it beats hiding it — that’s real science culture.', hint: 'Honesty is a judging criterion.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Check the math',
            intro: 'A good judge recomputes the numbers on every poster. Your turn!',
            items: [
              {
                id: 'w1',
                visual: '✈️📏',
                problem: 'The paper-plane project flew three trials: 6 m, 8 m, and 10 m. What was the average distance?',
                answer: 8,
                unit: 'm',
                hint: 'Add the three distances, then divide by 3.',
                explanation: '6 + 8 + 10 = 24, and 24 ÷ 3 = 8 m.',
              },
              {
                id: 'w2',
                visual: '🌱🏆',
                problem: 'The tallest compost basil plant reached 27 cm; the tallest plain-soil plant reached 22 cm. How many centimetres taller was the compost champion?',
                answer: 5,
                unit: 'cm',
                hint: 'Subtract the smaller height from the bigger one.',
                explanation: '27 − 22 = 5 cm — compost for the win.',
              },
              {
                id: 'w3',
                visual: '🐹🌙',
                problem: 'The hamster project logged 12 laps on night one, 15 on night two, and 18 on night three. How many laps altogether?',
                answer: 45,
                unit: 'laps',
                hint: 'Add all three nights.',
                explanation: '12 + 15 + 18 = 45 laps. That hamster trains harder than Owen.',
              },
              {
                id: 'w4',
                visual: '🏅🧮',
                problem: 'Four judges scored Izzy’s project 8, 9, 7, and 8 out of 10. What was her average score?',
                answer: 8,
                unit: 'points',
                hint: 'Add the four scores, then divide by 4.',
                explanation: '8 + 9 + 7 + 8 = 32, and 32 ÷ 4 = 8 points.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Mama T. Regional finals. The questions get statistical: distributions, significance, and the art of the honest conclusion.' },
        { text: 'Three rounds at full strength — the last one is pure number-crunching.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Statistical reading',
            intro: 'Izzy’s music-plant data: music group mean 14.2 cm (range 11–17), control mean 13.8 cm (range 10–18).',
            questions: [
              { id: 'q1', question: 'The means differ by 0.4 cm, but ranges overlap hugely. Verdict?', options: ['Music wins', 'No clear effect — the difference drowns in variation', 'Control wins', 'Both win'], correctIndex: 1, explanation: 'When group spreads swamp the mean difference, the honest call is “not demonstrated.”', hint: 'Compare 0.4 to the spread.' },
              { id: 'q2', question: 'Adding more plants per group would mainly…', options: ['Change the truth', 'Sharpen the estimate of each group’s true mean', 'Make plants taller', 'Confuse judges'], correctIndex: 1, explanation: 'Bigger n shrinks uncertainty — letting small real effects (if any) emerge from noise.', hint: 'The 1/√n rule again.' },
              { id: 'q3', question: 'A histogram of all 24 plant heights shows two distinct humps. Likely meaning?', options: ['Bad graph', 'Two subgroups hiding in the data (e.g., seed batch A vs B)', 'Plants are random', 'Music works'], correctIndex: 1, explanation: 'Bimodal distributions whisper “your sample has structure” — investigate the batches.', hint: 'Two humps = two populations?' },
              { id: 'q4', question: '“Correlation: plants nearer the window grew taller, r = 0.85.” This r means…', options: ['Strong positive association', 'No association', 'Causation proven', 'Measurement error'], correctIndex: 0, explanation: 'r near 1 = strong positive link. (Causation still needs the controlled test — which is what the closet was for.)', hint: 'Scale runs −1 to +1.' },
              { id: 'q5', question: 'Why report the RANGE alongside the mean?', options: ['Padding', 'The mean alone hides how variable the data is', 'Judges require length', 'It looks scientific'], correctIndex: 1, explanation: 'Mean 14 with range 13–15 and mean 14 with range 4–24 are wildly different stories.', hint: 'Same mean, different worlds.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · The honest conclusion',
            intro: 'Writing the discussion section like a pro.',
            questions: [
              { id: 'q1', question: 'The strongest opening for a conclusion is…', options: ['“This proves…”', '“The data support/do not support the hypothesis because…”', '“As everyone knows…”', '“Probably…”'], correctIndex: 1, explanation: '“Support,” not “prove” — and tie the verdict directly to the data.', hint: 'Science speaks in supports.' },
              { id: 'q2', question: '“Limitations” sections exist because…', options: ['Teachers love misery', 'Every study has boundaries; stating them defines what the result actually means', 'They fill space', 'Rules'], correctIndex: 1, explanation: 'A result without its limits is a result you’ll misuse.', hint: 'Same as Izzy’s survey defence.' },
              { id: 'q3', question: 'Generalizing from bean plants to ALL plants is…', options: ['Fine', 'Overreach — one species tested, one species concluded', 'Required', 'Modest'], correctIndex: 1, explanation: 'Claims stretch only as far as the evidence — different species may differ.', hint: 'Who exactly did you test?' },
              { id: 'q4', question: 'A judge asks something I don’t know. The winning answer is…', options: ['Bluff smoothly', '“I don’t know — but here’s how I’d find out”', 'Change the subject', 'Cite a YouTuber'], correctIndex: 1, explanation: 'Honest ignorance + a method to fix it = the most scientific sentence there is.', hint: 'Method beats memory.' },
              { id: 'q5', question: 'After the fair, Izzy posts data + methods publicly so others can retry it. That practice is called…', options: ['Showing off', 'Open science / reproducibility', 'Oversharing', 'Marketing'], correctIndex: 1, explanation: 'Open methods let anyone verify — the gold standard the whole game has been building toward.', hint: 'Science is a team sport — Round 1, Tier 1, remember?' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Run the statistics',
            intro: 'The judges recompute everything. Beat them to it.',
            items: [
              {
                id: 'w1',
                visual: '🌱🧮',
                problem: 'Five control plants measure 10.5, 12.0, 13.5, 14.0, and 15.0 cm. What is the mean height?',
                answer: 13,
                tolerance: 0.01,
                unit: 'cm',
                hint: 'Add all five heights, then divide by 5.',
                explanation: 'The heights sum to 65.0, and 65 ÷ 5 = 13 cm.',
              },
              {
                id: 'w2',
                visual: '📊↔️',
                problem: 'Those same five plants: 10.5, 12.0, 13.5, 14.0, and 15.0 cm. What is the range of the data?',
                answer: 4.5,
                tolerance: 0.01,
                unit: 'cm',
                hint: 'Range = biggest value − smallest value.',
                explanation: '15.0 − 10.5 = 4.5 cm — always report it beside the mean!',
              },
              {
                id: 'w3',
                visual: '🔮🌱',
                problem: 'Izzy predicted a mean of 15 cm; the actual mean was 12 cm. Her prediction was what percent higher than the actual result?',
                answer: 25,
                unit: '%',
                hint: 'Difference ÷ actual, then × 100.',
                explanation: '(15 − 12) ÷ 12 = 0.25 → 25% too optimistic. Happens to every scientist.',
              },
              {
                id: 'w4',
                visual: '🌱➕',
                problem: 'Four plants average 13.5 cm. A fifth plant measuring 16.0 cm joins the data set. What is the new mean of all five?',
                answer: 14,
                tolerance: 0.01,
                unit: 'cm',
                hint: 'Four plants at mean 13.5 total 54 cm. Add the fifth, then divide by 5.',
                explanation: '4 × 13.5 = 54, plus 16 makes 70, and 70 ÷ 5 = 14 cm.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH12 M1 — How elections work · Dada T
 * ============================================================ */

export const CH12_M1_ELECTIONS: Mission = {
  id: 'act3.ch12.m1.elections',
  chapterId: 'act3.ch12',
  lead: 'dada_t',
  subjects: ['social-studies'],
  skillTags: ['civics.elections', 'civics.government'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Dada T! Our town is having an election, and there are signs on EVERY lawn (ours has a flag instead).' },
        { text: 'Round 1: what’s an election? Round 2: who does what in our town. Round 3: count the votes!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · What’s an election?',
            intro: 'How communities choose together.',
            questions: [
              { id: 'q1', question: 'In an election, people choose their leaders by…', options: ['Racing', 'Voting', 'Drawing straws', 'Arm wrestling'], correctIndex: 1, explanation: 'Each person gets a vote, and votes are counted fairly.', hint: 'It happens at a ballot box.' },
              { id: 'q2', question: 'A person hoping to be elected is called a…', options: ['Candidate', 'Champion', 'Captain', 'Contestant'], correctIndex: 0, explanation: 'Candidates ask for your vote and explain their plans.', hint: 'Starts with C, ends with -didate.' },
              { id: 'q3', visual: '🗳️', question: 'Votes are secret so that…', options: ['It’s more mysterious', 'Everyone can choose freely without pressure', 'Counting is harder', 'Paper is saved'], correctIndex: 1, explanation: 'The secret ballot protects your free choice — nobody can bully your vote.', hint: 'Why might someone want privacy?' },
              { id: 'q4', visual: '🏙️', question: 'The leader of a city or town is called the…', options: ['Mayor', 'Principal', 'Captain', 'Premier'], correctIndex: 0, explanation: 'The mayor leads the city — our town is electing one right now!', hint: 'It rhymes with "player".' },
              { id: 'q5', question: 'Whoever gets the most votes…', options: ['Tries again', 'Wins the election', 'Splits the job', 'Picks a friend'], correctIndex: 1, explanation: 'Most votes wins — and the losers congratulate the winner. That part matters too!', hint: 'Like goals in hockey.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Who does what?',
            intro: 'Different leaders for different jobs.',
            questions: [
              { id: 'q1', question: 'Fixing our town’s playgrounds and parks is a job for…', options: ['The city (municipal) government', 'The king', 'The school principal', 'Astronauts'], correctIndex: 0, explanation: 'Cities handle local things: parks, roads, libraries, garbage trucks.', hint: 'Whose trucks empty the bins?' },
              { id: 'q2', visual: '🍁', question: 'Canada’s national leader is called the…', options: ['Prime Minister', 'President', 'Principal Minister', 'Grand Mayor'], correctIndex: 0, explanation: 'The Prime Minister leads Canada’s federal government — we saw their workplace in Ottawa!', hint: 'We visited their workplace on a trip.' },
              { id: 'q3', question: 'Schools and hospitals in Ontario are mostly run by…', options: ['The city', 'The province of Ontario', 'The post office', 'The NHL'], correctIndex: 1, explanation: 'Provinces handle schools and health care — that’s the middle level.', hint: 'Between city and country.' },
              { id: 'q4', question: 'How many levels of government does Canada have?', options: ['One', 'Two', 'Three', 'Ten'], correctIndex: 2, explanation: 'Municipal (city), provincial, and federal — three layers, three jobs.', hint: 'City, province, …' },
              { id: 'q5', question: 'Kids can’t vote yet, but they CAN…', options: ['Nothing at all', 'Learn the issues, ask questions, and speak up', 'Vote secretly', 'Move away'], correctIndex: 1, explanation: 'Informed kids become voting adults — and politicians do listen to young voices.', hint: 'What are we doing right now?' },
            ],
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the votes!',
            intro: 'Our class held a pretend election for snack of the week. You’re the official vote counter!',
            items: [
              {
                id: 'c1',
                prompt: 'How many ballots went into the ballot box?',
                groups: [{ emoji: '🗳️', count: 7 }],
                answer: 7,
                options: [5, 6, 7, 8],
                hint: 'Count each ballot box one at a time.',
                explanation: 'Seven ballots — every vote gets counted!',
              },
              {
                id: 'c2',
                prompt: 'Apples got 5 votes and bananas got 3. How many kids voted in all?',
                groups: [
                  { emoji: '🍎', count: 5, label: 'Votes for apples' },
                  { emoji: '🍌', count: 3, label: 'Votes for bananas' },
                ],
                answer: 8,
                options: [6, 7, 8, 9],
                hint: 'Count the apple votes, then keep counting the banana votes.',
                explanation: '5 + 3 = 8 voters. Democracy is delicious.',
              },
              {
                id: 'c3',
                prompt: 'Look again: how many MORE votes did apples get than bananas?',
                groups: [
                  { emoji: '🍎', count: 5, label: 'Votes for apples' },
                  { emoji: '🍌', count: 3, label: 'Votes for bananas' },
                ],
                answer: 2,
                options: [1, 2, 3, 4],
                hint: 'Pair each banana vote with an apple vote — how many apples are left over?',
                explanation: '5 − 3 = 2. Apples win by 2 votes!',
              },
              {
                id: 'c4',
                prompt: 'Lawn signs! Caleb counted 4 on Maple Street and 2 on Oak Street. How many signs did he count?',
                groups: [
                  { emoji: '🪧', count: 4, label: 'Maple Street' },
                  { emoji: '🪧', count: 2, label: 'Oak Street' },
                ],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: 'Start at 4 and count up 2 more.',
                explanation: '4 + 2 = 6 signs — election season is here.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Dada T. Election season! Tonight is the all-candidates debate at the community centre, and we’re going as a family.' },
        { text: 'Round 1: how Canadian elections actually work. Round 2: judging the candidates fairly. Round 3: the vote math.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · The machinery',
            intro: 'Ridings, ballots, and majorities.',
            questions: [
              { id: 'q1', question: 'In federal elections, Canada is divided into ~340 areas, each electing one MP. These areas are called…', options: ['Ridings (constituencies)', 'Provinces', 'Counties', 'Zones'], correctIndex: 0, explanation: 'Each riding sends one Member of Parliament to Ottawa.', hint: 'A uniquely Canadian word.' },
              { id: 'q2', question: 'Canada’s “first past the post” system means a candidate wins by…', options: ['Getting over 50% always', 'Getting more votes than any other candidate', 'Party choice', 'Coin toss'], correctIndex: 1, explanation: 'The most votes wins — even 34% can win if others split the rest.', hint: 'Most, not majority.' },
              { id: 'q3', question: 'The party with the most MPs usually forms the government, and its leader becomes…', options: ['Mayor', 'Prime Minister', 'Governor General', 'Senator'], correctIndex: 1, explanation: 'We elect MPs; the PM role follows from commanding the House’s confidence.', hint: 'We don’t directly elect the PM!' },
              { id: 'q4', question: 'A “minority government” means…', options: ['The government is small', 'The governing party has under half the seats and needs others’ support', 'Kids govern', 'No government'], correctIndex: 1, explanation: 'Minority parliaments must cooperate across parties to pass anything.', hint: 'Less than half the seats.' },
              { id: 'q5', question: 'Municipal elections (like our mayor’s race) usually feature…', options: ['Political parties only', 'Independent candidates without federal party labels', 'Appointed winners', 'No campaigning'], correctIndex: 1, explanation: 'In most Ontario cities, candidates run as themselves — no party banners.', hint: 'Check the lawn signs: any party logos?' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Judge the debate',
            intro: 'Tonight, three candidates make their cases.',
            questions: [
              { id: 'q1', question: 'Candidate A promises “better roads, lower taxes, more parks — all at once, no trade-offs.” A sharp listener asks…', options: ['Nothing — sounds great', '“What gets cut, or where does the money come from?”', '“Can you talk louder?”', '“What’s your slogan?”'], correctIndex: 1, explanation: 'Budgets are trade-offs. Promises without costs are wishes.', hint: 'Izzy’s opportunity-cost lesson applies to towns.' },
              { id: 'q2', question: 'Candidate B answers a hard question with an attack on Candidate A’s haircut. That’s…', options: ['A strong rebuttal', 'An ad hominem — attacking the person, not the argument', 'Debate rules', 'Funny so it counts'], correctIndex: 1, explanation: 'Attacking the person dodges the issue — and tells you something about the dodge.', hint: 'What question got avoided?' },
              { id: 'q3', question: 'Candidate C cites the city budget by page number when explaining her plan. That signals…', options: ['Showing off', 'She’s done the homework — claims you can verify', 'Nothing', 'Too much detail'], correctIndex: 1, explanation: 'Verifiable specifics beat vibes — you can actually check page 47.', hint: 'Tessa’s verification lesson, civic edition.' },
              { id: 'q4', question: 'A flyer says “Candidate A will close every park!” but cites nothing. Before believing it…', options: ['Share it widely', 'Check the claim against the candidate’s actual platform', 'Believe it if you dislike A', 'Burn it'], correctIndex: 1, explanation: 'Campaign claims about opponents are exactly where verification matters most.', hint: 'SIFT: Stop first.' },
              { id: 'q5', question: 'After the debate, the family disagrees about who won. That’s…', options: ['A problem to fix tonight', 'Healthy — different priorities weigh the same facts differently', 'Proof someone is wrong', 'Reason to stop talking'], correctIndex: 1, explanation: 'Values differ even when facts are shared — democratic disagreement done right.', hint: 'Fact vs value claims, from Owen’s mission.' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · The vote math',
            intro: 'Election night! The mayor’s race results are in — you do the counting.',
            items: [
              {
                id: 'w1',
                visual: '🗳️🧮',
                problem: 'Mayor’s race: Chen got 412 votes, Okafor 358, and Singh 230. How many votes were cast in total?',
                answer: 1000,
                unit: 'votes',
                hint: 'Add all three candidates’ totals.',
                explanation: '412 + 358 + 230 = 1000 votes exactly.',
              },
              {
                id: 'w2',
                visual: '🥇🥈',
                problem: 'How many more votes did Chen (412) get than Okafor (358)?',
                answer: 54,
                unit: 'votes',
                hint: 'Subtract Okafor’s total from Chen’s.',
                explanation: '412 − 358 = 54 — a close race!',
              },
              {
                id: 'w3',
                visual: '🗳️➗',
                problem: 'A majority means MORE than half. With 1000 votes cast, what is the smallest number of votes that counts as a majority?',
                answer: 501,
                unit: 'votes',
                hint: 'Half of 1000 is 500 — a majority must beat that.',
                explanation: '501 votes. Chen’s 412 wins first-past-the-post, but it is NOT a majority.',
              },
              {
                id: 'w4',
                visual: '🤝🧾',
                problem: 'After the polls close, 8 volunteers each count 125 ballots. How many ballots do they count altogether?',
                answer: 1000,
                unit: 'ballots',
                hint: '8 × 125 — think 8 × 100 plus 8 × 25.',
                explanation: '8 × 125 = 1000 ballots — every single vote, counted by hand.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Dada T. The big picture: how Canada’s democracy fits together — and how it compares to our neighbours’. (London trip foreshadowing, anyone?)' },
        { text: 'Round 1: Canada’s system in depth. Round 2: comparing democracies. Round 3: turnout and seat math.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Canada’s system in depth',
            intro: 'Constitutional machinery.',
            questions: [
              { id: 'q1', question: 'Canada is a “constitutional monarchy,” meaning…', options: ['The monarch rules directly', 'A monarch is head of state, but elected officials govern under a constitution', 'There’s no monarch', 'The constitution is royal'], correctIndex: 1, explanation: 'The Crown is ceremonial head of state; real power flows through elected Parliament under constitutional rules.', hint: 'Two roles: head of state vs head of government.' },
              { id: 'q2', question: 'The Governor General’s role is mainly to…', options: ['Run the army personally', 'Represent the Crown — ceremonial duties plus rare constitutional safeguards', 'Lead a party', 'Judge court cases'], correctIndex: 1, explanation: 'Royal assent, summoning Parliament — formal duties, with deep reserve powers almost never used.', hint: 'Ceremony with a constitutional parachute.' },
              { id: 'q3', question: 'Canada’s Senate differs from the House of Commons because senators are…', options: ['Elected every 4 years', 'Appointed, serving until 75', 'Chosen by lottery', 'All former MPs'], correctIndex: 1, explanation: 'The appointed Senate reviews legislation — “sober second thought,” with recurring reform debates.', hint: 'One chamber elected, one not.' },
              { id: 'q4', question: 'The Charter of Rights and Freedoms (1982) matters because…', options: ['It lists holidays', 'Courts can strike down laws that violate protected rights', 'It set tax rates', 'It created hockey'], correctIndex: 1, explanation: 'The Charter put rights above ordinary law — a transformation of Canadian governance.', hint: 'What can courts do with an unconstitutional law?' },
              { id: 'q5', question: '“Responsible government” means the PM and cabinet must…', options: ['Behave nicely', 'Keep the confidence of the elected House or resign/call elections', 'Answer letters', 'Balance budgets always'], correctIndex: 1, explanation: 'Lose a confidence vote, lose the government — the elected House holds the leash.', hint: 'Confidence is the key word.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Comparing democracies',
            intro: 'Canada, the US, and the UK run democracy differently.',
            questions: [
              { id: 'q1', question: 'The US president is elected separately from Congress. Canada’s PM, by contrast…', options: ['Is elected separately too', 'Sits IN Parliament and leads because their party commands it', 'Is appointed by judges', 'Is chosen by provinces'], correctIndex: 1, explanation: 'Parliamentary fusion vs presidential separation — the deepest structural difference.', hint: 'Where does each leader sit?' },
              { id: 'q2', question: 'Canada and the UK share which feature?', options: ['Elected senates', 'Parliamentary systems under a constitutional monarch', 'Presidents', 'Identical constitutions'], correctIndex: 1, explanation: 'Westminster cousins — same parliamentary DNA, which is why the London trip will feel familiar.', hint: 'The Westminster family.' },
              { id: 'q3', question: 'A US-style “checks and balances” design aims to…', options: ['Speed laws up', 'Make branches limit each other’s power', 'Eliminate courts', 'Empower one branch'], correctIndex: 1, explanation: 'President, Congress, courts each check the others — gridlock is partly by design.', hint: 'Brakes built into the machine.' },
              { id: 'q4', question: 'Proportional representation (used in places like Germany/NZ) differs from our system by…', options: ['Counting faster', 'Matching seat shares to vote shares', 'Banning parties', 'Using ridings only'], correctIndex: 1, explanation: '30% of votes ≈ 30% of seats under PR; FPTP can diverge sharply — a live Canadian reform debate.', hint: 'Seats ∝ votes.' },
              { id: 'q5', question: 'The deepest thing all three democracies share is…', options: ['A monarch', 'Peaceful transfer of power through accepted election results', 'One language', 'Identical courts'], correctIndex: 1, explanation: 'Losers conceding and power transferring peacefully — the habit that makes everything else possible.', hint: 'What happens the morning after the vote?' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Turnout and seat math',
            intro: 'Election analysts do exactly these calculations on results night. Your turn.',
            items: [
              {
                id: 'w1',
                visual: '🗳️📊',
                problem: 'In our riding, 12,000 of the 20,000 eligible voters cast ballots. What was the turnout percentage?',
                answer: 60,
                unit: '%',
                hint: 'Voters ÷ eligible, then × 100.',
                explanation: '12,000 ÷ 20,000 = 0.6 → 60% turnout.',
              },
              {
                id: 'w2',
                visual: '🏆🧮',
                problem: 'A candidate won a riding with 8,400 of the 24,000 votes cast. What percent of the vote did the winner get?',
                answer: 35,
                unit: '%',
                hint: '8,400 ÷ 24,000, then × 100.',
                explanation: '35% — under first-past-the-post you can win while 65% voted for someone else.',
              },
              {
                id: 'w3',
                visual: '🪑📉',
                problem: 'A party won 39% of the votes but 54% of the seats. How many percentage points higher is its seat share than its vote share?',
                answer: 15,
                unit: 'points',
                hint: 'Subtract the vote share from the seat share.',
                explanation: '54 − 39 = 15 points of seat–vote distortion — the heart of the proportional-representation debate.',
              },
              {
                id: 'w4',
                visual: '🌧️🗳️',
                problem: 'Rainy election day: a riding has 45,000 eligible voters and turnout lands at 62%. How many people voted?',
                answer: 27900,
                unit: 'voters',
                hint: '62% = 0.62 — multiply by the eligible voters.',
                explanation: '45,000 × 0.62 = 27,900 voters braved the rain.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
  },
};

/* ============================================================
 * CH12 M2 — Make your case · Tessa
 * ============================================================ */

export const CH12_M2_PERSUASION: Mission = {
  id: 'act3.ch12.m2.persuasion',
  chapterId: 'act3.ch12',
  lead: 'tessa',
  subjects: ['reading'],
  skillTags: ['reading.persuasion', 'reading.argument'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa! The kids’ council at school is voting on the new playground. I’m teaching everyone to make their case the FAIR way.' },
        { text: 'Round 1: good reasons vs not-reasons. Round 2: kind and convincing. Round 3: count the council votes!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Good reasons',
            intro: 'Some reasons help your case. Some don’t!',
            questions: [
              { id: 'q1', visual: '🛝', question: 'Which is the STRONGEST reason for more swings?', options: ['“Swings are awesome!!”', '“Kids line up 10-deep at recess — we counted”', '“Because I want them”', '“Slides are dumb”'], correctIndex: 1, explanation: 'Counting the line is evidence anyone can check!', hint: 'Which one has a number?' },
              { id: 'q2', question: '“Everyone who disagrees is a baby” is…', options: ['A great argument', 'Not a reason — it’s just mean', 'Evidence', 'A fact'], correctIndex: 1, explanation: 'Name-calling persuades no one and skips the actual question.', hint: 'Does it say anything about swings?' },
              { id: 'q3', question: 'Asking “what do YOU think?” in a debate shows…', options: ['Weakness', 'You listen — and listeners persuade better', 'You’re lost', 'You give up'], correctIndex: 1, explanation: 'Understanding the other side makes YOUR case stronger (and friendlier).', hint: 'Would you listen to someone who never listens?' },
              { id: 'q4', question: '“We should test it for one month and count who uses it” is good because…', options: ['It delays forever', 'It suggests a fair way to find out', 'Tests are fun', 'Months are long'], correctIndex: 1, explanation: 'Proposing an experiment beats endless arguing — very Izzy of them.', hint: 'It sounds like the science fair!' },
              { id: 'q5', question: 'If the vote doesn’t go your way, a good council member…', options: ['Storms out', 'Accepts it and helps make the chosen plan great', 'Votes again secretly', 'Hides the swings'], correctIndex: 1, explanation: 'Losing well is part of deciding together — and there’s always next vote.', hint: 'Same lesson as the election mission!' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Kind and convincing',
            intro: 'Pick the better way to say it.',
            questions: [
              { id: 'q1', question: 'Better opening:', options: ['“Listen up, wrong people!”', '“I think swings would help — here’s what I noticed at recess.”', '“Whatever, vote swings.”', '“My dad says so.”'], correctIndex: 1, explanation: 'Respectful + specific = people actually listen.', hint: 'Which one would YOU keep listening to?' },
              { id: 'q2', visual: '🧗', question: 'Your friend wants a climbing wall instead. Best response:', options: ['“Walls are boring”', '“What do you like about it? Maybe we can fit both ideas”', '“You always pick wrong”', 'Silence forever'], correctIndex: 1, explanation: 'Curiosity finds compromises that arguments never do.', hint: 'Build, don’t bulldoze.' },
              { id: 'q3', question: '“I might be wrong, but the line-up count says…” works because…', options: ['It sounds unsure', 'Humility + evidence is a powerful combo', 'It’s long', 'It tricks people'], correctIndex: 1, explanation: 'People trust speakers who leave room for being wrong AND bring receipts.', hint: 'Strong AND gentle.' },
              { id: 'q4', question: 'The council should hear from kindergarteners too because…', options: ['They’re loud', 'They use the playground most and know what little kids need', 'Rules say so', 'They won’t care'], correctIndex: 1, explanation: 'The people affected most deserve a voice — that’s fairness in action.', hint: 'Who swings the most?' },
              { id: 'q5', question: 'The BEST goal of a class debate is…', options: ['Winning at all costs', 'Finding the best answer together', 'Talking longest', 'Sounding fancy'], correctIndex: 1, explanation: 'Debate done right is teamwork wearing a competitive hat.', hint: 'What’s the playground FOR, after all?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. I’m coaching the debate club AND writing op-eds about the election. Today: the architecture of an argument.' },
        { text: 'Round 1: build the argument. Round 2: spot the fallacies.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Build the argument',
            intro: 'Claim → reasons → evidence → counter-argument → conclusion.',
            questions: [
              { id: 'q1', visual: '🚲', question: 'A clear CLAIM sounds like…', options: ['“Bike lanes, am I right?”', '“Our town should add bike lanes on Main Street”', '“Bikes exist”', '“Some people bike”'], correctIndex: 1, explanation: 'Specific and arguable — you know exactly what’s being proposed.', hint: 'Could someone disagree with it? Then it’s a claim.' },
              { id: 'q2', question: 'The best EVIDENCE for that claim is…', options: ['“Bikes are cool”', '“Three nearby towns saw 40% more cycling and fewer accidents after adding lanes”', '“My friend bikes”', '“Cars are old news”'], correctIndex: 1, explanation: 'Comparable cases with numbers — checkable and relevant.', hint: 'Numbers + checkability.' },
              { id: 'q3', question: 'Addressing the strongest OPPOSING point (“lanes remove parking”) makes your case…', options: ['Weaker', 'Stronger — you show you’ve weighed the trade-off', 'Confusing', 'Longer only'], correctIndex: 1, explanation: 'Steel-manning the other side earns trust; dodging it loses the room.', hint: 'Face it before they raise it.' },
              { id: 'q4', question: '“Studies show…” without naming any study is…', options: ['Fine', 'An empty appeal — name the study or drop the claim', 'Stylish', 'Required'], correctIndex: 1, explanation: 'Same rule as the news missions: verifiable or it doesn’t count.', hint: 'WHICH studies?' },
              { id: 'q5', question: 'The conclusion of a good op-ed should…', options: ['Introduce 3 new topics', 'Restate the claim and tell readers what to DO', 'Apologize', 'Trail off'], correctIndex: 1, explanation: 'Land the plane: claim, case, call to action.', hint: 'End where you aimed.' },
            ],
          },
          {
            heading: 'Round 2 · Spot the fallacy',
            intro: 'Name the broken logic.',
            questions: [
              { id: 'q1', question: '“My opponent wants SOME budget cuts, so he must want to close every school!”', options: ['Straw man — exaggerating the position to attack it', 'Good logic', 'Evidence', 'A claim of fact'], correctIndex: 0, explanation: 'Inflating a position into a monster and fighting the monster — classic straw man.', hint: 'Is that what the opponent actually said?' },
              { id: 'q2', question: '“Everyone’s voting for her, so she must be right.”', options: ['Bandwagon appeal', 'Solid reasoning', 'A statistic', 'Honesty'], correctIndex: 0, explanation: 'Popularity isn’t proof — majorities have been wrong before.', hint: 'If everyone jumped off a bridge…' },
              { id: 'q3', visual: '🏟️', question: '“Either we build my arena or this town DIES.”', options: ['False dilemma — only two options presented when many exist', 'Fair framing', 'A budget', 'A compromise'], correctIndex: 0, explanation: 'Real choices usually have more than two doors.', hint: 'Count the options offered vs the options that exist.' },
              { id: 'q4', question: '“She can’t talk about potholes — she drives an old car!”', options: ['Ad hominem — attacking the person, not the point', 'Relevant fact', 'Evidence', 'Rebuttal'], correctIndex: 0, explanation: 'Her car has nothing to do with whether the pothole plan works.', hint: 'The debate-night lesson returns.' },
              { id: 'q5', question: '“We’ve always done it this way” argues from…', options: ['Tradition — which isn’t evidence it’s BEST', 'Data', 'Experiment', 'Consensus'], correctIndex: 0, explanation: 'Age proves only age. Maybe it’s wise, maybe it’s rust — check it like any claim.', hint: '“Always” isn’t a reason; it’s a habit.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. Final unit: rhetoric — the deep art. Ethos, pathos, logos, and the responsibility that comes with being persuasive.' },
        { text: 'Two rounds. Use these powers for good.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The rhetorical toolkit',
            intro: 'Aristotle’s three appeals, alive at a town debate.',
            questions: [
              { id: 'q1', visual: '🧑‍⚕️', question: '“As a nurse of 20 years, I’ve seen what clinic cuts do.” This appeal is…', options: ['Ethos — credibility of the speaker', 'Pathos', 'Logos', 'Bandwagon'], correctIndex: 0, explanation: 'Ethos: trust me because of who I am and what I’ve done.', hint: 'The speaker’s standing.' },
              { id: 'q2', visual: '👵🕰️', question: '“Imagine your grandmother waiting alone for four hours.” This is…', options: ['Logos', 'Pathos — appeal to emotion', 'Ethos', 'A statistic'], correctIndex: 1, explanation: 'Pathos moves hearts. Powerful — and needing facts beside it.', hint: 'How does it make you FEEL?' },
              { id: 'q3', question: '“Wait times rose 22% after the last cut; here’s the data table.” This is…', options: ['Pathos', 'Ethos', 'Logos — appeal to logic and evidence', 'A slogan'], correctIndex: 2, explanation: 'Logos: the argument’s skeleton of facts and reasoning.', hint: 'Numbers and logic.' },
              { id: 'q4', question: 'The most trustworthy persuasion usually…', options: ['Uses pathos only', 'Blends all three with logos at the core', 'Avoids emotion entirely', 'Maximizes volume'], correctIndex: 1, explanation: 'Emotion opens ears; credibility earns a hearing; evidence deserves the verdict.', hint: 'A braid, not a single strand.' },
              { id: 'q5', question: 'Pathos WITHOUT logos becomes dangerous because…', options: ['Feelings are bad', 'Strong emotion can carry false claims past our defences', 'It’s boring', 'It’s illegal'], correctIndex: 1, explanation: 'The misinformation playbook is pathos with no logos — outrage travels faster than checking.', hint: 'Connect this to the media-literacy mission.' },
            ],
          },
          {
            heading: 'Round 2 · Persuasion with a conscience',
            intro: 'The ethics final.',
            questions: [
              { id: 'q1', question: 'You find a TRUE statistic that misleads without context (the “wins doubled, 1 to 2” trick). Using it in your op-ed is…', options: ['Fine — it’s true', 'Misleading — truth arranged to deceive is still deception', 'Mandatory', 'Funny'], correctIndex: 1, explanation: 'Honest persuasion includes the context that lets readers judge fairly.', hint: 'Technically-true ≠ honest.' },
              { id: 'q2', question: 'Your strongest argument relies on a study you haven’t actually read. You should…', options: ['Use it — sounds right', 'Read it first (it might not say what the headline claims)', 'Cite it twice', 'Paraphrase the headline'], correctIndex: 1, explanation: 'Headlines mangle studies routinely. Your name goes on the claim.', hint: 'Lateral reading, applied to yourself.' },
              { id: 'q3', question: 'Mid-debate, you realize your opponent’s point is… actually right. The strong move is…', options: ['Deny harder', 'Concede it and adjust — credibility compounds', 'Change topic fast', 'Call for a break'], correctIndex: 1, explanation: 'Public updating is rare and unforgettable — audiences trust those who can lose a point gracefully.', hint: 'What would you respect?' },
              { id: 'q4', question: 'Writing persuasion for people who can’t easily verify (kids, busy readers) increases your…', options: ['Freedom', 'Responsibility for accuracy', 'Word count', 'Fun'], correctIndex: 1, explanation: 'The less your audience can check, the more your conscience must.', hint: 'Power and responsibility — you know the quote.' },
              { id: 'q5', question: 'The end goal of teaching rhetoric to a whole town is…', options: ['Better manipulators', 'A community that persuades honestly AND resists manipulation', 'Longer debates', 'Quieter meetings'], correctIndex: 1, explanation: 'Rhetoric taught openly is a vaccine, not a weapon — everyone argues better, everyone gets fooled less.', hint: 'Why does this game teach it?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH12 M3 — Three systems, one game · Owen
 * ============================================================ */

export const CH12_M3_GOVERNMENTS: Mission = {
  id: 'act3.ch12.m3.governments',
  chapterId: 'act3.ch12',
  lead: 'owen',
  subjects: ['social-studies', 'history'],
  skillTags: ['civics.comparative', 'history.institutions'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Owen! Dada T says our next trip is LONDON — where Canada’s government style comes from. Time to compare!' },
        { text: 'Round 1: leaders and symbols. Round 2: same or different?' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Leaders and symbols',
            intro: 'Match each country to its leader or symbol.',
            pairs: [
              { id: 'r1p1', item: { label: 'Canada’s government leader', shape: 'wide-short' }, slot: { label: 'Prime Minister' } },
              { id: 'r1p2', item: { label: 'The USA’s leader', shape: 'wide-short' }, slot: { label: 'President' } },
              { id: 'r1p3', item: { label: 'The UK’s government leader', shape: 'wide-short' }, slot: { label: 'Prime Minister too!' } },
              { id: 'r1p4', item: { label: 'Canada’s flag', shape: 'small-square' }, slot: { label: 'The red maple leaf' } },
              { id: 'r1p5', item: { label: 'Where Canada’s Parliament sits', shape: 'small-square' }, slot: { label: 'Ottawa — we visited!' } },
            ],
            stuckHint: 'Canada and the UK BOTH have Prime Ministers — that’s a clue about our history!',
          },
          {
            heading: 'Round 2 · Same or different?',
            intro: 'Match each fact to the right country or countries.',
            pairs: [
              { id: 'r2p1', item: { label: 'People choose leaders by voting', shape: 'huge-wide' }, slot: { label: 'All three countries!' } },
              { id: 'r2p2', item: { label: 'Has a King on its money', shape: 'wide-short' }, slot: { label: 'Canada and the UK' } },
              { id: 'r2p3', item: { label: 'Capital city is London', shape: 'small-square' }, slot: { label: 'The UK' } },
              { id: 'r2p4', item: { label: 'Celebrates July 1st as its birthday', shape: 'small-square' }, slot: { label: 'Canada (Canada Day!)' } },
              { id: 'r2p5', item: { label: 'Its “White House” is where the leader lives', shape: 'wide-short' }, slot: { label: 'The USA' } },
            ],
            stuckHint: 'Check the coins in the family jar — whose face is on them?',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Owen. History project: WHY does Canada’s government look like Britain’s but live next to America’s? Receipts incoming.' },
        { text: 'Round 1: the Westminster connection. Round 2: three systems side by side.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The Westminster connection',
            intro: 'Match each Canadian feature to its story.',
            pairs: [
              { id: 'r1p1', item: { label: 'Canada’s parliament style is called…', shape: 'wide-short' }, slot: { label: 'The Westminster system (from London)' } },
              { id: 'r1p2', item: { label: 'Why Canada inherited it', shape: 'huge-wide' }, slot: { label: 'Confederation built on British colonial institutions' } },
              { id: 'r1p3', item: { label: 'Question Period', shape: 'wide-short' }, slot: { label: 'MPs grill the government — UK tradition' } },
              { id: 'r1p4', item: { label: 'The Speaker’s chair & the mace', shape: 'small-square' }, slot: { label: 'Westminster symbols we kept' } },
              { id: 'r1p5', item: { label: 'What Canada changed over time', shape: 'huge-wide' }, slot: { label: 'Its own constitution, Charter, and full independence' } },
            ],
            stuckHint: 'Westminster is literally the London district where the UK Parliament sits.',
          },
          {
            heading: 'Round 2 · Three systems, side by side',
            intro: 'Match each feature to its country.',
            pairs: [
              { id: 'r2p1', item: { label: 'Leader sits IN the legislature', shape: 'wide-short' }, slot: { label: 'Canada & UK (PMs are MPs)' } },
              { id: 'r2p2', item: { label: 'Leader elected separately from the legislature', shape: 'wide-short' }, slot: { label: 'USA (the President)' } },
              { id: 'r2p3', item: { label: 'Elections happen on a fixed 4-year schedule, always', shape: 'wide-short' }, slot: { label: 'USA (Canada/UK can go early)' } },
              { id: 'r2p4', item: { label: 'Two elected chambers (House + Senate)', shape: 'wide-short' }, slot: { label: 'USA (ours is appointed)' } },
              { id: 'r2p5', item: { label: 'A written-in-one-document constitution', shape: 'wide-short' }, slot: { label: 'USA (UK’s is uncodified; ours is mixed)' } },
              { id: 'r2p6', item: { label: 'Head of state ≠ head of government', shape: 'wide-short' }, slot: { label: 'Canada & UK (Crown vs PM)' } },
            ],
            stuckHint: 'The US merges head of state and government into one person; we split them.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Owen. The deep dive: institutional history — why systems diverged, and what each design trades away. London will make so much sense after this.' },
        { text: 'Two rounds of comparative civics.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Why the designs diverged',
            intro: 'Match each historical cause to its effect.',
            pairs: [
              { id: 'r1p1', item: { label: 'American Revolution (1776)', shape: 'huge-wide' }, slot: { label: 'Deliberate rejection of monarchy → presidential design' } },
              { id: 'r1p2', item: { label: 'Canada’s path: evolution not revolution', shape: 'huge-wide' }, slot: { label: 'Gradual independence kept Westminster forms' } },
              { id: 'r1p3', item: { label: 'UK’s centuries of King-vs-Parliament struggle', shape: 'huge-wide' }, slot: { label: 'Power drained from Crown to Commons over time' } },
              { id: 'r1p4', item: { label: 'Statute of Westminster (1931)', shape: 'wide-short' }, slot: { label: 'Canada gains control of its own foreign policy & laws' } },
              { id: 'r1p5', item: { label: 'Patriation (1982)', shape: 'wide-short' }, slot: { label: 'Constitution comes home + the Charter arrives' } },
              { id: 'r1p6', item: { label: 'US founders’ deepest fear', shape: 'wide-short' }, slot: { label: 'Concentrated power → checks everywhere' } },
            ],
            stuckHint: 'America broke with the Crown in one stroke; Canada negotiated independence over a century.',
          },
          {
            heading: 'Round 2 · Design trade-offs',
            intro: 'Every system buys something and pays something. Match them.',
            pairs: [
              { id: 'r2p1', item: { label: 'Westminster majority governments', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Decisive action / weaker brakes between elections' } },
              { id: 'r2p2', item: { label: 'US separation of powers', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Strong brakes / frequent gridlock' } },
              { id: 'r2p3', item: { label: 'FPTP elections (Canada/UK/US)', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Local MPs + stability / seat–vote distortion' } },
              { id: 'r2p4', item: { label: 'Proportional systems', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Fair seat shares / coalition complexity' } },
              { id: 'r2p5', item: { label: 'An appointed senate', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Independent review / democratic-legitimacy questions' } },
              { id: 'r2p6', item: { label: 'A ceremonial Crown', sublabel: 'buys / pays?', shape: 'huge-wide' }, slot: { label: 'Non-partisan symbol / debates about relevance' } },
            ],
            stuckHint: 'No design is free — name what each one trades, and you understand civics.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};
