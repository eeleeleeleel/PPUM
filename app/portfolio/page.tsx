import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";
import PhotoGrid from "@/components/PhotoGrid";
import { portfolioPhotos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — temps. studio",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader />
      <main className="flex-1 px-3 pb-16 pt-6 sm:px-4 md:px-5 md:pt-10">
        <PhotoGrid photos={portfolioPhotos} />
      </main>
    </div>
  );
}
