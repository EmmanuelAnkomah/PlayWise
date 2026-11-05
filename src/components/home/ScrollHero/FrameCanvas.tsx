/**
 * FrameCanvas — renders the current frame of the JPEG sequence onto a <canvas>.
 *
 * Handles:
 * - devicePixelRatio for crisp rendering on Retina/HiDPI displays
 * - ResizeObserver for dynamic canvas sizing
 * - Cover-style image fitting preserving aspect ratio
 */

import { useEffect, useRef, useCallback } from 'react';
import { FRAME_ASPECT } from './useFrameSequence';
import type { FrameSequence } from './useFrameSequence';

interface FrameCanvasProps {
  frameSequence: FrameSequence;
  className?: string;
}

/** Draw an HTMLImageElement onto a canvas with cover-fit */
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

export function FrameCanvas({ frameSequence, className }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameIndex = useRef(0);

  /** Draw a given frame index onto the canvas */
  const drawFrame = useCallback((index: number) => {
    currentFrameIndex.current = index;
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
  }, [frameSequence]);

  /** Size the canvas to fill its container at the correct DPR */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = container.getBoundingClientRect();
    const cssW = Math.floor(width);
    const cssH = Math.floor(height);

    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    // Re-draw current frame after resize
    drawFrame(currentFrameIndex.current);
  }, [drawFrame]);

  /* Attach ResizeObserver */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(container);

    // Listen for DPR changes (e.g. dragging window between monitors)
    const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const onDprChange = () => resizeCanvas();
    mq.addEventListener?.('change', onDprChange);

    return () => {
      ro.disconnect();
      mq.removeEventListener?.('change', onDprChange);
    };
  }, [resizeCanvas]);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'block' }}
      />
    </div>
  );
}
