import { AVATARS } from '../data/avatars';
import type { AvatarId } from '../types';

interface Props {
  value: AvatarId;
  onChange: (id: AvatarId) => void;
}

export function AvatarPicker({ value, onChange }: Props) {
  return (
    <div className="avatar-grid" role="radiogroup" aria-label="Choose an avatar color">
      {AVATARS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={a.id === value}
          aria-label={a.label}
          title={a.label}
          className={`avatar-swatch${a.id === value ? ' selected' : ''}`}
          style={{ background: a.color }}
          onClick={() => onChange(a.id)}
        />
      ))}
    </div>
  );
}
