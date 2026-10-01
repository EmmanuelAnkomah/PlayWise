import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { games } from '../data/games';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { GameGallery } from '../components/games/GameGallery';
import { HardwareRequirements } from '../components/games/HardwareRequirements';
import { PageContainer } from '../components/layout/PageContainer';

type FeaturedDetails = {
  about: string;
  screenshots: string[];
  heroImage?: string;
  minimum: Parameters<typeof HardwareRequirements>[0]['requirements'];
  recommended: Parameters<typeof HardwareRequirements>[0]['requirements'];
};

const art = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;
const requirements = (processor: string, memory: string, graphics: string, storage: string, operatingSystem: string, additionalNotes: string) => ({ processor, memory, graphics, storage, operatingSystem, directX: 'DirectX 12', additionalNotes });

const featuredDetails: Record<string, FeaturedDetails> = {
  'forza-horizon-6': {
    about: 'Forza Horizon 6 moves the festival to Japan, connecting neon city streets, countryside roads, mountain passes and coastal highways in one open-world racing experience. Build a garage of more than 550 cars, explore solo or with friends, and create events through the expanded EventLab.',
    screenshots: ['https://images.squarespace-cdn.com/content/v1/5c95f8d416b640656eb7765a/1769109600663-PX9QS40SY9M4Y9JGHI7L/Forza+Horizon+6.png?format=2500w', art('photo-1503736334956-4c8f8e92946d'), art('photo-1492144534655-ae79c964c9d7')],
    minimum: requirements('Intel Core i5-8400 / AMD Ryzen 5 2600', '8 GB RAM', 'GTX 1660 / RX 590 / Intel Arc A580', '160 GB SSD', 'Windows 10/11 64-bit', '1080p, Low preset, 60 FPS.'),
    recommended: requirements('Intel Core i5-12600K / AMD Ryzen 7 5800X', '16 GB RAM', 'RTX 3070 / RX 6800 XT', '160 GB SSD', 'Windows 10/11 64-bit', '1440p, High preset.'),
  },
  'the-last-of-us-part-ii-remastered': {
    about: 'The Last of Us Part II Remastered is a cinematic survival story about Ellie and Abby, rebuilt for PC with improved detail, scalable graphics and a complete suite of accessibility options. Alongside the campaign, No Return adds a replayable roguelike mode with new characters, maps and encounters.',
    heroImage: 'https://i.pinimg.com/1200x/2d/37/a9/2d37a9616013975db39e512698526ec4.jpg',
    screenshots: ['https://i.pinimg.com/736x/ab/ad/2e/abad2e893bda15f9ca80512dbc4e4325.jpg', 'https://i.pinimg.com/1200x/b3/fd/ac/b3fdac4cdd7012a034f60411537b61a2.jpg', 'https://i.pinimg.com/736x/84/c5/77/84c5779a8b736f9f28a62c50627b653d.jpg'],
    minimum: requirements('Intel Core i3-8100 / AMD Ryzen 3 1300X', '16 GB RAM', 'GTX 1650 4GB / RX 5500 XT 4GB', '150 GB SSD', 'Windows 10/11 64-bit', '720p, Low preset, 30 FPS.'),
    recommended: requirements('Intel Core i5-8600 / Ryzen 5 3600', '16 GB RAM', 'RTX 3060 8GB / RX 5700', '150 GB SSD', 'Windows 10/11 64-bit', '1080p, Medium preset, 60 FPS.'),
  },
  'resident-evil-requiem': {
    about: 'Resident Evil Requiem returns the series to survival horror with an emotional story, two protagonists and a shifting perspective between first-person and third-person play. Investigate oppressive environments, manage resources and survive adaptive enemies rendered with advanced lighting and detail.',
    heroImage: 'https://i.pinimg.com/736x/56/69/96/566996afe9c3e437bfd7a5bed99c1529.jpg',
    screenshots: ['https://i.pinimg.com/1200x/3b/fd/fa/3bfdfaa61f579288d84f0272bde12d53.jpg', 'https://i.pinimg.com/736x/0a/ed/f6/0aedf6b3555ff702f0f15c6297858109.jpg', 'https://i.pinimg.com/736x/b2/14/f3/b214f374164417515282cbb027b79225.jpg'],
    minimum: requirements('Intel Core i5-8500 / AMD Ryzen 5 3500', '16 GB RAM', 'GTX 1660 6GB / RX 5500 XT 8GB', '50 GB available space', 'Windows 11 64-bit', '1080p output using upscaling, approximately 30 FPS.'),
    recommended: requirements('Intel Core i7-8700 / AMD Ryzen 5 5500', '16 GB RAM', 'RTX 2060 Super 8GB / RX 6600 8GB', '50 GB available space', 'Windows 11 64-bit', 'Higher visual quality with stable performance.'),
  },
};

function FeaturedGameDetails({ game, details }: { game: typeof games[number]; details: FeaturedDetails }) {
  const galleryGame = { ...game, screenshots: details.screenshots };
  return <main className="featured-detail-page">
    <section className="featured-detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,12,11,.96), rgba(5,12,11,.58) 58%, rgba(5,12,11,.14)), url(${details.heroImage ?? game.coverImage})` }}>
      <div className="featured-detail-hero-inner"><Link className="featured-detail-back" to="/explore">← Back to game library</Link><h1>{game.title}</h1><p className="featured-detail-tagline">{game.tagline}</p><Button className="featured-detail-install-button" to={`/request-installation?game=${game.id}`}>Request installation <ArrowRight size={16} /></Button></div>
      <div className="featured-detail-meta"><span>{game.developer}</span><span>{game.releaseYear}</span><span>{game.platform ?? 'PC'}</span></div>
    </section>
    <section className="featured-detail-about"><p className="eyebrow">ABOUT THE GAME</p><h2>{game.title}</h2><p>{details.about}</p></section>
    <section className="featured-detail-gallery"><div className="featured-detail-heading"><p className="eyebrow">SCREENSHOTS</p></div><GameGallery game={galleryGame} /></section>
    <section className="featured-detail-specs"><div className="featured-detail-heading"><p className="eyebrow">PC REQUIREMENTS</p><h2>PC requirements.</h2></div><div className="featured-detail-spec-grid"><HardwareRequirements title="Minimum" requirements={details.minimum} /><HardwareRequirements title="Recommended" requirements={details.recommended} /></div></section>
    <section className="featured-detail-cta"><h2>Ready to play {game.title}?</h2><Button to={`/request-installation?game=${game.id}`}>Request installation <ArrowRight size={16} /></Button></section>
  </main>;
}

export function GameDetails() {
  const { id } = useParams();
  const game = games.find((item) => item.id === id);
  if (!game) return <PageContainer><div className="empty-state"><h1>Game not found</h1><Link className="text-link" to="/explore">Back to explore</Link></div></PageContainer>;
  const details = featuredDetails[game.id];
  if (details) return <FeaturedGameDetails game={game} details={details} />;
  return <PageContainer><Link className="back-link" to="/explore">← Back to explore</Link><section className="details-hero" style={{ backgroundImage: `linear-gradient(90deg, var(--bg) 5%, transparent 75%), url(${game.backdropImage})` }}><div><Badge>{game.performanceCategory}</Badge><h1>{game.title}</h1><p className="tagline">{game.tagline}</p><p className="details-description">{game.longDescription ?? game.description}</p><Button to={`/request-installation?game=${game.id}`}>Request installation</Button></div></section></PageContainer>;
}
