import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';

export function TrendingCard({ game }: { game: Game }) {
  return (
    <article className="trending-card">
      <Link to={`/games/${game.id}`} className="trending-card-art">
        <img src={game.coverImage} alt={`${game.title} artwork`} loading="lazy" />
        <span className="trending-card-slash" />
      </Link>
      <div className="trending-card-content">
        <div className="trending-card-status">{game.status}</div>
        <div className="trending-card-meta"><span>{game.genres[0]}</span>{game.platform && <span>{game.platform}</span>}</div>
        <h3><Link to={`/games/${game.id}`}>{game.title}</Link></h3>
        <Link className="trending-card-link" to={`/games/${game.id}`} aria-label={`View ${game.title}`}><ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
