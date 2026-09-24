import { genres } from '../../data/genres';

export function FilterBar({ genre, performance, onGenre, onPerformance }: { genre: string; performance: string; onGenre: (value: string) => void; onPerformance: (value: string) => void }) {
  return <div className="filter-bar"><select value={genre} onChange={(event) => onGenre(event.target.value)} aria-label="Filter by genre"><option value="all">All genres</option>{genres.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={performance} onChange={(event) => onPerformance(event.target.value)} aria-label="Filter by performance"><option value="all">All PCs</option><option value="low-end">Low-end PCs</option><option value="mid-range">Mid-range PCs</option><option value="high-end">High-end PCs</option></select></div>;
}
