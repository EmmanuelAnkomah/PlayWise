import type { Game } from '../../types/game';
import { GameGrid } from './GameGrid';

export function RelatedGames({ games, current }: { games: Game[]; current: Game }) {
  const related = games.filter((game) => game.id !== current.id && game.genres.some((genre) => current.genres.includes(genre))).slice(0, 3);
  return related.length ? <section><h2 className="subsection-title">You may also like</h2><GameGrid games={related} /></section> : null;
}
