import { useEffect, useRef, useState } from 'react';
import type { CountingRound } from '../data/missions';

interface Props {
  params: Pick<CountingRound, 'items'>;
  /** Called once every item in the round is answered correctly. */
  onSolved: (stats: { wrongAttempts: number }) => void;
}

/**
 * The counting mini-game (K–3 focus): a big emoji scene shows real quantities;
 * the player counts (or adds the groups) and taps the number. Wrong answers get
 * a kind nudge and a retry — mistakes are never punished (DESIGN.md §12).
 */
export function CountingGame({ params, onSolved }: Props) {
  const [itemIndex, setItemIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const actionRef = useRef<HTMLButtonElement>(null);

  const total = params.items.length;
  const item = params.items[itemIndex];
  const answered = chosen !== null;
  const correct = answered && chosen === item.answer;

  // Choosing disables the options; keep the keyboard player's place.
  useEffect(() => {
    if (answered) actionRef.current?.focus();
  }, [answered]);

  function choose(n: number) {
    if (answered) return;
    setChosen(n);
    if (n !== item.answer) setWrongAttempts((w) => w + 1);
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

  const sceneDescription = item.groups
    .map((g) => `${g.count} ${g.label ?? g.emoji}`)
    .join(' and ');

  return (
    <div className="quiz-game counting-game" aria-label="Counting game">
      <div className="quiz-progress" aria-label={`Picture ${itemIndex + 1} of ${total}`}>
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
        <p className="quiz-question">{item.prompt}</p>

        <div className="cg-scene" role="img" aria-label={`Picture showing ${sceneDescription}`}>
          {item.groups.map((g, gi) => (
            <div key={gi} className="cg-group">
              <div className="cg-emoji-row" aria-hidden="true">
                {Array.from({ length: g.count }, (_, i) => (
                  <span key={i} className="cg-emoji">{g.emoji}</span>
                ))}
              </div>
              {g.label && <span className="cg-group-label">{g.label}</span>}
            </div>
          ))}
        </div>

        <div className="quiz-options cg-options">
          {item.options.map((n) => {
            const cls = ['quiz-option', 'cg-option'];
            if (answered) {
              if (n === item.answer && correct) cls.push('correct');
              else if (n === chosen && !correct) cls.push('wrong');
            }
            return (
              <button
                key={n}
                type="button"
                className={cls.join(' ')}
                disabled={answered}
                onClick={() => choose(n)}
              >
                {n}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`quiz-feedback ${correct ? 'good' : 'retry'}`} role="status">
            {correct ? (
              <><strong>That’s right!</strong> {item.explanation ?? ''}</>
            ) : (
              <><strong>Not quite — count again!</strong> {item.hint ?? 'Point at each one as you count.'}</>
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
            {!correct ? 'Try again' : itemIndex + 1 < total ? 'Next picture' : 'Finish round'}
          </button>
        </div>
      </div>
    </div>
  );
}
