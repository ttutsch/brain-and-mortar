# The T Family — Game Design Document

*Working draft, v0.2 — names, numbers, and scope are all up for editing.*

**Changes since v0.1**: three Canadian-grade-based tiers (was two), explicit player-profile/account system, visual design direction, content-branching architecture.
**Changes in v0.3**: kid names locked (Tessa, Owen, Izzy, Caleb); Ontario curriculum chosen; v1 is text-only (no audio narration); v1 uses AI-generated illustrations; difficult-history topics deferred.
**Changes in v0.4**: parent names locked (Mama T, Dada T); hometown is Toronto; Tier 4 (Grade 9+) deferred; account storage is local for v1, cloud later; schema designed so audio narration and video clips can be added later without rework.
**Changes in v0.5**: the house starts as a fixer-upper. Progress now drives a visible two-phase transformation — repairs first (Act I), upgrades later (Acts II–III). New §7.5 on the transformation arc; Act I chapter rewards relabeled as repairs; reward economy split between repairs and upgrades.
**Changes in v0.6**: Act I trip stays in Ottawa; **Acts II and III trips are now international** (New York City, then London). Trip scenes carry image slots from day one. Act II renamed "Out into the world"; Act III renamed "Across the ocean." Chapter 7 ("School heritage project") refocused on world geography + family migration stories so it bridges into the international trip; Chapter 12's civics now compares political systems.
**Changes in v0.7 (build status)**: All of Act I is now playable — Chapters 1–4 fully authored (16 missions × 3 tiers), so the Ottawa trip fires organically. Second mini-game pattern (quiz) implemented alongside drag-match, with per-tier pattern switching live. Cosmetics shop shipped (6 items, rendered on the house). Trip scenes use real CC-licensed Wikimedia photos (Ottawa + NYC; credits in `public/images/trips/*/CREDITS.md`). NYC trip authored and wired to Act II. House scene rebuilt as a layered illustrated SVG with ambient animation, trampoline coda, and upgrade visuals.

---

## 1. Vision in one sentence

A story-driven web game where kids from kindergarten through grade 8 join the T Family — who've just moved into a fixer-upper — and learn math, science, geography, history, coding/logic, and Canadian social studies on everyday adventures and big trips. As missions are completed, the house visibly transforms from beat-up to beautiful; major milestones reward big family trips.

## 2. Why this works

- **Story is the hook, not the lesson.** Kids do "Help Mom plan the road trip" (geography + math), not "Worksheet 4-B."
- **The house is the progress bar.** The T Family just moved into a fixer-upper. Every chapter end repairs something visibly broken (Act I) or adds something new (Acts II+). Progress isn't a number — it's a literal home transformation.
- **Big trips = milestone payoffs.** Acts close with a family trip to a real Canadian place, doubling as themed Canadian social studies content.
- **Characters carry the curriculum.** Each T-family member has a personality and a "specialty subject."
- **One game, three tiers.** The same chapter feels right for a 6-year-old or a 13-year-old because the *content* adapts, not just the *difficulty knob*.

## 3. Audience & age tiers

Three tiers mapped to Canadian grade bands. A player's tier is set automatically from their age but a parent can override.

| Tier | Grades | Typical ages | Internal codename | Reading/UI defaults |
|---|---|---|---|---|
| **Tier 1** | K – Grade 3 | 5–8 | "Explorers" | Big buttons, very simple sentences, sight words, heavy picture support, no time pressure (no audio narration in v1 — see §18) |
| **Tier 2** | Grades 4–6 | 9–11 | "Navigators" | Self-reading, paragraph-length text, gentle time goals |
| **Tier 3** | Grades 7–8 | 12–14 | "Pathfinders" | Multi-paragraph text, more abstract vocabulary, real challenge, deeper subjects |

> **Ages 14–15 / Grade 9+**: deferred to a future phase as Tier 4. v1 ships K–Grade 8 only.

## 4. Player accounts & profiles

### Model: Family account with kid profiles

