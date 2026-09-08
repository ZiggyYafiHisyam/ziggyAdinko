import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/siteData';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { usePageContent } from '../context/ContentContext';
import { getRows } from '../api';

const toTags = (str) => (str || '').split(',').map(s => s.trim()).filter(Boolean);

export const Layanan = () => {
  const navigate = useNavigate();
  const { c } = usePageContent('layanan');
  const [serviceItems, setServiceItems] = useState(servicesData.allGrid);

  useEffect(() => {
    getRows('/layanan').then((rows) => {
      if (rows.length) setServiceItems(rows.map((item, index) => ({
        ...item,
        id: item.id_layanan ?? item.id ?? index,
        title: item.title ?? item.nama_layanan ?? item.name,
        category: item.category ?? item.kategori ?? '',
        image: item.image ?? item.gambar ?? item.image_url,
      })));
    }).catch(() => {});
  }, []);

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

      {/* 2. DUAL BRAND SERVICES COMPARISON */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Brand 1: ADINKO */}
            <div style={{ background: 'var(--gray-bg)', borderRadius: '24px', padding: '36px', border: '1px solid var(--gray-border)' }}>
              <span className="section-tag">{c('adinko.brand')}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '14px' }}>
                {c('adinko.title')}
              </h2>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {c('adinko.desc')}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {toTags(c('adinko.tags')).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="badge-tag"
                    style={{ background: 'var(--green-50)', color: 'var(--green-700)', borderColor: 'var(--green-300)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Brand 2: GhaziSportsHub */}
            <div style={{ background: 'var(--gray-bg)', borderRadius: '24px', padding: '36px', border: '1px solid var(--gray-border)' }}>
              <span className="section-tag">{c('ghazi.brand')}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '14px' }}>
                {c('ghazi.title')}
              </h2>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {c('ghazi.desc')}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {toTags(c('ghazi.tags')).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="badge-tag"
                    style={{ background: '#EAECE9', color: 'var(--black)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SATU SOLUSI UNTUK SEMUA KEBUTUHAN ANDA (8 Cards Grid) */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">{c('grid.tag')}</span>
            <h2 className="section-title">{c('grid.title')}</h2>
            <p className="section-subtitle mx-auto">
              {c('grid.subtitle')}
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px', 
            margin: '40px 0' 
          }}>
            {serviceItems.map((item) => (
              <div key={item.id} className="project-card">
                <div className="project-img-wrapper" style={{ height: '180px' }}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="project-body" style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
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
