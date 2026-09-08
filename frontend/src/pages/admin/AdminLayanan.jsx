import { useEffect, useState } from 'react';
import { getRows, createRow, updateRow, deleteRow, uploadFile } from '../../api';
import { servicesData } from '../../data/siteData';
import { Plus, Edit2, Trash2, Search, Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export const AdminLayanan = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('Semua');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Adinko',
    description: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const data = await getRows('/layanan');
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(servicesData.allGrid);
      }
    } catch {
      setItems(servicesData.allGrid);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Adinko',
      description: '',
      image: ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Adinko',
      description: item.description || '',
      image: item.image || ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const res = await uploadFile(file);
      if (res && res.url) {
        setFormData(prev => ({ ...prev, image: res.url }));
      }
    } catch (err) {
      setError('Gagal mengunggah: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingItem && editingItem.id_layanan) {
        await updateRow('/layanan', editingItem.id_layanan, formData);
      } else {
        await createRow('/layanan', formData);
      }
      setIsModalOpen(false);
      await fetchLayanan();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data layanan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus layanan "${item.title}"?`)) return;

    try {
      if (item.id_layanan) {
        await deleteRow('/layanan', item.id_layanan);
      }
      setItems(prev => prev.filter(l => (l.id_layanan || l.id) !== (item.id_layanan || item.id)));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const filteredItems = items.filter(item => {
    const matchBrand = brandFilter === 'Semua' || item.category === brandFilter;
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase()) ||
                        item.description?.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ad-heading)', marginBottom: '4px' }}>
            Katalog Layanan
          </h1>
          <p style={{ color: 'var(--ad-muted)', fontSize: '0.9rem' }}>
            Kelola daftar layanan Adinko (Rumput Sintetis & Lanskap) & GhaziSportsHub (Fasilitas Olahraga)
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary-hero" style={{ padding: '11px 20px', fontSize: '0.9rem' }}>
          <Plus size={18} />
          <span>Tambah Layanan</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--ad-card)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--ad-border)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Semua', 'Adinko', 'GhaziSportsHub'].map(brand => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: brandFilter === brand ? 'var(--green-600)' : 'var(--ad-soft)',
                color: brandFilter === brand ? 'var(--ad-card)' : 'var(--ad-text)'
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="var(--ad-faint)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari judul layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ad-muted)' }}>Memuat layanan...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: 'var(--ad-card)', borderRadius: '16px', border: '1px dashed var(--ad-input-border)', color: 'var(--ad-muted)' }}>
          Tidak ada layanan ditemukan.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredItems.map(item => (
            <div
              key={item.id_layanan || item.id}
              style={{
                background: 'var(--ad-card)',
                borderRadius: '14px',
                border: '1px solid var(--ad-border)',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '160px', position: 'relative', background: 'var(--ad-subtle)' }}>
                {item.image ? (
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--ad-faint)' }}>
                    <ImageIcon size={32} />
                  </div>
                )}
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: item.category === 'Adinko' ? '#1E40AF' : '#15803D',
                  color: '#FFFFFF',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {item.category}
                </span>
              </div>

              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ad-heading)', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ad-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {item.description || 'Layanan profesional dengan material bergaransi dan pengerjaan presisi.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--ad-soft)', paddingTop: '10px' }}>
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
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--ad-overlay)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
          <div style={{ background: 'var(--ad-card)', borderRadius: '20px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.55)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ad-heading)' }}>
                {editingItem ? 'Edit Layanan' : 'Tambah Layanan Baru'}
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
                  Nama Layanan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Rumput Sintetis Taman Rumah"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                  Brand / Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                >
                  <option value="Adinko">Adinko (Rumput Sintetis & Lanskap)</option>
                  <option value="GhaziSportsHub">GhaziSportsHub (Lapangan Olahraga)</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                  Deskripsi Layanan
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi singkat keunggulan layanan..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ad-text)', marginBottom: '4px' }}>
                  Foto Layanan (URL atau Upload)
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL gambar..."
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--ad-input-border)', fontSize: '0.85rem' }}
                  />
                  <label style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--ad-soft)', color: 'var(--ad-text)', fontWeight: 600, fontSize: '0.82rem', cursor: uploading ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '8px', background: 'var(--ad-soft)', color: 'var(--ad-text)', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary-hero" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{saving ? 'Menyimpan...' : 'Simpan Layanan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
