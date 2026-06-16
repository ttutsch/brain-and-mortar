import type { TripImage as TripImageData, PlaceholderIcon } from '../data/trips';

interface Props {
  image: TripImageData;
}

/**
 * Renders a trip scene image. If a real `url` is provided, an <img> is used.
 * Otherwise we render a stylized SVG keyed to the `placeholderIcon` kind so
 * the layout reads as a "photo card" even before AI illustrations land.
 * See STYLE_GUIDE.md for trip-image specs and sourcing.
 */
export function TripImage({ image }: Props) {
  return (
    <figure className="trip-image">
      {image.url ? (
        <img src={image.url} alt={image.alt} className="trip-image-real" />
      ) : (
        <PlaceholderSvg kind={image.placeholderIcon ?? 'building'} alt={image.alt} />
      )}
      {image.caption && <figcaption className="trip-image-caption">{image.caption}</figcaption>}
    </figure>
  );
}

function PlaceholderSvg({ kind, alt }: { kind: PlaceholderIcon; alt: string }) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
      className="trip-image-placeholder"
    >
      <defs>
        <linearGradient id="ph-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E8F1F8" />
          <stop offset="100%" stopColor="#FBE9D2" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="180" fill="url(#ph-sky)" />
      {/* Soft warm sun */}
      <circle cx="270" cy="36" r="22" fill="#F2D26C" opacity="0.85" />
      <circle cx="270" cy="36" r="32" fill="#F2D26C" opacity="0.22" />
      {/* Distant rolling ground */}
      <path d="M 0 140 Q 80 120 160 130 T 320 138 L 320 180 L 0 180 Z" fill="#B5CDA0" />
      {kind === 'building'  && <BuildingMotif />}
      {kind === 'water'     && <WaterMotif />}
      {kind === 'market'    && <MarketMotif />}
      {kind === 'monument'  && <MonumentMotif />}
      {kind === 'skyline'   && <SkylineMotif />}
      {kind === 'bridge'    && <BridgeMotif />}
      {kind === 'mountain'  && <MountainMotif />}
      {kind === 'transit'   && <TransitMotif />}
    </svg>
  );
}

/* ---------- Individual placeholder motifs ---------- */

function BuildingMotif() {
  return (
    <g>
      {/* Main central building with peaked roof — evokes a parliament/civic building */}
      <rect x="120" y="78" width="80" height="62" fill="#FBE9D2" stroke="#8B4F37" strokeWidth="2" />
      <polygon points="120,78 200,78 160,52" fill="#5E8771" stroke="#8B4F37" strokeWidth="2" />
      <rect x="155" y="40" width="10" height="20" fill="#8B4F37" />
      <rect x="155" y="30" width="10" height="14" fill="#D77A52" />
      {/* Windows */}
      <g fill="#7BAEDB" stroke="#8B4F37" strokeWidth="1">
        <rect x="132" y="90" width="14" height="20" />
        <rect x="156" y="90" width="14" height="20" />
        <rect x="180" y="90" width="14" height="20" />
      </g>
      {/* Side wings */}
      <rect x="80" y="100" width="40" height="40" fill="#FBE9D2" stroke="#8B4F37" strokeWidth="2" />
      <rect x="200" y="100" width="40" height="40" fill="#FBE9D2" stroke="#8B4F37" strokeWidth="2" />
    </g>
  );
}

