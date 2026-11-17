import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';
import { OptimizedImage } from '../ui/OptimizedImage';

export function TrendingCard({ game, statusLabel, priority = false }: { game: Game; statusLabel?: string; priority?: boolean }) {
  return (
    <article className={`trending-card trending-card-${game.id}`}>
      <Link to={`/games/${game.id}`} className="trending-card-art">
        <OptimizedImage src={game.coverImage} alt={`${game.title} artwork`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" fallbackSrc={game.backdropImage} />
        <span className="trending-card-slash" />
      </Link>
      <div className="trending-card-content">
        <div className="trending-card-status">{statusLabel ?? game.status}</div>
        <div className="trending-card-meta"><span>{game.genres[0]}</span>{game.platform && <span>{game.platform}</span>}</div>
        <h3><Link to={`/games/${game.id}`}>{game.title}</Link></h3>
        <Link className="trending-card-link" to={`/games/${game.id}`} aria-label={`View ${game.title}`}><ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
