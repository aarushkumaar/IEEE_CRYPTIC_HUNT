import { useState, useEffect } from 'react';
import { MOCK_MODE, mockApiLib } from '../lib/api';

export default function MockDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!MOCK_MODE) return;

    const interval = setInterval(() => {
      setState(mockApiLib.mockGetState());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!MOCK_MODE) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: 11,
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          background: '#222',
          color: '#0f0',
          border: '1px solid #0f0',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 11,
          marginBottom: isOpen ? 8 : 0,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.target.style.boxShadow = '0 0 10px #0f0'}
        onMouseLeave={e => e.target.style.boxShadow = 'none'}
      >
        {isOpen ? '▼ MOCK DEVTOOLS' : '▶ MOCK DEVTOOLS'}
      </button>

      {/* State panel */}
      {isOpen && state && (
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #0f0',
          borderRadius: 4,
          padding: 12,
          color: '#0f0',
          maxWidth: 300,
          maxHeight: 400,
          overflowY: 'auto',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
        }}>
          <div style={{ marginBottom: 12, borderBottom: '1px solid #0f0', paddingBottom: 8 }}>
            <strong>GAME STATE</strong>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div>Round: <strong>{state.currentRound}/4</strong></div>
            <div>Question: <strong>{state.currentQuestion + 1}</strong></div>
            <div>Score: <strong>{state.score}</strong></div>
          </div>

          <div style={{ marginBottom: 8, borderBottom: '1px solid #0f03', paddingBottom: 8 }}>
            <div>Session: {state.hasSession ? '✓ ACTIVE' : '✗ INACTIVE'}</div>
            <div>Completed: {state.completed ? '✓ YES' : '✗ NO'}</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Attempts Used:</strong>
            <div style={{ fontSize: 10, marginTop: 4 }}>
              {Object.entries(state.attempts).map(([round, data]) => (
                <div key={round}>
                  Round {round}: {data.used}/{data.max}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            marginTop: 12,
          }}>
            <button
              onClick={() => {
                mockApiLib.mockReset();
                setState(mockApiLib.mockGetState());
              }}
              style={{
                padding: '4px 8px',
                background: '#0f0',
                color: '#000',
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            >
              RESET
            </button>

            <button
              onClick={() => {
                mockApiLib.mockAdvanceRound();
                setState(mockApiLib.mockGetState());
              }}
              style={{
                padding: '4px 8px',
                background: '#0f0',
                color: '#000',
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            >
              NEXT ROUND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
