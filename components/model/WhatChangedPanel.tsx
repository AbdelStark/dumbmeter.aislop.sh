import type { Driver } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDelta } from "@/lib/utils";

const severityStyles = {
  low: "bg-sharp text-paper",
  med: "bg-sus text-fg",
  high: "bg-panic text-paper"
} as const;

export function WhatChangedPanel({ drivers }: { drivers: Driver[] }) {
  return (
    <section className="dm-card space-y-6 p-6">
      <SectionHeader eyebrow="Why it moved" title="Today's drivers" />
      <div className="grid gap-4 md:grid-cols-2">
        {drivers.map((driver) => (
          <div key={driver.label} className="border-[2px] border-border bg-bg p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-extrabold">{driver.label}</p>
              <span
                className={`rounded-dm0 border-[2px] border-border px-2 py-0.5 text-xs uppercase tracking-widest ${
                  severityStyles[driver.severity]
                }`}
              >
                {driver.severity}
              </span>
            </div>
            {driver.hint ? <p className="mt-2 text-sm text-muted">{driver.hint}</p> : null}
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">
              Delta {formatDelta(driver.delta)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
