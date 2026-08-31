/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Public Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalWhatsAppSticky } from './components/FloatingCta';
import { ScrollToTop } from './components/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { AboutAdinko } from './pages/AboutAdinko';
import { AboutGhazi } from './pages/AboutGhazi';
import { Layanan } from './pages/Layanan';
import { Portofolio } from './pages/Portofolio';
import { Testimoni } from './pages/Testimoni';
import { Kontak } from './pages/Kontak';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPortofolio } from './pages/admin/AdminPortofolio';
import { AdminLayanan } from './pages/admin/AdminLayanan';
import { AdminTestimoni } from './pages/admin/AdminTestimoni';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

// Public Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <GlobalWhatsAppSticky />
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. PUBLIC STATIC & DYNAMIC PAGES (Free Access Without Login) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tentang-adinko" element={<AboutAdinko />} />
            <Route path="/tentang-ghazi" element={<AboutGhazi />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/portofolio" element={<Portofolio />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/kontak" element={<Kontak />} />
          </Route>

          {/* 2. ADMIN AUTHENTICATION */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 3. PROTECTED ADMIN DASHBOARD & CRUD ROUTES */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="portofolio" element={<AdminPortofolio />} />
              <Route path="layanan" element={<AdminLayanan />} />
              <Route path="testimoni" element={<AdminTestimoni />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
