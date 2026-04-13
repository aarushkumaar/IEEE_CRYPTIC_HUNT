import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────────────────────────
   Shared parchment gradient id must be unique per card — we create
   defs per svg instance.
──────────────────────────────────────────────────────────────────── */

/* ── Parchment background ── */
function ParchmentDefs({ id, dark = false }) {
  const c0 = dark ? '#C4BEB0' : '#EDE0C4';
  const c1 = dark ? '#BAB2A0' : '#D4C4A0';
  const c2 = dark ? '#AAA494' : '#C4B48A';
  return (
    <defs>
      <radialGradient id={`parch-${id}`} cx="30%" cy="30%" r="80%">
        <stop offset="0%"   stopColor={c0} />
        <stop offset="50%"  stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </radialGradient>
      {/* Subtle noise overlay via filter */}
      <filter id={`noise-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
        <feComposite in="blended" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  );
}

/* ── Sacred geometry ring set ── */
function SacredRings({ cx = 140, cy = 195, stroke = '#8B7355', opacity = 0.35 }) {
  return (
    <g opacity={opacity} stroke={stroke} fill="none" strokeWidth="0.5">
      <circle cx={cx} cy={cy} r="105" />
      <circle cx={cx} cy={cy} r="80" />
      <circle cx={cx} cy={cy} r="55" />
      <circle cx={cx} cy={cy} r="30" />
      {/* Construction diagonals */}
      <line x1={cx - 105} y1={cy} x2={cx + 105} y2={cy} strokeWidth="0.3" opacity="0.6" />
      <line x1={cx} y1={cy - 105} x2={cx} y2={cy + 105} strokeWidth="0.3" opacity="0.6" />
      <line x1={cx - 74} y1={cy - 74} x2={cx + 74} y2={cy + 74} strokeWidth="0.3" opacity="0.5" />
      <line x1={cx + 74} y1={cy - 74} x2={cx - 74} y2={cy + 74} strokeWidth="0.3" opacity="0.5" />
    </g>
  );
}

/* ── Stylised open palm (hand) outline ── */
function HandOutline({ cx = 140, cy = 195, stroke = '#8B7355', opacity = 0.28 }) {
  // Simplified hand silhouette path centered on cx,cy
  const tx = cx - 30;
  const ty = cy - 60;
  return (
    <g transform={`translate(${tx}, ${ty})`} opacity={opacity} stroke={stroke} fill="none" strokeWidth="0.7">
      {/* Palm */}
      <ellipse cx="30" cy="75" rx="28" ry="32" />
      {/* Fingers */}
      <ellipse cx="10" cy="48" rx="7" ry="20" />
      <ellipse cx="22" cy="38" rx="7" ry="24" />
      <ellipse cx="36" cy="36" rx="7" ry="24" />
      <ellipse cx="50" cy="40" rx="6" ry="20" />
      {/* Thumb */}
      <ellipse cx="-4" cy="68" rx="7" ry="17" transform="rotate(-25 -4 68)" />
      {/* Palm lines */}
      <path d="M 8 82 Q 30 70 52 78" strokeWidth="0.5" />
      <path d="M 6 90 Q 30 80 54 88" strokeWidth="0.5" />
    </g>
  );
}

/* ── HEARTS CARD ────────────────────────────────────────────────── */
function HeartsCard() {
  const id = 'hearts';
  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ParchmentDefs id={id} />
      {/* Background */}
      <rect x="0" y="0" width="280" height="420" rx="16" ry="16" fill={`url(#parch-${id})`} />
      {/* Border */}
      <rect x="4" y="4" width="272" height="412" rx="13" ry="13" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.5" />
      <rect x="8" y="8" width="264" height="404" rx="11" ry="11" fill="none" stroke="#8B7355" strokeWidth="0.4" opacity="0.35" />

      {/* Sacred geometry */}
      <SacredRings cx={140} cy={200} stroke="#7A5C3A" opacity={0.30} />
      <HandOutline cx={140} cy={200} stroke="#9B7A55" opacity={0.22} />

      {/* ── Corner A + ♥ top-left ── */}
      <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#3A2010" fontWeight="bold">A</text>
      <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#8B1A1A">♥</text>

      {/* ── Corner crescent moon top-right ── */}
      <text x="248" y="38" fontFamily="serif" fontSize="18" fill="#5A4030" textAnchor="middle">☽</text>

      {/* ── Bottom-left small star ── */}
      <text x="20" y="398" fontFamily="serif" fontSize="12" fill="#8B7355" opacity="0.7">✦</text>

      {/* ── Bottom-right A + ♥ rotated 180 ── */}
      <g transform="rotate(180, 140, 210)">
        <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#3A2010" fontWeight="bold">A</text>
        <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#8B1A1A">♥</text>
      </g>

      {/* ── Main Heart symbol (SVG path, deep crimson) ── */}
      <g transform="translate(140, 200)">
        {/* Drop shadow */}
        <path
          d="M0,-38 C10,-58 38,-60 38,-32 C38,-14 20,6 0,26 C-20,6 -38,-14 -38,-32 C-38,-60 -10,-58 0,-38Z"
          fill="#5A0A0A" opacity="0.25" transform="translate(3,4)"
        />
        {/* Golden outline */}
        <path
          d="M0,-38 C10,-58 38,-60 38,-32 C38,-14 20,6 0,26 C-20,6 -38,-14 -38,-32 C-38,-60 -10,-58 0,-38Z"
          fill="none" stroke="#C9A84C" strokeWidth="1.5"
        />
        {/* Main fill */}
        <path
          d="M0,-38 C10,-58 38,-60 38,-32 C38,-14 20,6 0,26 C-20,6 -38,-14 -38,-32 C-38,-60 -10,-58 0,-38Z"
          fill="#8B1A1A"
        />
        {/* Internal detail lines */}
        <path d="M0,-38 L0,26" stroke="#C0392B" strokeWidth="0.8" opacity="0.5" />
        <path d="M-19,-18 C-10,-5 10,-5 19,-18" stroke="#C0392B" strokeWidth="0.6" opacity="0.4" fill="none" />
        {/* Highlight */}
        <path
          d="M-22,-38 C-18,-52 -8,-54 -4,-44"
          stroke="#E8A0A0" strokeWidth="1.2" fill="none" opacity="0.45"
        />
      </g>

      {/* ── Labels ── */}
      <text x="140" y="352" fontFamily="'Cinzel', serif" fontSize="7.5" fill="#5A3A1A" textAnchor="middle" letterSpacing="1.5">DE PARTIC SECRET. CHIROMANT.</text>
      <text x="140" y="370" fontFamily="'IM Fell English', serif" fontSize="11" fill="#8B4513" textAnchor="middle" fontStyle="italic">mater et virgo</text>
    </svg>
  );
}

/* ── DIAMONDS CARD ──────────────────────────────────────────────── */
function DiamondsCard() {
  const id = 'diamonds';
  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ParchmentDefs id={id} />
      <defs>
        <radialGradient id="gem-grad" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#D45050" />
          <stop offset="40%"  stopColor="#8B1515" />
          <stop offset="100%" stopColor="#4A0808" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="280" height="420" rx="16" ry="16" fill={`url(#parch-${id})`} />
      <rect x="4" y="4" width="272" height="412" rx="13" ry="13" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.5" />
      <rect x="8" y="8" width="264" height="404" rx="11" ry="11" fill="none" stroke="#8B7355" strokeWidth="0.4" opacity="0.35" />

      {/* Sacred geometry */}
      <SacredRings cx={140} cy={200} stroke="#7A5C3A" opacity={0.28} />
      <HandOutline cx={140} cy={200} stroke="#9B7A55" opacity={0.20} />

      {/* Lattice diamond frame lines */}
      <g stroke="#8B6A3A" fill="none" strokeWidth="0.4" opacity="0.35">
        <polygon points="140,95 235,200 140,305 45,200" />
        <polygon points="140,108 222,200 140,292 58,200" />
        <polygon points="140,122 210,200 140,278 70,200" />
      </g>

      {/* Top label */}
      <text x="140" y="30" fontFamily="'Cinzel', serif" fontSize="6.5" fill="#5A3A1A" textAnchor="middle" letterSpacing="1">GEODIETRIA SACRA COEMA.</text>

      {/* Corner A + ♦ top-left */}
      <text x="18" y="50" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#3A2010" fontWeight="bold">A</text>
      <text x="23" y="70" fontFamily="serif" fontSize="14" fill="#8B1515">♦</text>

      {/* Sun top-right */}
      <text x="248" y="50" fontFamily="serif" fontSize="18" fill="#8B6914" textAnchor="middle">☀</text>

      {/* Bottom-left small diamond */}
      <text x="20" y="398" fontFamily="serif" fontSize="12" fill="#8B6914" opacity="0.8">◆</text>

      {/* Bottom-right A + ♦ rotated */}
      <g transform="rotate(180, 140, 210)">
        <text x="18" y="50" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#3A2010" fontWeight="bold">A</text>
        <text x="23" y="70" fontFamily="serif" fontSize="14" fill="#8B1515">♦</text>
      </g>

      {/* ── Main gem diamond ── */}
      <g transform="translate(140, 200)">
        {/* Outer wooden/gold frame */}
        <polygon points="0,-65 55,0 0,65 -55,0" fill="none" stroke="#C9A84C" strokeWidth="2" />
        <polygon points="0,-58 48,0 0,58 -48,0" fill="none" stroke="#B8963E" strokeWidth="1" />
        <polygon points="0,-50 42,0 0,50 -42,0" fill="none" stroke="#A07830" strokeWidth="0.8" />

        {/* Gem shadow */}
        <polygon points="0,-42 36,0 0,42 -36,0" fill="#3A0808" opacity="0.3" transform="translate(3,4)" />
        {/* Gem fill */}
        <polygon points="0,-42 36,0 0,42 -36,0" fill="url(#gem-grad)" />
        {/* Gem facet lines */}
        <line x1="0" y1="-42" x2="0" y2="42" stroke="#E88080" strokeWidth="0.7" opacity="0.4" />
        <line x1="-36" y1="0" x2="36" y2="0" stroke="#E88080" strokeWidth="0.7" opacity="0.4" />
        <line x1="0" y1="-42" x2="36" y2="0" stroke="#E88080" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="-42" x2="-36" y2="0" stroke="#E88080" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="42" x2="36" y2="0" stroke="#C04040" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="42" x2="-36" y2="0" stroke="#C04040" strokeWidth="0.5" opacity="0.3" />
        {/* Highlight */}
        <polygon points="-10,-42 0,-38 -22,-8 -28,-14" fill="#E8A0A0" opacity="0.35" />
      </g>

      {/* Labels */}
      <text x="140" y="352" fontFamily="'Cinzel', serif" fontSize="7.5" fill="#5A3A1A" textAnchor="middle" letterSpacing="1.5">GEOMETRIA SACRA GEMMA.</text>
      <text x="140" y="370" fontFamily="'IM Fell English', serif" fontSize="11" fill="#8B6914" textAnchor="middle" fontStyle="italic">crystallus et veritas.</text>
    </svg>
  );
}

/* ── SPADES CARD ────────────────────────────────────────────────── */
function SpadesCard() {
  const id = 'spades';
  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ParchmentDefs id={id} dark />
      <rect x="0" y="0" width="280" height="420" rx="16" ry="16" fill={`url(#parch-${id})`} />
      <rect x="4" y="4" width="272" height="412" rx="13" ry="13" fill="none" stroke="#5A6070" strokeWidth="1" opacity="0.5" />
      <rect x="8" y="8" width="264" height="404" rx="11" ry="11" fill="none" stroke="#5A6070" strokeWidth="0.4" opacity="0.35" />

      {/* Sacred geometry — triangle in circle with planetary symbols at vertices */}
      <g stroke="#3A4A6A" fill="none" opacity="0.30">
        <circle cx={140} cy={200} r="105" strokeWidth="0.5" />
        <circle cx={140} cy={200} r="80" strokeWidth="0.5" />
        <circle cx={140} cy={200} r="55" strokeWidth="0.5" />
        <polygon points="140,95 233,252 47,252" strokeWidth="0.7" />
        <line x1={140} y1={95} x2={140} y2={305} strokeWidth="0.3" />
        <line x1={35} y1={147} x2={245} y2={253} strokeWidth="0.3" />
        <line x1={245} y1={147} x2={35} y2={253} strokeWidth="0.3" />
      </g>
      <HandOutline cx={140} cy={200} stroke="#5A6A8A" opacity={0.18} />

      {/* Corner A + ♠ top-left */}
      <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#1A1F3A" fontWeight="bold">A</text>
      <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#1A1F3A">♠</text>

      {/* Top-right crescent moon */}
      <text x="248" y="38" fontFamily="serif" fontSize="18" fill="#5A6070" textAnchor="middle">☽</text>

      {/* Planetary symbols scattered around circle */}
      {[
        { x: 85,  y: 130, sym: '♀' },
        { x: 190, y: 120, sym: '☿' },
        { x: 218, y: 220, sym: '♂' },
        { x: 65,  y: 228, sym: '♄' },
        { x: 140, y: 305, sym: '⊕' },
      ].map(({ x, y, sym }) => (
        <text key={sym} x={x} y={y} fontFamily="serif" fontSize="10" fill="#3A4A6A" textAnchor="middle" opacity="0.55">{sym}</text>
      ))}

      {/* Bottom-left hourglass */}
      <text x="20" y="398" fontFamily="serif" fontSize="13" fill="#3A4A6A" opacity="0.7">⌛</text>

      {/* Bottom-right A + ♠ rotated */}
      <g transform="rotate(180, 140, 210)">
        <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#1A1F3A" fontWeight="bold">A</text>
        <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#1A1F3A">♠</text>
      </g>

      {/* ── Main Spade with crescent moon inside ── */}
      <g transform="translate(140, 198)">
        {/* Spade body shadow */}
        <path
          d="M0,-52 C20,-52 48,-28 48,0 C48,22 28,36 0,36 C-28,36 -48,22 -48,0 C-48,-28 -20,-52 0,-52Z"
          fill="#0A0F20" opacity="0.2" transform="translate(3,4)"
        />
        {/* Spade main fill (inverted heart + triangle stem) */}
        <path d="M0,-52 C16,-52 44,-28 44,0 C44,22 26,36 0,36 C-26,36 -44,22 -44,0 C-44,-28 -16,-52 0,-52Z" fill="#1A1F3A" />
        {/* Spade pointed tip (bottom triangle) */}
        <polygon points="0,36 -18,60 18,60" fill="#1A1F3A" />
        {/* Spade base rectangle */}
        <rect x="-20" y="56" width="40" height="6" rx="2" fill="#1A1F3A" />

        {/* Golden alchemical triangle overlay */}
        <polygon points="0,-38 30,16 -30,16" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />

        {/* Crescent moon inside spade */}
        <text x="0" y="16" fontFamily="serif" fontSize="28" fill="#C9A84C" textAnchor="middle" opacity="0.85">☽</text>

        {/* Sunray lines inside spade (subtle) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const r1 = 6, r2 = 18;
          return (
            <line
              key={i}
              x1={Math.cos(angle) * r1} y1={Math.sin(angle) * r1 + 4}
              x2={Math.cos(angle) * r2} y2={Math.sin(angle) * r2 + 4}
              stroke="#C9A84C" strokeWidth="0.6" opacity="0.3"
            />
          );
        })}
      </g>

      {/* Labels */}
      <text x="140" y="352" fontFamily="'Cinzel', serif" fontSize="7" fill="#2A3A5A" textAnchor="middle" letterSpacing="1">DE PARTIC SECRET. ALCHEM. & ASTRO.</text>
      <text x="140" y="370" fontFamily="'IM Fell English', serif" fontSize="11" fill="#2D4A6A" textAnchor="middle" fontStyle="italic">umbralis et potentia.</text>
    </svg>
  );
}

