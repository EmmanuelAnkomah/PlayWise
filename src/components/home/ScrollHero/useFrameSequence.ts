/**
 * useFrameSequence — discovers, preloads, and caches the JPEG image sequence.
 *
 * Uses Vite's import.meta.glob to discover the frame assets at build time,
 * sorts them numerically, and provides a progressive preloading strategy.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ---------- Asset discovery ------------------------------------------------ */

const frameModules = import.meta.glob<{ default: string }>(
  '/src/assets/jpeg sequence/ezgif-frame-*.jpg',
  { eager: true },
);

/**
 * Extract the numeric index embedded in the filename for sorting.
 * e.g. "ezgif-frame-042.jpg" → 42
 */
function extractFrameNumber(path: string): number {
  const match = path.match(/(\d+)\.jpg$/i);
  return match ? parseInt(match[1], 10) : 0;
}

/** Sorted array of resolved frame URLs */
const FRAME_URLS: string[] = Object.entries(frameModules)
  .sort(([a], [b]) => extractFrameNumber(a) - extractFrameNumber(b))
  .map(([, mod]) => mod.default);

export const FRAME_COUNT = FRAME_URLS.length;
export const FRAME_ASPECT = 1920 / 1080; // Known from inspection

/* ---------- Types ---------------------------------------------------------- */

export interface FrameSequence {
  /** Total number of frames */
  frameCount: number;
  /** Whether the first frame is loaded and ready to display */
  firstFrameReady: boolean;
  /** Overall loading progress 0–1 */
  loadProgress: number;
  /** Get a cached HTMLImageElement for the given frame index, or null */
  getFrame: (index: number) => HTMLImageElement | null;
  /** Prioritize loading frames near this index */
  prioritizeAround: (index: number) => void;
}

/* ---------- Hook ----------------------------------------------------------- */

/** Maximum images to cache simultaneously (memory guard) */
const MAX_CACHE_SIZE = 250; // More than 200 frames — keep all for this set

/** Batch size for concurrent downloads */
const BATCH_SIZE = 6;

export function useFrameSequence(): FrameSequence {
  const cache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loading = useRef<Set<number>>(new Set());
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const priorityCenter = useRef(0);
  const unmounted = useRef(false);

  /** Load a single frame into the cache. Returns a promise. */
  const loadFrame = useCallback((index: number): Promise<void> => {
    if (cache.current.has(index) || loading.current.has(index)) {
      return Promise.resolve();
    }
    if (index < 0 || index >= FRAME_COUNT) return Promise.resolve();

    loading.current.add(index);

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = FRAME_URLS[index];

      const onDone = () => {
        if (unmounted.current) return;
        loading.current.delete(index);

        if (img.naturalWidth > 0) {
          // Evict if over budget (LRU-ish: just delete oldest entries)
          if (cache.current.size >= MAX_CACHE_SIZE) {
            const first = cache.current.keys().next().value;
            if (first !== undefined) cache.current.delete(first);
          }
          cache.current.set(index, img);
          setLoadedCount((c) => c + 1);

          if (index === 0) setFirstFrameReady(true);
        }
        resolve();
      };

      img.onload = onDone;
      img.onerror = onDone; // Don't crash on single-frame failure
    });
  }, []);

  /** Build a priority-ordered list of frame indices around a center. */
  const buildPriorityQueue = useCallback((center: number): number[] => {
    const queue: number[] = [];
    // Add frames radiating outward from center
    for (let offset = 0; offset < FRAME_COUNT; offset++) {
      const ahead = center + offset;
      const behind = center - offset;
      if (ahead < FRAME_COUNT && !cache.current.has(ahead)) queue.push(ahead);
      if (offset > 0 && behind >= 0 && !cache.current.has(behind)) queue.push(behind);
    }
    return queue;
  }, []);

  /** Kick off batch preloading from priority queue */
  const preloadBatch = useCallback(async (queue: number[]) => {
    let i = 0;
    while (i < queue.length && !unmounted.current) {
      const batch = queue.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(loadFrame));
      i += BATCH_SIZE;
    }
  }, [loadFrame]);

  /** Prioritize frames around a given index */
  const prioritizeAround = useCallback((index: number) => {
    priorityCenter.current = index;
  }, []);

  /* --- Initial load: frame 0 first, then progressive background load --- */
  useEffect(() => {
    unmounted.current = false;

    // Phase 1: Load frame 0 immediately
    loadFrame(0).then(() => {
      if (unmounted.current) return;
      // Phase 2: Load remaining frames in priority order from the start
      const queue = buildPriorityQueue(priorityCenter.current);
      preloadBatch(queue);
    });

    return () => {
      unmounted.current = true;
    };
  }, [loadFrame, buildPriorityQueue, preloadBatch]);

  const getFrame = useCallback((index: number): HTMLImageElement | null => {
    const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, index));
    return cache.current.get(clamped) ?? null;
  }, []);

  return {
    frameCount: FRAME_COUNT,
    firstFrameReady,
    loadProgress: FRAME_COUNT > 0 ? loadedCount / FRAME_COUNT : 0,
    getFrame,
    prioritizeAround,
  };
}
