import type { SortOption } from '../../types/game';

export function SortControl({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return <label className="sort-control">Sort by <select value={value} onChange={(event) => onChange(event.target.value as SortOption)}><option value="popular">Most popular</option><option value="rating">Top rated</option><option value="newest">Newest</option><option value="alphabetical">A–Z</option></select></label>;
}
