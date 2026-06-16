import type { Trip } from '../data/trips';
import { TRIPS } from '../data/trips';
import { TripImage } from './TripImage';

interface Props {
  completedTripIds: string[];
  /** Tap an earned postcard → replay the whole trip (no rewards re-earned). */
  onRelive: (trip: Trip) => void;
  onClose: () => void;
}

/**
 * The memory book — a browsable collection of postcards from completed trips
 * (DESIGN.md §13, trip badges/postcards track). Earned postcards are tappable
 * and replay the full trip in TripPlayer replay mode; upcoming trips show as
 * silhouette slots so kids can see what's still ahead.
 */
export function MemoryBook({ completedTripIds, onRelive, onClose }: Props) {
  const allTrips = Object.values(TRIPS);
  const done = new Set(completedTripIds);

  return (
    <div
      role="dialog"
      aria-label="Memory book"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 150,
      }}
      onClick={onClose}
    >
      <div className="card card-wide memory-book" onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ marginBottom: 6 }}>
          <h2 className="card-title" style={{ margin: 0 }}>Memory Book</h2>
          <button type="button" className="btn" onClick={onClose}>Done</button>
        </div>
        <p className="card-subtitle">
          Every big family trip earns a postcard. Tap one to re-live the whole trip!
        </p>

        <div className="mb-grid">
          {allTrips.map((trip) => {
            const earned = done.has(trip.id);
            return earned ? (
              <button
                key={trip.id}
                type="button"
                className="mb-postcard mb-postcard-live"
                onClick={() => onRelive(trip)}
                aria-label={`Re-live ${trip.title}`}
              >
                {trip.intro.image && <TripImage image={trip.intro.image} />}
                <span className="mb-postcard-body">
                  <span className="trip-tag">Postcard · {trip.destination}</span>
                  <span className="mb-postcard-title">{trip.title}</span>
                  <span className="muted mb-postcard-text">{trip.outro.body}</span>
                  <span className="mb-relive-hint">▶ Tap to re-live this trip</span>
                </span>
              </button>
            ) : (
              <article key={trip.id} className="mb-postcard mb-postcard-locked" aria-label={`Locked postcard: ${trip.destination}`}>
                <div className="mb-locked-stamp" aria-hidden="true">?</div>
                <div className="mb-postcard-body">
                  <span className="trip-tag">Future trip</span>
                  <h3 className="mb-postcard-title">{trip.destination}</h3>
                  <p className="muted mb-postcard-text">
                    Finish the act to earn this postcard.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
