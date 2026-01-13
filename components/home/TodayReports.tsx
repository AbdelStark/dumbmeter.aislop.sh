"use client";

import type { Report } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ReportCard } from "@/components/reports/ReportCard";
import { useReportModal } from "@/components/reports/ReportModalProvider";

export function TodayReports({ reports }: { reports: Report[] }) {
  const { openReport } = useReportModal();

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Human signal"
        title="Today's reports"
        rightSlot={
          <Button variant="secondary" size="sm" onClick={() => openReport()}>
            Report something
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </section>
  );
}
