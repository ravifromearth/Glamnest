"use client";

import { useEffect } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { useServiceFlagsStore } from "@/stores/service-flags-store";
import { getCategory, getServicesByCategory } from "@/lib/catalog";
import { cn, formatDuration, formatINR } from "@/lib/utils";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "./step-header";

export function StepService() {
  const { categorySlug, service: selectedService, selectService } = useBookingStore();
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  void flags;
  const services = categorySlug
    ? getServicesByCategory(categorySlug, { includeDisabled: true }).filter((s) => isEnabled(s.slug))
    : [];

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <section aria-label="Choose a service">
      <StepHeader
        eyebrow="Step 2 · Service"
        title={category ? category.name : "Choose a service"}
        description={category?.heroLine ?? "Pick the service you would like at home."}
      />

      {services.length === 0 ? (
        <p className="rounded-3xl border border-ink-950/8 bg-white p-8 text-center text-sm text-ink-500 shadow-soft">
          No services available in this category right now. Please pick another category.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const selected = selectedService?.slug === service.slug;
            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => selectService(service)}
                className={cn(
                  "group flex items-start gap-4 rounded-3xl border bg-white p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  selected ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-950/8 hover:border-gold-500/50"
                )}
              >
                <span
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl",
                    service.gradient
                  )}
                  aria-hidden
                >
                  {service.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-lg font-semibold leading-tight text-ink-950">
                      {service.name}
                    </span>
                    {service.popular && <Badge variant="gold">Popular</Badge>}
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">{service.shortDescription}</span>
                  <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-ink-950">
                      From {formatINR(service.startingPrice)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-ink-500">
                      <Clock className="size-3.5" />
                      {formatDuration(service.durationMin)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-ink-600">
                      <Stars rating={service.rating} />
                      <span className="text-xs">
                        {service.rating} ({service.reviewCount})
                      </span>
                    </span>
                  </span>
                </span>
                <ChevronRight className="mt-1 size-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-600" />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
