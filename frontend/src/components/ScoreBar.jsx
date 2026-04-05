import Timer from './Timer';
import SuitIcon from './SuitIcon';

const ROUND_NAMES = {
  1: 'Code & Logic',
  2: 'Lateral Thinking',
  3: 'Advanced',
  4: 'Wildcard',
};

const ROUND_SUITS = {
  1: 'spades',
  2: 'hearts',
  3: 'diamonds',
  4: 'clubs',
};

export default function ScoreBar({ progress, score, startTime }) {
  const round = progress?.round ?? 1;
  const questionInRound = progress?.questionInRound ?? 1;
  const suit = ROUND_SUITS[round];

  return (
    <div
      className="w-full flex items-center justify-between px-4 md:px-8 py-3"
      style={{
        background: 'rgba(8,8,14,0.9)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Round + Question */}
      <div className="flex items-center gap-2">
        <SuitIcon suit={suit} size={18} />
        <span className="font-display font-semibold text-sm text-text-primary">
          Round {round}
        </span>
        <span className="text-text-faint text-xs hidden sm:inline">— {ROUND_NAMES[round]}</span>
        <span className="text-text-secondary text-xs ml-1">
          · Q{questionInRound}/5
        </span>
      </div>

      {/* Center: Score */}
      <div className="flex items-center gap-1">
        <span className="text-text-secondary text-xs font-body">Score</span>
        <span
          className="font-display font-bold text-lg"
          style={{ color: 'var(--accent)' }}
        >
          {score ?? 0}
        </span>
      </div>

      {/* Right: Timer */}
      <div className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-faint">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <Timer startTime={startTime} className="text-sm" />
      </div>
    </div>
  );
}
