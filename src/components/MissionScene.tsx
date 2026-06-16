import type { Subject } from '../types';

/**
 * Decorative subject vignette for mission intro cards — a wide comic strip in
 * the house style (flat fills, ink outlines). One reusable scene per subject
 * keeps 30+ missions illustrated without 30 bespoke drawings; bespoke AI art
 * can replace these per-mission later (STYLE_GUIDE §7).
 */

const INK = '#3A3027';

export function MissionScene({ subject }: { subject: Subject }) {
  return (
    <svg
      viewBox="0 0 600 120"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="mission-scene"
    >
      <rect x="0" y="0" width="600" height="120" fill="#FDF3DE" />
      <rect x="0" y="96" width="600" height="24" fill="#F2E2BC" />
      <Scene subject={subject} />
    </svg>
  );
}

function Scene({ subject }: { subject: Subject }) {
  switch (subject) {
    case 'math': return <MathScene />;
    case 'science': return <ScienceScene />;
    case 'reading': return <ReadingScene />;
    case 'geography': return <GeoScene />;
    case 'coding': return <CodingScene />;
    case 'history': return <HistoryScene />;
    case 'social-studies': return <SocialScene />;
  }
}

function MathScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Ruler */}
      <rect x="60" y="58" width="170" height="30" rx="4" fill="#F2D26C" />
      <g strokeWidth="2">
        {[80, 100, 120, 140, 160, 180, 200].map((x) => (
          <line key={x} x1={x} y1="58" x2={x} y2={x % 40 === 0 ? 74 : 68} />
        ))}
      </g>
      {/* Floating numbers */}
      <g fill="#D77A52" stroke="none" fontFamily="Quicksand, sans-serif" fontWeight="800">
        <text x="280" y="56" fontSize="38">7</text>
        <text x="330" y="84" fontSize="30" fill="#4DA89E">×</text>
        <text x="372" y="60" fontSize="42" fill="#A87CB5">3</text>
        <text x="428" y="82" fontSize="34" fill="#3A3027">=</text>
        <text x="470" y="66" fontSize="46" fill="#B6543E">?</text>
      </g>
      {/* Pencil */}
      <g transform="rotate(-18 530 70)">
        <rect x="510" y="64" width="56" height="12" rx="2" fill="#E8B547" />
        <polygon points="566,64 580,70 566,76" fill="#F3CFA9" />
        <polygon points="576,67.5 580,70 576,72.5" fill={INK} stroke="none" />
      </g>
    </g>
  );
}

function ScienceScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Flask */}
      <path d="M 110 38 l 0 24 l -22 34 a 8 8 0 0 0 7 12 l 50 0 a 8 8 0 0 0 7 -12 l -22 -34 l 0 -24 z" fill="#D8ECF7" />
      <path d="M 95 78 l 50 0 a 60 60 0 0 1 7 18 a 8 8 0 0 1 -7 12 l -50 0 a 8 8 0 0 1 -7 -12 a 60 60 0 0 1 7 -18 z" fill="#8FCBB5" stroke="none" />
      <line x1="104" y1="38" x2="136" y2="38" strokeWidth="3" />
      {/* Bubbles */}
      <g fill="#FFFFFF">
        <circle cx="112" cy="86" r="4" /><circle cx="128" cy="94" r="3" /><circle cx="120" cy="74" r="2.6" />
      </g>
      {/* Leaf */}
      <path d="M 240 86 q 4 -38 42 -44 q -2 40 -36 46 q 18 -22 28 -32" fill="#7FAE5C" />
      {/* Ladybug */}
      <g>
        <circle cx="360" cy="80" r="16" fill="#D52B1E" />
        <circle cx="360" cy="66" r="7" fill={INK} stroke="none" />
        <line x1="360" y1="64" x2="360" y2="96" />
        <g fill={INK} stroke="none">
          <circle cx="351" cy="78" r="3" /><circle cx="369" cy="78" r="3" /><circle cx="356" cy="88" r="3" /><circle cx="365" cy="88" r="3" />
        </g>
      </g>
      {/* Magnifier */}
      <g>
        <circle cx="470" cy="64" r="22" fill="#D8ECF7" />
        <path d="M 452 52 L 480 76" stroke="#FFFFFF" strokeWidth="5" opacity="0.7" />
        <line x1="486" y1="80" x2="508" y2="100" strokeWidth="8" strokeLinecap="round" />
      </g>
    </g>
  );
}

function ReadingScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Open book */}
      <path d="M 160 50 q 60 -16 120 0 l 0 48 q -60 -14 -120 0 z" fill="#FFF9EE" />
      <path d="M 280 50 q 60 -16 120 0 l 0 48 q -60 -14 -120 0 z" fill="#FFF9EE" />
      <line x1="280" y1="46" x2="280" y2="100" strokeWidth="3" />
      <g stroke="#B8AE99" strokeWidth="2">
        <line x1="180" y1="60" x2="262" y2="56" /><line x1="180" y1="70" x2="262" y2="66" />
        <line x1="180" y1="80" x2="262" y2="76" /><line x1="298" y1="56" x2="380" y2="60" />
        <line x1="298" y1="66" x2="380" y2="70" /><line x1="298" y1="76" x2="380" y2="80" />
      </g>
      {/* Floating letters */}
      <g fill="#A87CB5" stroke="none" fontFamily="Quicksand, sans-serif" fontWeight="800">
        <text x="84" y="58" fontSize="34">A</text>
        <text x="118" y="84" fontSize="26" fill="#4DA89E">b</text>
        <text x="436" y="62" fontSize="32" fill="#D77A52">C</text>
        <text x="478" y="88" fontSize="26" fill="#E8B547">z</text>
        <text x="512" y="58" fontSize="28" fill="#7FAE5C">?</text>
      </g>
    </g>
  );
}

function GeoScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Folded map */}
      <path d="M 120 40 L 200 52 L 280 40 L 360 52 L 360 96 L 280 84 L 200 96 L 120 84 Z" fill="#D8ECF7" />
      <line x1="200" y1="52" x2="200" y2="96" strokeWidth="2" opacity="0.5" />
      <line x1="280" y1="40" x2="280" y2="84" strokeWidth="2" opacity="0.5" />
      {/* Route on the map */}
      <path d="M 145 76 q 30 -22 70 -8 q 40 14 90 -12" fill="none" stroke="#B6543E" strokeWidth="3" strokeDasharray="7 6" />
      <circle cx="145" cy="76" r="5" fill="#4DA89E" />
      {/* Pin */}
      <path d="M 305 38 a 12 12 0 0 1 12 12 q 0 10 -12 22 q -12 -12 -12 -22 a 12 12 0 0 1 12 -12 z" fill="#D52B1E" />
      <circle cx="305" cy="50" r="4.5" fill="#FFF9EE" />
      {/* Globe */}
      <g>
        <circle cx="460" cy="68" r="28" fill="#7FB8DC" />
        <path d="M 446 48 q 14 6 10 20 q -4 12 8 18 q -16 4 -24 -10 q -6 -16 6 -28 z" fill="#7FAE5C" stroke="none" />
        <ellipse cx="460" cy="68" rx="28" ry="10" fill="none" strokeWidth="1.8" opacity="0.5" />
        <line x1="460" y1="40" x2="460" y2="96" strokeWidth="1.8" opacity="0.5" />
      </g>
    </g>
  );
}

function CodingScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Friendly robot */}
      <rect x="120" y="44" width="56" height="44" rx="8" fill="#9DB3C8" />
      <rect x="132" y="56" width="12" height="12" rx="3" fill="#F2D26C" />
      <rect x="152" y="56" width="12" height="12" rx="3" fill="#F2D26C" />
      <path d="M 136 78 q 12 8 24 0" fill="none" strokeLinecap="round" />
      <line x1="148" y1="44" x2="148" y2="32" />
      <circle cx="148" cy="28" r="4" fill="#D52B1E" />
      <rect x="128" y="88" width="40" height="10" rx="3" fill="#7E8A91" />
      {/* Command chips */}
      <g fontFamily="Quicksand, sans-serif" fontWeight="800" fontSize="22">
        <rect x="240" y="50" width="52" height="36" rx="8" fill="#4DA89E" />
        <text x="266" y="75" textAnchor="middle" fill="#FFF9EE" stroke="none">↑</text>
        <rect x="304" y="50" width="52" height="36" rx="8" fill="#D77A52" />
        <text x="330" y="75" textAnchor="middle" fill="#FFF9EE" stroke="none">↻</text>
        <rect x="368" y="50" width="52" height="36" rx="8" fill="#A87CB5" />
        <text x="394" y="75" textAnchor="middle" fill="#FFF9EE" stroke="none">↑</text>
        <rect x="432" y="50" width="74" height="36" rx="8" fill="#E8B547" />
        <text x="469" y="74" textAnchor="middle" fontSize="16" fill={INK} stroke="none">RUN ▶</text>
      </g>
    </g>
  );
}

function HistoryScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Scroll */}
      <rect x="110" y="44" width="120" height="52" fill="#FCEFD2" />
      <circle cx="110" cy="70" r="12" fill="#E8C490" />
      <circle cx="230" cy="70" r="12" fill="#E8C490" />
      <g stroke="#B8AE99" strokeWidth="2">
        <line x1="130" y1="58" x2="212" y2="58" /><line x1="130" y1="70" x2="212" y2="70" /><line x1="130" y1="82" x2="200" y2="82" />
      </g>
      {/* Trophy */}
      <g>
        <path d="M 320 44 l 44 0 l -4 28 a 18 18 0 0 1 -36 0 z" fill="#F2D26C" />
        <path d="M 320 48 q -16 2 -12 16 q 3 10 14 10" fill="none" />
        <path d="M 364 48 q 16 2 12 16 q -3 10 -14 10" fill="none" />
        <rect x="334" y="86" width="16" height="8" fill="#E8B547" />
        <rect x="326" y="94" width="32" height="7" rx="2" fill="#C99A2E" />
      </g>
      {/* Old clock */}
      <g>
        <circle cx="470" cy="68" r="26" fill="#FFF9EE" />
        <circle cx="470" cy="68" r="20" fill="#FFFFFF" strokeWidth="1.6" />
        <line x1="470" y1="68" x2="470" y2="54" strokeWidth="3" strokeLinecap="round" />
        <line x1="470" y1="68" x2="481" y2="74" strokeWidth="3" strokeLinecap="round" />
        <circle cx="470" cy="40" r="4" fill="#E8B547" />
      </g>
    </g>
  );
}

function SocialScene() {
  return (
    <g stroke={INK} strokeWidth="2.6">
      {/* Canadian flag */}
      <line x1="120" y1="36" x2="120" y2="100" strokeWidth="3.4" />
      <rect x="122" y="40" width="84" height="44" fill="#FFFFFF" />
      <rect x="122" y="40" width="21" height="44" fill="#D52B1E" stroke="none" />
      <rect x="185" y="40" width="21" height="44" fill="#D52B1E" stroke="none" />
      <rect x="122" y="40" width="84" height="44" fill="none" />
      <path d="M 164 48 l 2.4 4.4 4 -1.8 -1.4 4.8 4.4 0.8 -6.2 5.2 1.6 5.8 -4.8 -3.2 -4.8 3.2 1.6 -5.8 -6.2 -5.2 4.4 -0.8 -1.4 -4.8 4 1.8 z" fill="#D52B1E" stroke="none" />
      {/* Parliament silhouette */}
      <g fill="#8FA7B8">
        <rect x="300" y="62" width="120" height="38" />
        <rect x="348" y="34" width="24" height="66" />
        <polygon points="348,34 372,34 360,16" />
        <rect x="310" y="50" width="16" height="50" />
        <rect x="394" y="50" width="16" height="50" />
      </g>
      {/* Ballot box */}
      <g>
        <rect x="470" y="58" width="64" height="42" rx="4" fill="#4DA89E" />
        <rect x="492" y="54" width="20" height="6" rx="2" fill={INK} stroke="none" />
        <path d="M 488 40 l 22 0 l 0 16 l -22 0 z" fill="#FFF9EE" transform="rotate(-12 499 48)" />
      </g>
    </g>
  );
}
