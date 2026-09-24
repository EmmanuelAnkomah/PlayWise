import type { Game } from '../../types/game';
import { GameCard } from './GameCard';

export function GameGrid({ games }: { games: Game[] }) {
  if (!games.length) return <div className="empty-state"><h3>No games found</h3><p>Try a different search or filter.</p></div>;
  return <div className="game-grid">{games.map((game) => <GameCard key={game.id} game={game} />)}</div>;
}