One **family account** (the umbrella) holds multiple **player profiles** (one per kid). This is the same pattern Netflix Kids, Khan Academy Kids, Toca Boca, and Nintendo use for the same age range — it's privacy-friendly, COPPA/PIPEDA-friendly, and lets siblings share a device without sharing progress.

```
 Family account (parent-owned, email + password)
   ├── Player profile: Avery, age 7   → Tier 1
   ├── Player profile: Sam,   age 10  → Tier 2
   ├── Player profile: Jordan,age 13  → Tier 3
   └── Parent Zone (PIN-locked)
        ├── See each kid's progress
        ├── Override a kid's tier
        ├── Toggle features (narration, time pressure)
        └── Account/billing settings
```

### What each player profile stores
- Display name + avatar (chosen from a curated set, not custom-uploaded — safer)
- Birth date (so tier auto-advances when the kid has a birthday)
- Current tier (auto-computed from birth date; parent can override)
- Settings preferences (narration on/off, contrast, motion)
- Per-mission completion records, with skill tags + success rate
- Coins, cosmetics inventory, chapter/act progress
- Unlocked house upgrades

### Sign-in flow
- **First launch**: parent creates the family account (email + password, agrees to terms), then creates one or more kid profiles.
- **Returning launches**: app shows a "Who's playing?" profile picker — Netflix-style. Kid taps their avatar, no password needed for kids.
- **Optional kid PIN**: a parent can set a 4-digit PIN on a profile if siblings keep stepping on each other's progress.
- **Parent Zone**: any sensitive action (tier override, account settings) re-prompts for the parent password.

### Storage model
- **MVP**: profiles and progress live in `localStorage` / IndexedDB on the device. No backend, no PII leaves the device. Multiple kid profiles on one device works fine.
- **Phase 2**: optional cloud sync (Firebase Auth or Supabase) so a kid can play on a tablet and a Chromebook with the same profile. Cloud sync is opt-in, parent-initiated.

The save schema is designed v1 to migrate cleanly to the cloud — same shape locally or remote, just a different storage adapter. See §17.

### Privacy stance
- Kids never enter their own email or real name (just display name).
- No advertising, ever. No third-party trackers. No analytics in MVP.
- If we add analytics in Phase 2, it'll be privacy-preserving (aggregate counts only) and disclosed in the parent zone.

## 5. The T Family

All six family members are now named.

| Character | Role | Age | Personality | Specialty |
|---|---|---|---|---|
| **Mama T** | Parent | ~40 | Curious, hands-on, builds things in the garage | Science, maker projects |
| **Dada T** | Parent | ~42 | Loves maps, plans every road trip down to the snack | Geography, Canadian social studies |
| **Tessa** | Oldest kid | 13 | Coder, debater, runs the school newspaper | Coding, current affairs |
| **Owen** | Kid | 11 | History buff and hockey player | History, sports math |
| **Izzy** | Kid | 9 | Math whiz and visual artist | Math, logic, art |
| **Caleb** | Youngest | 6 | Loves animals; "why?" about everything | Reading, basic science |

The four kids' ages roughly span the player tiers — useful because players can pick a "study buddy" close to their own age. Kid-to-age assignment above is a proposal; easy to swap. Personalities and specialties travel with the age slot, not the name.

**Hometown: Toronto.** Specific neighborhood TBD (a detached-home neighborhood — Leaside, Bloor West, or a near-Toronto suburb like Mississauga or Oakville — to fit the home upgrades like backyard pool, trampoline, sports court in the driveway). Toronto unlocks rich Chapter 1 geography (Lake Ontario, CN Tower, the Don Valley, the TTC) and a natural civics tie-in (provincial capital).

## 6. Visual design direction

The look needs to feel warm and inviting to a 6-year-old *and* a 13-year-old. That rules out two extremes: nothing too "cocomelon-y" (alienates older kids) and nothing too edgy/blocky (uninviting for younger ones and parents).

