import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/* ── Helpers ──────────────────────────────────────────────────────── */
function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', { hour12: false });
}

// Format timestamp as DD MMM YYYY, HH:MM:SS in IST
function formatIST(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function StatusBadge({ player }) {
  if (player.disqualified) return <Badge label="DISQUALIFIED" bg="rgba(192,57,43,0.18)" color="#C0392B" />;
  if (player.game_finished) return <Badge label="FINISHED" bg="rgba(201,168,76,0.12)" color="#C9A84C" />;
  const map = {
    playing: { bg: 'rgba(39,174,96,0.12)', color: '#27AE60',  label: 'PLAYING' },
    passed:  { bg: 'rgba(39,174,96,0.12)', color: '#27AE60',  label: 'PASSED'  },
    failed:  { bg: 'rgba(192,57,43,0.12)', color: '#C0392B',  label: 'FAILED'  },
    waiting: { bg: 'rgba(100,100,100,0.15)', color: '#888',   label: 'WAITING' },
  };
  const s = map[player.status] || { bg: 'transparent', color: '#888', label: player.status?.toUpperCase() ?? '—' };
  return <Badge label={s.label} bg={s.bg} color={s.color} />;
}

function Badge({ label, bg, color }) {
  return (
    <span style={{
      background: bg,
      color,
      fontFamily: '"Cinzel", serif',
      fontSize: 8,
      letterSpacing: '0.1em',
      padding: '3px 8px',
      borderRadius: 2,
      border: `1px solid ${color}40`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'rgba(201,168,76,0.04)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 4,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <span style={{
        fontFamily: '"Cinzel Decorative", serif',
        fontSize: 24,
        color: color || '#C9A84C',
        lineHeight: 1,
      }}>
        {value ?? 0}
      </span>
      <span style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 8,
        letterSpacing: '0.2em',
        color: 'rgba(201,168,76,0.45)',
      }}>
        {label.toUpperCase()}
      </span>
    </div>
  );
}

