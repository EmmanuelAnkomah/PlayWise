import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { BrandLogo } from './BrandLogo';

function YoutubeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" /><path fill="#fff" d="m9.6 15.8 6.3-3.8-6.3-3.8v7.6Z" /></svg>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-brand"><BrandLogo /><p className="muted">Discover. Install. Play.</p></div><div className="footer-links"><Link to="/explore">Explore games</Link><Link to="/request-installation">Request installation</Link><Link to="/contact">Contact us</Link></div><div className="footer-socials" aria-label="Playwise social links"><a className="footer-social-tiktok" href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer" aria-label="Playwise on TikTok"><i className="fa-brands fa-tiktok" aria-hidden="true"></i></a><a className="footer-social-youtube" href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" aria-label="Playwise on YouTube"><YoutubeIcon /></a></div><p className="muted footer-copyright">© {new Date().getFullYear()} Playwise</p></footer>;
}
