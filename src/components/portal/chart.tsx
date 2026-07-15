import { cn } from "@/lib/utils";

export interface ChartPoint {
  label: string;
  value: number;
}

/** Dependency-free SVG bar chart (gold bars on a light grid). */
export function BarChart({
  data,
  height = 160,
  showLabels = true,
  className,
}: {
  data: ChartPoint[];
  height?: number;
  showLabels?: boolean;
  className?: string;
}) {
  const width = 100 * data.length;
  const max = Math.max(...data.map((d) => d.value), 1);
  const chartH = height;
  const barW = 46;
  const labelH = showLabels ? 24 : 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${chartH + labelH}`}
      className={cn("w-full", className)}
      role="img"
      aria-label="Bar chart"
      preserveAspectRatio="none"
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={0}
          x2={width}
          y1={chartH * f}
          y2={chartH * f}
          stroke="#0F0F0F"
          strokeOpacity={0.06}
          strokeWidth={1}
        />
      ))}
      {data.map((d, i) => {
        const h = Math.max((d.value / max) * (chartH - 12), 3);
        const x = i * 100 + (100 - barW) / 2;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={chartH - h}
              width={barW}
              height={h}
              rx={8}
              fill="#D4AF37"
              fillOpacity={d.value === max ? 1 : 0.55}
            />
            {showLabels && (
              <text
                x={i * 100 + 50}
                y={chartH + 17}
                textAnchor="middle"
                fontSize={13}
                fill="#0F0F0F"
                fillOpacity={0.5}
              >
                {d.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Dependency-free SVG line chart with gold stroke + soft area fill. */
export function LineChart({
  data,
  height = 160,
  showLabels = true,
  className,
}: {
  data: ChartPoint[];
  height?: number;
  showLabels?: boolean;
  className?: string;
}) {
  const width = 60 * Math.max(data.length, 2);
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const chartH = height;
  const labelH = showLabels ? 24 : 0;
  const pad = 10;

  const pts = data.map((d, i) => {
    const x = data.length > 1 ? (i / (data.length - 1)) * (width - pad * 2) + pad : width / 2;
    const y = chartH - pad - ((d.value - min) / range) * (chartH - pad * 2);
    return { x, y };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x.toFixed(1)},${chartH - pad} L${pts[0].x.toFixed(1)},${chartH - pad} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${chartH + labelH}`}
      className={cn("w-full", className)}
      role="img"
      aria-label="Line chart"
      preserveAspectRatio="none"
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={0}
          x2={width}
          y1={chartH * f}
          y2={chartH * f}
          stroke="#0F0F0F"
          strokeOpacity={0.06}
          strokeWidth={1}
        />
      ))}
      <path d={area} fill="#D4AF37" fillOpacity={0.12} />
      <path d={path} fill="none" stroke="#D4AF37" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={data[i].label} cx={p.x} cy={p.y} r={3.5} fill="#D4AF37" />
      ))}
      {showLabels &&
        data.map((d, i) => (
          <text
            key={d.label}
            x={pts[i].x}
            y={chartH + 17}
            textAnchor="middle"
            fontSize={12}
            fill="#0F0F0F"
            fillOpacity={0.5}
          >
            {d.label}
          </text>
        ))}
    </svg>
  );
}
