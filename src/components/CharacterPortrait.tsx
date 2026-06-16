import type { CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';

/**
 * Comic-style head-and-shoulders portraits for the six family members,
 * drawn per STYLE_GUIDE §5 in the Raina-anchor register: clean ink outlines,
 * flat fills, simple expressive faces. Circular crop so they drop into any
 * slot the old initial-discs occupied. Placeholder until AI model sheets land.
 */

const INK = '#3A3027';

interface Props {
  characterId: CharacterId;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_PX = { sm: 48, md: 88, lg: 120 } as const;

export function CharacterPortrait({ characterId, size = 'md' }: Props) {
  const c = CHARACTERS[characterId];
  const px = SIZE_PX[size];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Portrait of ${c.displayName}`}
      className="char-portrait"
    >
      <defs>
        <clipPath id={`cp-${characterId}`}>
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      {/* Backdrop ring in the character's accent colour */}
      <circle cx="50" cy="50" r="48" fill={c.accentColor} opacity="0.25" />
      <g clipPath={`url(#cp-${characterId})`}>
        <Portrait id={characterId} />
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

function Portrait({ id }: { id: CharacterId }) {
  switch (id) {
    case 'mama_t': return <MamaT />;
    case 'dada_t': return <DadaT />;
    case 'tessa': return <Tessa />;
    case 'owen': return <Owen />;
    case 'izzy': return <Izzy />;
    case 'caleb': return <Caleb />;
  }
}

/* Shared face bits */
function Eyes({ y = 48, dx = 9 }: { y?: number; dx?: number }) {
  return (
    <g fill={INK}>
      <circle cx={50 - dx} cy={y} r="2.6" />
      <circle cx={50 + dx} cy={y} r="2.6" />
    </g>
  );
}
function Smile({ y = 60, w = 12, open = false }: { y?: number; w?: number; open?: boolean }) {
  return open ? (
    <path d={`M ${50 - w / 2} ${y} q ${w / 2} ${w * 0.7} ${w} 0 z`} fill="#9C4A3C" stroke={INK} strokeWidth="2" />
  ) : (
    <path d={`M ${50 - w / 2} ${y} q ${w / 2} ${w * 0.55} ${w} 0`} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
  );
}
function Brows({ y = 41, dx = 9, tilt = 0 }: { y?: number; dx?: number; tilt?: number }) {
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none">
      <path d={`M ${50 - dx - 4} ${y + tilt} q 4 -3 8 ${-tilt}`} />
      <path d={`M ${50 + dx - 4} ${y - tilt} q 4 -3 8 ${tilt}`} />
    </g>
  );
}

/* ---- Mama T: bandana, low ponytail, overalls, paint smudge ---- */
function MamaT() {
  const skin = '#B07B52';
  return (
    <g stroke={INK} strokeWidth="2.4">
      {/* Shoulders: denim overalls over tee */}
      <path d="M 14 100 q 8 -28 36 -28 q 28 0 36 28 z" fill="#5A7A99" />
      <path d="M 32 100 q 0 -20 18 -20 q 18 0 18 20 z" fill="#E8DCBE" />
      <rect x="36" y="82" width="7" height="18" fill="#5A7A99" />
      <rect x="57" y="82" width="7" height="18" fill="#5A7A99" />
      {/* Neck + head */}
      <rect x="44" y="66" width="12" height="10" fill={skin} />
      <ellipse cx="50" cy="48" rx="22" ry="24" fill={skin} />
      {/* Low ponytail behind shoulder */}
      <path d="M 68 52 q 10 8 8 26 q -8 -4 -10 -16 z" fill="#231A14" />
      {/* Hair under bandana */}
      <path d="M 28 46 q -2 -22 22 -24 q 24 2 22 24 q -6 -10 -22 -10 q -16 0 -22 10 z" fill="#231A14" />
      {/* Teal bandana */}
      <path d="M 27 40 q 4 -18 23 -18 q 19 0 23 18 q -10 -8 -23 -8 q -13 0 -23 8 z" fill="#4DA89E" />
      <path d="M 27 40 l -5 8 l 8 -2 z" fill="#4DA89E" />
      <Eyes /><Brows /><Smile />
      {/* Paint smudge on cheek */}
      <ellipse cx="63" cy="57" rx="3.4" ry="2" fill="#E8B547" stroke="none" />
    </g>
  );
}

/* ---- Dada T: short brown hair, stubble hint, glasses on cord, cardigan ---- */
function DadaT() {
  const skin = '#C9A06B';
  return (
    <g stroke={INK} strokeWidth="2.4">
      <path d="M 14 100 q 8 -28 36 -28 q 28 0 36 28 z" fill="#2D4A6B" />
      <path d="M 38 100 q 2 -18 12 -18 q 10 0 12 18 z" fill="#FFF9EE" />
      <rect x="44" y="66" width="12" height="10" fill={skin} />
      <ellipse cx="50" cy="48" rx="21" ry="24" fill={skin} />
      {/* Short neat hair */}
      <path d="M 29 44 q -1 -22 21 -22 q 22 0 21 22 q -4 -12 -21 -12 q -17 0 -21 12 z" fill="#6B4A2E" />
      {/* Glasses */}
      <g fill="none" strokeWidth="2.2">
        <circle cx="41" cy="48" r="6.5" />
        <circle cx="59" cy="48" r="6.5" />
        <line x1="47.5" y1="48" x2="52.5" y2="48" />
      </g>
      {/* Glasses cord */}
      <path d="M 65.5 48 q 8 6 6 14" fill="none" strokeWidth="1.6" />
      <Brows y={39} />
      <g fill={INK}>
        <circle cx="41" cy="48" r="2.2" />
        <circle cx="59" cy="48" r="2.2" />
      </g>
      <Smile y={61} />
      {/* Stubble dots */}
      <g fill="#8F7350" stroke="none">
        <circle cx="42" cy="66" r="0.9" /><circle cx="47" cy="68" r="0.9" />
        <circle cx="53" cy="68" r="0.9" /><circle cx="58" cy="66" r="0.9" />
      </g>
    </g>
  );
}

/* ---- Tessa (13): dark ponytail + scrunchie, headphones around neck ---- */
function Tessa() {
  const skin = '#BD8A5E';
  return (
    <g stroke={INK} strokeWidth="2.4">
      <path d="M 14 100 q 8 -28 36 -28 q 28 0 36 28 z" fill="#A87CB5" />
      <rect x="44" y="66" width="12" height="10" fill={skin} />
      {/* Headphones band around neck */}
      <path d="M 30 84 q 20 14 40 0" fill="none" strokeWidth="4" stroke="#3E4A56" />
      <circle cx="30" cy="84" r="5" fill="#3E4A56" />
      <circle cx="70" cy="84" r="5" fill="#3E4A56" />
      <ellipse cx="50" cy="47" rx="21" ry="23" fill={skin} />
      {/* High ponytail */}
      <path d="M 60 24 q 16 2 12 22 q 6 14 -2 26 q -2 -16 -8 -22 q 4 -16 -2 -26 z" fill="#3E2A1C" />
      <circle cx="66" cy="30" r="4" fill="#E8B547" />
      {/* Hair with side part */}
      <path d="M 29 44 q -2 -24 21 -24 q 24 0 22 24 q -2 -12 -10 -14 q 2 6 -2 8 q -4 -10 -12 -10 q -14 0 -19 16 z" fill="#3E2A1C" />
      <Eyes y={47} /><Brows y={40} tilt={1.5} /><Smile y={59} w={11} />
    </g>
  );
}

/* ---- Owen (11): messy light-brown hair, jersey, gap-tooth grin ---- */
function Owen() {
  const skin = '#E0B68C';
  return (
    <g stroke={INK} strokeWidth="2.4">
      {/* Jersey with stripe */}
      <path d="M 14 100 q 8 -28 36 -28 q 28 0 36 28 z" fill="#D77A52" />
      <path d="M 20 92 q 30 -12 60 0 l 0 5 q -30 -12 -60 0 z" fill="#FFF9EE" stroke="none" />
      <rect x="44" y="66" width="12" height="10" fill={skin} />
      <ellipse cx="50" cy="48" rx="21" ry="23" fill={skin} />
      {/* Messy spiky hair */}
      <path d="M 29 44 q -3 -10 4 -16 l 2 6 q 2 -10 10 -12 l 1 6 q 4 -8 12 -6 l -1 6 q 8 -4 12 4 l -5 4 q 8 2 7 8 q -8 -10 -21 -10 q -15 0 -21 10 z" fill="#A9784E" />
      <Eyes /><Brows tilt={-1} />
      {/* Gap-tooth grin */}
      <path d="M 43 59 q 7 8 14 0 z" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
      <line x1="50" y1="59" x2="50" y2="64" stroke={INK} strokeWidth="1.6" />
      {/* Freckle band */}
      <g fill="#C29067" stroke="none">
        <circle cx="38" cy="54" r="1" /><circle cx="42" cy="56" r="1" />
        <circle cx="58" cy="56" r="1" /><circle cx="62" cy="54" r="1" />
      </g>
    </g>
  );
}

/* ---- Izzy (9): curly red hair, freckles, pencil behind ear ---- */
function Izzy() {
  const skin = '#F2CBA0';
  return (
    <g stroke={INK} strokeWidth="2.4">
      {/* Mustard overalls */}
      <path d="M 14 100 q 8 -26 36 -26 q 28 0 36 26 z" fill="#E8B547" />
      <path d="M 36 100 q 0 -16 14 -16 q 14 0 14 16 z" fill="#FFF9EE" />
      <rect x="44" y="66" width="12" height="9" fill={skin} />
      {/* Curly red hair — cloud of circles behind head */}
      <g fill="#C25B33">
        <circle cx="30" cy="38" r="10" /><circle cx="40" cy="28" r="11" />
        <circle cx="54" cy="25" r="11" /><circle cx="66" cy="32" r="10" />
        <circle cx="71" cy="44" r="9" /><circle cx="69" cy="56" r="8" />
        <circle cx="28" cy="50" r="9" /><circle cx="30" cy="60" r="7" />
      </g>
      <ellipse cx="50" cy="49" rx="19" ry="21" fill={skin} />
      {/* Curl fringe over forehead */}
      <g fill="#C25B33" stroke="none">
        <circle cx="38" cy="33" r="6" /><circle cx="48" cy="30" r="6.5" />
        <circle cx="58" cy="32" r="6" /><circle cx="65" cy="38" r="5" />
        <circle cx="33" cy="39" r="5" />
      </g>
      {/* Pencil behind ear */}
      <g>
        <rect x="66" y="46" width="14" height="4" rx="1.5" transform="rotate(28 66 46)" fill="#F2D26C" />
        <polygon points="79,53.5 84,55.5 80,57.5" fill={skin} transform="rotate(2 80 55)" />
      </g>
      <Eyes y={49} dx={8} /><Brows y={42} dx={8} /><Smile y={59} w={11} open />
      {/* Freckles across nose */}
      <g fill="#D9A06B" stroke="none">
        <circle cx="42" cy="54" r="1" /><circle cx="46" cy="56" r="1" />
        <circle cx="50" cy="55" r="1" /><circle cx="54" cy="56" r="1" />
        <circle cx="58" cy="54" r="1" />
      </g>
    </g>
  );
}

/* ---- Caleb (6): round cheeks, black curls, fox tee, big curious eyes ---- */
function Caleb() {
  const skin = '#9C6B47';
  return (
    <g stroke={INK} strokeWidth="2.4">
      <path d="M 16 100 q 8 -24 34 -24 q 26 0 34 24 z" fill="#8FB39D" />
      {/* Fox face on tee */}
      <g stroke={INK} strokeWidth="1.6">
        <polygon points="44,90 50,84 56,90 53,96 47,96" fill="#E8923F" />
        <polygon points="44,90 45,85 48,88" fill="#E8923F" />
        <polygon points="56,90 55,85 52,88" fill="#E8923F" />
      </g>
      <rect x="45" y="64" width="10" height="9" fill={skin} />
      {/* Round head */}
      <circle cx="50" cy="47" r="21" fill={skin} />
      {/* Tight black curls */}
      <g fill="#1A130E">
        <circle cx="34" cy="36" r="8" /><circle cx="44" cy="29" r="8.5" />
        <circle cx="56" cy="29" r="8.5" /><circle cx="66" cy="36" r="8" />
        <circle cx="69" cy="46" r="6" /><circle cx="31" cy="46" r="6" />
      </g>
      {/* Big curious eyes */}
      <g>
        <circle cx="42" cy="48" r="4" fill="#FFFFFF" />
        <circle cx="58" cy="48" r="4" fill="#FFFFFF" />
        <circle cx="42.5" cy="48.5" r="2.2" fill={INK} stroke="none" />
        <circle cx="58.5" cy="48.5" r="2.2" fill={INK} stroke="none" />
      </g>
      <Brows y={40} tilt={2} />
      <Smile y={58} w={12} open />
      {/* Round cheek blushes */}
      <g fill="#C98559" stroke="none" opacity="0.7">
        <ellipse cx="35" cy="56" rx="3.6" ry="2.2" />
        <ellipse cx="65" cy="56" rx="3.6" ry="2.2" />
      </g>
    </g>
  );
}
