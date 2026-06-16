// Family-trip content. Each act ends with one trip — a celebratory, lower-stakes
// experience layered on top of the act's chapter repairs. See DESIGN.md §9 / §13.

export interface TripQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  /** Shown after the player answers (right or wrong). */
  explanation: string;
}

/**
 * An image for a trip scene. Either supply a real `url` (production), or a
 * `placeholderIcon` (we render a stylized SVG until real artwork lands).
 * Sourcing: see STYLE_GUIDE.md for AI-prompt templates and licensed-photo notes.
 */
export interface TripImage {
  /** Path or URL to the actual image. If provided, the SVG placeholder is skipped. */
  url?: string;
  /** Accessibility text describing the image. Always required. */
  alt: string;
  /** Optional caption rendered beneath the image. */
  caption?: string;
  /** Fallback SVG placeholder kind when no real image is set yet. */
  placeholderIcon?: PlaceholderIcon;
}

export type PlaceholderIcon =
  | 'building'      // Parliament, museums, landmarks
  | 'water'         // canals, rivers, lakes
  | 'market'        // markets, shops
  | 'monument'      // sculptures, columns, totems
  | 'skyline'       // city skylines (NYC, London, Tokyo, etc.)
  | 'bridge'        // bridges
  | 'mountain'      // mountains, parks
  | 'transit';      // subway, trains

export interface TripScene {
  id: string;
  heading: string;
  body: string;
  /** Optional image (real photo or stylized SVG placeholder). */
  image?: TripImage;
  /** Optional question — skipping is fine; no penalty for wrong answers. */
  quiz?: TripQuiz;
}

export interface TripIntro {
  heading: string;
  body: string;
  image?: TripImage;
}

export interface TripOutro {
  heading: string;
  body: string;
  image?: TripImage;
  /** Coins awarded for completing the trip. */
  coinsAwarded: number;
}

export interface Trip {
  id: string;
  actId: string;
  destination: string;
  /** Short title for banners and the home view. */
  title: string;
  intro: TripIntro;
  scenes: TripScene[];
  outro: TripOutro;
}

