import { motion, AnimatePresence } from 'framer-motion';
import SuitCardArt from './SuitCard';

/* ── Egyptian suit palette ────────────────────────────────────────── */
const SUIT_CONFIG = {
  spades:   { accent: '#C9A84C' },
  hearts:   { accent: '#E8D5A0' },
  diamonds: { accent: '#C9A84C' },
  clubs:    { accent: '#D4AF5A' },
};

/* ── Main QuestionCard component ─────────────────────────────────── */
export default function QuestionCard({ question, cardState = 'idle', isWildcard = false }) {
  if (!question) return null;

  const { suit } = question;
  const cfg    = SUIT_CONFIG[suit] || SUIT_CONFIG.spades;
  const accent = cfg.accent;

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
          width: 'clamp(220px, 70vw, 280px)',
          aspectRatio: '2 / 3',
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          perspective: 800,
          boxShadow: `0 8px 40px rgba(0,0,0,0.85), 0 0 30px ${accent}22`,
          animation: cardState === 'idle' ? 'float 4s ease-in-out infinite' : 'none',
        }}
      >
        {/* ── Suit card art (same as round selection page) ─────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <SuitCardArt suit={suit} />
        </div>

        {/* ── Hidden joker easter eggs (wildcard only) ─────────── */}
        {isWildcard && (
          <>
            {/* Tiny joker near the bottom-right sacred geometry */}
            <span style={{
              position: 'absolute',
              bottom: '19%',
              right: '14%',
              fontSize: 10,
              opacity: 0.1,
              transform: 'rotate(-12deg)',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'sepia(1) saturate(0.3) brightness(0.7)',
              mixBlendMode: 'multiply',
            }}>🃏</span>

            {/* Another near the top-left corner lines */}
            <span style={{
              position: 'absolute',
              top: '24%',
              left: '16%',
              fontSize: 8,
              opacity: 0.08,
              transform: 'rotate(6deg)',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'sepia(1) saturate(0.2) brightness(0.65)',
              mixBlendMode: 'multiply',
            }}>🃏</span>

            {/* One more, near the center ring area */}
            <span style={{
              position: 'absolute',
              bottom: '40%',
              left: '44%',
              fontSize: 7,
              opacity: 0.07,
              transform: 'rotate(38deg)',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'sepia(1) brightness(0.6)',
              mixBlendMode: 'multiply',
            }}>🃏</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
