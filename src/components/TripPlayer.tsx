import { useState } from 'react';
import type { Trip, TripImage as TripImageData, TripQuiz } from '../data/trips';
import { TripImage } from './TripImage';

interface Props {
  trip: Trip;
  /** Replay/preview mode: no rewards, softer copy. */
  replay?: boolean;
  onFinish: (outcome: TripOutcome) => void;
  onCancel: () => void;
}

export interface TripOutcome {
  tripId: string;
  coinsEarned: number;
}

type Phase =
  | { kind: 'intro' }
  | { kind: 'scene'; index: number }
  | { kind: 'outro' };

export function TripPlayer({ trip, replay = false, onFinish, onCancel }: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: 'intro' });

  if (phase.kind === 'intro') {
    return (
      <div className="trip-screen">
        <TripTopbar trip={trip} onCancel={onCancel} step={0} totalSteps={trip.scenes.length + 2} />
        <div className="trip-stage">
          <article className="trip-card trip-card-hero">
            <span className="trip-tag">Family trip · {trip.destination}</span>
            <h1 className="trip-heading">{trip.intro.heading}</h1>
            {trip.intro.image && <TripImage image={trip.intro.image} />}
            <p className="trip-body">{trip.intro.body}</p>
            <div className="row between" style={{ marginTop: 22 }}>
              <button type="button" className="btn btn-ghost" onClick={onCancel}>
                Not now
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPhase({ kind: 'scene', index: 0 })}
              >
                Let’s explore
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  if (phase.kind === 'scene') {
    const scene = trip.scenes[phase.index];
    return (
      <div className="trip-screen">
        <TripTopbar
          trip={trip}
          onCancel={onCancel}
          step={phase.index + 1}
          totalSteps={trip.scenes.length + 2}
        />
        <div className="trip-stage">
          <SceneView
            key={scene.id}
            scene={scene}
            isLast={phase.index === trip.scenes.length - 1}
            onNext={() => {
              if (phase.index < trip.scenes.length - 1) {
                setPhase({ kind: 'scene', index: phase.index + 1 });
              } else {
                setPhase({ kind: 'outro' });
              }
            }}
          />
        </div>
      </div>
    );
  }

  // outro
  return (
    <div className="trip-screen">
      <TripTopbar
        trip={trip}
        onCancel={onCancel}
        step={trip.scenes.length + 1}
        totalSteps={trip.scenes.length + 2}
      />
      <div className="trip-stage">
        <article className="trip-card trip-card-postcard">
          <span className="trip-tag">Postcard from {trip.destination}</span>
          <h1 className="trip-heading">{trip.outro.heading}</h1>
          {trip.outro.image && <TripImage image={trip.outro.image} />}
          <p className="trip-body">{trip.outro.body}</p>

          {replay ? (
            <div className="reward-row" style={{ marginTop: 22 }}>
              <div className="reward-tile">
                <span className="reward-icon house" aria-hidden="true">♥</span>
                <span>
                  <strong>A treasured family memory</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85em' }}>Re-lived from the memory book</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="reward-row" style={{ marginTop: 22 }}>
              <div className="reward-tile reward-tile-celebrate">
                <span className="reward-icon coins" aria-hidden="true">$</span>
                <span>
                  <strong>+{trip.outro.coinsAwarded} coins</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85em' }}>Trip bonus</span>
                </span>
              </div>
              <div className="reward-tile reward-tile-celebrate">
                <span className="reward-icon house" aria-hidden="true">✓</span>
                <span>
                  <strong>{trip.title} complete</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85em' }}>Added to the memory book</span>
                </span>
              </div>
            </div>
          )}

          <div className="row between" style={{ marginTop: 22 }}>
            <span />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onFinish({ tripId: trip.id, coinsEarned: trip.outro.coinsAwarded })}
            >
              Back home
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

function TripTopbar({
  trip, onCancel, step, totalSteps,
}: { trip: Trip; onCancel: () => void; step: number; totalSteps: number }) {
  const pct = Math.round((step / (totalSteps - 1)) * 100);
  return (
    <header className="trip-topbar">
      <div className="row" style={{ gap: 10 }}>
        <span className="trip-topbar-title">{trip.title}</span>
        <span className="muted" style={{ fontSize: '0.85em' }}>
          {step + 1} of {totalSteps}
        </span>
      </div>
      <div className="trip-progress-bar" aria-hidden="true">
        <div className="trip-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <button type="button" className="btn btn-ghost" onClick={onCancel}>
        Quit trip
      </button>
    </header>
  );
}

function SceneView({
  scene, isLast, onNext,
}: {
  scene: { id: string; heading: string; body: string; image?: TripImageData; quiz?: TripQuiz };
  isLast: boolean;
  onNext: () => void;
}) {
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const showQuizFeedback = scene.quiz && chosenIndex !== null;

  return (
    <article className="trip-card">
      <h2 className="trip-heading">{scene.heading}</h2>
      {scene.image && <TripImage image={scene.image} />}
      <p className="trip-body">{scene.body}</p>

      {scene.quiz && (
        <div className="trip-quiz">
          <p className="trip-quiz-question">{scene.quiz.question}</p>
          <div className="trip-quiz-options">
            {scene.quiz.options.map((option, idx) => {
              const isChosen = chosenIndex === idx;
              const isCorrect = scene.quiz!.correctIndex === idx;
              const cls = ['trip-quiz-option'];
              if (chosenIndex !== null) {
                if (isCorrect) cls.push('correct');
                else if (isChosen) cls.push('wrong');
              }
              return (
                <button
                  key={idx}
                  type="button"
                  className={cls.join(' ')}
                  disabled={chosenIndex !== null}
                  onClick={() => setChosenIndex(idx)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {showQuizFeedback && (
            <p className="trip-quiz-explanation">
              <strong>
                {chosenIndex === scene.quiz!.correctIndex ? 'You got it!' : 'Good guess.'}
              </strong>{' '}
              {scene.quiz.explanation}
            </p>
          )}
        </div>
      )}

      <div className="row between" style={{ marginTop: 22 }}>
        <span />
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={scene.quiz !== undefined && chosenIndex === null}
        >
          {isLast ? 'Finish trip' : 'Continue'}
        </button>
      </div>
    </article>
  );
}
