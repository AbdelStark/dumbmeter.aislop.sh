"use client";

import { useEffect, useState } from "react";
import type { StatusStamp } from "@/lib/types";
import { formatDelta, getZone } from "@/lib/utils";
import { StampBadge } from "@/components/ui/StampBadge";

type DumbGaugeProps = {
  value: number;
  deltaVsBaseline?: number;
  label?: string;
  size?: "mini" | "md" | "lg";
  showZones?: boolean;
  showNeedle?: boolean;
  stamp?: StatusStamp;
};

const sizeMap = {
  mini: { width: 150, height: 95, stroke: 10 },
  md: { width: 220, height: 135, stroke: 14 },
  lg: { width: 300, height: 180, stroke: 18 }
} as const;

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const radians = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function valueToAngle(value: number) {
  return 180 - (value / 100) * 180;
}

export function DumbGauge({
  value,
  deltaVsBaseline,
  label,
  size = "md",
  showZones = true,
  showNeedle = true,
  stamp
}: DumbGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const zone = getZone(value);
  const { width, height, stroke } = sizeMap[size];
  const viewBox = "0 0 200 120";
  const cx = 100;
  const cy = 100;
  const radius = 80;

  useEffect(() => {
    const timer = window.setTimeout(() => setDisplayValue(value), 50);
    return () => window.clearTimeout(timer);
  }, [value]);

  const angle = valueToAngle(displayValue);

  const segments = [
    { from: 0, to: 25, color: "stroke-sharp" },
    { from: 25, to: 50, color: "stroke-normal" },
    { from: 50, to: 75, color: "stroke-sus" },
    { from: 75, to: 100, color: "stroke-panic" }
  ];

  const labelText = label ?? "Dumb index";

  return (
    <div className="flex flex-col items-center gap-2">
      {label ? (
        <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      ) : null}
      <div className="relative">
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          role="img"
          aria-label={`${labelText} ${value}, ${zone.name}`}
        >
          <path
            d={describeArc(cx, cy, radius, 180, 0)}
            strokeWidth={stroke}
            className="stroke-border/20"
            strokeLinecap="round"
            fill="none"
          />
          {showZones
            ? segments.map((segment) => (
                <path
                  key={`${segment.from}-${segment.to}`}
                  d={describeArc(cx, cy, radius, valueToAngle(segment.from), valueToAngle(segment.to))}
                  strokeWidth={stroke}
                  className={segment.color}
                  strokeLinecap="butt"
                  fill="none"
                />
              ))
            : null}
          {showNeedle ? (
            <g
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                transform: `rotate(${angle}deg)`
              }}
              className="transition-transform duration-700 ease-out motion-reduce:transition-none"
            >
              <line
                x1={cx}
                y1={cy}
                x2={cx + radius - 10}
                y2={cy}
                stroke="rgb(var(--border))"
                strokeWidth={3}
              />
              <circle cx={cx} cy={cy} r={6} fill="rgb(var(--border))" />
            </g>
          ) : null}
          {size !== "mini" ? (
            <g className="fill-muted text-[8px] font-mono">
              <text x={10} y={102}>
                0
              </text>
              <text x={95} y={20}>
                50
              </text>
              <text x={176} y={102}>
                100
              </text>
            </g>
          ) : null}
        </svg>
        {stamp ? (
          <div className="absolute right-2 top-4">
            <StampBadge stamp={stamp} size={size === "lg" ? "lg" : "sm"} />
          </div>
        ) : null}
      </div>
      <div className="text-center">
        <p
          className={`font-black tabular-nums ${size === "mini" ? "text-xl" : "text-3xl"}`}
        >
          {value}
        </p>
        {size !== "mini" ? (
          <>
            <p className="text-xs uppercase tracking-widest text-muted">{zone.name}</p>
            {deltaVsBaseline !== undefined ? (
              <p className="text-xs text-muted">vs baseline {formatDelta(deltaVsBaseline)}</p>
            ) : null}
          </>
        ) : null}
      </div>
      <span className="sr-only">
        {labelText} {value} ({zone.name}), {deltaVsBaseline ? formatDelta(deltaVsBaseline) : "0"}
      </span>
    </div>
  );
}
