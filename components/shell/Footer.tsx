import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-border bg-paper/80">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-extrabold">Daily LLM vibe check.</p>
          <p className="text-xs uppercase tracking-widest text-muted">Dumb Meter MVP</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <Link href="/">Dashboard</Link>
          <Link href="/methodology">Methodology</Link>
          <span className="text-muted">Built for shareable clarity.</span>
        </div>
      </div>
    </footer>
  );
}
