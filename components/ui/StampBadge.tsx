import type { StatusStamp } from "@/lib/types";

type StampBadgeProps = {
  stamp: StatusStamp;
  size?: "sm" | "md" | "lg";
};

export function StampBadge({ stamp, size = "md" }: StampBadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-1"
      : size === "lg"
        ? "text-base px-4 py-2"
        : "text-sm px-3 py-1.5";

  const toneClass =
    stamp === "BROKEN"
      ? "bg-panic text-paper"
      : stamp === "SUS"
        ? "bg-sus text-fg"
        : "bg-sharp text-paper";

  return (
    <div
      className={`dm-chip ${sizeClasses} ${toneClass} rotate-[-8deg] shadow-dm border-[3px]`}
      aria-label={`Status ${stamp}`}
    >
      {stamp}
    </div>
  );
}
