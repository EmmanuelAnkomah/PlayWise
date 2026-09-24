import { Search } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

type VaultHeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  poster: string;
};

export function VaultHero({ query, onQueryChange, poster }: VaultHeroProps) {
  return <section className="vault-hero">
    <video className="vault-hero-video" autoPlay muted loop playsInline poster={poster} aria-hidden="true"><source src={siteConfig.heroVideo} type="video/mp4" /></video>
    <div className="vault-hero-shade" />
    <div className="vault-hero-grain" aria-hidden="true" />
    <div className="vault-hero-inner">
      <div className="vault-hero-kicker"><span>PLAYWISE / GAME LIBRARY</span><span>VAULT 01</span></div>
      <p className="eyebrow">THE PLAYWISE GAME VAULT</p>
      <h1>Your next game<br />starts <em>here.</em></h1>
      <p className="vault-hero-copy">Browse the collection, check your hardware, and request installation when you are ready to play.</p>
      <label className="vault-hero-search"><Search size={20} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search games, genres, franchises..." aria-label="Search the game library" /><kbd>⌘ K</kbd></label>
    </div>
    <div className="vault-hero-trace" aria-hidden="true"><span>DISCOVER</span><i /><span>CHECK</span><i /><span>REQUEST</span><i /><span>PLAY</span></div>
  </section>;
}