### Style target
- **Illustrated 2D**, hand-drawn feel, slightly chunky linework, soft fills.
- Reference vibe: think the warmth of *Hilda* (Netflix), the everyday-detail of *Bluey*, and the cozy density of *Animal Crossing: New Horizons*. The reading-book quality of *The Day You Begin* (Jacqueline Woodson / Rafael López).
- Characters with proportional bodies — Tate (6) actually looks 6, Tara (13) actually looks 13. Avoid uniform chibi proportions.
- Subtle ambient animation in the home view: blinking, a cat's tail flicking, leaves rustling. Static-but-alive.

### Palette & UI
- **Warm earth-tone base** (cream, terracotta, sage, deep blue) with **bright accent pops** on interactive elements (mustard, coral, teal).
- Rounded corners, soft drop shadows, generous whitespace.
- Larger touch targets in Tier 1; same layout grid scales tighter in Tier 3.
- **Typography**: high-x-height, friendly sans-serif (Nunito or Quicksand for body; possibly a more characterful display face for chapter titles). Dyslexia-friendly font is a switchable option.

### How "warm and inviting" reads at each tier
- **Tier 1**: more saturated, more visual detail, characters smile more, more environmental anim.
- **Tier 2**: same world, slightly cleaner UI, more text, less sparkle.
- **Tier 3**: same world, but the UI dials down the cute — fewer stickers, more "real app" affordances. The characters and home stay the same. *Crucially: it's the same world, not three different art styles.*

### Production approach for v1: AI-generated illustrations

**Decision**: v1 uses AI image generation for illustrations. Trades absolute quality for speed and iteration — appropriate for proving the game out, harder to maintain consistency without discipline. To make it work in v1:

- **Lock the style guide first.** Before any production asset, generate 10–15 sample images that define palette, line/shading style, character face style, and environment style. Reference this guide in every subsequent prompt.
- **Character reference workflow.** AI tools struggle with consistent characters across many scenes. Use a tool with explicit character reference support (Midjourney `--cref`, or a LoRA trained on a base character image). Generate a model sheet per character and reuse it.
- **Standardize asset specs.** Same aspect ratio, same lighting, same camera angle per category (e.g., all room views are 3/4 perspective from front-left).
- **Human curation pass.** Every shipped asset is reviewed; outliers regenerated or hand-edited. Faces especially — AI faces drift, and uncanny faces will read as off to both kids and parents.
- **Confirm commercial rights** on the chosen tool before locking it in (Midjourney and DALL-E both allow commercial use on current paid plans; check terms when we start).

Phase 2 may swap to commissioned illustration for hero assets if style drift becomes a quality problem.

## 7. Game world: the home as hub

The home view is the player's main screen between missions. It's an interactive 2D side-on cutaway (think a storybook illustration), 4–6 rooms visible at once, scrollable.

**The house starts as a fixer-upper.** Cracked paint, dusty windows, an overgrown backyard, a broken fence, a leaky basement, a squeaky front door, cobwebs in the corners. The T Family just moved in and there's *a lot* to do.

Click a family member to start a mission. Click a damaged area to see what needs fixing — or, later, click an empty space to see a locked upgrade silhouette hinting at future additions.

**Why this works**: kids see their accumulated progress every time they open the game. The home physically transforms — first from beat-up to lived-in (repairs), then from lived-in to truly theirs (upgrades). The visible arc *is* the reward.

## 7.5. The house transformation arc

The house changes in two phases, each tied to story progress:

- **Phase 1 — Repairs (Act I).** Visible damage gets fixed: paint goes on, weeds get cleared, the fence is mended, cobwebs vanish, the porch step is replaced. By the end of Act I the house is *clean, warm, and home* — nothing is broken anymore. The Ottawa trip celebrates getting through the fix-up phase; a coda — the trampoline arrives in the freshly cleared yard — closes the act.
- **Phase 2 — Upgrades (Acts II and III).** Now that the house is solid, new features get added: garage workshop, kitchen island, pool, basement rec room, observatory, front porch redesign. These are the "wow" milestones.

Each chapter completion advances one specific repair (Act I) or upgrade (Act II/III). The home view always shows what's coming next as a "before" preview — so players know exactly which mission unlocks which change. Small extras (e.g., a swing, a pet bed, garden decor) are coin-purchasable so kids can chase cosmetics on their own.

## 8. Core loop

