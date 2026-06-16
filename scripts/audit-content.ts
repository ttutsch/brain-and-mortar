// Static content audit: catches the high-density bugs that "typecheck passes"
// never would — wrong answer indices, unsolvable robot/route puzzles, broken
// cross-references. Run via:
//   node_modules/.bin/esbuild scripts/audit-content.ts --bundle --platform=node --format=esm --outfile=/tmp/audit.mjs && node /tmp/audit.mjs
import { MISSIONS, CHAPTER_REPAIRS } from '../src/data/missions';
import type {
  Mission, Tier, RobotDir,
  QuizRound, DragMatchRound, CodeRobotRound, PathPlannerRound,
} from '../src/data/missions';

const problems: string[] = [];
const warnings: string[] = [];
let missionCount = 0;
let roundCount = 0;

// House item ids that the home view can actually render/celebrate.
const HOUSE_ITEM_IDS = new Set([
  'repair.living', 'repair.yard', 'repair.basement', 'repair.garage',
  'upgrade.workshop', 'upgrade.kitchen', 'upgrade.bedrooms', 'upgrade.pool',
  'upgrade.basement', 'upgrade.familyroom', 'upgrade.observatory', 'upgrade.porch',
]);

function err(where: string, msg: string) { problems.push(`✗ ${where}: ${msg}`); }
function warn(where: string, msg: string) { warnings.push(`⚠ ${where}: ${msg}`); }

/* ---------- per-pattern checks ---------- */

function checkQuiz(where: string, round: QuizRound) {
  if (!round.questions?.length) { err(where, 'quiz round has no questions'); return; }
  round.questions.forEach((q, i) => {
    const w = `${where} q${i + 1}`;
    if (!q.options || q.options.length < 2) err(w, `only ${q.options?.length ?? 0} options`);
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= (q.options?.length ?? 0))
      err(w, `correctIndex ${q.correctIndex} out of range (0..${(q.options?.length ?? 0) - 1})`);
    q.options?.forEach((o, oi) => { if (!o || !o.trim()) err(w, `option ${oi} is empty`); });
    const seen = new Set<string>();
    q.options?.forEach((o) => {
      const norm = o.trim().toLowerCase();
      if (seen.has(norm)) warn(w, `duplicate option text "${o}"`);
      seen.add(norm);
    });
    if (!q.question?.trim()) err(w, 'empty question text');
  });
}

function checkDragMatch(where: string, round: DragMatchRound) {
  if (!round.pairs?.length) { err(where, 'drag-match round has no pairs'); return; }
  const ids = new Set<string>();
  round.pairs.forEach((p, i) => {
    const w = `${where} pair${i + 1}`;
    if (ids.has(p.id)) err(w, `duplicate pair id "${p.id}"`);
    ids.add(p.id);
    if (!p.item?.label?.trim()) err(w, 'empty item label');
    if (!p.slot?.label?.trim()) err(w, 'empty slot label');
  });
  // Duplicate slot labels make the puzzle ambiguous (two right answers).
  const slotSeen = new Map<string, number>();
  round.pairs.forEach((p) => slotSeen.set(p.slot.label, (slotSeen.get(p.slot.label) ?? 0) + 1));
  for (const [label, n] of slotSeen) if (n > 1) warn(where, `slot label "${label}" appears ${n}× (ambiguous match)`);
}

const DELTA: Record<RobotDir, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 },
};
const LEFT: Record<RobotDir, RobotDir> = { up: 'left', left: 'down', down: 'right', right: 'up' };
const RIGHT: Record<RobotDir, RobotDir> = { up: 'right', right: 'down', down: 'left', left: 'up' };

/** Min number of F/L/R commands to reach the goal, or Infinity if impossible. */
function minCommands(round: CodeRobotRound): number {
  const walls = new Set((round.walls ?? []).map((w) => `${w.x},${w.y}`));
  const inB = (x: number, y: number) => x >= 0 && y >= 0 && x < round.cols && y < round.rows;
  const start = round.start;
  const seen = new Set<string>();
  let frontier: Array<{ x: number; y: number; dir: RobotDir }> = [{ ...start }];
  seen.add(`${start.x},${start.y},${start.dir}`);
  let depth = 0;
  while (frontier.length) {
    for (const s of frontier) if (s.x === round.goal.x && s.y === round.goal.y) return depth;
    const next: typeof frontier = [];
    for (const s of frontier) {
      const moves: Array<{ x: number; y: number; dir: RobotDir }> = [
        { x: s.x, y: s.y, dir: LEFT[s.dir] },
        { x: s.x, y: s.y, dir: RIGHT[s.dir] },
      ];
      const nx = s.x + DELTA[s.dir].dx, ny = s.y + DELTA[s.dir].dy;
      if (inB(nx, ny) && !walls.has(`${nx},${ny}`)) moves.push({ x: nx, y: ny, dir: s.dir });
      for (const m of moves) {
        const k = `${m.x},${m.y},${m.dir}`;
        if (!seen.has(k)) { seen.add(k); next.push(m); }
      }
    }
    frontier = next;
    depth++;
    if (depth > 200) break;
  }
  return Infinity;
}

