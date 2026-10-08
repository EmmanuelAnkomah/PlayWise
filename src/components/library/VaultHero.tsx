import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type VaultHeroProps = {
  poster: string;
};

export function VaultHero({ poster }: VaultHeroProps) {
  const location = useLocation();
  const fromPerformanceDropdown = (location.state as { fromPerformanceDropdown?: boolean } | null)?.fromPerformanceDropdown === true;
  const transitionClass = fromPerformanceDropdown ? ' performance-tier-transition' : '';

  useEffect(() => {
    if (!fromPerformanceDropdown) return;

    const scrollTimer = window.setTimeout(() => {
      const gameWall = document.querySelector<HTMLElement>('.vault-wall');
      if (!gameWall) return;
      gameWall.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 850);

    return () => window.clearTimeout(scrollTimer);
  }, [fromPerformanceDropdown, location.key]);

  return <section className={`vault-hero${transitionClass}`}>
    <img className="vault-hero-video" src={poster} alt="" aria-hidden="true" />
    <div className="vault-hero-shade" />
    <div className="vault-hero-grain" aria-hidden="true" />
    <div className="vault-hero-inner">
      <p className="eyebrow">THE PLAYWISE LIBRARY</p>
      <h1>Your next game<br />starts <em>here.</em></h1>
    </div>
  </section>;
}
