"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ReportModal } from "@/components/reports/ReportModal";

type ModelOption = { id: string; name: string };

type ReportModalContextValue = {
  openReport: (modelId?: string) => void;
};

const ReportModalContext = createContext<ReportModalContextValue | null>(null);

export function useReportModal() {
  const ctx = useContext(ReportModalContext);
  if (!ctx) {
    throw new Error("useReportModal must be used within ReportModalProvider");
  }
  return ctx;
}

export function ReportModalProvider({
  children,
  modelOptions
}: {
  children: ReactNode;
  modelOptions: ModelOption[];
}) {
  const [open, setOpen] = useState(false);
  const [preselectedModelId, setPreselectedModelId] = useState<string | undefined>();

  const openReport = useCallback((modelId?: string) => {
    setPreselectedModelId(modelId);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);
    if (!value) setPreselectedModelId(undefined);
  }, []);

  const contextValue = useMemo(() => ({ openReport }), [openReport]);

  return (
    <ReportModalContext.Provider value={contextValue}>
      {children}
      <ReportModal
        open={open}
        onOpenChange={handleOpenChange}
        modelOptions={modelOptions}
        preselectedModelId={preselectedModelId}
      />
    </ReportModalContext.Provider>
  );
}
