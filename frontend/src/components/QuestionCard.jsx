import { motion, AnimatePresence } from 'framer-motion';
import SuitIcon, { SUIT_SYMBOLS } from './SuitIcon';

const SUIT_BG = {
  spades:   'linear-gradient(135deg, #0d0d18 0%, #111126 100%)',
  hearts:   'linear-gradient(135deg, #130d0d 0%, #1f1012 100%)',
  diamonds: 'linear-gradient(135deg, #111009 0%, #1a1710 100%)',
  clubs:    'linear-gradient(135deg, #091311 0%, #0f1a18 100%)',
};

const SUIT_BORDER = {
  spades:   '#7B6EF6',
  hearts:   '#F04A57',
  diamonds: '#F5C542',
  clubs:    '#1BE0D4',
};

const SUIT_GLOW = {
  spades:   '0 0 40px rgba(123,110,246,0.25)',
  hearts:   '0 0 40px rgba(240,74,87,0.25)',
  diamonds: '0 0 40px rgba(245,197,66,0.25)',
  clubs:    '0 0 40px rgba(27,224,212,0.25)',
};

const CARD_NUMBER_LABELS = {
  1: 'A', 11: 'J', 12: 'Q', 13: 'K',
};

function getCardLabel(n) {
  return CARD_NUMBER_LABELS[n] || String(n);
}

const cardVariants = {
  enter: {
    x: 60,
    opacity: 0,
    scale: 0.9,
    rotateY: -8,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    x: -60,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export default function QuestionCard({
  question,
  cardState = 'idle',
  isWildcard = false,
}) {
  if (!question) return null;

  const { suit, card_number, question: questionText } = question;
  const label = getCardLabel(card_number);
  const symbol = SUIT_SYMBOLS[suit] || '♠';
  const borderColor = SUIT_BORDER[suit];
  const glowShadow  = SUIT_GLOW[suit];
  const bgGradient  = SUIT_BG[suit];

  // Build animate target: start from center values, override with active state animations
  const animateTarget = (() => {
    const base = { x: 0, opacity: 1, scale: 1, rotateY: 0 };
    if (cardState === 'shake') {
      return { ...base, x: [-8, 8, -6, 6, -4, 4, 0], transition: { duration: 0.35 } };
    }
    if (cardState === 'glow') {
      return {
        ...base,
        boxShadow: [
          glowShadow,
          '0 0 60px rgba(34,215,123,0.6)',
          '0 0 40px rgba(34,215,123,0.3)',
          glowShadow,
        ],
        transition: { duration: 0.6 },
      };
    }
    return { ...base, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } };
  })();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: 60, opacity: 0, scale: 0.9, rotateY: -8 }}
        animate={animateTarget}
        exit={{ x: -60, opacity: 0, scale: 0.9, transition: { duration: 0.25, ease: 'easeIn' } }}
        style={{
          width: 'clamp(280px, 85vw, 360px)',
          aspectRatio: '5 / 7',
          borderRadius: 16,
          border: `2px solid ${borderColor}`,
          background: bgGradient,
          boxShadow: glowShadow,
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          perspective: 800,
        }}
      >
        {/* Noise texture overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Large faint watermark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(80px, 20vw, 120px)',
            color: borderColor,
            opacity: 0.08,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {isWildcard ? '✦' : symbol}
        </div>

        {/* Top-left corner badge */}
        <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 2 }}>
          <CornerBadge label={label} symbol={symbol} color={borderColor} isWildcard={isWildcard} />
        </div>

        {/* Bottom-right corner badge (rotated 180°) */}
        <div style={{ position: 'absolute', bottom: 12, right: 14, transform: 'rotate(180deg)', zIndex: 2 }}>
          <CornerBadge label={label} symbol={symbol} color={borderColor} isWildcard={isWildcard} />
        </div>

        {/* Question text */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            zIndex: 3,
          }}
        >
          <p
            className="font-body text-center"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(14px, 3.5vw, 17px)',
              lineHeight: 1.65,
              fontWeight: 400,
              whiteSpace: 'pre-wrap',
            }}
          >
            {questionText}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CornerBadge({ label, symbol, color, isWildcard }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color, lineHeight: 1 }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color, lineHeight: 1 }}>
        {isWildcard ? '✦' : symbol}
      </span>
    </div>
  );
}
