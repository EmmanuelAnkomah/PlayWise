import { libraryGames } from '../data/games';
import { VaultHero } from '../components/library/VaultHero';
import { VaultGameWall } from '../components/library/VaultGameWall';
import { siteConfig } from '../config/siteConfig';

export function HighEndGames() {
  const highEndGames = libraryGames.filter((game) => game.performanceCategory === 'high-end');
  return <main className="vault-page"><VaultHero poster={siteConfig.libraryBanner} /><div className="vault-main"><VaultGameWall games={highEndGames} /></div></main>;
}
