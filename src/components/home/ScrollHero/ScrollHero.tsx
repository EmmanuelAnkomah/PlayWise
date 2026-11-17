/**
 * ScrollHero — full-screen, scroll-controlled JPEG-sequence hero.
 *
 * Replaces the original Hero component with a cinematic controller reveal.
 * The user scrolls down to advance frames (assembled → exploded view),
 * scrolls up to reverse, with a sticky viewport pinning the canvas.
 *
 * Lyric-style captions change with scroll progress — simple fade + translate,
 * like changing lyrics on an Instagram Story.
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

/**
 * 8 captions spread across the full scroll range.
 * Each caption gets ~12.5% of scroll travel, with the frame sequence
 * advancing ~25 frames per caption change. This keeps the visual
 * pacing smooth — the controller opens gradually while the text
 * tells the product story.
 */
const CAPTIONS: Caption[] = [
  { start: 0.00, end: 0.12, text: 'Play something you\u2019ll love' },
  { start: 0.12, end: 0.24, text: 'A sharper way to discover PC games' },
  { start: 0.24, end: 0.36, text: 'that fit your taste and setup' },
  { start: 0.36, end: 0.50, text: 'Precision-built for every gamer' },
  { start: 0.50, end: 0.62, text: 'Crafted down to the last detail' },
  { start: 0.62, end: 0.74, text: 'More play less searching' },
  { start: 0.74, end: 0.87, text: 'Three hardware tiers' },
  { start: 0.87, end: 1.00, text: 'Your next adventure starts here' },
];

/* ---------- Reduced motion check ------------------------------------------ */

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

  if (canvas.clientWidth <= 800 && canvasAspect < imgAspect) {
    ctx.fillStyle = '#07110f';
    ctx.fillRect(0, 0, cw, ch);
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 0.94;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    return;
  }

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

function setCaptionText(element: HTMLSpanElement, text: string) {
  const words = text.split(' ');
  const accent = words.pop() ?? '';
  element.replaceChildren(
    document.createTextNode(`${words.join(' ')}${words.length ? ' ' : ''}`),
    Object.assign(document.createElement('em'), {
      className: 'scroll-hero-accent',
      textContent: accent,
    }),
  );
}

/* ---------- Component ------------------------------------------------------ */

/**
 * Scroll-height calculation:
 *
 * The sticky child is 100vh. The outer section must be tall enough to provide
 * the FULL scroll range before the sticky element un-pins.
 *
 * With 200 frames at ~12 px per frame on a 1080px viewport:
 *   200 × 12 = 2400 px of scroll travel needed.
 *   2400 / 1080 ≈ 2.22 viewports of travel.
 *   Section height = travel + viewport = ~3.22 viewports ≈ 320 vh.
 *
 * Using 320vh: gives 220vh of scroll travel, which at 1080px = 2376px,
 * or ~12 px/frame. Comfortable and precise.
 */
// Keep enough travel for every frame to render while the viewport remains pinned.
// The extra room prevents the sticky element releasing on the final frame on
// taller desktop displays.
const SCROLL_HEIGHT_VH = 360;

export function ScrollHero() {
  const prefersReducedMotion = PREFERS_REDUCED_MOTION;
  const frameSequence = useFrameSequence();
  const { sectionRef, onTick } = useScrollProgress(frameSequence.frameCount);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const currentFrame = useRef(0);

  // Lyric caption refs (DOM manipulation to avoid React re-renders)
  const lyricRef = useRef<HTMLDivElement>(null);
  const lyricTextRef = useRef<HTMLSpanElement>(null);
  const activeCaptionIndex = useRef(0);
  const captionTimer = useRef<number | null>(null);
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

      // 2. Update lyric caption
      const lyricEl = lyricRef.current;
      const lyricText = lyricTextRef.current;
      if (!lyricEl || !lyricText) return;

      // Find which caption is active
      let newIndex = 0;
      for (let i = 0; i < CAPTIONS.length; i++) {
        if (progress >= CAPTIONS[i].start && progress <= CAPTIONS[i].end) {
          newIndex = i;
          break;
        }
        // If we're between captions (in transition gap), keep the last one
        if (i > 0 && progress > CAPTIONS[i - 1].end && progress < CAPTIONS[i].start) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== activeCaptionIndex.current) {
        // Caption is changing — fade out, swap text, fade in
        const prevIndex = activeCaptionIndex.current;
        activeCaptionIndex.current = newIndex;

        // Fade out with upward drift
        lyricEl.style.opacity = '0';
        lyricEl.style.transform = prevIndex < newIndex
          ? 'translateY(-12px)'   // scrolling down: text exits upward
          : 'translateY(12px)';   // scrolling up: text exits downward

        // After CSS transition (200ms), swap text and fade in
        if (captionTimer.current !== null) {
          window.clearTimeout(captionTimer.current);
        }
        requestAnimationFrame(() => {
          captionTimer.current = window.setTimeout(() => {
            setCaptionText(lyricText, CAPTIONS[newIndex].text);
            // Enter from opposite direction
            lyricEl.style.transition = 'none';
            lyricEl.style.transform = prevIndex < newIndex
              ? 'translateY(12px)'   // enter from below
              : 'translateY(-12px)'; // enter from above
            lyricEl.style.opacity = '0';

            // Force reflow then animate in
            void lyricEl.offsetHeight;
            lyricEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            lyricEl.style.opacity = '1';
            lyricEl.style.transform = 'translateY(0)';
          }, 200);
        });
      }
    });
    return () => {
      if (captionTimer.current !== null) {
        window.clearTimeout(captionTimer.current);
        captionTimer.current = null;
      }
    };
  }, [onTick, frameSequence]);

  /* ---------- Reduced motion fallback ------------------------------------- */

  if (prefersReducedMotion) {
    return (
      <section className="scroll-hero-reduced" aria-label="PlayWise controller showcase">
        <div className="scroll-hero-reduced-inner">
          <div className="scroll-hero-reduced-bg" />
          <div className="scroll-hero-lyric" style={{ position: 'relative', opacity: 1 }}>
            <span>Play something you&rsquo;ll love</span>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Render ------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="scroll-hero-section"
      style={{ height: `max(100vh, ${SCROLL_HEIGHT_VH}vh)`, scrollSnapAlign: 'start' }}
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

        {/* Lyric-style caption — changes with scroll like Instagram Story lyrics */}
        <div ref={lyricRef} className="scroll-hero-lyric" aria-live="polite">
          <span ref={lyricTextRef}>Play something you&rsquo;ll <em className="scroll-hero-accent">love</em></span>
        </div>
      </div>
    </section>
  );
}
