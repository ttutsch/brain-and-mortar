import { useState } from 'react';
import type { Mission, PlayerProgress, Tier } from '../types';
import { CHARACTERS } from '../data/characters';
import type {
  CodeRobotMissionParams,
  CodeRobotRound,
  DragMatchMissionParams,
  DragMatchRound,
  MissionRoundMeta,
  PathPlannerMissionParams,
  PathPlannerRound,
  QuizMissionParams,
  QuizRound,
} from '../data/missions';
import { COINS_PER_MISSION } from '../data/missions';
import { applyMissionOutcome, getChapterStatus, isStretchEligible } from '../lib/missionFlow';
import { CharacterPortrait } from './CharacterPortrait';
import { MissionScene } from './MissionScene';
import { DragMatch } from './DragMatch';
import { QuizGame } from './QuizGame';
import { CodeRobot } from './CodeRobot';
import { PathPlanner } from './PathPlanner';

interface Props {
  mission: Mission;
  tier: Tier;
  /** Current player progress, used to compute projected chapter status on completion. */
  progress: PlayerProgress | null;
  /**
   * Called when the player taps "Back to home" on the completion screen.
   * Receives outcome data so the parent can persist progress + rewards.
   */
  onFinish: (outcome: MissionOutcome) => void;
  /** Cancel out of the intro without playing. */
  onCancel: () => void;
}

export interface MissionOutcome {
  missionId: string;
  coinsEarned: number;
  wrongAttempts: number;
  tier: Tier;
}

const STRETCH_BONUS_COINS = 5;

type Phase =
  | { kind: 'intro' }
  | { kind: 'round-intro'; roundIndex: number }
  | { kind: 'playing'; roundIndex: number }
  | { kind: 'stretch' }
  | { kind: 'complete' };

