# Brain & Mortar 🏡

*Learn. Build. Explore.*

A story-driven learning game for kids from **kindergarten through Grade 8**. Players join the T Family — who've just moved into a fixer-upper — and complete short academic missions (math, science, geography, history, coding/logic, Canadian social studies) to fix up and upgrade the house, earning big family trips along the way.

**▶ Play it: https://ttutsch.github.io/brain-and-mortar/** &nbsp;<sub>(live once GitHub Pages is enabled — see below)</sub>

---

## What's inside

- **40 missions** across 3 acts, each authored for **3 age tiers** (K–3 "Explorers", 4–6 "Navigators", 7–8 "Pathfinders") — the same chapter adapts its content to the player's age.
- **4 mini-game types**: match-up, multiple-choice quiz, code-the-robot (grid programming), and route-planner.
- **The house is the progress bar** — it visibly transforms from beat-up to beautiful as chapters are completed.
- **3 family trips** (Ottawa, New York City, London) with real photos and themed quizzes, collected in a memory book.
- **Family accounts** with per-kid profiles, a PIN-protected Parent Zone, a coin shop, skill tracking, and accessibility settings (high-contrast, easy-read font, reduced motion).
- **Local-only & private**: all data stays in the browser (`localStorage`). No accounts leave the device, no tracking, no ads.

## Tech

Vite + React + TypeScript. No backend. Builds to static files.

```bash
npm install      # one-time
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build → dist/
npm run typecheck
```

Content-integrity audits (re-run when adding missions):

```bash
node_modules/.bin/esbuild scripts/audit-content.ts --bundle --platform=node --format=esm --outfile=/tmp/audit.mjs && node /tmp/audit.mjs
```

## Deploying (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main`. To turn it on once: **repo Settings → Pages → Source: "GitHub Actions"**. The live site then updates on each push.

## Credits & licensing

- **Code**: MIT (see `LICENSE`).
- **Trip photographs**: sourced from Wikimedia Commons under Creative Commons licenses (CC BY / CC BY-SA / CC0). Each photo's author and license is recorded in the `CREDITS.md` file beside it under `public/images/`. These images keep their own licenses; reuse must preserve attribution.
- **Flag of Canada**: public domain (Wikimedia Commons).
- Character and house art are placeholder SVGs pending a commissioned/AI illustration pass (see `STYLE_GUIDE.md`).

## Status

Working prototype. See `DESIGN.md` for the full design doc and roadmap. Before any wide release, the design notes flag a content/curriculum review (especially Indigenous and difficult-history topics) as still outstanding.
