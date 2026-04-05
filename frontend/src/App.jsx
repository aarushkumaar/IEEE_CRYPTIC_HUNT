import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Landing     from './pages/Landing';
import Welcome     from './pages/Welcome';
import Game        from './pages/Game';
import Wildcard    from './pages/Wildcard';
import Rumbling    from './pages/Rumbling';
import Pass        from './pages/Pass';
import Fail        from './pages/Fail';
import Leaderboard from './pages/Leaderboard';
import Admin       from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/"            element={<Landing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin"       element={<Admin />} />

        {/* Protected game routes — requires auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome"  element={<Welcome />} />
          <Route path="/round/:n" element={<Game />} />
          <Route path="/rumbling" element={<Rumbling />} />
          <Route path="/wildcard" element={<Wildcard />} />
          <Route path="/pass"     element={<Pass />} />
          <Route path="/fail"     element={<Fail />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
