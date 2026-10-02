import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="footer"><div><Link to="/" className="brand"><span className="brand-mark">P</span><span className="brand-name">playwise</span></Link><p className="muted">Discover. Install. Play.</p></div><div className="footer-links"><Link to="/explore">Explore games</Link><Link to="/request-installation">Request installation</Link><Link to="/contact">Contact us</Link></div><p className="muted">© {new Date().getFullYear()} Playwise</p></footer>;
}
