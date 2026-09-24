import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GenreItem } from '../../types/game';

export function GenreCard({ genre }: { genre: GenreItem }) {
  return <Link to={`/explore?genre=${genre.id}`} className="genre-card"><img src={genre.image} alt="" loading="lazy" /><div><p className="eyebrow">{genre.popularCount} games</p><h3>{genre.name}</h3><p>{genre.description}</p></div><ArrowUpRight /></Link>;
}
