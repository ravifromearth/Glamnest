import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Compact KPI card for portal dashboards.
 * Delta strings starting with "+" render green, "-" render red.
 */
export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  className?: string;
}) {
  const negative = delta?.startsWith("-");
  return (
    <Card className={cn("flex items-start justify-between gap-3 p-5", className)}>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
        <p className="mt-1.5 font-display text-2xl font-bold text-ink-950">{value}</p>
        {delta && (
          <span
            className={cn(
              "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
              negative ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
        <Icon className="size-5" />
      </span>
    </Card>
  );
}
