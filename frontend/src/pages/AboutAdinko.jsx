import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Award, ShieldCheck, Wrench, Wallet } from 'lucide-react';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { usePageContent } from '../context/ContentContext';
import { getRows } from '../api';

const toList = (str) => (str || '').split(',').map(s => s.trim()).filter(Boolean);

export const AboutAdinko = () => {
  const navigate = useNavigate();
  const { c } = usePageContent('about-adinko');
  const [activeSlide, setActiveSlide] = useState(0);
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    getRows('/about').then((rows) => {
      if (rows[0]) setAboutContent(rows[0]);
    }).catch(() => {});
  }, []);

  const slides = [c('who.slide1'), c('who.slide2'), c('who.slide3')];
  const next = () => setActiveSlide((p) => (p + 1) % slides.length);
  const prev = () => setActiveSlide((p) => (p - 1 + slides.length) % slides.length);

  const solutions = [1, 2, 3, 4].map((n) => ({ title: c(`sol.c${n}title`), img: c(`sol.c${n}img`) }));
  const focusIcon = (n) => {
    if (n === 1) return <Award size={20} />;
    if (n === 2) return <Wrench size={20} />;
    if (n === 3) return <ShieldCheck size={20} />;
    return <Wallet size={20} />;
  };

  return (
    <div>
      {/* 1. HERO */}
      <section className="hero-wrapper" style={{ backgroundImage: `url('${c('hero.bg')}')` }}>
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">{c('hero.tag')}</div>
            <h1 className="hero-title">{c('hero.title')}</h1>
            <p className="hero-subtitle">{c('hero.subtitle')}</p>
          </div>
        </div>
        <HeroFloatingBadge />
      </section>

      {/* 2. SIAPA KAMI */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="dual-brand-grid">
            <div>
              <span className="section-tag">{c('who.tag')}</span>
              <h2 className="section-title">{c('who.title')}</h2>
              <p className="section-subtitle" style={{ marginBottom: '24px' }}>
                {aboutContent?.content || c('who.body')}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/kontak')} className="btn-primary-hero" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                  <span>{c('who.btn1')}</span>
                </button>
                <button onClick={() => navigate('/portofolio')} className="btn-primary-hero" style={{ background: 'var(--green-700)', padding: '12px 24px', fontSize: '0.9rem' }}>
                  <span>{c('who.btn2')}</span>
                </button>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '360px', boxShadow: 'var(--shadow-md)' }}>
              <img src={slides[activeSlide]} alt="Adinko" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={prev} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--black)', boxShadow: 'var(--shadow-sm)' }} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--black)', boxShadow: 'var(--shadow-sm)' }} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-tag">{c('vm.tag')}</span>
            <h2 className="section-title">{c('vm.title')}</h2>
            <p className="section-subtitle mx-auto">{c('vm.subtitle')}</p>
          </div>

          <div className="vision-mission-grid">
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img src={c('vm.image')} alt="Adinko" style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: 'rgba(13, 21, 11, 0.75)', backdropFilter: 'blur(8px)', padding: '16px 20px', borderRadius: '16px', color: '#FFFFFF' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>{c('vm.valuesLabel')}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {toList(c('vm.values')).map((val, i) => <span key={i} className="badge-tag">{val}</span>)}
                </div>
              </div>
            </div>

            <div>
              <div className="box-visi">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--green-700)', marginBottom: '8px' }}>{c('vm.visiTitle')}</h3>
                <p style={{ fontSize: '0.92rem', color: '#333333', lineHeight: 1.6 }}>{c('vm.visiBody')}</p>
              </div>
              <div className="box-misi">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>{c('vm.misiTitle')}</h3>
                <ul className="misi-list">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n}><span className="misi-bullet" /><span>{c(`vm.misi${n}`)}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOKUS KEUNGGULAN */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">{c('focus.tag')}</span>
            <h2 className="section-title">{c('focus.title')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="feature-card" style={{ cursor: 'default' }}>
                <div className="feature-card-header">
                  <div className="feature-icon-box">{focusIcon(n)}</div>
                  <span className="feature-number">00{n}</span>
                </div>
                <div>
                  <h4 className="feature-card-title">{c(`focus.c${n}title`)}</h4>
                  <p className="feature-card-desc">{c(`focus.c${n}desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOLUSI / PRODUK */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">{c('sol.tag')}</span>
            <h2 className="section-title">{c('sol.title')}</h2>
            <p className="section-subtitle mx-auto">{c('sol.subtitle')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', margin: '40px 0' }}>
            {solutions.map((item, idx) => (
              <div key={idx} className="project-card">
                <div className="project-img-wrapper" style={{ height: '180px' }}>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="project-body" style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => navigate('/kontak')} className="btn-primary-hero">
              <span>{c('sol.btn')}</span>
              <span className="arrow-circle"><ArrowRight size={14} /></span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ background: 'var(--green-900)', borderRadius: '24px', padding: '60px 40px', color: '#FFFFFF', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <span className="section-tag" style={{ color: 'var(--green-300)' }}>{c('cta.tag')}</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '10px 0 16px 0', color: '#FFFFFF' }}>{c('cta.title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '550px', margin: '0 auto 30px auto', fontSize: '1rem' }}>{c('cta.body')}</p>
          <button onClick={() => navigate('/kontak')} style={{ background: '#FFFFFF', color: 'var(--green-900)', padding: '14px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <span>{c('cta.btn')}</span>
            <span className="arrow-circle" style={{ background: 'var(--green-600)', color: '#FFFFFF' }}><ArrowRight size={14} /></span>
          </button>
        </div>
      </section>
    </div>
  );
};
