import { useEffect, useState } from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../assets/Icons';
import { siteConfig } from '../data/siteData';
import { ContactForm } from '../components/ContactForm';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { usePageContent } from '../context/ContentContext';
import { getRows } from '../api';

export const Kontak = () => {
  const { c } = usePageContent('kontak');
  const gc = usePageContent('global').c;
  const [contactContent, setContactContent] = useState(null);

  useEffect(() => {
    getRows('/kontak').then((rows) => {
      if (rows[0]) setContactContent(rows[0]);
    }).catch(() => {});
  }, []);

  const directWa = gc('contacts.directWa') || siteConfig.contacts.directWaNumber;
  const handleWaHeroClick = () => {
    window.open(`https://wa.me/${directWa}?text=Halo%20Adinko%20%26%20GhaziSportsHub,%20saya%20ingin%20konsultasi%20langsung`, '_blank');
  };

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

      {/* 2. MAIN CONTACT DETAILS & FORM */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Hubungi Kami Details & Maps */}
            <div className="contact-info-card">
              <span className="section-tag">{c('details.tag')}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>
                {contactContent?.kontak_title || c('details.heading')}
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
                onClick={handleWaHeroClick}
                className="btn-primary-hero"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{c('details.btn')}</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>

            {/* Right Column: Form Kirim Pesan Sekarang */}
            <ContactForm title={c('details.formTitle')} />
          </div>
        </div>
      </section>
    </div>
  );
};
