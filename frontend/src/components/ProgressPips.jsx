export default function ProgressPips({ total = 5, current = 0, suit = 'spades' }) {
  const suitColors = {
    spades:   '#7B6EF6',
    hearts:   '#F04A57',
    diamonds: '#F5C542',
    clubs:    '#1BE0D4',
  };
  const color = suitColors[suit] || '#7B6EF6';

  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width:  i < current ? 24 : 10,
            height: 10,
            borderRadius: 5,
            background: i < current ? color : 'var(--border)',
            transition: 'all 0.3s ease',
            boxShadow: i < current ? `0 0 8px ${color}60` : 'none',
          }}
        />
      ))}
    </div>
  );
}
