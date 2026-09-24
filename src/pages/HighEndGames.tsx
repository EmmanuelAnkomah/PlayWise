import { games } from '../data/games';
import { PageContainer } from '../components/layout/PageContainer';
import { GameGrid } from '../components/games/GameGrid';
import { PageHero } from '../components/layout/PageHero';

export function HighEndGames() {
  return <PageContainer><PageHero eyebrow="PUSH YOUR HARDWARE" title="High-end games" description="Big worlds and beautiful visuals for powerful gaming rigs." image={games[0].backdropImage} /><GameGrid games={games.filter((game) => game.performanceCategory === 'high-end')} /></PageContainer>;
}
