import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import { testimonialsData, siteConfig } from '../data/siteData';
import { ReviewCard } from '../components/ReviewCard';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { usePageContent } from '../context/ContentContext';
import { getRows } from '../api';

export const Testimoni = () => {
  const navigate = useNavigate();
  const { c } = usePageContent('testimoni');
  const gc = usePageContent('global').c;
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [reviews, setReviews] = useState(testimonialsData);

  useEffect(() => {
    const normalize = (item, fallbackCategory) => ({
      id: item.id ?? item.id_testimoni ?? item.id_message,
      name: item.name,
      category: item.category ?? item.kebutuhan ?? fallbackCategory,
      text: item.text ?? item.details ?? '',
      rating: Number(item.rating ?? 5),
      avatar: item.avatar,
      time: item.time ?? item.created_at ?? item.time_text ?? '',
    });

    const loadReviews = async () => {
      // 1. Google Maps reviews
      try {
        const g = await getRows('/testimoni/google');
        if (g.length) { setReviews(g.map((i) => normalize(i, 'Google Maps'))); return; }
      } catch { /* ignore, try next source */ }

      // 2. Testimonials stored in the database (admin-managed)
      try {
        const d = await getRows('/testimoni');
        if (d.length) { setReviews(d.map((i) => normalize(i, 'Lainnya'))); return; }
      } catch { /* ignore, keep static */ }

      // 3. keep the bundled static testimonials
    };

    loadReviews();
  }, []);

  const filterTabs = ['Semua', 'Rumput Sintetis', 'Lapangan Olahraga', 'Vertical Garden'];

  const filteredReviews = reviews.filter(item => {
    if (activeFilter === 'Semua') return true;
    return item.category === activeFilter;
  });

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
              {c('hero.title')}
            </h1>
            <p className="hero-subtitle">
              {c('hero.subtitle')}
            </p>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. LEAVE A GOOGLE MAPS REVIEW CTA */}
      <section style={{ padding: '56px 0', background: 'var(--green-50)' }}>
        <div className="container">
          <div style={{
            maxWidth: '760px',
            margin: '0 auto',
            background: 'var(--white)',
            border: '1px solid var(--green-200, #D7E5C4)',
            borderRadius: '20px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(16, 30, 19, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: '#F59E0B', marginBottom: '14px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-900, #101E13)', marginBottom: '8px' }}>
              {c('gmaps.title')}
            </h2>
            <p style={{ color: '#667085', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 22px auto' }}>
              {c('gmaps.body')}
            </p>
            <a
              href={gc('contacts.googleReviewUrl') || siteConfig.contacts.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hero"
              style={{ textDecoration: 'none', padding: '13px 26px', fontSize: '0.95rem' }}
            >
              <span>{c('gmaps.btn')}</span>
              <span className="arrow-circle">
                <ExternalLink size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS FILTER & GRID */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          {/* Interactive Filter Pills */}
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

          {/* 6 Review Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px', 
            marginTop: '36px' 
          }}>
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="light" />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '48px' }}>
            <button
              onClick={() => navigate('/kontak')}
              className="btn-primary-hero"
            >
              <span>{c('grid.btn')}</span>
              <span className="arrow-circle">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
