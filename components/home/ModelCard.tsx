import Link from "next/link";
import type { ModelCardData } from "@/lib/types";
import { ScorePill } from "@/components/ui/ScorePill";
import { StampBadge } from "@/components/ui/StampBadge";
import { DumbGauge } from "@/components/viz/DumbGauge";
import { TrendSparkline } from "@/components/viz/TrendSparkline";
import { formatDelta } from "@/lib/utils";
import { ReportButton } from "@/components/reports/ReportButton";

export function ModelCard({ data }: { data: ModelCardData }) {
  const { model, auto, human, trend7d, topIssue, statusStamp } = data;

  return (
    <article className="dm-card dm-card-hover group relative flex h-full flex-col gap-4 p-4">
      <Link
        href={`/models/${model.slug}`}
        aria-label={`${model.name} details`}
        className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{model.provider}</p>
          <h3 className="text-lg font-extrabold tracking-tight">{model.name}</h3>
        </div>
        {statusStamp ? <StampBadge stamp={statusStamp} size="sm" /> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ScorePill kind="AUTO" value={auto.value} delta={auto.deltaVsBaseline} size="sm" />
        <ScorePill kind="HUMAN" value={human.value} delta={human.deltaVsBaseline} size="sm" />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DumbGauge value={auto.value} deltaVsBaseline={auto.deltaVsBaseline} size="mini" />
        <div className="flex flex-col items-end gap-2 text-right">
          <p className="text-xs uppercase tracking-widest text-muted">7-day drift</p>
          <TrendSparkline values={trend7d} ariaLabel={`${model.name} 7 day trend`} />
          <p className="text-xs text-muted">vs baseline {formatDelta(auto.deltaVsBaseline)}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-[2px] border-border/60 pt-3 text-xs">
        <span className="uppercase tracking-widest text-muted">Top issue</span>
        <span className="font-semibold">{topIssue?.label ?? "No major drift"}</span>
      </div>
      <div className="relative z-10">
        <ReportButton modelId={model.id} />
      </div>
    </article>
  );
}
