import type { ReactNode } from "react";
import { TopNav } from "@/components/shell/TopNav";
import { Footer } from "@/components/shell/Footer";

type AppShellProps = {
  dateISO: string;
  children: ReactNode;
};

export function AppShell({ dateISO, children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_top,_rgba(0,102,255,0.18),_transparent_55%),radial-gradient(circle_at_20%_80%,_rgba(255,204,0,0.2),_transparent_50%)]" />
      <div className="pointer-events-none absolute -top-16 right-6 hidden h-40 w-40 rotate-6 border-[3px] border-border bg-sus/30 shadow-dm md:block" />
      <div className="pointer-events-none absolute top-1/2 -left-10 hidden h-36 w-36 -rotate-6 border-[3px] border-border bg-normal/25 shadow-dm md:block" />
      <div className="relative">
        <TopNav dateISO={dateISO} />
        <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
