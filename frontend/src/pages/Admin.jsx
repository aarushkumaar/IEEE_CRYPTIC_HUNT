import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2,'0')}s`;
}

function StatCard({ label, value, color }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <span className="font-display font-bold text-2xl" style={{ color: color || 'var(--accent)' }}>
        {value}
      </span>
      <span className="font-body text-xs" style={{ color: 'var(--text-faint)' }}>{label}</span>
    </div>
  );
}

export default function Admin() {
  const [secret, setSecret]       = useState('');
  const [authed, setAuthed]       = useState(false);
  const [players, setPlayers]     = useState([]);
  const [stats, setStats]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState('');
  const [sortBy, setSortBy]       = useState('score');
  const [sortDir, setSortDir]     = useState('desc');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetInput, setResetInput]     = useState('');
  const [toast, setToast]         = useState(null);
  const intervalRef = useRef(null);

  const envSecret = import.meta.env.VITE_ADMIN_SECRET;

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function authAdmin(e) {
    e.preventDefault();
    if (secret === envSecret) {
      setAuthed(true);
    } else {
      showToast('Invalid admin secret', 'error');
    }
  }

  function adminApi() {
    return axios.create({
      baseURL: API_URL,
      headers: { 'x-admin-secret': secret },
    });
  }

  async function fetchPlayers() {
    setLoading(true);
    try {
      const { data } = await adminApi().get('/admin/players');
      setPlayers(data || []);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to load players', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const { data } = await adminApi().get('/admin/stats');
      setStats(data);
    } catch {}
  }

  useEffect(() => {
    if (!authed) return;
    fetchPlayers();
    fetchStats();
    // Poll every 30s
    intervalRef.current = setInterval(() => { fetchPlayers(); fetchStats(); }, 30000);
    return () => clearInterval(intervalRef.current);
  }, [authed]);

  async function resetPlayer(id, name) {
    if (!confirm(`Reset ${name}'s session and score?`)) return;
    try {
      await adminApi().post(`/admin/player/${id}/reset`);
      showToast(`${name} reset successfully`);
      fetchPlayers(); fetchStats();
    } catch {
      showToast('Reset failed', 'error');
    }
  }

  async function deletePlayer(id, name) {
    if (!confirm(`Permanently delete ${name}? This cannot be undone.`)) return;
    try {
      await adminApi().delete(`/admin/player/${id}`);
      showToast(`${name} deleted`);
      fetchPlayers(); fetchStats();
    } catch {
      showToast('Delete failed', 'error');
    }
  }

  async function resetAll() {
    if (resetInput !== 'RESET') return;
    try {
      await adminApi().post('/admin/reset');
      showToast('All sessions reset successfully');
      setResetConfirm(false);
      setResetInput('');
      fetchPlayers(); fetchStats();
    } catch {
      showToast('Global reset failed', 'error');
    }
  }

  function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(players.map(p => ({
      Name: p.name,
      Score: p.score,
      Status: p.status,
      'Time (seconds)': p.time_taken_seconds,
      'Hints Used': p.hints_used,
      Started: p.time_started,
      Ended: p.time_ended,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Players');
    XLSX.writeFile(wb, 'cryptic-hunt-2026-results.xlsx');
    showToast('Excel exported!');
  }

  function toggleSort(col) {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  }

  const sorted = [...players]
    .filter(p => p.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let va = a[sortBy] ?? '';
      let vb = b[sortBy] ?? '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <span style={{ opacity: 0.3 }}>↕</span>;
    return <span>{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  // ── Login Screen ─────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-10 w-full max-w-sm mx-4 text-center"
        >
          <div className="text-3xl mb-4">🔐</div>
          <h1 className="font-display font-bold text-xl text-text-primary mb-6">Admin Access</h1>
          <form onSubmit={authAdmin} className="flex flex-col gap-4">
            <input
              id="admin-secret-input"
              className="input-dark text-center"
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              required
            />
            <button id="admin-login-btn" type="submit" className="btn-primary py-3">
              Authenticate
            </button>
          </form>
          {toast && (
            <p className="mt-4 text-sm" style={{ color: 'var(--danger)' }}>{toast.msg}</p>
          )}
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Topbar */}
      <div
        className="sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(8,8,14,0.95)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <h1 className="font-display font-bold text-text-primary">
          ⚙️ ADMIN DASHBOARD
        </h1>
        <div className="flex items-center gap-3">
          <button
            id="export-btn"
            onClick={exportToExcel}
            className="btn-ghost text-sm px-4 py-2"
          >
            📥 Export Excel
          </button>
          <button
            id="reset-all-btn"
            onClick={() => setResetConfirm(true)}
            className="text-sm px-4 py-2 rounded-lg font-display font-semibold"
            style={{ background: 'rgba(240,74,87,0.15)', color: 'var(--danger)', border: '1px solid rgba(240,74,87,0.3)', cursor: 'pointer' }}
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats row */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <StatCard label="Total Players" value={stats.total}   color="var(--text-primary)" />
            <StatCard label="Playing"        value={stats.playing} color="var(--accent)" />
            <StatCard label="Passed"         value={stats.passed}  color="var(--success)" />
            <StatCard label="Failed"         value={stats.failed}  color="var(--danger)" />
            <StatCard label="Waiting"        value={stats.waiting} color="var(--text-faint)" />
          </div>
        )}

        {/* Search bar */}
        <div className="mb-4 flex items-center gap-3">
          <input
            id="admin-search"
            className="input-dark max-w-xs"
            placeholder="Search players…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="font-body text-sm" style={{ color: 'var(--text-faint)' }}>
            {sorted.length} / {players.length} players
          </span>
          <button onClick={fetchPlayers} className="btn-ghost text-xs px-3 py-2 ml-auto">
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-16"><div className="spinner" /></div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {/* Header */}
            <div
              className="grid text-xs font-body font-medium px-4 py-3"
              style={{
                gridTemplateColumns: '1fr 70px 80px 100px 60px 80px',
                background: 'var(--bg-elevated)',
                color: 'var(--text-faint)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {[
                ['Name', 'name'],
                ['Score', 'score'],
                ['Status', 'status'],
                ['Time', 'time_taken_seconds'],
                ['Hints', 'hints_used'],
              ].map(([label, col]) => (
                <span
                  key={col}
                  onClick={() => toggleSort(col)}
                  className="cursor-pointer select-none hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  {label} <SortIcon col={col} />
                </span>
              ))}
              <span>Actions</span>
            </div>

            {/* Rows */}
            {sorted.length === 0 ? (
              <div className="text-center py-12 font-body text-sm" style={{ color: 'var(--text-faint)' }}>
                No players yet.
              </div>
            ) : (
              sorted.map(player => (
                <div
                  key={player.id}
                  className="grid items-center px-4 py-3 border-b last:border-b-0 font-body text-sm"
                  style={{
                    gridTemplateColumns: '1fr 70px 80px 100px 60px 80px',
                    borderColor: 'var(--border)',
                    background: 'var(--bg-card)',
                  }}
                >
                  <span className="text-text-primary font-medium truncate">{player.name}</span>
                  <span className="font-display font-bold" style={{ color: 'var(--accent)' }}>{player.score}</span>
                  <span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: {
                          playing: 'rgba(123,110,246,0.12)',
                          passed:  'rgba(34,215,123,0.12)',
                          failed:  'rgba(240,74,87,0.12)',
                          waiting: 'rgba(74,74,106,0.12)',
                        }[player.status],
                        color: {
                          playing: 'var(--accent)',
                          passed:  'var(--success)',
                          failed:  'var(--danger)',
                          waiting: 'var(--text-faint)',
                        }[player.status],
                      }}
                    >
                      {player.status}
                    </span>
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {formatTime(player.time_taken_seconds)}
                  </span>
                  <span style={{ color: 'var(--text-faint)' }}>{player.hints_used ?? 0}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => resetPlayer(player.id, player.name)}
                      title="Reset player"
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: 'rgba(123,110,246,0.1)',
                        color: 'var(--accent)',
                        border: '1px solid rgba(123,110,246,0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      ↺
                    </button>
                    <button
                      onClick={() => deletePlayer(player.id, player.name)}
                      title="Delete player"
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: 'rgba(240,74,87,0.1)',
                        color: 'var(--danger)',
                        border: '1px solid rgba(240,74,87,0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl font-body text-sm font-medium z-[200]"
            style={{
              background: toast.type === 'error' ? 'rgba(240,74,87,0.9)' : 'rgba(34,215,123,0.9)',
              color: 'white',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Reset Confirm Modal */}
      <AnimatePresence>
        {resetConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass rounded-2xl p-8 max-w-sm mx-4 text-center"
            >
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="font-display font-bold text-lg text-text-primary mb-2">
                Reset ALL Players?
              </h2>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                This will wipe all sessions and scores. Type <strong>RESET</strong> to confirm.
              </p>
              <input
                id="reset-confirm-input"
                className="input-dark text-center mb-4"
                placeholder="Type RESET"
                value={resetInput}
                onChange={e => setResetInput(e.target.value)}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setResetConfirm(false); setResetInput(''); }}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={resetAll}
                  disabled={resetInput !== 'RESET'}
                  className="flex-1 font-display font-semibold py-2 px-4 rounded-lg"
                  style={{
                    background: resetInput === 'RESET' ? 'var(--danger)' : 'rgba(240,74,87,0.3)',
                    color: 'white', border: 'none',
                    cursor: resetInput === 'RESET' ? 'pointer' : 'not-allowed',
                  }}
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
