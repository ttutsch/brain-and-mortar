import { useEffect, useRef, useState } from 'react';
import type { CodeRobotRound, RobotDir } from '../data/missions';

type Command = 'F' | 'L' | 'R';

interface Props {
  params: CodeRobotRound;
  onSolved: (stats: { wrongAttempts: number }) => void;
  /** When true, skip the step-by-step robot animation (in-app Reduce-motion setting). */
  reducedMotion?: boolean;
}

/** True if the OS asks for reduced motion (complements the in-app setting). */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Spoken board summary for screen-reader players, who can't see the grid. */
function describeBoard(p: CodeRobotRound): string {
  const dx = p.goal.x - p.start.x;
  const dy = p.goal.y - p.start.y;
  const sq = (n: number) => `${n} square${n === 1 ? '' : 's'}`;
  const horiz = dx === 0 ? '' : `${sq(Math.abs(dx))} to the ${dx > 0 ? 'right' : 'left'}`;
  const vert = dy === 0 ? '' : `${sq(Math.abs(dy))} ${dy > 0 ? 'down' : 'up'}`;
  const toGoal = [horiz, vert].filter(Boolean).join(' and ') || 'on its own square';
  const wallCount = (p.walls ?? []).length;
  const walls = wallCount ? `, with ${wallCount} wall${wallCount === 1 ? '' : 's'} to avoid` : '';
  return (
    `The robot starts facing ${p.start.dir} and must reach the star ${toGoal}. ` +
    `The grid is ${p.cols} wide and ${p.rows} tall${walls}.`
  );
}

const DIR_ANGLE: Record<RobotDir, number> = { up: 0, right: 90, down: 180, left: 270 };
const LEFT_OF: Record<RobotDir, RobotDir> = { up: 'left', left: 'down', down: 'right', right: 'up' };
const RIGHT_OF: Record<RobotDir, RobotDir> = { up: 'right', right: 'down', down: 'left', left: 'up' };
const DELTA: Record<RobotDir, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 },
};
const STEP_MS = 420;

/**
 * The code-the-robot mini-game: build a program from forward / turn-left /
 * turn-right commands, then run it and watch the robot execute step by step.
 * Bumping a wall or the edge is a gentle fail — the robot resets, the program
 * stays for editing (per DESIGN.md §12, mistakes are never punished).
 */