function WaterMotif() {
  return (
    <g>
      {/* Banks */}
      <path d="M 0 100 Q 60 96 110 102 L 110 140 L 0 140 Z" fill="#A8C68F" />
      <path d="M 210 102 Q 260 98 320 100 L 320 140 L 210 140 Z" fill="#A8C68F" />
      {/* Water */}
      <rect x="100" y="100" width="120" height="40" fill="#7BAEDB" />
      {/* Ripples */}
      <g stroke="#5E8FB0" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M 110 112 q 8 -4 16 0 q 8 4 16 0 q 8 -4 16 0 q 8 4 16 0 q 8 -4 16 0 q 8 4 16 0" />
        <path d="M 110 124 q 8 -4 16 0 q 8 4 16 0 q 8 -4 16 0 q 8 4 16 0 q 8 -4 16 0 q 8 4 16 0" />
      </g>
      {/* Small boat */}
      <path d="M 138 102 L 178 102 L 170 110 L 146 110 Z" fill="#D77A52" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="156" y="92" width="3" height="12" fill="#8B4F37" />
      <polygon points="159,92 168,100 159,100" fill="#FFFDF8" stroke="#8B4F37" strokeWidth="1" />
    </g>
  );
}

function MarketMotif() {
  return (
    <g>
      {/* Cobblestone foreground */}
      <rect x="0" y="138" width="320" height="42" fill="#C9B89B" />
      {/* Awnings - striped */}
      <Awning x={50}  color1="#D77A52" color2="#FFFDF8" />
      <Awning x={130} color1="#4DA89E" color2="#FFFDF8" />
      <Awning x={210} color1="#E8B547" color2="#FFFDF8" />
      {/* Crates beneath */}
      <g fill="#A87B4F" stroke="#8B4F37" strokeWidth="1.5">
        <rect x="60"  y="120" width="40" height="18" />
        <rect x="140" y="120" width="40" height="18" />
        <rect x="220" y="120" width="40" height="18" />
      </g>
    </g>
  );
}

function Awning({ x, color1, color2 }: { x: number; color1: string; color2: string }) {
  return (
    <g>
      <path d={`M ${x} 100 L ${x + 60} 100 L ${x + 70} 120 L ${x - 10} 120 Z`} fill={color1} stroke="#8B4F37" strokeWidth="1.5" />
      <g fill={color2}>
        <rect x={x - 6} y="106" width="6" height="14" />
        <rect x={x + 12} y="106" width="6" height="14" />
        <rect x={x + 30} y="106" width="6" height="14" />
        <rect x={x + 48} y="106" width="6" height="14" />
        <rect x={x + 64} y="106" width="6" height="14" />
      </g>
    </g>
  );
}

function MonumentMotif() {
  return (
    <g>
      {/* Two stylized totem-like columns */}
      <Totem x={110} />
      <Totem x={195} />
      {/* Floor */}
      <rect x="0" y="140" width="320" height="40" fill="#D9C8A6" />
    </g>
  );
}

function Totem({ x }: { x: number }) {
  return (
    <g stroke="#5C3F26" strokeWidth="1.5">
      <rect x={x - 12} y="40" width="24" height="100" fill="#A05A2E" />
      {/* Face shapes */}
      <ellipse cx={x} cy="58" rx="9" ry="8" fill="#FBE9D2" />
      <ellipse cx={x - 3} cy="58" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      <ellipse cx={x + 3} cy="58" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      <ellipse cx={x} cy="86" rx="9" ry="8" fill="#E8B547" />
      <ellipse cx={x - 3} cy="86" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      <ellipse cx={x + 3} cy="86" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      <ellipse cx={x} cy="114" rx="9" ry="8" fill="#7BB85F" />
      <ellipse cx={x - 3} cy="114" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      <ellipse cx={x + 3} cy="114" rx="1.5" ry="1.5" fill="#2A2522" stroke="none" />
      {/* Wings */}
      <path d={`M ${x - 12} 64 L ${x - 30} 72 L ${x - 12} 76 Z`} fill="#A05A2E" />
      <path d={`M ${x + 12} 64 L ${x + 30} 72 L ${x + 12} 76 Z`} fill="#A05A2E" />
    </g>
  );
}

