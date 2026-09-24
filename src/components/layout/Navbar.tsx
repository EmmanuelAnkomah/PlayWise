import { ChevronDown, Menu, Search, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { genres } from '../../data/genres';

const genreOrder = ['sports', 'racing', 'action', 'adventure', 'strategy', 'rpg'];

const performanceLinks = [
  { label: 'Low-end', description: 'Lighter requirements', indicator: '▰□□□', to: '/low-end' },
  { label: 'Mid', description: 'Balanced requirements', indicator: '▰▰□□', to: '/explore?performance=mid-range' },
  { label: 'Hardware intensive', description: 'Demanding requirements', indicator: '▰▰▰▰', to: '/high-end' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<'genres' | 'performance' | null>(null);
  const [mobileSection, setMobileSection] = useState<'genres' | 'performance' | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const location = useLocation();

  const closeMenus = () => {
    setDesktopMenu(null);
    setMobileSection(null);
  };

  const closeMobile = () => {
    setOpen(false);
    closeMenus();
  };

  const scheduleDesktopClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDesktopMenu(null), 120);
  };

  const cancelDesktopClose = () => window.clearTimeout(closeTimer.current);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenus();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const genresActive = location.pathname === '/genres' || location.search.includes('genre=');
  const performanceActive = ['/low-end', '/high-end'].includes(location.pathname) || location.search.includes('performance=');
  const orderedGenres = genreOrder
    .map((id) => genres.find((genre) => genre.id === id))
    .filter((genre): genre is (typeof genres)[number] => Boolean(genre));

  return <header className="navbar">
    <div className="navbar-inner">
      <Link to="/" className="brand"><span className="brand-mark">P</span><span className="brand-name">playwise</span></Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <NavLink to="/explore" onClick={closeMobile}>Game library</NavLink>
        <div className="nav-dropdown" onMouseEnter={() => { cancelDesktopClose(); setDesktopMenu('genres'); }} onMouseLeave={scheduleDesktopClose}>
          <Link className={`nav-dropdown-trigger${genresActive ? ' active' : ''}`} to="/genres" aria-label="Open genres page">
            Genres <ChevronDown size={15} strokeWidth={2} />
          </Link>
          <div className={`nav-mega-menu nav-mega-genres${desktopMenu === 'genres' ? ' is-open' : ''}`} aria-label="Explore by genre">
            <div className="nav-mega-heading"><span>EXPLORE BY GENRE</span><i /></div>
            <div className="nav-genre-grid">
              {orderedGenres.map((genre) => <Link key={genre.id} to={`/explore?genre=${genre.id}`} onClick={closeMobile} className="nav-menu-item">
                <span className="nav-menu-copy"><b>{genre.name.toUpperCase()}</b></span>
                <ArrowUpRight size={15} />
              </Link>)}
            </div>
          </div>
        </div>
        <div className="nav-dropdown" onMouseEnter={() => { cancelDesktopClose(); setDesktopMenu('performance'); }} onMouseLeave={scheduleDesktopClose}>
          <button className={`nav-dropdown-trigger${performanceActive ? ' active' : ''}`} type="button" aria-expanded={desktopMenu === 'performance'} onClick={() => setDesktopMenu(desktopMenu === 'performance' ? null : 'performance')}>
            Performance <ChevronDown size={15} strokeWidth={2} />
          </button>
          <div className={`nav-mega-menu nav-mega-performance${desktopMenu === 'performance' ? ' is-open' : ''}`} aria-label="Find your performance level">
            <div className="nav-mega-heading"><span>FIND YOUR PERFORMANCE LEVEL</span><i /></div>
            <div className="nav-performance-list">
              {performanceLinks.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile} className="nav-menu-item nav-performance-item">
                <span className="nav-performance-copy"><b>{item.label.toUpperCase()}</b><small>{item.description}</small></span>
                <span className="nav-performance-indicator" aria-hidden="true">{item.indicator}</span>
                <ArrowUpRight size={15} />
              </Link>)}
            </div>
          </div>
        </div>
        <div className="nav-mobile-sections">
          <button type="button" className={`nav-mobile-section-trigger${mobileSection === 'genres' ? ' is-expanded' : ''}`} aria-expanded={mobileSection === 'genres'} onClick={() => setMobileSection(mobileSection === 'genres' ? null : 'genres')}>Genres <span>{mobileSection === 'genres' ? '−' : '+'}</span></button>
          <div className={`nav-mobile-section${mobileSection === 'genres' ? ' is-open' : ''}`}>
            {orderedGenres.map((genre) => <Link key={genre.id} to={`/explore?genre=${genre.id}`} onClick={closeMobile}>{genre.name}<ArrowUpRight size={14} /></Link>)}
          </div>
          <button type="button" className={`nav-mobile-section-trigger${mobileSection === 'performance' ? ' is-expanded' : ''}`} aria-expanded={mobileSection === 'performance'} onClick={() => setMobileSection(mobileSection === 'performance' ? null : 'performance')}>Performance <span>{mobileSection === 'performance' ? '−' : '+'}</span></button>
          <div className={`nav-mobile-section${mobileSection === 'performance' ? ' is-open' : ''}`}>
            {performanceLinks.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}<ArrowUpRight size={14} /></Link>)}
          </div>
        </div>
        <NavLink to="/high-end" onClick={closeMobile}>High-end picks</NavLink>
      </nav>
      <div className="nav-actions"><Link className="nav-login" to="/contact">Contact</Link><Link className="nav-cta" to="/request-installation">Find my game</Link><Link className="nav-search" to="/explore" aria-label="Search games"><Search size={18} /></Link></div>
    </div>
  </header>;
}