/* ── CLUBS CARD ─────────────────────────────────────────────────── */
function ClubsCard() {
  const id = 'clubs';
  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ParchmentDefs id={id} />
      <rect x="0" y="0" width="280" height="420" rx="16" ry="16" fill={`url(#parch-${id})`} />
      <rect x="4" y="4" width="272" height="412" rx="13" ry="13" fill="none" stroke="#5A3A1A" strokeWidth="1" opacity="0.5" />
      <rect x="8" y="8" width="264" height="404" rx="11" ry="11" fill="none" stroke="#5A3A1A" strokeWidth="0.4" opacity="0.35" />

      {/* Sacred geometry — fibonacci/golden ratio spirals */}
      <g stroke="#7A5C3A" fill="none" opacity="0.28">
        <circle cx={140} cy={200} r="105" strokeWidth="0.5" />
        <circle cx={140} cy={200} r="80" strokeWidth="0.5" />
        <circle cx={140} cy={200} r="55" strokeWidth="0.5" />
        <circle cx={140} cy={200} r="30" strokeWidth="0.5" />
        {/* Fibonacci spiral approximation */}
        <path d="M140,200 Q180,160 180,200 Q180,240 140,240 Q100,240 100,200 Q100,145 155,145 Q215,145 215,200 Q215,270 140,270" strokeWidth="0.6" />
        <line x1="35" y1="200" x2="245" y2="200" strokeWidth="0.3" />
        <line x1="140" y1="95" x2="140" y2="305" strokeWidth="0.3" />
        <line x1="66" y1="126" x2="214" y2="274" strokeWidth="0.3" opacity="0.5" />
        <line x1="214" y1="126" x2="66" y2="274" strokeWidth="0.3" opacity="0.5" />
      </g>
      <HandOutline cx={140} cy={200} stroke="#8B6A3A" opacity={0.20} />

      {/* Corner A + ♣ top-left */}
      <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#2D1F0A" fontWeight="bold">A</text>
      <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#2D1F0A">♣</text>

      {/* Top-right tree (SVG, not emoji) */}
      <g transform="translate(238, 16)" fill="#4A3010" opacity="0.75">
        {/* Trunk */}
        <rect x="7" y="24" width="4" height="12" rx="1" />
        {/* Layered triangles for tree crown */}
        <polygon points="9,2 0,16 18,16" />
        <polygon points="9,10 -1,22 19,22" />
        <polygon points="9,18 -2,29 20,29" />
      </g>

      {/* Bottom-left acorn */}
      <g transform="translate(14, 378)" fill="#4A3010" opacity="0.7">
        <ellipse cx="8" cy="10" rx="7" ry="8" />
        <rect x="4" y="0" width="8" height="5" rx="2" fill="#6A4820" />
        <line x1="8" y1="0" x2="8" y2="-5" stroke="#4A3010" strokeWidth="1.5" />
      </g>

      {/* Bottom-right A + ♣ rotated */}
      <g transform="rotate(180, 140, 210)">
        <text x="18" y="38" fontFamily="'Cinzel Decorative', serif" fontSize="22" fill="#2D1F0A" fontWeight="bold">A</text>
        <text x="22" y="58" fontFamily="serif" fontSize="16" fill="#2D1F0A">♣</text>
      </g>

      {/* ── Main Clubs — three overlapping circles + stem + Fibonacci spiral ── */}
      <g transform="translate(140, 200)">
        {/* Three circle shadow */}
        <circle cx="3" cy="-24" r="26" fill="#1A0E05" opacity="0.18" transform="translate(3,4)" />
        <circle cx="-22" cy="4" r="26" fill="#1A0E05" opacity="0.18" transform="translate(3,4)" />
        <circle cx="22" cy="4" r="26" fill="#1A0E05" opacity="0.18" transform="translate(3,4)" />

        {/* Three circles — dark brown fill */}
        <circle cx="0" cy="-24" r="26" fill="#2D1F0A" />
        <circle cx="-24" cy="4" r="26" fill="#2D1F0A" />
        <circle cx="24" cy="4" r="26" fill="#2D1F0A" />

        {/* Fibonacci spiral overlay on top circle */}
        <clipPath id="top-circle-clip">
          <circle cx="0" cy="-24" r="26" />
        </clipPath>
        <g clipPath="url(#top-circle-clip)" fill="none" stroke="#7A5030" strokeWidth="0.8" opacity="0.55">
          <path d="M0,-24 Q16,-24 16,-8 Q16,8 0,8 Q-16,8 -16,-8 Q-16,-24 0,-24" />
          <path d="M0,-20 Q10,-20 10,-11 Q10,-2 0,-2" />
        </g>

        {/* Stem */}
        <rect x="-6" y="24" width="12" height="22" rx="3" fill="#2D1F0A" />
        <rect x="-16" y="42" width="32" height="5" rx="2" fill="#2D1F0A" />

        {/* Highlight on top circle */}
        <circle cx="-8" cy="-32" r="8" fill="#7A5030" opacity="0.22" />
      </g>

      {/* Labels */}
      <text x="140" y="352" fontFamily="'Cinzel', serif" fontSize="7.5" fill="#3A2A10" textAnchor="middle" letterSpacing="1">DE PARTIC SECRET. PHYS. & VITA.</text>
      <text x="140" y="370" fontFamily="'IM Fell English', serif" fontSize="11" fill="#4A3010" textAnchor="middle" fontStyle="italic">viriditas et vita.</text>
    </svg>
  );
}

