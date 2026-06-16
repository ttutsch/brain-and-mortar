# Brain & Mortar — Visual Style Guide & AI Illustration Brief

> Companion to [DESIGN.md](DESIGN.md). The design doc says *what* we're building; this guide says *what it looks like and how we generate it*. Anyone running an image-gen tool should read this end-to-end before producing a single shipped asset.

---

## 1. Vision in three words

**Warm. Inviting. Storybook.**

The game lives in the same emotional register as illustrated children's books — *Hilda*, *Bluey*, *Animal Crossing: New Horizons*, *The Day You Begin*. Not Pixar-realism. Not Cocomelon-bright. Not Roblox-blocky. A real Canadian family in a slightly-magic, lovingly-drawn world.

## 2. Style anchors (look at these first)

When briefing a tool, point its image-reference feature at examples in this register:

- **Raina Telgemeier's graphic novels (*Smile*, *Sisters*, *Guts*, *Drama*) — the PRIMARY anchor.** Clean, uniform ink outlines; flat colour fills with simple cel shading (flat darker shapes, never gradients); believable suburban realism — real houses, real kitchens, real schools — drawn warmly and simply; expressive faces on proportional bodies; a palette that's warm but never neon. This is the register the whole game should read in: *realistic comic*, not cartoon abstraction.
- **Luke Pearson's *Hilda*** — secondary, for environmental mood and autumnal warmth.
- ***Bluey* (TV)** — for warmth, domestic detail, family chemistry.
- ***Animal Crossing: New Horizons*** — for cozy density and friendly silhouettes only; our look is flatter and more inked than AC.

**Avoid as references**: Disney/Pixar 3D realism, anime/manga big-eye style, flat-icon Material Design, Sesame Street puppet-realism, generative-AI default "fantasy illustration" look, and over-geometric "corporate flat" vector art.

## 3. Color palette

These hex values match the in-game CSS tokens. Don't drift.

