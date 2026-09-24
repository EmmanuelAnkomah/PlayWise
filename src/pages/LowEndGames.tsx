import { games } from '../data/games';
import { PageContainer } from '../components/layout/PageContainer';
import { GameGrid } from '../components/games/GameGrid';
import { PageHero } from '../components/layout/PageHero';

export function LowEndGames() {
  return <PageContainer><PageHero eyebrow="MADE FOR MORE PCS" title="Low-end games" description="Fantastic adventures that run smoothly on everyday hardware." image={games[2].backdropImage} /><GameGrid games={games.filter((game) => game.performanceCategory === 'low-end')} /></PageContainer>;
}