const OTTAWA_TRIP: Trip = {
  id: 'trip.act1.ottawa',
  actId: 'act1',
  destination: 'Ottawa',
  title: 'Weekend in Ottawa',
  intro: {
    heading: 'Welcome to Ottawa!',
    body:
      'The whole T Family piled into the car early this morning. After about 4½ hours of driving, ' +
      'we’ve arrived in Ottawa — Canada’s capital. Dada T has the whole weekend planned and the city ' +
      'is full of things to see.',
    image: {
      url: '/images/trips/ottawa/skyline.jpg',
      alt: 'A view of downtown Ottawa with Parliament Hill rising above the Ottawa River.',
      caption: 'Ottawa from across the river. (Photo: Óðinn, CC BY-SA 2.5, Wikimedia Commons)',
      placeholderIcon: 'skyline',
    },
  },
  scenes: [
    {
      id: 'parliament',
      heading: 'Parliament Hill',
      body:
        'Right at the heart of Ottawa, on a high bluff above the Ottawa River, sits Parliament Hill. ' +
        'The buildings have copper roofs that turned green slowly over many years. This is where ' +
        'Canada’s Members of Parliament meet to make laws for the whole country.',
      image: {
        url: '/images/trips/ottawa/parliament.jpg',
        alt: 'The Centre Block of Parliament Hill with its green copper roofs and Peace Tower.',
        caption: 'Centre Block — the heart of Canada’s federal government. (Photo: Saffron Blaze, CC BY-SA 3.0, Wikimedia Commons)',
        placeholderIcon: 'building',
      },
      quiz: {
        question: 'Who works on Parliament Hill?',
        options: [
          'The Prime Minister and Members of Parliament',
          'Only tourists',
          'Hockey teams',
          'The provincial government of Ontario',
        ],
        correctIndex: 0,
        explanation:
          'Parliament Hill is the home of Canada’s federal government. The Prime Minister and elected ' +
          'Members of Parliament meet here to make laws for the whole country.',
      },
    },
    {
      id: 'rideau',
      heading: 'The Rideau Canal',
      body:
        'A long, calm waterway winds right through downtown Ottawa. In the summer, boats pass through ' +
        'a series of locks to travel between the Ottawa River and Lake Ontario. In the winter, the ' +
        'canal freezes and turns into the longest skating rink in the world — kilometres long!',
      image: {
        url: '/images/trips/ottawa/rideau.jpg',
        alt: 'The Rideau Canal locks stepping down toward the Ottawa River.',
        caption: 'The canal locks, step by step down to the river — a UNESCO World Heritage Site, opened in 1832. (Photo: shankar s., CC BY 2.0, Wikimedia Commons)',
        placeholderIcon: 'water',
      },
      quiz: {
        question: 'In winter, the Rideau Canal becomes…',
        options: [
          'The longest skating rink in the world',
          'A snowmobile trail',
          'A road for cars',
          'A water park',
        ],
        correctIndex: 0,
        explanation:
          'Every winter, the Rideau Canal freezes solid and Ottawa opens it for skating — about 7.8 km ' +
          'of skating surface, the longest in the world.',
      },
    },
    {
      id: 'byward',
      heading: 'ByWard Market',
      body:
        'Just east of Parliament Hill, ByWard Market is one of Canada’s oldest open-air markets — first ' +
        'opened in 1826. Caleb gets a BeaverTail (a sweet pastry that’s a Canadian classic). Owen finds ' +
        'a small bookstore. Tessa wanders into a poster shop. Izzy can’t decide between three different ' +
        'flavours of fudge.',
      image: {
        url: '/images/trips/ottawa/byward.jpg',
        alt: 'Rows of maple syrup jugs of every size at a ByWard Market stall.',
        caption: 'Maple syrup at the market — stalls have been trading here since 1826. (Photo: Pierre André, CC BY-SA 4.0, Wikimedia Commons)',
        placeholderIcon: 'market',
      },
      quiz: {
        question: 'ByWard Market is famous for being…',
        options: [
          'One of Canada’s oldest markets',
          'The largest shopping mall in Canada',
          'An air-traffic control centre',
          'A military base',
        ],
        correctIndex: 0,
        explanation:
          'ByWard Market dates to 1826 — older than Canada itself. It’s still a working market with ' +
          'food stalls, shops, restaurants, and street performers.',
      },
    },
    {
      id: 'museum',
      heading: 'Canadian Museum of History',
      body:
        'Across the river in Gatineau, the Canadian Museum of History is full of exhibits about the ' +
        'people who have lived in this land for thousands of years. The Grand Hall has tall totem poles ' +
        'from the Pacific coast. Caleb spends nearly an hour looking at everyday objects from across ' +
        'Canada — old skates, sewing machines, lunch boxes.',
      image: {
        url: '/images/trips/ottawa/museum.jpg',
        alt: 'The Grand Hall of the Canadian Museum of History, with tall totem poles and natural light.',
        caption: 'The Grand Hall houses one of the world’s largest indoor collections of totem poles. (Photo: shankar s., CC BY 2.0, Wikimedia Commons)',
        placeholderIcon: 'monument',
      },
      quiz: {
        question: 'The Grand Hall’s totem poles were carved by Indigenous peoples of…',
        options: [
          'The Pacific Northwest coast',
          'The prairies',
          'Northern Ontario only',
          'The Caribbean',
        ],
        correctIndex: 0,
        explanation:
          'Totem poles are strongly associated with First Nations of the Pacific Northwest coast — ' +
          'including British Columbia and into Alaska.',
      },
    },
  ],
  outro: {
    heading: 'Heading home',
    body:
      'The drive home is quieter — everyone’s tired but happy. Mama T says, “Now THAT was a good ' +
      'weekend.” Dada T already has a list of places to visit next trip. And back at home, the house ' +
      'is starting to feel like ours.',
    image: {
      url: '/images/trips/ottawa/drive-home.jpg',
      alt: 'Highway 401 sweeping toward the Toronto skyline.',
      caption: 'Ottawa → Toronto on the 401 — about 4½ hours by car. (Photo: Kenny Louie, CC BY 2.0, Wikimedia Commons)',
      placeholderIcon: 'bridge',
    },
    coinsAwarded: 25,
  },
};

