/**
 * useScrollProgress — maps the scroll position within the hero's
 * outer section to a normalised 0→1 progress value and a frame index.
 *
 * Uses a passive scroll listener + requestAnimationFrame for efficiency.
 * Stores values in refs to avoid per-frame React state updates.
 */

import { useEffect, useRef, useCallback } from 'react';

export interface ScrollProgressResult {
  /** Ref to the outer scroll section element */
  sectionRef: React.RefObject<HTMLDivElement | null>;
  /** Current progress 0–1 (read from ref, NOT state) */
  progressRef: React.RefObject<number>;
  /** Current frame index (read from ref) */
  frameIndexRef: React.RefObject<number>;
  /** Register the callback called on every animation-frame tick with (progress, frameIndex) */
  onTick: (cb: TickCallback) => void;
}

type TickCallback = (progress: number, frameIndex: number) => void;

export function useScrollProgress(frameCount: number): ScrollProgressResult {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const frameIndexRef = useRef(0);
  const tickCallback = useRef<TickCallback | null>(null);
  const rafId = useRef(0);
  const lastFrame = useRef(-1);

  const onTick = useCallback((cb: TickCallback) => {
    tickCallback.current = cb;
  }, []);

  useEffect(() => {
    if (frameCount === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far the top of the section has scrolled past the top of the viewport
      const scrolled = -rect.top;
      // The total scroll distance available for the animation
      // (section height minus one viewport, since the sticky element occupies one viewport)
      const scrollRange = sectionHeight - viewportHeight;

      if (scrollRange <= 0) return;

      const raw = scrolled / scrollRange;
      const progress = Math.max(0, Math.min(1, raw));
      const frameIndex = Math.round(progress * (frameCount - 1));
      const clampedFrame = Math.max(0, Math.min(frameCount - 1, frameIndex));

      progressRef.current = progress;
      frameIndexRef.current = clampedFrame;

      // Fire callbacks on every progress update (text opacity transitions need
      // continuous progress values, not just frame changes)
      lastFrame.current = clampedFrame;
      tickCallback.current?.(progress, clampedFrame);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [frameCount]);

  return { sectionRef, progressRef, frameIndexRef, onTick };
}
