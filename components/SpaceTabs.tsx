"use client";

import { useRef, type MouseEvent } from "react";

// Sticky STUDIO / CAFÉ / OUTDOOR tabs. A tab click scrolls so that space's
// slider (photo + counter) sits centered in the screen area below the tabs.
export default function SpaceTabs({
  spaces,
}: {
  spaces: { id: string; name: string }[];
}) {
  const navRef = useRef<HTMLElement>(null);

  function onClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    const target = section?.querySelector("[data-slider]") ?? section;
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, "", `#${id}`);
    // The first space starts centered at the very top of the page.
    if (id === spaces[0].id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Pinned header + tabs cover the top of the screen.
    const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const covered = headerHeight + (navRef.current?.offsetHeight ?? 0);
    const rect = target.getBoundingClientRect();
    const free = window.innerHeight - covered;
    const top =
      window.scrollY +
      rect.top -
      covered -
      Math.max(0, (free - rect.height) / 2);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-[7vh] z-20 bg-background md:mt-8 sm:top-[9vh]"
    >
      <ul className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.2em] sm:gap-40 sm:text-sm md:gap-64 md:text-[15px]">
        {spaces.map((space, index) => (
          <li
            key={space.id}
            className={
              index === 0
                ? "justify-self-end"
                : index === 2
                  ? "justify-self-start"
                  : ""
            }
          >
            <a
              href={`#${space.id}`}
              onClick={(e) => onClick(e, space.id)}
              className="text-foreground transition-opacity hover:opacity-60"
            >
              {space.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
