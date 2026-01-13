import type { Model, Score } from "@/lib/types";
import { DumbGauge } from "@/components/viz/DumbGauge";
import { ScorePill } from "@/components/ui/ScorePill";
import { TrendSparkline } from "@/components/viz/TrendSparkline";
import { formatDisplayDate, formatTimeAgo, getStampForScore } from "@/lib/utils";

export function ModelHeader({
  model,
  auto,
  human,
  lastUpdatedISO,
  trend7d
}: {
  model: Model;
  auto: Score;
  human: Score;
  lastUpdatedISO: string;
  trend7d: number[];
}) {
  const stamp = getStampForScore(auto.value);

  return (
    <section className="dm-card p-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{model.provider}</p>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">{model.name}</h1>
            <p className="text-sm text-muted">
              Last run {formatDisplayDate(lastUpdatedISO)} ({formatTimeAgo(lastUpdatedISO)})
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ScorePill kind="AUTO" value={auto.value} delta={auto.deltaVsBaseline} />
            <ScorePill kind="HUMAN" value={human.value} delta={human.deltaVsBaseline} />
          </div>
          <div className="dm-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted">7-day drift</p>
            <TrendSparkline values={trend7d} ariaLabel={`${model.name} 7 day trend`} height={46} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <DumbGauge
            value={auto.value}
            deltaVsBaseline={auto.deltaVsBaseline}
            size="lg"
            label="AUTO DUMB INDEX"
            stamp={stamp}
          />
        </div>
      </div>
    </section>
  );
}
