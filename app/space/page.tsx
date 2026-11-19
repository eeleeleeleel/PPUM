import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";
import PhotoSlider from "@/components/PhotoSlider";
import SpaceTabs from "@/components/SpaceTabs";

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
    id: "outdoor",
    name: "Outdoor",
    photos: Array.from({ length: 7 }, (_, i) => ({
      src: `/space/outdoor/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `temps. outdoor ${i + 1}`,
      width: 1599,
      height: 2000,
    })),
  },
];

export default function SpacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader />

      <SpaceTabs spaces={spaces.map(({ id, name }) => ({ id, name }))} />

      <main className="w-full flex-1">
        {spaces.map((space, index) => (
          <section
            key={space.id}
            id={space.id}
            aria-label={space.name}
            // The first section fills the screen below the header and tabs so
            // its slider starts centered (it can't be scrolled any higher).
            className={`flex scroll-mt-[calc(7vh+4rem)] flex-col justify-center py-6 sm:scroll-mt-[calc(9vh+4rem)] ${
              index === 0
                ? "min-h-[calc(100svh-7vh-60px)] sm:min-h-[calc(100svh-9vh-60px)] md:min-h-[calc(100svh-9vh-2rem-62px)]"
                : "min-h-[calc(100svh-7vh-4rem)] sm:min-h-[calc(100svh-9vh-4rem)]"
            }`}
          >
            <PhotoSlider photos={space.photos} label={space.name} />
          </section>
        ))}
      </main>
    </div>
  );
}
