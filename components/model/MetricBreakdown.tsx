import type { MetricItem } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDelta, formatPercent } from "@/lib/utils";

export function MetricBreakdown({
  items,
  baselineWindowDays
}: {
  items: MetricItem[];
  baselineWindowDays: number;
}) {
  return (
    <section className="dm-card space-y-6 p-6">
      <SectionHeader
        eyebrow={`Baseline window: ${baselineWindowDays} days`}
        title="Auto score breakdown"
      />
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.key} className="group border-[2px] border-border bg-bg p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg tabular-nums">{formatPercent(item.value)}</p>
                {item.delta !== undefined ? (
                  <p
                    className={`text-xs uppercase tracking-widest ${
                      item.direction === "better" ? "text-success" : "text-danger"
                    }`}
                  >
                    {formatDelta(item.delta)} vs baseline
                  </p>
                ) : null}
              </div>
            </summary>
            <div className="mt-4">
              <div className="h-3 w-full border-[2px] border-border bg-paper">
                <div
                  className={`h-full ${
                    item.direction === "better" ? "bg-success" : "bg-danger"
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted">
                Click to expand for recent values (mocked)
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