```
   ┌────────── Pick a family member ──────────┐
   │                                          │
   ▼                                          │
 Mission intro (story beat, 30–60s)           │
   │                                          │
   ▼                                          │
 Mini-game (academic content, 3–10 min)       │
   │                                          │
   ▼                                          │
 Reward: coins + story progress ──────────────┘

 Every ~6–10 missions → Chapter complete → House upgrade
 Every 3–4 chapters    → Act complete    → Family trip
```

**Session length target**: 10–20 minutes. One or two missions. Easy to stop, easy to resume.

## 9. Chapters, acts, and the year-one map

The chapter map below stays the same across tiers — every player goes to Ottawa in Act I. The *content of each mission* differs by tier (see §11). This keeps siblings able to talk about the same chapter even at different tiers.

### Act I — "Welcome to the T Family (the house needs work)" (4 chapters)

Every Act I chapter ends with a **repair** — the house goes from beat-up toward warm and homey.

| Ch | Theme | Lead character | Subjects touched | Repair unlocked |
|---|---|---|---|---|
| 1 | Move-in day | Mama T | Math (measuring rooms), reading | Scrub the dusty living room; fix the squeaky front door |
| 2 | Backyard discovery | Caleb | Science (bugs, plants), basic geography | Clear the weedy yard; mend the broken fence |
| 3 | Family game night | Izzy | Logic puzzles, simple coding | Dry out & clean the leaky basement |
| 4 | Hockey tournament weekend | Owen | Sports math, intro Canadian history | Patch the cracked driveway; fix the garage door |

**Act I trip: Ottawa weekend** — Parliament Hill, Rideau Canal, Canadian Museum of History. **Act I coda**: when the family returns, the **trampoline** arrives in the freshly cleared yard.

### Act II — "Out into the world" (4 chapters)

With the house repaired, Act II adds **upgrades** — new features on top of the now-solid home. The act-end trip is the family's **first international trip**.

| Ch | Theme | Lead character | Subjects touched | Upgrade unlocked |
|---|---|---|---|---|
| 5 | The garage robot | Mama T & Tessa | Coding, physics | Garage workshop |
| 6 | Family cookbook | Dada T & Izzy | Fractions, scaling recipes, world food geography | Big kitchen island |
| 7 | Where our family is from | Owen | World geography, family migration stories, basic world history | Bedroom redesigns (personal touches per kid) |
| 8 | Storm week | Tessa | Earth science, weather data, statistics | **Pool** |

**Act II trip: a long weekend in New York City** — Statue of Liberty, Central Park, the subway, world cuisines in Queens, a Broadway matinée. Themed unit on world geography (cities, currencies, time zones), Canada–US relations, and what city life looks like elsewhere.

### Act III — "Across the ocean"

More upgrades, ending with the showpiece basement. The act-end trip widens the family's world.

| Ch | Theme | Lead character | Subjects touched | Upgrade unlocked |
|---|---|---|---|---|
| 9 | The basement build | Mama T | Geometry, budgeting | **Super-cool basement** rec room |
| 10 | News at the kitchen table | Tessa | Current affairs, media literacy | Family room redesign |
| 11 | Science fair | Izzy | Scientific method, charts | Backyard observatory |
| 12 | The hometown election | Dada T | Civics, comparing political systems | Front-porch redesign |

**Act III trip: a week in London, England** — Tower of London, the British Museum, the Tube, a day-trip to Greenwich (zero meridian, time-zone story), and afternoon tea at home. Themed unit on transatlantic history, world time zones, monarchy vs. parliamentary democracy as a compare/contrast with Canada.

### Future trips (beyond Act III)
The trip cadence keeps expanding the world: Tokyo (Asia, public transit), Paris (French language, Canadian-French heritage tie-in for the eventual French version), Cairo (ancient history, climate, the Nile), Sydney (southern hemisphere, marine biology), Rio (Latin America, Carnaval, biodiversity), Nairobi (Africa, savannah ecology). Lots of room — pick what fits the curriculum mix you want.

## 10. Subject curriculum map by tier

