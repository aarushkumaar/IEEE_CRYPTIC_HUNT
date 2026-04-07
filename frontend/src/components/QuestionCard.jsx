import { motion, AnimatePresence } from 'framer-motion';
import SuitIcon, { SUIT_SYMBOLS } from './SuitIcon';

/* ── Egyptian suit palette — all gold-toned ───────────────────────── */
const SUIT_CONFIG = {
  spades:   { accent: '#C9A84C', glyph: '𓅓', label: '♠' },
  hearts:   { accent: '#E8D5A0', glyph: '𓃒', label: '♥' },
  diamonds: { accent: '#C9A84C', glyph: '𓆙', label: '♦' },
  clubs:    { accent: '#D4AF5A', glyph: '𓋹', label: '♣' },
};

const CARD_LABELS = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
const getCardLabel = n => CARD_LABELS[n] || String(n);

/* ── Noise texture as SVG data URL ────────────────────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`;

/* ── Ornate Corner Badge ───────────────────────────────────────────── */
function CornerBadge({ label, symbol, accent, isWildcard }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <span style={{
        fontFamily: '"Cinzel Decorative", serif',
        fontWeight: 700,
        fontSize: 15,
        color: accent,
        lineHeight: 1,
        textShadow: `0 0 8px ${accent}55`,
      }}>
        {label}
      </span>
      <span style={{ fontSize: 12, color: accent, lineHeight: 1, opacity: 0.85 }}>
        {isWildcard ? '✦' : symbol}
      </span>
    </div>
  );
}

/* ── Ornate card border SVG overlay ───────────────────────────────── */
function OrnateBorderOverlay({ accent }) {
  const a = accent + '55';
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
      viewBox="0 0 280 392"
      preserveAspectRatio="none"
    >
      {/* Outer border */}
      <rect x="6" y="6" width="268" height="380" rx="6" ry="6"
        fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Inner border */}
      <rect x="14" y="14" width="252" height="364" rx="3" ry="3"
        fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.25" />
      {/* Corner flourishes — top-left */}
      <path d="M6 30 L6 6 L30 6" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="6" cy="6" r="2.5" fill={accent} opacity="0.8" />
      {/* Corner flourishes — top-right */}
      <path d="M274 30 L274 6 L250 6" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="274" cy="6" r="2.5" fill={accent} opacity="0.8" />
      {/* Corner flourishes — bottom-left */}
      <path d="M6 362 L6 386 L30 386" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="6" cy="386" r="2.5" fill={accent} opacity="0.8" />
      {/* Corner flourishes — bottom-right */}
      <path d="M274 362 L274 386 L250 386" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="274" cy="386" r="2.5" fill={accent} opacity="0.8" />
      {/* Center horizontal bar */}
      <line x1="28" y1="196" x2="80" y2="196" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="200" y1="196" x2="252" y2="196" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Decorative dots on border */}
      <circle cx="140" cy="6" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="140" cy="386" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="6" cy="196" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="274" cy="196" r="1.5" fill={accent} opacity="0.4" />
    </svg>
  );
}

/* ── Main QuestionCard component ─────────────────────────────────── */
export default function QuestionCard({ question, cardState = 'idle', isWildcard = false }) {
  if (!question) return null;

  const { suit, card_number, question: questionText, type } = question;
  const cfg     = SUIT_CONFIG[suit] || SUIT_CONFIG.spades;
  const accent  = cfg.accent;
  const label   = getCardLabel(card_number);
  const symbol  = cfg.label;
  const glyph   = isWildcard ? '✦' : cfg.glyph;

  // Animate target based on cardState
  const animateTarget = (() => {
    const base = { x: 0, opacity: 1, scale: 1, rotateY: 0 };
    if (cardState === 'shake') {
      return {
        ...base,
        x: [-8, 8, -6, 6, -4, 4, 0],
        transition: { duration: 0.38 },
      };
    }
    if (cardState === 'glow') {
      return {
        ...base,
        scale: [1, 1.04, 1],
        boxShadow: [
          `0 8px 40px rgba(0,0,0,0.9), 0 0 30px ${accent}33`,
          `0 8px 60px rgba(0,0,0,0.8), 0 0 60px ${accent}88, 0 0 100px ${accent}33`,
          `0 8px 40px rgba(0,0,0,0.9), 0 0 30px ${accent}33`,
        ],
        transition: { duration: 0.7 },
      };
    }
    return {
      ...base,
      boxShadow: `0 8px 40px rgba(0,0,0,0.85), 0 0 30px ${accent}22`,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    };
  })();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: 60, opacity: 0, scale: 0.92, rotateY: -10 }}
        animate={animateTarget}
        exit={{ x: -60, opacity: 0, scale: 0.9, transition: { duration: 0.25, ease: 'easeIn' } }}
        style={{
          width: 'clamp(260px, 82vw, 340px)',
          aspectRatio: '5 / 7',
          borderRadius: 8,
          background: `radial-gradient(ellipse at 40% 30%, #251A08, #0D0B05 60%, #080500)`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.85), 0 0 30px ${accent}22`,
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          perspective: 800,
          animation: cardState === 'idle' ? 'float 4s ease-in-out infinite' : 'none',
        }}
      >
        {/* Parchment texture — noise overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: NOISE_SVG,
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Aged vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Ornate border/frame */}
        <OrnateBorderOverlay accent={accent} />

        {/* Large faint watermark glyph */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(90px, 24vw, 130px)',
          color: accent,
          opacity: 0.055,
          userSelect: 'none', pointerEvents: 'none',
          zIndex: 3,
          fontFamily: 'serif',
          textShadow: `0 0 40px ${accent}`,
          filter: 'blur(1px)',
        }}>
          {glyph}
        </div>

        {/* Top-left corner badge */}
        <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 5 }}>
          <CornerBadge label={label} symbol={symbol} accent={accent} isWildcard={isWildcard} />
        </div>

        {/* Bottom-right corner badge (rotated 180°) */}
        <div style={{ position: 'absolute', bottom: 18, right: 18, transform: 'rotate(180deg)', zIndex: 5 }}>
          <CornerBadge label={label} symbol={symbol} accent={accent} isWildcard={isWildcard} />
        </div>

        {/* Type label — top-right */}
        {type && (
          <div style={{
            position: 'absolute', top: 18, right: 18, zIndex: 5,
            fontFamily: '"Cinzel", serif',
            fontSize: 8,
            letterSpacing: '0.15em',
            color: `${accent}99`,
            textTransform: 'uppercase',
          }}>
            {type}
          </div>
        )}

        {/* Question text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '52px 26px',
          zIndex: 6,
        }}>
          <p style={{
            fontFamily: '"IM Fell English", Georgia, serif',
            fontStyle: 'italic',
            textAlign: 'center',
            color: '#F5ECD0',
            fontSize: 'clamp(13px, 3.2vw, 16px)',
            lineHeight: 1.72,
            whiteSpace: 'pre-wrap',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>
            {questionText}
          </p>
        </div>

        {/* Bottom suit label */}
        <div style={{
          position: 'absolute', bottom: 42, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          zIndex: 5, pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: `${accent}55`,
            textTransform: 'uppercase',
          }}>
            {isWildcard ? 'WILDCARD' : suit?.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
