import type { Tier } from '../types';
import { tierLabel } from '../lib/tier';

interface Props {
  tier: Tier;
  onClose: () => void;
}

export function HelpModal({ tier, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-label="How to play"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 150,
      }}
      onClick={onClose}
    >
      <div className="card card-wide help-card" onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ marginBottom: 12 }}>
          <h2 className="card-title" style={{ margin: 0 }}>How to play</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose} aria-label="Close help">
            Close
          </button>
        </div>

        <div className="help-section">
          <h3 className="help-section-title">Meet the family</h3>
          <p>
            The T Family — Mama T, Dada T, Tessa, Owen, Izzy, and Caleb — just
            moved into a fixer-upper in Toronto. Pick a family member to start
            a mission with them.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-title">Fix up the house</h3>
          <p>
            Every chapter you finish makes the house better. <strong>Act I is
            about repairs</strong> — clearing weeds, fixing the squeaky door,
            mending the fence. <strong>Acts II and III add cool upgrades</strong>
            — a workshop, a pool, a super-cool basement, an observatory.
          </p>
          <p className="muted" style={{ fontSize: '0.9em' }}>
            Look for the numbered badges on the house. <span className="tag tag-repair">repair</span> badges glow — those are this chapter's repairs. <span className="tag tag-upgrade">upgrade</span> badges appear once the house is fixed up.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-title">Big rewards: trips</h3>
          <p>
            Finishing a whole act unlocks a real Canadian family trip:
            <strong> Ottawa</strong> after Act I, <strong>the Rockies</strong>
            after Act II, and <strong>the East Coast</strong> after Act III.
          </p>
        </div>

        <div className="help-section">
          <h3 className="help-section-title">Just right for you</h3>
          <p>
            Missions adjust to your age. You’re currently playing as a <strong>{tierLabel(tier)}</strong> — the reading level and math difficulty are tuned for you. A grown-up can change this in the Parent Zone if needed.
          </p>
        </div>

        <div className="row between" style={{ marginTop: 20 }}>
          <span />
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Got it, let’s play
          </button>
        </div>
      </div>
    </div>
  );
}
