"use client";

import { useState } from "react";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

export default function SubpageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Stays pinned while scrolling; page tab bars stick just below it (top-[7vh] sm:top-[9vh]). */}
      <header className="sticky top-0 z-30 grid h-[7vh] grid-cols-[1fr_auto_1fr] items-center bg-background px-3 sm:h-[9vh] sm:px-4 md:px-5">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="-m-3 w-fit p-3"
        >
          <span className="flex w-6 flex-col gap-[5px]">
            <span className="h-[2px] w-full bg-foreground" />
            <span className="h-[2px] w-full bg-foreground" />
            <span className="h-[2px] w-full bg-foreground" />
          </span>
        </button>

        {/* Larger screens: centered wordmark. Phones: a home icon on the right. */}
        <Link
          href="/"
          className="hidden leading-none text-foreground transition-opacity hover:opacity-70 sm:block"
        >
          <span className="font-[family-name:var(--font-display)] font-normal tracking-wide text-[32px]">
            temps.
          </span>
        </Link>

        <Link
          href="/"
          aria-label="Home"
          className="col-start-3 -m-3 justify-self-end p-3 text-foreground sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M2 10 12 2l10 8v12H2Z" />
            <path d="M9 22v-7h6v7" />
          </svg>
        </Link>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
