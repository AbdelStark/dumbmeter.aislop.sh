import type { TierSummary } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDelta } from "@/lib/utils";

export function TaskSuiteSummary({ tiers }: { tiers: TierSummary[] }) {
  return (
    <section className="dm-card space-y-6 p-6">
      <SectionHeader eyebrow="Eval suite" title="Task tier performance" />
      <div className="space-y-4">
        {tiers.map((tier) => (
          <div key={tier.tier} className="border-[2px] border-border bg-bg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-extrabold">Tier {tier.tier}</p>
                <p className="text-xs text-muted">{tier.label}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg tabular-nums">{tier.score}</p>
                {tier.delta !== undefined ? (
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {formatDelta(tier.delta)} today
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-3 h-3 w-full border-[2px] border-border bg-paper">
              <div className="h-full bg-accent" style={{ width: `${tier.score}%` }} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">
              {tier.tasks} tasks
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
