"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";
import PhotoViewer, { type Photo } from "./PhotoViewer";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
// Accumulated horizontal wheel/trackpad distance (px) that triggers one step.
const WHEEL_STEP = 25;
// Quiet time (ms) after the last wheel event that ends a trackpad gesture.
const WHEEL_IDLE_MS = 100;
// Minimum time (ms) between two wheel-driven steps.
const WHEEL_MIN_GAP_MS = 250;
// Drag distance (px) that commits to the next/previous photo.
const DRAG_COMMIT = 40;
// Movement (px) below which a press is treated as a click, not a drag.
const CLICK_SLOP = 6;

// Center-mode slider: the current photo sits in the middle at full strength,
// with the previous/next photos peeking in dimmed on either side.
// The track moves by transform (not native scrolling), so every gesture —
// trackpad swipe, mouse drag, touch swipe — advances exactly one photo.
// Clicking the current photo opens a fullscreen viewer with its own arrows.
export default function PhotoSlider({
  photos,
  label,
  placeholderCount = 4,
}: {
  photos: Photo[];
  // Shown in the empty space left of the first photo (above it on mobile).
  label?: string;
  placeholderCount?: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const currentRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const movedRef = useRef(false);
  const wheelRef = useRef({
    acc: 0,
    locked: false,
    timer: 0,
    lastAbs: 0,
    lastStep: 0,
  });
  const count = photos.length || placeholderCount;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(count - 1, index));
      currentRef.current = next;
      setCurrent(next);
    },
    [count],
  );

  // Horizontal wheel / trackpad: one photo per swipe.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const wheel = wheelRef.current;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const abs = Math.abs(e.deltaX);
      const now = performance.now();
      window.clearTimeout(wheel.timer);
      wheel.timer = window.setTimeout(() => {
        wheel.locked = false;
        wheel.acc = 0;
        wheel.lastAbs = 0;
      }, WHEEL_IDLE_MS);
      // Momentum after a swipe only decays. A sudden rise means the user
      // started a new swipe, so don't wait for the old momentum to finish.
      if (
        wheel.locked &&
        abs > 8 &&
        abs > wheel.lastAbs * 1.5 &&
        now - wheel.lastStep > WHEEL_MIN_GAP_MS
      ) {
        wheel.locked = false;
        wheel.acc = 0;
      }
      wheel.lastAbs = abs;
      if (wheel.locked) return;
      wheel.acc += e.deltaX;
      if (Math.abs(wheel.acc) >= WHEEL_STEP) {
        goTo(currentRef.current + (wheel.acc > 0 ? 1 : -1));
        wheel.locked = true;
        wheel.acc = 0;
        wheel.lastStep = now;
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheel.timer);
    };
  }, [goTo]);

  function closeViewer() {
    if (viewerIndex !== null) goTo(viewerIndex);
    setViewerIndex(null);
  }

  // Drag (mouse or touch): the track follows the pointer, then snaps one
  // photo in the drag direction once past DRAG_COMMIT.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    movedRef.current = false;
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!movedRef.current) {
      if (Math.abs(dx) < CLICK_SLOP) return;
      // Mostly vertical on touch: let the page scroll instead.
      if (Math.abs(dy) > Math.abs(dx)) {
        dragRef.current = null;
        return;
      }
      movedRef.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const atEdge =
      (currentRef.current === 0 && dx > 0) ||
      (currentRef.current === count - 1 && dx < 0);
    setDragOffset(atEdge ? dx * 0.3 : dx);
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (!movedRef.current) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) >= DRAG_COMMIT) {
      goTo(currentRef.current + (dx < 0 ? 1 : -1));
    }
    setDragging(false);
    setDragOffset(0);
  }

  function onSlideClick(i: number) {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    if (i !== current) goTo(i);
    else if (photos[i]) setViewerIndex(i);
  }

  const arrowClass =
    "text-lg text-foreground transition-opacity hover:opacity-60 disabled:opacity-25";

  return (
    // Slide width is capped so a 4:5 photo plus the counter fits in one screen.
    <div className="w-full [--gap:16px] [--slide:min(78vw,calc((100svh-18rem)*0.8))] md:[--gap:24px] md:[--slide:min(44vw,calc((100svh-18rem)*0.8))]">
      {label && (
        <p className="mb-4 text-center text-base font-semibold uppercase tracking-[0.2em] md:hidden">
          {label}
        </p>
      )}
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative touch-pan-y overflow-hidden select-none"
      >
        {label && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[calc(50%-var(--slide)/2-var(--gap))] items-center justify-center md:flex"
            style={{
              opacity: current === 0 ? 1 : 0,
              transition: `opacity 450ms ${EASE}`,
            }}
          >
            <span className="text-[32px] font-semibold uppercase tracking-[0.2em] lg:text-[40px]">
              {label}
            </span>
          </div>
        )}
        <div
          className="ml-[calc(50%-var(--slide)/2)] flex items-center gap-[var(--gap)]"
          style={{
            transform: `translateX(calc(${-current} * (var(--slide) + var(--gap)) + ${dragOffset}px))`,
            transition: dragging ? "none" : `transform 450ms ${EASE}`,
          }}
        >
          {Array.from({ length: count }, (_, i) => {
            const active = i === current;
            return (
              <button
                key={i}
                type="button"
                aria-label={active ? `Photo ${i + 1} 크게 보기` : `Photo ${i + 1}`}
                onClick={() => onSlideClick(i)}
                className={`w-[var(--slide)] shrink-0 ${
                  active && photos[i] ? "cursor-zoom-in" : "cursor-pointer"
                } ${photos[i] ? "" : "aspect-[4/5] bg-foreground/[0.07]"}`}
                style={{
                  opacity: active ? 1 : 0.3,
                  transition: `opacity 450ms ${EASE}`,
                }}
              >
                {photos[i] && (
                  <Image
                    src={photos[i].src}
                    alt={photos[i].alt}
                    width={photos[i].width}
                    height={photos[i].height}
                    sizes="(max-width: 768px) 78vw, 44vw"
                    className="pointer-events-none block h-auto w-full"
                    draggable={false}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 text-xs tracking-[0.2em] text-foreground/60">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className={`hidden md:block ${arrowClass}`}
        >
          ←
        </button>
        <span className="min-w-[4.5em] text-center tabular-nums">
          {current + 1} / {count}
        </span>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(current + 1)}
          disabled={current === count - 1}
          className={`hidden md:block ${arrowClass}`}
        >
          →
        </button>
      </div>

      {viewerIndex !== null && photos[viewerIndex] && (
        <PhotoViewer
          photos={photos}
          index={viewerIndex}
          onChange={setViewerIndex}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}
