"use client";

import type { CategoryCount, Report } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ReportCard } from "@/components/reports/ReportCard";
import { useReportModal } from "@/components/reports/ReportModalProvider";

export function CommunityPanel({
  modelId,
  categoryCounts,
  reports
}: {
  modelId: string;
  categoryCounts: CategoryCount[];
  reports: Report[];
}) {
  const { openReport } = useReportModal();
  const maxCount = Math.max(...categoryCounts.map((item) => item.count), 1);

  return (
    <section className="dm-card space-y-6 p-6">
      <SectionHeader
        eyebrow="Community"
        title="Human reports"
        rightSlot={
          <Button variant="primary" size="sm" onClick={() => openReport(modelId)}>
            Report dumb behavior
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted">Top categories today</p>
          {categoryCounts.map((item) => (
            <div key={item.label} className="border-[2px] border-border bg-bg p-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{item.label}</span>
                <span className="font-mono">{item.count}</span>
              </div>
              <div className="mt-2 h-2 w-full border-[2px] border-border bg-paper">
                <div
                  className="h-full bg-sus"
                  style={{ width: `${Math.round((item.count / maxCount) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {reports.length === 0 ? (
            <div className="dm-card p-4 text-sm text-muted">
              No reports yet. Be the first to log a weirdness check.
            </div>
          ) : (
            reports.map((report) => <ReportCard key={report.id} report={report} />)
          )}
        </div>
      </div>
    </section>
  );
}
