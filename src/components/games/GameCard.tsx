import { Heart, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';
import { Badge } from '../ui/Badge';
import { RatingStars } from '../ui/RatingStars';

export function GameCard({ game, badgeLabel }: { game: Game; badgeLabel?: string }) {
  const displayBadge = badgeLabel ?? game.badge;
  return <article className="game-card"><Link to={`/games/${game.id}`} className="game-cover"><img src={game.coverImage} alt="" loading="lazy" />{displayBadge && <Badge>{displayBadge}</Badge>}<span className={`tier tier-${game.performanceCategory}`}>{game.performanceCategory}</span></Link><div className="game-card-body"><div className="game-meta"><span>{game.releaseYear}</span><span>•</span><span>{game.genres[0]}</span></div><h3><Link to={`/games/${game.id}`}>{game.title}</Link></h3><p>{game.description}</p><div className="card-bottom"><RatingStars rating={game.rating} /><span className="likes"><Heart size={14} /> {game.likes}</span><span className="size"><HardDrive size={14} /> {game.sizeEstimate ?? '—'}</span></div></div></article>;
}
