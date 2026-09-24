import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function Footer() {
  return <footer className="footer"><div><Link to="/" className="brand">PLAY<span>WISE</span></Link><p className="muted">Discover. Install. Play.</p></div><div className="footer-links"><Link to="/explore">Explore games</Link><Link to="/request-installation">Request installation</Link><Link to="/contact">Contact us</Link></div><p className="muted">© {new Date().getFullYear()} Playwise</p><a className="muted" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></footer>;
}
