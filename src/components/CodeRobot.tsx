import { useEffect, useRef, useState } from 'react';
import type { CodeRobotRound, RobotDir } from '../data/missions';

type Command = 'F' | 'L' | 'R';

interface Props {
  params: CodeRobotRound;
  onSolved: (stats: { wrongAttempts: number }) => void;
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
export function CodeRobot({ params, onSolved }: Props) {
  const [program, setProgram] = useState<Command[]>([]);
  const [robot, setRobot] = useState({ ...params.start });
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
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

    // Animate the recorded states.
    states.forEach((s, i) => {
      timeouts.current.push(window.setTimeout(() => setRobot(s), (i + 1) * STEP_MS));
    });
    const endAt = (states.length + 1) * STEP_MS;
    timeouts.current.push(window.setTimeout(() => {
      if (reachedGoal) {
        setMessage('🎉 The robot made it!');
        timeouts.current.push(window.setTimeout(() => onSolved({ wrongAttempts }), 900));
        return;
      }
      setRunning(false);
      setWrongAttempts((n) => n + 1);
      setMessage(
        crashed
          ? 'Bonk! The robot bumped into something. Edit your program and try again.'
          : 'The robot stopped before reaching the star. Add more steps and run again!'
      );
      setRobot({ ...params.start });
    }, endAt));
  }

  return (
    <div className="code-robot" aria-label="Program the robot to reach the star">
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
        <div className="cr-message" role="status">{message}</div>
      )}
    </div>
  );
}
