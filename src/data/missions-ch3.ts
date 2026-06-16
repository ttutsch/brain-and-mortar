// Chapter 3 · "Family game night" (Izzy leads; ends with the basement repair).
// Game night happens in the half-cleaned basement — fixing it up is the prize.

import type { Mission } from '../types';
import type { DragMatchMissionParams, QuizMissionParams } from './missions';

/* ============================================================
 * M1 — Logic puzzles · Izzy
 * ============================================================ */

export const CH3_M1_LOGIC: Mission = {
  id: 'act1.ch3.m1.logic',
  chapterId: 'act1.ch3',
  lead: 'izzy',
  subjects: ['math'],
  skillTags: ['logic.patterns', 'logic.deduction', 'logic.sequences'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Izzy here! It’s game night, and I made my own puzzle cards.' },
        { text: 'Round 1 is patterns. Round 2 is "which one doesn’t belong?"' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Finish the pattern',
            intro: 'Match each pattern to what comes next.',
            pairs: [
              { id: 'r1p1', item: { label: '🔴 🔵 🔴 🔵 …', shape: 'wide-short' }, slot: { label: '🔴' } },
              { id: 'r1p2', item: { label: '⬛ ⬛ ⬜ ⬛ ⬛ …', shape: 'wide-short' }, slot: { label: '⬜' } },
              { id: 'r1p3', item: { label: '1, 3, 5, 7, …', shape: 'long-rect' }, slot: { label: '9' } },
              { id: 'r1p4', item: { label: '10, 20, 30, …', shape: 'long-rect' }, slot: { label: '40' } },
              { id: 'r1p5', item: { label: '🌙 ⭐ ⭐ 🌙 ⭐ ⭐ …', shape: 'huge-wide' }, slot: { label: '🌙' } },
            ],
            stuckHint: 'Say the pattern out loud — your ears can hear what repeats!',
          },
          {
            heading: 'Round 2 · Which one doesn’t belong?',
            intro: 'One thing in each group is different. Match the group to its odd one out.',
            pairs: [
              { id: 'r2p1', item: { label: 'Dog, cat, bird, chair', shape: 'wide-short' }, slot: { label: 'Chair — not an animal' } },
              { id: 'r2p2', item: { label: 'Red, blue, seven, green', shape: 'wide-short' }, slot: { label: 'Seven — not a colour' } },
              { id: 'r2p3', item: { label: 'Apple, banana, carrot, grape', shape: 'wide-short' }, slot: { label: 'Carrot — not a fruit' } },
              { id: 'r2p4', item: { label: '2, 4, 6, 7, 8', shape: 'long-rect' }, slot: { label: '7 — not an even number' } },
              { id: 'r2p5', item: { label: 'Circle, square, triangle, blue', shape: 'wide-short' }, slot: { label: 'Blue — not a shape' } },
            ],
            stuckHint: 'Ask: what do most of them have in common? The odd one breaks the rule.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Izzy here. I made harder puzzle cards for game night — these need real thinking.' },
        { text: 'Round 1: number patterns. Round 2: logic riddles.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Number patterns',
            intro: 'Find the rule, then match the pattern to its next number.',
            pairs: [
              { id: 'r1p1', item: { label: '2, 4, 8, 16, …', sublabel: 'doubling', shape: 'long-rect' }, slot: { label: '32' } },
              { id: 'r1p2', item: { label: '1, 4, 9, 16, …', sublabel: 'square numbers', shape: 'long-rect' }, slot: { label: '25' } },
              { id: 'r1p3', item: { label: '100, 90, 81, 73, …', sublabel: 'gap shrinks by 1', shape: 'long-rect' }, slot: { label: '66' } },
              { id: 'r1p4', item: { label: '1, 1, 2, 3, 5, 8, …', sublabel: 'add the last two', shape: 'long-rect' }, slot: { label: '13' } },
              { id: 'r1p5', item: { label: '3, 6, 12, 24, …', sublabel: 'doubling', shape: 'long-rect' }, slot: { label: '48' } },
            ],
            stuckHint: 'Check the gap between numbers. Does it stay the same, grow, or follow its own pattern?',
          },
          {
            heading: 'Round 2 · Logic riddles',
            intro: 'Match each riddle to its answer.',
            pairs: [
              { id: 'r2p1', item: { label: 'Owen is taller than Izzy. Izzy is taller than Caleb. Who’s shortest?', shape: 'huge-wide' }, slot: { label: 'Caleb' } },
              { id: 'r2p2', item: { label: 'Game night is 2 days after Thursday.', sublabel: 'what day?', shape: 'wide-short' }, slot: { label: 'Saturday' } },
              { id: 'r2p3', item: { label: 'All cats have tails. Whiskers is a cat.', sublabel: 'so…', shape: 'wide-short' }, slot: { label: 'Whiskers has a tail' } },
              { id: 'r2p4', item: { label: 'The red box is heavier than blue. Blue is heavier than green. Lightest?', shape: 'huge-wide' }, slot: { label: 'Green box' } },
              { id: 'r2p5', item: { label: 'Tessa finished before Owen but after Izzy. Who won?', shape: 'huge-wide' }, slot: { label: 'Izzy' } },
            ],
            stuckHint: 'Draw the order out on paper — first, middle, last.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Izzy. For the older crowd I save my best puzzles — proper brain-benders.' },
        { text: 'Round 1: tougher sequences. Round 2: deduction problems.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Sequences',
            intro: 'Work out the rule for each sequence.',
            questions: [
              { id: 'q1', question: 'What comes next: 1, 2, 4, 7, 11, 16, …?', options: ['20', '21', '22', '23'], correctIndex: 2, explanation: 'The gap grows by one each time: +1, +2, +3, +4, +5, so next is +6 → 22.', hint: 'Look at the differences between terms.' },
              { id: 'q2', question: 'What comes next: 2, 6, 18, 54, …?', options: ['108', '162', '216', '110'], correctIndex: 1, explanation: 'Each term is multiplied by 3: 54 × 3 = 162.', hint: 'Try dividing each term by the one before it.' },
              { id: 'q3', question: 'What comes next: 1, 8, 27, 64, …?', options: ['100', '125', '121', '144'], correctIndex: 1, explanation: 'These are cubes: 1³, 2³, 3³, 4³ — so next is 5³ = 125.', hint: 'These are perfect somethings…' },
              { id: 'q4', question: 'Which number is missing: 3, 7, 15, 31, __, 127?', options: ['53', '63', '61', '65'], correctIndex: 1, explanation: 'Each term is double the last plus 1: 31 × 2 + 1 = 63.', hint: 'Try "double it, then add something."' },
              { id: 'q5', question: 'What comes next: O, T, T, F, F, S, S, …?', options: ['T', 'E', 'N', 'O'], correctIndex: 1, explanation: 'They’re the first letters of One, Two, Three, Four, Five, Six, Seven — next is Eight → E.', hint: 'Think of counting, not the alphabet.' },
            ],
          },
          {
            heading: 'Round 2 · Deduction',
            intro: 'Each puzzle has exactly one consistent answer.',
            questions: [
              { id: 'q1', question: 'Three boxes are labelled "apples", "oranges", "mixed" — but ALL labels are wrong. You may pull one fruit from one box. Which box do you pick from to fix all the labels?', options: ['The "apples" box', 'The "oranges" box', 'The "mixed" box', 'Impossible to know'], correctIndex: 2, explanation: 'The "mixed" box must be pure (its label is wrong). Whatever fruit you draw tells you its true contents, and the rest follows by elimination.', hint: 'Start with the box whose wrong label tells you the most.' },
              { id: 'q2', question: 'A game uses two dice. Which total is most likely?', options: ['6', '7', '8', 'All equal'], correctIndex: 1, explanation: 'Seven has the most combinations: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1 — six ways out of 36.', hint: 'Count how many dice pairs make each total.' },
              { id: 'q3', question: 'Tessa always lies on game night; Owen always tells the truth. One of them says, "I am Owen." Who spoke?', options: ['Tessa', 'Owen', 'Either could', 'Neither could'], correctIndex: 2, explanation: 'Owen saying "I am Owen" is true — fine. Tessa saying it would be a lie — also consistent. Both are possible, so you can’t tell.', hint: 'Test the sentence in each speaker’s mouth.' },
              { id: 'q4', question: 'In a round-robin where each of 4 players plays every other player once, how many games are played?', options: ['4', '6', '8', '12'], correctIndex: 1, explanation: 'That’s "4 choose 2" = 6 pairings.', hint: 'List the pairs: AB, AC, AD…' },
              { id: 'q5', question: 'A clock shows 3:15. What is the angle between the hands (to the nearest half degree)?', options: ['0°', '7.5°', '15°', '30°'], correctIndex: 1, explanation: 'At 3:15 the minute hand is at 90°; the hour hand has moved a quarter past 3 — 90° + 7.5°. Difference: 7.5°.', hint: 'The hour hand moves too — 30° per hour.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M2 — Code the game · Tessa (her first lead!)
 * ============================================================ */

export const CH3_M2_CODING: Mission = {
  id: 'act1.ch3.m2.coding',
  chapterId: 'act1.ch3',
  lead: 'tessa',
  subjects: ['coding'],
  skillTags: ['coding.sequencing', 'coding.loops', 'coding.conditionals', 'coding.debugging'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Hi! I’m Tessa, the oldest. I’m making a video game for family game night!' },
        { text: 'Computers follow steps IN ORDER. Help me put the steps right.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Steps in order',
            intro: 'Match each job to its FIRST step.',
            pairs: [
              { id: 'r1p1', item: { label: 'Make toast', shape: 'small-square' }, slot: { label: 'Put bread in the toaster' } },
              { id: 'r1p2', item: { label: 'Brush your teeth', shape: 'small-square' }, slot: { label: 'Put paste on the brush' } },
              { id: 'r1p3', item: { label: 'Play a board game', shape: 'wide-short' }, slot: { label: 'Set up the board' } },
              { id: 'r1p4', item: { label: 'Draw a picture', shape: 'small-square' }, slot: { label: 'Get paper and crayons' } },
              { id: 'r1p5', item: { label: 'Plant a seed', shape: 'small-square' }, slot: { label: 'Dig a little hole' } },
            ],
            stuckHint: 'What do you need to do BEFORE anything else can happen?',
          },
          {
            heading: 'Round 2 · Tell the robot',
            intro: 'My game has a robot. Match what we tell it to what it does.',
            pairs: [
              { id: 'r2p1', item: { label: 'Go forward 2, turn right', shape: 'long-rect' }, slot: { label: '⬆⬆➡' } },
              { id: 'r2p2', item: { label: 'Turn left, go forward 1', shape: 'long-rect' }, slot: { label: '⬅⬆' } },
              { id: 'r2p3', item: { label: 'Repeat "forward" 3 times', shape: 'long-rect' }, slot: { label: '⬆⬆⬆' } },
              { id: 'r2p4', item: { label: 'Forward, turn right, forward', shape: 'long-rect' }, slot: { label: '⬆➡⬆' } },
              { id: 'r2p5', item: { label: 'Turn right two times', shape: 'wide-short' }, slot: { label: '➡➡ (now facing back!)' } },
            ],
            stuckHint: 'Read the arrows one at a time, left to right — like the robot would.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'I’m Tessa. I’m building a maze game for game night, and my code has loops and IFs in it.' },
        { text: 'Round 1: what does each block do? Round 2: find my bugs!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Loops and conditionals',
            intro: 'Figure out what each piece of code does.',
            questions: [
              { id: 'q1', question: 'What does this print?\nrepeat 3 times: say "ha"', options: ['ha', 'ha ha', 'ha ha ha', 'hahahahahaha'], correctIndex: 2, explanation: 'The loop runs the "say" step exactly 3 times.', hint: 'Count the repeats.' },
              { id: 'q2', question: 'IF it is raining → take umbrella. It is sunny. What happens?', options: ['Take umbrella', 'Nothing — the IF is skipped', 'Error', 'Take sunglasses'], correctIndex: 1, explanation: 'An IF only runs its step when the condition is true. Sunny means the condition is false, so the step is skipped.', hint: 'Is the condition true right now?' },
              { id: 'q3', question: 'The robot starts facing up. Code: repeat 4 times: [forward 1, turn right]. Where does it end?', options: ['Far away', 'Back where it started', 'One step up', 'Facing down'], correctIndex: 1, explanation: 'Four forward-and-right-turns traces a square — it ends exactly where it began, facing up again.', hint: 'Walk it out with your finger on the table.' },
              { id: 'q4', question: 'What is a "loop" for in code?', options: ['Making code colourful', 'Repeating steps without writing them again', 'Stopping the program', 'Naming the game'], correctIndex: 1, explanation: 'Loops repeat steps — "repeat 100 times" beats writing the step 100 times.', hint: 'Think about what "loop" means on a rollercoaster.' },
              { id: 'q5', question: 'score = 0. Then: add 2, add 2, add 1. What is score?', options: ['4', '5', '6', '221'], correctIndex: 1, explanation: '0 + 2 + 2 + 1 = 5. Variables hold a value that updates step by step.', hint: 'Track the number after each step.' },
            ],
          },
          {
            heading: 'Round 2 · Debug my game',
            intro: 'Each snippet has a bug. Find what went wrong.',
            questions: [
              { id: 'q1', question: 'I want "go go go". My code: repeat 2 times: say "go". What’s wrong?', options: ['Wrong word', 'The loop should repeat 3 times', 'Loops can’t say words', 'Nothing is wrong'], correctIndex: 1, explanation: 'The loop count is the bug — 2 repeats gives "go go".', hint: 'Count the "go"s I asked for.' },
              { id: 'q2', question: 'My maze robot should stop AT the wall, but it crashes INTO it. The code says: IF wall is far → keep going. What should the condition be?', options: ['IF wall is near → keep going', 'IF wall is near → stop', 'IF robot is fast → stop', 'Remove the IF'], correctIndex: 1, explanation: 'The robot needs a stopping rule: when the wall is NEAR, stop.', hint: 'What should happen when the wall is close?' },
              { id: 'q3', question: 'Player wins at 10 points, but my game says "you win" at the start. Bug: IF score = 0 → say "you win". Fix?', options: ['IF score = 10 → say "you win"', 'IF score = 0 → say "you lose"', 'Say "you win" twice', 'Remove the score'], correctIndex: 0, explanation: 'The win condition should check for 10, not 0.', hint: 'When should "you win" actually appear?' },
              { id: 'q4', question: 'My countdown prints 3, 2, 1, 0, -1, -2 … forever. What’s missing?', options: ['A bigger starting number', 'A stop condition (stop at 0)', 'More numbers', 'A faster computer'], correctIndex: 1, explanation: 'Loops need a stop condition or they run forever — stop when the count reaches 0.', hint: 'When should the countdown end?' },
              { id: 'q5', question: 'The jump button makes my player jump TWICE. My code has "jump" written two times. Fix?', options: ['Press the button harder', 'Delete one "jump"', 'Add a third jump', 'Rename the button'], correctIndex: 1, explanation: 'The duplicated step is the bug — one button press should mean one jump.', hint: 'How many jump commands are in the code?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa here. My game-night project is a real game in JavaScript-ish pseudocode. Help me reason through it.' },
        { text: 'Round 1: trace what code does. Round 2: debug like a developer.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Trace the code',
            intro: 'Read carefully and predict the output.',
            questions: [
              { id: 'q1', question: 'let x = 3\nfor i in 1..3: x = x * 2\nWhat is x?', options: ['6', '12', '24', '9'], correctIndex: 2, explanation: 'x doubles three times: 3 → 6 → 12 → 24.', hint: 'Apply the loop body once per iteration.' },
              { id: 'q2', question: 'let s = 0\nfor i in 1..5: if i is even: s = s + i\nWhat is s?', options: ['15', '6', '9', '10'], correctIndex: 1, explanation: 'Only the evens add: 2 + 4 = 6.', hint: 'Which numbers between 1 and 5 pass the IF?' },
              { id: 'q3', question: 'function f(n): return n * n + 1\nWhat is f(f(2))?', options: ['5', '17', '25', '26'], correctIndex: 3, explanation: 'Inside-out: f(2) = 5, then f(5) = 26.', hint: 'Evaluate the inner call first.' },
              { id: 'q4', question: 'let list = [4, 7, 1, 9]\nsort list, then take the first item.\nWhat do you get?', options: ['4', '7', '1', '9'], correctIndex: 2, explanation: 'Sorted ascending: [1, 4, 7, 9] — first is 1.', hint: 'What does sorting do to the order?' },
              { id: 'q5', question: 'let lives = 3\nwhile lives > 0: lives = lives - 1\nHow many times does the loop body run?', options: ['2', '3', '4', 'Forever'], correctIndex: 1, explanation: 'It runs at lives = 3, 2, 1 — three times — then the condition fails at 0.', hint: 'Check the condition before each pass.' },
            ],
          },
          {
            heading: 'Round 2 · Debug like a developer',
            intro: 'Spot the real cause, not just the symptom.',
            questions: [
              { id: 'q1', question: 'My high-score list shows the LOWEST scores at the top. The code sorts ascending and shows the first 5. Cleanest fix?', options: ['Sort descending instead', 'Show the last 5 instead', 'Both A and B would work', 'Delete low scores from the data'], correctIndex: 2, explanation: 'Either sorting descending and taking the first 5, or keeping ascending and taking the last 5 (reversed), fixes it. Deleting data does not.', hint: 'Two valid fixes exist — which option admits both?' },
              { id: 'q2', question: 'while player.alive: draw()  — the game freezes my browser. Why?', options: ['draw() is too slow', 'The loop never yields control back to the browser', 'player.alive is misspelled', 'Browsers can’t draw'], correctIndex: 1, explanation: 'A tight while-loop hogs the only thread. Games use requestAnimationFrame or similar so the browser breathes between frames.', hint: 'What else needs to run besides your loop?' },
              { id: 'q3', question: 'if score = 10 (single =) sets the score instead of checking it. What should it be?', options: ['score == 10', 'score := 10', 'score of 10', '10 = score'], correctIndex: 0, explanation: 'Comparison uses == (or ===); single = is assignment. A classic bug.', hint: 'Assignment vs. comparison.' },
              { id: 'q4', question: 'players[4] crashes with a list of 4 players. Why?', options: ['Lists start counting at 1', 'Lists start counting at 0, so the last index is 3', 'The list is too big', '4 is an unlucky number'], correctIndex: 1, explanation: 'Zero-based indexing: valid indices are 0–3. players[4] is one past the end.', hint: 'What index does the FIRST player have?' },
              { id: 'q5', question: 'My random dice does: floor(random() * 6). It never rolls a 6. Why?', options: ['random() is broken', 'It produces 0–5; add 1 to shift to 1–6', 'floor rounds up', 'Six-sided dice need 7 values'], correctIndex: 1, explanation: 'random() gives [0, 1), so floor(×6) gives 0–5. Adding 1 yields 1–6.', hint: 'What’s the largest value floor(random()*6) can make?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M3 — Game math & probability · Mama T
 * ============================================================ */

export const CH3_M3_GAME_MATH: Mission = {
  id: 'act1.ch3.m3.game-math',
  chapterId: 'act1.ch3',
  lead: 'mama_t',
  subjects: ['math'],
  skillTags: ['math.probability.basic', 'math.counting', 'math.mental-arithmetic'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Mama T here! Game night needs a scorekeeper — that’s you.' },
        { text: 'Round 1: count the points. Round 2: dice questions!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Keep score',
            intro: 'Add up the points!',
            questions: [
              { id: 'q1', question: 'Caleb has 4 points and wins 3 more. How many now?', options: ['6', '7', '8', '5'], correctIndex: 1, explanation: '4 + 3 = 7. Go Caleb!', hint: 'Count up from 4: five, six, …' },
              { id: 'q2', question: 'Izzy has 10 points and loses 2. How many now?', options: ['12', '8', '9', '7'], correctIndex: 1, explanation: '10 − 2 = 8.', hint: 'Count back from 10.' },
              { id: 'q3', question: 'Owen scores 5 points two times. How many in all?', options: ['7', '10', '12', '25'], correctIndex: 1, explanation: '5 + 5 = 10. Two fives make ten.', hint: 'Five and five more.' },
              { id: 'q4', question: 'Tessa has 6, Dada has 9. Who is winning, and by how much?', options: ['Tessa by 3', 'Dada by 3', 'Dada by 2', 'It’s a tie'], correctIndex: 1, explanation: '9 is bigger than 6, and 9 − 6 = 3.', hint: 'Which number is bigger? What’s the gap?' },
              { id: 'q5', question: 'Everyone starts with 10 points. Mama T spends 4 on a power-up. How many left?', options: ['14', '6', '5', '4'], correctIndex: 1, explanation: '10 − 4 = 6.', hint: 'Spending means subtracting.' },
            ],
          },
          {
            heading: 'Round 2 · Dice!',
            intro: 'Look at the dice and answer.',
            questions: [
              { id: 'q1', question: 'A die shows ⚄ (5 dots). Caleb needs 6 to win. Did he win?', options: ['Yes', 'No — 5 is less than 6', 'It’s a tie', 'Roll again to check'], correctIndex: 1, explanation: '5 is one less than 6, so not this time!', hint: 'Compare 5 and 6.' },
              { id: 'q2', question: 'Roll two dice: ⚂ (3) and ⚃ (4). What’s the total?', options: ['6', '7', '8', '34'], correctIndex: 1, explanation: '3 + 4 = 7.', hint: 'Add the dots.' },
              { id: 'q3', question: 'What’s the BIGGEST number one die can roll?', options: ['5', '6', '7', '12'], correctIndex: 1, explanation: 'A die has faces 1 through 6.', hint: 'Count a die’s faces.' },
              { id: 'q4', question: 'What’s the SMALLEST total two dice can roll together?', options: ['0', '1', '2', '3'], correctIndex: 2, explanation: 'Both showing 1: 1 + 1 = 2.', hint: 'What if both dice roll their smallest?' },
              { id: 'q5', question: 'Izzy needs ANY even number to win: 2, 4, or 6. She rolls ⚃ (4). Did she win?', options: ['Yes — 4 is even', 'No', 'Only if she rolls again', 'Even numbers don’t count'], correctIndex: 0, explanation: '4 is an even number, so Izzy wins!', hint: 'Is 4 in the list 2, 4, 6?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Mama T here. Our games involve more math than you’d think — especially chance.' },
        { text: 'Round 1: scorekeeping with bigger numbers. Round 2: probability.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Serious scorekeeping',
            intro: 'Multi-step score problems.',
            questions: [
              { id: 'q1', question: 'Owen scores 12, 8, and 15 across three rounds. Total?', options: ['33', '35', '34', '36'], correctIndex: 1, explanation: '12 + 8 = 20, plus 15 = 35.', hint: 'Add two at a time.' },
              { id: 'q2', question: 'Tessa doubles her 14 points, then loses 5. Final score?', options: ['23', '28', '18', '33'], correctIndex: 0, explanation: '14 × 2 = 28, minus 5 = 23.', hint: 'Double first, then subtract.' },
              { id: 'q3', question: 'Four players split a 100-point bonus equally. Each gets…', options: ['20', '25', '40', '50'], correctIndex: 1, explanation: '100 ÷ 4 = 25.', hint: 'Divide by the number of players.' },
              { id: 'q4', question: 'Izzy scores 9 points per round for 6 rounds. Total?', options: ['45', '54', '56', '63'], correctIndex: 1, explanation: '9 × 6 = 54.', hint: 'Times table: nine sixes.' },
              { id: 'q5', question: 'The winning score is 75. Caleb has 48. How many more does he need?', options: ['23', '27', '33', '37'], correctIndex: 1, explanation: '75 − 48 = 27.', hint: 'Count up from 48 to 75.' },
            ],
          },
          {
            heading: 'Round 2 · What are the chances?',
            intro: 'Probability with dice, coins, and cards.',
            questions: [
              { id: 'q1', question: 'What’s the chance of rolling a 4 on one die?', options: ['1 in 4', '1 in 6', '4 in 6', '1 in 2'], correctIndex: 1, explanation: 'One face out of six equally likely faces: 1/6.', hint: 'How many faces? How many show 4?' },
              { id: 'q2', question: 'What’s the chance a coin flip lands heads?', options: ['1 in 2', '1 in 4', '2 in 2', 'Depends on the coin'], correctIndex: 0, explanation: 'Two equally likely sides: 1/2.', hint: 'How many sides does a coin have?' },
              { id: 'q3', question: 'A bag has 3 red and 1 blue marble. Which pull is more likely?', options: ['Blue', 'Red', 'Equal', 'Neither can be pulled'], correctIndex: 1, explanation: 'Red is 3 out of 4; blue is 1 out of 4.', hint: 'Count each colour.' },
              { id: 'q4', question: 'Rolling one die, what’s the chance of an even number?', options: ['1/6', '1/3', '1/2', '2/3'], correctIndex: 2, explanation: 'Evens are 2, 4, 6 — three of six faces: 3/6 = 1/2.', hint: 'List the even faces.' },
              { id: 'q5', question: 'You flip heads 3 times in a row. What’s the chance the NEXT flip is heads?', options: ['Less than 1/2 — tails is due', 'More than 1/2 — heads is hot', 'Exactly 1/2', 'Zero'], correctIndex: 2, explanation: 'Each flip is independent — the coin has no memory. Still 1/2.', hint: 'Does the coin remember the last flips?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Mama T. Game night, but make it statistics — expected values, combinations, the works.' },
        { text: 'Round 1: probability. Round 2: strategy math.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Probability, properly',
            intro: 'Fractions, combinations, independence.',
            questions: [
              { id: 'q1', question: 'Rolling two dice, what’s the probability of doubles?', options: ['1/6', '1/12', '1/36', '1/3'], correctIndex: 0, explanation: 'Six doubles out of 36 outcomes: 6/36 = 1/6.', hint: 'Count the doubles: (1,1), (2,2)…' },
              { id: 'q2', question: 'What’s the probability of rolling a total of 12 with two dice?', options: ['1/6', '1/12', '1/18', '1/36'], correctIndex: 3, explanation: 'Only (6,6) works: 1 outcome of 36.', hint: 'How many ways can two dice sum to 12?' },
              { id: 'q3', question: 'A deck has 52 cards, 13 hearts. P(heart) = ?', options: ['1/13', '1/4', '13/39', '1/2'], correctIndex: 1, explanation: '13/52 simplifies to 1/4.', hint: 'Simplify 13/52.' },
              { id: 'q4', question: 'P(rolling a 6) then P(rolling another 6) — chance of both?', options: ['2/6', '1/12', '1/36', '1/6'], correctIndex: 2, explanation: 'Independent events multiply: 1/6 × 1/6 = 1/36.', hint: 'Multiply the probabilities.' },
              { id: 'q5', question: 'A spinner has 8 equal slices: 3 green, 3 red, 2 yellow. P(NOT yellow)?', options: ['2/8', '3/8', '5/8', '6/8'], correctIndex: 3, explanation: 'Not-yellow = 6 slices of 8 = 6/8 = 3/4.', hint: 'Count everything except yellow.' },
            ],
          },
          {
            heading: 'Round 2 · Strategy math',
            intro: 'Expected value and counting — the real game-winning stuff.',
            questions: [
              { id: 'q1', question: 'A game pays 10 points 1/5 of the time, 0 otherwise. Expected points per play?', options: ['10', '5', '2', '1'], correctIndex: 2, explanation: 'Expected value: 10 × 1/5 = 2 points per play on average.', hint: 'Multiply payout by its probability.' },
              { id: 'q2', question: 'Option A: certain 3 points. Option B: 1/2 chance of 5 points. Which is better on average?', options: ['A (3 > 2.5)', 'B', 'Equal', 'Impossible to compare'], correctIndex: 0, explanation: 'B averages 5 × 1/2 = 2.5 points — A’s certain 3 wins.', hint: 'Compute B’s expected value.' },
              { id: 'q3', question: 'How many different ways can 4 players be seated in a row?', options: ['4', '12', '16', '24'], correctIndex: 3, explanation: '4! = 4 × 3 × 2 × 1 = 24.', hint: 'First seat has 4 choices, next has 3…' },
              { id: 'q4', question: 'In best-of-5, Tessa leads 2–1. How many more games might be played, at most?', options: ['1', '2', '3', '5'], correctIndex: 1, explanation: 'Someone reaches 3 wins within at most 2 more games (2–1 → worst case 2–2 → decider).', hint: 'Play out the longest path.' },
              { id: 'q5', question: 'A trivia game: +2 for right, −1 for wrong. You guess randomly among 4 options. Expected score per guess?', options: ['+0.25', '−0.25', '+0.5', '0'], correctIndex: 1, explanation: '1/4 × (+2) + 3/4 × (−1) = 0.5 − 0.75 = −0.25. Random guessing loses points!', hint: 'Weight both outcomes by their chances.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M4 — Word games · Caleb
 * ============================================================ */

export const CH3_M4_WORDS: Mission = {
  id: 'act1.ch3.m4.words',
  chapterId: 'act1.ch3',
  lead: 'caleb',
  subjects: ['reading'],
  skillTags: ['reading.rhyme', 'reading.vocabulary', 'reading.wordplay'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Caleb here! My favourite part of game night is the word games.' },
        { text: 'Round 1: rhymes! Round 2: opposites!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Rhyme time',
            intro: 'Match each word to its rhyme.',
            pairs: [
              { id: 'r1p1', item: { label: 'Cat', shape: 'small-square' }, slot: { label: 'Hat' } },
              { id: 'r1p2', item: { label: 'Dog', shape: 'small-square' }, slot: { label: 'Frog' } },
              { id: 'r1p3', item: { label: 'Moon', shape: 'small-square' }, slot: { label: 'Spoon' } },
              { id: 'r1p4', item: { label: 'House', shape: 'small-square' }, slot: { label: 'Mouse' } },
              { id: 'r1p5', item: { label: 'Star', shape: 'small-square' }, slot: { label: 'Car' } },
              { id: 'r1p6', item: { label: 'Bed', shape: 'small-square' }, slot: { label: 'Red' } },
            ],
            stuckHint: 'Say both words out loud — rhymes END with the same sound.',
          },
          {
            heading: 'Round 2 · Opposites',
            intro: 'Match each word to its opposite.',
            pairs: [
              { id: 'r2p1', item: { label: 'Big', shape: 'small-square' }, slot: { label: 'Small' } },
              { id: 'r2p2', item: { label: 'Hot', shape: 'small-square' }, slot: { label: 'Cold' } },
              { id: 'r2p3', item: { label: 'Up', shape: 'small-square' }, slot: { label: 'Down' } },
              { id: 'r2p4', item: { label: 'Fast', shape: 'small-square' }, slot: { label: 'Slow' } },
              { id: 'r2p5', item: { label: 'Happy', shape: 'small-square' }, slot: { label: 'Sad' } },
            ],
            stuckHint: 'An opposite is the most different thing you can think of.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb! Tessa taught me about synonyms and homophones. Now I use them to win at word games.' },
        { text: 'Round 1: word meanings. Round 2: tricky sound-alikes.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Synonyms',
            intro: 'Match each word to the word that means (almost) the same.',
            pairs: [
              { id: 'r1p1', item: { label: 'Happy', shape: 'small-square' }, slot: { label: 'Joyful' } },
              { id: 'r1p2', item: { label: 'Big', shape: 'small-square' }, slot: { label: 'Enormous' } },
              { id: 'r1p3', item: { label: 'Quick', shape: 'small-square' }, slot: { label: 'Rapid' } },
              { id: 'r1p4', item: { label: 'Scared', shape: 'small-square' }, slot: { label: 'Frightened' } },
              { id: 'r1p5', item: { label: 'Smart', shape: 'small-square' }, slot: { label: 'Clever' } },
              { id: 'r1p6', item: { label: 'Begin', shape: 'small-square' }, slot: { label: 'Start' } },
            ],
            stuckHint: 'Try swapping the words in a sentence — synonyms still make sense.',
          },
          {
            heading: 'Round 2 · Homophones',
            intro: 'These words SOUND the same but mean different things. Match each clue to the right spelling.',
            pairs: [
              { id: 'r2p1', item: { label: 'A number after seven', shape: 'small-square' }, slot: { label: 'Eight (not "ate")' } },
              { id: 'r2p2', item: { label: 'What you did at dinner', shape: 'small-square' }, slot: { label: 'Ate (not "eight")' } },
              { id: 'r2p3', item: { label: 'It blows through trees', shape: 'small-square' }, slot: { label: 'Wind' } },
              { id: 'r2p4', item: { label: 'Belonging to them', shape: 'small-square' }, slot: { label: 'Their (not "there")' } },
              { id: 'r2p5', item: { label: 'A place — over ___', shape: 'small-square' }, slot: { label: 'There (not "their")' } },
            ],
            stuckHint: 'Read the clue first, then pick the spelling that matches the MEANING.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb says hi — but Tessa wrote this round because the big kids wanted harder words.' },
        { text: 'Round 1: vocabulary in context. Round 2: word logic and etymology.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Words in context',
            intro: 'Pick the meaning that fits the sentence.',
            questions: [
              { id: 'q1', question: '"Owen was reluctant to lend his lucky stick." Reluctant means…', options: ['Excited', 'Unwilling', 'Quick', 'Proud'], correctIndex: 1, explanation: 'Reluctant = hesitant or unwilling.', hint: 'Would you be eager to lend your lucky stick?' },
              { id: 'q2', question: '"The instructions were ambiguous, so we argued about the rules." Ambiguous means…', options: ['Very clear', 'Open to more than one meaning', 'Written in French', 'Too long'], correctIndex: 1, explanation: 'Ambiguous = unclear because multiple readings are possible — which is why they argued.', hint: 'Why would unclear rules cause an argument?' },
              { id: 'q3', question: '"Izzy’s strategy was meticulous." Meticulous means…', options: ['Careless', 'Extremely careful about details', 'Fast', 'Secret'], correctIndex: 1, explanation: 'Meticulous = showing great attention to detail.', hint: 'Izzy plans everything down to the pixel.' },
              { id: 'q4', question: '"Caleb was elated when he won." Elated means…', options: ['Tired', 'Confused', 'Extremely happy', 'Hungry'], correctIndex: 2, explanation: 'Elated = thrilled, overjoyed.', hint: 'How do you feel when you win?' },
              { id: 'q5', question: '"Dada T conceded the game." Conceded means…', options: ['Won decisively', 'Admitted defeat', 'Cheated', 'Demanded a rematch'], correctIndex: 1, explanation: 'To concede = to admit defeat or yield.', hint: 'It’s what a gracious loser does.' },
            ],
          },
          {
            heading: 'Round 2 · Word logic',
            intro: 'Roots, prefixes, and word puzzles.',
            questions: [
              { id: 'q1', question: 'The prefix "tri-" (triangle, tricycle, trio) means…', options: ['Two', 'Three', 'Many', 'Around'], correctIndex: 1, explanation: 'Tri- = three. Triangle: three angles.', hint: 'Count a triangle’s sides.' },
              { id: 'q2', question: '"Unbelievable" breaks into…', options: ['Un + believ + able', 'U + nbelievable', 'Unbe + lievable', 'It can’t be broken down'], correctIndex: 0, explanation: 'Prefix un- (not) + root believe + suffix -able (can be done) = "cannot be believed."', hint: 'Find the root word in the middle.' },
              { id: 'q3', question: 'Which word is a palindrome (reads the same backwards)?', options: ['Level', 'Game', 'Night', 'Family'], correctIndex: 0, explanation: 'L-E-V-E-L reverses to itself.', hint: 'Spell each one backwards.' },
              { id: 'q4', question: '"Aquarium" and "aqueduct" share the Latin root "aqua," meaning…', options: ['Glass', 'Water', 'Fish', 'Building'], correctIndex: 1, explanation: 'Aqua = water. An aquarium holds water; an aqueduct carries it.', hint: 'What do both things involve?' },
              { id: 'q5', question: 'An anagram of "LISTEN" is…', options: ['SILENT', 'LISTED', 'TINSEL and SILENT both', 'ENLIST, TINSEL, and SILENT all three'], correctIndex: 3, explanation: 'All three use exactly the letters L-I-S-T-E-N. Anagrams rearrange every letter.', hint: 'Check each option letter by letter.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};
