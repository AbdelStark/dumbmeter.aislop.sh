"use client";

import { useState } from "react";
import type { Report } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { VoteButtons } from "@/components/reports/VoteButtons";
import { formatTimeAgo } from "@/lib/utils";

export function ReportCard({ report }: { report: Report }) {
  const [confirmCount, setConfirmCount] = useState(report.confirms);
  const [denyCount, setDenyCount] = useState(report.denies);
  const [voted, setVoted] = useState<"confirm" | "deny" | null>(null);

  const handleConfirm = () => {
    if (voted) return;
    setConfirmCount((prev) => prev + 1);
    setVoted("confirm");
  };

  const handleDeny = () => {
    if (voted) return;
    setDenyCount((prev) => prev + 1);
    setVoted("deny");
  };

  return (
    <article className="dm-card flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-extrabold">{report.modelName}</p>
        <p className="text-xs uppercase tracking-widest text-muted">{formatTimeAgo(report.createdAt)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {report.categories.map((category) => (
          <Chip key={category}>{category}</Chip>
        ))}
        <Chip>Severity {report.severity}</Chip>
      </div>
      <p className="text-sm text-muted">{report.description}</p>
      {report.snippet ? (
        <div className="border-[2px] border-border bg-bg px-3 py-2 text-xs text-muted">
          &quot;{report.snippet}&quot;
        </div>
      ) : null}
      <VoteButtons
        onConfirm={handleConfirm}
        onDeny={handleDeny}
        confirmCount={confirmCount}
        denyCount={denyCount}
        disabled={Boolean(voted)}
      />
      {voted ? (
        <p className="text-xs uppercase tracking-widest text-muted">
          Thanks for confirming.
        </p>
      ) : null}
    </article>
  );
}