export function CodeRobot({ params, onSolved, reducedMotion }: Props) {
  const [program, setProgram] = useState<Command[]>([]);
  const [robot, setRobot] = useState({ ...params.start });
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [srMessage, setSrMessage] = useState(() => describeBoard(params));
  const timeouts = useRef<number[]>([]);

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const walls = params.walls ?? [];
  const isWall = (x: number, y: number) => walls.some((w) => w.x === x && w.y === y);
  const inBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < params.cols && y < params.rows;
  const atLimit = params.maxCommands !== undefined && program.length >= params.maxCommands;

  function add(cmd: Command) {
    if (running || atLimit) return;
    setMessage(null);
    setProgram((p) => [...p, cmd]);
  }

  function run() {
    if (running || program.length === 0) return;
    setRunning(true);
    setMessage(null);
    // Reset the timer bookkeeping each run so the ref never grows unbounded.
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    // Pre-simulate to find the step-by-step states.
    const states: Array<{ x: number; y: number; dir: RobotDir }> = [];
    let { x, y, dir } = { ...params.start };
    let crashed = false;
    let reachedGoal = false;
    for (const cmd of program) {
      if (cmd === 'L') dir = LEFT_OF[dir];
      else if (cmd === 'R') dir = RIGHT_OF[dir];
      else {
        const nx = x + DELTA[dir].dx;
        const ny = y + DELTA[dir].dy;
        if (!inBounds(nx, ny) || isWall(nx, ny)) { crashed = true; states.push({ x, y, dir }); break; }
        x = nx; y = ny;
      }
      states.push({ x, y, dir });
      if (x === params.goal.x && y === params.goal.y) { reachedGoal = true; break; }
    }

    // Animate the recorded states — or, with reduced motion, collapse to instant.
    const reduce = reducedMotion || prefersReducedMotion();
    const step = reduce ? 0 : STEP_MS;
    const settleDelay = reduce ? 250 : 900;

    states.forEach((s, i) => {
      timeouts.current.push(window.setTimeout(() => setRobot(s), (i + 1) * step));
    });
    const endAt = (states.length + 1) * step;
    timeouts.current.push(window.setTimeout(() => {
      if (reachedGoal) {
        setMessage('🎉 The robot made it!');
        setSrMessage('The robot reached the star! Round complete.');
        timeouts.current.push(window.setTimeout(() => onSolved({ wrongAttempts }), settleDelay));
        return;
      }
      setRunning(false);
      setWrongAttempts((n) => n + 1);
      setMessage(
        crashed
          ? 'Bonk! The robot bumped into something. Edit your program and try again.'
          : 'The robot stopped before reaching the star. Add more steps and run again!'
      );
      setSrMessage(
        `${crashed
          ? 'The robot bumped into something and went back to the start.'
          : 'The robot stopped before the star and went back to the start.'} ${describeBoard(params)}`
      );
      setRobot({ ...params.start });
    }, endAt));
  }

  return (
    <div className="code-robot" aria-label="Program the robot to reach the star">
      {/* The visual grid is aria-hidden, so this is the screen-reader's view of
          the board and every run's outcome. */}
      <p className="sr-only" aria-live="polite">{srMessage}</p>
      <div className="cr-board-wrap">
        <div
          className="cr-board"
          style={{ gridTemplateColumns: `repeat(${params.cols}, 1fr)` }}
          aria-hidden="true"
        >
          {Array.from({ length: params.rows }, (_, y) =>
            Array.from({ length: params.cols }, (_, x) => {
              const wall = isWall(x, y);
              const goal = params.goal.x === x && params.goal.y === y;
              return (
                <div key={`${x}.${y}`} className={`cr-cell${wall ? ' wall' : ''}`}>
                  {goal && <span className="cr-goal">★</span>}
                  {robot.x === x && robot.y === y && (
                    <span className="cr-robot" style={{ transform: `rotate(${DIR_ANGLE[robot.dir]}deg)` }}>
                      🤖
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="cr-program" aria-label="Your program">
        <span className="cr-program-label">Program:</span>
        {program.length === 0 && <span className="muted">tap commands below</span>}
        {program.map((c, i) => (
          <span key={i} className={`cr-chip cr-chip-${c}`}>
            {c === 'F' ? '↑' : c === 'L' ? '↺' : '↻'}
          </span>
        ))}
        {params.maxCommands !== undefined && (
          <span className={`cr-limit${atLimit ? ' at-limit' : ''}`}>
            {program.length} / {params.maxCommands}
          </span>
        )}
      </div>

      <div className="cr-controls">
        <button type="button" className="btn cr-cmd" onClick={() => add('F')} disabled={running || atLimit}>
          ↑ Forward
        </button>
        <button type="button" className="btn cr-cmd" onClick={() => add('L')} disabled={running || atLimit}>
          ↺ Turn left
        </button>
        <button type="button" className="btn cr-cmd" onClick={() => add('R')} disabled={running || atLimit}>
          ↻ Turn right
        </button>
        <button
          type="button" className="btn btn-ghost"
          onClick={() => { setProgram((p) => p.slice(0, -1)); setMessage(null); }}
          disabled={running || program.length === 0}
        >
          ⌫ Undo
        </button>
        <button
          type="button" className="btn btn-ghost"
          onClick={() => { setProgram([]); setRobot({ ...params.start }); setMessage(null); }}
          disabled={running || program.length === 0}
        >
          Clear
        </button>
        <button type="button" className="btn btn-primary" onClick={run} disabled={running || program.length === 0}>
          ▶ Run
        </button>
      </div>

      {message && (
        <div className="cr-message" aria-hidden="true">{message}</div>
      )}
    </div>
  );
}
