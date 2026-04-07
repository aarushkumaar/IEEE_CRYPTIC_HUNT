import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ROUNDS = [
  { id: 1, label: 'ROUND 1', color: '#D4AF37' },
  { id: 2, label: 'ROUND 2', color: '#C9A84C' },
  { id: 3, label: 'ROUND 3', color: '#E8D5A0' },
  { id: 4, label: 'ROUND 4', color: '#B8963E' },
];

/* ── Art Deco CSS Card ───────────────────────────────────────────── */
function ArtDecoCard({ onClick }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max rotation roughly 15 degrees
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = -(y / (rect.height / 2)) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-container"
      style={{
        width: 220, height: 300,
        background: '#000000',
        borderRadius: 16,
        border: '2px solid #D4AF37',
        cursor: 'pointer',
        perspective: '1000px',
        transition: 'box-shadow 0.3s ease-out',
        position: 'relative',
        boxShadow: `0 ${(rotation.x / 10) * 10}px 15px rgba(0,0,0,0.5)`,
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(to bottom, #111 0%, #000 100%)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement.style.boxShadow = '0 0 24px rgba(212, 175, 55, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement.style.boxShadow = 'none';
        }}
      >
        {/* SVG Art deco border */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
          viewBox="0 0 220 300"
          preserveAspectRatio="none"
        >
          {/* Inner thin border */}
          <rect x="8" y="8" width="204" height="284" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <rect x="14" y="14" width="192" height="272" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          
          {/* Corner staircases - Top Left */}
          <polyline points="14,35 35,35 35,14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="22,30 30,30 30,22" fill="none" stroke="#D4AF37" strokeWidth="1" />
          
          {/* Corner staircases - Top Right */}
          <polyline points="206,35 185,35 185,14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="198,30 190,30 190,22" fill="none" stroke="#D4AF37" strokeWidth="1" />

          {/* Corner staircases - Bottom Left */}
          <polyline points="14,265 35,265 35,286" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="22,270 30,270 30,278" fill="none" stroke="#D4AF37" strokeWidth="1" />

          {/* Corner staircases - Bottom Right */}
          <polyline points="206,265 185,265 185,286" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <polyline points="198,270 190,270 190,278" fill="none" stroke="#D4AF37" strokeWidth="1" />

          {/* Top block hashes */}
          <line x1="35" y1="40" x2="185" y2="40" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="45" x2="185" y2="45" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="50" x2="185" y2="50" stroke="#D4AF37" strokeWidth="0.5" />
          
          <line x1="35" y1="260" x2="185" y2="260" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="255" x2="185" y2="255" stroke="#D4AF37" strokeWidth="1" />
          <line x1="35" y1="250" x2="185" y2="250" stroke="#D4AF37" strokeWidth="0.5" />

          {/* Cross lines coming into center badge */}
          <line x1="14" y1="150" x2="60" y2="180" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="206" y1="150" x2="160" y2="180" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>

        {/* Content (AMENTIS + Badge) */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', transform: 'translateZ(20px)' }}>
          <h2 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 22,
            fontWeight: 900,
            color: '#D4AF37',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}>
            AMENTIS
          </h2>

          <div style={{
            width: 70, height: 70,
            margin: '0 auto',
            border: '2px solid #D4AF37',
            borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 20s linear infinite' }}>
              <path id="curve" d="M 15 50 A 35 35 0 1 1 15 50.001" fill="transparent" />
              <text fontSize="7" fill="#D4AF37" fontWeight="bold" letterSpacing="1px" fontFamily="sans-serif">
                <textPath href="#curve" startOffset="0%" fill="#D4AF37">
                  IEEE GTBIT STUDENT BRANCH •
                </textPath>
              </text>
            </svg>
            
            <div style={{ width: 34, height: 34, border: '1px solid #D4AF37', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ transform: 'rotate(-45deg)', color: '#D4AF37', fontSize: 16 }}>⚜</span>
            </div>
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.6))', color: '#D4AF37', fontSize: 24 }}>𓏡</span> {/* Using hieroglyph roughly similar to a pedestal/gramophone */}
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function RoundsSelection() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, #261b0a 0%, #000 70%)',
      overflow: 'hidden',
    }}>
      {/* Glow aura */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Pill header */}
      <div style={{
        position: 'absolute',
        top: '12%',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#000',
        padding: '8px 48px',
        borderRadius: 50,
        boxShadow: '0 0 80px 40px rgba(255,255,255,0.6), inset 0 0 10px rgba(0,0,0,0.5)',
        zIndex: 10,
      }}>
        <h1 style={{
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          ROUND 1
        </h1>
      </div>

      {/* Cards layout */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 24,
        zIndex: 5,
        marginTop: 60,
        padding: '0 24px',
        maxWidth: 1100,
      }}>
        {ROUNDS.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <ArtDecoCard onClick={() => navigate(`/round/${r.id}`)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
