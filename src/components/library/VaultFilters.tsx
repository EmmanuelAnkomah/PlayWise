import type { SortOption } from '../../types/game';

const tierLabels = { all: 'All games', 'low-end': 'Low-end', 'mid-range': 'Medium', 'high-end': 'High-end' } as const;

type VaultFiltersProps = {
  total: number;
  genre: string;
  tier: string;
  sort: SortOption;
  genres: string[];
  onGenre: (value: string) => void;
  onTier: (value: string) => void;
  onSort: (value: SortOption) => void;
};

export function VaultFilters({ total, genre, tier, sort, genres, onGenre, onTier, onSort }: VaultFiltersProps) {
  return <section className="vault-controls" aria-label="Game library filters">
    <div className="vault-control-heading"><p className="eyebrow">REFINE THE VAULT</p><p><b>{total}</b> games available</p></div>
    <div className="vault-filter-row"><span className="vault-filter-label">GENRE</span><div className="vault-chip-scroll">{['all', ...genres].map((item) => <button key={item} type="button" className={genre === item ? 'vault-chip active' : 'vault-chip'} onClick={() => onGenre(item)} aria-pressed={genre === item}>{item === 'all' ? 'All' : item}</button>)}</div></div>
    <div className="vault-filter-row"><span className="vault-filter-label">HARDWARE</span><div className="vault-tier-controls">{Object.entries(tierLabels).map(([value, label]) => <button key={value} type="button" className={tier === value ? 'vault-tier-filter active' : 'vault-tier-filter'} onClick={() => onTier(value)} aria-pressed={tier === value}><i />{label}</button>)}</div><label className="vault-sort">SORT <select value={sort} onChange={(event) => onSort(event.target.value as SortOption)} aria-label="Sort games"><option value="featured">Featured first</option><option value="alphabetical">A–Z</option><option value="newest">Recently added</option><option value="genre">Genre</option><option value="hardware">Hardware tier</option></select></label></div>
  </section>;
}
