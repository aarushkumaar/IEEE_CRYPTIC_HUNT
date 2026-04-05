import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-text-secondary font-body text-sm">Authenticating…</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
