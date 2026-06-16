import { useState } from 'react';
import type { CharacterId, Mission, PlayerProfile, PlayerProgress, PlayerSettings } from '../types';
import { CHARACTERS, CHARACTER_ORDER } from '../data/characters';
import { effectiveTier, tierLabel } from '../lib/tier';
import {
  getAvailableMissionForCharacter,
  getAvailableTrip,
  getChapterStatus,
  getOverallProgress,
} from '../lib/missionFlow';
import { CHAPTER_REPAIRS, CHAPTER_LABELS, ACT_LABELS } from '../data/missions';
import type { Trip } from '../data/trips';
import type { Cosmetic } from '../data/cosmetics';
import { CharacterPortrait } from './CharacterPortrait';
import { HouseStatus } from './HouseStatus';
import { HelpModal } from './HelpModal';
import { Shop } from './Shop';
import { SettingsModal } from './SettingsModal';
import { MemoryBook } from './MemoryBook';

interface Props {
  profile: PlayerProfile;
  progress: PlayerProgress | null;
  onExit: () => void;
  onOpenParentZone: () => void;
  onStartMission: (mission: Mission) => void;
  onStartTrip: (trip: Trip) => void;
  onReliveTrip: (trip: Trip) => void;
  onBuyCosmetic: (cosmetic: Cosmetic) => void;
  onUpdateSettings: (next: PlayerSettings) => void;
  celebrateItemId: string | null;
  onCelebrationDone: () => void;
}

