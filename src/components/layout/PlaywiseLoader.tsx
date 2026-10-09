import { useEffect, useState } from 'react';

const loaderImage = 'https://i.pinimg.com/1200x/44/60/1d/44601d3009836bf25a172ab85900f9bf.jpg';

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
    <img className="loader-image" src={loaderImage} alt="" aria-hidden="true" decoding="async" fetchPriority="high" />
    <div className="loader-vignette" aria-hidden="true" />
    <div className="loader-center">
      <div className="loader-lockup">
        <div className="loader-mark">
          <span className="loader-p">P</span>
          <svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="74" /></svg>
        </div>
        <div className="loader-wordmark" aria-hidden="true"><span className="loader-word-left">lay</span><span className="loader-word-right">wise</span></div>
      </div>
    </div>
  </div>;
}
