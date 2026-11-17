import type { CSSProperties } from "react";
import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";
import PhotoSlider from "@/components/PhotoSlider";

export const metadata: Metadata = {
  title: "Space — temps. studio",
};

// Photos live in /public/space/<id>/.
const spaces = [
  {
    id: "studio-atrium",
    name: "Studio",
    photos: Array.from({ length: 21 }, (_, i) => ({
      src: `/space/studio-atrium/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `temps. studio · atrium ${i + 1}`,
      width: 1599,
      height: 2000,
    })),
  },
  {
    id: "cafe",
    name: "Café",
    photos: Array.from({ length: 13 }, (_, i) => ({
      src: `/space/cafe/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `temps. café ${i + 1}`,
      width: 1599,
      height: 2000,
    })),
  },
  {
    id: "grounds",
    name: "Grounds",
    photos: Array.from({ length: 7 }, (_, i) => ({
      src: `/space/grounds/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `temps. grounds ${i + 1}`,
      width: 1599,
      height: 2000,
    })),
  },
];

export default function SpacePage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground"
      style={
        { "--background": "#F2F0E8", "--foreground": "#000000" } as CSSProperties
      }
    >
      <SubpageHeader />

      <nav className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm">
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
                className="text-foreground transition-opacity hover:opacity-60"
              >
                {space.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="w-full flex-1">
        {spaces.map((space) => (
          <section
            key={space.id}
            id={space.id}
            aria-label={space.name}
            // Each section fills the screen below the sticky tab bar, so a tab
            // click lands with the photo and its counter fully in view.
            className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center py-6"
          >
            <PhotoSlider photos={space.photos} label={space.name} />
          </section>
        ))}
      </main>
    </div>
  );
}
