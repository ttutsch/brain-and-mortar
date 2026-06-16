import { useEffect, useMemo, useState } from 'react';
import type { DragMatchParams, DragMatchPair, ShapeHint } from '../data/missions';

interface Props {
  params: DragMatchParams;
  /** Called once all items are correctly matched. */
  onSolved: (stats: { wrongAttempts: number }) => void;
}

type PlacedItems = Record<string, true>;          // itemId → placed
type SlotFills = Record<string, string>;          // slotId → the placed item's label

/**
 * The "match items to slots" mini-game. v1 uses click-to-select (tap an item,
 * tap a slot) for accessibility and touch-first ergonomics. Real drag-and-drop
 * can layer on later without changing the data model. See DESIGN.md §9 / §11.
 *
 * Matching is by the slot's *displayed value*, not its hidden pair-id: when
 * several items share an answer (e.g. three different sums that all equal "2 m"),
 * dropping a correct answer onto any matching slot is accepted. The slot is then
 * consumed, so the remaining equal-valued items fill the remaining equal slots.
 */
export function DragMatch({ params, onSolved }: Props) {
  const [placedItems, setPlacedItems] = useState<PlacedItems>({});
  const [slotFills, setSlotFills] = useState<SlotFills>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [wrongSlotId, setWrongSlotId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  const labelOf = (itemId: string) => params.pairs.find((p) => p.id === itemId)?.slot.label;

  const allPlaced = useMemo(
    () => params.pairs.every((p) => placedItems[p.id]),
    [placedItems, params.pairs]
  );

  useEffect(() => {
    if (allPlaced) {
      const t = setTimeout(() => onSolved({ wrongAttempts }), 600);
      return () => clearTimeout(t);
    }
  }, [allPlaced, onSolved, wrongAttempts]);

  function handleItemClick(itemId: string) {
    if (placedItems[itemId]) return;
    setSelectedItemId((curr) => (curr === itemId ? null : itemId));
  }

  function handleSlotClick(slotPairId: string) {
    if (!selectedItemId) return;
    if (slotFills[slotPairId]) return; // slot already filled
    const selectedItem = params.pairs.find((p) => p.id === selectedItemId);
    const slotLabel = params.pairs.find((p) => p.id === slotPairId)?.slot.label;
    // Correct when the selected item's answer matches THIS slot's displayed value.
    if (selectedItem && slotLabel !== undefined && labelOf(selectedItemId) === slotLabel) {
      setPlacedItems((p) => ({ ...p, [selectedItemId]: true }));
      setSlotFills((s) => ({ ...s, [slotPairId]: selectedItem.item.label }));
      setSelectedItemId(null);
      setConsecutiveWrong(0);
    } else {
      setWrongSlotId(slotPairId);
      setWrongAttempts((n) => n + 1);
      setConsecutiveWrong((n) => n + 1);
      setSelectedItemId(null);
      setTimeout(() => setWrongSlotId(null), 450);
    }
  }

  const stuckShown = consecutiveWrong >= 2 && params.stuckHint && !allPlaced;

  // Stable rendering order: items render in pair order; slots render in a
  // shuffled-but-deterministic order so left-to-right matching isn't free.
  const slotOrder = useMemo(() => deterministicShuffle(params.pairs, 7), [params.pairs]);

  return (
    <div className="drag-match" aria-label="Match each item to its size">
      <div className="dm-row dm-items" aria-label="Items">
        {params.pairs.map((pair) => (
          <ItemCard
            key={pair.id}
            pair={pair}
            selected={selectedItemId === pair.id}
            placed={!!placedItems[pair.id]}
            onClick={() => handleItemClick(pair.id)}
          />
        ))}
      </div>

      <div className="dm-instructions" aria-live="polite">
        {allPlaced
          ? 'All matched! Great work.'
          : selectedItemId
            ? 'Now tap the matching size below.'
            : 'Tap an item above.'}
      </div>

      <div className="dm-row dm-slots" aria-label="Sizes">
        {slotOrder.map((pair) => {
          const matched = !!slotFills[pair.id];
          const wrong = wrongSlotId === pair.id;
          return (
            <SlotCard
              key={pair.id}
              pair={pair}
              matched={matched}
              wrong={wrong}
              disabled={!selectedItemId || matched}
              onClick={() => handleSlotClick(pair.id)}
              matchedItemLabel={matched ? slotFills[pair.id] : undefined}
            />
          );
        })}
      </div>

      {stuckShown && (
        <div className="dm-hint" role="note">
          <strong>Hint:</strong> {params.stuckHint}
        </div>
      )}
    </div>
  );
}

function ItemCard({
  pair, selected, placed, onClick,
}: {
  pair: DragMatchPair;
  selected: boolean;
  placed: boolean;
  onClick: () => void;
}) {
  const classes = ['dm-card', 'dm-item'];
  if (selected) classes.push('selected');
  if (placed) classes.push('placed');
  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onClick}
      disabled={placed}
      aria-pressed={selected}
      aria-label={`${pair.item.label}${pair.item.sublabel ? `, ${pair.item.sublabel}` : ''}`}
    >
      <ShapePlaceholder shape={pair.item.shape ?? 'small-square'} />
      <span className="dm-card-label">{pair.item.label}</span>
      {pair.item.sublabel && <span className="dm-card-sublabel">{pair.item.sublabel}</span>}
      {placed && <span className="dm-check" aria-hidden="true">✓</span>}
    </button>
  );
}

function SlotCard({
  pair, matched, wrong, disabled, onClick, matchedItemLabel,
}: {
  pair: DragMatchPair;
  matched: boolean;
  wrong: boolean;
  disabled: boolean;
  onClick: () => void;
  matchedItemLabel?: string;
}) {
  const classes = ['dm-card', 'dm-slot'];
  if (matched) classes.push('matched');
  if (wrong) classes.push('wrong');
  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${pair.slot.label} slot${matched ? `, matched with ${matchedItemLabel}` : ''}`}
    >
      <span className="dm-card-label dm-slot-label">{pair.slot.label}</span>
      {pair.slot.sublabel && <span className="dm-card-sublabel">{pair.slot.sublabel}</span>}
      {matched && matchedItemLabel && <span className="dm-slot-matched">{matchedItemLabel}</span>}
    </button>
  );
}

function ShapePlaceholder({ shape }: { shape: ShapeHint }) {
  // Approximate visual scale so younger players can estimate sizes from the
  // shapes alone. Width is the meaningful dimension here.
  const dims: Record<ShapeHint, { w: number; h: number; color: string }> = {
    'small-square': { w: 24, h: 24, color: '#F2D26C' },
    'wide-short':   { w: 52, h: 18, color: '#D77A52' },
    'long-rect':    { w: 72, h: 22, color: '#A87CB5' },
    'tall-thin':    { w: 22, h: 56, color: '#7BB85F' },
    'huge-wide':    { w: 96, h: 14, color: '#4DA89E' },
  };
  const d = dims[shape];
  return (
    <span
      className="dm-shape"
      style={{ width: d.w, height: d.h, background: d.color }}
      aria-hidden="true"
    />
  );
}

/** Deterministic Fisher-Yates so slot order is stable across re-renders. */
function deterministicShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
