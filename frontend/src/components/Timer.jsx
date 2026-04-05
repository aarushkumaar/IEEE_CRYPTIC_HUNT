import { useTimer } from '../hooks/useTimer';

export default function Timer({ startTime, className = '' }) {
  const { formatted } = useTimer(startTime);
  return (
    <span className={`font-mono text-text-secondary tabular-nums ${className}`}>
      {formatted}
    </span>
  );
}
