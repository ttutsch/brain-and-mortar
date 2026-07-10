// Chapter 7 · "Where our family is from" (Owen) → bedroom redesigns
// Chapter 8 · "Storm week" (Tessa) → the pool

import type { Mission } from '../types';
import type {
  DragMatchMissionParams,
  MixedMissionParams,
  PathPlannerMissionParams,
  QuizMissionParams,
} from './missions';

/* ============================================================
 * CH7 M1 — The world map · Owen
 * ============================================================ */

export const CH7_M1_WORLD: Mission = {
  id: 'act2.ch7.m1.world',
  chapterId: 'act2.ch7',
  lead: 'owen',
  subjects: ['geography'],
  skillTags: ['geo.world.continents', 'geo.world.countries'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Owen here. For my school project, we’re mapping where everyone’s family comes from. First: learn the world map!' },
        { text: 'Round 1: continents. Round 2: oceans and landmarks. Round 3: count what our class map collected!' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · The seven continents',
            intro: 'Match each clue to its continent.',
            pairs: [
              { id: 'r1p1', item: { label: 'Where Canada is', shape: 'huge-wide', emoji: '🍁' }, slot: { label: 'North America' } },
              { id: 'r1p2', item: { label: 'Where penguins live (brrr!)', shape: 'huge-wide', emoji: '🐧' }, slot: { label: 'Antarctica' } },
              { id: 'r1p3', item: { label: 'Biggest continent, most people', shape: 'huge-wide' }, slot: { label: 'Asia' } },
              { id: 'r1p4', item: { label: 'Where lions and elephants roam', shape: 'huge-wide', emoji: '🦁' }, slot: { label: 'Africa' } },
              { id: 'r1p5', item: { label: 'Continent that’s also one country', shape: 'huge-wide' }, slot: { label: 'Australia' } },
            ],
            stuckHint: 'Asia is the giant one. Antarctica is the frozen one at the bottom.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Oceans and wonders',
            intro: 'Match each clue to the answer.',
            pairs: [
              { id: 'r2p1', item: { label: 'Biggest ocean', shape: 'huge-wide', emoji: '🌊' }, slot: { label: 'Pacific' } },
              { id: 'r2p2', item: { label: 'Ocean between Canada and Europe', shape: 'huge-wide' }, slot: { label: 'Atlantic' } },
              { id: 'r2p3', item: { label: 'Icy ocean at the top of the world', shape: 'huge-wide', emoji: '🧊' }, slot: { label: 'Arctic' } },
              { id: 'r2p4', item: { label: 'The longest river (in Africa)', shape: 'long-rect' }, slot: { label: 'The Nile' } },
              { id: 'r2p5', item: { label: 'The tallest mountain (in Asia)', shape: 'tall-thin', emoji: '🏔️' }, slot: { label: 'Mount Everest' } },
            ],
            stuckHint: 'The Arctic Ocean touches Canada’s north coast.',
          },
          {
            kind: 'counting',
            heading: 'Round 3 · Count the class map',
            intro: 'Our string-map is filling up! Help me count everything the class added.',
            items: [
              {
                id: 'c1',
                prompt: 'How many pins mark the families on our map?',
                groups: [{ emoji: '📍', count: 6 }],
                answer: 6,
                options: [4, 5, 6, 7],
                hint: 'Touch each pin as you count it.',
                explanation: 'Six pins — six family journeys!',
              },
              {
                id: 'c2',
                prompt: 'Owen taped 4 little flags on Europe and 3 on Africa. How many flags is that?',
                groups: [
                  { emoji: '🚩', count: 4, label: 'On Europe' },
                  { emoji: '🚩', count: 3, label: 'On Africa' },
                ],
                answer: 7,
                options: [6, 7, 8, 9],
                hint: 'Count the Europe flags first, then keep counting the Africa ones.',
                explanation: '4 and 3 together make 7 flags.',
              },
              {
                id: 'c3',
                prompt: 'How many globes are spinning in our classroom?',
                groups: [{ emoji: '🌍', count: 5 }],
                answer: 5,
                options: [3, 4, 5, 6],
                hint: 'Count them one at a time.',
                explanation: 'Five globes — one for each table!',
              },
              {
                id: 'c4',
                prompt: 'Families travelled long ago on 3 ships and today on 2 planes. How many journeys in all?',
                groups: [
                  { emoji: '⛵', count: 3, label: 'By ship' },
                  { emoji: '✈️', count: 2, label: 'By plane' },
                ],
                answer: 5,
                options: [4, 5, 6, 7],
                hint: 'Start at 3, then count up 2 more.',
                explanation: '3 + 2 = 5 journeys to Canada.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Owen. Our class made a string-map: every kid’s family connects Toronto to somewhere in the world. The strings go EVERYWHERE.' },
        { text: 'Round 1: countries and capitals. Round 2: reading the world map like a pro. Round 3: crack the map patterns.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Countries and capitals',
            intro: 'Match each country to its capital.',
            pairs: [
              { id: 'r1p1', item: { label: 'Canada', shape: 'huge-wide', emoji: '🇨🇦' }, slot: { label: 'Ottawa' } },
              { id: 'r1p2', item: { label: 'Japan', shape: 'small-square', emoji: '🇯🇵' }, slot: { label: 'Tokyo' } },
              { id: 'r1p3', item: { label: 'France', shape: 'small-square', emoji: '🇫🇷' }, slot: { label: 'Paris' } },
              { id: 'r1p4', item: { label: 'India', shape: 'wide-short', emoji: '🇮🇳' }, slot: { label: 'New Delhi' } },
              { id: 'r1p5', item: { label: 'Brazil', shape: 'wide-short', emoji: '🇧🇷' }, slot: { label: 'Brasília' } },
              { id: 'r1p6', item: { label: 'Kenya', shape: 'small-square', emoji: '🇰🇪' }, slot: { label: 'Nairobi' } },
            ],
            stuckHint: 'Brazil’s capital isn’t Rio — Brasília was purpose-built in the 1950s.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Map-reading pro',
            intro: 'Match each term to its meaning.',
            pairs: [
              { id: 'r2p1', item: { label: 'Equator', shape: 'huge-wide' }, slot: { label: 'Imaginary line around the middle' } },
              { id: 'r2p2', item: { label: 'Northern hemisphere', shape: 'huge-wide' }, slot: { label: 'Everything above the equator' } },
              { id: 'r2p3', item: { label: 'Latitude lines', shape: 'long-rect' }, slot: { label: 'Run east–west, measure north–south' } },
              { id: 'r2p4', item: { label: 'Longitude lines', shape: 'tall-thin' }, slot: { label: 'Run pole to pole, measure east–west' } },
              { id: 'r2p5', item: { label: 'Map legend', shape: 'small-square' }, slot: { label: 'Explains the map’s symbols' } },
            ],
            stuckHint: '"Lat is flat" — latitude lines lie flat like rungs of a ladder.',
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Map patterns',
            intro: 'Maps are full of patterns. Figure out what comes next in each one.',
            items: [
              {
                id: 'p1',
                prompt: 'The classroom globe spins past the same views in order. What comes next?',
                sequence: ['🌍', '🌎', '🌏', '🌍', '🌎'],
                options: ['🌏', '🌍', '🗺️', '🌎'],
                correctIndex: 0,
                hint: 'Three views repeat in order: Europe–Africa, the Americas, then Asia–Australia.',
                explanation: 'The pattern repeats in threes — 🌍 🌎 🌏 — so 🌏 spins past next.',
              },
              {
                id: 'p2',
                prompt: 'Owen lines up landmark stickers. What comes next?',
                sequence: ['🗼', '🗽', '🗽', '🗼', '🗽', '🗽', '🗼'],
                options: ['🗼', '🗽', '🕌', '🗿'],
                correctIndex: 1,
                hint: 'One tower, then two statues — over and over.',
                explanation: 'The repeating chunk is 🗼🗽🗽, so the next sticker is 🗽.',
              },
              {
                id: 'p3',
                prompt: 'Owen labels every OTHER map column. Which letter comes next?',
                sequence: ['A', 'C', 'E', 'G'],
                options: ['H', 'I', 'J', 'K'],
                correctIndex: 1,
                hint: 'The labels skip one letter each time.',
                explanation: 'A, C, E, G skips a letter each step — next is I.',
              },
              {
                id: 'p4',
                prompt: 'Latitude lines on our map are drawn every 15 degrees. Which line comes next?',
                sequence: ['0°', '15°', '30°', '45°'],
                options: ['50°', '55°', '60°', '75°'],
                correctIndex: 2,
                hint: 'Count up by 15 each time.',
                explanation: '45 + 15 = 60 — the 60° line is next.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Owen. Family-origins project, advanced edition: migration patterns, diasporas, and what maps don’t tell you.' },
        { text: 'Round 1: world geography depth. Round 2: migration geography.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Beyond the basics',
            intro: 'Match each clue to its answer.',
            pairs: [
              { id: 'r1p1', item: { label: 'Most populous country (today)', shape: 'huge-wide' }, slot: { label: 'India' } },
              { id: 'r1p2', item: { label: 'Country spanning 11 time zones', shape: 'huge-wide' }, slot: { label: 'Russia' } },
              { id: 'r1p3', item: { label: 'Strait separating Asia & North America', shape: 'long-rect' }, slot: { label: 'Bering Strait' } },
              { id: 'r1p4', item: { label: 'Canal connecting Atlantic & Pacific', shape: 'long-rect' }, slot: { label: 'Panama Canal' } },
              { id: 'r1p5', item: { label: 'World’s largest archipelago nation', shape: 'wide-short' }, slot: { label: 'Indonesia' } },
              { id: 'r1p6', item: { label: 'Second-largest country by area', shape: 'huge-wide' }, slot: { label: 'Canada!' } },
            ],
            stuckHint: 'Only Russia is bigger than Canada by land area.',
          },
          {
            heading: 'Round 2 · Migration geography',
            intro: 'People move; the map remembers. Match each term.',
            pairs: [
              { id: 'r2p1', item: { label: 'Diaspora', shape: 'wide-short' }, slot: { label: 'A community spread far from its homeland' } },
              { id: 'r2p2', item: { label: 'Push factor', shape: 'small-square' }, slot: { label: 'A reason people leave (war, drought)' } },
              { id: 'r2p3', item: { label: 'Pull factor', shape: 'small-square' }, slot: { label: 'A reason people come (jobs, safety, family)' } },
              { id: 'r2p4', item: { label: 'First-generation Canadian', shape: 'wide-short' }, slot: { label: 'Born elsewhere, immigrated here' } },
              { id: 'r2p5', item: { label: 'Toronto’s nickname re: diversity', shape: 'wide-short' }, slot: { label: '“The world in one city”' } },
            ],
            stuckHint: 'Push = away from home. Pull = toward the new place.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ============================================================
 * CH7 M2 — Stories of coming to Canada · Tessa
 * ============================================================ */

export const CH7_M2_STORIES: Mission = {
  id: 'act2.ch7.m2.stories',
  chapterId: 'act2.ch7',
  lead: 'tessa',
  subjects: ['history', 'reading'],
  skillTags: ['history.immigration', 'reading.comprehension'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa here. For the family project, I interviewed our neighbours about how their families came to Canada. Everyone has a story.' },
        { text: 'Listen to each little story and answer the questions — then play a pattern game with me!' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Mrs. Chen’s story',
            intro: '“My grandparents came from China by ship long ago. They opened a small restaurant. My grandmother saved her first dollar — we still have it in a frame.”',
            questions: [
              { id: 'q1', question: 'How did Mrs. Chen’s grandparents travel to Canada?', visual: '🇨🇳➡️🇨🇦', options: ['By ship', 'By plane', 'By train', 'By car'], correctIndex: 0, explanation: 'Long ago, most people crossed the ocean by ship — planes came later.', hint: 'Read the first sentence again.' },
              { id: 'q2', question: 'What did they open?', options: ['A school', 'A restaurant', 'A bank', 'A farm'], correctIndex: 1, explanation: 'A small restaurant — many newcomers started family businesses.', hint: 'Where do you eat?' },
              { id: 'q3', question: 'What does the framed dollar tell us?', visual: '🖼️💵', options: ['They were rich', 'That first earnings were special and worth remembering', 'Money was bigger then', 'Frames were cheap'], correctIndex: 1, explanation: 'Keeping the first dollar shows how proud and hopeful that moment was.', hint: 'Why keep something so small so carefully?' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Mr. Osei’s story',
            intro: '“I came from Ghana fifteen years ago to study engineering. It was January. I had never seen snow — I phoned my mother from the airport just to describe it!”',
            questions: [
              { id: 'q1', question: 'Why did Mr. Osei come to Canada?', visual: '🇬🇭➡️🇨🇦', options: ['For a vacation', 'To study engineering', 'To see snow', 'To play hockey'], correctIndex: 1, explanation: 'He came to study — many people immigrate for education.', hint: 'What was he going to learn?' },
              { id: 'q2', question: 'What surprised him at the airport?', options: ['The food', 'The snow', 'The size', 'The music'], correctIndex: 1, explanation: 'His first snow ever! He had to tell his mother right away.', hint: 'It was January in Canada…' },
              { id: 'q3', question: 'Who did he phone?', visual: '🛬', options: ['His teacher', 'His mother', 'A taxi', 'The weather office'], correctIndex: 1, explanation: 'His mother, back in Ghana — sharing the moment across the ocean.', hint: 'Family first.' },
            ],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Story patterns',
            intro: 'Stories have patterns too! Figure out what comes next in each of mine.',
            items: [
              {
                id: 'p1',
                prompt: 'First I read a story, then I write one down. What comes next?',
                sequence: ['📖', '✏️', '📖', '✏️', '📖'],
                options: ['📖', '✏️', '🎨', '📚'],
                correctIndex: 1,
                hint: 'Read, write, read, write…',
                explanation: 'The pattern takes turns: after 📖 comes ✏️.',
              },
              {
                id: 'p2',
                prompt: 'We’re spelling our country’s name, one letter at a time! Which letter comes next?',
                sequence: ['C', 'A', 'N', 'A', 'D'],
                options: ['A', 'N', 'C', 'D'],
                correctIndex: 0,
                hint: 'Say it slowly: C-A-N-A-D…',
                explanation: 'C-A-N-A-D-A — the last letter is A. That spells CANADA!',
              },
              {
                id: 'p3',
                prompt: 'Long ago families came by ship; now most come by plane. What comes next?',
                sequence: ['🚢', '✈️', '🚢', '✈️', '🚢'],
                options: ['🚢', '🚂', '✈️', '🚗'],
                correctIndex: 2,
                hint: 'Ship, plane, ship, plane…',
                explanation: 'The pattern takes turns, so ✈️ is next.',
              },
              {
                id: 'p4',
                prompt: 'Grandma, baby, grandma, baby… who comes next in the photo line?',
                sequence: ['👵', '👶', '👵', '👶', '👵'],
                options: ['👵', '👶', '🧑', '👴'],
                correctIndex: 1,
                hint: 'The photos take turns: old, young, old, young…',
                explanation: 'After 👵 comes 👶 — the pattern repeats in twos.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. I’m writing the school-paper feature on family journeys. Real stories, carefully read.' },
        { text: 'Two longer stories with questions that need real thinking — then pattern puzzles from the newspaper archive.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · The Rossi family',
            intro: '“After the war, my great-grandfather left Italy with one suitcase and a letter from his cousin in Toronto promising work in construction. He helped build the subway — every time we ride it, my dad knocks the wall twice, for luck and for him.”',
            questions: [
              { id: 'q1', question: 'What brought the great-grandfather specifically to Toronto?', visual: '🇮🇹➡️🇨🇦', options: ['Random chance', 'A cousin’s letter promising work', 'A government order', 'A construction prize'], correctIndex: 1, explanation: 'Family networks — “chain migration” — often decided WHERE people landed.', hint: 'What did the cousin send?' },
              { id: 'q2', question: '“One suitcase” suggests the family left…', visual: '🧳', options: ['With almost everything they owned', 'With very little', 'By accident', 'Temporarily'], correctIndex: 1, explanation: 'One suitcase for a whole new life tells you how much was left behind.', hint: 'How much fits in one suitcase?' },
              { id: 'q3', question: 'Knocking the subway wall twice is best described as…', visual: '🚇', options: ['A safety check', 'A family ritual of remembrance', 'A complaint', 'A building inspection'], correctIndex: 1, explanation: 'A small ritual keeps the family’s story alive in an everyday place.', hint: '"For luck and for him."' },
              { id: 'q4', question: 'When did this migration likely happen?', options: ['1860s', 'Just after a war — mid-1900s', 'Last year', '1700s'], correctIndex: 1, explanation: '“After the war” + subway construction points to post-WWII Toronto, when many Italians immigrated.', hint: 'Toronto’s subway opened in 1954.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Amal’s story',
            intro: '“We arrived from Syria when I was seven. A group of strangers had signed papers to sponsor us — they met us at the airport holding a sign with our names spelled almost right. Those strangers are now the people we call on snow days, birthdays, everything.”',
            questions: [
              { id: 'q1', question: 'Who met Amal’s family at the airport?', visual: '🛬🪧', options: ['Government officials', 'Private sponsors — ordinary Canadians', 'Old friends', 'Nobody'], correctIndex: 1, explanation: 'Canada’s private sponsorship program lets groups of citizens support refugee families directly.', hint: '“Strangers had signed papers…”' },
              { id: 'q2', question: '“Spelled almost right” adds what to the story?', options: ['Anger', 'A warm, human, imperfect detail', 'Confusion about identity', 'Nothing'], correctIndex: 1, explanation: 'The imperfect sign makes the welcome feel real — caring, even when not flawless.', hint: 'How does that detail make you feel?' },
              { id: 'q3', question: 'The strangers becoming “snow day people” shows…', options: ['They moved in', 'Sponsorship grew into lasting friendship', 'Snow is dangerous', 'They were paid'], correctIndex: 1, explanation: 'The relationship outlived the paperwork — that’s the heart of the story.', hint: 'Who do YOU call on a snow day?' },
              { id: 'q4', question: 'Amal’s story is told from the view of…', options: ['A sponsor', 'A child who lived it, now older', 'A reporter', 'A pilot'], correctIndex: 1, explanation: 'First person, remembering being seven — a lived memory, not an observer’s report.', hint: 'Who says “we arrived”?' },
            ],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Archive patterns',
            intro: 'Sorting the newspaper archive for my feature, I keep spotting patterns. Finish each one.',
            items: [
              {
                id: 'p1',
                prompt: 'The archive keeps one family photo every 20 years. Which year is next?',
                sequence: ['1904', '1924', '1944', '1964'],
                options: ['1974', '1984', '1994', '2004'],
                correctIndex: 1,
                hint: 'Add 20 each time.',
                explanation: '1964 + 20 = 1984.',
              },
              {
                id: 'p2',
                prompt: 'Your family tree doubles every generation back: you, parents, grandparents… What number comes next?',
                sequence: ['1', '2', '4', '8'],
                options: ['10', '12', '16', '24'],
                correctIndex: 2,
                hint: 'Each number is double the one before.',
                explanation: '8 × 2 = 16 great-great-grandparents — the tree doubles every step back!',
              },
              {
                id: 'p3',
                prompt: 'The oldest files are labelled backwards through the alphabet, skipping a letter. Which label comes next?',
                sequence: ['Z', 'X', 'V', 'T'],
                options: ['S', 'R', 'Q', 'P'],
                correctIndex: 1,
                hint: 'Go backwards and skip one letter each time.',
                explanation: 'Z, X, V, T… skip S and land on R.',
              },
              {
                id: 'p4',
                prompt: 'The photo display cycles: grandmother, mother, daughter. Who comes next?',
                sequence: ['👵', '👩', '👧', '👵', '👩'],
                options: ['👧', '👵', '👩', '👶'],
                correctIndex: 0,
                hint: 'Three generations repeat in the same order.',
                explanation: 'The cycle is 👵 👩 👧 — the daughter 👧 is next.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. The feature needs context: the real history of who came to Canada, when, and under what rules. Some of it is proud, some uncomfortable — good journalism holds both.' },
        { text: 'Round 1: waves of immigration. Round 2: reading sources critically.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Waves of arrival',
            intro: 'Canada’s population story, era by era.',
            questions: [
              { id: 'q1', question: 'Before any immigrants arrived, Canada was home to…', options: ['No one', 'Indigenous peoples, for thousands of years', 'Only animals', 'Vikings only'], correctIndex: 1, explanation: 'First Nations, Inuit, and later Métis peoples — here for millennia before European settlement.', hint: 'Whose land was it first?' },
              { id: 'q2', question: 'The Canadian Pacific Railway (1880s) was built with major labour from…', visual: '🚂🏔️', options: ['Chinese workers, often dangerously underpaid', 'Only local farmers', 'Steam robots', 'British nobility'], correctIndex: 0, explanation: 'Thousands of Chinese labourers did the most dangerous work for less pay — and then faced a head tax designed to keep families out.', hint: 'A hard truth of the national-dream story.' },
              { id: 'q3', question: 'In the early 1900s, the Prairies filled with homesteads farmed largely by…', visual: '🌾', options: ['Eastern European immigrants (Ukrainians and others)', 'Australians', 'No one', 'Coastal fishers'], correctIndex: 0, explanation: 'Free-land policies drew huge Ukrainian, Polish, and German settlement to the Prairies — hence the perogies.', hint: 'Why does Saskatchewan love perogies?' },
              { id: 'q4', question: 'The points system (1967) changed immigration by…', options: ['Closing the borders', 'Selecting on skills/education rather than country of origin', 'Allowing only doctors', 'Requiring French only'], correctIndex: 1, explanation: 'It replaced openly discriminatory country-based rules with criteria like education and language — reshaping who could come.', hint: 'From “where from?” to “what can you do?”' },
              { id: 'q5', question: 'Today, roughly what share of Torontonians were born outside Canada?', visual: '🏙️', options: ['About 10%', 'About 25%', 'Nearly half', 'Almost none'], correctIndex: 2, explanation: 'Close to half — among the highest of any major city in the world.', hint: 'We compared this to Queens, NY on our last trip.' },
            ],
          },
          {
            heading: 'Round 2 · Reading sources critically',
            intro: 'My feature quotes documents and memories. Both need care.',
            questions: [
              { id: 'q1', question: 'A 1910 newspaper calls some immigrants “undesirable.” A careful writer treats this as…', options: ['A fact about those immigrants', 'Evidence of the era’s attitudes and biases', 'Proof newspapers lie', 'Unusable'], correctIndex: 1, explanation: 'It’s a primary source about the PREJUDICE of the time, not about the people it described.', hint: 'What does the word reveal, and about whom?' },
              { id: 'q2', question: 'Grandpa remembers the ship as “enormous”; the records say it was small. Best handling?', visual: '🚢', options: ['Trust the records, mock the memory', 'Report both: memory captures experience, records capture measurements', 'Trust the memory only', 'Delete the detail'], correctIndex: 1, explanation: 'To a child leaving home, any ship is enormous. Both sources are true about different things.', hint: 'What was each source measuring?' },
              { id: 'q3', question: 'Why include hard stories (head tax, turned-away ships) in a family-history feature?', options: ['Drama sells', 'Honest history builds real understanding; leaving them out distorts the picture', 'To assign blame to readers', 'No reason'], correctIndex: 1, explanation: 'Celebrating arrivals while erasing barriers tells a half-story. Honest framing respects the people who lived it.', hint: 'What would the half-story miss?' },
              { id: 'q4', question: 'An interviewee asks you not to print her real name. You should…', options: ['Print it anyway — facts are facts', 'Respect it and note the name was withheld', 'Cancel the story', 'Make up quotes instead'], correctIndex: 1, explanation: 'Journalistic ethics: protect sources, disclose the protection. Trust is the whole game.', hint: 'What would YOU want if it were your story?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH7 M3 — Plan the heritage trip · Dada T (path-planner!)
 * ============================================================ */

export const CH7_M3_ROUTE: Mission = {
  id: 'act2.ch7.m3.route',
  chapterId: 'act2.ch7',
  lead: 'dada_t',
  subjects: ['geography', 'math'],
  skillTags: ['geo.routes', 'math.optimization'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Dada T! The family project ends with a pretend trip to visit relatives. I drew a little map.' },
        { text: 'Tap the dots to make a path from home to the star. Watch the numbers — they’re kilometres!' },
      ],
      pattern: 'path-planner',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Visit Auntie',
            intro: 'Get from Home to Auntie’s house. Keep the trip to 10 km or less!',
            nodes: [
              { id: 'home', label: 'Home', x: 80, y: 170 },
              { id: 'park', label: 'Park', x: 250, y: 80 },
              { id: 'store', label: 'Store', x: 250, y: 260 },
              { id: 'auntie', label: 'Auntie’s', x: 450, y: 170 },
            ],
            edges: [
              { from: 'home', to: 'park', cost: 4 },
              { from: 'home', to: 'store', cost: 3 },
              { from: 'park', to: 'auntie', cost: 7 },
              { from: 'store', to: 'auntie', cost: 5 },
            ],
            startId: 'home',
            goalId: 'auntie',
            objective: { budget: 10 },
            costUnit: 'km',
          },
          {
            heading: 'Round 2 · The shortest way to Grandpa',
            intro: 'Now find the SHORTEST possible route to Grandpa’s.',
            nodes: [
              { id: 'home', label: 'Home', x: 80, y: 170 },
              { id: 'bridge', label: 'Bridge', x: 230, y: 70 },
              { id: 'farm', label: 'Farm', x: 230, y: 270 },
              { id: 'mill', label: 'Old Mill', x: 380, y: 170 },
              { id: 'grandpa', label: 'Grandpa’s', x: 520, y: 170 },
            ],
            edges: [
              { from: 'home', to: 'bridge', cost: 3 },
              { from: 'home', to: 'farm', cost: 2 },
              { from: 'bridge', to: 'mill', cost: 4 },
              { from: 'farm', to: 'mill', cost: 6 },
              { from: 'mill', to: 'grandpa', cost: 2 },
              { from: 'bridge', to: 'grandpa', cost: 8 },
            ],
            startId: 'home',
            goalId: 'grandpa',
            objective: 'min',
            costUnit: 'km',
          },
        ],
      } satisfies PathPlannerMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Dada T. Planning the heritage-visit route across Ontario — every stop is a relative, every number is real driving distance (×10 km).' },
        { text: 'Find the best routes, then check my trip math at the kitchen table. A good planner checks more than one way!' },
      ],
      pattern: 'path-planner',
      params: {
        rounds: [
          {
            kind: 'path-planner',
            heading: 'Round 1 · Cheapest route to Ottawa cousins',
            intro: 'Find the SHORTEST route from Toronto to the cousins in Ottawa.',
            nodes: [
              { id: 'toronto', label: 'Toronto', x: 70, y: 250 },
              { id: 'oshawa', label: 'Oshawa', x: 200, y: 290 },
              { id: 'peterb', label: 'Peterborough', x: 230, y: 150 },
              { id: 'kingston', label: 'Kingston', x: 400, y: 270 },
              { id: 'perth', label: 'Perth', x: 430, y: 120 },
              { id: 'ottawa', label: 'Ottawa', x: 540, y: 170 },
            ],
            edges: [
              { from: 'toronto', to: 'oshawa', cost: 6 },
              { from: 'toronto', to: 'peterb', cost: 13 },
              { from: 'oshawa', to: 'kingston', cost: 20 },
              { from: 'oshawa', to: 'peterb', cost: 9 },
              { from: 'peterb', to: 'perth', cost: 21 },
              { from: 'kingston', to: 'ottawa', cost: 20 },
              { from: 'perth', to: 'ottawa', cost: 8 },
              { from: 'kingston', to: 'perth', cost: 9 },
            ],
            startId: 'toronto',
            goalId: 'ottawa',
            objective: 'min',
            costUnit: '×10 km',
          },
          {
            kind: 'path-planner',
            heading: 'Round 2 · Gas budget to Windsor',
            intro: 'Great-Uncle in Windsor. Fuel budget: $58. Each number is dollars of gas.',
            nodes: [
              { id: 'toronto', label: 'Toronto', x: 520, y: 120 },
              { id: 'hamilton', label: 'Hamilton', x: 420, y: 230 },
              { id: 'kitchener', label: 'Kitchener', x: 330, y: 110 },
              { id: 'london', label: 'London', x: 250, y: 220 },
              { id: 'chatham', label: 'Chatham', x: 140, y: 280 },
              { id: 'windsor', label: 'Windsor', x: 60, y: 180 },
            ],
            edges: [
              { from: 'toronto', to: 'hamilton', cost: 10 },
              { from: 'toronto', to: 'kitchener', cost: 14 },
              { from: 'hamilton', to: 'london', cost: 16 },
              { from: 'kitchener', to: 'london', cost: 13 },
              { from: 'london', to: 'chatham', cost: 14 },
              { from: 'london', to: 'windsor', cost: 26 },
              { from: 'chatham', to: 'windsor', cost: 8 },
              { from: 'hamilton', to: 'chatham', cost: 38 },
            ],
            startId: 'toronto',
            goalId: 'windsor',
            objective: { budget: 58 },
            costUnit: '$',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Trip math at the kitchen table',
            intro: 'Dada T double-checks the distances before anyone gets in the van. Work these out and type each answer.',
            items: [
              {
                id: 'w1',
                visual: '🚐🗺️',
                problem: 'From Toronto it is 260 km to Kingston, then 200 km more to Ottawa. How long is the whole drive to the cousins?',
                answer: 460,
                unit: 'km',
                hint: 'Add the two legs of the trip.',
                explanation: '260 + 200 = 460 km door to door.',
              },
              {
                id: 'w2',
                visual: '🛣️🛣️',
                problem: 'To Great-Uncle in Windsor, the route through London is 370 km and the route through Chatham is 350 km. How many kilometres does the shorter route save?',
                answer: 20,
                unit: 'km',
                hint: 'Find the difference between the two routes.',
                explanation: '370 − 350 = 20 km saved — and Chatham has Dada T’s favourite chip truck.',
              },
              {
                id: 'w3',
                visual: '🚐⏱️',
                problem: 'The van travels about 80 km each hour on the highway. How many hours does a 400 km trip take?',
                answer: 5,
                unit: 'hours',
                hint: 'How many 80s fit into 400?',
                explanation: '400 ÷ 80 = 5 hours — snack stops not included.',
              },
              {
                id: 'w4',
                visual: '⛽🧮',
                problem: 'The van uses 10 L of gas for every 100 km. How many litres does the 400 km trip use?',
                answer: 40,
                unit: 'L',
                hint: 'How many hundreds of kilometres is 400?',
                explanation: '400 km is 4 hundreds, and 4 × 10 = 40 L.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Dada T. The full heritage tour: multiple cities, real trade-offs, and decoy routes that LOOK fast. Optimization is a skill — let’s sharpen it.' },
        { text: 'Both rounds demand the true optimum. Compare totals before you commit.' },
      ],
      pattern: 'path-planner',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The decoy highway',
            intro: 'Shortest route, in minutes. Warning: the obvious road isn’t the best one.',
            nodes: [
              { id: 'start', label: 'Home', x: 70, y: 170 },
              { id: 'hwy1', label: 'Highway Jct', x: 220, y: 80 },
              { id: 'town1', label: 'Milverton', x: 210, y: 260 },
              { id: 'hwy2', label: 'Service Ctr', x: 380, y: 70 },
              { id: 'town2', label: 'Ayr', x: 370, y: 250 },
              { id: 'goal', label: 'Family Farm', x: 530, y: 160 },
            ],
            edges: [
              { from: 'start', to: 'hwy1', cost: 12 },
              { from: 'start', to: 'town1', cost: 18 },
              { from: 'hwy1', to: 'hwy2', cost: 14 },
              { from: 'town1', to: 'town2', cost: 16 },
              { from: 'hwy2', to: 'goal', cost: 25 },
              { from: 'town2', to: 'goal', cost: 11 },
              { from: 'hwy1', to: 'town2', cost: 30 },
              { from: 'town1', to: 'hwy2', cost: 35 },
            ],
            startId: 'start',
            goalId: 'goal',
            objective: 'min',
            costUnit: 'min',
          },
          {
            heading: 'Round 2 · Seven stops, one optimum',
            intro: 'The grand tour graph. Find the absolute cheapest route in dollars.',
            nodes: [
              { id: 'a', label: 'Home', x: 60, y: 170 },
              { id: 'b', label: 'Guelph', x: 180, y: 70 },
              { id: 'c', label: 'Galt', x: 180, y: 270 },
              { id: 'd', label: 'Woodstock', x: 310, y: 170 },
              { id: 'e', label: 'Ingersoll', x: 420, y: 70 },
              { id: 'f', label: 'St. Marys', x: 420, y: 270 },
              { id: 'g', label: 'Reunion!', x: 540, y: 170 },
            ],
            edges: [
              { from: 'a', to: 'b', cost: 9 },
              { from: 'a', to: 'c', cost: 7 },
              { from: 'b', to: 'd', cost: 11 },
              { from: 'c', to: 'd', cost: 12 },
              { from: 'b', to: 'e', cost: 24 },
              { from: 'd', to: 'e', cost: 9 },
              { from: 'd', to: 'f', cost: 8 },
              { from: 'e', to: 'g', cost: 10 },
              { from: 'f', to: 'g', cost: 13 },
              { from: 'c', to: 'f', cost: 23 },
            ],
            startId: 'a',
            goalId: 'g',
            objective: 'min',
            costUnit: '$',
          },
        ],
      } satisfies PathPlannerMissionParams,
    },
  },
};

/* ============================================================
 * CH8 M1 — Weather watch · Tessa
 * ============================================================ */

export const CH8_M1_WEATHER: Mission = {
  id: 'act2.ch8.m1.weather',
  chapterId: 'act2.ch8',
  lead: 'tessa',
  subjects: ['science', 'math'],
  skillTags: ['science.weather', 'math.data.charts'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa here. A BIG storm is coming this week, so I set up a weather station on the porch!' },
        { text: 'Round 1: weather words. Round 2: reading my measurements. Round 3: sky patterns.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · Weather words',
            intro: 'Know your sky.',
            questions: [
              { id: 'q1', question: 'A thermometer measures…', options: ['Wind', 'Rain', 'Temperature', 'Clouds'], correctIndex: 2, explanation: 'Thermometers track how hot or cold it is.', hint: '"Thermo" means heat.' },
              { id: 'q2', question: 'Big, dark, towering clouds usually mean…', options: ['Sunshine', 'A storm is coming', 'Snow only', 'Nothing'], correctIndex: 1, explanation: 'Tall dark clouds (cumulonimbus!) are storm factories.', hint: 'What colour is a storm sky?' },
              { id: 'q3', question: 'A rain gauge collects rain so we can measure…', visual: '🌧️', options: ['How wet it tastes', 'How much fell', 'Cloud names', 'Wind speed'], correctIndex: 1, explanation: 'It catches rain in a tube marked in millimetres.', hint: 'It’s like a measuring cup for the sky.' },
              { id: 'q4', question: 'Thunder is the SOUND made by…', options: ['Clouds bumping', 'Lightning heating the air', 'Rain hitting roofs', 'The wind'], correctIndex: 1, explanation: 'Lightning superheats air so fast it booms outward — that’s thunder.', hint: 'Light first, sound after.' },
              { id: 'q5', question: 'If you see lightning, the safest place is…', visual: '⛈️', options: ['Under a tall tree', 'Inside a building', 'In the pool', 'On the trampoline'], correctIndex: 1, explanation: 'Indoors, away from tall trees and water. (The trampoline can wait!)', hint: 'NOT under the tallest thing around.' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Read my weather chart',
            intro: 'My porch readings this week: Mon 18°, Tue 21°, Wed 15°, Thu 12°, Fri 9°.',
            questions: [
              { id: 'q1', question: 'Which day was warmest?', visual: '📊', options: ['Monday', 'Tuesday', 'Wednesday', 'Friday'], correctIndex: 1, explanation: 'Tuesday hit 21° — the top of the chart.', hint: 'Find the biggest number.' },
              { id: 'q2', question: 'Which day was coldest?', options: ['Monday', 'Wednesday', 'Thursday', 'Friday'], correctIndex: 3, explanation: 'Friday, at 9° — the storm brought the cold.', hint: 'Find the smallest number.' },
              { id: 'q3', question: 'From Tuesday to Friday the temperature…', options: ['Went up', 'Went down', 'Stayed the same', 'Jumped around'], correctIndex: 1, explanation: '21 → 15 → 12 → 9: falling all the way as the storm came in.', hint: 'Follow the numbers in order.' },
              { id: 'q4', question: 'How much colder was Friday than Monday?', options: ['7°', '9°', '11°', '3°'], correctIndex: 1, explanation: '18 − 9 = 9 degrees colder.', hint: 'Monday minus Friday.' },
              { id: 'q5', question: 'Falling temperature + dark clouds + rising wind means…', options: ['Beach day', 'The storm is almost here', 'Nothing', 'Time to water the garden'], correctIndex: 1, explanation: 'All three signs together = storm on the way. Batten down!', hint: 'Three storm clues at once.' },
            ],
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Sky patterns',
            intro: 'I noticed the sky repeats itself! What comes next in each pattern?',
            items: [
              {
                id: 'p1',
                prompt: 'Sunny, rainy, sunny, rainy… what comes next?',
                sequence: ['☀️', '🌧️', '☀️', '🌧️', '☀️'],
                options: ['☀️', '🌧️', '❄️', '🌈'],
                correctIndex: 1,
                hint: 'The sky takes turns: sun, rain, sun, rain…',
                explanation: 'After ☀️ comes 🌧️ — the pattern repeats in twos.',
              },
              {
                id: 'p2',
                prompt: 'My storm log goes: cloud, cloud, storm. What comes next?',
                sequence: ['☁️', '☁️', '⛈️', '☁️', '☁️', '⛈️', '☁️'],
                options: ['⛈️', '☁️', '☀️', '🌧️'],
                correctIndex: 1,
                hint: 'The repeating chunk is cloud–cloud–storm. How many clouds so far in this chunk?',
                explanation: 'Each chunk is ☁️☁️⛈️ — only one cloud so far, so another ☁️ comes before the storm.',
              },
              {
                id: 'p3',
                prompt: 'The clouds grow thicker every hour. What happens next?',
                sequence: ['🌤️', '⛅', '🌥️', '☁️'],
                options: ['🌧️', '☀️', '🌤️', '🌈'],
                correctIndex: 0,
                hint: 'The sun is disappearing and the cloud keeps growing…',
                explanation: 'When clouds grow thick and dark enough, the rain 🌧️ falls.',
              },
              {
                id: 'p4',
                prompt: 'Day, night, day, night… what comes next?',
                sequence: ['🌞', '🌙', '🌞', '🌙', '🌞'],
                options: ['🌞', '🌙', '⭐', '☁️'],
                correctIndex: 1,
                hint: 'What always follows the day?',
                explanation: 'Night follows day — 🌙 is next, every single time.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. Storm week, day three. My weather station logs temperature, pressure, wind, and rain — and the data tells a story.' },
        { text: 'Round 1: how weather works. Round 2: data analysis. Round 3: storm math with no multiple choice.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            kind: 'quiz',
            heading: 'Round 1 · How storms work',
            intro: 'The machinery behind the weather.',
            questions: [
              { id: 'q1', question: 'Falling air pressure usually signals…', options: ['Clearing skies', 'Approaching storms', 'No change', 'Colder nights only'], correctIndex: 1, explanation: 'Storms are low-pressure systems — a falling barometer is the classic warning.', hint: 'What does a barometer drop mean?' },
              { id: 'q2', question: 'Wind is caused by…', options: ['Trees waving', 'Air moving from high to low pressure', 'The Earth breathing', 'Clouds pushing'], correctIndex: 1, explanation: 'Air flows from high-pressure areas toward low-pressure ones — that flow is wind.', hint: 'Air moves from squeeze to space.' },
              { id: 'q3', question: 'Thunderstorms get their energy from…', options: ['Warm, moist air rising', 'Cold dry ground', 'The moon', 'Traffic'], correctIndex: 0, explanation: 'Rising warm humid air builds the towering clouds that power storms.', hint: 'Storms love hot, sticky days.' },
              { id: 'q4', question: 'You count 6 seconds between lightning and thunder. The strike is about…', visual: '⚡👂', options: ['6 km away', '2 km away', '600 m away', 'Right overhead'], correctIndex: 1, explanation: 'Sound travels about 1 km every 3 seconds: 6 ÷ 3 = 2 km.', hint: 'Divide the seconds by 3.' },
              { id: 'q5', question: 'Environment Canada issues a storm WARNING vs a WATCH when…', options: ['They’re identical', 'Warning = severe weather is happening or imminent; watch = conditions are favourable', 'Watch is worse', 'Warnings are only for winter'], correctIndex: 1, explanation: 'Watch = be ready; warning = it’s here or about to be. Warning is the more urgent one.', hint: 'Which one means “now”?' },
            ],
          },
          {
            kind: 'quiz',
            heading: 'Round 2 · Storm-week data',
            intro: 'Rainfall (mm): Mon 2, Tue 0, Wed 14, Thu 38, Fri 11. Wind peak: 72 km/h Thursday.',
            questions: [
              { id: 'q1', question: 'Total rainfall for the week?', visual: '🌧️📊', options: ['55 mm', '65 mm', '75 mm', '38 mm'], correctIndex: 1, explanation: '2 + 0 + 14 + 38 + 11 = 65 mm.', hint: 'Add all five days.' },
              { id: 'q2', question: 'Mean (average) daily rainfall?', options: ['11 mm', '13 mm', '15 mm', '38 mm'], correctIndex: 1, explanation: '65 ÷ 5 = 13 mm/day.', hint: 'Total ÷ 5.' },
              { id: 'q3', question: 'Thursday’s share of the week’s rain is closest to…', options: ['38%', '46%', '58%', '65%'], correctIndex: 2, explanation: '38/65 ≈ 0.58 → 58%. One day brought more than half the rain!', hint: '38 out of 65.' },
              { id: 'q4', question: 'The best chart for showing rainfall day-by-day is a…', options: ['Pie chart', 'Bar chart', 'Single number', 'Scatter plot of one point'], correctIndex: 1, explanation: 'Bars compare amounts across categories (days) clearly.', hint: 'One bar per day.' },
              { id: 'q5', question: '72 km/h winds can snap branches. Before the peak, the family should…', options: ['Open all windows', 'Secure loose yard items (trampoline!) and charge phones', 'Go for a drive', 'Water the lawn'], correctIndex: 1, explanation: 'Storm prep: secure what can fly, charge what might be needed, stay indoors at the peak.', hint: 'What in OUR yard could blow away?' },
            ],
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Storm math',
            intro: 'No answer choices here — work each one out from my weather-station log and type the number.',
            items: [
              {
                id: 'w1',
                visual: '🌡️📋',
                problem: 'My porch thermometer read 21 °C on Tuesday and only 9 °C on Friday. How many degrees did the temperature drop?',
                answer: 12,
                unit: '°C',
                hint: 'Subtract Friday’s reading from Tuesday’s.',
                explanation: '21 − 9 = 12 degrees colder as the storm moved in.',
              },
              {
                id: 'w2',
                visual: '🌧️🌧️',
                problem: 'My rain gauge caught 14 mm on Wednesday and 38 mm on Thursday. How much rain fell over the two days?',
                answer: 52,
                unit: 'mm',
                hint: 'Add the two days together.',
                explanation: '14 + 38 = 52 mm in two soggy days.',
              },
              {
                id: 'w3',
                visual: '🏆🌧️',
                problem: 'Thursday dropped 38 mm of rain. The record for that date is 41 mm. How many more millimetres would have TIED the record?',
                answer: 3,
                unit: 'mm',
                hint: 'How far is 38 from 41?',
                explanation: '41 − 38 = 3 mm short of the record. So close!',
              },
              {
                id: 'w4',
                visual: '🌙🌡️',
                problem: 'Overnight the temperature fell from 6 °C down to −3 °C. How many degrees did it fall?',
                answer: 9,
                unit: '°C',
                hint: 'Count down from 6 to 0, then keep going to −3.',
                explanation: '6 down to 0 is 6 degrees, then 0 down to −3 is 3 more: 6 + 3 = 9 degrees.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. I’m writing the storm up for the school paper with real meteorology: fronts, pressure systems, and climate context.' },
        { text: 'Round 1: weather systems. Round 2: data, trends, and careful claims.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Systems and fronts',
            intro: 'The synoptic view.',
            questions: [
              { id: 'q1', question: 'A cold front passing typically brings…', options: ['Slow drizzle for days', 'A sharp line of storms, then cooler clearing air', 'Instant heat', 'No weather change'], correctIndex: 1, explanation: 'Cold air wedges under warm air, forcing violent lifting — brief intense storms, then cool and clear.', hint: 'Sharp, fast, dramatic.' },
              { id: 'q2', question: 'In the Northern Hemisphere, air around a low-pressure system circulates…', options: ['Clockwise', 'Counter-clockwise', 'Straight down', 'Randomly'], correctIndex: 1, explanation: 'The Coriolis effect spins northern lows counter-clockwise.', hint: 'Opposite to a clock up here.' },
              { id: 'q3', question: 'Lake Ontario affects Toronto’s storms by…', visual: '🌊🏙️', options: ['Blocking all rain', 'Moderating temperature and feeding moisture', 'Creating deserts', 'Nothing'], correctIndex: 1, explanation: 'Big water bodies damp temperature swings and add humidity — lake-effect weather is real.', hint: 'We covered the lake effect on the Kingston drive.' },
              { id: 'q4', question: 'Humidex measures…', options: ['Wind + cold', 'How hot it FEELS with humidity', 'Rain volume', 'Cloud height'], correctIndex: 1, explanation: 'Humidity blocks sweat evaporation, so 30° humid feels far worse — humidex captures that.', hint: 'Its winter cousin is wind chill.' },
              { id: 'q5', question: 'A 30% chance of rain means…', options: ['It will rain 30% of the day', '3 in 10 forecasts like this produce rain at your location', '30% of the city gets wet', 'Light rain only'], correctIndex: 1, explanation: 'It’s a probability across similar forecast situations — not a schedule or a coverage map.', hint: 'It’s about probability, not duration.' },
            ],
          },
          {
            heading: 'Round 2 · Claims and evidence',
            intro: 'The data: this storm dropped 38 mm in one day. The record for the date was 41 mm (1954).',
            questions: [
              { id: 'q1', question: 'Accurate headline for my article?', visual: '📰', options: ['“Biggest storm in history!”', '“Storm nears 70-year-old daily record”', '“Rain falls”', '“Climate apocalypse arrives”'], correctIndex: 1, explanation: 'Precise and checkable: near the record, not past it. Accuracy beats drama.', hint: '38 vs 41 — did we break it?' },
              { id: 'q2', question: 'One big storm proves the climate is changing: true?', options: ['Yes, obviously', 'No — single events are weather; climate claims need long-term trends', 'Yes if it rains again', 'Climate never changes'], correctIndex: 1, explanation: 'Climate = decades of statistics. Scientists link trends (more frequent extremes), not single storms, to climate change.', hint: 'Weather is a day; climate is a generation.' },
              { id: 'q3', question: 'My pressure log fell 12 hPa in 6 hours before the storm. As evidence, this is…', options: ['Useless', 'A textbook leading indicator worth charting', 'Proof of a hurricane', 'A sensor error for sure'], correctIndex: 1, explanation: 'A steep pressure fall is classic storm-approach data — great for the article’s chart.', hint: 'Remember Round 1, Q1.' },
              { id: 'q4', question: 'To compare this storm to history, the BEST source is…', options: ['A neighbour’s memory', 'Environment Canada’s historical climate data', 'A movie', 'One tweet'], correctIndex: 1, explanation: 'Official long-term records beat anecdotes for quantitative comparisons.', hint: 'Who keeps the measurements?' },
              { id: 'q5', question: 'My y-axis for daily rain (0–40 mm) should start at…', options: ['30 mm to make bars dramatic', '0 mm, for honest proportions', '38 mm', 'Wherever looks best'], correctIndex: 1, explanation: 'Truncated axes exaggerate differences — we covered this trick at the hockey tournament. Not in MY paper.', hint: 'Remember the misleading-charts round?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * CH8 M2 — The water cycle · Caleb
 * ============================================================ */

export const CH8_M2_WATER: Mission = {
  id: 'act2.ch8.m2.water',
  chapterId: 'act2.ch8',
  lead: 'caleb',
  subjects: ['science'],
  skillTags: ['science.water-cycle', 'science.earth.basic'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Caleb! Where does ALL this rain come from? And where does it GO? I found out and it’s a CIRCLE!' },
        { text: 'Round 1: the water cycle. Round 2: water in our world. Round 3: what comes next in the circle?' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · The water circle',
            intro: 'Match each step of the water cycle to what happens.',
            pairs: [
              { id: 'r1p1', item: { label: 'Evaporation', shape: 'tall-thin' }, slot: { label: 'Sun turns water into vapour going UP' } },
              { id: 'r1p2', item: { label: 'Condensation', shape: 'wide-short' }, slot: { label: 'Vapour cools into clouds' } },
              { id: 'r1p3', item: { label: 'Precipitation', shape: 'tall-thin' }, slot: { label: 'Rain or snow falls DOWN' } },
              { id: 'r1p4', item: { label: 'Collection', shape: 'huge-wide' }, slot: { label: 'Water gathers in lakes and rivers' } },
              { id: 'r1p5', item: { label: 'And then…', shape: 'small-square' }, slot: { label: 'It starts all over again!' } },
            ],
            stuckHint: 'Up (evaporation), clouds (condensation), down (precipitation), gather (collection)!',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Water everywhere',
            intro: 'Match each water fact.',
            pairs: [
              { id: 'r2p1', item: { label: 'Most of Earth’s water is in…', shape: 'huge-wide' }, slot: { label: 'The oceans (salty!)' } },
              { id: 'r2p2', item: { label: 'Clouds are made of…', shape: 'wide-short', emoji: '☁️' }, slot: { label: 'Tiny water droplets' } },
              { id: 'r2p3', item: { label: 'Snow is…', shape: 'small-square', emoji: '❄️' }, slot: { label: 'Frozen water crystals' } },
              { id: 'r2p4', item: { label: 'Puddles disappear because of…', shape: 'small-square', emoji: '💧' }, slot: { label: 'Evaporation' } },
              { id: 'r2p5', item: { label: 'The rain today might once have been…', shape: 'wide-short' }, slot: { label: 'Ocean water far away' } },
            ],
            stuckHint: 'The same water goes around and around — dinosaurs drank it too!',
          },
          {
            kind: 'pattern-puzzle',
            heading: 'Round 3 · Round and round the water goes',
            intro: 'The water circle repeats FOREVER. What comes next?',
            items: [
              {
                id: 'p1',
                prompt: 'Water, cloud, rain, water, cloud… what comes next?',
                sequence: ['💧', '☁️', '🌧️', '💧', '☁️'],
                options: ['🌧️', '☀️', '💧', '❄️'],
                correctIndex: 0,
                hint: 'After the cloud fills up, what falls down?',
                explanation: 'The circle goes 💧 → ☁️ → 🌧️ — the rain falls next, then it starts all over!',
              },
              {
                id: 'p2',
                prompt: 'Sea, sunshine, cloud… the cycle repeats. What comes next?',
                sequence: ['🌊', '☀️', '☁️', '🌊', '☀️'],
                options: ['☁️', '🌊', '🌈', '❄️'],
                correctIndex: 0,
                hint: 'The sun warms the sea — then what forms up in the sky?',
                explanation: 'The sun turns sea water into vapour, and the vapour cools into a ☁️.',
              },
              {
                id: 'p3',
                prompt: 'The rain is getting heavier! What comes next?',
                sequence: ['💧', '💧💧', '💧💧💧'],
                options: ['💧', '💧💧', '💧💧💧💧', '💧💧💧💧💧'],
                correctIndex: 2,
                hint: 'One more drop joins each time.',
                explanation: 'The drops grow by one each step: 1, 2, 3… then 4!',
              },
              {
                id: 'p4',
                prompt: 'Rain, rainbow, rain, rainbow… what comes next?',
                sequence: ['🌧️', '🌈', '🌧️', '🌈', '🌧️'],
                options: ['🌧️', '🌈', '☁️', '☀️'],
                correctIndex: 1,
                hint: 'What do we run outside to look for after the rain?',
                explanation: 'After 🌧️ comes 🌈 — sunshine shining through raindrops makes a rainbow.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Caleb. Storm week made me a water-cycle expert. Did you know rivers are basically the sky’s drainpipes?' },
        { text: 'Round 1: cycle vocabulary. Round 2: watersheds and our Great Lakes. Round 3: rain-barrel math.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            kind: 'drag-match',
            heading: 'Round 1 · Cycle vocabulary',
            intro: 'The scientific terms, matched.',
            pairs: [
              { id: 'r1p1', item: { label: 'Transpiration', shape: 'tall-thin' }, slot: { label: 'Plants releasing water vapour' } },
              { id: 'r1p2', item: { label: 'Runoff', shape: 'long-rect' }, slot: { label: 'Water flowing over land to rivers' } },
              { id: 'r1p3', item: { label: 'Groundwater', shape: 'huge-wide' }, slot: { label: 'Water stored underground' } },
              { id: 'r1p4', item: { label: 'Humidity', shape: 'wide-short' }, slot: { label: 'Water vapour held in the air' } },
              { id: 'r1p5', item: { label: 'Dew', shape: 'small-square' }, slot: { label: 'Vapour condensing on cool grass' } },
              { id: 'r1p6', item: { label: 'Infiltration', shape: 'tall-thin' }, slot: { label: 'Water soaking into soil' } },
            ],
            stuckHint: 'Trees “sweat” too — that’s transpiration.',
          },
          {
            kind: 'drag-match',
            heading: 'Round 2 · Watersheds & Great Lakes',
            intro: 'Where OUR water goes.',
            pairs: [
              { id: 'r2p1', item: { label: 'A watershed is…', shape: 'huge-wide' }, slot: { label: 'All land draining to one waterway' } },
              { id: 'r2p2', item: { label: 'Rain on our Toronto roof drains to…', shape: 'wide-short' }, slot: { label: 'Lake Ontario' } },
              { id: 'r2p3', item: { label: 'The Great Lakes hold about…', shape: 'huge-wide' }, slot: { label: '1/5 of Earth’s fresh surface water' } },
              { id: 'r2p4', item: { label: 'Lake Ontario water exits via…', shape: 'long-rect' }, slot: { label: 'The St. Lawrence to the Atlantic' } },
              { id: 'r2p5', item: { label: 'Storm drains on our street are for…', shape: 'small-square' }, slot: { label: 'Carrying runoff (don’t pour paint in!)' } },
            ],
            stuckHint: 'Everything flows downhill to the lake — including what goes in the drains.',
          },
          {
            kind: 'word-problem',
            heading: 'Round 3 · Rain-barrel math',
            intro: 'Storm week filled every bucket we own. Work these out and type the numbers.',
            items: [
              {
                id: 'w1',
                visual: '🛢️🌧️',
                problem: 'Our rain barrel holds 200 L. It already had 60 L in it, and the storm added 85 L more. How many litres of space are left?',
                answer: 55,
                unit: 'L',
                hint: 'Add what’s in the barrel first, then subtract from 200.',
                explanation: '60 + 85 = 145 L inside, and 200 − 145 = 55 L of space left.',
              },
              {
                id: 'w2',
                visual: '🏠💧',
                problem: 'Each of our 4 downspouts drained 48 L into buckets during the storm. How many litres did they drain in all?',
                answer: 192,
                unit: 'L',
                hint: 'Four groups of 48 — multiply.',
                explanation: '4 × 48 = 192 L of roof water.',
              },
              {
                id: 'w3',
                visual: '☀️💧',
                problem: 'A giant 18 L puddle shrinks by 3 L every hour once the sun comes out. How many hours until it has evaporated completely?',
                answer: 6,
                unit: 'hours',
                hint: 'How many 3s fit into 18?',
                explanation: '18 ÷ 3 = 6 hours — evaporation at work!',
              },
              {
                id: 'w4',
                visual: '🪴🚿',
                problem: 'Caleb waters the garden with a 12 L can filled from the rain barrel. He fills it 5 times. How many litres does he use?',
                answer: 60,
                unit: 'L',
                hint: 'Five cans of 12 L each.',
                explanation: '5 × 12 = 60 L of free sky water for the garden.',
              },
            ],
          },
        ],
      } satisfies MixedMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Caleb (fact-checked by Tessa). The water cycle, systems edition: energy, budgets, and how cities change the flow.' },
        { text: 'Two rounds for water scientists.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Energy and the cycle',
            intro: 'Match each concept.',
            pairs: [
              { id: 'r1p1', item: { label: 'The water cycle’s power source', shape: 'small-square' }, slot: { label: 'The Sun' } },
              { id: 'r1p2', item: { label: 'Evaporation ____ energy from surroundings', shape: 'wide-short' }, slot: { label: 'Absorbs (cooling effect)' } },
              { id: 'r1p3', item: { label: 'Condensation ____ energy', shape: 'wide-short' }, slot: { label: 'Releases (powers storms!)' } },
              { id: 'r1p4', item: { label: 'Residence time of water in the atmosphere', shape: 'wide-short' }, slot: { label: '~9 days on average' } },
              { id: 'r1p5', item: { label: 'Oldest water you’ve ever drunk', shape: 'small-square' }, slot: { label: 'Billions of years old — it cycles forever' } },
            ],
            stuckHint: 'Sweat cools you the same way evaporation cools a lake.',
          },
          {
            heading: 'Round 2 · Cities change the cycle',
            intro: 'Urban hydrology — why storm week floods streets.',
            pairs: [
              { id: 'r2p1', item: { label: 'Pavement and roofs', sublabel: 'effect on infiltration?', shape: 'huge-wide' }, slot: { label: 'Block it → more, faster runoff' } },
              { id: 'r2p2', item: { label: 'Flash flooding risk is highest where…', shape: 'wide-short' }, slot: { label: 'Ground is sealed and drains overwhelm' } },
              { id: 'r2p3', item: { label: 'Rain gardens and green roofs', shape: 'wide-short' }, slot: { label: 'Soak up stormwater naturally' } },
              { id: 'r2p4', item: { label: 'Toronto’s ravines (like the Don Valley)', shape: 'long-rect' }, slot: { label: 'Natural storm channels — flood by design' } },
              { id: 'r2p5', item: { label: 'A 100-year flood means…', shape: 'wide-short' }, slot: { label: '1% chance in any given year (not once a century!)' } },
            ],
            stuckHint: 'The “100-year” label is a probability, not a schedule — two can happen back to back.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
  },
};

/* ============================================================
 * CH8 M3 — Build it storm-proof · Mama T
 * ============================================================ */

export const CH8_M3_STORMPROOF: Mission = {
  id: 'act2.ch8.m3.stormproof',
  chapterId: 'act2.ch8',
  lead: 'mama_t',
  subjects: ['science'],
  skillTags: ['science.structures', 'science.forces.applied'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Mama T! The storm is coming and we need to get the house and yard ready. Engineering time!' },
        { text: 'Round 1: what wind does. Round 2: storm-prep choices.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · What wind does',
            intro: 'Forces in the storm.',
            questions: [
              { id: 'q1', question: 'Strong wind pushes hardest on things that are…', options: ['Small and low', 'Big and tall', 'Underground', 'Wet'], correctIndex: 1, explanation: 'More surface = more push. Tall, wide things catch the most wind.', hint: 'What catches more wind, a pebble or a fence?' },
              { id: 'q2', question: 'Which yard thing is most likely to blow away?', options: ['The stone path', 'A light plastic chair', 'The buried fence post', 'The house'], correctIndex: 1, explanation: 'Light + above ground = flight risk. Stack and store the patio chairs!', hint: 'Light things fly.' },
              { id: 'q3', question: 'Why do we close ALL the windows before a storm?', options: ['To keep wind and rain out', 'To keep warmth in', 'For quiet', 'Tradition'], correctIndex: 0, explanation: 'Wind blowing IN can push up on the roof and soak the house.', hint: 'What would the wind do inside?' },
              { id: 'q4', question: 'The trampoline should be…', options: ['Left to bounce', 'Anchored down or flipped and weighted', 'Moved onto the roof', 'Filled with water'], correctIndex: 1, explanation: 'Trampolines are famous storm flyers — anchor or flip them low.', hint: 'It’s basically a big wind-catcher.' },
              { id: 'q5', question: 'A flashlight beats candles in a storm because…', options: ['Brighter colours', 'No fire risk if it tips', 'It smells better', 'Candles are loud'], correctIndex: 1, explanation: 'No open flame = no fire risk when the lights go out.', hint: 'What happens if a candle falls over?' },
            ],
          },
          {
            heading: 'Round 2 · Storm-prep choices',
            intro: 'You’re the safety engineer. Pick smart!',
            questions: [
              { id: 'q1', question: 'Best place for the patio furniture?', options: ['The middle of the yard', 'Inside the garage', 'On the trampoline', 'The roof'], correctIndex: 1, explanation: 'Inside the (newly fixed!) garage — out of the wind entirely.', hint: 'We repaired a perfect storage spot.' },
              { id: 'q2', question: 'The gutters are clogged with leaves. Before the rain we should…', options: ['Ignore them', 'Clear them so water can drain', 'Add more leaves', 'Paint them'], correctIndex: 1, explanation: 'Clogged gutters overflow against the house — clear paths for water!', hint: 'Where should roof water GO?' },
              { id: 'q3', question: 'During the storm, the safest spot is…', options: ['The yard', 'Inside, away from windows', 'On the porch watching', 'In the pool hole'], correctIndex: 1, explanation: 'Inside and away from glass. The storm show isn’t worth it.', hint: 'Glass + flying branches = no.' },
              { id: 'q4', question: 'We charge phones and find the flashlight BEFORE the storm because…', options: ['Power might go out', 'Phones like storms', 'It’s fun', 'The flashlight is shy'], correctIndex: 0, explanation: 'Storms knock out power — prepare while you still have it.', hint: 'What might stop working?' },
              { id: 'q5', question: 'After the storm, before playing outside, we check for…', options: ['Rainbows only', 'Fallen branches and downed wires', 'Puddle depth', 'New bugs'], correctIndex: 1, explanation: 'Downed wires are the big danger — never touch, report them. Branches can hang half-fallen too.', hint: 'What could have fallen that’s dangerous?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Mama T. The pool dig starts after storm week, so today we’re engineering: loads, drainage, and why structures fail or hold.' },
        { text: 'Round 1: structures under force. Round 2: design the defences.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Structures under force',
            intro: 'Pushes, pulls, and what survives them.',
            questions: [
              { id: 'q1', question: 'Wind pushing on the fence is what kind of load?', options: ['Dead load (constant weight)', 'Live load (changing force)', 'No load', 'Sound load'], correctIndex: 1, explanation: 'Live loads change — wind, snow, people. Dead load is the structure’s own weight.', hint: 'Is wind always the same?' },
              { id: 'q2', question: 'A tree bends in wind and survives; a rigid old post snaps. Bending helps because it…', options: ['Looks nice', 'Absorbs and releases energy instead of resisting all at once', 'Confuses the wind', 'Makes shade'], correctIndex: 1, explanation: 'Flexibility spreads the force over time — many structures are designed to sway.', hint: 'Skyscrapers sway on purpose.' },
              { id: 'q3', question: 'Triangles show up in roof trusses because they…', options: ['Are cheap to draw', 'Can’t change shape without changing side lengths', 'Look modern', 'Shed leaves'], correctIndex: 1, explanation: 'A triangle is rigid — corners can’t flex like a rectangle’s. That’s why trusses are triangle farms.', hint: 'Try pushing a triangle vs a square frame.' },
              { id: 'q4', question: 'Fence posts are buried deep with concrete to resist…', options: ['Rain', 'Tipping (overturning force)', 'Paint', 'Squirrels'], correctIndex: 1, explanation: 'Wind pushes the fence like a lever — deep anchoring resists the tip.', hint: 'The fence is a sail on a stick.' },
              { id: 'q5', question: 'Roof shingles overlap like fish scales so that water…', options: ['Soaks in evenly', 'Always flows OVER the next shingle down', 'Stays on the roof', 'Evaporates'], correctIndex: 1, explanation: 'Overlap means gravity carries water down across the surfaces, never under them.', hint: 'Which way does water run?' },
            ],
          },
          {
            heading: 'Round 2 · Design the defences',
            intro: 'Apply it to our actual yard.',
            questions: [
              { id: 'q1', question: 'The pool hole is dug before the storm. The smart move is to…', options: ['Leave it open', 'Cover it and divert runoff around it', 'Fill it with the patio chairs', 'Line it with paper'], correctIndex: 1, explanation: 'Open pits collect runoff and collapse their walls — cover and divert.', hint: 'What will all that runoff find?' },
              { id: 'q2', question: 'Ground around a house should slope…', options: ['Toward the basement', 'Away from the foundation', 'Straight up', 'It doesn’t matter'], correctIndex: 1, explanation: 'Grading away keeps water from pooling at the foundation — remember our leaky basement!', hint: 'We FIXED that leak; let’s not invite it back.' },
              { id: 'q3', question: 'A downspout should release water…', options: ['Right at the wall', 'A couple of metres from the house', 'Into the basement window', 'Onto the neighbour'], correctIndex: 1, explanation: 'Extensions move roof water away from the foundation (and keep the peace with neighbours).', hint: 'Away from the wall — but be neighbourly.' },
              { id: 'q4', question: 'We stake the young maple sapling loosely, not rigidly, because…', options: ['String is expensive', 'Some sway builds a stronger trunk', 'It looks casual', 'Tight is impossible'], correctIndex: 1, explanation: 'Movement stimulates stronger trunk growth — overly rigid staking makes weak trees.', hint: 'Same lesson as the bending tree.' },
              { id: 'q5', question: 'Emergency kit math: 4 people × 2 L water × 3 days = ?', options: ['12 L', '18 L', '24 L', '30 L'], correctIndex: 2, explanation: '4 × 2 × 3 = 24 litres. Engineering includes logistics!', hint: 'Multiply all three.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Mama T. Storm-proofing, engineer-grade: pressure, structural failure modes, and real building-code thinking.' },
        { text: 'Two rounds. This is the stuff I do for fun.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Failure modes',
            intro: 'How things actually break.',
            questions: [
              { id: 'q1', question: 'Wind speed doubles. The force on the fence roughly…', options: ['Doubles', 'Triples', 'Quadruples', 'Stays equal'], correctIndex: 2, explanation: 'Wind force scales with speed SQUARED: 2× speed ≈ 4× force. That’s why gusts matter so much.', hint: 'It’s a square law.' },
              { id: 'q2', question: 'Roofs in storms most often fail by…', options: ['Crushing downward', 'Uplift — wind creates low pressure above and pries them up', 'Melting', 'Rusting mid-storm'], correctIndex: 1, explanation: 'Fast air over the roof lowers pressure (like an airplane wing) while gusts push under eaves — the roof gets lifted, not crushed.', hint: 'Think airplane wing, not hammer.' },
              { id: 'q3', question: 'Hurricane straps connect…', options: ['Windows to doors', 'The roof structure to the walls', 'Fences to trees', 'Gutters to drains'], correctIndex: 1, explanation: 'Metal straps tie roof framing into the wall framing so uplift can’t separate them.', hint: 'Fight the uplift from Q2.' },
              { id: 'q4', question: 'A “safety factor of 2” means the design holds…', options: ['Twice the expected maximum load', 'Half the expected load', 'Two storms only', 'Two years'], correctIndex: 0, explanation: 'Engineers design beyond the worst expected case — margin for the unexpected.', hint: 'Extra strength on purpose.' },
              { id: 'q5', question: 'Saturated soil contributes to tree-fall because…', options: ['Water feeds the wind', 'Wet soil grips roots far more weakly', 'Trees drink too fast', 'Roots float upward'], correctIndex: 1, explanation: 'Soggy ground loses shear strength — the same gust that a dry-rooted tree resists will topple one in saturated soil.', hint: 'Mud vs dry clay — which holds a post better?' },
            ],
          },
          {
            heading: 'Round 2 · Code thinking',
            intro: 'Why the rules exist — and the math inside them.',
            questions: [
              { id: 'q1', question: 'Building codes specify snow loads per region because…', options: ['Snow is identical everywhere', 'Roofs must carry the worst realistic LOCAL load', 'Codes love paperwork', 'Snow is decorative'], correctIndex: 1, explanation: 'A Sudbury roof and a Victoria roof face different worst cases — codes localize the physics.', hint: 'Same country, different winters.' },
              { id: 'q2', question: 'A 1.2 m fence panel sees ~0.5 kPa in a gust. Force on a 2.4 m-wide panel?', options: ['~0.6 kN', '~1.44 kN', '~2.4 kN', '~5 kN'], correctIndex: 1, explanation: 'Area = 1.2 × 2.4 = 2.88 m²; F = 0.5 kPa × 2.88 m² = 1.44 kN — about the weight of two adults, sideways.', hint: 'Pressure × area.' },
              { id: 'q3', question: 'Pool walls must resist soil pushing IN when empty. This load is…', options: ['Uplift', 'Lateral earth pressure', 'Live ceiling load', 'Imaginary'], correctIndex: 1, explanation: 'Surrounding soil (especially wet) pushes inward — empty pools can crack or even float in high groundwater.', hint: 'The ground pushes back.' },
              { id: 'q4', question: 'GFCI (ground-fault) outlets are required near the pool because…', options: ['They charge faster', 'They cut power in milliseconds if current leaks — e.g., through water and a person', 'They’re waterproof forever', 'Style'], correctIndex: 1, explanation: 'Ground-fault interrupters detect leakage current and trip almost instantly — water + electricity is the no-compromise zone.', hint: 'What’s the deadly combination here?' },
              { id: 'q5', question: 'After the storm, an engineer inspects the BIG maple’s cracked limb over the play area. The right call is…', options: ['Wait and see', 'Assess and remove the hazard before anyone plays below', 'Tape it', 'Paint it'], correctIndex: 1, explanation: 'A cracked overhead limb is a known hazard with people below — manage the risk first. Engineering is mostly responsibility.', hint: 'Who plays under that tree?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};
