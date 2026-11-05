/**
 * ScrollHero — full-screen, scroll-controlled JPEG-sequence hero.
 *
 * Replaces the original Hero component with a cinematic controller reveal.
 * The user scrolls down to advance frames (assembled → exploded view),
 * scrolls up to reverse, with a sticky viewport pinning the canvas.
 */

import { useEffect, useRef } from 'react';
import { useFrameSequence } from './useFrameSequence';
import { useScrollProgress } from './useScrollProgress';
import { FRAME_ASPECT } from './useFrameSequence';

/* ---------- Caption data -------------------------------------------------- */

interface Caption {
  /** Scroll progress start (0–1) */
  start: number;
  /** Scroll progress end (0–1) */
  end: number;
  text: string;
}

const CAPTIONS: Caption[] = [
  { start: 0.08, end: 0.25, text: 'Engineered from the inside out.' },
  { start: 0.25, end: 0.45, text: 'Every input. Every sensor.' },
  { start: 0.45, end: 0.65, text: 'Power in motion.' },
  { start: 0.65, end: 0.85, text: 'A system built for precision.' },
  { start: 0.85, end: 1.0, text: 'Every component. One experience.' },
];

/* ---------- Reduced motion check ------------------------------------------ */

/** Snapshot once at module level — avoids reading a ref during render. */
const PREFERS_REDUCED_MOTION =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/* ---------- Image-to-canvas draw helper ----------------------------------- */

