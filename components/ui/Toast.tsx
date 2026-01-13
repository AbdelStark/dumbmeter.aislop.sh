import type { ReactNode } from "react";

type ToastProps = {
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
};

export function Toast({ children, tone = "info" }: ToastProps) {
  const toneClass =
    tone === "success"
      ? "bg-success"
      : tone === "warning"
        ? "bg-warning"
        : tone === "danger"
          ? "bg-danger"
          : "bg-info";

  return (
    <div className={`dm-card ${toneClass} text-fg px-4 py-2 text-sm font-semibold`}>
      {children}
    </div>
  );
}
