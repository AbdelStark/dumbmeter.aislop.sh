import { getZone } from "@/lib/utils";

type TrendSparklineProps = {
  values: number[];
  ariaLabel: string;
  height?: number;
};

export function TrendSparkline({ values, ariaLabel, height = 36 }: TrendSparklineProps) {
  if (values.length === 0) return null;
  const width = 120;
  const step = width / (values.length - 1);
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const last = values[values.length - 1];
  const zone = getZone(last);
  const { strokeClass, fillClass } =
    zone.token === "panic"
      ? { strokeClass: "stroke-panic", fillClass: "fill-panic" }
      : zone.token === "sus"
        ? { strokeClass: "stroke-sus", fillClass: "fill-sus" }
        : zone.token === "normal"
          ? { strokeClass: "stroke-normal", fillClass: "fill-normal" }
          : { strokeClass: "stroke-sharp", fillClass: "fill-sharp" };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaLabel}
    >
      <polyline
        fill="none"
        strokeWidth={3}
        className={strokeClass}
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={(values.length - 1) * step}
        cy={height - (last / 100) * height}
        r={4}
        className={`${strokeClass} ${fillClass}`}
      />
    </svg>
  );
}
