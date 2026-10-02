import { ArrowUpRight, Play, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/siteConfig';
import { useRef, type PointerEvent } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const moveWithPointer = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    heroRef.current?.style.setProperty('--pointer-x', x.toFixed(3));
    heroRef.current?.style.setProperty('--pointer-y', y.toFixed(3));
  };

  const resetPointer = () => {
    heroRef.current?.style.setProperty('--pointer-x', '0');
    heroRef.current?.style.setProperty('--pointer-y', '0');
  };

  return (
    <section className="hero" ref={heroRef} onPointerMove={moveWithPointer} onPointerLeave={resetPointer}>
      <video className="hero-video" autoPlay muted loop playsInline poster="https://i.pinimg.com/736x/e0/29/5b/e0295b50d6f6114fe7c0b3c3254d613e.jpg" aria-hidden="true">
        <source src={siteConfig.heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">YOUR NEXT GREAT GAME STARTS HERE</p>
        <h1>Play something<br />you’ll <em>love.</em></h1>
        <p className="hero-copy">A sharper way to discover PC games that fit your taste, your time, and your setup.</p>
        <div className="hero-actions">
          <Button to="/explore">Explore the library <ArrowUpRight size={18} /></Button>
          <Link className="hero-search" to="/request-installation#request-next"><span className="hero-play"><Play size={13} fill="currentColor" /></span> See how PlayWise works</Link>
        </div>
      </div>
      <div className="hero-discovery-card" aria-hidden="true">
        <div className="hero-discovery-icon"><Search size={17} /></div>
        <div><b>Find your next<br />obsession.</b></div>
      </div>
    </section>
  );
}
