import { games } from '../../data/games';
import { SectionHeader } from '../ui/SectionHeader';
import { GameGrid } from '../games/GameGrid';

export function FeaturedGames() {
  return <section className="section"><SectionHeader eyebrow="HAND-PICKED FOR YOU" title="Featured games" action={{ label: 'View all games', to: '/explore' }} /><GameGrid games={games.filter((game) => game.featured).slice(0, 3)} /></section>;
}
