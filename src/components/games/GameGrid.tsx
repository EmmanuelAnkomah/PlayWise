import type { Game } from '../../types/game';
import { GameCard } from './GameCard';

export function GameGrid({ games, badgeLabel, className = '' }: { games: Game[]; badgeLabel?: string; className?: string }) {
  if (!games.length) return <div className="empty-state"><h3>No games found</h3><p>Try a different search or filter.</p></div>;
  return <div className={`game-grid ${className}`.trim()}>{games.map((game) => <GameCard key={game.id} game={game} badgeLabel={badgeLabel} />)}</div>;
}
