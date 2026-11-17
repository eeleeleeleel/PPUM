"use client";

import { useEffect } from "react";
import Image from "next/image";

export type Photo = { src: string; alt: string; width: number; height: number };

// Fullscreen photo viewer with arrows beside the photo, keyboard controls
// (Esc / ← / →) and page scroll locked while open.
export default function PhotoViewer({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(Math.min(photos.length - 1, index + 1));
      if (e.key === "ArrowLeft") onChange(Math.max(0, index - 1));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, photos.length, onChange, onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const photo = photos[index];
  const arrowClass =
    "shrink-0 p-2 text-3xl text-white/80 transition-opacity hover:text-white disabled:opacity-20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-3xl leading-none text-white/80 transition-colors hover:text-white"
      >
        ×
      </button>
      <div className="flex items-center gap-1 md:gap-4">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.max(0, index - 1));
          }}
          disabled={index === 0}
          className={arrowClass}
        >
          ←
        </button>
        <Image
          key={index}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          onClick={(e) => e.stopPropagation()}
          className="h-auto max-h-[90vh] w-auto max-w-[calc(100vw-7rem)] min-w-0 object-contain"
        />
        <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.min(photos.length - 1, index + 1));
          }}
          disabled={index === photos.length - 1}
          className={arrowClass}
        >
          →
        </button>
      </div>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/60">
        {index + 1} / {photos.length}
      </span>
    </div>
  );
}
