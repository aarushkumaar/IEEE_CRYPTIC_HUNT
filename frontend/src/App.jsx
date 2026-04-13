import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Landing     from './pages/Landing';
import RoundsSelection from './pages/RoundsSelection';
import Game        from './pages/Game';
import Wildcard    from './pages/Wildcard';
import Rumbling    from './pages/Rumbling';
import Pass        from './pages/Pass';
import Fail        from './pages/Fail';
import Victory     from './pages/Victory';
import Eliminated  from './pages/Eliminated';
import Leaderboard from './pages/Leaderboard';
import Admin       from './pages/Admin';
import AuthCallback  from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor   from './components/CustomCursor';
import MockDevTools from './components/MockDevTools';

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Egyptian cursor — rendered above everything */}
      <CustomCursor />

      {/* Mock DevTools — only shown when VITE_MOCK_MODE=true */}
      <MockDevTools />

      <Routes>
        {/* Public routes */}
        <Route path="/"              element={<Landing />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/leaderboard"   element={<Leaderboard />} />
        <Route path="/admin"       element={<Admin />} />

        {/* Protected game routes — requires auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/rounds"   element={<RoundsSelection />} />
          <Route path="/round/:n" element={<Game />} />
          <Route path="/rumbling" element={<Rumbling />} />
          <Route path="/wildcard" element={<Wildcard />} />
          <Route path="/pass"     element={<Pass />} />
          <Route path="/fail"     element={<Fail />} />
          <Route path="/victory"  element={<Victory />} />
          <Route path="/eliminated" element={<Eliminated />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
