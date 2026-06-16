import { useEffect, useState } from 'react';
import { HouseSvg } from './HouseSvg';

/**
 * Central "current state of the house" panel. The scene itself lives in
 * HouseSvg.tsx; this component owns the hotspot data model, progress counts,
 * and the sequence-reveal rule (repairs first, upgrades after).
 * When real AI illustrations land (STYLE_GUIDE.md), HouseSvg swaps for layered
 * images and the hotspot model here carries over untouched.
 */

export type HouseItemKind = 'repair' | 'upgrade';

export interface HouseItem {
  id: string;
  chapter: string;
  label: string;
  detail: string;
  kind: HouseItemKind;
  /** Hotspot center in the 1000x560 SVG viewBox. */
  hotspot: { x: number; y: number };
}

const VIEW_W = 1000;
const VIEW_H = 560;

export const HOUSE_ITEMS: HouseItem[] = [
  // Act I repairs
  { id: 'repair.living',   chapter: 'Ch. 1', label: 'Dusty living room & squeaky front door', detail: 'Scrub the living room and oil the squeaky front door so the family can settle in.', kind: 'repair', hotspot: { x: 569, y: 378 } },
  { id: 'repair.yard',     chapter: 'Ch. 2', label: 'Weedy yard & broken fence',              detail: 'Clear out the weeds and mend the picket fence so the yard is safe.',              kind: 'repair', hotspot: { x: 810, y: 444 } },
  { id: 'repair.basement', chapter: 'Ch. 3', label: 'Leaky, damp basement',                   detail: 'Find the leak, dry it out, and sweep down the cobwebs.',                          kind: 'repair', hotspot: { x: 404, y: 428 } },
  { id: 'repair.garage',   chapter: 'Ch. 4', label: 'Stuck garage door & cracked drive',      detail: 'Fix the garage door and patch the cracked driveway.',                             kind: 'repair', hotspot: { x: 218, y: 394 } },
  // Act II/III upgrades — revealed once all repairs are done
  { id: 'upgrade.workshop',   chapter: 'Ch. 5', label: 'Garage workshop',           detail: 'A maker space for Mama T and Tessa.',                       kind: 'upgrade', hotspot: { x: 218, y: 300 } },
  { id: 'upgrade.kitchen',    chapter: 'Ch. 6', label: 'Big kitchen island',        detail: 'A real cook-together kitchen.',                             kind: 'upgrade', hotspot: { x: 349, y: 380 } },
  { id: 'upgrade.bedrooms',   chapter: 'Ch. 7', label: 'Bedroom redesigns',         detail: 'Personal touches for each kid.',                            kind: 'upgrade', hotspot: { x: 350, y: 272 } },
  { id: 'upgrade.pool',       chapter: 'Ch. 8', label: 'Backyard pool',             detail: 'The Act II showpiece.',                                     kind: 'upgrade', hotspot: { x: 760, y: 524 } },
  { id: 'upgrade.basement',   chapter: 'Ch. 9', label: 'Super-cool basement rec',   detail: 'Once the leak is fixed, the basement becomes a hangout.',   kind: 'upgrade', hotspot: { x: 470, y: 430 } },
  { id: 'upgrade.familyroom', chapter: 'Ch. 10',label: 'Family room redesign',      detail: 'A cozy refresh where the news gets discussed at the kitchen table.', kind: 'upgrade', hotspot: { x: 620, y: 330 } },
  { id: 'upgrade.observatory',chapter: 'Ch. 11',label: 'Backyard observatory',      detail: 'Stargazing dome for Izzy’s science fair.',                  kind: 'upgrade', hotspot: { x: 954, y: 388 } },
  { id: 'upgrade.porch',      chapter: 'Ch. 12',label: 'Front-porch redesign',      detail: 'A real porch with a swing for the whole family.',           kind: 'upgrade', hotspot: { x: 482, y: 340 } },
];

interface Props {
  completedHouseItemIds: string[];
  completedTripIds: string[];
  ownedCosmeticIds: string[];
  /** Adventure progress across all authored missions + trips. */
  overall: { done: number; total: number; percent: number };
  /** House item (or 'coda.trampoline') that just landed — shows the glow. */
  celebrateItemId?: string | null;
  onCelebrationDone?: () => void;
}

/** Where + what to celebrate for a just-landed house change. */
function celebrationFor(id: string): { x: number; y: number; label: string } | null {
  if (id === 'coda.trampoline') {
    return { x: 852, y: 450, label: 'The trampoline is here!' };
  }
  const item = HOUSE_ITEMS.find((i) => i.id === id);
  if (!item) return null;
  return {
    x: item.hotspot.x,
    y: item.hotspot.y,
    label: item.kind === 'repair' ? 'Repaired!' : 'New upgrade!',
  };
}

const CELEBRATION_MS = 9000;