function SkylineMotif() {
  return (
    <g>
      {/* Generic city skyline silhouette */}
      <g fill="#5E8771" stroke="#2D4A6B" strokeWidth="1">
        <rect x="20"  y="100" width="20" height="40" />
        <rect x="45"  y="80"  width="22" height="60" />
        <rect x="72"  y="92"  width="18" height="48" />
        <rect x="95"  y="70"  width="24" height="70" />
        <rect x="125" y="55"  width="16" height="85" />
        <rect x="145" y="78"  width="22" height="62" />
        <rect x="172" y="90"  width="20" height="50" />
        <rect x="197" y="64"  width="26" height="76" />
        <rect x="228" y="86"  width="20" height="54" />
        <rect x="252" y="74"  width="22" height="66" />
        <rect x="278" y="98"  width="22" height="42" />
      </g>
      {/* Tower */}
      <rect x="129" y="34" width="8" height="22" fill="#D77A52" />
      <circle cx="133" cy="32" r="4" fill="#D77A52" />
      {/* Lit windows */}
      <g fill="#F2D26C">
        <rect x="50"  y="92"  width="4" height="5" />
        <rect x="58"  y="100" width="4" height="5" />
        <rect x="100" y="84"  width="4" height="5" />
        <rect x="108" y="98"  width="4" height="5" />
        <rect x="150" y="92"  width="4" height="5" />
        <rect x="206" y="80"  width="4" height="5" />
        <rect x="214" y="100" width="4" height="5" />
        <rect x="258" y="90"  width="4" height="5" />
      </g>
    </g>
  );
}

function BridgeMotif() {
  return (
    <g>
      {/* Ground */}
      <rect x="0" y="138" width="320" height="42" fill="#A8C68F" />
      {/* Road */}
      <rect x="0" y="120" width="320" height="20" fill="#5C544E" />
      <g stroke="#FFFDF8" strokeWidth="2" strokeDasharray="10 8">
        <line x1="0" y1="130" x2="320" y2="130" />
      </g>
      {/* Car */}
      <rect x="140" y="106" width="40" height="14" fill="#D77A52" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="148" y="98"  width="24" height="10" fill="#FBE9D2" stroke="#8B4F37" strokeWidth="1.5" />
      <circle cx="148" cy="120" r="4" fill="#2A2522" />
      <circle cx="172" cy="120" r="4" fill="#2A2522" />
      {/* Field details */}
      <g fill="#7BB85F">
        <circle cx="40" cy="150" r="6" />
        <circle cx="280" cy="156" r="7" />
      </g>
    </g>
  );
}

function MountainMotif() {
  return (
    <g>
      {/* Distant mountains */}
      <polygon points="0,120 60,60 110,110 170,40 230,110 280,70 320,120 320,180 0,180" fill="#5E8771" stroke="#2D4A6B" strokeWidth="1.5" />
      {/* Snow caps */}
      <polygon points="160,52 174,68 145,68" fill="#FFFDF8" />
      <polygon points="60,60 72,76 48,76" fill="#FFFDF8" />
      <polygon points="280,70 294,84 266,84" fill="#FFFDF8" />
      {/* Foreground trees */}
      <g fill="#3D6B4D">
        <polygon points="40,140 50,120 60,140" />
        <polygon points="260,144 270,124 280,144" />
      </g>
    </g>
  );
}

function TransitMotif() {
  return (
    <g>
      {/* Platform */}
      <rect x="0" y="130" width="320" height="20" fill="#C9B89B" />
      <rect x="0" y="148" width="320" height="6" fill="#A07F58" />
      {/* Train */}
      <rect x="40" y="80" width="240" height="50" rx="8" fill="#D77A52" stroke="#8B4F37" strokeWidth="2" />
      <rect x="50" y="92" width="40" height="18" fill="#E8F1F8" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="100" y="92" width="40" height="18" fill="#E8F1F8" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="150" y="92" width="40" height="18" fill="#E8F1F8" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="200" y="92" width="40" height="18" fill="#E8F1F8" stroke="#8B4F37" strokeWidth="1.5" />
      <rect x="62" y="118" width="14" height="14" fill="#2A2522" />
      <rect x="248" y="118" width="14" height="14" fill="#2A2522" />
    </g>
  );
}