const NYC_TRIP: Trip = {
  id: 'trip.act2.nyc',
  actId: 'act2',
  destination: 'New York City',
  title: 'Long weekend in New York City',
  intro: {
    heading: 'Welcome to New York!',
    body:
      'The T Family’s first international trip! After showing our passports at the border, we flew ' +
      'from Toronto to New York City — barely 90 minutes in the air. Eight and a half million people ' +
      'live here, more than in any other city in North America. Tessa has the subway map open already.',
    image: {
      url: '/images/trips/nyc/skyline.jpg',
      alt: 'The Manhattan skyline with its towers of glass and steel.',
      placeholderIcon: 'skyline',
      caption: 'Manhattan — the heart of New York City. (Photo: King of Hearts, CC BY-SA 3.0, Wikimedia Commons)',
    },
  },
  scenes: [
    {
      id: 'liberty',
      heading: 'The Statue of Liberty',
      body:
        'A ferry carries us across the harbour to Liberty Island. The statue was a gift from France ' +
        'in 1886, and for millions of immigrants arriving by ship, she was the very first thing they ' +
        'saw of their new home. She’s made of copper — and like the roofs of Parliament Hill back home, ' +
        'she slowly turned green.',
      image: {
        url: '/images/trips/nyc/liberty.jpg',
        alt: 'The Statue of Liberty on its island pedestal, green against the sky.',
        placeholderIcon: 'monument',
        caption: 'Lady Liberty has watched over the harbour since 1886. (Photo: Don Ramey Logan, CC BY 4.0, Wikimedia Commons)',
      },
      quiz: {
        question: 'Why is the Statue of Liberty green?',
        options: [
          'It was painted green to match the sea',
          'Its copper skin slowly oxidized over time',
          'It’s covered in moss',
          'Green was France’s national colour',
        ],
        correctIndex: 1,
        explanation:
          'The statue’s thin copper plates reacted with air and rain over about 30 years, forming a ' +
          'green layer called a patina — the same thing that happened to Parliament Hill’s copper roofs.',
      },
    },
    {
      id: 'central-park',
      heading: 'Central Park',
      body:
        'Right in the middle of the busiest city imaginable sits an enormous rectangle of green — ' +
        'bigger than 500 soccer fields. People are jogging, rowing boats, having picnics. Caleb finds ' +
        'a red squirrel. Izzy sketches the skyline rising over the trees. It’s hard to believe the ' +
        'whole thing was designed and built on purpose, starting in 1857.',
      image: {
        url: '/images/trips/nyc/central-park.jpg',
        alt: 'Central Park’s green lawns and lake with the city skyline behind.',
        placeholderIcon: 'mountain',
        caption: 'An engineered wilderness in the middle of Manhattan. (Photo: CC BY-SA 4.0, Wikimedia Commons)',
      },
      quiz: {
        question: 'Why did New York build such a huge park downtown?',
        options: [
          'Nobody wanted to live in the middle',
          'City leaders believed crowded city-dwellers needed green space for health and rest',
          'The land was too swampy for buildings',
          'It was left over farmland nobody bought',
        ],
        correctIndex: 1,
        explanation:
          'In the 1850s, reformers argued that everyone — not just the rich with country homes — ' +
          'deserved fresh air and nature. Many cities followed: Mount Royal in Montreal was designed ' +
          'by the same architect, Frederick Law Olmsted.',
      },
    },
    {
      id: 'subway',
      heading: 'Riding the subway',
      body:
        'Tessa is in heaven: the New York subway has 472 stations — the most of any system in the ' +
        'world — and runs 24 hours a day, every day. We buy a family pass and ride from Manhattan all ' +
        'the way out to Queens. Owen times the trains. Dada T quietly compares everything to the TTC.',
      image: {
        url: '/images/trips/nyc/subway.jpg',
        alt: 'A New York City subway train arriving at a station platform.',
        placeholderIcon: 'transit',
        caption: 'The R train at Queens Plaza — 472 stations, 24 hours a day, since 1904. (Photo: EmperorOfNYC, CC BY-SA 4.0, Wikimedia Commons)',
      },
      quiz: {
        question: 'The New York subway opened in 1904. Toronto’s subway opened in 1954. How much older is New York’s?',
        options: ['25 years', '50 years', '75 years', '100 years'],
        correctIndex: 1,
        explanation:
          '1954 − 1904 = 50 years. When Toronto opened Canada’s first subway line, New Yorkers had ' +
          'already been riding theirs for half a century.',
      },
    },
    {
      id: 'queens-food',
      heading: 'Eating the world in Queens',
      body:
        'Queens may be the most diverse place on Earth — people from over 120 countries live here, ' +
        'speaking some 160 languages. Which means: the food. We share dumplings, tacos, samosas, and ' +
        'Greek pastries, all on one street. Mama T declares it the best research she’s ever done. ' +
        'It reminds us of Toronto — half the people in both cities were born in another country.',
      image: {
        url: '/images/trips/nyc/queens-food.jpg',
        alt: 'A bustling food street in Queens with vendors and many cuisines.',
        placeholderIcon: 'market',
        caption: 'A street-food stall — some 160 languages are spoken in Queens. (Photo: CC BY-SA 4.0, Wikimedia Commons)',
      },
      quiz: {
        question: 'Queens and Toronto are alike because in both places…',
        options: [
          'Everyone speaks French',
          'About half the residents were born outside the country',
          'The subway is free',
          'They share a mayor',
        ],
        correctIndex: 1,
        explanation:
          'Both Toronto and Queens are among the most multicultural places in the world — in each, ' +
          'roughly half the people were born in another country, and you can hear dozens of languages ' +
          'on a single street.',
      },
    },
    {
      id: 'broadway',
      heading: 'A Broadway matinée',
      body:
        'For our last afternoon: a real Broadway musical. The theatre district has about 41 big ' +
        'theatres packed around Times Square, and people come from all over the world to see shows ' +
        'here. The lights, the orchestra, the singing — even Owen, who claimed musicals were "not ' +
        'his thing," is on his feet clapping at the end.',
      image: {
        url: '/images/trips/nyc/broadway.jpg',
        alt: 'Bright theatre marquees and crowds in the Broadway theatre district at dusk.',
        placeholderIcon: 'building',
        caption: 'Times Square, the heart of the theatre district. (Photo: Sam valadi, CC BY 2.0, Wikimedia Commons)',
      },
      quiz: {
        question: 'A "matinée" is…',
        options: [
          'An afternoon performance',
          'The most expensive seat',
          'A type of musical about mornings',
          'The final show of a run',
        ],
        correctIndex: 0,
        explanation:
          'Matinée comes from "matin" — French for morning — and today means a daytime performance. ' +
          'A French word, on an American stage, explained by a Canadian family. Languages travel!',
      },
    },
  ],
  outro: {
    heading: 'Au revoir, New York',
    body:
      'On the flight home, everyone votes for their favourite part. Tessa: the subway. Caleb: the ' +
      'squirrel (obviously). Izzy: sketching in Central Park. Owen: secretly, the musical. Mama T and ' +
      'Dada T just smile — the pool is being dug in the backyard when we land, and the house feels ' +
      'more like home than ever.',
    image: {
      url: '/images/trips/nyc/outro.jpg',
      alt: 'An airplane window view of New York City as the plane heads home.',
      placeholderIcon: 'bridge',
      caption: 'New York → Toronto: about 90 minutes by air. (Photo: Famartin, CC BY-SA 3.0, Wikimedia Commons)',
    },
    coinsAwarded: 30,
  },
};

