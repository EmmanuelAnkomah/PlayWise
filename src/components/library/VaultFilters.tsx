import type { SortOption } from '../../types/game';
import { Search } from 'lucide-react';

const tierLabels = { all: 'All games', 'low-end': 'Low-end', 'mid-range': 'Medium', 'high-end': 'High-end' } as const;

type VaultFiltersProps = {
  genre: string;
  tier: string;
  sort: SortOption;
  genres: string[];
  onGenre: (value: string) => void;
  onTier: (value: string) => void;
  onSort: (value: SortOption) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

export function VaultFilters({ genre, tier, sort, genres, onGenre, onTier, onSort, query, onQueryChange }: VaultFiltersProps) {
  return <section className="vault-controls" aria-label="Game library filters">
    <label className="vault-library-search"><Search size={17} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search games, genres, franchises..." aria-label="Search the game library" /></label>
    <div className="vault-control-heading"></div>
    <div className="vault-filter-row"><span className="vault-filter-label">GENRE</span><div className="vault-chip-scroll">{['all', ...genres].map((item) => <button key={item} type="button" className={genre === item ? 'vault-chip active' : 'vault-chip'} onClick={() => onGenre(item)} aria-pressed={genre === item}>{item === 'all' ? 'All' : item}</button>)}</div></div>
    <div className="vault-filter-row"><span className="vault-filter-label">HARDWARE</span><div className="vault-tier-controls">{Object.entries(tierLabels).map(([value, label]) => <button key={value} type="button" className={tier === value ? 'vault-tier-filter active' : 'vault-tier-filter'} onClick={() => onTier(value)} aria-pressed={tier === value}><i />{label}</button>)}</div><label className="vault-sort">SORT <select value={sort} onChange={(event) => onSort(event.target.value as SortOption)} aria-label="Sort games"><option value="featured">Featured first</option><option value="alphabetical">A–Z</option><option value="newest">Recently added</option><option value="genre">Genre</option><option value="hardware">Hardware tier</option></select></label></div>
  </section>;
}