Skills below are intentionally a *slice* per subject — enough to prove value, not a full curriculum replacement. **Curriculum reference: Ontario** — the Kindergarten Program and Grades 1–8 elementary curricula for Mathematics, Science and Technology, Social Studies (Grades 1–6), History and Geography (Grades 7–8), and Language. Tier 1 = K–Grade 3, Tier 2 = Grades 4–6, Tier 3 = Grades 7–8.

### Math
- **Tier 1 (K–3)**: number sense to 100, addition/subtraction within 100, simple fractions (halves, quarters), money (Canadian coins/bills), telling time, measurement (cm/m), simple shapes.
- **Tier 2 (4–6)**: multiplication/division facts, fractions/decimals/percents, order of operations, perimeter/area/volume, data: bar/line graphs, intro to integers.
- **Tier 3 (7–8)**: integer operations, rates and ratios, linear relations, pre-algebra (one-step then two-step equations), circles, basic probability.

### Science
- **Tier 1**: living vs. non-living, plant and animal needs, weather, materials sorting, five senses.
- **Tier 2**: states of matter, simple machines, ecosystems (Canadian biomes), forces and motion basics, electricity basics.
- **Tier 3**: cells and systems, heat & energy transfer, fluids, ecology and human impact, simple lab method.

### Geography
- **Tier 1**: provinces and territories (recognize and place), our town vs. other towns, maps and directions, landform vocab.
- **Tier 2**: capital cities, climate zones, thematic maps, world continents and oceans, basic latitude/longitude.
- **Tier 3**: physical vs. political geography, population patterns, urban vs. rural, global interconnectedness.

### History
- **Tier 1**: "then and now" stories, family-tree timelines, holidays and traditions in Canada.
- **Tier 2**: pre-contact Indigenous nations of the regions we visit, early settlement, Confederation basics, 20th-century turning points (age-appropriate).
- **Tier 3**: deeper Confederation, 20th-century turning points (industrialization, the world wars at a high level), immigration history, contemporary Canada. *Difficult/traumatic history topics (residential schools, internment, etc.) deferred to a later phase pending external review.*

### Coding & logic
- **Tier 1**: sequencing, patterns, "direct the robot" arrow puzzles.
- **Tier 2**: Scratch-style block coding — loops, conditionals, simple variables; debugging broken sequences.
- **Tier 3**: more advanced block coding + intro to text code (a guided Python or JS line or two); functions, lists.

### Canadian social studies
Connective tissue across geography, history, civics. The Act trips are the main vehicle and are themed per region. For v1: include Indigenous geography, place names, and contemporary contributions; defer difficult/traumatic history topics to a later phase pending external review.

### Current affairs *(deferred per scope decision)*
Reserved UI slot (the kitchen table). Will need a curated, age-appropriate content pipeline before adding.

## 11. Content branching by tier — the architecture

This is the part that makes "one chapter, three age-appropriate experiences" actually work.

### Three layers of variation

| Layer | What varies | How |
|---|---|---|
| **Story wrapper** | Narration text, character dialogue, mission framing | Each mission has 3 versions of the wrapper text, keyed by tier |
| **Mini-game choice** | Which pattern is used | A mission can specify a different pattern per tier (e.g., Tier 1: arrow puzzle / Tier 2: block code / Tier 3: line code) |
| **Mini-game parameters** | Number ranges, vocabulary, time pressure, hint frequency | Single parameter object per tier feeds the same engine |

Within a tier, **adaptive difficulty** still applies: 3 right in a row → next item escalates; 2 wrong in a row → simplify and offer a hint. Target a 70–80% success rate (the "flow channel").

### Content authoring shape

A mission is a JSON-ish data file, roughly:

```jsonc
{
  "id": "act1.ch1.m1.measuring",
  "lead": "mama_t",
  "subjects": ["math", "reading"],
  "tiers": {
    "1": { "wrapper": "...", "pattern": "drag-match",   "params": { "numRange": [1,20],  "narration": true  } },
    "2": { "wrapper": "...", "pattern": "drag-match",   "params": { "numRange": [1,100], "narration": false } },
    "3": { "wrapper": "...", "pattern": "path-planner", "params": { "numRange": [1,500], "withFractions": true } }
  },
  "skillTags": ["math.measurement", "math.units"]
}
```

