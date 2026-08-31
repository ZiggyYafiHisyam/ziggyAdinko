import { useEffect, useState } from 'react';
import { getRows, createRow, updateRow, deleteRow, uploadFile } from '../../api';
import { portfolioData as staticPortfolio } from '../../data/siteData';
import { Plus, Edit2, Trash2, Search, Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export const AdminPortofolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Taman',
    location: '',
    description: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const data = await getRows('/portofolio');
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(staticPortfolio);
      }
    } catch {
      setItems(staticPortfolio);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Taman',
      location: 'Pekanbaru, 2024',
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
      category: item.category || 'Taman',
      location: item.location || '',
      description: item.description || '',
      image: item.image || ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    try {
      const res = await uploadFile(files);
      if (res && res.url) {
        setFormData(prev => ({ 
          ...prev, 
          image: prev.image ? `${prev.image},${res.url}` : res.url 
        }));
      }
    } catch (err) {
      setError('Gagal mengunggah gambar: ' + (err.message || 'Error'));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingItem && editingItem.id_portofolio) {
        await updateRow('/portofolio', editingItem.id_portofolio, formData);
      } else {
        await createRow('/portofolio', formData);
      }
      setIsModalOpen(false);
      await fetchPortfolio();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data portofolio.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Yakin ingin menghapus portofolio "${item.title}"?`)) return;

    try {
      if (item.id_portofolio) {
        await deleteRow('/portofolio', item.id_portofolio);
      }
      setItems(prev => prev.filter(p => (p.id_portofolio || p.id) !== (item.id_portofolio || item.id)));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const categories = ['Semua', 'Taman', 'Lapangan Futsal', 'Minisoccer', 'Vertical Garden', 'Olahraga Lainnya'];

  const filteredItems = items.filter(item => {
    const matchCat = activeCategory === 'Semua' || item.category === activeCategory;
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase()) ||
                        item.location?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>
            Portofolio Proyek
          </h1>
          <p style={{ color: '#667085', fontSize: '0.9rem' }}>
            Kelola dokumentasi dan foto hasil pengerjaan Adinko & GhaziSportsHub
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary-hero"
          style={{ padding: '11px 20px', fontSize: '0.9rem' }}
        >
          <Plus size={18} />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #EAECF0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeCategory === cat ? 'var(--green-600)' : '#F2F4F7',
                color: activeCategory === cat ? '#FFFFFF' : '#475467',
                transition: 'background 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="#98A2B3" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari nama proyek atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #D0D5DD',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Grid of Portfolio Cards */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#667085' }}>Memuat portofolio...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px dashed #D0D5DD', color: '#667085' }}>
          Tidak ada portofolio yang cocok.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id_portofolio || item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EAECF0',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Preview */}
              <div style={{ height: '180px', position: 'relative', background: '#E4E7EC' }}>
                {item.image ? (
                  <img
                    src={item.image.split(',')[0].trim()}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#98A2B3' }}>
                    <ImageIcon size={32} />
                  </div>
                )}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(16, 30, 19, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {item.category}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#121212', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--green-700)', fontWeight: 600, marginBottom: '8px' }}>
                    📍 {item.location || 'Pekanbaru'}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#667085', lineHeight: 1.5, marginBottom: '16px' }}>
                    {item.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F2F4F7', paddingTop: '12px' }}>
                  <button
                    onClick={() => openEditModal(item)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      background: '#F4F7EE',
                      color: 'var(--green-800)',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: '#FEF3F2',
                      color: '#B42318',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#121212' }}>
                {editingItem ? 'Edit Portofolio Proyek' : 'Tambah Portofolio Proyek'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#667085' }}>
                <X size={20} />
              </button>
            </div>

            {error && (
              <div style={{ background: '#FEF3F2', color: '#B42318', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
                  Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Mini Soccer Park Rumbai"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
                  >
                    <option value="Taman">Taman</option>
                    <option value="Lapangan Futsal">Lapangan Futsal</option>
                    <option value="Minisoccer">Minisoccer</option>
                    <option value="Vertical Garden">Vertical Garden</option>
                    <option value="Olahraga Lainnya">Olahraga Lainnya</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
                    Lokasi & Tahun *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Contoh: Rumbai, Pekanbaru 2024"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
                  Deskripsi Proyek
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail pengerjaan proyek..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
                />
              </div>

              {/* Image Input & Upload */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
                  Foto Proyek (Upload File atau Masukkan URL)
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://... atau /assets/..."
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.85rem' }}
                  />
                  <label style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#F2F4F7',
                    color: '#344054',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    <span>{uploading ? 'Mengunggah...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploading}
                    />
                  </label>
                </div>

                {formData.image && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                    {formData.image.split(',').map((imgUrl, idx) => (
                      <div key={idx} style={{ width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EAECF0' }}>
                        <img src={imgUrl.trim()} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', background: '#F2F4F7', color: '#344054', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary-hero"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{saving ? 'Menyimpan...' : 'Simpan Portofolio'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
