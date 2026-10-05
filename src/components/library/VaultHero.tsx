import { Search } from 'lucide-react';

type VaultHeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  poster: string;
};

export function VaultHero({ query, onQueryChange, poster }: VaultHeroProps) {
  return <section className="vault-hero">
    <img className="vault-hero-video" src={poster} alt="" aria-hidden="true" />
    <div className="vault-hero-shade" />
    <div className="vault-hero-grain" aria-hidden="true" />
    <div className="vault-hero-inner">
      <h1>Your next game<br />starts <em>here.</em></h1>
      <label className="vault-hero-search"><Search size={18} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search games, genres, franchises..." aria-label="Search the game library" /></label>
    </div>
  </section>;
}
