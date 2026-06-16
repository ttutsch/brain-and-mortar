// Chapter 4 · "Hockey tournament weekend" (Owen leads; ends with the
// garage-door + driveway repair so the family car and gear have a real home).

import type { Mission } from '../types';
import type { DragMatchMissionParams, QuizMissionParams } from './missions';

/* ============================================================
 * M1 — Sports math · Owen
 * ============================================================ */

export const CH4_M1_SPORTS_MATH: Mission = {
  id: 'act1.ch4.m1.sports-math',
  chapterId: 'act1.ch4',
  lead: 'owen',
  subjects: ['math'],
  skillTags: ['math.arithmetic.applied', 'math.time', 'math.rates'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Owen here! My hockey tournament is this weekend and there’s math EVERYWHERE in hockey.' },
        { text: 'Round 1: goals and scores. Round 2: time on the clock.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Goals and scores',
            intro: 'Help me track the scores!',
            questions: [
              { id: 'q1', question: 'We scored 2 goals, then 1 more. How many goals?', options: ['2', '3', '4', '1'], correctIndex: 1, explanation: '2 + 1 = 3 goals!', hint: 'Count up: two… then one more.' },
              { id: 'q2', question: 'We have 3 goals, the other team has 5. Who’s winning?', options: ['Us', 'The other team', 'Tie game', 'Nobody'], correctIndex: 1, explanation: '5 is more than 3 — they’re ahead. Time to rally!', hint: 'Which number is bigger?' },
              { id: 'q3', question: 'The score is 4–4. What do we call that?', options: ['A win', 'A loss', 'A tie', 'Half-time'], correctIndex: 2, explanation: 'Same score on both sides = a tie.', hint: 'Both teams have the same!' },
              { id: 'q4', question: 'I scored 1 goal in each of 3 games. Total goals?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: '1 + 1 + 1 = 3.', hint: 'One goal, three times.' },
              { id: 'q5', question: 'We need 2 more goals to reach 6. How many do we have now?', options: ['2', '3', '4', '8'], correctIndex: 2, explanation: '4 + 2 = 6, so we have 4 now.', hint: 'What number plus 2 makes 6?' },
            ],
          },
          {
            heading: 'Round 2 · Hockey time',
            intro: 'Hockey runs on the clock.',
            questions: [
              { id: 'q1', question: 'A kids’ hockey period is 15 minutes. We’ve played 5. How long is left?', options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'], correctIndex: 1, explanation: '15 − 5 = 10 minutes left.', hint: 'Count up from 5 to 15.' },
              { id: 'q2', question: 'My game starts at 9 o’clock. We arrive at 8. Are we early or late?', options: ['Early', 'Late', 'Right on time', 'The game is over'], correctIndex: 0, explanation: '8 comes before 9 — a whole hour early. Coach will be happy!', hint: 'Which comes first on the clock, 8 or 9?' },
              { id: 'q3', question: 'There are 3 periods of 15 minutes. How long is the whole game?', options: ['30 minutes', '45 minutes', '15 minutes', '60 minutes'], correctIndex: 1, explanation: '15 + 15 + 15 = 45 minutes.', hint: 'Add fifteen three times.' },
              { id: 'q4', question: 'A penalty lasts 2 minutes. The clock shows 2 minutes gone. Is the penalty over?', options: ['Yes', 'No', 'Half over', 'Penalties never end'], correctIndex: 0, explanation: '2 minutes served = penalty over. Back on the ice!', hint: 'Compare the time served to the penalty length.' },
              { id: 'q5', question: 'The Zamboni takes 10 minutes. It started 4 minutes ago. How much longer?', options: ['4 minutes', '6 minutes', '10 minutes', '14 minutes'], correctIndex: 1, explanation: '10 − 4 = 6 more minutes of smooth-ice machine.', hint: 'How far from 4 to 10?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Owen here. Tournament weekend means brackets, stats, and snack-stand budgets.' },
        { text: 'Round 1: scoring math. Round 2: tournament logistics.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Scoring math',
            intro: 'Goals, assists, and points.',
            questions: [
              { id: 'q1', question: 'A goal = 1 point, an assist = 1 point. I have 7 goals and 9 assists. Total points?', options: ['14', '16', '17', '18'], correctIndex: 1, explanation: '7 + 9 = 16 points.', hint: 'Just add them.' },
              { id: 'q2', question: 'Our team scored 24 goals over 6 games. Average per game?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: '24 ÷ 6 = 4 goals per game.', hint: 'Divide total by games.' },
              { id: 'q3', question: 'A win = 2 points, a tie = 1, a loss = 0. We went 4 wins, 1 tie, 2 losses. Standings points?', options: ['8', '9', '10', '11'], correctIndex: 1, explanation: '4×2 + 1×1 + 2×0 = 9 points.', hint: 'Multiply each result by its value.' },
              { id: 'q4', question: 'The goalie stopped 27 of 30 shots. How many goals went in?', options: ['2', '3', '4', '27'], correctIndex: 1, explanation: '30 − 27 = 3 got past.', hint: 'Shots minus saves.' },
              { id: 'q5', question: 'I scored twice as many goals this year as last year’s 6. This year?', options: ['8', '10', '12', '3'], correctIndex: 2, explanation: '6 × 2 = 12.', hint: '"Twice as many" means multiply by 2.' },
            ],
          },
          {
            heading: 'Round 2 · Tournament logistics',
            intro: 'The math that gets a team through a weekend.',
            questions: [
              { id: 'q1', question: '8 teams, single elimination. How many games until a champion?', options: ['7', '8', '15', '16'], correctIndex: 0, explanation: 'Every game eliminates exactly one team; eliminating 7 teams takes 7 games.', hint: 'How many teams must lose?' },
              { id: 'q2', question: 'Hotel is $120/night for 2 nights, split between 4 families. Each family pays…', options: ['$30', '$60', '$120', '$240'], correctIndex: 1, explanation: '$240 total ÷ 4 = $60 each.', hint: 'Total cost first, then divide.' },
              { id: 'q3', question: 'The drive is 180 km at 90 km/h. How long does it take?', options: ['1.5 hours', '2 hours', '2.5 hours', '3 hours'], correctIndex: 1, explanation: '180 ÷ 90 = 2 hours.', hint: 'Distance ÷ speed = time.' },
              { id: 'q4', question: 'Snack stand: 3 hot chocolates at $2.50 each. Total?', options: ['$6.50', '$7.50', '$8.00', '$7.00'], correctIndex: 1, explanation: '3 × $2.50 = $7.50.', hint: '2.50 + 2.50 + 2.50.' },
              { id: 'q5', question: 'Each game is 60 minutes + 15 minutes between games. 4 games run back-to-back starting at 9:00. When does game 4 START?', options: ['12:00', '12:45', '12:15', '1:00'], correctIndex: 1, explanation: 'Each cycle is 75 minutes; three full cycles = 225 min = 3 h 45 min. 9:00 + 3:45 = 12:45.', hint: 'Three games + three gaps come before game 4.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Owen. Analytics has taken over hockey — shooting percentages, plus/minus, save rates. Let’s do real hockey math.' },
        { text: 'Round 1: percentages and rates. Round 2: tournament strategy.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Hockey analytics',
            intro: 'The numbers scouts actually use.',
            questions: [
              { id: 'q1', question: 'I scored 12 goals on 75 shots. Shooting percentage?', options: ['12%', '14%', '16%', '18%'], correctIndex: 2, explanation: '12 ÷ 75 = 0.16 = 16%.', hint: 'Goals ÷ shots × 100.' },
              { id: 'q2', question: 'A goalie faces 32 shots and allows 2 goals. Save percentage?', options: ['.920', '.938', '.906', '.875'], correctIndex: 1, explanation: '30 saves ÷ 32 shots = 0.9375 ≈ .938 — the classic goalie stat format.', hint: 'Saves first: 32 − 2.' },
              { id: 'q3', question: 'Our power play scored 9 times in 36 chances. Power-play percentage?', options: ['20%', '25%', '30%', '36%'], correctIndex: 1, explanation: '9/36 = 1/4 = 25%.', hint: 'Simplify the fraction first.' },
              { id: 'q4', question: 'I average 1.4 points per game. Over a 56-game season, roughly how many points?', options: ['64', '78', '84', '90'], correctIndex: 1, explanation: '1.4 × 56 = 78.4 → about 78 points.', hint: 'Rate × games.' },
              { id: 'q5', question: 'Ice time: 18 minutes of a 60-minute game. What fraction of the game am I on the ice?', options: ['1/4', '3/10', '1/3', '2/5'], correctIndex: 1, explanation: '18/60 = 3/10.', hint: 'Simplify 18/60.' },
            ],
          },
          {
            heading: 'Round 2 · Tournament strategy',
            intro: 'Brackets, standings, and tie-breakers.',
            questions: [
              { id: 'q1', question: '16-team single elimination. How many rounds to crown a champion?', options: ['3', '4', '5', '8'], correctIndex: 1, explanation: '16 → 8 → 4 → 2 → 1: four rounds (each halves the field).', hint: 'Halve 16 until you reach 1.' },
              { id: 'q2', question: 'Round-robin: 6 teams, each plays each other once. Total games?', options: ['12', '15', '18', '30'], correctIndex: 1, explanation: '6 choose 2 = (6 × 5)/2 = 15 games.', hint: 'Each pair plays once — count pairs.' },
              { id: 'q3', question: 'We need 4 points from 3 remaining games to clinch (win = 2, tie = 1). Which result set FAILS?', options: ['2 wins, 1 loss', '1 win, 2 ties', '4 ties — impossible, only 3 games', '1 win, 1 tie, 1 loss'], correctIndex: 3, explanation: '1 win + 1 tie + 1 loss = 3 points — one short. The others reach 4 (and option C is a trick: you can’t tie 4 times in 3 games).', hint: 'Score each scenario.' },
              { id: 'q4', question: 'Goal differential tie-breaker: we scored 21, allowed 13. Differential?', options: ['+6', '+7', '+8', '+34'], correctIndex: 2, explanation: '21 − 13 = +8.', hint: 'Scored minus allowed.' },
              { id: 'q5', question: 'If our win probability per game is 0.6, what’s the chance we win our next two games?', options: ['0.6', '0.36', '1.2', '0.24'], correctIndex: 1, explanation: 'Independent events multiply: 0.6 × 0.6 = 0.36.', hint: 'Two events both happening → multiply.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M2 — Road trip to the tournament · Dada T
 * ============================================================ */

export const CH4_M2_ROAD_TRIP: Mission = {
  id: 'act1.ch4.m2.road-trip',
  chapterId: 'act1.ch4',
  lead: 'dada_t',
  subjects: ['geography'],
  skillTags: ['geo.ontario.cities', 'geo.maps.reading', 'geo.directions'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Dada T here! Owen’s tournament is in Kingston — road trip!' },
        { text: 'I planned the route, of course. Help me check the map.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Reading our map',
            intro: 'Map basics for the drive.',
            questions: [
              { id: 'q1', question: 'Kingston is EAST of Toronto. On the map, which way is east?', options: ['Up', 'Down', 'Left', 'Right'], correctIndex: 3, explanation: 'On most maps, north is up — so east is to the right.', hint: 'North up, then go clockwise: N, E, S, W.' },
              { id: 'q2', question: 'The blue wiggly lines on our map are…', options: ['Roads', 'Rivers', 'Mountains', 'Fences'], correctIndex: 1, explanation: 'Blue usually means water — rivers and lakes.', hint: 'What colour is water?' },
              { id: 'q3', question: 'We drive along the shore of a HUGE lake the whole way. Which lake?', options: ['Lake Ontario', 'Lake Muskoka', 'A swimming pool', 'Hudson Bay'], correctIndex: 0, explanation: 'Toronto and Kingston both sit on Lake Ontario.', hint: 'It’s the lake our city sits on!' },
              { id: 'q4', question: 'The map symbol ⛺ usually means…', options: ['A school', 'A campground', 'A hospital', 'A hockey rink'], correctIndex: 1, explanation: 'The little tent marks campgrounds.', hint: 'What does the picture look like?' },
              { id: 'q5', question: 'We pass a city between Toronto and Kingston that rhymes with "Bell-ville." It’s…', options: ['Belleville', 'Barrie', 'Burlington', 'Brampton'], correctIndex: 0, explanation: 'Belleville sits right on our route along the 401.', hint: 'It rhymes with itself!' },
            ],
          },
          {
            heading: 'Round 2 · On the road',
            intro: 'Things we see on the drive.',
            questions: [
              { id: 'q1', question: 'Our highway is called the 401. A highway is…', options: ['A big fast road', 'A train track', 'A bike path', 'A river'], correctIndex: 0, explanation: 'Highways are big roads built for fast, long-distance driving.', hint: 'What are we driving on?' },
              { id: 'q2', question: 'The sign says "Kingston 100 km." That tells us…', options: ['How far it is', 'How fast to go', 'The temperature', 'The time'], correctIndex: 0, explanation: 'Distance signs count down the kilometres to a place.', hint: 'km measures distance.' },
              { id: 'q3', question: 'We cross a river flowing INTO Lake Ontario. Rivers flow…', options: ['Uphill', 'Downhill', 'In circles', 'Backwards on Tuesdays'], correctIndex: 1, explanation: 'Water always flows downhill, toward lakes and oceans.', hint: 'Which way does water roll?' },
              { id: 'q4', question: 'Kingston is famous for an old stone fort. Forts were built to…', options: ['Play hockey', 'Protect a place', 'Store snacks', 'House zoo animals'], correctIndex: 1, explanation: 'Fort Henry protected Kingston long ago. Now you can visit it!', hint: 'What does "protect" mean?' },
              { id: 'q5', question: 'On the way home the sun sets in front of us. Which direction are we driving?', options: ['North', 'South', 'East', 'West'], correctIndex: 3, explanation: 'The sun sets in the west — and home (Toronto) is west of Kingston!', hint: 'Where does the sun go down?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Dada T. Kingston tournament — 260 km of prime Ontario geography along Highway 401.' },
        { text: 'Round 1: the route. Round 2: Kingston and the region.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The route east',
            intro: 'Toronto → Kingston, stop by stop.',
            questions: [
              { id: 'q1', question: 'Driving Toronto → Kingston along Lake Ontario, which direction do we mostly travel?', options: ['North', 'South', 'East', 'West'], correctIndex: 2, explanation: 'Kingston lies east-northeast of Toronto along the lakeshore.', hint: 'Toward the rising sun.' },
              { id: 'q2', question: 'Which of these cities do we pass, in correct order?', options: ['Oshawa → Belleville → Kingston', 'Belleville → Oshawa → Kingston', 'Kingston → Oshawa → Belleville', 'Barrie → Sudbury → Kingston'], correctIndex: 0, explanation: 'Heading east: Oshawa first (just past Toronto), then Belleville, then Kingston.', hint: 'Which city is closest to Toronto?' },
              { id: 'q3', question: 'Kingston sits where Lake Ontario meets which major river?', options: ['The Don River', 'The St. Lawrence River', 'The Ottawa River', 'The Niagara River'], correctIndex: 1, explanation: 'The St. Lawrence begins at Kingston and flows all the way to the Atlantic.', hint: 'It’s the river big ships take to the ocean.' },
              { id: 'q4', question: 'The "Thousand Islands" near Kingston are…', options: ['Actual islands in the St. Lawrence', 'A salad dressing factory', 'A theme park', 'Underwater mountains'], correctIndex: 0, explanation: 'About 1,800 islands dot the St. Lawrence just east of Kingston. (The dressing IS named after them, though.)', hint: 'The name is literal.' },
              { id: 'q5', question: 'Highway 401 is one of the busiest highways in North America. It runs roughly…', options: ['North–south through Ontario', 'East–west across southern Ontario', 'In a circle around Toronto', 'Underground'], correctIndex: 1, explanation: 'The 401 spans southern Ontario from Windsor to the Quebec border, east–west.', hint: 'Windsor to Quebec — look at those on a map.' },
            ],
          },
          {
            heading: 'Round 2 · Kingston up close',
            intro: 'Our destination has serious history.',
            questions: [
              { id: 'q1', question: 'Kingston was briefly the capital of the Province of Canada in the 1840s. Today Canada’s capital is…', options: ['Toronto', 'Kingston still', 'Ottawa', 'Montreal'], correctIndex: 2, explanation: 'The capital moved several times before settling on Ottawa.', hint: 'We took a family trip there!' },
              { id: 'q2', question: 'Fort Henry was built to protect…', options: ['A shopping mall', 'The naval dockyard and Rideau Canal entrance', 'A hockey arena', 'The 401'], correctIndex: 1, explanation: 'It guarded the dockyard and the canal route after the War of 1812.', hint: 'What valuable waterway starts near Kingston?' },
              { id: 'q3', question: 'The Rideau Canal connects Kingston to which city?', options: ['Toronto', 'Ottawa', 'Montreal', 'Buffalo'], correctIndex: 1, explanation: 'The canal runs Kingston ↔ Ottawa — the same canal that becomes the world’s biggest skating rink each winter.', hint: 'We skated on its other end!' },
              { id: 'q4', question: 'Kingston’s nickname is the "Limestone City" because…', options: ['It’s very dusty', 'Many buildings are built of local limestone', 'Lime trees grow there', 'The hockey team is called the Limestones'], correctIndex: 1, explanation: 'The area’s limestone bedrock gave the city its handsome grey stone buildings.', hint: 'Look at the old buildings’ stone.' },
              { id: 'q5', question: 'Crossing the St. Lawrence east of Kingston, you could walk to which country?', options: ['France', 'The United States', 'Mexico', 'Greenland'], correctIndex: 1, explanation: 'The river forms the Canada–US border there — New York State is on the far bank.', hint: 'Which country borders Ontario to the south?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Dada T. A 260 km drive is a geography seminar if you pay attention. Let’s pay attention.' },
        { text: 'Round 1: physical geography of the corridor. Round 2: how geography shapes settlement.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · The lakeshore corridor',
            intro: 'Physical geography between Toronto and Kingston.',
            questions: [
              { id: 'q1', question: 'The flat, fertile land along Lake Ontario was largely shaped by…', options: ['Volcanoes', 'Glaciers in the last ice age', 'Earthquakes', 'Meteor strikes'], correctIndex: 1, explanation: 'Retreating glaciers flattened the land and left fertile deposits — why this corridor farms and settles so well.', hint: 'Think ice, not fire.' },
              { id: 'q2', question: 'Lake Ontario is the ____ of the five Great Lakes by surface area.', options: ['Largest', 'Second largest', 'Smallest', 'Third largest'], correctIndex: 2, explanation: 'Smallest by area — though still enormous, and deeper than Lake Erie.', hint: 'It’s at one extreme.' },
              { id: 'q3', question: 'Water in Lake Ontario eventually reaches the Atlantic via…', options: ['The Mississippi River', 'The St. Lawrence River', 'The Hudson River', 'Evaporation only'], correctIndex: 1, explanation: 'Great Lakes → St. Lawrence → Gulf of St. Lawrence → Atlantic.', hint: 'The river that starts at Kingston.' },
              { id: 'q4', question: 'The Canadian Shield — visible as rocky outcrops north of the 401 — is mostly…', options: ['Young sedimentary rock', 'Ancient Precambrian rock', 'Volcanic ash', 'Compressed glacier ice'], correctIndex: 1, explanation: 'The Shield is some of Earth’s oldest exposed rock, over a billion years old.', hint: '"Ancient" is the keyword.' },
              { id: 'q5', question: 'Why does the Toronto–Kingston shoreline have milder winters than areas far from the lake?', options: ['It’s further south than everywhere else', 'Large water bodies moderate temperature', 'The 401 generates heat', 'It doesn’t — it’s colder'], correctIndex: 1, explanation: 'Water heats and cools slowly, buffering nearby land — the "lake effect" on temperature.', hint: 'What does a big bathtub of water do to room temperature?' },
            ],
          },
          {
            heading: 'Round 2 · Geography shapes settlement',
            intro: 'Why cities are where they are.',
            questions: [
              { id: 'q1', question: 'Kingston grew exactly where the lake meets the St. Lawrence because the site controlled…', options: ['The best farmland', 'Water-trade routes between the lakes and the ocean', 'A gold mine', 'The only bridge'], correctIndex: 1, explanation: 'Whoever held Kingston controlled movement between the Great Lakes and the Atlantic world.', hint: 'Think like a trader with a boat.' },
              { id: 'q2', question: 'Most of Ontario’s population lives within ~150 km of the US border. The main reason is…', options: ['Warmer climate + waterways + trade access in the south', 'A law requiring it', 'The north is entirely underwater', 'Cell coverage'], correctIndex: 0, explanation: 'Climate, arable land, the Great Lakes–St. Lawrence trade spine, and proximity to US markets all stack in the south.', hint: 'Several advantages stack together.' },
              { id: 'q3', question: 'The "Quebec City–Windsor Corridor" is significant as…', options: ['Canada’s most densely populated and industrialized strip', 'A hiking trail', 'A defunct railway', 'A weather pattern'], correctIndex: 0, explanation: 'More than half of Canada’s population lives along this corridor — our route is part of it.', hint: 'We’re driving along part of it.' },
              { id: 'q4', question: 'The Rideau Canal (1832) was built primarily because…', options: ['Tourists demanded it', 'A war-safe supply route avoiding the US border was needed after the War of 1812', 'Skating was popular', 'The St. Lawrence had dried up'], correctIndex: 1, explanation: 'After 1812, Britain wanted a military supply route between Montreal and Kingston that didn’t hug the American border.', hint: 'Think defence, not recreation.' },
              { id: 'q5', question: 'A "natural harbour" like Kingston’s matters historically because…', options: ['It looks nice', 'Ships could shelter and load safely without building much', 'Fish prefer them', 'They never freeze'], correctIndex: 1, explanation: 'Sheltered deep water = safe anchorage = trade and naval power, long before modern construction.', hint: 'What does a ship need from a coastline?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M3 — Scorekeeper stats · Tessa
 * ============================================================ */

export const CH4_M3_STATS: Mission = {
  id: 'act1.ch4.m3.stats',
  chapterId: 'act1.ch4',
  lead: 'tessa',
  subjects: ['math'],
  skillTags: ['math.data.charts', 'math.data.average', 'math.data.interpretation'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Tessa here — I’m running the scoreboard table at Owen’s tournament.' },
        { text: 'Help me read the score sheets. Round 1: counting and comparing. Round 2: tally charts.' },
      ],
      pattern: 'drag-match',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Score sheet reading',
            intro: 'Match each question to its answer from the sheet:\nGame 1: Us 3 – Them 2 · Game 2: Us 1 – Them 4 · Game 3: Us 5 – Them 5',
            pairs: [
              { id: 'r1p1', item: { label: 'Which game did we WIN?', shape: 'wide-short' }, slot: { label: 'Game 1 (3–2)' } },
              { id: 'r1p2', item: { label: 'Which game did we LOSE?', shape: 'wide-short' }, slot: { label: 'Game 2 (1–4)' } },
              { id: 'r1p3', item: { label: 'Which game was a TIE?', shape: 'wide-short' }, slot: { label: 'Game 3 (5–5)' } },
              { id: 'r1p4', item: { label: 'Our goals in all 3 games', shape: 'long-rect' }, slot: { label: '9 goals (3+1+5)' } },
              { id: 'r1p5', item: { label: 'Our BEST scoring game', shape: 'wide-short' }, slot: { label: 'Game 3 (5 goals)' } },
            ],
            stuckHint: 'Win = our number is bigger. Lose = theirs is bigger. Tie = same.',
          },
          {
            heading: 'Round 2 · Tally it up',
            intro: 'I kept tallies. Match each tally to its number. (Remember: 𝍸 = 5)',
            pairs: [
              { id: 'r2p1', item: { label: '||| tally marks', shape: 'small-square' }, slot: { label: '3' } },
              { id: 'r2p2', item: { label: '𝍸 tally marks', shape: 'small-square' }, slot: { label: '5' } },
              { id: 'r2p3', item: { label: '𝍸 || tally marks', shape: 'small-square' }, slot: { label: '7' } },
              { id: 'r2p4', item: { label: '𝍸 𝍸 tally marks', shape: 'small-square' }, slot: { label: '10' } },
              { id: 'r2p5', item: { label: '𝍸 𝍸 |||| tally marks', shape: 'wide-short' }, slot: { label: '14' } },
            ],
            stuckHint: 'Count in fives for each bundle, then add the single lines.',
          },
        ],
      } satisfies DragMatchMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Tessa. The tournament publishes stat sheets and I’m the only one at the table who can read them. Join me.' },
        { text: 'Round 1: averages and totals. Round 2: reading the standings table.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Averages',
            intro: 'Mean, max, and range from real score data.',
            questions: [
              { id: 'q1', question: 'Owen’s goals across 4 games: 2, 0, 3, 1. What’s his average (mean)?', options: ['1', '1.5', '2', '6'], correctIndex: 1, explanation: 'Total 6 ÷ 4 games = 1.5 goals per game.', hint: 'Add them up, divide by how many.' },
              { id: 'q2', question: 'Same data: 2, 0, 3, 1. What’s the RANGE?', options: ['0', '2', '3', '6'], correctIndex: 2, explanation: 'Range = biggest − smallest = 3 − 0 = 3.', hint: 'Highest minus lowest.' },
              { id: 'q3', question: 'Goals per game: 4, 4, 1, 4, 2. What’s the MODE?', options: ['1', '2', '3', '4'], correctIndex: 3, explanation: 'The mode is the most frequent value — 4 appears three times.', hint: 'Which number repeats most?' },
              { id: 'q4', question: 'Team A averages 3 goals over 6 games. Total goals?', options: ['9', '18', '12', '36'], correctIndex: 1, explanation: 'Average × games = 3 × 6 = 18.', hint: 'Reverse the averaging.' },
              { id: 'q5', question: 'Median of 1, 5, 2, 4, 3?', options: ['2', '3', '4', '5'], correctIndex: 1, explanation: 'Sorted: 1 2 3 4 5 — the middle value is 3.', hint: 'Sort first, take the middle.' },
            ],
          },
          {
            heading: 'Round 2 · The standings table',
            intro: 'Standings: Hawks 10 pts · Wolves 8 pts · Bears 8 pts · Owls 4 pts.\nGoal diff: Wolves +6, Bears +2.',
            questions: [
              { id: 'q1', question: 'Who’s in first place?', options: ['Hawks', 'Wolves', 'Bears', 'Owls'], correctIndex: 0, explanation: 'Hawks lead with 10 points.', hint: 'Most points wins the table.' },
              { id: 'q2', question: 'Wolves and Bears are tied on points. Who ranks higher and why?', options: ['Bears — alphabetical', 'Wolves — better goal difference (+6 vs +2)', 'Owls', 'They share 2nd with no order'], correctIndex: 1, explanation: 'The standard tie-breaker is goal difference: Wolves +6 beats Bears +2.', hint: 'Check the goal-diff line.' },
              { id: 'q3', question: 'How many points separate first from last?', options: ['4', '5', '6', '10'], correctIndex: 2, explanation: '10 − 4 = 6 points.', hint: 'Top minus bottom.' },
              { id: 'q4', question: 'If wins are 2 points and the Owls have no ties, how many games have the Owls won?', options: ['1', '2', '3', '4'], correctIndex: 1, explanation: '4 points ÷ 2 per win = 2 wins.', hint: 'Points ÷ 2.' },
              { id: 'q5', question: 'Bears beat Hawks in the final round (win = 2 pts). New totals: Bears 10, Hawks 10. Who finishes ahead if Bears’ goal diff is now better?', options: ['Hawks — they led before', 'Bears — tie-breaker', 'Coin flip', 'Both get the trophy'], correctIndex: 1, explanation: 'Equal points → goal difference decides → Bears take it.', hint: 'Same rule as Q2.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Tessa. I’m turning the tournament stats into charts for the team newsletter — data literacy time.' },
        { text: 'Round 1: statistics that summarize. Round 2: spotting misleading data.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Summarizing data',
            intro: 'Mean vs median vs mode — and when each one lies.',
            questions: [
              { id: 'q1', question: 'Ice times (minutes): 12, 14, 13, 15, 46. Why is the MEDIAN more representative than the mean?', options: ['It’s always bigger', 'The outlier (46) drags the mean up; the median resists outliers', 'Medians are easier to compute', 'It isn’t'], correctIndex: 1, explanation: 'The mean is 20 — higher than 4 of 5 values — because 46 skews it. The median (14) describes a typical shift better.', hint: 'Which number is nothing like the others?' },
              { id: 'q2', question: 'Mean of 8, 12, 10, 14, 6?', options: ['9', '10', '11', '12'], correctIndex: 1, explanation: 'Sum 50 ÷ 5 = 10.', hint: 'Add, then divide by 5.' },
              { id: 'q3', question: 'A team’s goals: 0, 0, 1, 9. Which statistic would a coach quote to make the offence look GOOD?', options: ['Mode (0)', 'Median (0.5)', 'Mean (2.5)', 'Minimum (0)'], correctIndex: 2, explanation: 'The mean (2.5/game) sounds healthy — but it’s propped up by one 9-goal game. Stats can spin.', hint: 'Which number is highest?' },
              { id: 'q4', question: 'Adding one more 0-goal game to 0, 0, 1, 9 changes the median to…', options: ['0', '0.5', '1', '2'], correctIndex: 0, explanation: 'Data becomes 0 0 0 1 9 — the middle value is 0.', hint: 'Sort the five values; take the third.' },
              { id: 'q5', question: 'Shots per game across the season form a bell-ish curve. Roughly where do mean and median sit?', options: ['Far apart', 'Close together near the centre', 'Mean at zero', 'Median at the max'], correctIndex: 1, explanation: 'Symmetric data pulls mean and median to the same centre — they diverge when data is skewed.', hint: 'Symmetry is the key word.' },
            ],
          },
          {
            heading: 'Round 2 · Misleading charts',
            intro: 'The newsletter must not lie. Spot the spin.',
            questions: [
              { id: 'q1', question: 'A bar chart starts its y-axis at 45 instead of 0, making a 48-vs-50 difference look huge. This trick is called…', options: ['A truncated axis', 'A pie chart', 'Extrapolation', 'Good design'], correctIndex: 0, explanation: 'Truncating the axis exaggerates small differences. Start at zero or mark the break clearly.', hint: 'Look at where the axis starts.' },
              { id: 'q2', question: '"Our wins doubled!" (from 1 win to 2). What’s misleading?', options: ['Nothing', 'Percentages of tiny numbers sound dramatic', 'Doubling is impossible', 'Wins can’t be counted'], correctIndex: 1, explanation: 'True but trivial — +1 win. Relative change without absolute numbers misleads.', hint: 'How many actual wins changed?' },
              { id: 'q3', question: 'A line chart of cumulative career goals only ever goes up. Why is "always rising" NOT evidence of improvement?', options: ['It is evidence', 'Cumulative totals can’t decrease — even a slump only flattens the line', 'Goals don’t matter', 'Line charts are always wrong'], correctIndex: 1, explanation: 'A cumulative metric rises by construction. To see form, chart per-game rate instead.', hint: 'Can a running total ever go down?' },
              { id: 'q4', question: 'Correlation trap: teams that travel further win more often in our data. Before concluding "travel causes winning," check…', options: ['Nothing, publish it', 'Whether a third factor (e.g., better-funded teams travel more AND win more) explains both', 'Whether buses are lucky', 'The font of the chart'], correctIndex: 1, explanation: 'A lurking variable — funding, roster depth — may drive both. Correlation isn’t causation.', hint: 'What kind of team can afford travel?' },
              { id: 'q5', question: 'Sample-size trap: a goalie has a perfect record — 1 game. The honest move is…', options: ['Declare them the league’s best', 'Report the record alongside the games played', 'Hide the stat', 'Extrapolate to 100 wins'], correctIndex: 1, explanation: 'Tiny samples mislead. Context — n=1 — lets readers weigh it properly.', hint: 'How many games back the claim?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};

/* ============================================================
 * M4 — Hockey history · Owen
 * ============================================================ */

export const CH4_M4_HISTORY: Mission = {
  id: 'act1.ch4.m4.history',
  chapterId: 'act1.ch4',
  lead: 'owen',
  subjects: ['history', 'social-studies'],
  skillTags: ['history.canada.sport', 'history.then-now', 'history.sources'],
  tiers: {
    1: {
      wrapper: [
        { text: 'Owen again! Between games, Dada and I visited the rink’s trophy case. SO much old stuff!' },
        { text: 'Round 1: hockey then and now. Round 2: Canadian winter traditions.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Then and now',
            intro: 'Old hockey vs. today’s hockey.',
            questions: [
              { id: 'q1', question: 'Long ago, kids played hockey on…', options: ['Frozen ponds and rivers', 'Video screens', 'Trampolines', 'Sand'], correctIndex: 0, explanation: 'Before indoor rinks, winter ice on ponds WAS the rink.', hint: 'Where does ice come from in winter?' },
              { id: 'q2', question: 'Very old hockey players didn’t wear…', options: ['Skates', 'Helmets', 'Sweaters', 'Mittens'], correctIndex: 1, explanation: 'Helmets only became required decades later. Safety has come a long way!', hint: 'What keeps your head safe?' },
              { id: 'q3', question: 'The oldest hockey sticks were made of…', options: ['Plastic', 'Metal', 'One piece of wood', 'Glass'], correctIndex: 2, explanation: 'Early sticks were carved from a single piece of wood.', hint: 'What grows on trees?' },
              { id: 'q4', question: 'A "trophy" is…', options: ['A prize you win', 'A type of skate', 'A penalty', 'A snack'], correctIndex: 0, explanation: 'Teams win trophies — like the famous Stanley Cup!', hint: 'What’s in the case we visited?' },
              { id: 'q5', question: 'Old photos in the trophy case are in black and white because…', options: ['The past had no colours', 'Old cameras couldn’t capture colour', 'Someone erased the colour', 'Hockey is black and white'], correctIndex: 1, explanation: 'Colour photography came later — the world was just as colourful, the cameras weren’t!', hint: 'Was the world grey, or just the photo?' },
            ],
          },
          {
            heading: 'Round 2 · Winter in Canada',
            intro: 'How Canadians have always enjoyed winter.',
            questions: [
              { id: 'q1', question: 'Which winter activity is oldest in Canada?', options: ['Snowmobiling', 'Snowshoeing', 'Ice-resurfacing machines', 'Hot-tubbing'], correctIndex: 1, explanation: 'Indigenous peoples invented and used snowshoes for thousands of years before anything with a motor.', hint: 'Which one needs no machines at all?' },
              { id: 'q2', question: 'Tobogganing means…', options: ['Sledding down a snowy hill', 'A type of soup', 'Ice fishing', 'Winter dancing'], correctIndex: 0, explanation: 'The toboggan — a flat-bottomed snow sled — comes from Indigenous designs too.', hint: 'You need a hill and a "wheee!"' },
              { id: 'q3', question: 'A rink’s ice is kept smooth by…', options: ['A Zamboni machine', 'Hair dryers', 'Warm blankets', 'Wishing'], correctIndex: 0, explanation: 'The ice-resurfacing machine (Zamboni is the famous brand) shaves and re-waters the ice.', hint: 'We watched it between periods!' },
              { id: 'q4', question: 'Maple syrup — a Canadian winter-to-spring tradition — comes from…', options: ['A factory only', 'Maple tree sap', 'Melted snow', 'Bees'], correctIndex: 1, explanation: 'Sap is collected from maple trees and boiled down. First Nations peoples taught settlers how.', hint: 'Which tree is on our flag?' },
              { id: 'q5', question: 'Why do many Canadian towns have outdoor community rinks?', options: ['Winters are long and cold enough to keep ice frozen', 'A law requires them', 'They double as pools in July', 'For Zamboni parking'], correctIndex: 0, explanation: 'Cold winters make outdoor ice cheap and natural — skating became part of community life.', hint: 'What does ice need to stay solid?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    2: {
      wrapper: [
        { text: 'Owen. The arena lobby has a little hockey-history museum. I read EVERYTHING.' },
        { text: 'Round 1: how hockey grew up in Canada. Round 2: thinking like a historian.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · How hockey grew up',
            intro: 'From frozen ponds to packed arenas.',
            questions: [
              { id: 'q1', question: 'The first organized indoor hockey game was played in 1875 in…', options: ['Toronto', 'Montreal', 'Kingston', 'Boston'], correctIndex: 1, explanation: 'Montreal’s Victoria Skating Rink hosted the first recorded indoor game.', hint: 'A large Quebec city.' },
              { id: 'q2', question: 'The Stanley Cup is named after…', options: ['A hockey player', 'A Governor General of Canada', 'A city', 'A brand of skates'], correctIndex: 1, explanation: 'Lord Stanley of Preston, Governor General, donated the cup in 1892.', hint: 'A vice-regal title is involved.' },
              { id: 'q3', question: 'Hockey’s roots include stick-and-ball games played by…', options: ['Only the English', 'Indigenous peoples and European settlers both', 'Robots', 'Vikings exclusively'], correctIndex: 1, explanation: 'Indigenous games like the Mi’kmaq’s contributed to hockey’s development alongside European games — the modern sport blends many roots.', hint: 'More than one tradition fed in.' },
              { id: 'q4', question: 'Early pucks were sometimes made from…', options: ['Frozen rubber balls cut flat', 'Solid gold', 'Ice cubes', 'Maple syrup tins only'], correctIndex: 0, explanation: 'Rubber balls bounced too much — players cut them flat, and the puck was born.', hint: 'What shape problem does a ball have on ice?' },
              { id: 'q5', question: 'Women’s hockey in Canada dates back to…', options: ['The 2000s', 'The 1990s', 'The 1890s', 'It started outside Canada'], correctIndex: 2, explanation: 'Women were playing organized hockey in Canada by the 1890s — including a famous photo of Lord Stanley’s own daughter Isobel playing.', hint: 'Much earlier than most people guess.' },
            ],
          },
          {
            heading: 'Round 2 · Think like a historian',
            intro: 'The museum’s artifacts teach us HOW we know what we know.',
            questions: [
              { id: 'q1', question: 'A primary source about the 1875 Montreal game would be…', options: ['A newspaper report printed that week', 'A 2020 documentary', 'My history textbook', 'A guess'], correctIndex: 0, explanation: 'Primary sources come from the time of the event — that week’s newspaper qualifies.', hint: '"Primary" = closest to the moment.' },
              { id: 'q2', question: 'A wooden stick in the case is labelled "circa 1900." Circa means…', options: ['Exactly', 'Approximately', 'Before', 'After'], correctIndex: 1, explanation: 'Circa (c.) = "around" — historians flag uncertainty honestly.', hint: 'It’s a Latin word about closeness.' },
              { id: 'q3', question: 'Two old newspapers report different winners for the same 1903 game. A good historian would…', options: ['Trust the longer article', 'Look for more sources to cross-check', 'Flip a coin', 'Conclude the game never happened'], correctIndex: 1, explanation: 'Conflicting sources call for corroboration — find league records, other papers, photos.', hint: 'More evidence, not better fonts.' },
              { id: 'q4', question: 'An artifact’s "provenance" is…', options: ['Its price', 'The history of where it came from and who owned it', 'Its province', 'Its weight'], correctIndex: 1, explanation: 'Provenance traces an object’s chain of custody — it’s how museums trust an item is genuine.', hint: 'It answers "how did this get here?"' },
              { id: 'q5', question: 'The museum says early games "reportedly" drew 100 spectators. "Reportedly" signals…', options: ['Absolute certainty', 'The claim comes from accounts that can’t be fully verified', 'Exactly 100 people', 'A lie'], correctIndex: 1, explanation: 'Careful word choice marks the difference between verified facts and period claims.', hint: 'Why not just say "drew 100"?' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
    3: {
      wrapper: [
        { text: 'Owen. Hockey history is really Canadian history wearing skates. The arena museum proves it.' },
        { text: 'Round 1: hockey and the making of modern Canada. Round 2: evidence and interpretation.' },
      ],
      pattern: 'quiz',
      params: {
        rounds: [
          {
            heading: 'Round 1 · Hockey and modern Canada',
            intro: 'The sport as a lens on the country.',
            questions: [
              { id: 'q1', question: 'Early hockey leagues spread along railway lines because…', options: ['Trains carried teams between towns affordably', 'Rinks were built inside trains', 'Coincidence', 'Railways sponsored all teams'], correctIndex: 0, explanation: 'Rail networks made inter-town play possible — sport infrastructure followed transport infrastructure.', hint: 'How did a team get to an away game in 1900?' },
              { id: 'q2', question: 'Radio broadcasts of hockey starting in the 1920s–30s mattered because they…', options: ['Replaced the games', 'Created shared national experiences across distant communities', 'Were silent', 'Only reached Toronto'], correctIndex: 1, explanation: 'Saturday night hockey on the radio became one of the first truly coast-to-coast Canadian rituals.', hint: 'Think about what "everyone listening at once" builds.' },
              { id: 'q3', question: 'The 1972 Summit Series (Canada vs USSR) was about more than hockey because…', options: ['It decided the border', 'Cold War rivalry made it a symbolic contest of systems', 'The puck was special', 'It was played in summer'], correctIndex: 1, explanation: 'In the middle of the Cold War, the series carried enormous symbolic weight on both sides.', hint: 'What global tension existed in 1972?' },
              { id: 'q4', question: 'Hockey Night in Canada broadcasts in multiple languages (including Punjabi) today. This reflects…', options: ['Falling interest in hockey', 'Canada’s changing, multicultural population claiming a shared tradition', 'A translation error', 'Rules requiring it'], correctIndex: 1, explanation: 'The sport’s audience evolved with the country — new communities joined and reshaped the tradition.', hint: 'Who watches hockey in Canada today?' },
              { id: 'q5', question: 'Historians study community rinks, not just NHL arenas, because…', options: ['NHL records are secret', 'Everyday places reveal how ordinary people actually lived', 'Big arenas are too large to study', 'Rinks are newer'], correctIndex: 1, explanation: 'Social history looks at daily life — the local rink says more about a town than a distant pro arena.', hint: 'Whose history is "social history"?' },
            ],
          },
          {
            heading: 'Round 2 · Evidence and interpretation',
            intro: 'Same facts, different stories — how history actually gets written.',
            questions: [
              { id: 'q1', question: 'Two textbooks describe the same 1875 game: one calls it "hockey’s birth," another "one step in a long evolution." This difference is…', options: ['One book lying', 'Interpretation — historians frame the same evidence differently', 'A printing error', 'Impossible'], correctIndex: 1, explanation: 'Both can cite the same sources; framing and emphasis differ. Recognizing interpretation is core historical thinking.', hint: 'Can two honest people tell one event differently?' },
              { id: 'q2', question: 'A team photo from 1910 shows no players of colour. A careful historian concludes…', options: ['No people of colour played hockey anywhere', 'This photo alone can’t support broad claims — check leagues like the Coloured Hockey League of the Maritimes (1895)', 'Photos never lie', 'The photo is fake'], correctIndex: 1, explanation: 'Absence in one source isn’t absence in history. The all-Black Coloured Hockey League predates the NHL by decades.', hint: 'What can a single photo NOT tell you?' },
              { id: 'q3', question: 'Oral histories from players’ descendants are valuable but must be…', options: ['Ignored — only documents count', 'Weighed and cross-checked like any source, since memory shifts over generations', 'Accepted without question', 'Converted to statistics'], correctIndex: 1, explanation: 'Oral history captures voices documents miss; corroboration and care about memory’s limits keep it rigorous.', hint: 'Every source type has strengths AND limits.' },
              { id: 'q4', question: 'A museum label written in 1965 calls old equipment "primitive." A modern curator might revise this because…', options: ['The equipment changed', '"Primitive" judges the past by today’s standards instead of understanding it in context', 'Labels must be in French', 'Old labels are illegal'], correctIndex: 1, explanation: 'Judging the past purely by present standards is called presentism — good history understands choices in their own context.', hint: 'Was 1900 gear "primitive" to the people using it?' },
              { id: 'q5', question: 'The strongest historical claims rest on…', options: ['The loudest author', 'Multiple independent sources pointing the same way', 'The newest book', 'National pride'], correctIndex: 1, explanation: 'Converging independent evidence is the gold standard — in history as in science.', hint: 'One witness vs. many unconnected witnesses.' },
            ],
          },
        ],
      } satisfies QuizMissionParams,
    },
  },
};
