/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0C1310',
        gap: '16px'
      }}>
        <Loader2 size={40} color="#9BD26A" className="animate-spin" />
        <p style={{ color: '#93A99D', fontWeight: 600, fontSize: '0.95rem' }}>Memeriksa sesi admin...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