function checkRobot(where: string, round: CodeRobotRound) {
  if (round.cols < 1 || round.rows < 1) { err(where, `bad grid ${round.cols}×${round.rows}`); return; }
  const inB = (p: { x: number; y: number }) => p.x >= 0 && p.y >= 0 && p.x < round.cols && p.y < round.rows;
  if (!inB(round.start)) err(where, `start (${round.start.x},${round.start.y}) off the ${round.cols}×${round.rows} grid`);
  if (!inB(round.goal)) err(where, `goal (${round.goal.x},${round.goal.y}) off grid`);
  const wallSet = new Set((round.walls ?? []).map((w) => `${w.x},${w.y}`));
  (round.walls ?? []).forEach((w) => { if (!inB(w)) err(where, `wall (${w.x},${w.y}) off grid`); });
  if (wallSet.has(`${round.start.x},${round.start.y}`)) err(where, 'start sits on a wall');
  if (wallSet.has(`${round.goal.x},${round.goal.y}`)) err(where, 'goal sits on a wall');
  if (round.start.x === round.goal.x && round.start.y === round.goal.y) warn(where, 'start === goal (trivial)');
  const min = minCommands(round);
  if (min === Infinity) { err(where, 'goal is UNREACHABLE (walls block every path)'); return; }
  if (round.maxCommands != null && min > round.maxCommands)
    err(where, `needs ≥ ${min} commands but maxCommands is ${round.maxCommands} — IMPOSSIBLE`);
}

function dijkstra(round: PathPlannerRound): number {
  const adj = new Map<string, Array<{ to: string; cost: number }>>();
  round.nodes.forEach((n) => adj.set(n.id, []));
  round.edges.forEach((e) => {
    adj.get(e.from)?.push({ to: e.to, cost: e.cost });
    adj.get(e.to)?.push({ to: e.from, cost: e.cost });
  });
  const dist = new Map(round.nodes.map((n) => [n.id, Infinity]));
  dist.set(round.startId, 0);
  const unvisited = new Set(round.nodes.map((n) => n.id));
  while (unvisited.size) {
    let cur: string | null = null, best = Infinity;
    for (const id of unvisited) { const d = dist.get(id)!; if (d < best) { best = d; cur = id; } }
    if (cur == null) break;
    unvisited.delete(cur);
    for (const e of adj.get(cur) ?? []) {
      const alt = best + e.cost;
      if (alt < dist.get(e.to)!) dist.set(e.to, alt);
    }
  }
  return dist.get(round.goalId)!;
}

function checkPath(where: string, round: PathPlannerRound) {
  const ids = new Set(round.nodes.map((n) => n.id));
  if (!ids.has(round.startId)) err(where, `startId "${round.startId}" not in nodes`);
  if (!ids.has(round.goalId)) err(where, `goalId "${round.goalId}" not in nodes`);
  round.edges.forEach((e, i) => {
    if (!ids.has(e.from)) err(where, `edge ${i} from "${e.from}" missing`);
    if (!ids.has(e.to)) err(where, `edge ${i} to "${e.to}" missing`);
    if (e.cost <= 0) err(where, `edge ${i} has non-positive cost ${e.cost}`);
  });
  round.nodes.forEach((n) => {
    if (n.x < 0 || n.x > 600 || n.y < 0 || n.y > 340) warn(where, `node "${n.id}" at (${n.x},${n.y}) outside 600×340 viewBox`);
  });
  const optimal = dijkstra(round);
  if (!Number.isFinite(optimal)) { err(where, `goal "${round.goalId}" UNREACHABLE from "${round.startId}"`); return; }
  if (round.objective !== 'min' && typeof round.objective === 'object') {
    if (optimal > round.objective.budget)
      err(where, `cheapest route is ${optimal} but budget is ${round.objective.budget} — IMPOSSIBLE`);
  }
}

/* ---------- mission walk ---------- */

for (const mission of Object.values(MISSIONS) as Mission[]) {
  missionCount++;
  ([1, 2, 3] as Tier[]).forEach((tier) => {
    const v = mission.tiers[tier];
    if (!v) { err(`${mission.id} T${tier}`, 'missing tier variant'); return; }
    const rounds = (v.params as { rounds?: unknown[] }).rounds;
    if (!Array.isArray(rounds) || !rounds.length) { err(`${mission.id} T${tier}`, `pattern ${v.pattern} has no rounds`); return; }
    rounds.forEach((round, ri) => {
      roundCount++;
      const where = `${mission.id} T${tier} r${ri + 1} [${v.pattern}]`;
      if (v.pattern === 'quiz') checkQuiz(where, round as QuizRound);
      else if (v.pattern === 'drag-match') checkDragMatch(where, round as DragMatchRound);
      else if (v.pattern === 'code-robot') checkRobot(where, round as CodeRobotRound);
      else if (v.pattern === 'path-planner') checkPath(where, round as PathPlannerRound);
      else err(where, `unknown pattern "${v.pattern}"`);
    });
  });
}

/* ---------- cross-references ---------- */

const allMissionIds = new Set(Object.keys(MISSIONS));
const referencedByChapters = new Set<string>();
for (const ch of CHAPTER_REPAIRS) {
  if (!HOUSE_ITEM_IDS.has(ch.houseItemId)) err(ch.chapterId, `houseItemId "${ch.houseItemId}" not renderable in HouseStatus`);
  ch.requiredMissionIds.forEach((id) => {
    referencedByChapters.add(id);
    if (!allMissionIds.has(id)) err(ch.chapterId, `requires missing mission "${id}"`);
  });
}
for (const id of allMissionIds) if (!referencedByChapters.has(id)) warn('chapters', `mission "${id}" is in MISSIONS but no chapter requires it (orphan)`);

/* ---------- report ---------- */

console.log(`\nAudited ${missionCount} missions, ${roundCount} rounds.\n`);
if (warnings.length) { console.log(`WARNINGS (${warnings.length}):`); warnings.forEach((w) => console.log('  ' + w)); console.log(''); }
if (problems.length) { console.log(`PROBLEMS (${problems.length}):`); problems.forEach((p) => console.log('  ' + p)); }
else console.log('No blocking problems found. ✓');
console.log('');
process.exit(problems.length ? 1 : 0);
