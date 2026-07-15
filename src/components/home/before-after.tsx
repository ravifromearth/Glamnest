"use client";

import * as React from "react";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { BEFORE_AFTER } from "@/lib/content";
import { cn } from "@/lib/utils";

function RevealCard({ item }: { item: (typeof BEFORE_AFTER)[number] }) {
  const [pos, setPos] = React.useState(50);

  return (
    <div className="group overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div
        className="relative aspect-[4/3] cursor-ew-resize select-none touch-pan-y"
        onPointerMove={(e) => {
          if (e.buttons !== 1 && e.pointerType === "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          setPos(Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100)));
        }}
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos(Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100)));
        }}
      >
        {/* After layer (full) */}
        <div className={cn("absolute inset-0 bg-gradient-to-br", item.afterShade)}>
          <span className="absolute inset-0 flex items-center justify-center text-7xl" aria-hidden>
            {item.emoji}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-ink-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
            After
          </span>
        </div>
        {/* Before layer (clipped) */}
        <div
          className={cn("absolute inset-0 bg-gradient-to-br", item.beforeShade)}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-7xl opacity-40 grayscale" aria-hidden>
            {item.emoji}
          </span>
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
            Before
          </span>
        </div>
        {/* Divider handle */}
        <div className="absolute inset-y-0 z-10 flex w-0.5 items-center bg-white shadow" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-ink-950 text-gold-400 shadow-lift">
            <MoveHorizontal className="size-4" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="font-display text-sm font-semibold text-ink-950">{item.service}</p>
        <p className="text-xs text-ink-500">{item.locality}</p>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="section-gn">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Real Transformations"
          title="Before & After, At Home"
          description="Drag the slider — every transformation happened in a customer's living room."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BEFORE_AFTER.map((item) => (
            <RevealCard key={item.service} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