const LONDON_TRIP: Trip = {
  id: 'trip.act3.london',
  actId: 'act3',
  destination: 'London',
  title: 'A week in London',
  intro: {
    heading: 'Mind the gap — welcome to London!',
    body:
      'Our first trip across an ocean! Seven hours in the air, five time zones, and suddenly it’s ' +
      'tomorrow afternoon. We’re jet-lagged and thrilled. London is where Canada’s parliament style, ' +
      'the King on our coins, and half of Owen’s civics homework all come from. Dada T has a ' +
      'laminated itinerary. Of course he does.',
    image: {
      url: '/images/trips/london/skyline.jpg',
      alt: 'The Palace of Westminster and Big Ben along the River Thames.',
      caption: 'The Palace of Westminster — the original "Parliament Hill." (Photo: CC BY-SA 2.5, Wikimedia Commons)',
      placeholderIcon: 'skyline',
    },
  },
  scenes: [
    {
      id: 'tower',
      heading: 'The Tower of London (and its ravens)',
      body:
        'Nearly a thousand years old — a fortress, a palace, and once a very famous prison. The Crown ' +
        'Jewels live here under heavy guard. So do six ravens, by royal decree: legend says if the ' +
        'ravens ever leave, the kingdom falls. Caleb spends his whole visit with two of them, ' +
        'Jubilee and Munin, who pose like they know they’re famous.',
      image: {
        url: '/images/trips/london/tower.jpg',
        alt: 'Two ravens, Jubilee and Munin, perched on a railing at the Tower of London with the White Tower behind.',
        caption: 'Jubilee and Munin, official Tower ravens. (Photo: Colin, CC BY-SA 4.0, Wikimedia Commons)',
        placeholderIcon: 'monument',
      },
      quiz: {
        question: 'According to legend, what happens if the ravens leave the Tower?',
        options: [
          'The kingdom falls',
          'It rains for a year',
          'The jewels disappear',
          'Nothing — but they get no snacks',
        ],
        correctIndex: 0,
        explanation:
          'The legend says the Crown — and Britain itself — falls if the ravens leave. So the Tower ' +
          'employs a Ravenmaster to keep at least six ravens happy, fed, and famous.',
      },
    },
    {
      id: 'museum',
      heading: 'The British Museum',
      body:
        'Two million years of human history under one spectacular glass roof. The Rosetta Stone — the ' +
        'slab that unlocked Egyptian hieroglyphs — draws the biggest crowd. Tessa points out that many ' +
        'treasures here came from other countries long ago, and museums now debate what should be ' +
        'returned. A big question, asked out loud, in the middle of the Great Court.',
      image: {
        url: '/images/trips/london/museum.jpg',
        alt: 'The British Museum’s Great Court with its sweeping glass roof.',
        caption: 'The Great Court — the largest covered square in Europe. (Photo: David Iliff, CC BY-SA 3.0, Wikimedia Commons)',
        placeholderIcon: 'building',
      },
      quiz: {
        question: 'Why was the Rosetta Stone so important?',
        options: [
          'It was the world’s biggest stone',
          'The same text in three scripts let scholars finally decode Egyptian hieroglyphs',
          'It told the future',
          'It was made of gold',
        ],
        correctIndex: 1,
        explanation:
          'The same decree was carved in hieroglyphs, Demotic, and ancient Greek. Scholars could read ' +
          'the Greek — and used it as the key to crack the other two. One stone unlocked a civilization.',
      },
    },
    {
      id: 'tube',
      heading: 'Riding the Tube',
      body:
        '“Mind the gap!” The London Underground opened in 1863 — the world’s FIRST subway, running on ' +
        'steam back then. Tessa is starstruck: this is the system every other metro copied, including ' +
        'New York’s and Toronto’s. Surprise fact: more than half the “Underground” actually runs above ' +
        'ground, which is how Owen wins a bet against Dada T in the rain at Brent Cross.',
      image: {
        url: '/images/trips/london/tube.jpg',
        alt: 'A red-fronted London Underground train arriving at an outdoor platform in the rain.',
        caption: 'A Northern line train — above ground, in proper London weather. (Photo: CC BY-SA 2.0, Wikimedia Commons)',
        placeholderIcon: 'transit',
      },
      quiz: {
        question: 'The London Underground (1863) was the world’s first subway. How much older is it than Toronto’s (1954)?',
        options: ['51 years', '71 years', '91 years', '101 years'],
        correctIndex: 2,
        explanation:
          '1954 − 1863 = 91 years. When Toronto opened Canada’s first subway, London’s had been running ' +
          'for nearly a century — and had already switched from steam to electric.',
      },
    },
    {
      id: 'greenwich',
      heading: 'Greenwich — standing on the line',
      body:
        'A boat down the Thames brings us to the Royal Observatory, home of the Prime Meridian — ' +
        'longitude zero, the line the whole world measures from. We stand with one foot in the eastern ' +
        'hemisphere and one in the western. Izzy calculates that Toronto is five time zones behind us, ' +
        'which means, as Caleb puts it, “back home, this morning hasn’t even happened yet.”',
      image: {
        url: '/images/trips/london/greenwich.jpg',
        alt: 'The Prime Meridian line marked at the Royal Observatory in Greenwich.',
        caption: 'Longitude 0° — every time zone on Earth is measured from this line. (Photo: CC BY-SA 4.0, Wikimedia Commons)',
        placeholderIcon: 'monument',
      },
      quiz: {
        question: 'It’s 3:00 pm in London. What time is it in Toronto (5 hours behind)?',
        options: ['8:00 pm', '10:00 am', '12:00 noon', '8:00 am'],
        correctIndex: 1,
        explanation:
          '3:00 pm minus 5 hours = 10:00 am. Time zones exist because Earth spins — and they’re all ' +
          'counted from the very line under our feet at Greenwich.',
      },
    },
    {
      id: 'westminster',
      heading: 'Westminster — where our Parliament came from',
      body:
        'Our last stop: the Palace of Westminster, where the UK Parliament has met for centuries. ' +
        'Inside, it’s strangely familiar — a green-benched Commons, a Speaker’s chair, a mace — ' +
        'because Ottawa copied all of it. Owen narrates like a tour guide: “Canada took this system, ' +
        'kept the good furniture, and added maple syrup.” The actual tour guide hires him on the spot ' +
        '(not really, but she does laugh).',
      image: {
        url: '/images/trips/london/skyline.jpg',
        alt: 'The Palace of Westminster seen across the Thames.',
        caption: 'Westminster — the system Ottawa was modelled on. (Photo: CC BY-SA 2.5, Wikimedia Commons)',
        placeholderIcon: 'building',
      },
      quiz: {
        question: 'Why does Canada’s Parliament look so much like the UK’s?',
        options: [
          'Pure coincidence',
          'Canada adopted the Westminster parliamentary system from Britain',
          'The same architect built both',
          'The UK copied Canada',
        ],
        correctIndex: 1,
        explanation:
          'Canada inherited the Westminster system — Commons, Speaker, Question Period, responsible ' +
          'government — and then made it its own with a constitution and Charter. Evolution, not revolution.',
      },
    },
  ],
  outro: {
    heading: 'Cheerio, London',
    body:
      'On the flight home we cross five time zones backwards and Caleb declares time travel “real, ' +
      'basically.” The memory book gains its third postcard. The house is repaired, upgraded, ' +
      'observatoried, and pooled. Mama T looks at the laminated itinerary for the NEXT trip that ' +
      'Dada T has somehow already printed. It says TOKYO, with a question mark. The question mark ' +
      'is doing a lot of work.',
    image: {
      url: '/images/trips/london/outro.jpg',
      alt: 'Tower Bridge at dusk over the Thames.',
      caption: 'Tower Bridge at dusk — last look before the flight home. (Photo: Diliff, CC BY-SA 3.0, Wikimedia Commons)',
      placeholderIcon: 'bridge',
    },
    coinsAwarded: 35,
  },
};

export const TRIPS: Record<string, Trip> = {
  [OTTAWA_TRIP.id]: OTTAWA_TRIP,
  [NYC_TRIP.id]: NYC_TRIP,
  [LONDON_TRIP.id]: LONDON_TRIP,
};

/** Which act ID maps to which trip. */
export const TRIP_FOR_ACT: Record<string, string> = {
  act1: OTTAWA_TRIP.id,
  act2: NYC_TRIP.id,
  act3: LONDON_TRIP.id,
};
