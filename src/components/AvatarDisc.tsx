import type { CSSProperties } from 'react';
import { avatarColor } from '../data/avatars';

interface Props {
  avatarId: string;
  initial: string;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

export function AvatarDisc({ avatarId, initial, size = 'md', style }: Props) {
  const cls = size === 'md' ? 'avatar-disc' : `avatar-disc ${size}`;
  return (
    <span
      className={cls}
      style={{ background: avatarColor(avatarId), ...style }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
