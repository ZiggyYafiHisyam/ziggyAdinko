import { Link } from 'react-router-dom';
import { DualBrandLogo } from '../assets/Logos';
import { usePageContent } from '../context/ContentContext';

export const Footer = () => {
  const { c } = usePageContent('global');

  return (
    <footer className="footer-dark">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <DualBrandLogo size={42} light={true} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '16px', color: '#FFFFFF' }}>
              {c('footer.brandHeading')}
            </h3>
            <p className="footer-brand-desc">
              {c('footer.desc')}
              <br />
              <span style={{ opacity: 0.85, marginTop: '8px', display: 'inline-block' }}>
                {c('footer.descNote')}
              </span>
            </p>
            <div className="footer-social-icons">
              {/* Facebook */}
              <a href={c('footer.facebookUrl')} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href={c('footer.youtubeUrl')} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href={c('footer.instagramUrl')} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="footer-col-title">{c('footer.col1Title')}</h4>
            <ul className="footer-nav-list">
              <li><Link to="/tentang-adinko" className="footer-nav-link">{c('footer.col1Link1')}</Link></li>
              <li><Link to="/portofolio" className="footer-nav-link">{c('footer.col1Link2')}</Link></li>
              <li><Link to="/testimoni" className="footer-nav-link">{c('footer.col1Link3')}</Link></li>
              <li><Link to="/kontak" className="footer-nav-link">{c('footer.col1Link4')}</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="footer-col-title">{c('footer.col2Title')}</h4>
            <ul className="footer-nav-list">
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col2Link1')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col2Link2')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col2Link3')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col2Link4')}</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="footer-col-title">{c('footer.col3Title')}</h4>
            <ul className="footer-nav-list">
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col3Link1')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col3Link2')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col3Link3')}</Link></li>
              <li><Link to="/layanan" className="footer-nav-link">{c('footer.col3Link4')}</Link></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-copyright">
          {c('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};
