import { useEffect, useState } from 'react';
import loaderImage from '../../assets/Local-images/Loader-banner.webp';

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
    <img className="loader-image" src={loaderImage} alt="" aria-hidden="true" loading="eager" decoding="async" fetchPriority="high" draggable="false" />
    <div className="loader-vignette" aria-hidden="true" />
    <div className="loader-center">
      <div className="loader-lockup">
        <div className="loader-mark">
          <span className="loader-p">P</span>
          <div className="loader-dots" aria-hidden="true"><i /><i /><i /></div>
        </div>
        <div className="loader-wordmark" aria-hidden="true"><span className="loader-word-left">lay</span><span className="loader-word-right">wise</span></div>
      </div>
    </div>
  </div>;
}
