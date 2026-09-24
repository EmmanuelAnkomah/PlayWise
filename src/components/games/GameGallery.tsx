import type { Game } from '../../types/game';

export function GameGallery({ game }: { game: Game }) {
  return <div className="game-gallery">{game.screenshots.map((image, index) => <img key={image} src={image} alt={`${game.title} screenshot ${index + 1}`} loading="lazy" />)}</div>;
}