Authoring guidelines for content writers:
- **Same story beat** across tiers (so siblings can talk about it).
- **Tier 1 wrapper** ≤ 2 sentences per screen, sight-word heavy, narrate-ready.
- **Tier 3 wrapper** can use idiom and assume background knowledge.
- **One mini-game pattern can serve multiple tiers** — preferred when feasible to save work.
- **Mini-game patterns differ between tiers** only when the underlying skill genuinely differs (the coding example above is the clearest case).

### Mini-game patterns (reusable templates)

Six patterns serve almost all content. New "missions" are mostly content, not code.

1. **Quiz / multiple-choice** — fast, themed, useful for facts.
2. **Drag-and-drop sort/match** — geography, science sorting, math equivalences.
3. **Path / route planner** — math, geography, logic.
4. **Code-the-robot** — arrow puzzles → block code → text code, tier-dependent.
5. **Story-with-choices** — branching narrative with comprehension checks. Great for history.
6. **Build / arrange** — design a room, set up a science experiment, open-ended within a goal.

## 12. Age adaptation within a tier

Even within a single tier, kids vary. The same Tier 2 player who breezes through fractions may struggle with decimals. So within a tier:

- **Performance tracking per skill tag**. Each mission emits success/fail records by skill (`math.fractions.equivalent`, `geo.provinces.locate`, etc.).
- **Adaptive item selection**. In a multi-item mini-game (say 8 items), the next item is chosen from a pool, biased by recent performance.
- **Hints and retries**. Wrong answers never just say "no" — they show a brief, kind explanation and offer another try. No red Xs.
- **Confidence-based escalation**. After mastering a skill in a tier, a player occasionally sees a "stretch" item from the next tier. If they nail it consistently, parent gets a "consider promoting tier" suggestion.

## 13. Reward economy

Four parallel reward tracks so progress is always visible:

| Track | Granularity | Earned by | What it does |
|---|---|---|---|
| **Coins** | Per mission | Completing missions | Spent on cosmetics and small extras (a swing, garden decor, a pet bed) |
| **House repairs** | Per Act I chapter | Finishing a chapter | Permanent visual fix — peeling paint goes, weeds clear, fence mends |
| **House upgrades** | Per Act II/III chapter | Finishing a chapter | Permanent visual addition — workshop, pool, observatory |
| **Trip badges/postcards** | Per act | Finishing an act | Memory book; some unlock cosmetics |

Coins are generous. No grinding. No real-money purchases anywhere.

The repairs/upgrades split matters: in Act I, completing a chapter *fixes* something obviously broken (high satisfaction — "we made it better"). In Act II+, completing a chapter *adds* something new (high satisfaction — "we built something cool"). Same emotional reward, different verb.

## 14. Parent Zone

Significantly more important now that we have multiple kid profiles. PIN/password-locked. Includes:

- Per-kid dashboard: time played, missions completed, subject coverage, recent skills mastered, trouble spots.
- Tier override per kid.
- Settings toggles per kid: narration on/off, time pressure, contrast, motion.
- Account: change parent password, add/remove kid profile, export progress.
- Cloud sync toggle (Phase 2).

MVP includes a *minimum-viable* Parent Zone: profile management + tier override. Full dashboard ships in Phase 2.

## 15. Visual & accessibility standards

- Keyboard navigation throughout.
- Screen-reader labels on all interactive elements.
- Captions on any audio; transcripts on narration.
- Dyslexia-friendly font option.
- High-contrast theme toggle.
- Reduce-motion respects the OS-level preference.
- Color is never the only way to convey state (always paired with icon or label).
- Tier 1 specifically: larger touch targets (min 44×44 logical px → bigger in Tier 1), higher contrast, larger text size.

## 16. Technical architecture

### Stack
- **TypeScript** end-to-end.
- **React + Vite** for the app shell, profile picker, menus, Parent Zone.
- **Phaser 3** (or a small custom Canvas/SVG renderer) for the home view and mini-games. Decision deferred to scaffolding step — Phaser is the safe default.
- **No backend in MVP**. Static deploy (Netlify / Cloudflare Pages / similar).

