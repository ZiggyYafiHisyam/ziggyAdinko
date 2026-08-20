import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { testimonialsData } from '../data/siteData';
import { ReviewCard } from '../components/ReviewCard';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { getRows } from '../api';

export const Testimoni = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [reviews, setReviews] = useState(testimonialsData);

  useEffect(() => {
    getRows('/testimoni').then((rows) => {
      if (rows.length) setReviews(rows.map((item) => ({
        ...item,
        id: item.id ?? item.id_message,
        name: item.name,
        category: item.category ?? item.kebutuhan ?? 'Lainnya',
        text: item.text ?? item.details ?? '',
        rating: Number(item.rating ?? 5),
        time: item.time ?? item.created_at ?? '',
      })));
    }).catch(() => {});
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
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=80')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              Kepuasan Klien adalah Prioritas Kami
            </div>
            <h1 className="hero-title">
              Apa Kata Klien Kami?
            </h1>
            <p className="hero-subtitle">
              Berikut testimoni dari klien yang telah mempercayakan proyek mereka kepada kami. Hasil nyata, klien puas.
            </p>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. TESTIMONIALS FILTER & GRID */}
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
              <span>Lihat lebih banyak proyek</span>
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
