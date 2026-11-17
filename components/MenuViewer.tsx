"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";

// Drink menu overlay. Tapping the menu zooms in around the tapped spot
// (scroll to pan), tapping again zooms back out. Tapping outside closes.
export default function MenuViewer({ onClose }: { onClose: () => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef({ x: 0.5, y: 0.5 });
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // After zooming in, scroll so the tapped spot sits at the screen center.
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el || !zoomed) return;
    el.scrollLeft = focusRef.current.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = focusRef.current.y * el.scrollHeight - el.clientHeight / 2;
  }, [zoomed]);

  function toggleZoom(e: MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      focusRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }
    setZoomed(!zoomed);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="음료 메뉴"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-4 top-4 z-10 text-3xl leading-none text-white/80 transition-colors hover:text-white"
      >
        ×
      </button>

      <div
        ref={scrollerRef}
        className="h-full w-full overflow-auto overscroll-contain"
      >
        <div
          className={
            zoomed
              ? "flex min-h-full w-[300%] items-center md:w-[160%]"
              : "flex h-full w-full flex-col items-center justify-center gap-4 p-4"
          }
        >
          <Image
            src="/menu.jpg"
            alt="temps. 메뉴판"
            width={4951}
            height={3508}
            sizes={
              zoomed
                ? "(max-width: 768px) 300vw, 160vw"
                : "(max-width: 1280px) 100vw, 1280px"
            }
            onClick={toggleZoom}
            className={
              zoomed
                ? "h-auto w-full cursor-zoom-out"
                : "h-auto max-h-[calc(100%-2.5rem)] w-full max-w-5xl cursor-zoom-in object-contain"
            }
          />
          {!zoomed && (
            <p className="pointer-events-none animate-blink text-xs tracking-wide text-white/80">
              메뉴판을 누르면 확대됩니다
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
