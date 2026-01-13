import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { ReportModalProvider } from "@/components/reports/ReportModalProvider";
import { getModelOptions, getTodayISO } from "@/lib/mock-data";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ReportModalProvider modelOptions={getModelOptions()}>
      <AppShell dateISO={getTodayISO()}>{children}</AppShell>
    </ReportModalProvider>
  );
}
