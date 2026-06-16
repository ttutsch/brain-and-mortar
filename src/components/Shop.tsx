import { COSMETICS } from '../data/cosmetics';
import type { Cosmetic } from '../data/cosmetics';

interface Props {
  coins: number;
  ownedCosmeticIds: string[];
  onBuy: (cosmetic: Cosmetic) => void;
  onClose: () => void;
}

/**
 * The cosmetics shop — spend mission coins on small extras that appear on the
 * house scene. Everything is coin-only; there are no real-money purchases
 * anywhere in the game (DESIGN.md §13).
 */
export function Shop({ coins, ownedCosmeticIds, onBuy, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-label="Cosmetics shop"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(42, 37, 34, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 150,
      }}
      onClick={onClose}
    >
      <div className="card card-wide shop-card" onClick={(e) => e.stopPropagation()}>
        <div className="row between" style={{ marginBottom: 6 }}>
          <h2 className="card-title" style={{ margin: 0 }}>The Backyard Shop</h2>
          <div className="row" style={{ gap: 10 }}>
            <span className="coin-pill" aria-label={`${coins} coins`}>
              <span className="coin-icon" aria-hidden="true">$</span>
              {coins}
            </span>
            <button type="button" className="btn" onClick={onClose}>Done</button>
          </div>
        </div>
        <p className="card-subtitle" style={{ marginBottom: 18 }}>
          Spend your mission coins on extras for the house. Everything you buy shows up in the yard!
        </p>

        <div className="shop-grid">
          {COSMETICS.map((item) => {
            const owned = ownedCosmeticIds.includes(item.id);
            const affordable = coins >= item.price;
            return (
              <div key={item.id} className={`shop-item${owned ? ' owned' : ''}`}>
                <span className="shop-item-icon" aria-hidden="true">{item.icon}</span>
                <div className="shop-item-info">
                  <strong>{item.name}</strong>
                  <span className="muted shop-item-desc">{item.description}</span>
                </div>
                {owned ? (
                  <span className="shop-owned-tag">Owned ✓</span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary shop-buy-btn"
                    disabled={!affordable}
                    onClick={() => onBuy(item)}
                    aria-label={`Buy ${item.name} for ${item.price} coins`}
                  >
                    {item.price} coins
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="muted" style={{ fontSize: '0.85em', marginTop: 16, marginBottom: 0 }}>
          Need more coins? Every mission earns 10, and finishing a trip earns a bonus.
        </p>
      </div>
    </div>
  );
}
