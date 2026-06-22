import { useMemo, useState } from 'react';
import type { PathPlannerRound } from '../data/missions';

interface Props {
  params: PathPlannerRound;
  onSolved: (stats: { wrongAttempts: number }) => void;
}

const INK = '#3A3027';

/**
 * The path-planner mini-game: build a route across a small map by tapping
 * connected stops. Two objectives: find the *cheapest* route (checked against
 * Dijkstra), or arrive within a budget. Wrong submissions get a kind nudge
 * and the route stays editable.
 */
export function PathPlanner({ params, onSolved }: Props) {
  const [path, setPath] = useState<string[]>([params.startId]);
  const [message, setMessage] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [solved, setSolved] = useState(false);

  const nodeById = useMemo(
    () => Object.fromEntries(params.nodes.map((n) => [n.id, n])),
    [params.nodes]
  );

  // Undirected adjacency with costs.
  const neighbors = useMemo(() => {
    const m = new Map<string, Array<{ id: string; cost: number }>>();
    for (const n of params.nodes) m.set(n.id, []);
    for (const e of params.edges) {
      m.get(e.from)?.push({ id: e.to, cost: e.cost });
      m.get(e.to)?.push({ id: e.from, cost: e.cost });
    }
    return m;
  }, [params.nodes, params.edges]);

  const optimalCost = useMemo(
    () => dijkstra(params.nodes.map((n) => n.id), neighbors, params.startId, params.goalId),
    [params.nodes, neighbors, params.startId, params.goalId]
  );

  const last = path[path.length - 1];
  const total = useMemo(() => {
    let sum = 0;
    for (let i = 1; i < path.length; i++) {
      const step = neighbors.get(path[i - 1])?.find((n) => n.id === path[i]);
      sum += step?.cost ?? 0;
    }
    return sum;
  }, [path, neighbors]);

  const atGoal = last === params.goalId;
  const canExtendTo = (id: string) =>
    !solved && !atGoal && id !== last && !path.includes(id) &&
    (neighbors.get(last)?.some((n) => n.id === id) ?? false);

  function tapNode(id: string) {
    if (solved) return;
    setMessage(null);
    if (canExtendTo(id)) {
      setPath((p) => [...p, id]);
    }
  }

  function undo() {
    if (solved || path.length <= 1) return;
    setMessage(null);
    setPath((p) => p.slice(0, -1));
  }

  function check() {
    if (!atGoal || solved) return;
    if (params.objective === 'min') {
      if (total === optimalCost) {
        succeed(`Perfect — ${total} ${params.costUnit} is the shortest possible route!`);
      } else {
        setWrongAttempts((n) => n + 1);
        setMessage(
          `You made it in ${total} ${params.costUnit} — but there’s a cheaper way. ` +
          `Tap Undo and look for a better route.`
        );
      }
    } else {
      if (total <= params.objective.budget) {
        succeed(`Made it with ${total} ${params.costUnit} — within the ${params.objective.budget} ${params.costUnit} budget!`);
      } else {
        setWrongAttempts((n) => n + 1);
        setMessage(
          `That route costs ${total} ${params.costUnit} — over the ${params.objective.budget} ${params.costUnit} budget. ` +
          `Tap Undo and try another way.`
        );
      }
    }
  }

  function succeed(msg: string) {
    setSolved(true);
    setMessage(`🎉 ${msg}`);
    setTimeout(() => onSolved({ wrongAttempts }), 1100);
  }

  const objectiveText =
    params.objective === 'min'
      ? `Find the CHEAPEST route from ${nodeById[params.startId].label} to ${nodeById[params.goalId].label}.`
      : `Get from ${nodeById[params.startId].label} to ${nodeById[params.goalId].label} spending at most ${params.objective.budget} ${params.costUnit}.`;

  return (
    <div className="path-planner" aria-label="Plan a route on the map">
      <p className="pp-objective">{objectiveText}</p>

      <svg viewBox="0 0 600 340" className="pp-map" role="img" aria-label="Route map">
        <rect x="0" y="0" width="600" height="340" fill="#FDF3DE" />
        {/* Edges */}
        {params.edges.map((e, i) => {
          const a = nodeById[e.from];
          const b = nodeById[e.to];
          const onPath = isEdgeOnPath(path, e.from, e.to);
          return (
            <g key={i}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={onPath ? '#D77A52' : '#C9BFA8'}
                strokeWidth={onPath ? 7 : 4}
                strokeLinecap="round"
              />
              <g>
                <rect
                  x={(a.x + b.x) / 2 - 17} y={(a.y + b.y) / 2 - 12}
                  width="34" height="22" rx="6"
                  fill="#FFF9EE" stroke={INK} strokeWidth="1.8"
                />
                <text
                  x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 4}
                  textAnchor="middle" fontSize="13" fontWeight="800"
                  fontFamily="Quicksand, sans-serif" fill={INK}
                >
                  {e.cost}
                </text>
              </g>
            </g>
          );
        })}
        {/* Nodes */}
        {params.nodes.map((n) => {
          const visited = path.includes(n.id);
          const isStart = n.id === params.startId;
          const isGoal = n.id === params.goalId;
          const reachable = canExtendTo(n.id);
          return (
            <g
              key={n.id}
              className="pp-node"
              onClick={() => tapNode(n.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  tapNode(n.id);
                }
              }}
              tabIndex={0}
              style={{ cursor: reachable ? 'pointer' : 'default' }}
              role="button"
              aria-label={
                n.label +
                (isStart ? ', start' : '') +
                (isGoal ? ', the star' : '') +
                (visited && !isStart && !isGoal ? ', on your route' : '') +
                (reachable ? ' — press Enter to travel here' : '')
              }
            >
              <circle
                cx={n.x} cy={n.y} r={isStart || isGoal ? 22 : 18}
                fill={isGoal ? '#F2D26C' : visited ? '#D77A52' : reachable ? '#8FCBB5' : '#FFF9EE'}
                stroke={INK} strokeWidth="3"
                className={reachable ? 'pp-node-reachable' : undefined}
              />
              {isGoal && <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="18">★</text>}
              {isStart && !isGoal && <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14">🏠</text>}
              <text
                x={n.x} y={n.y + (isStart || isGoal ? 40 : 36)}
                textAnchor="middle" fontSize="13.5" fontWeight="700"
                fontFamily="Nunito, sans-serif" fill={INK}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pp-bar">
        <span className="pp-total">
          Total: <strong>{total}</strong> {params.costUnit}
          {params.objective !== 'min' && (
            <span className="muted"> / {params.objective.budget} {params.costUnit} budget</span>
          )}
        </span>
        <div className="row" style={{ gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={undo} disabled={solved || path.length <= 1}>
            ⌫ Undo
          </button>
          <button type="button" className="btn btn-primary" onClick={check} disabled={!atGoal || solved}>
            {atGoal ? 'Check route' : 'Reach the star first'}
          </button>
        </div>
      </div>

      {message && <div className="cr-message" role="status">{message}</div>}
    </div>
  );
}

function isEdgeOnPath(path: string[], a: string, b: string): boolean {
  for (let i = 1; i < path.length; i++) {
    if ((path[i - 1] === a && path[i] === b) || (path[i - 1] === b && path[i] === a)) return true;
  }
  return false;
}

/** Plain Dijkstra over the small planner graphs (≤ ~10 nodes). */
function dijkstra(
  ids: string[],
  neighbors: Map<string, Array<{ id: string; cost: number }>>,
  start: string,
  goal: string,
): number {
  const dist = new Map(ids.map((id) => [id, Infinity]));
  dist.set(start, 0);
  const unvisited = new Set(ids);
  while (unvisited.size > 0) {
    let current: string | null = null;
    let best = Infinity;
    for (const id of unvisited) {
      const d = dist.get(id) ?? Infinity;
      if (d < best) { best = d; current = id; }
    }
    if (current === null) break;
    unvisited.delete(current);
    if (current === goal) break;
    for (const n of neighbors.get(current) ?? []) {
      const alt = best + n.cost;
      if (alt < (dist.get(n.id) ?? Infinity)) dist.set(n.id, alt);
    }
  }
  return dist.get(goal) ?? Infinity;
}
