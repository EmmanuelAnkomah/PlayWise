import { Link, useParams } from 'react-router-dom';
import { games } from '../data/games';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { RatingStars } from '../components/ui/RatingStars';
import { GameGallery } from '../components/games/GameGallery';
import { HardwareRequirements } from '../components/games/HardwareRequirements';
import { RelatedGames } from '../components/games/RelatedGames';
import { PageContainer } from '../components/layout/PageContainer';
import { WhatsAppButton } from '../components/contact/WhatsAppButton';

export function GameDetails() {
  const { id } = useParams();
  const game = games.find((item) => item.id === id);
  if (!game) return <PageContainer><div className="empty-state"><h1>Game not found</h1><Link className="text-link" to="/explore">Back to explore</Link></div></PageContainer>;
  return <PageContainer><Link className="back-link" to="/explore">← Back to explore</Link><section className="details-hero" style={{ backgroundImage: `linear-gradient(90deg, var(--bg) 5%, transparent 75%), url(${game.backdropImage})` }}><div><Badge>{game.performanceCategory}</Badge><h1>{game.title}</h1><p className="tagline">{game.tagline}</p><RatingStars rating={game.rating} /><p className="details-description">{game.longDescription ?? game.description}</p><div className="details-actions"><Button to={`/request-installation?game=${game.id}`}>Request installation</Button><WhatsAppButton gameTitle={game.title} label="Ask about compatibility" /></div></div></section><GameGallery game={game} /><div className="details-info"><HardwareRequirements requirements={game.minimumRequirements} /><HardwareRequirements title="Recommended requirements" requirements={game.recommendedRequirements ?? game.minimumRequirements} /></div><RelatedGames games={games} current={game} /></PageContainer>;
}
