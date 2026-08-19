import { useEffect, useState } from 'react';

const serviceFeatures = [
  { id: '001', title: 'Hasil Presisi', description: 'Permukaan yang dirapikan hingga anti slip dan mata Anda puas.' },
  { id: '002', title: 'Custom Desain', description: 'Desain rumput sesuai kebutuhan proyek dan ukuran lahan.' },
  { id: '003', title: 'Harga Jujur', description: 'Harga transparan tanpa biaya tersembunyi atau tipu-tipu.' },
  { id: '004', title: 'After Sales', description: 'Layanan purna jual dan perawatan untuk hasil yang awet.' }
];

const galleryItems = [
  { title: 'Mini Soccer Park Rumbai', subtitle: 'Rumbai, Pekanbaru City 2024', photo: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
  { title: 'Rumput Sintetis', subtitle: 'Rumput, Pekanbaru City 2024', photo: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
  { title: 'Lapangan Olahraga', subtitle: 'Kabupaten, Pekanbaru City 2024', photo: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
];

const testimonials = [
  { name: 'Ali WW', quote: 'Rekomendasi banget ini. Pasangannya rapi, rumputnya bersih, teknisi juga cepat tanggap.', rating: 5 },
  { name: 'Deden Official', quote: 'Pelayanan bagus banget, catatan harga transparan dan hasilnya memuaskan.', rating: 5 },
  { name: 'Yoga Suryawan', quote: 'Rumputnya cakep, dan pemasangannya rapi. Terima kasih Adinko, lapangan kami jadi spesial.' , rating: 5 }
];

const HomePage = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/home')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch home data');
        return res.json();
      })
      .then((data) => {
        setHomeData(data.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-main">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-label">Terpercaya Sejak 2010</span>
            <h1 className="hero-title">Jasa Rumput Sintetis & Lapangan Olahraga Profesional Pekanbaru</h1>
            <p className="hero-text">Solusi lengkap untuk taman, dekorasi, hingga lapangan futsal & mini soccer dengan hasil rapi, kuat, dan bergaransi.</p>
            <div className="hero-actions">
              <a className="button-primary" href="/kontak">Konsultasi Gratis</a>
              <button className="button-secondary">Lihat Portofolio</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-copy">
              <div>
                <p style={{ margin: 0, opacity: 0.9 }}>Slide terbaru - desain alami</p>
                <h2 style={{ marginTop: '0.75rem', fontSize: '1.45rem', fontWeight: 700 }}>Siap untuk lapangan impian Anda?</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-item">
          <strong>500+</strong>
          Proyek Selesai
        </div>
        <div className="trust-item">
          <strong>Expert</strong>
          Tim Profesional
        </div>
        <div className="trust-item">
          <strong>Premium</strong>
          Material Pilihan
        </div>
        <div className="trust-item">
          <strong>Gratis</strong>
          Layanan Survey
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Dua Brand, Satu Komitmen: Kualitas Terbaik</h2>
        <p className="section-subtitle">Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang telah melayani berbagai klien. Kami hadir untuk mewujudkan solusi lapangan olahraga dan taman yang estetis, praktis, dan awet.</p>
        <div className="about-grid">
          <div className="about-copy">
            <p>Adinko hadir sebagai solusi utama untuk proyek rumput sintetis dan lapangan olahraga. Kami menggabungkan desain yang profesional dengan layanan pemasangan yang terstruktur agar hasil sesuai ekspektasi.</p>
            <a className="button-primary" href="/kontak">Lihat Selengkapnya</a>
          </div>
          <div className="about-cards">
            <article className="about-card">
              <figure><img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80" alt="Rumput Sintetis" /></figure>
              <div className="about-card-content">
                <h3>Rumput Sintetis</h3>
                <p>Untuk taman, dekorasi, dan area komersial dengan tampilan alami dan perawatan rendah.</p>
              </div>
            </article>
            <article className="about-card">
              <figure><img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80" alt="Lapangan Olahraga" /></figure>
              <div className="about-card-content">
                <h3>Lapangan Olahraga</h3>
                <p>Futsal, mini soccer, mini golf, dan area olahraga lain yang membutuhkan hasil kokoh dan aman.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Solusi Tepat untuk Hunian Anda</h2>
        <div className="card-grid">
          {serviceFeatures.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-badge">{feature.id}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Hasil Pekerjaan Kami</h2>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <article key={item.title} className="gallery-card">
              <img src={item.photo} alt={item.title} />
              <div className="gallery-body">
                <strong>{item.title}</strong>
                <p>{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: '#111827', color: 'white' }}>
        <h2 className="section-title" style={{ color: 'white' }}>Apa Kata Klien Kami?</h2>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card" style={{ background: '#17223a', color: 'white' }}>
              <p>"{item.quote}"</p>
              <div className="testimonial-meta">
                <div className="testimonial-avatar">{item.name.split(' ').map((w) => w[0]).join('')}</div>
                <div>
                  <strong>{item.name}</strong>
                  <p style={{ margin: 0, color: '#cbd5e1' }}>{'★'.repeat(item.rating)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Hubungi Kami</h3>
            <p>Alamat</p>
            <p>Jl. Jenderal Sudirman No. 123, Pekanbaru</p>
            <p>WhatsApp: 0822-xxx-xxxx</p>
            <p>Instagram: @adinko</p>
          </div>
          <div className="contact-form-card">
            <h3>Kirim Pesan Sekarang</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Nama Lengkap" />
              <input placeholder="No. WhatsApp" />
              <input placeholder="Lokasi Proyek" />
              <input placeholder="Kebutuhan Anda" />
              <textarea placeholder="Keterangan" />
              <button type="submit" className="submit-button">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <span className="logo-circle">A</span>
              <span>Adinko</span>
            </div>
            <p style={{ marginTop: '1rem', color: '#d1d5db' }}>Penyedia jasa rumput sintetis dan lapangan olahraga profesional Pekanbaru.</p>
          </div>
          <div className="footer-links">
            <strong>Perusahaan</strong>
            <a href="#">Tentang Kami</a>
            <a href="#">Portofolio</a>
            <a href="#">Testimoni</a>
            <a href="#">Kontak</a>
          </div>
          <div className="footer-links">
            <strong>Adinko</strong>
            <a href="#">Rumput Sintetis</a>
            <a href="#">Lapangan Futsal</a>
            <a href="#">Lapangan Olahraga</a>
          </div>
          <div className="footer-links">
            <strong>GhaziSportsHub</strong>
            <a href="#">Mini Soccer</a>
            <a href="#">Pabrik</a>
            <a href="#">Kontak</a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Metro Software Indonesia. All rights reserved.</div>
      </section>

      <section className="section" style={{ textAlign: 'center', paddingTop: '0', marginTop: '-3rem' }}>
        {loading && <p>Mengambil data...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {homeData && <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--muted)' }}>{JSON.stringify(homeData, null, 2)}</pre>}
      </section>
    </main>
  );
};

export default HomePage;
