"use client";

import { useEffect } from "react";
import { ServiceCard } from "@/components/site/service-card";
import { SERVICES } from "@/lib/catalog";
import type { Service } from "@/lib/types";
import { useServiceFlagsStore } from "@/stores/service-flags-store";

/** Renders only services currently enabled (catalog default + admin overrides). */
export function EnabledServiceGrid({
  services,
  className = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
}: {
  services: Service[];
  className?: string;
}) {
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  void flags;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const visible = services.filter((s) => isEnabled(s.slug));

  if (visible.length === 0) {
    return (
      <p className="rounded-3xl border border-ink-950/8 bg-white p-8 text-center text-sm text-ink-500 shadow-soft">
        No services available in this category right now.
      </p>
    );
  }

  return (
    <div className={className}>
      {visible.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}

export function useEnabledServices(categorySlug?: string) {
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  void flags;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return SERVICES.filter(
    (s) => (!categorySlug || s.categorySlug === categorySlug) && isEnabled(s.slug)
  );
}
