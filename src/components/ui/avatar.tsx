import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-semibold text-gold-400 ring-2 ring-gold-500/40",
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
