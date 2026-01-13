import Link from "next/link";
import { DumbGauge } from "@/components/viz/DumbGauge";
import { ShareButton } from "@/components/home/ShareButton";
import { formatDisplayDate } from "@/lib/utils";

type HeroHeaderProps = {
  dateISO: string;
  overallWeirdness?: { level: "Low" | "Medium" | "High"; score: number };
};

export function HeroHeader({ dateISO, overallWeirdness }: HeroHeaderProps) {
  return (
    <section className="dm-card p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-muted">
            Daily LLM vibe check for {formatDisplayDate(dateISO)}
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">DUMB METER</h1>
          <p className="text-base leading-7 text-muted sm:text-lg">
            A daily snapshot of when popular models drift from their baseline. Auto evals + human
            reports, distilled into a loud, shareable signal.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ShareButton />
            <Link href="/methodology" className="text-sm font-semibold">
              How the score works
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="dm-card p-3">
              <p className="text-xs uppercase tracking-widest text-muted">Daily cadence</p>
              <p className="text-xl font-extrabold">One run / 24h</p>
            </div>
            <div className="dm-card p-3">
              <p className="text-xs uppercase tracking-widest text-muted">Baseline window</p>
              <p className="text-xl font-extrabold">21 days rolling</p>
            </div>
            <div className="dm-card p-3">
              <p className="text-xs uppercase tracking-widest text-muted">Signal mix</p>
              <p className="text-xl font-extrabold">Auto + Human</p>
            </div>
          </div>
        </div>
        {overallWeirdness ? (
          <div className="dm-card flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-xs uppercase tracking-widest text-muted">Overall weirdness</p>
            <DumbGauge
              value={overallWeirdness.score}
              label="OVERALL"
              size="md"
              showZones
              showNeedle
            />
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-muted">Today feels</p>
              <p className="text-2xl font-black">{overallWeirdness.level}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