### Data layer
- A single `StorageAdapter` interface with two implementations:
  - `LocalStorageAdapter` (MVP): writes profiles + progress to `localStorage` / IndexedDB.
  - `CloudStorageAdapter` (Phase 2): same interface, talks to Firebase/Supabase.
- All game code uses the adapter, never touches storage directly. This makes the local→cloud migration a one-line config change.

### Account/profile flow
- App boots → `StorageAdapter.getFamilyAccount()`.
  - If none: show Welcome / family-account creation screen.
  - If exists: show "Who's playing?" profile picker.
- Profile selected → load profile, set current tier (computed from birth date unless overridden) → render home view.
- Parent Zone link in corner → tap → re-prompt parent password → enter Parent Zone.

### Content layer
- Missions are data files (JSON/YAML) loaded on demand.
- Each mission file contains all three tier variants.
- A `ContentService` resolves "give me mission X for tier T" and returns the assembled mission object.
- Story wrappers are localizable from day one (string keys, not hard-coded), even if English is the only language at launch — Canadian French is a likely Phase 2 addition.

### Designed for future audio + video (added in v0.4)
v1 is text-only, but the schema and UI are built so audio narration and short video clips can be added later **without rework**. Concretely:

- **Mission schema** has optional `audioUrl` and `videoUrl` fields on each piece of text content (story wrappers, item prompts, hint copy). They're absent in v1 content; the renderer just skips them.
- **UI layout** reserves space next to text blocks for a future play button. Hidden in v1; not a layout change in Phase 2.
- **Story-with-choices** pattern is built so a "scene" can be (a) static illustration + text — v1 default, (b) static illustration + text + audio — later, or (c) short video clip + text — later. Same code path, different content.
- **Narration toggle** is wired through the settings store from day one but defaults off and is hidden in the UI until any audio content exists.

This is cheap to do now and expensive to retrofit, so we do it now.

### Asset pipeline
- SVG-first for crisp scaling.
- Sprite sheets only where animation is needed.
- Keep total MVP download under ~5 MB.

### Privacy & compliance
- Local-only MVP minimizes risk.
- When cloud sync ships, real privacy review needed: COPPA (US users), PIPEDA (Canada), and likely Quebec's Law 25 if French version launches.
- Parental consent flow at account creation; clear minor-data policy.

## 17. MVP scope (Phase 1 deliverable)

**"Welcome to the T Family" — Chapter 1, all three tiers playable.**

Account & profiles:
- Family account creation (email + password, local-only).
- "Who's playing?" profile picker with 1–4 kid profiles.
- Profile creation (display name, avatar, birth date → tier auto-set).
- Parent Zone: tier override, password change. (Dashboard deferred.)

Gameplay:
- Animated home view, 5 rooms + yard, fully clickable, **rendered in initial beat-up state** (cracked paint, dusty windows, weedy yard, broken fence, cobwebbed basement, squeaky front door).
- "Needs work" indicators on damaged elements, with a label showing which chapter will repair each one.
- Character intros for all 6 family members.
- **4 missions** in Chapter 1 (one each: math, science, reading, geography).
- Each mission authored for **all 3 tiers** with appropriate variation.
- **2 mini-game patterns** fully implemented: *drag-match* and *path planner*.
- Coins + 1 cosmetic to prove the loop.
- **Chapter-end reward**: Chapter 1's repair lands — living room is scrubbed clean, squeaky front door fixed. Visible "before → after" swap in the home view.
- Adaptive difficulty within tier.

Cross-cutting:
- Save/load via localStorage with the StorageAdapter abstraction.
- Accessibility basics: keyboard nav, captions, high-contrast toggle, reduce-motion.
- Style guide locked. AI illustrations needed: **before/after pair for every Chapter 1 repair element** (living room, front door) plus the beat-up baseline for all rooms.

