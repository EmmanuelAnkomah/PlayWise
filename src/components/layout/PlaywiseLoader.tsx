import { useEffect, useState, type CSSProperties } from 'react';
import { loaderGalleryImages } from '../../data/loaderGallery';

const tileSpans = ['wide', 'tall', '', 'square', 'wide', '', 'tall', '', 'square', 'wide', '', 'tall'];

export function PlaywiseLoader({ onComplete }: { onComplete: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 2700);
    const completeTimer = window.setTimeout(onComplete, 3000);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return <div className={`playwise-loader${isLeaving ? ' is-leaving' : ''}`} aria-label="Loading Playwise" role="status">
    <div className="loader-gallery" aria-hidden="true">
      {loaderGalleryImages.map((image, index) => <div className={`loader-tile ${image.span ?? tileSpans[index % tileSpans.length]}`} key={`${image.src}-${index}`} style={{ '--tile-index': index } as CSSProperties}><img src={image.src} alt="" decoding="async" /></div>)}
    </div>
    <div className="loader-vignette" aria-hidden="true" />
    <div className="loader-center">
      <div className="loader-mark">
        <span className="loader-p">P</span>
        <svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="74" /></svg>
      </div>
    </div>
  </div>;
}
