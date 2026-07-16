"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EnabledServiceGrid } from "@/components/site/enabled-service-grid";
import { ServicesJumpNav } from "@/components/site/services-jump-nav";
import { Button } from "@/components/ui/button";
import { useLiveCategories, useServiceFlagsStore } from "@/stores/service-flags-store";
import { SERVICES } from "@/lib/catalog";
import { cn, formatINR } from "@/lib/utils";

export function ServicesCatalog() {
  const liveCategories = useLiveCategories();
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  void flags;

  const enabledCount = SERVICES.filter((s) => isEnabled(s.slug)).length;

  return (
    <>
      <section className="bg-ink-950 py-16 text-cream-50 md:py-20">
        <div className="container-gn text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            The Full Menu
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Every Service, <span className="text-gold-gradient">At Your Doorstep</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/65 md:text-base">
            {enabledCount}+ professional services across {liveCategories.length} categories —
            each delivered by verified experts with sealed hygiene kits.
          </p>
        </div>
      </section>

      <ServicesJumpNav />

      <div className="section-gn space-y-16 md:space-y-24">
        {liveCategories.map((cat) => {
          const services = SERVICES.filter((s) => s.categorySlug === cat.slug);
          const live = services.filter((s) => isEnabled(s.slug));
          if (live.length === 0) return null;
          const minPrice = Math.min(...live.map((s) => s.startingPrice));
          return (
            <section key={cat.slug} id={cat.slug} className="container-gn scroll-mt-36">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-soft",
                      cat.gradient
                    )}
                    aria-hidden
                  >
                    {cat.emoji}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink-950 md:text-3xl">
                      {cat.name}
                    </h2>
                    <p className="mt-1 text-sm text-ink-500">
                      {cat.heroLine} · from {formatINR(minPrice)}
                    </p>
                  </div>
                </div>
                <Link href={`/services/${cat.slug}`}>
                  <Button variant="outline" size="sm">
                    View Category <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
              </div>
              <EnabledServiceGrid
                services={services}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </section>
          );
        })}
      </div>
    </>
  );
}
