/**
 * The hero house scene — viewBox 1000×560, drawn in a graphic-novel style
 * inspired by Raina Telgemeier's books (Smile, Sisters, Guts): clean uniform
 * ink outlines, flat fills with simple cel shading (flat darker shapes, no
 * gradients), believable suburban architecture, warm friendly palette.
 *
 * Visual state is driven entirely by props:
 *  - `completed`: house item ids → damage layers hide / upgrade art appears
 *  - `trampolineUnlocked`: the Act I coda (Ottawa trip done)
 *  - `cosmetics`: coin-purchased extras render in their spots
 *
 * Ambient animation classes (.hs-*) are styled in components.css and disabled
 * automatically under prefers-reduced-motion.
 */

const INK = '#3A3027';

interface Props {
  completed: Set<string>;
  trampolineUnlocked: boolean;
  cosmetics: string[];
}

export function HouseSvg({ completed, trampolineUnlocked, cosmetics }: Props) {
  const livingRepaired = completed.has('repair.living');
  const yardRepaired = completed.has('repair.yard');
  const basementRepaired = completed.has('repair.basement');
  const garageRepaired = completed.has('repair.garage');
  const poolBuilt = completed.has('upgrade.pool');
  const observatoryBuilt = completed.has('upgrade.observatory');
  const porchRedone = completed.has('upgrade.porch');
  const workshopBuilt = completed.has('upgrade.workshop');
  const kitchenBuilt = completed.has('upgrade.kitchen');
  const bedroomsRedone = completed.has('upgrade.bedrooms');
  const basementRec = completed.has('upgrade.basement');
  const familyroomRedone = completed.has('upgrade.familyroom');
  const has = (id: string) => cosmetics.includes(id);
  const allRepaired = livingRepaired && yardRepaired && basementRepaired && garageRepaired;

  return (
    <svg
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="The T Family home — a two-storey fixer-upper with garage, yard, and big oak tree, drawn comic-book style."
      className="house-svg"
    >
      {/* ====== SKY (flat, comic) ====== */}
      <rect x="0" y="0" width="1000" height="420" fill="#C9E4F0" />

      {/* Sun — flat disc with flat highlight */}
      <circle cx="884" cy="78" r="34" fill="#FBD86B" stroke={INK} strokeWidth="3" />
      <circle cx="874" cy="68" r="10" fill="#FDE79C" />

      {/* Clouds — flat white puffs with light-blue flat underside */}
      <g className="hs-cloud hs-cloud-a">
        <g stroke={INK} strokeWidth="2.5">
          <path d="M 132 86 a 18 18 0 0 1 24 -18 a 22 22 0 0 1 42 -4 a 16 16 0 0 1 20 22 z" fill="#FFFFFF" />
        </g>
        <path d="M 136 84 h 76 a 14 14 0 0 1 -6 2 h -64 z" fill="#D8ECF5" />
      </g>
      <g className="hs-cloud hs-cloud-b">
        <g stroke={INK} strokeWidth="2.5">
          <path d="M 500 52 a 15 15 0 0 1 20 -15 a 18 18 0 0 1 35 -3 a 13 13 0 0 1 16 18 z" fill="#FFFFFF" />
        </g>
      </g>
      <g className="hs-cloud hs-cloud-c">
        <g stroke={INK} strokeWidth="2.5">
          <path d="M 712 122 a 13 13 0 0 1 18 -13 a 16 16 0 0 1 30 -2 a 11 11 0 0 1 14 15 z" fill="#FFFFFF" />
        </g>
      </g>

      {/* Birds — simple comic "m" strokes */}
      <g className="hs-birds" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M 420 96 q 7 -8 14 0 q 7 -8 14 0" />
        <path d="M 472 76 q 6 -7 12 0 q 6 -7 12 0" />
      </g>

      {/* Distant flat hedge line for depth */}
      <path
        d="M 0 372 q 40 -18 90 -10 q 60 8 110 -4 q 70 -14 150 -2 q 90 12 170 0 q 80 -12 160 0 q 90 12 170 2 q 80 -10 150 4 L 1000 420 L 0 420 Z"
        fill="#8FBA74" stroke={INK} strokeWidth="2.5"
      />

      {/* ====== GROUND (flat lawn + cel patches) ====== */}
      <rect x="0" y="400" width="1000" height="160" fill="#A3C97E" />
      <line x1="0" y1="400" x2="1000" y2="400" stroke={INK} strokeWidth="2.5" />
      <g fill="#8FB868">
        <ellipse cx="180" cy="500" rx="90" ry="14" />
        <ellipse cx="700" cy="540" rx="120" ry="16" />
        <ellipse cx="920" cy="470" rx="60" ry="10" />
      </g>

      {/* Front walk — concrete with seams */}
      <path d="M 488 446 L 534 446 L 564 560 L 458 560 Z" fill="#DCD6C8" stroke={INK} strokeWidth="2.5" />
      <g stroke="#B8B0A0" strokeWidth="2">
        <line x1="482" y1="478" x2="546" y2="478" />
        <line x1="475" y1="512" x2="553" y2="512" />
        <line x1="467" y1="544" x2="561" y2="544" />
      </g>

      {/* ====== BIG OAK (far left) ====== */}
      <g>
        <path
          d="M 60 432 C 56 392 60 364 64 332 C 66 318 74 318 76 332 C 80 364 86 392 82 432 Z"
          fill="#8A6248" stroke={INK} strokeWidth="3"
        />
        <path d="M 66 352 C 56 340 44 334 36 326" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 36 326 C 44 332 56 340 66 350" stroke="#8A6248" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 74 340 C 84 328 98 322 106 316" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 106 316 C 98 322 86 330 76 340" stroke="#8A6248" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Canopy — scalloped comic blobs, flat with one shade layer */}
        <g className="hs-foliage">
          <path
            d="M 18 300 a 30 30 0 0 1 24 -38 a 34 34 0 0 1 36 -26 a 36 36 0 0 1 46 4 a 30 30 0 0 1 32 22 a 26 26 0 0 1 -6 44 a 30 30 0 0 1 -34 22 a 36 36 0 0 1 -52 -2 a 32 32 0 0 1 -46 -26 z"
            fill="#7FAE5C" stroke={INK} strokeWidth="3"
          />
          <path
            d="M 60 238 a 34 34 0 0 1 36 -26 a 36 36 0 0 1 46 4 a 30 30 0 0 1 32 22 a 26 26 0 0 1 -8 40 q -60 14 -106 -40 z"
            fill="#92C06C"
          />
        </g>
        {/* Tree swing cosmetic */}
        {has('cos.tree_swing') && (
          <g className="hs-swing">
            <line x1="96" y1="316" x2="96" y2="394" stroke={INK} strokeWidth="2.6" />
            <line x1="126" y1="314" x2="126" y2="394" stroke={INK} strokeWidth="2.6" />
            <rect x="86" y="394" width="50" height="9" rx="3" fill="#C99155" stroke={INK} strokeWidth="2.5" />
          </g>
        )}
        {/* Bird feeder cosmetic */}
        {has('cos.bird_feeder') && (
          <g>
            <line x1="156" y1="322" x2="156" y2="352" stroke={INK} strokeWidth="2.6" />
            <rect x="142" y="352" width="28" height="17" rx="3" fill="#D77A52" stroke={INK} strokeWidth="2.5" />
            <polygon points="138,352 174,352 156,336" fill="#B85F3D" stroke={INK} strokeWidth="2.5" />
            <circle cx="149" cy="376" r="3.6" fill="#E8B547" stroke={INK} strokeWidth="1.6" />
            <circle cx="162" cy="378" r="3.2" fill="#9DB3C8" stroke={INK} strokeWidth="1.6" />
          </g>
        )}
      </g>

      {/* ====== GARAGE (left wing) ====== */}
      <g>
        {/* Walls */}
        <rect x="140" y="310" width="160" height="132" fill="#F6E3B2" stroke={INK} strokeWidth="3" />
        {/* Cel shade band under the eave */}
        <rect x="140" y="310" width="160" height="14" fill="#E6CE94" />
        {/* Siding lines */}
        <g stroke="#D9BE82" strokeWidth="1.6">
          <line x1="140" y1="338" x2="300" y2="338" />
          <line x1="140" y1="360" x2="300" y2="360" />
          <line x1="140" y1="382" x2="300" y2="382" />
        </g>
        {/* Roof — flat with fascia trim */}
        <polygon points="128,310 312,310 220,246" fill="#C77E55" stroke={INK} strokeWidth="3" />
        <polygon points="148,304 292,304 220,254" fill="#AD6843" opacity="0.35" />
        <rect x="124" y="306" width="192" height="8" rx="3" fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />
        {/* Garage door — panelled */}
        <rect x="162" y="348" width="116" height="94" rx="3" fill={garageRepaired ? '#FFF9EE' : '#E8DCBE'} stroke={INK} strokeWidth="3" />
        <g stroke="#C8B894" strokeWidth="2">
          <line x1="166" y1="372" x2="274" y2="372" />
          <line x1="166" y1="396" x2="274" y2="396" />
          <line x1="166" y1="420" x2="274" y2="420" />
        </g>
        <circle cx="220" cy="432" r="3.4" fill={INK} />
        {!garageRepaired && (
          <g>
            {/* Crack + visibly crooked top edge */}
            <path d="M 198 350 L 208 374 L 200 398 L 212 422 L 204 442" stroke={INK} strokeWidth="2.6" fill="none" />
            <path d="M 162 352 L 278 358" stroke={INK} strokeWidth="2.2" opacity="0.5" />
            {/* Dent shadow */}
            <ellipse cx="246" cy="408" rx="16" ry="10" fill="#C8B894" opacity="0.8" />
          </g>
        )}
        {/* Workshop upgrade: lit side window + tools */}
        {workshopBuilt && (
          <g>
            <rect x="270" y="360" width="22" height="26" rx="2" fill="#FFE2A8" stroke={INK} strokeWidth="2.4" />
            <line x1="281" y1="360" x2="281" y2="386" stroke={INK} strokeWidth="1.6" />
            <g stroke={INK} strokeWidth="2" strokeLinecap="round">
              <line x1="152" y1="332" x2="160" y2="332" />
              <line x1="156" y1="328" x2="156" y2="340" />
            </g>
            <rect x="146" y="326" width="20" height="18" rx="2" fill="none" stroke={INK} strokeWidth="2" />
          </g>
        )}

        {/* Driveway */}
        <path d="M 152 442 L 288 442 L 330 560 L 92 560 Z" fill="#CFC9BB" stroke={INK} strokeWidth="2.5" />
        <line x1="220" y1="442" x2="216" y2="560" stroke="#B8B0A0" strokeWidth="2" />
        {!garageRepaired && (
          <g stroke={INK} strokeWidth="2.6" fill="none">
            <path d="M 148 472 L 184 490 L 166 512 L 204 534 L 188 558" />
            <path d="M 252 462 L 234 494 L 260 522" />
            {/* Pothole */}
            <ellipse cx="142" cy="530" rx="14" ry="6" fill="#8F887B" stroke={INK} strokeWidth="2" />
          </g>
        )}
      </g>

      {/* ====== MAIN HOUSE ====== */}
      <g>
        {/* Foundation strip */}
        <rect x="292" y="430" width="338" height="14" fill="#CFC9BB" stroke={INK} strokeWidth="2.5" />
        {/* Body */}
        <rect x="296" y="218" width="330" height="214" fill="#F6E3B2" stroke={INK} strokeWidth="3.2" />
        {/* Cel shade: under-eave band + right-side shade */}
        <rect x="296" y="218" width="330" height="16" fill="#E6CE94" />
        <rect x="592" y="234" width="34" height="198" fill="#E6CE94" />
        {/* Siding lines */}
        <g stroke="#D9BE82" strokeWidth="1.6">
          <line x1="296" y1="250" x2="626" y2="250" />
          <line x1="296" y1="272" x2="626" y2="272" />
          <line x1="296" y1="294" x2="626" y2="294" />
          <line x1="296" y1="316" x2="626" y2="316" />
          <line x1="296" y1="352" x2="626" y2="352" />
          <line x1="296" y1="374" x2="626" y2="374" />
          <line x1="296" y1="396" x2="626" y2="396" />
          <line x1="296" y1="418" x2="626" y2="418" />
        </g>
        {/* Storey band */}
        <rect x="290" y="330" width="342" height="9" rx="3" fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />

        {/* Roof — big friendly gable with white fascia */}
        <polygon points="280,218 642,218 461,96" fill="#C77E55" stroke={INK} strokeWidth="3.2" />
        {/* Flat roof shading (left lit / right shaded) */}
        <polygon points="461,104 634,214 560,214 461,148" fill="#AD6843" opacity="0.4" />
        <rect x="272" y="212" width="378" height="9" rx="4" fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />
        {/* Cracked shingle hint */}
        <path d="M 392 178 L 402 166 L 396 178 L 404 172" stroke={INK} strokeWidth="2" fill="none" opacity="0.7" />

        {/* Dormer */}
        <rect x="428" y="146" width="66" height="56" fill="#F6E3B2" stroke={INK} strokeWidth="3" />
        <polygon points="420,146 502,146 461,114" fill="#C77E55" stroke={INK} strokeWidth="3" />
        <rect x="440" y="156" width="42" height="38" rx="2" fill="#BBDCE8" stroke={INK} strokeWidth="2.5" />
        <line x1="461" y1="156" x2="461" y2="194" stroke={INK} strokeWidth="2" />
        <path d="M 444 188 L 472 160" stroke="#FFFFFF" strokeWidth="5" opacity="0.7" />

        {/* Chimney + smoke */}
        <rect x="556" y="118" width="36" height="72" fill="#B0644A" stroke={INK} strokeWidth="3" />
        <g stroke="#92503A" strokeWidth="1.6">
          <line x1="556" y1="136" x2="592" y2="136" />
          <line x1="556" y1="154" x2="592" y2="154" />
          <line x1="556" y1="172" x2="592" y2="172" />
        </g>
        <rect x="550" y="108" width="48" height="13" rx="3" fill="#8F887B" stroke={INK} strokeWidth="2.5" />
        <g className="hs-smoke" fill="#FFFFFF" stroke={INK} strokeWidth="1.6">
          <circle cx="576" cy="94" r="8" opacity="0.85" />
          <circle cx="585" cy="76" r="10" opacity="0.6" />
          <circle cx="574" cy="56" r="12" opacity="0.4" />
        </g>

        {/* Upper windows — white trim, flat glass, diagonal shine */}
        <ComicWindow x={322} y={244} w={56} h={62} />
        <ComicWindow x={548} y={244} w={56} h={62} shaded />
        {bedroomsRedone && (
          <g>
            {/* Izzy's window: mustard curtains + art poster */}
            <path d="M 324 246 q 7 28 0 58" stroke="#E8B547" strokeWidth="5" fill="none" />
            <path d="M 376 246 q -7 28 0 58" stroke="#E8B547" strokeWidth="5" fill="none" />
            <rect x={342} y={258} width={16} height={20} rx={1} fill="#F08572" stroke={INK} strokeWidth="1.4" />
            {/* Tessa's window: plum curtains + string lights */}
            <path d="M 550 246 q 7 28 0 58" stroke="#A87CB5" strokeWidth="5" fill="none" />
            <path d="M 602 246 q -7 28 0 58" stroke="#A87CB5" strokeWidth="5" fill="none" />
            <g fill="#F2D26C" stroke={INK} strokeWidth="0.8">
              <circle cx="560" cy="252" r="2.2" /><circle cx="572" cy="255" r="2.2" />
              <circle cx="584" cy="253" r="2.2" /><circle cx="595" cy="256" r="2.2" />
            </g>
          </g>
        )}

        {/* Lower-left kitchen window with flower box */}
        <ComicWindow x={316} y={352} w={66} h={58} />
        {kitchenBuilt && (
          <g>
            <rect x={318} y={354} width={62} height={54} rx={2} fill="#FFE2A8" opacity="0.6" />
            {/* Island silhouette + pendant */}
            <rect x={330} y={390} width={38} height={12} rx={2} fill="#9C7350" stroke={INK} strokeWidth="1.8" />
            <line x1="349" y1="356" x2="349" y2="368" stroke={INK} strokeWidth="1.6" />
            <path d="M 343 368 h 12 l -2 6 h -8 z" fill="#E8B547" stroke={INK} strokeWidth="1.6" />
          </g>
        )}
        <rect x={312} y={410} width={74} height={12} rx={3} fill="#B6543E" stroke={INK} strokeWidth="2.5" />
        {yardRepaired && (
          <g>
            <ComicFlower x={324} y={406} color="#F08572" />
            <ComicFlower x={348} y={404} color="#E8B547" />
            <ComicFlower x={372} y={406} color="#C9B0E8" />
          </g>
        )}

        {/* Living-room bay window (lower right) */}
        <g>
          <rect x={528} y={344} width={82} height={68} rx={3} fill={livingRepaired ? '#BBDCE8' : '#A9B8BF'} stroke={INK} strokeWidth="3" />
          <line x1="555" y1="344" x2="555" y2="412" stroke={INK} strokeWidth="2.2" />
          <line x1="583" y1="344" x2="583" y2="412" stroke={INK} strokeWidth="2.2" />
          {livingRepaired ? (
            <g>
              {/* Warm lamp glow + curtains once cleaned */}
              <rect x={531} y={347} width={76} height={62} rx={2} fill="#FFE2A8" opacity="0.65" />
              <path d="M 531 347 q 8 30 0 62" stroke="#D77A52" strokeWidth="5" fill="none" />
              <path d="M 607 347 q -8 30 0 62" stroke="#D77A52" strokeWidth="5" fill="none" />
            </g>
          ) : (
            <g>
              {/* Cobwebs + grime streaks */}
              <path d="M 528 344 L 548 344 L 528 364 Z" fill="#7E8A91" opacity="0.5" />
              <path d="M 610 344 L 592 344 L 610 360 Z" fill="#7E8A91" opacity="0.5" />
              <path d="M 540 376 q 10 6 20 0" stroke="#7E8A91" strokeWidth="2" fill="none" />
            </g>
          )}
          <rect x={522} y={410} width={94} height={9} rx={3} fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />
          {familyroomRedone && (
            <g>
              {/* Striped awning over the bay window */}
              <path d="M 520 344 l 98 0 l -10 -16 l -78 0 z" fill="#4DA89E" stroke={INK} strokeWidth="2.4" />
              <g fill="#FFF9EE">
                <path d="M 532 342 l 8 0 l 6 -12 l -8 0 z" />
                <path d="M 556 342 l 8 0 l 6 -12 l -8 0 z" />
                <path d="M 580 342 l 8 0 l 6 -12 l -8 0 z" />
              </g>
              {/* Hanging plant */}
              <line x1="620" y1="332" x2="620" y2="348" stroke={INK} strokeWidth="1.8" />
              <path d="M 612 348 a 8 8 0 0 0 16 0 z" fill="#C25B33" stroke={INK} strokeWidth="1.8" />
              <g stroke="#6E8F54" strokeWidth="2" fill="none">
                <path d="M 614 350 q -4 6 -2 10" />
                <path d="M 626 350 q 4 6 2 10" />
              </g>
            </g>
          )}
        </g>

        {/* Porch — posts, roof, railing, steps */}
        <g>
          <rect x={436} y={334} width={94} height={9} rx={3} fill={porchRedone ? '#D77A52' : '#FFF9EE'} stroke={INK} strokeWidth="2.5" />
          <rect x={444} y={343} width={9} height={97} fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />
          <rect x={514} y={343} width={9} height={97} fill="#FFF9EE" stroke={INK} strokeWidth="2.5" />
          {/* Railing */}
          <line x1="436" y1="408" x2="446" y2="408" stroke={INK} strokeWidth="2.4" />
          <line x1="521" y1="408" x2="531" y2="408" stroke={INK} strokeWidth="2.4" />
          {/* Door */}
          <rect x="462" y="356" width="46" height="84" rx="3" fill="#B6543E" stroke={INK} strokeWidth="3" />
          <rect x="469" y="366" width="32" height="26" rx="2" fill="#D9744F" stroke={INK} strokeWidth="2" />
          <rect x="469" y="400" width="32" height="30" rx="2" fill="#D9744F" stroke={INK} strokeWidth="2" />
          <circle cx="500" cy="398" r="3" fill="#F2D26C" stroke={INK} strokeWidth="1.6" />
          {!livingRepaired && (
            <g stroke={INK} strokeWidth="2" fill="none" opacity="0.75">
              <path d="M 514 360 q 7 4 14 0 q 7 -4 14 0" />
              <path d="M 514 370 q 7 4 14 0 q 7 -4 14 0" />
            </g>
          )}
          {/* Steps */}
          <rect x="452" y="440" width="66" height="10" fill="#DCD6C8" stroke={INK} strokeWidth="2.4" />
          <rect x="446" y="450" width="78" height="10" fill="#CFC9BB" stroke={INK} strokeWidth="2.4" />
          {/* Broken step gap until living repair */}
          {!livingRepaired && (
            <path d="M 470 450 l 12 0 l -4 10 l -12 0 z" fill="#8F887B" stroke={INK} strokeWidth="2" />
          )}
          {/* Flag cosmetic — the official Flag of Canada artwork (public domain,
              Wikimedia Commons "Flag of Canada (Pantone).svg"), inlined and
              scaled. Native 9600×4800 units → 46×23 at the porch flagpole. */}
          {has('cos.flag') && (
            <g>
              <line x1="534" y1="282" x2="534" y2="338" stroke={INK} strokeWidth="3" />
              <circle cx="534" cy="280" r="3.4" fill="#F2D26C" stroke={INK} strokeWidth="1.6" />
              <g className="hs-flag">
                <g transform="translate(535, 284) scale(0.0047917)">
                  <path fill="#d52b1e" d="m0 0h2400l99 99h4602l99-99h2400v4800h-2400l-99-99h-4602l-99 99H0z" />
                  <path fill="#ffffff" d="m2400 0h4800v4800h-4800zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z" />
                </g>
                {/* Ink outline to match the comic style */}
                <rect x="535" y="284" width="46" height="23" fill="none" stroke={INK} strokeWidth="2" />
              </g>
            </g>
          )}
          {/* Cat cosmetic */}
          {has('cos.cat') && (
            <g stroke={INK} strokeWidth="2">
              <ellipse cx="434" cy="446" rx="14" ry="8" fill="#E8923F" />
              <circle cx="421" cy="437" r="6.5" fill="#E8923F" />
              <polygon points="416,433 418,425 422,432" fill="#E8923F" />
              <polygon points="424,432 428,425 429,433" fill="#E8923F" />
              <path className="hs-cat-tail" d="M 447 446 q 11 -4 9 -15" fill="none" strokeWidth="3.4" strokeLinecap="round" />
              <circle cx="419" cy="436" r="0.9" fill={INK} />
              <circle cx="424" cy="436" r="0.9" fill={INK} />
            </g>
          )}
        </g>

        {/* Basement window */}
        <rect x="380" y="416" width="48" height="22" rx="2" fill={basementRec ? '#C9B0E8' : basementRepaired ? '#FFE2A8' : '#3E4F60'} stroke={INK} strokeWidth="2.6" />
        {basementRec && (
          <g fill="#4DA89E" stroke={INK} strokeWidth="1.2">
            <rect x="386" y="428" width="10" height="6" rx="1.5" />
            <rect x="410" y="428" width="10" height="6" rx="1.5" />
          </g>
        )}
        <line x1="404" y1="416" x2="404" y2="438" stroke={INK} strokeWidth="1.8" />
        {!basementRepaired && (
          <g fill="#6FAEDB" stroke={INK} strokeWidth="1.4">
            <path d="M 390 444 q 2 6 0 8 q -3 -2 0 -8" />
            <path d="M 408 448 q 2 6 0 8 q -3 -2 0 -8" />
            <path d="M 420 442 q 2 6 0 8 q -3 -2 0 -8" />
          </g>
        )}

        {/* Peeling paint curls until living repair */}
        {!livingRepaired && (
          <g fill="#E8DCBE" stroke={INK} strokeWidth="1.6">
            <path d="M 310 262 q 7 -6 12 0 q -4 7 -12 0 z" />
            <path d="M 606 262 q 7 -6 12 0 q -4 7 -12 0 z" />
            <path d="M 412 300 q 7 -6 12 0 q -4 7 -12 0 z" />
            <path d="M 336 386 q 7 -6 12 0 q -4 7 -12 0 z" />
          </g>
        )}
      </g>

      {/* ====== YARD (right) ====== */}
      <g>
        {/* Picket fence */}
        <line x1="648" y1="414" x2="1000" y2="414" stroke={INK} strokeWidth="2.6" />
        <line x1="648" y1="398" x2="1000" y2="398" stroke={INK} strokeWidth="2.6" />
        {(() => {
          const posts = [656, 688, 720, 752, 784, 816, 848, 880, 912, 944, 976];
          return posts.map((x, i) => {
            if (!yardRepaired && i === 4) return null; // missing picket
            const broken = !yardRepaired && (i === 3 || i === 5);
            return (
              <g key={x} transform={broken ? `rotate(${i === 3 ? 10 : -8} ${x + 6} 416)` : undefined}>
                <rect
                  x={x} y={broken ? 396 : 384} width="12" height={broken ? 32 : 44}
                  fill={yardRepaired ? '#FFF9EE' : '#E8DCBE'}
                  stroke={INK} strokeWidth="2.4"
                />
                <polygon
                  points={`${x},${broken ? 396 : 384} ${x + 12},${broken ? 396 : 384} ${x + 6},${broken ? 387 : 374}`}
                  fill={yardRepaired ? '#FFF9EE' : '#E8DCBE'} stroke={INK} strokeWidth="2"
                />
              </g>
            );
          });
        })()}

        {/* Garden bed */}
        <path d="M 660 470 q 50 -18 100 0 q -50 18 -100 0 z" fill="#9C7350" stroke={INK} strokeWidth="2.6" />
        {yardRepaired ? (
          <g>
            <ComicFlower x={684} y={458} color="#F08572" />
            <ComicFlower x={710} y={452} color="#E8B547" />
            <ComicFlower x={736} y={458} color="#C9B0E8" />
          </g>
        ) : (
          <g stroke="#6E8F54" strokeWidth="2.4" fill="none">
            <path d="M 686 462 q -4 -16 0 -24 q 4 10 7 -4" />
            <path d="M 712 460 q -4 -18 0 -26 q 4 11 7 -4" />
            <path d="M 736 462 q -4 -16 0 -24 q 4 10 7 -4" />
          </g>
        )}

        {/* Weeds until yard repair — comic tufts */}
        {!yardRepaired && (
          <g stroke="#6E8F54" strokeWidth="2.4" fill="none">
            <path d="M 668 508 q -4 -18 0 -26 q 4 11 6 -4" />
            <path d="M 790 492 q -4 -20 0 -28 q 4 12 6 -4" />
            <path d="M 852 522 q -4 -18 0 -26 q 4 11 6 -4" />
            <path d="M 922 486 q -4 -20 0 -28 q 4 12 6 -4" />
            <path d="M 962 532 q -4 -18 0 -26 q 4 11 6 -4" />
            <path d="M 742 542 q -4 -18 0 -26 q 4 11 6 -4" />
            <path d="M 886 550 q -4 -16 0 -24 q 4 10 6 -3" />
          </g>
        )}

        {/* Gnome cosmetic */}
        {has('cos.gnome') && (
          <g stroke={INK} strokeWidth="2">
            <ellipse cx="764" cy="464" rx="9" ry="11" fill="#4DA89E" />
            <circle cx="764" cy="450" r="6" fill="#F3CFA9" />
            <polygon points="756,448 772,448 764,430" fill="#D52B1E" />
            <ellipse cx="764" cy="458" rx="3.6" ry="5" fill="#FFFFFF" />
          </g>
        )}

        {/* Mailbox cosmetic */}
        {has('cos.mailbox') && (
          <g stroke={INK} strokeWidth="2.4">
            <line x1="566" y1="458" x2="566" y2="502" strokeWidth="4" />
            <rect x="550" y="442" width="32" height="18" rx="8" fill="#D52B1E" />
            <line x1="582" y1="446" x2="589" y2="437" strokeWidth="2.8" strokeLinecap="round" />
          </g>
        )}

        {/* Trampoline — Act I coda */}
        {trampolineUnlocked && (
          <g stroke={INK} strokeWidth="2.6">
            <ellipse cx="852" cy="466" rx="60" ry="14" fill="#3E4A56" />
            <ellipse cx="852" cy="461" rx="60" ry="13" fill="#55636F" />
            <ellipse cx="852" cy="461" rx="47" ry="9" fill="#404D59" />
            <g strokeWidth="3.6">
              <line x1="802" y1="472" x2="794" y2="510" />
              <line x1="902" y1="472" x2="910" y2="510" />
              <line x1="852" y1="476" x2="852" y2="514" />
            </g>
          </g>
        )}

        {/* Pool — Act II Ch 8 upgrade */}
        {poolBuilt && (
          <g stroke={INK} strokeWidth="2.6">
            <ellipse cx="760" cy="528" rx="76" ry="23" fill="#DCD6C8" />
            <ellipse cx="760" cy="524" rx="63" ry="17" fill="#6FAEDB" />
            <g stroke="#BFE2F5" strokeWidth="2.4" fill="none">
              <path d="M 716 522 q 8 -5 16 0 q 8 5 16 0 q 8 -5 16 0 q 8 5 16 0" />
              <path d="M 728 530 q 8 -5 16 0 q 8 5 16 0 q 8 -5 16 0" />
            </g>
          </g>
        )}

        {/* Observatory — Act III Ch 11 upgrade */}
        {observatoryBuilt && (
          <g stroke={INK} strokeWidth="2.6">
            <rect x="932" y="372" width="48" height="44" fill="#EFEAE0" />
            <path d="M 928 372 A 28 28 0 0 1 984 372 Z" fill="#9DB3C8" />
            <rect x="950" y="344" width="9" height="22" transform="rotate(38 954 355)" fill="#54636E" />
            <rect x="948" y="392" width="17" height="24" fill="#54636E" />
          </g>
        )}

        {/* Foreground shrubs — scalloped flat blobs */}
        <g stroke={INK} strokeWidth="2.6">
          <path d="M 626 560 a 22 22 0 0 1 18 -26 a 24 24 0 0 1 34 0 a 22 22 0 0 1 18 26 z" fill="#7FAE5C" />
          <path d="M 286 560 a 20 20 0 0 1 16 -24 a 22 22 0 0 1 30 0 a 20 20 0 0 1 16 24 z" fill="#92C06C" />
          <path d="M 0 560 a 22 22 0 0 1 18 -26 a 24 24 0 0 1 34 0 a 22 22 0 0 1 18 26 z" fill="#7FAE5C" />
        </g>
      </g>

      {/* SOLD sign → family plaque after all Act I repairs */}
      {!allRepaired ? (
        <g>
          <rect x="352" y="452" width="8" height="58" fill="#8A6248" stroke={INK} strokeWidth="2.4" />
          <rect x="328" y="430" width="56" height="28" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.6" />
          <text x="356" y="449" textAnchor="middle" fontSize="13" fontFamily="Quicksand, sans-serif" fontWeight="800" fill="#B6543E">SOLD</text>
        </g>
      ) : (
        <g>
          <rect x="352" y="452" width="8" height="58" fill="#8A6248" stroke={INK} strokeWidth="2.4" />
          <rect x="322" y="430" width="68" height="28" rx="3" fill="#F2D26C" stroke={INK} strokeWidth="2.6" />
          <text x="356" y="449" textAnchor="middle" fontSize="11" fontFamily="Quicksand, sans-serif" fontWeight="800" fill="#5C4129">THE T’s</text>
        </g>
      )}
    </svg>
  );
}

