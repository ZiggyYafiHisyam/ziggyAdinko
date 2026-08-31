import { useEffect, useState } from 'react';
import { getRows, updateRow } from '../../api';
import { siteConfig } from '../../data/siteData';
import { Save, CheckCircle2, Loader2, Phone, MapPin, Building, Globe } from 'lucide-react';

export const AdminSettings = () => {
  const [formData, setFormData] = useState({
    kontak_title: 'Hubungi Kami Kami Siap Membantu!',
    kontak_description: 'Konsultasikan kebutuhan Anda sekarang juga. Tim kami siap membantu dari survei awal, perencanaan, pengerjaan, hingga purna jual.',
    button_primary_text: 'Konsultasi Gratis via WhatsApp',
    button_primary_link: '',
    button_secondary_text: 'Petunjuk Arah Google Maps',
    button_secondary_link: siteConfig.contacts.mapsUrl,
    trust_projects: '500+',
    trust_expert: '8+ Tahun',
    trust_material: 'Premium',
    trust_survey: 'Gratis Survei'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const rows = await getRows('/kontak');
        if (rows && rows[0]) {
          setFormData(prev => ({ ...prev, ...rows[0] }));
        }
      } catch {
        // use default
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    try {
      await updateRow('/kontak', null, formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>
          Pengaturan Halaman & Kontak
        </h1>
        <p style={{ color: '#667085', fontSize: '0.9rem' }}>
          Kelola informasi judul kontak, profil kepercayaan, dan tautan konsultasi publik
        </p>
      </div>

      {savedSuccess && (
        <div style={{ background: '#ECFDF3', border: '1px solid #D1FADF', color: '#027A48', padding: '12px 18px', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>Pengaturan berhasil disimpan!</span>
        </div>
      )}

      {error && (
        <div style={{ background: '#FEF3F2', border: '1px solid #FECDCA', color: '#B42318', padding: '12px 18px', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAECF0', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Section 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #F2F4F7', marginBottom: '20px' }}>
          <Building size={20} color="var(--green-700)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#121212', margin: 0 }}>
            Teks Banner Halaman Kontak
          </h2>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
            Judul Hero Kontak
          </label>
          <input
            type="text"
            name="kontak_title"
            value={formData.kontak_title}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
            Deskripsi Hero Kontak
          </label>
          <textarea
            rows={3}
            name="kontak_description"
            value={formData.kontak_description}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
            disabled={loading}
          />
        </div>

        {/* Section 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid #F2F4F7', marginBottom: '20px', marginTop: '30px' }}>
          <Globe size={20} color="var(--green-700)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#121212', margin: 0 }}>
            Badge & Nilai Statistik (Trust Badges)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
              Jumlah Proyek Selesai
            </label>
            <input
              type="text"
              name="trust_projects"
              value={formData.trust_projects}
              onChange={handleChange}
              placeholder="500+"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
              Pengalaman
            </label>
            <input
              type="text"
              name="trust_expert"
              value={formData.trust_expert}
              onChange={handleChange}
              placeholder="8+ Tahun"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
              Jaminan Kualitas
            </label>
            <input
              type="text"
              name="trust_material"
              value={formData.trust_material}
              onChange={handleChange}
              placeholder="Premium"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#344054', marginBottom: '4px' }}>
              Layanan Survei
            </label>
            <input
              type="text"
              name="trust_survey"
              value={formData.trust_survey}
              onChange={handleChange}
              placeholder="Gratis Survei"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '0.9rem' }}
              disabled={loading}
            />
          </div>
        </div>

        {/* Section 3: Contact Info Card */}
        <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', border: '1px solid #EAECF0' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#121212', marginBottom: '8px' }}>
            Kontak Tetap Adinko & Ghazi
          </h3>
          <div style={{ fontSize: '0.85rem', color: '#475467', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} color="var(--green-700)" />
              <span>Nomor WhatsApp Utama: <strong>{siteConfig.contacts.whatsappAdinko}</strong> ({siteConfig.contacts.directWaNumber})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} color="var(--green-700)" />
              <span>Alamat Kantor: {siteConfig.contacts.address}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary-hero"
            style={{ padding: '11px 24px', fontSize: '0.9rem' }}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
