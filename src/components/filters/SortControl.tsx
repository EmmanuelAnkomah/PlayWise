import type { SortOption } from '../../types/game';

export function SortControl({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return <label className="sort-control">Sort by <select value={value} onChange={(event) => onChange(event.target.value as SortOption)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="alphabetical">A–Z</option><option value="genre">Genre</option><option value="hardware">Hardware</option></select></label>;
}
