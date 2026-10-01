import Link from "next/link";

export default function SubpageHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
      <Link
        href="/"
        className="flex flex-col items-start leading-none text-foreground transition-opacity hover:opacity-70"
      >
        <span className="font-[family-name:var(--font-display)] font-normal tracking-wide text-xl sm:text-2xl">
          temps.
        </span>
        <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-foreground/60">
          studio
        </span>
      </Link>
      <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/50">
        {title}
      </span>
    </header>
  );
}
