import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";

export const metadata: Metadata = {
  title: "Guidelines — temps. studio",
};

export default function GuidelinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHeader title="Guidelines" />
      <main className="flex flex-1 items-center justify-center px-6 text-center">
        <p className="text-sm sm:text-base text-foreground/50 uppercase tracking-[0.2em]">
          Coming soon
        </p>
      </main>
    </div>
  );
}