/* ══ SUIT CARD EXPORT ═════════════════════════════════════════════ */
const SUIT_COMPONENTS = {
  hearts:   HeartsCard,
  diamonds: DiamondsCard,
  spades:   SpadesCard,
  clubs:    ClubsCard,
};

/**
 * SuitCard
 * @param {string}   suit        — 'hearts' | 'diamonds' | 'spades' | 'clubs'
 * @param {boolean}  isSelected  — true while this card is the selected one after click
 * @param {boolean}  isFading    — true for cards that should fade out
 * @param {Function} onClick     — called on user click
 */
export default function SuitCard({ suit, isSelected, isFading, onClick }) {
  const CardSVG = SUIT_COMPONENTS[suit] ?? HeartsCard;

  return (
    <motion.div
      onClick={onClick}
      animate={
        isFading
          ? { opacity: 0, y: 40, scale: 0.9 }
          : isSelected
          ? { scale: 1.08 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      whileHover={!isFading && !isSelected ? { scale: 1.04, y: -6 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        width: '100%',
        maxWidth: 260,
        aspectRatio: '2/3',
        cursor: 'pointer',
        borderRadius: 16,
        boxShadow: isSelected
          ? '0 0 60px rgba(212,175,55,0.6), 0 20px 60px rgba(0,0,0,0.6)'
          : '0 8px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.3s',
      }}
    >
      <CardSVG />
    </motion.div>
  );
}
