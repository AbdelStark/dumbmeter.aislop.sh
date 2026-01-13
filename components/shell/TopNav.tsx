"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useReportModal } from "@/components/reports/ReportModalProvider";
import { formatDisplayDate } from "@/lib/utils";

type TopNavProps = {
  dateISO: string;
};

export function TopNav({ dateISO }: TopNavProps) {
  const { openReport } = useReportModal();

  return (
    <nav aria-label="Primary" className="border-b-[3px] border-border bg-paper/80">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-tight">
          DUMB METER
        </Link>
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
          <span>Today</span>
          <span className="border-[2px] border-border bg-bg px-2 py-1 font-mono text-fg">
            {formatDisplayDate(dateISO)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/methodology" className="text-sm font-semibold">
            Methodology
          </Link>
          <Button variant="primary" size="sm" onClick={() => openReport()}>
            Report dumb behavior
          </Button>
        </div>
      </div>
    </nav>
  );
}
