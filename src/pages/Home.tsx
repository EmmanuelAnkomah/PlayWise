import { Hero } from '../components/home/Hero';
import { FeaturedGames } from '../components/home/FeaturedGames';
import { PerformanceSection } from '../components/home/PerformanceSection';
import { TrendingGames } from '../components/home/TrendingGames';
import { InstallationCTA } from '../components/home/InstallationCTA';
import { CinematicStrips } from '../components/home/CinematicStrips';

export function Home() {
  return <main className="home-page"><Hero /><section className="home-intro"><p className="eyebrow">A BETTER WAY TO PICK A GAME</p><h2>More play.<br /><em>Less searching.</em></h2><p>We <strong className="install-highlight">cleanly install your PC games</strong>, check your hardware, and get you playing without the guesswork.</p><CinematicStrips /><div className="intro-stats"><span><b>8+</b> hand-picked worlds</span><span><b>3</b> performance tiers</span><span><b>∞</b> ways to play</span></div></section><div className="home-content"><FeaturedGames /><PerformanceSection /><TrendingGames /><InstallationCTA /></div></main>;
}
