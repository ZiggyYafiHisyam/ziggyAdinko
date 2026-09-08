import { useEffect, useState } from 'react';
import { getRows, createRow, updateRow, deleteRow } from '../../api';
import { testimonialsData as staticTestimonials } from '../../data/siteData';
import { Plus, Edit2, Trash2, Star, X, Loader2 } from 'lucide-react';

export const AdminTestimoni = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    time_text: 'Baru saja',
    category: 'Rumput Sintetis',
    rating: 5,
    avatar: '',
    text: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchTestimoni = async () => {
    setLoading(true);
    try {
      const data = await getRows('/testimoni');
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(staticTestimonials);
      }
    } catch {
      setItems(staticTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      time_text: '1 bulan lalu',
      category: 'Rumput Sintetis',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text: ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      time_text: item.time_text || item.time || '',
      category: item.category || 'Rumput Sintetis',
      rating: item.rating || 5,
      avatar: item.avatar || '',
      text: item.text || ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingItem && editingItem.id_testimoni) {
        await updateRow('/testimoni', editingItem.id_testimoni, formData);
      } else {
        await createRow('/testimoni', formData);
      }
      setIsModalOpen(false);
      await fetchTestimoni();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data ulasan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus ulasan dari "${item.name}"?`)) return;

    try {
      if (item.id_testimoni) {
        await deleteRow('/testimoni', item.id_testimoni);
      }
      setItems(prev => prev.filter(t => (t.id_testimoni || t.id) !== (item.id_testimoni || item.id)));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '4px' }}>
            Testimoni & Review Klien
          </h1>
          <p style={{ color: 'var(--ad-muted)', fontSize: '0.9rem' }}>
            Kelola ulasan kepuasan pelanggan dari Google Reviews dan proyek lapangan
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary-hero" style={{ padding: '11px 20px', fontSize: '0.9rem' }}>
          <Plus size={18} />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ad-muted)' }}>Memuat testimoni...</div>
      ) : items.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: 'var(--ad-card)', borderRadius: '16px', border: '1px dashed var(--ad-input-border)', color: 'var(--ad-muted)' }}>
          Belum ada testimoni.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {items.map(item => (
            <div
              key={item.id_testimoni || item.id}
              style={{
                background: 'var(--ad-card)',
                borderRadius: '16px',
                border: '1px solid var(--ad-border)',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <img
                    src={item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={item.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ad-heading)', margin: 0 }}>
                      {item.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ad-muted)' }}>
                      {item.time_text || item.time || 'Pelanggan'} • <span style={{ color: 'var(--ad-accent)', fontWeight: 600 }}>{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '12px', color: '#F59E0B' }}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Review Content */}
                <p style={{ fontSize: '0.875rem', color: 'var(--ad-text)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--ad-soft)', paddingTop: '12px' }}>
                <button
                  onClick={() => openEditModal(item)}
                  style={{ flex: 1, padding: '7px', borderRadius: '6px', background: 'var(--ad-accent-soft)', color: 'var(--ad-accent)', border: 'none', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  style={{ padding: '7px 10px', borderRadius: '6px', background: 'var(--ad-danger-bg)', color: 'var(--ad-danger)', border: 'none', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--ad-overlay)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
          <div style={{ background: 'var(--ad-card)', borderRadius: '20px', width: '100%', maxWidth: '500px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.55)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ad-heading)' }}>
                {editingItem ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ad-muted)' }}>
                <X size={20} />
              </button>
            </div>

            {error && (
              <div style={{ background: 'var(--ad-danger-bg)', color: 'var(--ad-danger)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                  Nama Klien *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Yoga Jundirwan"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                    Kategori Layanan
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Rumput Sintetis / Futsal"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                    Rating Bintang (1-5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                  Isi Ulasan / Testimoni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Tulis ulasan dari klien..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '8px', background: 'var(--ad-soft)', color: 'var(--ad-text)', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary-hero" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{saving ? 'Menyimpan...' : 'Simpan Testimoni'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