/** White-trimmed window with flat glass and a comic diagonal shine. */
function ComicWindow({ x, y, w = 56, h = 62, shaded = false }: {
  x: number; y: number; w?: number; h?: number; shaded?: boolean;
}) {
  return (
    <g>
      <rect x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx={3} fill="#FFF9EE" stroke={INK} strokeWidth="2.6" />
      <rect x={x} y={y} width={w} height={h} fill={shaded ? '#A9CBDA' : '#BBDCE8'} stroke={INK} strokeWidth="2.4" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={INK} strokeWidth="2" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={INK} strokeWidth="2" />
      <path d={`M ${x + 6} ${y + h - 8} L ${x + w - 10} ${y + 8}`} stroke="#FFFFFF" strokeWidth="5" opacity="0.65" />
      <rect x={x - 7} y={y + h + 5} width={w + 14} height={8} rx={3} fill="#FFF9EE" stroke={INK} strokeWidth="2.4" />
    </g>
  );
}

function ComicFlower({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g stroke="#3A3027" strokeWidth="1.6">
      <line x1={x} y1={y} x2={x} y2={y + 14} stroke="#6E8F54" strokeWidth="2.4" />
      <circle cx={x - 5} cy={y - 3} r={4.4} fill={color} />
      <circle cx={x + 5} cy={y - 3} r={4.4} fill={color} />
      <circle cx={x} cy={y - 8} r={4.4} fill={color} />
      <circle cx={x} cy={y - 3} r={3.2} fill="#FDE79C" />
    </g>
  );
}
