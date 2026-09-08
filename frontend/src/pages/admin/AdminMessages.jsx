import { useEffect, useState } from 'react';
import { getRows, deleteRow } from '../../api';
import { Mail, Phone, MapPin, Trash2, Eye, X, Clock, MessageSquareQuote } from 'lucide-react';

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getRows('/kontak/messages');
      setMessages(data || []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pesan konsultasi ini?')) return;
    try {
      await deleteRow('/kontak/messages', id);
      setMessages(prev => prev.filter(m => m.id_message !== id));
      if (selectedMessage && selectedMessage.id_message === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      alert('Gagal menghapus pesan: ' + err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '4px' }}>
          Pesan Konsultasi Masuk
        </h1>
        <p style={{ color: 'var(--ad-muted)', fontSize: '0.9rem' }}>
          Daftar formulir konsultasi &amp; estimasi survei yang dikirimkan oleh pengunjung website
        </p>
      </div>

      {/* Messages Table */}
      <div style={{ background: 'var(--ad-card)', borderRadius: '16px', border: '1px solid var(--ad-border)', boxShadow: 'var(--ad-shadow)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ad-muted)' }}>Memuat pesan...</div>
        ) : messages.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ad-muted)' }}>
            <Mail size={40} color="var(--ad-faint)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ad-heading)' }}>Kotak Pesan Masih Kosong</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ad-muted)', marginTop: '4px' }}>
              Setiap kali user mengirim form di halaman kontak, pesan akan otomatis dicatat di sini.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--ad-subtle)', borderBottom: '1px solid var(--ad-border)', color: 'var(--ad-muted)' }}>
                  <th style={{ padding: '14px 20px', fontWeight: 600 }}>Nama Pengirim</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>WhatsApp</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Lokasi</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Kebutuhan</th>
                  <th style={{ padding: '14px 20px', fontWeight: 600 }}>Waktu</th>
                  <th style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id_message} style={{ borderBottom: '1px solid var(--ad-border)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--ad-heading)' }}>
                      {msg.name}
                    </td>
                    <td style={{ padding: '16px 16px' }}>
                      <a
                        href={`https://wa.me/${(msg.noWA || '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4ADE80', textDecoration: 'none', fontWeight: 600 }}
                      >
                        <Phone size={14} />
                        <span>{msg.noWA}</span>
                      </a>
                    </td>
                    <td style={{ padding: '16px 16px', color: 'var(--ad-text)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} color="var(--ad-faint)" />
                        <span>{msg.location || '-'}</span>
                      </span>
                    </td>
                    <td style={{ padding: '16px 16px' }}>
                      <span style={{ background: 'var(--ad-accent-soft)', color: 'var(--ad-accent)', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {msg.kebutuhan}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--ad-muted)', fontSize: '0.8rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {msg.created_at ? new Date(msg.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          style={{ padding: '6px 10px', borderRadius: '6px', background: 'var(--ad-accent-soft)', color: 'var(--ad-accent)', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
                        >
                          <Eye size={13} />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id_message)}
                          style={{ padding: '6px 8px', borderRadius: '6px', background: 'var(--ad-danger-bg)', color: 'var(--ad-danger)', border: 'none', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--ad-overlay)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
          <div style={{ background: 'var(--ad-card)', borderRadius: '20px', width: '100%', maxWidth: '520px', padding: '28px', boxShadow: 'var(--ad-shadow)', border: '1px solid var(--ad-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ad-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquareQuote size={20} color="var(--ad-accent)" />
                <span>Detail Pesan Konsultasi</span>
              </h2>
              <button onClick={() => setSelectedMessage(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ad-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ad-muted)', textTransform: 'uppercase' }}>Nama Lengkap</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ad-heading)', marginTop: '2px' }}>{selectedMessage.name}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ad-muted)', textTransform: 'uppercase' }}>No. WhatsApp</div>
                  <a
                    href={`https://wa.me/${(selectedMessage.noWA || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4ADE80', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}
                  >
                    <Phone size={14} />
                    <span>{selectedMessage.noWA}</span>
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ad-muted)', textTransform: 'uppercase' }}>Lokasi Proyek</div>
                  <div style={{ fontWeight: 600, color: 'var(--ad-text)', marginTop: '2px' }}>{selectedMessage.location || '-'}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ad-muted)', textTransform: 'uppercase' }}>Kebutuhan Layanan</div>
                <div style={{ display: 'inline-block', marginTop: '4px', background: 'var(--ad-accent-soft)', color: 'var(--ad-accent)', padding: '4px 12px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.8rem' }}>
                  {selectedMessage.kebutuhan}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ad-muted)', textTransform: 'uppercase' }}>Keterangan / Detail</div>
                <div style={{ background: 'var(--ad-subtle)', padding: '14px', borderRadius: '10px', marginTop: '4px', color: 'var(--ad-text)', lineHeight: 1.6, border: '1px solid var(--ad-border)' }}>
                  {selectedMessage.details || 'Tidak ada catatan tambahan.'}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--ad-faint)', marginTop: '4px' }}>
                Diterima: {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' }) : '-'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--ad-border)' }}>
              <button
                onClick={() => handleDelete(selectedMessage.id_message)}
                style={{ background: 'var(--ad-danger-bg)', color: 'var(--ad-danger)', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Trash2 size={14} />
                <span>Hapus Pesan</span>
              </button>

              <a
                href={`https://wa.me/${(selectedMessage.noWA || '').replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(selectedMessage.name)},%20kami%20dari%20Adinko%20x%20GhaziSportsHub%20ingin%20menindaklanjuti%20pesan%20konsultasi%20Anda.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-hero"
                style={{ background: '#25D366', padding: '9px 18px', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <Phone size={15} />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
