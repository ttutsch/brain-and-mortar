import type { PlayerSettings } from '../types';
import { Modal } from './Modal';

interface Props {
  playerName: string;
  settings: PlayerSettings;
  onChange: (next: PlayerSettings) => void;
  onClose: () => void;
}

/**
 * Per-profile accessibility settings (DESIGN.md §15). The narration toggle
 * stays hidden until any audio content exists (§16) — the data field is
 * already wired through.
 */
export function SettingsModal({ playerName, settings, onChange, onClose }: Props) {
  function toggle(key: 'highContrast' | 'reducedMotion' | 'dyslexiaFont') {
    onChange({ ...settings, [key]: !settings[key] });
  }

  return (
    <Modal label="Settings" onClose={onClose} cardClassName="card">
      <div className="row between" style={{ marginBottom: 6 }}>
          <h2 className="card-title" style={{ margin: 0, fontSize: 24 }}>Settings</h2>
          <button type="button" className="btn" onClick={onClose}>Done</button>
        </div>
        <p className="card-subtitle">For {playerName}’s profile. Saved automatically.</p>

        <div className="stack" style={{ gap: 10 }}>
          <SettingToggle
            label="High contrast"
            description="Stronger colours and darker text for easier reading."
            checked={settings.highContrast}
            onToggle={() => toggle('highContrast')}
          />
          <SettingToggle
            label="Easy-read font"
            description="A rounder font that some readers find easier."
            checked={!!settings.dyslexiaFont}
            onToggle={() => toggle('dyslexiaFont')}
          />
          <SettingToggle
            label="Reduce motion"
            description="Turns off moving clouds, pulses, and other animations."
            checked={settings.reducedMotion}
            onToggle={() => toggle('reducedMotion')}
          />
        </div>

        <p className="muted" style={{ fontSize: '0.85em', marginTop: 16, marginBottom: 0 }}>
          Tip: if your device asks for reduced motion, the game already respects that automatically.
        </p>
    </Modal>
  );
}

function SettingToggle({
  label, description, checked, onToggle,
}: { label: string; description: string; checked: boolean; onToggle: () => void }) {
  // Concise accessible name (the label) + the sentence linked as a description,
  // so screen readers don't read the whole paragraph as the control's name.
  const descId = `setting-desc-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <button
      type="button"
      className={`setting-row${checked ? ' on' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={descId}
    >
      <span className="setting-info">
        <strong>{label}</strong>
        <span className="muted setting-desc" id={descId}>{description}</span>
      </span>
      <span className="setting-switch" aria-hidden="true">
        <span className="setting-knob" />
      </span>
    </button>
  );
}