function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
) {
  const cw = canvas.width;
  const ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);

  const canvasAspect = cw / ch;
  const imgAspect = FRAME_ASPECT;
  let sw: number, sh: number, sx: number, sy: number;

  if (canvasAspect > imgAspect) {
    sw = img.naturalWidth;
    sh = img.naturalWidth / canvasAspect;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  } else {
    sh = img.naturalHeight;
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/* ---------- Component ------------------------------------------------------ */

/**
 * The outer section provides ~220vh of scroll distance for the animation.
 * A sticky viewport occupies 100vh and holds the canvas + text overlays.
 */
const SCROLL_HEIGHT_VH = 220;

export function ScrollHero() {
  const prefersReducedMotion = PREFERS_REDUCED_MOTION;
  const frameSequence = useFrameSequence();
  const { sectionRef, onTick } = useScrollProgress(frameSequence.frameCount);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const currentFrame = useRef(0);

  // Text overlay refs (manipulate style directly to avoid React re-renders)
  const heroTextRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  /* ---------- Canvas rendering -------------------------------------------- */

  function drawFrame(index: number) {
    currentFrame.current = index;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = frameSequence.getFrame(index);
    if (img) {
      drawImageToCanvas(ctx, canvas, img);
      return;
    }
    // Fallback: find nearest cached frame
    for (let offset = 1; offset < frameSequence.frameCount; offset++) {
      const before = frameSequence.getFrame(index - offset);
      if (before) { drawImageToCanvas(ctx, canvas, before); return; }
      const after = frameSequence.getFrame(index + offset);
      if (after) { drawImageToCanvas(ctx, canvas, after); return; }
    }
  }

  /* ---------- Canvas sizing ----------------------------------------------- */

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = sticky.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    drawFrame(currentFrame.current);
  }

  // Hide loading & draw first frame once ready
  useEffect(() => {
    if (frameSequence.firstFrameReady) {
      if (loadingRef.current) {
        loadingRef.current.style.opacity = '0';
        loadingRef.current.style.pointerEvents = 'none';
      }
      resizeCanvas();
      drawFrame(0);
    }
  }); // Runs every render — but quickly short-circuits

  // ResizeObserver
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;
    resizeCanvas();
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(sticky);
    return () => ro.disconnect();
  }); // eslint-disable-line — depends on resizeCanvas identity, fine to re-attach

  const drawFrameRef = useRef(drawFrame);
  useEffect(() => { drawFrameRef.current = drawFrame; });

  /* ---------- Scroll tick handler ----------------------------------------- */

  useEffect(() => {
    onTick((progress, frameIndex) => {
      // 1. Draw the frame
      drawFrameRef.current(frameIndex);
      frameSequence.prioritizeAround(frameIndex);

      // 2. Update hero text opacity (fade out in first 8% of scroll)
      const heroText = heroTextRef.current;
      if (heroText) {
        const textOpacity = progress <= 0 ? 1 : progress >= 0.08 ? 0 : 1 - progress / 0.08;
        heroText.style.opacity = String(textOpacity);
        heroText.style.transform = `translateY(${(1 - textOpacity) * -20}px)`;
        heroText.style.pointerEvents = textOpacity < 0.1 ? 'none' : 'auto';
      }

      // 3. Update contextual caption
      const captionEl = captionRef.current;
      if (captionEl) {
        let activeText = '';
        let captionOpacity = 0;

        for (const cap of CAPTIONS) {
          if (progress >= cap.start && progress <= cap.end) {
            activeText = cap.text;
            const range = cap.end - cap.start;
            const fadeIn = Math.min(1, (progress - cap.start) / (range * 0.15));
            const fadeOut = Math.min(1, (cap.end - progress) / (range * 0.15));
            captionOpacity = Math.min(fadeIn, fadeOut);
            break;
          }
        }

        captionEl.textContent = activeText;
        captionEl.style.opacity = String(captionOpacity);
      }

      // 4. Update progress bar
      const bar = progressBarRef.current;
      if (bar) {
        bar.style.transform = `scaleX(${progress})`;
      }
    });
  }, [onTick, frameSequence]); // eslint-disable-line — drawFrame is stable within the component

  /* ---------- Reduced motion fallback ------------------------------------- */

  if (prefersReducedMotion) {
    return (
      <section className="scroll-hero-reduced" aria-label="PlayWise controller showcase">
        <div className="scroll-hero-reduced-inner">
          <div className="scroll-hero-reduced-bg" />
          <div className="scroll-hero-text">
            <p className="eyebrow">INTRODUCING PLAYWISE</p>
            <h1>Precision.<br /><em>Beneath the surface.</em></h1>
            <p className="scroll-hero-copy">Explore the engineering behind every move.</p>
            <div className="scroll-hero-actions">
              <button
                className="pw-button pw-button-primary"
                type="button"
                onClick={() => {
                  const next = document.querySelector('.home-intro');
                  next?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore the build
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- CTA handler ------------------------------------------------- */

  const handleExplore = () => {
    const section = sectionRef.current;
    if (!section) return;
    const target = section.offsetTop + section.offsetHeight * 0.12;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  /* ---------- Render ------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="scroll-hero-section"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="PlayWise controller reveal"
    >
      {/* Sticky viewport */}
      <div ref={stickyRef} className="scroll-hero-sticky">
        {/* Canvas for frame rendering */}
        <canvas
          ref={canvasRef}
          className="scroll-hero-canvas"
          aria-hidden="true"
        />

        {/* Loading state */}
        <div ref={loadingRef} className="scroll-hero-loading" aria-live="polite">
          <div className="scroll-hero-loading-spinner" />
          <span>Loading experience…</span>
        </div>

        {/* Hero text overlay — fades out on scroll */}
        <div ref={heroTextRef} className="scroll-hero-text">
          <p className="eyebrow">INTRODUCING PLAYWISE</p>
          <h1>Precision.<br /><em>Beneath the surface.</em></h1>
          <p className="scroll-hero-copy">Explore the engineering behind every move.</p>
          <div className="scroll-hero-actions">
            <button
              className="pw-button pw-button-primary"
              onClick={handleExplore}
              type="button"
            >
              Explore the build
            </button>
          </div>
        </div>

        {/* Contextual caption */}
        <div ref={captionRef} className="scroll-hero-caption" aria-live="polite" />

        {/* Progress bar */}
        <div className="scroll-hero-progress-track">
          <div ref={progressBarRef} className="scroll-hero-progress-bar" />
        </div>
      </div>
    </section>
  );
}
