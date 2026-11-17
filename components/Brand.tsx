"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuDrawer from "./MenuDrawer";

const CREAM = "#F2F0E8";
const BLACK = "#000000";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const INSTAGRAM_URL = "https://www.instagram.com/studio.temps/";

export default function Brand() {
  const [zoomed, setZoomed] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const zoomDelay = prefersReducedMotion ? 0 : 50;
    const photoDelay = prefersReducedMotion ? 0 : 550;

    const zoomTimer = setTimeout(() => setZoomed(true), zoomDelay);
    const photoTimer = setTimeout(() => setPhotoVisible(true), photoDelay);
    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(photoTimer);
    };
  }, []);

  return (
    <div
      className="relative flex h-screen flex-col overflow-hidden"
      style={{ backgroundColor: CREAM }}
    >
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative flex-1">
        <Image
          src="/studio3.jpg"
          alt="temps. studio space"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            opacity: photoVisible ? 1 : 0,
            transition: `opacity 700ms ${EASE}`,
          }}
        />

        <div
          className="absolute inset-x-0 top-0 z-10 flex h-[6vh] items-center justify-between px-3 backdrop-blur-sm sm:h-[8vh] sm:px-4 md:px-5"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.18)",
            opacity: photoVisible ? 1 : 0,
            pointerEvents: photoVisible ? "auto" : "none",
            transition: `opacity 700ms ${EASE}`,
          }}
        >
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="-m-3 p-3"
          >
            <span className="flex flex-col gap-[5px]" style={{ width: 24 }}>
              <span
                className="h-[2px] w-full shrink-0"
                style={{ backgroundColor: CREAM }}
              />
              <span
                className="h-[2px] w-full shrink-0"
                style={{ backgroundColor: CREAM }}
              />
              <span
                className="h-[2px] w-full shrink-0"
                style={{ backgroundColor: CREAM }}
              />
            </span>
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-opacity hover:opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={CREAM}
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="1" fill={CREAM} stroke="none" />
            </svg>
          </a>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 pb-[3%] text-center">
          <p
            className="font-[family-name:var(--font-display)] font-normal leading-[0.85] tracking-[0.03em]"
            style={{
              color: photoVisible ? CREAM : BLACK,
              fontSize: "clamp(3rem, 12vw, 10rem)",
              transform: `scale(${zoomed ? 1 : 0.94})`,
              textShadow: photoVisible
                ? "0 2px 12px rgba(0, 0, 0, 0.2)"
                : "none",
              transition: `transform 650ms ${EASE}, color 700ms ${EASE}, text-shadow 700ms ${EASE}`,
            }}
          >
            temps.
          </p>
        </div>
      </div>
    </div>
  );
}
