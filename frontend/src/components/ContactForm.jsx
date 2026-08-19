import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import { fetchApi } from '../api';

export const ContactForm = ({ title = "Kirim Pesan Sekarang" }) => {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    lokasi: '',
    kebutuhan: 'Instalasi jaring',
    keterangan: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitError('');
    fetchApi('/kontak', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.nama,
        noWA: formData.whatsapp,
        location: formData.lokasi,
        kebutuhan: formData.kebutuhan,
        details: formData.keterangan,
      }),
    })
      .then(() => {
        setSubmitted(true);
        const message = `Halo Adinko & GhaziSportsHub,%0A%0A*Konsultasi Proyek Baru*%0A- *Nama:* ${encodeURIComponent(formData.nama)}%0A- *No. WhatsApp:* ${encodeURIComponent(formData.whatsapp)}%0A- *Lokasi Proyek:* ${encodeURIComponent(formData.lokasi)}%0A- *Kebutuhan Layanan:* ${encodeURIComponent(formData.kebutuhan)}%0A- *Keterangan:* ${encodeURIComponent(formData.keterangan || '-')}%0A%0AMohon info estimasi dan penjadwalan survei. Terima kasih.`;
        setTimeout(() => window.open(`https://wa.me/${siteConfig.contacts.directWaNumber}?text=${message}`, '_blank'), 400);
      })
      .catch(() => setSubmitError('Pesan belum tersimpan. Periksa koneksi server lalu coba lagi.'));
  };

  return (
    <div className="form-card">
      <h3 className="form-title">{title}</h3>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '30px 20px', background: '#FFFFFF', borderRadius: '12px' }}>
          <CheckCircle2 size={48} color="#486F0C" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#121212' }}>Pesan Anda Telah Disiapkan!</h4>
          <p style={{ fontSize: '0.9rem', color: '#667068', marginTop: '6px' }}>
            Membuka WhatsApp untuk mengirim detail konsultasi langsung ke tim kami...
          </p>
          <button 
            type="button" 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '18px', color: '#486F0C', fontWeight: 600, fontSize: '0.85rem' }}
          >
            ← Kirim pesan baru
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {submitError && <p role="alert" style={{ color: '#B42318', marginBottom: '14px' }}>{submitError}</p>}
          <div className="form-group">
            <label className="form-label" htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              required
              className="form-input"
              placeholder="Nama Anda"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="whatsapp">No. WhatsApp</label>
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              required
              className="form-input"
              placeholder="0822-xxxx-xxxx"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lokasi">Lokasi Proyek</label>
            <input
              id="lokasi"
              type="text"
              name="lokasi"
              required
              className="form-input"
              placeholder="Kota / Kecamatan"
              value={formData.lokasi}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="kebutuhan">Kebutuhan Anda</label>
            <select
              id="kebutuhan"
              name="kebutuhan"
              className="form-select"
              value={formData.kebutuhan}
              onChange={handleChange}
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
              placeholder="Ceritakan detail kebutuhan anda..."
              value={formData.keterangan}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn-form-submit">
              <span>Kirim Pesan</span>
              <Send size={15} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
