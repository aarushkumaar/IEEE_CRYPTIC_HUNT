import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Fail() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000',
    }}>
      <style>{`
        @keyframes glowRed {
          from { text-shadow: 0 0 10px #8B0000, 0 0 20px #D4AF37; }
          to   { text-shadow: 0 0 30px #8B0000, 0 0 60px #8B0000, 0 0 100px #D4AF37; }
        }
        @keyframes shimmer {
          0% { opacity: 0.1; transform: translateY(0px); }
          50% { opacity: 0.3; transform: translateY(-10px); }
          100% { opacity: 0.1; transform: translateY(0px); }
        }
        .particle {
          position: absolute;
          background: #D4AF37;
          border-radius: 50%;
          animation: shimmer 4s infinite linear;
        }
        .hieroglyph-border {
          position: absolute;
          inset: 16px;
          border: 2px solid #D4AF37;
          pointer-events: none;
        }
        .hieroglyph-border::before {
          content: "";
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(212, 175, 55, 0.4);
        }
      `}</style>
      
      {/* Ambient particles */}
      <div className="particle" style={{ width: 4, height: 4, top: '20%', left: '30%', animationDelay: '0s' }} />
      <div className="particle" style={{ width: 3, height: 3, top: '40%', left: '70%', animationDelay: '1s' }} />
      <div className="particle" style={{ width: 4, height: 4, top: '70%', left: '20%', animationDelay: '2s' }} />
      <div className="particle" style={{ width: 5, height: 5, top: '80%', left: '80%', animationDelay: '3s' }} />
      <div className="particle" style={{ width: 3, height: 3, top: '10%', left: '80%', animationDelay: '0.5s' }} />
      
      <div className="hieroglyph-border" />

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: 640, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
      }}>
        {/* Eye of Horus SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ width: 64, height: 64, marginBottom: 16 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 Q 50 10 90 50 Q 50 90 10 50 Z" stroke="#D4AF37" strokeWidth="4" />
            <circle cx="50" cy="50" r="15" fill="#D4AF37" />
            <path d="M50 65 L 50 90" stroke="#D4AF37" strokeWidth="6" />
            <path d="M35 50 Q 20 80 15 90" stroke="#D4AF37" strokeWidth="4" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(28px, 6vw, 48px)',
            color: '#D4AF37',
            fontWeight: 'bold',
            letterSpacing: '0.2em',
            margin: 0,
            animation: 'glowRed 3s ease-in-out infinite alternate',
            textAlign: 'center',
          }}
        >
          THE TOMB HAS JUDGED.
        </motion.h1>

        <div style={{
          fontFamily: 'serif',
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: 'rgba(212, 175, 55, 0.7)',
          lineHeight: 1.8,
          textAlign: 'center',
          maxWidth: '80%',
        }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} style={{ marginBottom: '1.5em' }}>
            You have stepped into the depths — through shadows of logic, 
            fragments of cipher, and paths that twist beyond reason.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }} style={{ marginBottom: '1.5em' }}>
            But not all who enter are meant to emerge victorious.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} style={{ marginBottom: '1.5em' }}>
            The ancient ones have watched in silence. They have weighed your mind 
            against the eternal scale… and this time, the balance faltered.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 1 }} style={{ marginBottom: '1.5em' }}>
            Your journey ends here — not in glory, but in echo. Your name fades 
            among the countless who dared, yet could not claim the truth buried within.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} style={{ marginBottom: '1.5em' }}>
            The walls remember your attempt. The silence records your fall.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 1 }} style={{ marginBottom: '2.5em' }}>
            The tomb remains unconquered.
            <br/><br/>
            The hunt continues… without you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-block',
              background: '#000000',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '16px 40px',
              fontFamily: 'sans-serif',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.15em',
              textDecoration: 'none',
              transition: 'all 0.3s',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 0, 0, 0.6)';
              e.currentTarget.style.textShadow = '0 0 10px #8B0000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Return to the Surface
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
