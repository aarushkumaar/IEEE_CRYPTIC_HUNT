const SUIT_SYMBOLS = {
  spades:   '♠',
  hearts:   '♥',
  diamonds: '♦',
  clubs:    '♣',
};

const SUIT_COLORS = {
  spades:   'var(--suit-spades)',
  hearts:   'var(--suit-hearts)',
  diamonds: 'var(--suit-diamonds)',
  clubs:    'var(--suit-clubs)',
};

export default function SuitIcon({ suit, size = 24, className = '' }) {
  const symbol = SUIT_SYMBOLS[suit] || '♠';
  const color  = SUIT_COLORS[suit]  || 'var(--suit-spades)';

  return (
    <span
      className={className}
      style={{
        fontSize: size,
        color,
        lineHeight: 1,
        display: 'inline-block',
        userSelect: 'none',
      }}
      aria-label={suit}
    >
      {symbol}
    </span>
  );
}

export { SUIT_SYMBOLS, SUIT_COLORS };
