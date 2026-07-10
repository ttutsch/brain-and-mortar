import { useEffect, useRef, useState } from 'react';
import type { PatternPuzzleRound } from '../data/missions';

interface Props {
  params: Pick<PatternPuzzleRound, 'items'>;
  /** Called once every puzzle in the round is answered correctly. */
  onSolved: (stats: { wrongAttempts: number }) => void;
}

/**
 * The pattern-puzzle mini-game: a sequence with a mystery slot at the end —
 * spot the rule, pick what comes next. Sequences can be emoji (young tiers) or
 * numbers/letters (older tiers). Wrong answers retry kindly (DESIGN.md §12).
 */
export function PatternPuzzle({ params, onSolved }: Props) {
  const [itemIndex, setItemIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const actionRef = useRef<HTMLButtonElement>(null);

  const total = params.items.length;
  const item = params.items[itemIndex];
  const answered = chosen !== null;
  const correct = answered && chosen === item.correctIndex;

  useEffect(() => {
    if (answered) actionRef.current?.focus();
  }, [answered]);

  function choose(idx: number) {
    if (answered) return;
    setChosen(idx);
    if (idx !== item.correctIndex) setWrongAttempts((w) => w + 1);
  }

  function next() {
    if (!correct) {
      setChosen(null);
      return;
    }
    if (itemIndex + 1 < total) {
      setItemIndex(itemIndex + 1);
      setChosen(null);
    } else {
      onSolved({ wrongAttempts });
    }
  }

  return (
    <div className="quiz-game pattern-puzzle" aria-label="Pattern puzzle">
      <div className="quiz-progress" aria-label={`Puzzle ${itemIndex + 1} of ${total}`}>
        {params.items.map((it, i) => (
          <span
            key={it.id}
            className={`quiz-progress-dot${i < itemIndex ? ' done' : ''}${i === itemIndex ? ' current' : ''}`}
            aria-hidden="true"
          />
        ))}
        <span className="quiz-progress-label">{itemIndex + 1} / {total}</span>
      </div>

      <div className="quiz-question-card" key={`${item.id}.${wrongAttempts}`}>
        <p className="quiz-question">{item.prompt ?? 'What comes next?'}</p>

        <div
          className="pz-sequence"
          role="img"
          aria-label={`Pattern: ${item.sequence.join(', ')}, then a mystery slot`}
        >
          {item.sequence.map((entry, i) => (
            <span key={i} className="pz-chip" aria-hidden="true">{entry}</span>
          ))}
          <span className="pz-chip pz-mystery" aria-hidden="true">?</span>
        </div>

        <div className="quiz-options pz-options">
          {item.options.map((option, idx) => {
            const cls = ['quiz-option', 'pz-option'];
            if (answered) {
              if (idx === item.correctIndex && correct) cls.push('correct');
              else if (idx === chosen && !correct) cls.push('wrong');
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
              <><strong>Pattern cracked!</strong> {item.explanation ?? ''}</>
            ) : (
              <><strong>Not quite — look again.</strong> {item.hint ?? 'Say the pattern out loud and listen for the beat.'}</>
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
            {!correct ? 'Try again' : itemIndex + 1 < total ? 'Next puzzle' : 'Finish round'}
          </button>
        </div>
      </div>
    </div>
  );
}