export function HouseStatus({
  completedHouseItemIds, completedTripIds, ownedCosmeticIds, overall,
  celebrateItemId, onCelebrationDone,
}: Props) {
  const completed = new Set(completedHouseItemIds);
  const repairs = HOUSE_ITEMS.filter((i) => i.kind === 'repair');
  const upgrades = HOUSE_ITEMS.filter((i) => i.kind === 'upgrade');
  const repairsDone = repairs.filter((r) => completed.has(r.id)).length;
  const upgradesDone = upgrades.filter((u) => completed.has(u.id)).length;
  const allRepairsDone = repairsDone === repairs.length;
  const allDone = repairsDone + upgradesDone === HOUSE_ITEMS.length;
  const trampolineUnlocked = completedTripIds.includes('trip.act1.ottawa');

  // Sequence reveal: repair markers while any repair is pending; upgrade
  // markers only after every repair is done. Completed items never show.
  const visibleItems = HOUSE_ITEMS.filter((item) => {
    if (completed.has(item.id)) return false;
    if (item.kind === 'upgrade' && !allRepairsDone) return false;
    return true;
  });

  const [focused, setFocused] = useState<HouseItem | null>(null);

  const celebration = celebrateItemId ? celebrationFor(celebrateItemId) : null;
  useEffect(() => {
    if (!celebration || !onCelebrationDone) return;
    const t = setTimeout(onCelebrationDone, CELEBRATION_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebrateItemId]);

  return (
    <section className="house-status" aria-label="Current state of the T Family home">
      <div className="house-status-header">
        <div>
          <h2 className="house-status-title">The House</h2>
          <p className="house-status-subtitle">
            {allDone
              ? 'All done — what a transformation!'
              : allRepairsDone
                ? 'The house is solid — time for some upgrades.'
                : 'Just moved in — there’s a lot to fix.'}
          </p>
        </div>
        <div className="house-status-counts">
          <span className="count-pill repair">
            <strong>{repairsDone}</strong> / {repairs.length} repairs
          </span>
          {allRepairsDone && (
            <span className="count-pill upgrade">
              <strong>{upgradesDone}</strong> / {upgrades.length} upgrades
            </span>
          )}
        </div>
      </div>

      <div className="adventure-meter" aria-label={`Adventure progress: ${overall.done} of ${overall.total}, ${overall.percent} percent`}>
        <span className="am-label">Adventure</span>
        <div className="am-track" aria-hidden="true">
          <div className="am-fill" style={{ width: `${overall.percent}%` }} />
          {/* Star marker rides the front edge of the fill */}
          {overall.percent > 0 && overall.percent < 100 && (
            <span className="am-star" style={{ left: `${overall.percent}%` }}>★</span>
          )}
        </div>
        <span className="am-value">
          {overall.done} / {overall.total} · {overall.percent}%
        </span>
      </div>

      <div className="house-status-stage">
        <HouseSvg
          completed={completed}
          trampolineUnlocked={trampolineUnlocked}
          cosmetics={ownedCosmeticIds}
        />
        {celebration && (
          <button
            type="button"
            className="house-celebrate"
            style={{
              left: `${(celebration.x / VIEW_W) * 100}%`,
              top: `${(celebration.y / VIEW_H) * 100}%`,
            }}
            onClick={onCelebrationDone}
            aria-label={`${celebration.label} Tap to dismiss.`}
          >
            <span className="hc-halo" aria-hidden="true" />
            <span className="hc-sparkle hc-sparkle-a" aria-hidden="true">✦</span>
            <span className="hc-sparkle hc-sparkle-b" aria-hidden="true">✦</span>
            <span className="hc-sparkle hc-sparkle-c" aria-hidden="true">✦</span>
            <span className="hc-chip">✨ {celebration.label}</span>
          </button>
        )}
        {visibleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`house-hotspot ${item.kind}`}
            style={{
              left: `${(item.hotspot.x / VIEW_W) * 100}%`,
              top: `${(item.hotspot.y / VIEW_H) * 100}%`,
            }}
            onClick={() => setFocused(item)}
            aria-label={`${item.kind === 'repair' ? 'Needs repair' : 'Future upgrade'}: ${item.label} (${item.chapter})`}
            title={`${item.label} — ${item.chapter}`}
          >
            {item.chapter.replace('Ch. ', '')}
          </button>
        ))}
      </div>

      {focused && (
        <HotspotDetail item={focused} onClose={() => setFocused(null)} />
      )}
    </section>
  );
}

function HotspotDetail({ item, onClose }: { item: HouseItem; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label={`${item.label} details`}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, zIndex: 150,
      }}
      onClick={onClose}
    >
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <span className={`tag tag-${item.kind}`} style={{ display: 'inline-block', marginBottom: 12 }}>
          {item.kind === 'repair' ? 'Needs repair' : 'Future upgrade'} · {item.chapter}
        </span>
        <h2 className="card-title" style={{ fontSize: 26 }}>{item.label}</h2>
        <p>{item.detail}</p>
        <div className="row between">
          <span />
          <button type="button" className="btn btn-primary" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
