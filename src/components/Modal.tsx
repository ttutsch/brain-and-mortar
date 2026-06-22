import { useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  /** Accessible name for the dialog. */
  label: string;
  /** Called on Escape, backdrop click (when dismissable), or any close control. */
  onClose: () => void;
  children: ReactNode;
  /** Classes for the inner card, e.g. 'card card-wide shop-card'. */
  cardClassName?: string;
  /** Backdrop stacking order — overlays layer differently (100 / 150 / 200). */
  zIndex?: number;
  /** Whether clicking the backdrop closes the dialog. */
  dismissOnBackdrop?: boolean;
  /** Element to focus on open; defaults to the dialog container itself. */
  initialFocusRef?: RefObject<HTMLElement>;
}

/**
 * Accessible modal wrapper. Renders an aria-modal dialog with a focus trap,
 * Escape-to-close, and focus restoration to the triggering element on close.
 * Every overlay routes through this so keyboard / screen-reader users can't Tab
 * behind the dialog, are never stranded without an Escape, and land back on the
 * control they opened it from. (Adversarial-review finding #1.)
 */
export function Modal({
  label,
  onClose,
  children,
  cardClassName = 'card',
  zIndex = 150,
  dismissOnBackdrop = true,
  initialFocusRef,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Focus a requested element, else the dialog container (so the dialog and
    // its label are announced without auto-activating the first button).
    (initialFocusRef?.current ?? cardRef.current)?.focus();
    return () => previouslyFocused?.focus?.();
  }, [initialFocusRef]);

  function handleKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !cardRef.current) return;
    const focusables = Array.from(
      cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    if (focusables.length === 0) {
      e.preventDefault();
      cardRef.current.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === cardRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(42, 37, 34, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex,
      }}
      onClick={dismissOnBackdrop ? onClose : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={cardRef}
        className={cardClassName}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