**Out of scope for MVP** (explicit): cloud sync, full Parent dashboard, current affairs, the trip mode, acts beyond Act I Ch 1, **any audio narration (text-only in v1)**, difficult/traumatic history topics, French.

## 18. Risks & decisions

### Decided (locked for v1)
- **Curriculum reference**: Ontario (Kindergarten Program + Grades 1–8 elementary curricula).
- **Tier coverage**: Tiers 1–3 (K–Grade 8). Tier 4 (Grade 9+) deferred to a future phase.
- **Account storage**: localStorage / IndexedDB for v1; cloud sync added once the game is fully set up.
- **Audio narration**: deferred — v1 is text-only. Schema and UI built to accept it later (see §16).
- **Video content**: deferred — v1 is text + illustration only. Schema built to accept it later.
- **Difficult-history topics**: deferred — out of v1 scope.
- **Art style production**: AI-generated illustrations with locked style guide + character references + human curation (see §6).
- **Hometown**: Toronto (specific neighborhood TBD).
- **Family names**: Mama T, Dada T, Tessa, Owen, Izzy, Caleb.

### Watch items (not blockers)
- **AI illustration drift.** Style and character consistency across hundreds of assets is the biggest production risk. Style guide + character references mitigate but don't eliminate. Plan: human review every shipped asset.
- **Before/after art doubles asset count.** The fixer-upper concept means roughly every Act I element needs a "broken" and a "fixed" illustration in the same style. Bake this into the style-guide phase — don't generate a single asset until both states can be produced consistently.
- **Tier 1 with no narration.** Removing audio means K–Grade 1 kids who can't yet read need very heavy picture support and may need parent assist. Worth validating with real young players early.
- **Privacy.** Local-only v1 is low risk, but we should still ship a one-page privacy policy at launch. Cloud sync (Phase 2) needs a real legal review for COPPA/PIPEDA/Quebec Law 25.
- **Working title.** "T Family" is fine for now; real product name should be tested with target families. With "Mama T" and "Dada T" as parent names, the T branding now feels intentional rather than placeholder.

## 19. Build status & what comes next

**Built and playable (v0.9):**
- Accounts, profiles, tier auto-assignment + parent override, Parent Zone, per-profile settings (high contrast, easy-read font, reduce motion).
- **All three acts**: Chapters 1–12 authored for all 3 tiers — 40 missions total (Act I: 4×4, Acts II–III: 8×3).
- **Four mini-game patterns**: drag-match, quiz, code-the-robot (grid programming with command budgets), path-planner (route graphs with min-cost/budget objectives, Dijkstra-checked). Per-tier pattern switching live.
- Chapter unlocks: Act I repairs + Acts II/III upgrades all grant house transformations (workshop, kitchen island, bedrooms, pool, basement rec, family room, observatory, porch).
- **Three trips** with real CC-licensed Wikimedia photos + attribution: Ottawa (Act I), New York City (Act II), London (Act III). Each fires organically when its act completes.
- **Skill mastery tracking** per skill tag, recorded on every mission completion.
- **Adaptive stretch rounds** (§12 confidence-based escalation): high-mastery players below Tier 3 get an optional bonus round from the next tier up, +5 coins.
- Cosmetics shop (6 items rendered on the house), memory book (trip postcards with locked future slots), adventure progress meter.
- Raina-style comic art: house scene, six SVG character portraits, subject vignettes on mission intros — all placeholders for the eventual AI pass (STYLE_GUIDE.md).

**Next candidates:**
1. **Playtest with real kids** across the three tiers — the content base is now big enough that play-feel feedback beats more authoring.
2. **Parent dashboard** — mastery data is accumulating; surface it (per-kid skills, trouble spots, time played).
3. **AI illustration pass** — replace SVG placeholders per STYLE_GUIDE.md (needs an image-gen tool run).
4. **Mission 4 slots for Acts II–III** — chapters there have 3 missions vs Act I's 4; add a fourth per chapter if pacing feels thin.
5. **Audio narration** (Tier 1 wants it) — schema is ready; record or TTS.
6. **Tokyo trip / Act IV** — the outro teases it.
7. **Cloud sync + privacy policy + deploy** — the launch checklist.
