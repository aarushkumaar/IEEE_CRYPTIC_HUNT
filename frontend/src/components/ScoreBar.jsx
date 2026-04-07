import Timer from './Timer';

const ROUND_NAMES = {
  1: 'Code & Logic',
  2: 'Lateral Thinking',
  3: 'Advanced',
  4: 'Wildcard',
};

const SUIT_GLYPHS = { 1: '𓅓', 2: '𓃒', 3: '𓆙', 4: '𓋹' };

export default function ScoreBar({ progress, score, startTime }) {
  const round           = progress?.round ?? 1;
  const questionInRound = progress?.questionInRound ?? 1;
  const totalQuestions  = progress?.totalQuestions ?? 12;
  const glyph = SUIT_GLYPHS[round] || '𓂀';

  return (
    <div
      className="score-bar-egypt"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 48,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: 12,
      }}
    >
      {/* Left — Round info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ fontSize: 16, filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.5))' }}>{glyph}</span>
        <span style={{
          fontFamily: '"Cinzel", serif',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: '0.12em',
          color: '#C9A84C',
          whiteSpace: 'nowrap',
        }}>
          ROUND {round}
        </span>
        <span style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: 11,
          color: 'rgba(138,122,90,0.7)',
          display: 'none',
        }}
        className="sm-show"
        >
          — {ROUND_NAMES[round]}
        </span>
        <span style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.1em',
          color: 'rgba(201,168,76,0.4)',
          marginLeft: 4,
        }}>
          Q{questionInRound}/{Math.ceil(totalQuestions / 3)}
        </span>
      </div>

      {/* Center — Score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 9,
          letterSpacing: '0.2em',
          color: 'rgba(201,168,76,0.45)',
        }}>
          SCORE
        </span>
        <span style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 18,
          color: '#C9A84C',
          textShadow: '0 0 12px rgba(201,168,76,0.4)',
        }}>
          {score ?? 0}
        </span>
      </div>

      {/* Right — Timer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: 14 }}>⏳</span>
        <Timer
          startTime={startTime}
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 11,
            color: 'rgba(201,168,76,0.6)',
            letterSpacing: '0.1em',
          }}
        />
      </div>
    </div>
  );
}
