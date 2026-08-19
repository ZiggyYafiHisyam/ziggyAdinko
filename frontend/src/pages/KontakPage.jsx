import { useState } from 'react';

const KontakPage = () => {
  const [form, setForm] = useState({ name: '', noWA: '', location: '', kebutuhan: '', details: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Mengirim pesan...' });

    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Request failed');
      }
      setStatus({ type: 'success', message: result.message });
      setForm({ name: '', noWA: '', location: '', kebutuhan: '', details: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <main className="page-main" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1>Kontak</h1>
        <p>Silakan kirim detail kebutuhan Anda, dan tim kami akan menghubungi secepatnya.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Lengkap" required />
          <input name="noWA" value={form.noWA} onChange={handleChange} placeholder="No. WhatsApp" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Lokasi Proyek" />
          <input name="kebutuhan" value={form.kebutuhan} onChange={handleChange} placeholder="Kebutuhan Anda" required />
          <textarea name="details" value={form.details} onChange={handleChange} placeholder="Keterangan" />
          <button type="submit" className="submit-button">Kirim Pesan</button>
        </form>

        {status && (
          <p style={{ marginTop: '1rem', color: status.type === 'error' ? '#c53030' : '#166534' }}>
            {status.message}
          </p>
        )}
      </div>
    </main>
  );
};

export default KontakPage;
