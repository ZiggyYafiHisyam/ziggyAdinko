/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, RotateCcw, Loader2 } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import { fetchApi } from '../api';

export const ContactForm = ({ title = "Kirim Pesan Sekarang" }) => {
  const initialForm = {
    nama: '',
    whatsapp: '',
    lokasi: '',
    kebutuhan: 'Instalasi jaring',
    keterangan: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [savedToServer, setSavedToServer] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatWhatsAppMessage = (data) => {
    return `Halo Admin Adinko & GhaziSportsHub,

Saya ingin berkonsultasi mengenai layanan proyek dengan rincian berikut:
• *Nama Lengkap:* ${data.nama}
• *No. WhatsApp:* ${data.whatsapp}
• *Lokasi Proyek:* ${data.lokasi}
• *Kebutuhan Layanan:* ${data.kebutuhan}
• *Keterangan / Detail:* ${data.keterangan ? data.keterangan : '-'}

Mohon informasi estimasi biaya dan jadwal survei lapangan. Terima kasih!`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const rawPhone = siteConfig.contacts.directWaNumber || '6285264456566';
    const targetPhone = rawPhone.replace(/\D/g, '');
    const messageText = formatWhatsAppMessage(formData);
    const generatedWaUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;
    
    setWaLink(generatedWaUrl);

    // Simpan pesan ke database (untuk daftar "Pesan Konsultasi" di admin).
    // Kalau gagal, tetap lanjut ke WhatsApp tapi tandai supaya bisa diberitahu ke user.
    try {
      await fetchApi('/kontak', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.nama,
          noWA: formData.whatsapp,
          location: formData.lokasi,
          kebutuhan: formData.kebutuhan,
          details: formData.keterangan,
        }),
      });
      setSavedToServer(true);
    } catch (err) {
      setSavedToServer(false);
      console.warn('Tidak dapat menyimpan pesan ke server, tetap melanjutkan ke WhatsApp:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Buka WhatsApp di tab baru secara otomatis
    const waWindow = window.open(generatedWaUrl, '_blank');
    if (!waWindow) {
      // Jika browser memblokir pop-up, link manual tetap tersedia di tampilan sukses
      console.info('Pop-up diblokir oleh browser. Pengguna dapat mengklik tombol manual.');
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSubmitted(false);
    setSubmitError('');
    setWaLink('');
  };

  return (
    <div className="form-card">
      <h3 className="form-title">{title}</h3>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '24px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--gray-border)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <CheckCircle2 size={36} color="#12B76A" />
          </div>
          
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#121212', marginBottom: '8px' }}>
            Pesan Konsultasi Siap Dikirim!
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#667085', marginBottom: savedToServer ? '20px' : '12px', lineHeight: '1.5' }}>
            WhatsApp sedang dibuka dengan template pesan yang telah Anda isi. Jika WhatsApp belum terbuka otomatis, silakan klik tombol di bawah:
          </p>

          {!savedToServer && (
            <p style={{ fontSize: '0.8rem', color: '#B54708', background: '#FFFAEB', border: '1px solid #FEDF89', borderRadius: '8px', padding: '8px 12px', marginBottom: '20px', lineHeight: '1.5' }}>
              Catatan: pesan Anda belum tersimpan di sistem kami, tetapi tetap bisa dikirim lewat WhatsApp di bawah ini.
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hero"
              style={{ 
                background: '#25D366', 
                color: '#FFFFFF', 
                width: '100%', 
                justifyContent: 'center',
                padding: '14px 20px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={20} />
              <span>Buka WhatsApp Sekarang</span>
            </a>

            <button 
              type="button" 
              onClick={handleReset}
              style={{ 
                marginTop: '10px', 
                color: 'var(--green-700)', 
                background: 'transparent',
                border: 'none',
                fontWeight: 600, 
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={14} />
              <span>Kirim pesan baru / ubah data</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {submitError && <p role="alert" style={{ color: '#B42318', marginBottom: '14px', fontSize: '0.875rem' }}>{submitError}</p>}
          
          <div className="form-group">
            <label className="form-label" htmlFor="nama">Nama Lengkap *</label>
            <input
              id="nama"
              type="text"
              name="nama"
              required
              className="form-input"
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="whatsapp">No. WhatsApp *</label>
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              required
              className="form-input"
              placeholder="Contoh: 0821xxxxxxxx"
              value={formData.whatsapp}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lokasi">Lokasi Proyek *</label>
            <input
              id="lokasi"
              type="text"
              name="lokasi"
              required
              className="form-input"
              placeholder="Contoh: Simpang Tiga, Pekanbaru"
              value={formData.lokasi}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="kebutuhan">Kebutuhan Anda *</label>
            <select
              id="kebutuhan"
              name="kebutuhan"
              className="form-select"
              value={formData.kebutuhan}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Instalasi jaring">Instalasi jaring</option>
              <option value="Rumput Sintetis Taman">Rumput Sintetis Taman</option>
              <option value="Vertical Garden">Vertical Garden</option>
              <option value="Lapangan Futsal">Lapangan Futsal</option>
              <option value="Mini Soccer">Mini Soccer</option>
              <option value="Mini Golf">Mini Golf</option>
              <option value="Padel & Tenis">Padel & Tenis</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              className="form-textarea"
              placeholder="Ceritakan detail kebutuhan anda (misal: luas lahan, perkiraan jadwal, dll)..."
              value={formData.keterangan}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
            <button 
              type="submit" 
              className="btn-form-submit"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <>
                  <span>Menyiapkan WhatsApp...</span>
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>Kirim Pesan</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
