"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Partner topbar Online/Offline switch — gold when online. */
export function OnlineToggle() {
  const [online, setOnline] = React.useState(true);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={online}
      onClick={() => setOnline((v) => !v)}
      className={cn(
        "flex h-11 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold uppercase tracking-wide transition-colors",
        online
          ? "border-gold-500/40 bg-gold-500/15 text-gold-700"
          : "border-ink-950/15 bg-cream-100 text-ink-500"
      )}
    >
      <span
        className={cn(
          "size-2.5 rounded-full transition-colors",
          online ? "animate-pulse bg-gold-500" : "bg-ink-400"
        )}
        aria-hidden
      />
      {online ? "Online" : "Offline"}
    </button>
  );
}
