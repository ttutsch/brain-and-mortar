import { useEffect, useRef, useState } from 'react';
import type { QuizRoundParams } from '../data/missions';

interface Props {
  params: QuizRoundParams;
  /** Called once every question in the round is answered correctly. */
  onSolved: (stats: { wrongAttempts: number }) => void;
}

/**
 * The quiz mini-game pattern: one question at a time, multiple choice.
 * Wrong answers get a kind explanation and the player retries the same
 * question (per DESIGN.md §12 — mistakes are never punished). Plays a single
 * round; MissionPlayer drives multi-round progression, same as DragMatch.
 */
export function QuizGame({ params, onSolved }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [retryNonce, setRetryNonce] = useState(0);
  const actionRef = useRef<HTMLButtonElement>(null);

  const total = params.questions.length;
  const question = params.questions[questionIndex];
  const answered = chosenIndex !== null;
  const correct = answered && chosenIndex === question.correctIndex;

  // Choosing an option disables it, which drops focus to <body>; move focus to
  // the continue button so a keyboard player keeps their place. (Finding #13.)
  useEffect(() => {
    if (answered) actionRef.current?.focus();
  }, [answered]);

  function choose(idx: number) {
    if (answered) return;
    setChosenIndex(idx);
    if (idx !== question.correctIndex) {
      setWrongAttempts((n) => n + 1);
    }
  }

  function next() {
    if (!correct) {
      // Retry the same question with choices re-enabled.
      setChosenIndex(null);
      setRetryNonce((n) => n + 1);
      return;
    }
    if (questionIndex + 1 < total) {
      setQuestionIndex(questionIndex + 1);
      setChosenIndex(null);
    } else {
      onSolved({ wrongAttempts });
    }
  }

  return (
    <div className="quiz-game" aria-label="Quiz">
      <div className="quiz-progress" aria-label={`Question ${questionIndex + 1} of ${total}`}>
        {params.questions.map((q, i) => (
          <span
            key={q.id}
            className={`quiz-progress-dot${i < questionIndex ? ' done' : ''}${i === questionIndex ? ' current' : ''}`}
            aria-hidden="true"
          />
        ))}
        <span className="quiz-progress-label">
          {questionIndex + 1} / {total}
        </span>
      </div>

      <div className="quiz-question-card" key={`${question.id}.${retryNonce}`}>
        {question.visual && (
          <div className="quiz-visual" aria-hidden="true">{question.visual}</div>
        )}
        <p className="quiz-question">{question.question}</p>

        <div className="quiz-options">
          {question.options.map((option, idx) => {
            const cls = ['quiz-option'];
            if (answered) {
              if (idx === question.correctIndex && correct) cls.push('correct');
              else if (idx === chosenIndex && !correct) cls.push('wrong');
            }
            return (
              <button
                key={idx}
                type="button"
                className={cls.join(' ')}
                disabled={answered}
                onClick={() => choose(idx)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`quiz-feedback ${correct ? 'good' : 'retry'}`} role="status">
            {correct ? (
              <>
                <strong>That’s right!</strong>{' '}
                {question.explanation ?? ''}
              </>
            ) : (
              <>
                <strong>Not quite — have another look.</strong>{' '}
                {question.hint ?? 'Take your time and try again.'}
              </>
            )}
          </div>
        )}

        <div className="row between" style={{ marginTop: 16 }}>
          <span />
          <button
            ref={actionRef}
            type="button"
            className="btn btn-primary"
            onClick={next}
            disabled={!answered}
          >
            {!correct ? 'Try again' : questionIndex + 1 < total ? 'Next question' : 'Finish round'}
          </button>
        </div>
      </div>
    </div>
  );
}