| Role | Color | Hex |
|---|---|---|
| Cream (walls, paper) | ![](https://placeholder) | `#FFF6EC` |
| Cream 2 (surfaces) | | `#FBE9D2` |
| Terracotta (roof, accents) | | `#D77A52` |
| Terracotta dark (line ink) | | `#B85F3D` |
| Sage (foliage) | | `#8FB39D` |
| Sage dark | | `#5E8771` |
| Deep blue (shadows, sky-deep) | | `#2D4A6B` |
| Ink (lines, primary text) | | `#2A2522` |
| Ink soft (secondary text) | | `#5C544E` |
| Mustard (accent pop) | | `#E8B547` |
| Coral (accent pop) | | `#F08572` |
| Teal (accent pop) | | `#4DA89E` |

**Rules**:
- 80% of any image should sit in the bases (cream, terracotta, sage, deep blue) plus the inks.
- Accent pops (mustard, coral, teal) are *spice* — a single object's color, a stripe on a shirt, a flower. Never the background.
- Outlines are warm brown (`#B85F3D` or `#5C544E`), never pure black.
- Shadows are warm — terracotta or deep blue, never gray.

## 4. Line & finish (Raina-style, per §2)

- **Lines**: clean, confident ink outlines at a consistent weight (~2.5–3.5 px equivalent), dark warm brown (`#3A3027`), closed shapes. Comic inking, not sketchy linework.
- **Fills**: FLAT colour. Shading is done with one flat darker shape per surface (cel shading) — an under-eave band, a shaded wall side, a shadow under a chin. **No gradients, no watercolor texture.**
- **Highlights**: simple flat shapes — a diagonal white shine on glass, a flat lighter patch on hair. Off-white (`#FFF9EE`), never pure white at full opacity.
- **Faces**: expressive and specific, comic-style — dot-and-line features that can do real emotion. Proportional bodies — Caleb at 6 looks 6, Tessa at 13 looks 13. No chibi.
- **Environments**: believable suburban realism, simplified — real architecture (siding, trim, fascia, foundation), drawn with the minimum lines that keep it true.

## 5. Cast — character model sheets

The six T-Family members. Each character needs a model sheet (3 angles + close-up of the head) that we lock and reference in every future prompt.

> **Diversity note**: the T Family is a modern Canadian family — biracial parents, multi-ethnic kids. Don't homogenize; don't stereotype. Hair and skin tones are *suggestions*, easy to revise.

### Mama T (~40, parent)
- **Build**: medium-height, sturdy, hands-on energy.
- **Hair**: black, shoulder-length, usually pulled back in a low ponytail; sometimes a bandana.
- **Skin**: medium-dark.
- **Clothes**: denim overalls over a soft tee (sleeves rolled), work boots. Practical, paint-flecked.
- **Personality cue**: tool belt or measuring tape, a small smudge of paint somewhere.
- **Accent color**: teal (`#4DA89E`).
- **Mood**: warm, curious, capable.

### Dada T (~42, parent)
- **Build**: tall, slightly lanky.
- **Hair**: medium brown, short, neatly cut; light stubble.
- **Skin**: light olive.
- **Clothes**: button-up under an open cardigan, khakis or chinos, sturdy hiking shoes.
- **Personality cue**: a rolled-up paper map sticking out of a pocket; reading glasses on a cord.
- **Accent color**: deep blue (`#2D4A6B`).
- **Mood**: thoughtful, planning, gentle.

### Tessa (13, oldest kid)
- **Build**: tall for her age, growing into it.
- **Hair**: dark brown, mid-length, often tied up with a scrunchie.
- **Skin**: medium (in between her parents).
- **Clothes**: graphic tee, jeans, classic sneakers. A laptop sleeve under her arm.
- **Personality cue**: phone in pocket, headphones around neck, opinionated eyebrows.
- **Accent color**: plum (`#A87CB5`).
- **Mood**: smart, a little wry, the family's organizer.

### Owen (11)
- **Build**: average, sporty.
- **Hair**: light brown, short, usually messy.
- **Skin**: light.
- **Clothes**: hockey jersey or team t-shirt, joggers, sneakers; sometimes a ball cap.
- **Personality cue**: hockey stick over shoulder, scuffed knees, gap-toothed grin.
- **Accent color**: terracotta (`#D77A52`).
- **Mood**: energetic, friendly, slightly competitive.

### Izzy (9)
- **Build**: small, wiry.
- **Hair**: curly red, shoulder-length, escaping any hair tie.
- **Skin**: fair, freckled across the nose.
- **Clothes**: striped overalls, often paint-stained, mismatched socks, sneakers.
- **Personality cue**: sketchbook tucked under arm, colored pencil behind one ear.
- **Accent color**: mustard (`#E8B547`).
- **Mood**: bright, observant, makes-stuff energy.

### Caleb (6, youngest)
- **Build**: small, round-cheeked.
- **Hair**: black, curly, slightly wild.
- **Skin**: medium-dark.
- **Clothes**: animal-print tee (dinosaur or fox), soft corduroy pants, sneakers.
- **Personality cue**: holding a stuffed animal companion (a small fox); wide-open "why?" face.
- **Accent color**: sage (`#8FB39D`).
- **Mood**: curious, earnest, easily delighted.

## 6. The house

### "Before" — the fixer-upper (Act I initial state)
- 1.5-story detached home, side-on 3/4 view from front-left (matches the SVG we're using now).
- Cream/beige siding, slightly faded with peeling patches.
- Terracotta tile roof, a few cracked tiles, one visibly chipped.
- Front porch with one obviously broken/sunken step.
- Squeaky front door (slightly ajar; small motion lines).
- Tall living-room window with cobwebs in upper corners; dusty interior visible.
- Side garage with a slightly off-kilter door and a cracked-asphalt driveway.
- Small basement window low to the ground, dark and slightly damp-looking.
- Front yard: overgrown weeds, scrappy grass, a wilting flower bed.
- Right side: white picket fence with two posts visibly broken/leaning and one missing entirely (a gap).
- Large oak tree on the far left.
- A small "SOLD" sign in the front yard.
- **Lighting**: late afternoon, warm golden sun from the right. Soft blue sky with one or two clouds.

**Aspect ratio**: 16:9 (or 1600 × 900 / 1920 × 1080 output).

### "After Act I" — the repaired home
- Same house, same angle.
- Walls freshly painted; no peeling.
- Roof tiles all intact.
- Porch step solid.
- Front door closed cleanly.
- Living-room window clean and bright; warm light inside.
- Garage door working; driveway smooth.
- Basement window cheerfully lit.
- Yard freshly mowed, weeds gone, flower bed perked up.
- Picket fence even and complete.
- A brand-new **trampoline** visible in the side yard.
- Window boxes with bright flowers (a Mama T touch).
- "SOLD" sign replaced with a small "T Family Home" plaque on the door.
- Same warm lighting.

### Future upgrade variants (Act II/III, plan but don't produce yet)
- Garage workshop visible through open door (Ch. 5)
- Kitchen island visible through window (Ch. 6)
- Bedroom redesigns visible through upstairs windows (Ch. 7)
- **Pool** to the right of the yard (Ch. 8)
- "Super-cool basement" rec room visible through bigger basement window (Ch. 9)
- Backyard observatory dome behind the house (Ch. 11)
- Front-porch redesign with swing (Ch. 12)

## 7. Prompt templates

> Replace `{...}` with the specifics. Always include the **Style preamble** at the top of every prompt.

### Style preamble (copy-paste into every prompt)
```
Middle-grade graphic-novel style in the spirit of Raina Telgemeier's books
(Smile, Sisters, Guts): clean uniform ink outlines in dark warm brown, FLAT
colour fills with simple cel shading (one flat darker shape per surface — no
gradients, no painterly texture), believable everyday suburban realism drawn
warmly and simply. Warm palette: cream #FFF9EE, butter-yellow #F6E3B2,
terracotta #C77E55, leaf green #7FAE5C, sky blue #C9E4F0, with mustard, coral,
and teal accents used sparingly. No pure black; no harsh rendered shadows.
Friendly proportional figures (NOT chibi). Expressive comic faces. No text or
letters in the image.
```

### Character model sheet
```
{Style preamble}

Subject: {character description from §5 — paste the full bullet list}.

Layout: model sheet with three views side by side, white background.
1) Front-facing, full body.
2) Three-quarter right view, full body.
3) Side profile, full body.
Plus a close-up of the head, three-quarter right.

This is a reference sheet for character consistency. Keep proportions and
clothing identical across all three poses.

Aspect ratio: 16:9.
```

After generating, save the best result and use it as the **character reference image** (Midjourney `--cref`, or LoRA training base) for every subsequent image with that character.

### Hero house — "before" state
```
{Style preamble}

Scene: A 1.5-story detached family home in a Toronto neighbourhood, viewed
from a 3/4 angle from the front-left. The house is a fixer-upper:
- Cream/beige siding, faded in patches with visible peeling.
- Terracotta tile roof with several cracked tiles.
- Front porch with one obviously sunken/broken step.
- Slightly ajar front door (a few small motion lines suggest a squeak).
- Tall living-room window with cobwebs in the corners; dusty inside.
- Side garage (attached) with an off-kilter door and a cracked driveway.
- Small basement window low to the ground, dark.
- Front yard overgrown with weeds; a wilting flower bed.
- White picket fence on the right with two broken/leaning posts and one
  missing entirely (a gap).
- A large oak tree on the far left.
- A small "SOLD" sign post in the front yard (just the shape, no text).
- Late-afternoon warm golden sun from the right; soft blue sky with one or
  two soft clouds.

Mood: hopeful but neglected. The house clearly needs love. Should feel like
a place you'd want to move into and fix up — not derelict, not creepy.

Aspect ratio: 16:9.
```

### Hero house — "after Act I" state
```
{Style preamble}

[Use the "before" prompt above, then ADD these changes:]
- Walls freshly painted cream, no peeling.
- Roof tiles all intact and even.
- Porch step solid and matched.
- Front door closed cleanly, freshly painted terracotta.
- Living-room window clean and bright; warm interior light glowing.
- Garage door even and working; driveway smooth.
- Basement window cheerfully lit warm yellow.
- Yard freshly mowed; weeds gone; flower bed in bloom.
- Picket fence even and complete; no broken or missing posts.
- A new TRAMPOLINE (oval, dark mat, padded rim, simple frame) on the side
  lawn.
- Window boxes with bright flowers under the front windows.
- A small "T Family Home" plaque shape on the door (no text).

Same camera angle, same warm lighting, same season. Mood: warm, cared-for,
home.

Aspect ratio: 16:9.
```

### Damage element (transparent overlay)
For each individual broken-thing we want to swap, generate it as an isolated transparent-background asset so it can overlay the "after" hero image:
```
{Style preamble}

Isolated illustration on transparent background. Subject:
{e.g., "a small pile of weedy grass clumps with a few tall thistles, suitable
for placement on a yard"}.

Hand-drawn style consistent with the rest of the T Family Game.
No background. No text. PNG with alpha.

Aspect ratio: 1:1.
```

(In practice you generate on white, then key out. Or use a tool that supports transparent output.)

### Mission scene — Chapter 1 / "Measuring the living room"
```
{Style preamble}

Scene: Inside the T Family living room, mid-afternoon. Mama T
{paste full Mama T description from §5} is standing on bare hardwood,
holding a long bright-yellow tape measure stretched along the floor. She's
mid-task, focused but smiling. Around her: a worn couch (slightly faded
upholstery), a few cardboard moving boxes stacked nearby, a single floor
lamp not yet plugged in, a window letting in warm golden afternoon light
with visible dust motes. The room is bare and dusty but full of potential.

Mood: hopeful, the beginning of making a house into a home.

Aspect ratio: 4:3.
```

### Trip scene image

Each trip scene gets one image — the hero shot for that landmark, market, or moment. There are two valid sourcing paths:

**Option A — Public-domain or freely-licensed photographs.** Strong fit for real landmarks (Parliament Hill, Statue of Liberty, the British Museum). Source options: Wikimedia Commons (most strict on licensing), Unsplash, Pexels. Always confirm the licence allows commercial reuse and that no people are identifiable (or that releases exist). Crop to 16:9 around the recognizable subject.

**Option B — AI-generated illustrations in the locked style.** Better for "vibe" scenes (the car driving home, the family at a table) and for keeping a uniform look across destinations. Use the prompt below.

```
{Style preamble}

Scene: {landmark, market, monument, transit hub, skyline — describe the
real-world place in concrete detail}. Time of day: {warm afternoon /
golden hour / blue evening}. Mood: hopeful, family-friendly, no people
identifiable in close-up. No text or signage.

Aspect ratio: 16:9.
```

**Rules for trip images regardless of source:**
- 16:9 framing, ~1600 × 900 minimum.
- No identifiable people in the foreground (privacy + casting consistency).
- No text or signage that would clash with the in-game language layer.
- Same warmth and palette range as everything else (no neon, no muddy greys).
- One image per scene + one for intro + one for outro = ~6 per trip.

### Image sourcing — picks per destination

| Destination | Suggested sources for real photos |
|---|---|
| Ottawa | Wikimedia Commons: Parliament Hill, Rideau Canal (summer + winter), ByWard Market, Canadian Museum of History. All have generous CC-licensed photos. |
| New York City | Unsplash and Wikimedia have great Manhattan skylines, Statue of Liberty, Central Park, Broadway exteriors, subway entrances. Avoid identifiable people. |
| London | Wikimedia for Tower of London, British Museum, the Thames, double-decker bus exteriors. Greenwich + the prime-meridian line are well-photographed. |
| Tokyo (future) | Unsplash has cherry blossom, Shibuya crossing (long-shot only), shrines, Shinkansen exteriors. |
| Paris (future) | Wikimedia for Eiffel, Louvre, Seine. Pexels for cafe scenes. |

### Avatar disc
For the 12 avatar swatches (currently colored circles in the app), we can either keep them as colored discs OR replace with small illustrated "tokens":
```
{Style preamble}

A circular illustrated icon, 1:1 aspect ratio, isolated on a {colorName}
background (#{hex}). Subject: a small symbolic motif — e.g., a sun, a tree,
a leaf, a paper boat, a star, a flower, a fox, a bird, a cloud, a teacup,
a pencil, a fish.

Style: warm, simple, child-friendly. No faces (these are *avatars*, not
characters). No text.

Aspect ratio: 1:1.
```

## 8. Output specs

| Asset | Aspect | Suggested resolution | Format |
|---|---|---|---|
| Hero house (before/after) | 16:9 | 1920 × 1080 | PNG |
| Damage/upgrade overlay | varies | 2x intended display | PNG with alpha |
| Mission scene (interior) | 4:3 | 1600 × 1200 | PNG or JPG |
| Trip scene (landmark, market, etc.) | 16:9 | 1600 × 900 | JPG (photos) or PNG (illustrations) |
| Character portrait (square) | 1:1 | 1024 × 1024 | PNG |
| Character model sheet | 16:9 | 1920 × 1080 | PNG |
| Avatar token | 1:1 | 512 × 512 | PNG |

All assets are reviewed by a human before shipping. Keep both the **prompt + seed** for every shipped image in a `prompts.txt` log alongside the image — that's how we re-roll consistently later.

## 9. Tooling

Any of these can produce the look. Pick one (or two — different strengths) and stick with it.

| Tool | Strengths | Watch out for |
|---|---|---|
| **Midjourney v6+** | Hand-drawn aesthetic comes naturally; `--cref` is excellent for character consistency. | Faces still drift; check every shipped one. Commercial use requires paid plan. |
| **Imagen 3 / Imagen 4 (Google)** | Very clean output, strong with environments. | Less character-consistency tooling than Midjourney; you'll lean on prompt discipline. |
| **DALL·E 3 / GPT-4o image** | Fast, good prompt adherence, easy to iterate. | Style consistency across many assets is the weakest of these three. |
| **Stable Diffusion XL + character LoRA** | Most control; trainable on your locked characters. | Technical setup required (Comfy/Auto1111). Best for high asset counts (>50 per character). |

**Recommendation for v1**: Midjourney for the hero house and character model sheets (using `--cref` for character consistency). DALL·E 3 or Imagen for one-off mission scenes once the characters are locked.

## 10. Workflow

1. **Style sample run (10–15 images).** Before any production asset, generate 10–15 throwaways using the Style preamble against varied subjects (a house, a kid reading, a tree, a kitchen, a sunset). Pick the best 3. *That set is now your style lock.* Future prompts reference these as image inputs.
2. **Character model sheets (6 images).** Generate one per character using §5 descriptions + §7 model-sheet template. Pick the best, save as the `--cref` / LoRA base.
3. **Hero house — both states (2 images).** Use the §7 templates. Generate ~6 variants per state, pick the strongest pair (they should match each other).
4. **Mission 1 interior (1 image).** Use the Mission scene template, referencing Mama T's model sheet.
5. **Avatar tokens (12 images, optional).** Only do these if you want to replace the colored discs.

Total for v1 cut: roughly **30 final shipped images** (counting the 10–15 sample-set images that stay in the design system, the 6 model sheets, the 2 hero house states, 1 mission scene, and 12 avatars). Reasonable budget for one focused session.

## 11. Quality bar

Every shipped image must clear:

- [ ] Faces friendly, no uncanny features. Re-roll any face that looks "off."
- [ ] Hands look like hands. (Still the #1 AI failure mode.)
- [ ] No text or letters in the image. (We render all text in HTML.)
- [ ] Palette stays in the §3 range. No drift to neon, pastel-only, or muddy.
- [ ] Line style matches the locked sample set.
- [ ] Commercial-use license confirmed for the tool you used.
- [ ] Prompt + seed logged alongside the file.

## 12. Don'ts

- **Don't ship without a human review pass** on every face.
- **Don't drift the palette** between assets. If one image leans neon-bright, throw it out.
- **Don't include real-world people or copyrighted character resemblances.**
- **Don't use stereotypes** in character design or environment. The family is Canadian and diverse; the world is contemporary and respectful.
- **Don't use any tool with ambiguous commercial-use terms.** Confirm in writing before generating production assets.
- **Don't render text inside images** — text is HTML so we can localize and tier-adapt it.
- **Don't generate "creepy abandoned house"** for the fixer-upper. It's hopeful, not horror.

---

## Appendix A — Asset checklist for v1 MVP

Tick these off as we generate and approve them.

### Foundation
- [ ] Style sample set (10–15 images) — establishes the look
- [ ] Palette + line-style style-guide PDF (1 page export)

### Characters
- [ ] Mama T model sheet
- [ ] Dada T model sheet
- [ ] Tessa model sheet
- [ ] Owen model sheet
- [ ] Izzy model sheet
- [ ] Caleb model sheet

### Hero environment
- [ ] House — "before" (fixer-upper) state, 16:9
- [ ] House — "after Act I" state, 16:9

### Mission 1
- [ ] Mama T measuring the living room, 4:3

### Optional polish
- [ ] 12 illustrated avatar tokens (replaces colored discs)
