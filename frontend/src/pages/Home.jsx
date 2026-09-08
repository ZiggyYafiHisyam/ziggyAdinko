import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Phone, ChevronRight, Navigation } from 'lucide-react';
import { InstagramIcon } from '../assets/Icons';
import { siteConfig, portfolioData, testimonialsData } from '../data/siteData';
import { FeatureCards } from '../components/FeatureCards';
import { ProjectCard } from '../components/ProjectCard';
import { ReviewCard } from '../components/ReviewCard';
import { ContactForm } from '../components/ContactForm';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { AdinkoLogo, GhaziLogo } from '../assets/Logos';
import { usePageContent } from '../context/ContentContext';
import { getRows } from '../api';

export const Home = () => {
  const navigate = useNavigate();
  const { c } = usePageContent('home');
  const gc = usePageContent('global').c;
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [homeContent, setHomeContent] = useState(null);
  const [reviews, setReviews] = useState(testimonialsData);

  useEffect(() => {
    getRows('/home').then((rows) => {
      if (rows[0]) setHomeContent(rows[0]);
    }).catch(() => {});

    const normalize = (item, fallbackCategory) => ({
      ...item,
      id: item.id ?? item.id_testimoni ?? item.id_message,
      name: item.name,
      category: item.category ?? item.kebutuhan ?? fallbackCategory,
      text: item.text ?? item.details ?? '',
      rating: Number(item.rating ?? 5),
      time: item.time ?? item.created_at ?? item.time_text ?? '',
    });

    const loadReviews = async () => {
      try {
        const g = await getRows('/testimoni/google');
        if (g.length) { setReviews(g.map((i) => normalize(i, 'Google Maps'))); return; }
      } catch { /* ignore */ }
      try {
        const d = await getRows('/testimoni');
        if (d.length) { setReviews(d.map((i) => normalize(i, 'Lainnya'))); return; }
      } catch { /* ignore */ }
    };

    loadReviews();
  }, []);

  const filterTabs = ['Semua', 'Taman Rumah', 'Mini Soccer', 'Futsal', 'Lapangan Lainnya'];

  const filteredProjects = portfolioData.filter(item => {
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Taman Rumah') return item.category === 'Taman';
    if (activeFilter === 'Mini Soccer') return item.category === 'Minisoccer';
    if (activeFilter === 'Futsal') return item.category === 'Lapangan Futsal';
    if (activeFilter === 'Lapangan Lainnya') return item.category === 'Olahraga Lainnya' || item.category === 'Vertical Garden';
    return true;
  }).slice(0, 6);

  const stats = [
    { value: c('stats.1value'), label: c('stats.1label') },
    { value: c('stats.2value'), label: c('stats.2label') },
    { value: c('stats.3value'), label: c('stats.3label') },
    { value: c('stats.4value'), label: c('stats.4label') },
  ];

  const featureItems = [1, 2, 3, 4].map((n) => ({
    id: `00${n}`,
    number: `00${n}`,
    title: c(`features.c${n}title`),
    description: c(`features.c${n}desc`),
    bgImage: c(`features.c${n}img`),
    icon: ['layers', 'layout', 'gem', 'shield-check'][n - 1],
  }));

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        className="hero-wrapper"
        style={{ backgroundImage: `url('${c('hero.bg')}')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              {c('hero.tag')}
            </div>
            <h1 className="hero-title">
              {homeContent?.title || c('hero.title')}
            </h1>
            <p className="hero-subtitle">
              {homeContent?.subtitle || c('hero.subtitle')}
            </p>
            <div className="hero-actions">
              <button
                onClick={() => navigate('/kontak')}
                className="btn-primary-hero"
              >
                <span>{c('hero.btnPrimary')}</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
              <button
                onClick={() => navigate('/portofolio')}
                className="btn-secondary-hero"
              >
                <span>{c('hero.btnSecondary')}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL BRAND SHOWCASE */}
      <section className="dual-brand-section">
        <div className="container">
          <div className="dual-brand-grid">
            <div>
              <span className="section-tag">{c('dual.tag')}</span>
              <h2 className="section-title">
                {c('dual.title')}
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '28px' }}>
                {c('dual.subtitle')}
              </p>
              <button
                onClick={() => navigate('/layanan')}
                className="btn-primary-hero"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>{c('dual.btn')}</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>

            <div className="dual-brand-cards">
              {/* Brand 1: Adinko */}
              <div
                className="brand-showcase-card"
                onClick={() => navigate('/tentang-adinko')}
                style={{ cursor: 'pointer' }}
              >
                <div className="brand-card-img-wrapper">
                  <img src={c('dual.card1img')} alt={c('dual.card1title')} />
                  <div className="brand-card-logo-overlay">
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                      <AdinkoLogo size={42} showText={false} />
                    </div>
                  </div>
                </div>
                <div className="brand-card-body">
                  <h3 className="brand-card-title">{c('dual.card1title')}</h3>
                  <p className="brand-card-text">{c('dual.card1text')}</p>
                </div>
              </div>

              {/* Brand 2: GhaziSportsHub */}
              <div
                className="brand-showcase-card"
                onClick={() => navigate('/tentang-ghazi')}
                style={{ cursor: 'pointer' }}
              >
                <div className="brand-card-img-wrapper">
                  <img src={c('dual.card2img')} alt={c('dual.card2title')} />
                  <div className="brand-card-logo-overlay">
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                      <GhaziLogo size={42} color="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div className="brand-card-body">
                  <h3 className="brand-card-title">{c('dual.card2title')}</h3>
                  <p className="brand-card-text">{c('dual.card2text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FEATURE CARDS (001 - 004) */}
      <section className="interactive-features-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">{c('features.tag')}</span>
            <h2 className="section-title">{c('features.title')}</h2>
            <p className="section-subtitle mx-auto">
              {c('features.subtitle')}
            </p>
          </div>

          <FeatureCards activeIndexDefault={0} items={featureItems} />

          <div className="text-center">
            <button
              onClick={() => navigate('/kontak')}
              className="btn-primary-hero"
            >
              <span>{c('features.btn')}</span>
              <span className="arrow-circle">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. PORTOFOLIO / HASIL PEKERJAAN KAMI */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">{c('portfolio.tag')}</span>
            <h2 className="section-title">{c('portfolio.title')}</h2>
            <p className="section-subtitle mx-auto">
              {c('portfolio.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-container">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`filter-pill ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 6 Projects Grid */}
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <button
              onClick={() => navigate('/portofolio')}
              className="btn-primary-hero"
            >
              <span>{c('portfolio.btn')}</span>
              <span className="arrow-circle">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION (Dark Box Container) */}
      <section className="container">
        <div className="testimonials-dark-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="section-tag" style={{ color: 'var(--green-300)' }}>{c('testi.tag')}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
                {c('testi.title')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginTop: '6px' }}>
                {c('testi.subtitle')}
              </p>
            </div>

            {/* Google Rating Star Badge */}
            <div style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              padding: '10px 20px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>5.0</span>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--gold-400)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-400)" color="var(--gold-400)" />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Google Reviews</span>
            </div>
          </div>

          {/* 3 Review Cards Grid */}
          <div className="testimonials-grid">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} variant="dark" />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/testimoni')}
              style={{
                background: '#FFFFFF',
                color: 'var(--green-900)',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}
            >
              <span>{c('testi.btn')}</span>
              <span className="arrow-circle" style={{ background: 'var(--green-600)', color: '#FFFFFF' }}>
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CONSULTATION FORM SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Contact Details & Google Maps */}
            <div className="contact-info-card">
              <span className="section-tag">{c('contact.tag')}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>
                {c('contact.title')}
              </h2>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Alamat</div>
                  <div className="contact-item-text">{gc('contacts.address')}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item-title">WhatsApp</div>
                  <div className="contact-item-text">
                    <div>{gc('contacts.waAdinko')} (Adinko)</div>
                    <div>{gc('contacts.waAdinko2')}</div>
                    <div>{gc('contacts.waGhazi')} (GhaziSportsHub)</div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <InstagramIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Instagram</div>
                  <div className="contact-item-text">
                    <div>{gc('contacts.igAdinko')}</div>
                    <div>{gc('contacts.igGhazi')}</div>
                  </div>
                </div>
              </div>

              {/* Google Maps Interactive Container */}
              <div className="map-embed-wrapper">
                <iframe
                  title="Google Maps Location Adinko"
                  src={gc('contacts.mapsEmbed')}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <button
                onClick={() => window.open(gc('contacts.mapsUrl') || siteConfig.contacts.mapsUrl, '_blank')}
                className="btn-primary-hero"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{c('contact.btn')}</span>
                <span className="arrow-circle">
                  <Navigation size={14} />
                </span>
              </button>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <ContactForm title={c('contact.formTitle')} />
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section style={{ padding: '40px 0', background: 'var(--green-50)', textAlign: 'center' }}>
        <div className="container">
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--green-800)',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            {c('bottom.text')}
          </p>
        </div>
      </section>
    </div>
  );
};
