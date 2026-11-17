import { useEffect, useState } from 'react';
import type { Game } from '../../types/game';
import { OptimizedImage } from '../ui/OptimizedImage';

export function GameGallery({ game, className = '' }: { game: Game; className?: string }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [activeImage]);

  return <>
    <div className={`game-gallery ${className}`.trim()}>{game.screenshots.map((image, index) => <button className="game-gallery-trigger" key={image} type="button" onClick={() => setActiveImage(image)} aria-label={`View ${game.title} screenshot ${index + 1}`}><OptimizedImage src={image} alt={`${game.title} screenshot ${index + 1}`} loading="lazy" decoding="async" fallbackSrc={game.coverImage} /></button>)}</div>
    {activeImage && <div className="game-lightbox" role="dialog" aria-modal="true" aria-label={`${game.title} screenshot viewer`} onClick={() => setActiveImage(null)}><button className="game-lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close screenshot viewer">×</button><OptimizedImage src={activeImage} alt={`${game.title} enlarged screenshot`} decoding="async" fallbackSrc={game.coverImage} onClick={(event) => event.stopPropagation()} /></div>}
  </>;
}
