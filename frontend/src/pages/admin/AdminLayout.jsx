import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User
} from 'lucide-react';
import { AdinkoLogo } from '../../assets/Logos';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin panel palette (single light theme)
  const sidebarBg = '#1C2A1E';
  const mainBg = '#F0F4F1';
  const borderColor = 'rgba(0,0,0,0.1)';
  const textMuted = '#556B5E';
  const navLinkColor = '#CBD8D1';

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/portofolio', icon: <FolderKanban size={20} />, label: 'Portofolio Proyek' },
    { to: '/admin/layanan', icon: <Layers size={20} />, label: 'Layanan Katalog' },
    { to: '/admin/testimoni', icon: <MessageSquare size={20} />, label: 'Testimoni & Review' },
    { to: '/admin/messages', icon: <Mail size={20} />, label: 'Pesan Konsultasi' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Pengaturan Kontak' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: mainBg }}>
      {/* Sidebar Desktop */}
      <aside style={{
        width: '270px',
        background: sidebarBg,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        borderRight: `1px solid ${borderColor}`,
        zIndex: 20
      }} className="admin-sidebar-desktop">
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '12px' }}>
            <AdinkoLogo size={28} showText={false} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Adinko x Ghazi
            </div>
            <div style={{ fontSize: '0.75rem', color: textMuted, fontWeight: 600 }}>
              Admin Management Panel
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#61796B', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px 8px 10px' }}>
            Menu Utama
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#FFFFFF' : navLinkColor,
                  background: isActive ? 'var(--green-600)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s'
                }}
              >
                <span style={{ color: isActive ? '#FFFFFF' : '#88A392' }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile & Actions */}
        <div style={{ padding: '16px 14px', borderTop: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#B2C4B8',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <span>Lihat Web Publik</span>
            <ExternalLink size={15} />
          </a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px 4px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                <User size={18} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || user?.username || 'Admin'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#88A392' }}>
                  {user?.role || 'Administrator'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: 'none',
                color: '#F87171',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile Header */}
        <header style={{
          background: sidebarBg,
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between'
        }} className="admin-header-mobile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AdinkoLogo size={24} showText={false} />
            <span style={{ fontWeight: 800, fontSize: '1rem' }}>Adinko Admin</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ background: '#1C2A1E', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: location.pathname === item.to ? 700 : 500,
                  background: location.pathname === item.to ? 'var(--green-600)' : 'transparent'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                background: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Dynamic Admin Sub-Page */}
        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
