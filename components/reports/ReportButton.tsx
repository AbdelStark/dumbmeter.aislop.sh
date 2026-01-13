"use client";

import { Button } from "@/components/ui/Button";
import { useReportModal } from "@/components/reports/ReportModalProvider";

type ReportButtonProps = {
  modelId?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export function ReportButton({ modelId, label = "Report this model", size = "sm" }: ReportButtonProps) {
  const { openReport } = useReportModal();

  return (
    <Button variant="ghost" size={size} onClick={() => openReport(modelId)}>
      {label}
    </Button>
  );
}
