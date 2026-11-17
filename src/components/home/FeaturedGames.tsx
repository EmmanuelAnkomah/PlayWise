import { games } from '../../data/games';
import { SectionHeader } from '../ui/SectionHeader';
import { GameGrid } from '../games/GameGrid';

export function FeaturedGames() {
  return <section className="section"><SectionHeader eyebrow="LIBRARY SELECTIONS" title="Games to consider" action={{ label: 'Open game library', to: '/explore' }} /><GameGrid games={games.filter((game) => game.featured).slice(0, 3)} showBadge={false} className="game-grid-featured" /></section>;
}
