import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { AdinkoLogo } from '../../assets/Logos';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      const detail = err.data?.serverMessage || err.data?.code;
      const base = err.message || 'Login gagal. Periksa kembali username dan password Anda.';
      setError(detail ? `${base} — ${detail}` : base);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #101E13 0%, #1A311F 50%, #0D1610 100%)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,111,12,0.25) 0%, rgba(0,0,0,0) 70%)',
        top: '-100px',
        right: '-100px',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(21, 34, 27, 0.94)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'rgba(111, 168, 43, 0.14)',
            marginBottom: '16px',
            border: '1px solid rgba(111, 168, 43, 0.3)'
          }}>
            <AdinkoLogo size={36} showText={false} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: 'rgba(111, 168, 43, 0.16)',
            color: 'var(--ad-accent)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '6px' }}>
            Masuk ke Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ad-muted)' }}>
            Kelola portofolio, layanan, testimoni & pesan masuk
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div role="alert" style={{
            background: 'var(--ad-danger-bg)',
            border: '1px solid var(--ad-danger-border)',
            color: 'var(--ad-danger)',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '6px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ad-faint)' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid var(--ad-input-border)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  background: 'var(--ad-input)',
                  color: 'var(--ad-heading)'
                }}
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ad-faint)' }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid var(--ad-input-border)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  background: 'var(--ad-input)',
                  color: 'var(--ad-heading)'
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--ad-faint)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              background: 'var(--green-600)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(72, 111, 12, 0.3)',
              transition: 'background 0.2s, transform 0.1s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <>
                <span>Memverifikasi Sesi...</span>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              fontSize: '0.85rem',
              color: 'var(--ad-accent)',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            ← Kembali ke Website Publik
          </a>
        </div>
      </div>
    </div>
  );
};
