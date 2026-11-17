import Brand from "@/components/Brand";
import PhotoGrid from "@/components/PhotoGrid";
import { portfolioPhotos } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <Brand />
      <section
        id="portfolio"
        aria-label="Portfolio"
        className="px-3 pb-16 pt-6 sm:px-4 md:px-5 md:pt-10"
      >
        <PhotoGrid photos={portfolioPhotos} />
      </section>
    </>
  );
}
