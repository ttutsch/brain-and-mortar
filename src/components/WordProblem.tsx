import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { WordProblemRound } from '../data/missions';

interface Props {
  params: Pick<WordProblemRound, 'items'>;
  /** Called once every problem in the round is answered correctly. */
  onSolved: (stats: { wrongAttempts: number }) => void;
}

/**
 * The word-problem mini-game: a short story problem with a typed numeric
 * answer — no options to guess from, so the player has to actually work it
 * out. Wrong answers get the hint and another try (DESIGN.md §12).
 */
export function WordProblem({ params, onSolved }: Props) {
  const [itemIndex, setItemIndex] = useState(0);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState<null | boolean>(null); // null = not checked yet
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const total = params.items.length;
  const item = params.items[itemIndex];
  const correct = checked === true;

  // New problem → focus the input; solved → focus the Next button.
  useEffect(() => {
    if (correct) nextRef.current?.focus();
    else inputRef.current?.focus();
  }, [itemIndex, correct]);

  function check(e: FormEvent) {
    e.preventDefault();
    if (correct) return;
    const parsed = Number(value.trim().replace(',', '.'));
    if (value.trim() === '' || Number.isNaN(parsed)) {
      setChecked(false);
      return;
    }
    const ok = Math.abs(parsed - item.answer) <= (item.tolerance ?? 1e-9);
    setChecked(ok);
    if (!ok) {
      setWrongAttempts((w) => w + 1);
      inputRef.current?.select();
    }
  }

  function next() {
    if (itemIndex + 1 < total) {
      setItemIndex(itemIndex + 1);
      setValue('');
      setChecked(null);
    } else {
      onSolved({ wrongAttempts });
    }
  }

  return (
    <div className="quiz-game word-problem" aria-label="Word problem">
      <div className="quiz-progress" aria-label={`Problem ${itemIndex + 1} of ${total}`}>
        {params.items.map((it, i) => (
          <span
            key={it.id}
            className={`quiz-progress-dot${i < itemIndex ? ' done' : ''}${i === itemIndex ? ' current' : ''}`}
            aria-hidden="true"
          />
        ))}
        <span className="quiz-progress-label">{itemIndex + 1} / {total}</span>
      </div>

      <div className="quiz-question-card">
        {item.visual && (
          <div className="wp-visual" aria-hidden="true">{item.visual}</div>
        )}
        <p className="quiz-question">{item.problem}</p>

        <form onSubmit={check} noValidate>
          <div className="wp-input-row">
            <label htmlFor="wp-answer" className="wp-input-label">Your answer</label>
            <input
              id="wp-answer"
              ref={inputRef}
              className="wp-input"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={value}
              onChange={(e) => { setValue(e.target.value); setChecked(null); }}
              disabled={correct}
            />
            {item.unit && <span className="wp-unit">{item.unit}</span>}
            {!correct && (
              <button type="submit" className="btn btn-primary" disabled={value.trim() === ''}>
                Check
              </button>
            )}
          </div>
        </form>

        {checked !== null && (
          <div className={`quiz-feedback ${correct ? 'good' : 'retry'}`} role="status">
            {correct ? (
              <><strong>That’s right!</strong> {item.explanation ?? ''}</>
            ) : (
              <><strong>Not quite — try again.</strong> {item.hint ?? 'Read the problem once more, one sentence at a time.'}</>
            )}
          </div>
        )}

        {correct && (
          <div className="row between" style={{ marginTop: 16 }}>
            <span />
            <button ref={nextRef} type="button" className="btn btn-primary" onClick={next}>
              {itemIndex + 1 < total ? 'Next problem' : 'Finish round'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