/* ── Egyptian-themed per-player reset modal ───────────────────────── */
function ResetPlayerModal({ player, onConfirm, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500,
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 16 }}
        style={{
          background: '#0A0A0A',
          border: '2px solid rgba(201,168,76,0.4)',
          borderRadius: 4,
          padding: '40px 36px',
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {[
          { top: 8, left: 8,    borderTop: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
          { top: 8, right: 8,   borderTop: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
          { bottom: 8, left: 8,  borderBottom: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
          { bottom: 8, right: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
        ))}

        <div style={{ fontSize: 40, marginBottom: 16, filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.4))' }}>𓂀</div>

        <p style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 15,
          color: '#E8D5A0',
          marginBottom: 8,
          letterSpacing: '0.05em',
        }}>
          Reset Initiate?
        </p>
        <p style={{
          fontFamily: '"IM Fell English", serif',
          fontStyle: 'italic',
          fontSize: 13,
          color: 'rgba(232,213,160,0.5)',
          marginBottom: 24,
          lineHeight: 1.6,
        }}>
          All progress for <strong style={{ color: '#C9A84C' }}>{player.name || player.email}</strong> will be erased.
          Their session, score, attempts, and disqualification will be cleared.
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.6)',
              padding: '12px 16px',
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              background: 'rgba(201,168,76,0.12)',
              border: '2px solid rgba(201,168,76,0.5)',
              color: '#C9A84C',
              padding: '12px 16px',
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            RESET ↺
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Admin component ─────────────────────────────────────────── */
export default function Admin() {
  const [secret, setSecret]       = useState('');
  const [authed, setAuthed]       = useState(false);
  const [players, setPlayers]     = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState('');
  const [sortBy, setSortBy]       = useState('score');
  const [sortDir, setSortDir]     = useState('desc');
  const [tab, setTab]             = useState('players'); // 'players' | 'analytics'
  const [resetConfirm, setResetConfirm]   = useState(false);
  const [resetInput, setResetInput]       = useState('');
  const [resetPlayer, setResetPlayer]     = useState(null); // player object for per-player modal
  const [toast, setToast]                 = useState(null);
  const intervalRef = useRef(null);

  const envSecret = import.meta.env.VITE_ADMIN_SECRET;

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
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

  async function fetchAnalytics() {
    try {
      const { data } = await adminApi().get('/admin/analytics');
      setAnalytics(data || []);
    } catch {}
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
    fetchAnalytics();
    fetchStats();
    intervalRef.current = setInterval(() => {
      fetchPlayers();
      fetchAnalytics();
      fetchStats();
    }, 30000);
    return () => clearInterval(intervalRef.current);
  }, [authed]);

  async function handleResetPlayer(id, name) {
    try {
      await adminApi().post(`/admin/player/${id}/reset`);
      showToast(`${name || 'Player'} reset successfully`);
      setResetPlayer(null);
      fetchPlayers();
      fetchAnalytics();
      fetchStats();
    } catch {
      showToast('Reset failed', 'error');
      setResetPlayer(null);
    }
  }

  async function handleDeletePlayer(id, name) {
    if (!confirm(`Permanently delete ${name}? This cannot be undone.`)) return;
    try {
      await adminApi().delete(`/admin/player/${id}`);
      showToast(`${name} deleted`);
      fetchPlayers();
      fetchAnalytics();
      fetchStats();
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
      fetchPlayers();
      fetchAnalytics();
      fetchStats();
    } catch {
      showToast('Global reset failed', 'error');
    }
  }

  function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(players.map(p => ({
      Name:            p.name || p.email,
      Score:           p.score,
      Status:          p.status,
      Disqualified:    p.disqualified ? 'Yes' : 'No',
      'Game Finished': p.game_finished ? 'Yes' : 'No',
      'Time (s)':      p.time_taken_seconds,
      'Hints Used':    p.hints_used,
      'Game Entry':    p.game_start_time,
      Started:         p.time_started,
      Ended:           p.time_ended,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Players');
    XLSX.writeFile(wb, 'cryptic-hunt-2026-results.xlsx');
    showToast('Excel exported!');
  }

  function exportToCSV() {
    const rows = players.map(p => ({
      Name:            p.name || p.email,
      Score:           p.score,
      Status:          p.status,
      Disqualified:    p.disqualified ? 'Yes' : 'No',
      'Game Finished': p.game_finished ? 'Yes' : 'No',
      'Time (s)':      p.time_taken_seconds ?? '',
      'Hints Used':    p.hints_used,
      'Game Entry':    p.game_start_time ?? '',
      Started:         p.time_started ?? '',
      Ended:           p.time_ended ?? '',
    }));
    const headers = Object.keys(rows[0] || {});
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => `"${r[h] ?? ''}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'cryptic-hunt-2026-results.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported!');
  }

  function toggleSort(col) {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  }

  const sourceData = tab === 'analytics' ? analytics : players;
  const sorted = [...sourceData]
    .filter(p => {
      const name = p.name || p.email || '';
      return name.toLowerCase().includes(search.toLowerCase());
    })
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

  const thStyle = {
    fontFamily: '"Cinzel", serif',
    fontSize: 8,
    letterSpacing: '0.15em',
    color: 'rgba(201,168,76,0.5)',
    padding: '10px 12px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(201,168,76,0.12)',
    background: 'rgba(0,0,0,0.6)',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    fontFamily: '"IM Fell English", serif',
    fontSize: 13,
    color: '#E8D5A0',
    padding: '10px 12px',
    borderBottom: '1px solid rgba(201,168,76,0.06)',
    verticalAlign: 'middle',
  };

  /* ── Login screen ───────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#0A0A0A',
            border: '2px solid rgba(201,168,76,0.4)',
            borderRadius: 4,
            padding: '48px 40px',
            width: '100%',
            maxWidth: 380,
            margin: '0 16px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {[
            { top: 8, left: 8,    borderTop: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
            { top: 8, right: 8,   borderTop: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
            { bottom: 8, left: 8,  borderBottom: '2px solid rgba(201,168,76,0.6)', borderLeft:  '2px solid rgba(201,168,76,0.6)' },
            { bottom: 8, right: 8, borderBottom: '2px solid rgba(201,168,76,0.6)', borderRight: '2px solid rgba(201,168,76,0.6)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
          ))}

          <div style={{ fontSize: 44, marginBottom: 20, filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.4))' }}>𓂀</div>
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 18,
            color: '#C9A84C',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}>
            ADMIN ACCESS
          </h1>
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.25em',
            color: 'rgba(201,168,76,0.4)',
            marginBottom: 28,
          }}>
            IDENTIFY THYSELF, OVERSEER
          </p>

          <form onSubmit={authAdmin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              id="admin-secret-input"
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              required
              style={{
                background: '#111',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#E8D5A0',
                padding: '12px 16px',
                fontFamily: '"IM Fell English", serif',
                fontSize: 14,
                outline: 'none',
                textAlign: 'center',
                borderRadius: 2,
              }}
            />
            <button
              id="admin-login-btn"
              type="submit"
              style={{
                background: '#C9A84C',
                color: '#000',
                border: 'none',
                padding: '14px 24px',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.2em',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            >
              AUTHENTICATE
            </button>
          </form>

          {toast && (
            <p style={{
              marginTop: 16,
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              fontSize: 13,
              color: '#C0392B',
            }}>
              {toast.msg}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ──────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#E8D5A0' }}>
      {/* Topbar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,6,6,0.96)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        backdropFilter: 'blur(12px)',
        padding: '0 28px',
        height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>𓂀</span>
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 14,
            color: '#C9A84C',
            letterSpacing: '0.12em',
          }}>
            AMENTIS ADMIN
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            id="export-excel-btn"
            onClick={exportToExcel}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.7)',
              padding: '7px 14px',
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.7)'}
          >
            📥 EXCEL
          </button>
          <button
            id="export-csv-btn"
            onClick={exportToCSV}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.7)',
              padding: '7px 14px',
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            📥 CSV
          </button>
          <button
            id="reset-all-btn"
            onClick={() => setResetConfirm(true)}
            style={{
              background: 'rgba(192,57,43,0.12)',
              border: '1px solid rgba(192,57,43,0.4)',
              color: '#C0392B',
              padding: '7px 14px',
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            RESET ALL
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 28px' }}>

        {/* Stats row */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 12,
            marginBottom: 24,
          }}>
            <StatCard label="Total"        value={stats.total}        color="#E8D5A0" />
            <StatCard label="Playing"      value={stats.playing}      color="#27AE60" />
            <StatCard label="Passed"       value={stats.passed}       color="#C9A84C" />
            <StatCard label="Failed"       value={stats.failed}       color="#C0392B" />
            <StatCard label="Waiting"      value={stats.waiting}      color="rgba(201,168,76,0.4)" />
            <StatCard label="Disqualified" value={stats.disqualified} color="#C0392B" />
          </div>
        )}

        {/* Tab bar */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          marginBottom: 16,
          gap: 0,
        }}>
          {[
            { key: 'players',   label: 'PLAYERS' },
            { key: 'analytics', label: 'ANALYTICS' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: tab === t.key ? '2px solid #C9A84C' : '2px solid transparent',
                color: tab === t.key ? '#C9A84C' : 'rgba(201,168,76,0.4)',
                fontFamily: '"Cinzel", serif',
                fontSize: 10,
                letterSpacing: '0.2em',
                padding: '10px 24px',
                marginBottom: -1,
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <input
            id="admin-search"
            placeholder="Search by name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#E8D5A0',
              padding: '8px 14px',
              fontFamily: '"IM Fell English", serif',
              fontSize: 13,
              outline: 'none',
              borderRadius: 2,
              width: 220,
            }}
          />
          <span style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.15em',
            color: 'rgba(201,168,76,0.35)',
          }}>
            {sorted.length} / {sourceData.length} records
          </span>
          <button
            onClick={() => { fetchPlayers(); fetchAnalytics(); fetchStats(); }}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'rgba(201,168,76,0.5)',
              padding: '7px 14px',
              fontFamily: '"Cinzel", serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            ↻ REFRESH
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <span style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.3em', color: 'rgba(201,168,76,0.4)' }}>
              CONSULTING THE ORACLE…
            </span>
          </div>
        ) : tab === 'players' ? (
          <div style={{ overflowX: 'auto', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 4 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
              <thead>
                <tr>
                  {[
                    ['Name',         'name'],
                    ['Score',        'score'],
                    ['Status',       'status'],
                    ['Time',         'time_taken_seconds'],
                    ['Hints',        'hints_used'],
                    ['DQ?',          'disqualified'],
                    ['Login Time',   'login_time'],
                    ['Logout Time',  'logout_time'],
                  ].map(([label, col]) => (
                    <th key={col} onClick={() => toggleSort(col)} style={thStyle}>
                      {label} <SortIcon col={col} />
                    </th>
                  ))}
                  <th style={{ ...thStyle, cursor: 'default' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: 'rgba(201,168,76,0.3)' }}>
                      No players yet.
                    </td>
                  </tr>
                ) : sorted.map(player => (
                  <tr
                    key={player.id}
                    style={{ background: player.disqualified ? 'rgba(192,57,43,0.04)' : 'transparent' }}
                    onMouseEnter={e => e.currentTarget.style.background = player.disqualified ? 'rgba(192,57,43,0.08)' : 'rgba(201,168,76,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = player.disqualified ? 'rgba(192,57,43,0.04)' : 'transparent'}
                  >
                    <td style={tdStyle}>
                      <div style={{ fontFamily: '"Cinzel", serif', fontSize: 12, color: '#C9A84C' }}>
                        {player.name || '—'}
                      </div>
                      <div style={{ fontFamily: '"IM Fell English", serif', fontSize: 11, color: 'rgba(201,168,76,0.4)' }}>
                        {player.email || ''}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, fontFamily: '"Cinzel Decorative", serif', fontSize: 18, color: '#C9A84C' }}>
                      {player.score}
                    </td>
                    <td style={tdStyle}><StatusBadge player={player} /></td>
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>
                      {formatTime(player.time_taken_seconds)}
                    </td>
                    <td style={{ ...tdStyle, color: 'rgba(201,168,76,0.5)', fontSize: 12 }}>
                      {player.hints_used ?? 0}
                    </td>
                    <td style={tdStyle}>
                      {player.disqualified
                        ? <span style={{ color: '#C0392B', fontSize: 14 }}>✗</span>
                        : <span style={{ color: 'rgba(201,168,76,0.25)', fontSize: 12 }}>—</span>
                      }
                    </td>
                    <td style={{ ...tdStyle, fontSize: 10, color: 'rgba(201,168,76,0.55)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      {formatIST(player.login_time) || '—'}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 10, fontFamily: 'monospace', whiteSpace: 'nowrap',
                      color: player.logout_time ? 'rgba(201,168,76,0.55)' : '#27AE60' }}>
                      {player.logout_time ? formatIST(player.logout_time) : 'Still Active'}
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => setResetPlayer(player)}
                          title="Reset player"
                          style={{
                            background: 'rgba(201,168,76,0.08)',
                            color: '#C9A84C',
                            border: '1px solid rgba(201,168,76,0.25)',
                            padding: '5px 10px',
                            fontFamily: '"Cinzel", serif',
                            fontSize: 11,
                            cursor: 'pointer',
                            borderRadius: 2,
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
                        >
                          ↺
                        </button>
                        <button
                          onClick={() => handleDeletePlayer(player.id, player.name || player.email)}
                          title="Delete player"
                          style={{
                            background: 'rgba(192,57,43,0.08)',
                            color: '#C0392B',
                            border: '1px solid rgba(192,57,43,0.25)',
                            padding: '5px 10px',
                            fontFamily: '"Cinzel", serif',
                            fontSize: 11,
                            cursor: 'pointer',
                            borderRadius: 2,
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* ── Analytics Tab ──────────────────────────────────── */
          <div style={{ overflowX: 'auto', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 4 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
              <thead>
                <tr>
                  {[
                    ['Name',          'name'],
                    ['Score',         'score'],
                    ['Round',         'current_round'],
                    ['Q Completed',   'questions_completed'],
                    ['Q Attempted',   'questions_attempted'],
                    ['Avg Time/Q',    'avg_time_per_q'],
                    ['Login Time',    'login_time'],
                    ['Logout Time',   'logout_time'],
                    ['Last Active',   'last_active'],
                    ['Status',        'status'],
                  ].map(([label, col]) => (
                    <th key={col} onClick={() => toggleSort(col)} style={thStyle}>
                      {label} <SortIcon col={col} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: 'rgba(201,168,76,0.3)' }}>
                      No analytics data yet.
                    </td>
                  </tr>
                ) : sorted.map(row => (
                  <tr key={row.id}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={tdStyle}>
                      <div style={{ fontFamily: '"Cinzel", serif', fontSize: 11, color: '#C9A84C' }}>{row.name}</div>
                    </td>
                    <td style={{ ...tdStyle, fontFamily: '"Cinzel Decorative", serif', fontSize: 16, color: '#C9A84C' }}>
                      {row.score}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>{row.current_round ?? '—'}</td>
                    <td style={{ ...tdStyle, fontSize: 12, color: '#27AE60' }}>{row.questions_completed ?? 0}</td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>{row.questions_attempted ?? 0}</td>
                    <td style={{ ...tdStyle, fontSize: 12, fontFamily: 'monospace' }}>
                      {row.avg_time_per_q ? `${row.avg_time_per_q}s` : '—'}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 10, fontFamily: 'monospace', whiteSpace: 'nowrap', color: 'rgba(201,168,76,0.55)' }}>
                      {formatIST(row.login_time) || '—'}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 10, fontFamily: 'monospace', whiteSpace: 'nowrap',
                      color: row.logout_time ? 'rgba(201,168,76,0.55)' : '#27AE60' }}>
                      {row.logout_time ? formatIST(row.logout_time) : 'Still Active'}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 11, fontFamily: 'monospace', color: 'rgba(201,168,76,0.45)' }}>
                      {row.last_active ? formatIST(row.last_active) : '—'}
                    </td>
                    <td style={tdStyle}><StatusBadge player={row} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Per-player Reset Modal ─────────────────── */}
      <AnimatePresence>
        {resetPlayer && (
          <ResetPlayerModal
            player={resetPlayer}
            onConfirm={() => handleResetPlayer(resetPlayer.id, resetPlayer.name || resetPlayer.email)}
            onClose={() => setResetPlayer(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Global Reset Confirm Modal ──────────────── */}
      <AnimatePresence>
        {resetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 300,
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 12 }}
              style={{
                background: '#0A0A0A',
                border: '2px solid rgba(192,57,43,0.5)',
                borderRadius: 4,
                padding: '40px 36px',
                maxWidth: 380,
                width: '90%',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
              <p style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 16,
                color: '#C0392B',
                marginBottom: 12,
                letterSpacing: '0.05em',
              }}>
                Reset ALL Players?
              </p>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontStyle: 'italic',
                fontSize: 13,
                color: 'rgba(232,213,160,0.5)',
                marginBottom: 24,
                lineHeight: 1.6,
              }}>
                This will erase all sessions, scores, attempts, and disqualifications.
                Type <strong style={{ color: '#C0392B' }}>RESET</strong> to confirm.
              </p>
              <input
                id="reset-confirm-input"
                placeholder="Type RESET"
                value={resetInput}
                onChange={e => setResetInput(e.target.value)}
                style={{
                  background: '#111',
                  border: '1px solid rgba(192,57,43,0.4)',
                  color: '#E8D5A0',
                  padding: '10px 14px',
                  fontFamily: '"IM Fell English", serif',
                  fontSize: 14,
                  outline: 'none',
                  borderRadius: 2,
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: 20,
                }}
              />
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => { setResetConfirm(false); setResetInput(''); }}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: 'rgba(201,168,76,0.6)',
                    padding: '12px 16px',
                    fontFamily: '"Cinzel", serif',
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    borderRadius: 2,
                  }}
                >
                  CANCEL
                </button>
                <button
                  onClick={resetAll}
                  disabled={resetInput !== 'RESET'}
                  style={{
                    flex: 1,
                    background: resetInput === 'RESET' ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.08)',
                    border: `2px solid ${resetInput === 'RESET' ? 'rgba(192,57,43,0.8)' : 'rgba(192,57,43,0.2)'}`,
                    color: resetInput === 'RESET' ? '#C0392B' : 'rgba(192,57,43,0.4)',
                    padding: '12px 16px',
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    cursor: resetInput === 'RESET' ? 'pointer' : 'not-allowed',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                  }}
                >
                  CONFIRM RESET
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: toast.type === 'error' ? 'rgba(192,57,43,0.95)' : 'rgba(39,174,96,0.95)',
              color: '#fff',
              fontFamily: '"Cinzel", serif',
              fontSize: 11,
              letterSpacing: '0.15em',
              padding: '12px 28px',
              borderRadius: 4,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