export function MissionPlayer({ mission, tier, progress, onFinish, onCancel }: Props) {
  const variant = mission.tiers[tier];
  const lead = CHARACTERS[mission.lead];

  const isImplemented =
    variant.pattern === 'drag-match' || variant.pattern === 'quiz' ||
    variant.pattern === 'code-robot' || variant.pattern === 'path-planner';
  if (!isImplemented) {
    return (
      <div className="mission-screen centered-screen">
        <div className="card">
          <h2 className="card-title">Not built yet</h2>
          <p>This mini-game pattern ({variant.pattern}) isn’t implemented yet.</p>
          <button type="button" className="btn btn-primary" onClick={onCancel}>Back</button>
        </div>
      </div>
    );
  }

  // Both implemented patterns share the { rounds: [...] } shape; each round
  // carries its own pattern-specific payload plus shared heading/intro meta.
  const params = variant.params as unknown as
    DragMatchMissionParams | QuizMissionParams | CodeRobotMissionParams | PathPlannerMissionParams;
  const rounds: MissionRoundMeta[] = params.rounds;
  const totalRounds = rounds.length;

  const [phase, setPhase] = useState<Phase>({ kind: 'intro' });
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [stretchDone, setStretchDone] = useState(false);

  function finishRound(roundIndex: number, wrongs: number) {
    setWrongAttempts((prev) => prev + wrongs);
    const next = roundIndex + 1;
    if (next < totalRounds) {
      setPhase({ kind: 'round-intro', roundIndex: next });
    } else {
      setPhase({ kind: 'complete' });
    }
  }

  // ---------- INTRO ----------
  if (phase.kind === 'intro') {
    return (
      <div className="mission-screen centered-screen">
        <div className="card mission-card">
          <div className="row gap-lg" style={{ marginBottom: 18 }}>
            <CharacterPortrait characterId={mission.lead} size="lg" />
            <div style={{ flex: 1 }}>
              <span className="tag tag-repair" style={{ display: 'inline-block', marginBottom: 6 }}>
                {chapterLabelFor(mission)}
              </span>
              <h1 className="card-title" style={{ fontSize: 26, margin: 0 }}>
                {lead.displayName}
              </h1>
              <p className="muted" style={{ margin: '2px 0 0' }}>{lead.specialty}</p>
            </div>
          </div>

          <MissionScene subject={mission.subjects[0]} />

          <div className="mission-wrapper">
            {variant.wrapper.map((line, idx) => (
              <p key={idx}>{line.text}</p>
            ))}
          </div>

          <p className="muted mission-rounds-hint">
            {totalRounds} round{totalRounds === 1 ? '' : 's'} to complete.
          </p>

          <div className="row between" style={{ marginTop: 18 }}>
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Not now
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPhase({ kind: 'round-intro', roundIndex: 0 })}
            >
              Let’s go
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- ROUND INTRO (between rounds) ----------
  if (phase.kind === 'round-intro') {
    const round = rounds[phase.roundIndex];
    const isFirstRound = phase.roundIndex === 0;
    return (
      <div className="mission-screen centered-screen">
        <div className="card mission-card">
          <span className="tag tag-repair" style={{ display: 'inline-block', marginBottom: 8 }}>
            Round {phase.roundIndex + 1} of {totalRounds}
          </span>
          <h2 className="card-title" style={{ fontSize: 22, margin: '0 0 8px' }}>
            {round.heading ?? `Round ${phase.roundIndex + 1}`}
          </h2>
          {round.intro && <p style={{ margin: 0 }}>{round.intro}</p>}

          <div className="row between" style={{ marginTop: 18 }}>
            {isFirstRound ? (
              <button type="button" className="btn btn-ghost" onClick={onCancel}>
                Quit
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPhase({ kind: 'playing', roundIndex: phase.roundIndex })}
            >
              {isFirstRound ? 'Start round 1' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- PLAYING ----------
  if (phase.kind === 'playing') {
    const round = rounds[phase.roundIndex];
    return (
      <div className="mission-screen mission-play">
        <header className="mission-topbar">
          <div className="row" style={{ gap: 10 }}>
            <CharacterPortrait characterId={mission.lead} size="sm" />
            <strong>{lead.displayName}</strong>
            <span className="muted">·</span>
            <span className="muted">Round {phase.roundIndex + 1} of {totalRounds}</span>
          </div>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Quit
          </button>
        </header>

        <div className="mission-stage">
          <div className="drag-match-wrapper">
            {round.heading && <h2 className="dm-heading">{round.heading}</h2>}
            {variant.pattern === 'drag-match' ? (
              <DragMatch
                key={phase.roundIndex}
                params={{
                  pairs: (round as DragMatchRound).pairs,
                  stuckHint: (round as DragMatchRound).stuckHint,
                }}
                onSolved={({ wrongAttempts: wa }) => finishRound(phase.roundIndex, wa)}
              />
            ) : variant.pattern === 'quiz' ? (
              <QuizGame
                key={phase.roundIndex}
                params={{ questions: (round as QuizRound).questions }}
                onSolved={({ wrongAttempts: wa }) => finishRound(phase.roundIndex, wa)}
              />
            ) : variant.pattern === 'code-robot' ? (
              <CodeRobot
                key={phase.roundIndex}
                params={round as CodeRobotRound}
                onSolved={({ wrongAttempts: wa }) => finishRound(phase.roundIndex, wa)}
              />
            ) : (
              <PathPlanner
                key={phase.roundIndex}
                params={round as PathPlannerRound}
                onSolved={({ wrongAttempts: wa }) => finishRound(phase.roundIndex, wa)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- STRETCH (optional bonus round from the next tier up) ----------
  if (phase.kind === 'stretch') {
    const nextTier = (tier + 1) as Tier;
    const stretchVariant = mission.tiers[nextTier];
    const stretchParams = stretchVariant.params as unknown as
      DragMatchMissionParams | QuizMissionParams | CodeRobotMissionParams | PathPlannerMissionParams;
    const stretchRound = stretchParams.rounds[0];
    const done = () => { setStretchDone(true); setPhase({ kind: 'complete' }); };
    return (
      <div className="mission-screen mission-play">
        <header className="mission-topbar">
          <div className="row" style={{ gap: 10 }}>
            <CharacterPortrait characterId={mission.lead} size="sm" />
            <strong>{lead.displayName}</strong>
            <span className="muted">·</span>
            <span className="tag tag-upgrade">Bonus stretch round</span>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => setPhase({ kind: 'complete' })}>
            Skip
          </button>
        </header>
        <div className="mission-stage">
          <div className="drag-match-wrapper">
            {(stretchRound as MissionRoundMeta).heading && (
              <h2 className="dm-heading">{(stretchRound as MissionRoundMeta).heading}</h2>
            )}
            {stretchVariant.pattern === 'drag-match' ? (
              <DragMatch
                params={{
                  pairs: (stretchRound as DragMatchRound).pairs,
                  stuckHint: (stretchRound as DragMatchRound).stuckHint,
                }}
                onSolved={done}
              />
            ) : stretchVariant.pattern === 'quiz' ? (
              <QuizGame params={{ questions: (stretchRound as QuizRound).questions }} onSolved={done} />
            ) : stretchVariant.pattern === 'code-robot' ? (
              <CodeRobot params={stretchRound as CodeRobotRound} onSolved={done} />
            ) : (
              <PathPlanner params={stretchRound as PathPlannerRound} onSolved={done} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- COMPLETE ----------
  // Projected progress *after* this mission's outcome is saved, so we can show
  // accurate "X of Y missions in this chapter done" + flag chapter completion.
  const coinsEarned = COINS_PER_MISSION + (stretchDone ? STRETCH_BONUS_COINS : 0);
  const stretchAvailable = !stretchDone && isStretchEligible(progress, mission, tier);
  const projected = progress
    ? applyMissionOutcome(progress, { missionId: mission.id, coinsEarned })
    : null;
  const chapterStatus = getChapterStatus(mission.chapterId, projected, progress);
  const chapterJustFinished = chapterStatus.justCompleted;

  return (
    <div className="mission-screen centered-screen">
      <div className="card mission-card mission-complete-card">
        <h1 className="card-title" style={{ fontSize: 30, marginBottom: 6 }}>
          {chapterJustFinished ? 'Chapter complete!' : 'You did it!'}
        </h1>
        <p className="muted" style={{ marginTop: 0 }}>
          {wrongAttempts === 0
            ? 'Perfect run — no missed matches.'
            : `Finished with ${wrongAttempts} retry${wrongAttempts === 1 ? '' : 's'}. Nicely done.`}
        </p>

        {chapterStatus.total > 0 && (
          <div className="chapter-progress" aria-label="Chapter progress">
            <div className="chapter-progress-bar">
              <div
                className="chapter-progress-fill"
                style={{ width: `${(chapterStatus.done / chapterStatus.total) * 100}%` }}
              />
            </div>
            <span className="chapter-progress-text">
              {chapterStatus.chapterName} · {chapterStatus.done} of {chapterStatus.total} missions done
            </span>
          </div>
        )}

        <div className="reward-row">
          <div className="reward-tile">
            <span className="reward-icon coins" aria-hidden="true">$</span>
            <span>
              <strong>+{coinsEarned} coins</strong>
              <br />
              <span className="muted" style={{ fontSize: '0.85em' }}>
                {stretchDone ? `Includes +${STRETCH_BONUS_COINS} stretch bonus!` : 'Spend on cosmetics later'}
              </span>
            </span>
          </div>
          {chapterJustFinished ? (
            <div className="reward-tile reward-tile-celebrate">
              <span className="reward-icon house" aria-hidden="true">✓</span>
              <span>
                <strong>{chapterStatus.rewardLabel}</strong>
                <br />
                <span className="muted" style={{ fontSize: '0.85em' }}>{chapterStatus.rewardSublabel}</span>
              </span>
            </div>
          ) : (
            <div className="reward-tile">
              <span className="reward-icon next" aria-hidden="true">→</span>
              <span>
                <strong>Keep going</strong>
                <br />
                <span className="muted" style={{ fontSize: '0.85em' }}>
                  {chapterStatus.total - chapterStatus.done} more mission
                  {chapterStatus.total - chapterStatus.done === 1 ? '' : 's'} to finish {chapterStatus.chapterName || 'this chapter'}
                </span>
              </span>
            </div>
          )}
        </div>

        <p className="muted" style={{ fontSize: '0.9em', marginTop: 18 }}>
          {chapterJustFinished
            ? 'Head home to see the difference.'
            : 'Head home, then talk to another family member to keep going.'}
        </p>

        <div className="row between" style={{ marginTop: 18 }}>
          {stretchAvailable ? (
            <button
              type="button"
              className="btn"
              onClick={() => setPhase({ kind: 'stretch' })}
              title="An optional harder challenge from the next tier up"
            >
              ⭐ Try a bonus challenge (+{STRETCH_BONUS_COINS})
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              onFinish({
                missionId: mission.id,
                coinsEarned,
                wrongAttempts,
                tier,
              })
            }
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

function chapterLabelFor(mission: Mission): string {
  const [a, c] = mission.chapterId.split('.');
  const actNum = Number(a.replace('act', ''));
  const chapNum = Number(c.replace('ch', ''));
  const roman = ['', 'I', 'II', 'III', 'IV', 'V'];
  return `Act ${roman[actNum] ?? actNum} · Chapter ${chapNum}`;
}
