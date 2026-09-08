import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRows } from '../../api';
import {
  FolderKanban,
  Layers,
  MessageSquare,
  Mail,
  ArrowUpRight,
  Plus,
  Clock,
  Phone
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    portofolio: 0,
    layanan: 0,
    testimoni: 0,
    messages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [portofolios, layanans, testimonis, messages] = await Promise.all([
          getRows('/portofolio').catch(() => []),
          getRows('/layanan').catch(() => []),
          getRows('/testimoni').catch(() => []),
          getRows('/kontak/messages').catch(() => [])
        ]);

        setStats({
          portofolio: portofolios.length,
          layanan: layanans.length,
          testimoni: testimonis.length,
          messages: messages.length
        });

        setRecentMessages(messages.slice(0, 5));
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Portofolio', count: stats.portofolio, icon: <FolderKanban size={24} />, color: '#A3E635', bg: 'rgba(163,230,53,0.12)', to: '/admin/portofolio' },
    { title: 'Katalog Layanan', count: stats.layanan, icon: <Layers size={24} />, color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', to: '/admin/layanan' },
    { title: 'Testimoni & Review', count: stats.testimoni, icon: <MessageSquare size={24} />, color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', to: '/admin/testimoni' },
    { title: 'Pesan Konsultasi Masuk', count: stats.messages, icon: <Mail size={24} />, color: '#C084FC', bg: 'rgba(192,132,252,0.12)', to: '/admin/messages' },
  ];

  return (
    <div>
      {/* Header Banner */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '6px' }}>
            Dashboard Manajemen
          </h1>
          <p style={{ color: 'var(--ad-muted)', fontSize: '0.95rem' }}>
            Kelola seluruh konten, portofolio, dan pesan konsultasi website Adinko &amp; GhaziSportsHub
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/admin/portofolio')}
            className="btn-primary-hero"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Tambah Portofolio</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {statCards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.to)}
            style={{
              background: 'var(--ad-card)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid var(--ad-border)',
              boxShadow: 'var(--ad-shadow)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </div>
              <ArrowUpRight size={18} color="var(--ad-faint)" />
            </div>

            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ad-heading)', lineHeight: 1 }}>
                {loading ? '...' : card.count}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ad-muted)', marginTop: '6px' }}>
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Messages Section */}
      <div style={{ background: 'var(--ad-card)', borderRadius: '16px', border: '1px solid var(--ad-border)', boxShadow: 'var(--ad-shadow)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--ad-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ad-heading)' }}>
              Pesan Konsultasi Terbaru
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ad-muted)', marginTop: '2px' }}>
              Permintaan survei dan konsultasi dari form kontak website
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/messages')}
            style={{ background: 'transparent', border: 'none', color: 'var(--ad-accent)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
          >
            Lihat Semua Pesan &rarr;
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ad-muted)' }}>Memuat data pesan...</div>
        ) : recentMessages.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ad-muted)' }}>Belum ada pesan konsultasi yang masuk.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--ad-subtle)', borderBottom: '1px solid var(--ad-border)', color: 'var(--ad-muted)' }}>
                  <th style={{ padding: '12px 24px', fontWeight: 600 }}>Pengirim</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600 }}>No. WhatsApp</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600 }}>Lokasi</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600 }}>Kebutuhan Layanan</th>
                  <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg, i) => (
                  <tr key={msg.id_message || i} style={{ borderBottom: '1px solid var(--ad-border)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--ad-heading)' }}>{msg.name}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--ad-text)' }}>
                      <a
                        href={`https://wa.me/${(msg.noWA || '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#4ADE80', textDecoration: 'none', fontWeight: 600 }}
                      >
                        <Phone size={14} />
                        <span>{msg.noWA}</span>
                      </a>
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--ad-text)' }}>{msg.location || '-'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ background: 'var(--ad-accent-soft)', color: 'var(--ad-accent)', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {msg.kebutuhan}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--ad-muted)', fontSize: '0.8rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {msg.created_at ? new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
