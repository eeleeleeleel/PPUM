"use client";

import { useState } from "react";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

export default function SubpageHeader({ title }: { title?: string }) {
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

        <Link
          href="/"
          className="leading-none text-foreground transition-opacity hover:opacity-70"
        >
          <span className="font-[family-name:var(--font-display)] font-normal tracking-wide text-[26px] sm:text-[32px]">
            temps.
          </span>
        </Link>

        {title && (
          <span className="justify-self-end text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/50">
            {title}
          </span>
        )}
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
