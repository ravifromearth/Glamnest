"use client";

import { useEffect } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { useLiveCategories, useServiceFlagsStore } from "@/stores/service-flags-store";
import { cn } from "@/lib/utils";
import { StepHeader } from "./step-header";

export function StepCategory() {
  const { categorySlug, selectCategory } = useBookingStore();
  const liveCategories = useLiveCategories();
  const hydrate = useServiceFlagsStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <section aria-label="Choose a category">
      <StepHeader
        eyebrow="Step 1 · Category"
        title="What are we glamming today?"
        description="Pick a category to see services, packages and live pricing for your home."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {liveCategories.map((category) => {
          const selected = categorySlug === category.slug;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => selectCategory(category.slug)}
              className={cn(
                "group flex min-h-32 flex-col items-center justify-center gap-2 rounded-3xl border bg-gradient-to-br p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                category.gradient,
                selected
                  ? "border-gold-500 ring-2 ring-gold-500"
                  : "border-ink-950/8 hover:border-gold-500/50"
              )}
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110" aria-hidden>
                {category.emoji}
              </span>
              <span className="text-sm font-semibold text-ink-900">{category.shortName}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
