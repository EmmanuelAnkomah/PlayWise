import { libraryGames } from '../data/games';
import { VaultHero } from '../components/library/VaultHero';
import { VaultGameWall } from '../components/library/VaultGameWall';
import { siteConfig } from '../config/siteConfig';

export function LowEndGames() {
  const lowEndGames = libraryGames.filter((game) => game.performanceCategory === 'low-end');
  return <main className="vault-page"><VaultHero poster={siteConfig.libraryBanner} /><div className="vault-main"><VaultGameWall games={lowEndGames} /></div></main>;
}
