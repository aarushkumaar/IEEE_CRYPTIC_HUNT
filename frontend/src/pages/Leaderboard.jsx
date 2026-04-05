import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

const STATUS_STYLES = {
  playing: { bg: 'rgba(123,110,246,0.12)', color: '#7B6EF6', label: 'Playing', dot: true },
  passed:  { bg: 'rgba(34,215,123,0.12)',  color: '#22D77B', label: 'Passed'  },
  failed:  { bg: 'rgba(240,74,87,0.12)',   color: '#F04A57', label: 'Failed'  },
  waiting: { bg: 'rgba(74,74,106,0.15)',   color: '#4A4A6A', label: 'Waiting' },
};

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2,'0')}s`;
}

function StatusBadge({ status }) {
  const st = STATUS_STYLES[status] || STATUS_STYLES.waiting;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-body font-medium"
      style={{ background: st.bg, color: st.color }}
    >
      {st.dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: st.color,
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      )}
      {st.label}
    </span>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [players, setPlayers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [flashId, setFlashId]   = useState(null);
  const myRowRef = useRef(null);

  // Initial fetch
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Supabase Realtime
  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          const updated = payload.new;
          if (!updated) return;

          setPlayers(prev => {
            const exists = prev.find(p => p.id === updated.id);
            let next;
            if (exists) {
              next = prev.map(p => p.id === updated.id ? { ...p, ...updated } : p);
            } else {
              next = [...prev, updated];
            }
            // Re-sort
            return sortPlayers(next);
          });

          setFlashId(updated.id);
          setTimeout(() => setFlashId(null), 1500);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Auto-scroll to current user
  useEffect(() => {
    if (myRowRef.current && user) {
      setTimeout(() => myRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 600);
    }
  }, [players, user]);

  async function fetchPlayers() {
    setLoading(true);
    try {
      const { data } = await api.get('/scoreboard');
      setPlayers(data || []);
    } catch {
      // fallback: query Supabase directly (public leaderboard view)
      const { data } = await supabase
        .from('profiles')
        .select('id, name, score, status, time_started, time_ended, hints_used')
        .order('score', { ascending: false });
      setPlayers(sortPlayers(data || []));
    } finally {
      setLoading(false);
    }
  }

  function sortPlayers(list) {
    return [...list].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const tA = a.time_started && a.time_ended
        ? new Date(a.time_ended) - new Date(a.time_started) : Infinity;
      const tB = b.time_started && b.time_ended
        ? new Date(b.time_ended) - new Date(b.time_started) : Infinity;
      return tA - tB;
    });
  }

  const filtered = players.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const rankStyle = (rank) => {
    if (rank === 1) return { background: 'rgba(245,197,66,0.08)', borderLeft: '3px solid var(--gold)' };
    if (rank === 2) return { background: 'rgba(174,174,174,0.06)', borderLeft: '3px solid #A8A8A8' };
    if (rank === 3) return { background: 'rgba(205,127,50,0.06)', borderLeft: '3px solid #CD7F32' };
    return {};
  };

  const rankEmoji = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div
      className="min-h-screen grid-bg"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(8,8,14,0.95)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-lg text-text-primary">
            LIVE LEADERBOARD
          </h1>
          <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: 'var(--success)' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--success)',
              animation: 'pulse 1.5s ease-in-out infinite',
              display: 'inline-block',
            }} />
            Real-time
          </span>
        </div>
        <Link to="/" className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
          ← Back
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            id="leaderboard-search"
            className="input-dark max-w-xs"
            placeholder="Search by name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner" />
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {/* Table header */}
            <div
              className="grid font-body text-xs font-medium px-4 py-3"
              style={{
                gridTemplateColumns: '60px 1fr 80px 100px 80px 80px',
                background: 'var(--bg-elevated)',
                color: 'var(--text-faint)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span>Rank</span>
              <span>Name</span>
              <span className="text-right">Score</span>
              <span className="text-right">Time</span>
              <span className="text-center">Status</span>
              <span className="text-right hidden sm:block">Hints</span>
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div className="text-center py-12 font-body text-sm" style={{ color: 'var(--text-faint)' }}>
                No players found.
              </div>
            ) : (
              filtered.map((player, idx) => {
                const rank = idx + 1;
                const timeTaken = player.time_started && player.time_ended
                  ? Math.floor((new Date(player.time_ended) - new Date(player.time_started)) / 1000)
                  : null;
                const isMe = player.id === user?.id;
                const isFlashing = player.id === flashId;

                return (
                  <motion.div
                    key={player.id}
                    ref={isMe ? myRowRef : null}
                    animate={isFlashing ? { backgroundColor: ['rgba(245,197,66,0.15)', 'rgba(0,0,0,0)'] } : {}}
                    transition={{ duration: 1.2 }}
                    className="grid items-center px-4 py-3 font-body text-sm border-b last:border-b-0 transition-colors"
                    style={{
                      gridTemplateColumns: '60px 1fr 80px 100px 80px 80px',
                      borderColor: 'var(--border)',
                      background: isMe ? 'rgba(123,110,246,0.06)' : 'var(--bg-card)',
                      outline: isMe ? '1px solid rgba(123,110,246,0.2)' : 'none',
                      ...rankStyle(rank),
                    }}
                  >
                    {/* Rank */}
                    <span className="font-display font-bold" style={{
                      color: rank <= 3
                        ? ['var(--gold)', '#A8A8A8', '#CD7F32'][rank - 1]
                        : 'var(--text-faint)',
                      fontSize: rank <= 3 ? 16 : 13,
                    }}>
                      {rankEmoji(rank)}
                    </span>

                    {/* Name */}
                    <span className="font-medium text-text-primary truncate">
                      {player.name}
                      {isMe && <span className="ml-2 text-xs" style={{ color: 'var(--accent)' }}>(you)</span>}
                    </span>

                    {/* Score */}
                    <span className="text-right font-display font-bold" style={{ color: 'var(--accent)' }}>
                      {player.score ?? 0}
                    </span>

                    {/* Time */}
                    <span className="text-right font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {formatTime(timeTaken)}
                    </span>

                    {/* Status */}
                    <span className="flex justify-center">
                      <StatusBadge status={player.status} />
                    </span>

                    {/* Hints */}
                    <span className="text-right text-xs hidden sm:block" style={{ color: 'var(--text-faint)' }}>
                      {player.hints_used ?? 0}
                    </span>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        <p className="text-center mt-6 font-body text-xs" style={{ color: 'var(--text-faint)' }}>
          Updates in real-time via Supabase · IEEE GTBIT Cryptic Hunt 2026
        </p>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