export function HomeView({
  profile, progress, onExit, onOpenParentZone, onStartMission, onStartTrip, onReliveTrip,
  onBuyCosmetic, onUpdateSettings, celebrateItemId, onCelebrationDone,
}: Props) {
  const tier = effectiveTier(profile);
  const [focused, setFocused] = useState<CharacterId | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);

  const completedHouseItemIds = progress?.completedHouseItemIds ?? [];
  const coins = progress?.coins ?? 0;
  const focusedMission = focused ? getAvailableMissionForCharacter(focused, progress) : null;
  const availableTrip = getAvailableTrip(progress);

  // The "current" chapter is the first one with missions still to do; the act
  // banner tracks just that chapter's act.
  const chapterStatuses = CHAPTER_REPAIRS.map((r) => getChapterStatus(r.chapterId, progress));
  const currentChapter = chapterStatuses.find((s) => s.done < s.total) ?? null;
  const currentActId = (currentChapter ?? chapterStatuses[chapterStatuses.length - 1]).chapterId.split('.')[0];
  const actStatuses = chapterStatuses.filter((s) => s.chapterId.startsWith(`${currentActId}.`));
  const actDone = actStatuses.reduce((n, s) => n + s.done, 0);
  const actTotal = actStatuses.reduce((n, s) => n + s.total, 0);
  const actLabel = ACT_LABELS[currentActId] ?? currentActId;

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <span className="dot" />
          The T Family
        </div>
        <div className="right">
          <button
            type="button"
            className="coin-pill coin-pill-btn"
            onClick={() => setShopOpen(true)}
            aria-label={`${coins} coins — open shop`}
            title="Open the shop"
          >
            <span className="coin-icon" aria-hidden="true">$</span>
            {coins}
            <span className="coin-pill-shop-hint" aria-hidden="true">Shop</span>
          </button>
          <span className="muted" style={{ fontSize: '0.9em' }}>
            Playing as <strong style={{ color: 'var(--color-ink)' }}>{profile.displayName}</strong>
          </span>
          <button
            type="button"
            className="help-btn"
            onClick={() => setHelpOpen(true)}
            aria-label="How to play"
            title="How to play"
          >
            ?
          </button>
          <button
            type="button"
            className="help-btn"
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
            title="Settings"
          >
            ⚙
          </button>
          <button type="button" className="btn btn-ghost" onClick={onOpenParentZone}>
            Parent Zone
          </button>
          <button type="button" className="btn" onClick={onExit}>
            Switch player
          </button>
        </div>
      </header>

      <main className={`home-stage tier-${tier}`}>
        <div className="row between" style={{ marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
          <span className="home-tier-banner">Tier: {tierLabel(tier)}</span>
          <button
            type="button"
            className="chapter-banner memory-book-btn"
            onClick={() => setMemoryOpen(true)}
            aria-label="Open memory book"
          >
            📖 Memory book
          </button>
          <div className="chapter-banner-stack">
            {currentChapter ? (
              <span className="chapter-banner">
                <strong>{CHAPTER_LABELS[currentChapter.chapterId] ?? currentChapter.chapterName}</strong>
                <span className="chapter-banner-progress">
                  {currentChapter.done} / {currentChapter.total}
                </span>
              </span>
            ) : (
              <span className="chapter-banner">
                <strong>All chapters complete!</strong>
              </span>
            )}
            <span className="chapter-banner">
              <strong>{actLabel}</strong>
              <span className="chapter-banner-progress">{actDone} / {actTotal} missions</span>
            </span>
          </div>
        </div>

        {availableTrip && (
          <TripBanner trip={availableTrip} onStart={() => onStartTrip(availableTrip)} />
        )}

        <HouseStatus
          completedHouseItemIds={completedHouseItemIds}
          completedTripIds={progress?.completedTripIds ?? []}
          ownedCosmeticIds={progress?.ownedCosmeticIds ?? []}
          overall={getOverallProgress(progress)}
          celebrateItemId={celebrateItemId}
          onCelebrationDone={onCelebrationDone}
        />

        <div className="family-row" aria-label="Family at home">
          <span className="family-row-label">Family</span>
          {CHARACTER_ORDER.map((id) => {
            const c = CHARACTERS[id];
            const hasMission = getAvailableMissionForCharacter(id, progress) !== null;
            return (
              <button
                key={id}
                type="button"
                className={`character-chip${hasMission ? ' has-mission' : ''}`}
                onClick={() => setFocused(id)}
                aria-label={hasMission ? `${c.displayName} — mission available` : `Talk to ${c.displayName}`}
              >
                <CharacterPortrait characterId={id} size="sm" />
                <span>{c.displayName}</span>
                {hasMission && <span className="mission-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {focused && (
          <FocusPanel
            characterId={focused}
            mission={focusedMission}
            tier={tier}
            onClose={() => setFocused(null)}
            onStartMission={(m) => {
              setFocused(null);
              onStartMission(m);
            }}
          />
        )}
        {helpOpen && (
          <HelpModal tier={tier} onClose={() => setHelpOpen(false)} />
        )}
        {shopOpen && (
          <Shop
            coins={coins}
            ownedCosmeticIds={progress?.ownedCosmeticIds ?? []}
            onBuy={onBuyCosmetic}
            onClose={() => setShopOpen(false)}
          />
        )}
        {settingsOpen && (
          <SettingsModal
            playerName={profile.displayName}
            settings={profile.settings}
            onChange={onUpdateSettings}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {memoryOpen && (
          <MemoryBook
            completedTripIds={progress?.completedTripIds ?? []}
            onRelive={(trip) => {
              setMemoryOpen(false);
              onReliveTrip(trip);
            }}
            onClose={() => setMemoryOpen(false)}
          />
        )}
      </main>
    </>
  );
}

interface FocusPanelProps {
  characterId: CharacterId;
  mission: Mission | null;
  tier: number;
  onClose: () => void;
  onStartMission: (mission: Mission) => void;
}

function TripBanner({ trip, onStart }: { trip: Trip; onStart: () => void }) {
  return (
    <div className="trip-banner" role="region" aria-label={`Trip available: ${trip.title}`}>
      <div>
        <span className="trip-banner-tag">Big trip ready!</span>
        <h2 className="trip-banner-title">{trip.title}</h2>
        <p className="trip-banner-body">The whole family earned a weekend in {trip.destination}.</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onStart}>
        Pack the car
      </button>
    </div>
  );
}

function FocusPanel({ characterId, mission, tier, onClose, onStartMission }: FocusPanelProps) {
  const c = CHARACTERS[characterId];
  const introLine = mission?.tiers[tier as 1 | 2 | 3]?.wrapper[0]?.text;

  return (
    <div
      role="dialog"
      aria-label={`About ${c.displayName}`}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 100,
      }}
      onClick={onClose}
    >
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <div className="row gap-lg" style={{ marginBottom: 16 }}>
          <CharacterPortrait characterId={characterId} size="lg" />
          <div>
            <h2 className="card-title" style={{ fontSize: '24px' }}>{c.displayName}</h2>
            <p className="muted" style={{ margin: 0 }}>
              {c.role === 'parent' ? 'Parent' : `Age ${c.age}`} · {c.specialty}
            </p>
          </div>
        </div>
        <p>{c.personality}</p>

        {mission ? (
          <>
            <div className="mission-prompt">
              <span className="tag tag-repair">Mission available</span>
              {introLine && <p style={{ marginTop: 10 }}>{introLine}</p>}
            </div>
            <div className="row between" style={{ marginTop: 18 }}>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Maybe later</button>
              <button type="button" className="btn btn-primary" onClick={() => onStartMission(mission)}>
                Start mission
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="muted" style={{ fontSize: '0.9em' }}>
              No mission ready with {c.displayName} right now. Check back as new chapters unlock.
            </p>
            <div className="row between" style={{ marginTop: 12 }}>
              <span />
              <button type="button" className="btn btn-primary" onClick={onClose}>Got it</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
