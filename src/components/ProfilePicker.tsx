import type { PlayerProfile } from '../types';
import { effectiveTier, tierLabel } from '../lib/tier';
import { AvatarDisc } from './AvatarDisc';

interface Props {
  profiles: PlayerProfile[];
  onPick: (profile: PlayerProfile) => void;
  onAddProfile: () => void;
}

export function ProfilePicker({ profiles, onPick, onAddProfile }: Props) {
  return (
    <div className="centered-screen">
      <div className="card card-wide">
        <h1 className="card-title">Who’s playing?</h1>
        <p className="card-subtitle">Tap your name to keep going.</p>

        <div className="picker-grid">
          {profiles.map((p) => {
            const tier = effectiveTier(p);
            const initial = p.displayName.slice(0, 1).toUpperCase();
            return (
              <button
                key={p.id}
                type="button"
                className="picker-tile"
                onClick={() => onPick(p)}
                aria-label={`Play as ${p.displayName}`}
              >
                <AvatarDisc avatarId={p.avatarId} initial={initial} />
                <span className="name">{p.displayName}</span>
                <span className="meta">{tierLabel(tier)}</span>
              </button>
            );
          })}

          <button
            type="button"
            className="picker-tile add"
            onClick={onAddProfile}
            aria-label="Add a new player"
          >
            <span className="avatar-disc" style={{ background: 'transparent', color: 'currentColor', boxShadow: 'none', border: '2px dashed currentColor' }}>+</span>
            <span className="name">Add player</span>
            <span className="meta">New profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
