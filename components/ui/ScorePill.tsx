import { formatDelta, getZone } from "@/lib/utils";

export type ScorePillProps = {
  kind: "AUTO" | "HUMAN";
  value: number;
  delta?: number;
  size?: "sm" | "md";
};

export function ScorePill({ kind, value, delta, size = "md" }: ScorePillProps) {
  const zone = getZone(value);
  const zoneClass =
    zone.token === "panic"
      ? "bg-panic text-paper"
      : zone.token === "sus"
        ? "bg-sus text-fg"
        : zone.token === "normal"
          ? "bg-normal text-paper"
          : "bg-sharp text-paper";

  const sizeClass = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      className={`inline-flex items-center gap-2 border-[2px] border-border shadow-dm ${zoneClass} ${
        sizeClass
      }`}
      aria-label={`${kind} score ${value}${delta !== undefined ? `, ${formatDelta(delta)} vs baseline` : ""}`}
    >
      <span className="text-[10px] font-extrabold tracking-widest">{kind}</span>
      <span className="font-mono text-base tabular-nums leading-none">{value}</span>
      {delta !== undefined ? (
        <span className="rounded-dm0 border-[2px] border-border bg-paper px-2 py-0.5 text-[10px] font-extrabold uppercase text-fg">
          {formatDelta(delta)}
        </span>
      ) : null}
    </div>
  );
}
