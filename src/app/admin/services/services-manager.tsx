"use client";

import { useEffect } from "react";
import { useServiceFlagsStore, useAdminServiceRows } from "@/stores/service-flags-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export function ServicesManager() {
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const toggle = useServiceFlagsStore((s) => s.toggle);
  const hydrated = useServiceFlagsStore((s) => s.hydrated);
  const rows = useAdminServiceRows();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <p className="rounded-3xl border border-ink-950/8 bg-white p-8 text-center text-sm text-ink-500 shadow-soft">
        Loading services…
      </p>
    );
  }

  const enabledCount = rows.filter((r) => r.liveEnabled).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-500">
        {enabledCount} of {rows.length} services live on the customer site. Toggle to enable or disable
        booking &amp; catalog visibility.
      </p>

      <div className="space-y-3">
        {rows.map((service) => (
          <Card key={service.slug}>
            <CardContent className="flex flex-wrap items-center gap-4 p-5">
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${service.gradient}`}
                aria-hidden
              >
                {service.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base font-semibold text-ink-950">{service.name}</p>
                  <Badge variant={service.liveEnabled ? "success" : "danger"}>
                    {service.liveEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-500">
                  {service.categorySlug} · from {formatINR(service.startingPrice)} · /{service.slug}
                </p>
              </div>
              <Button
                size="sm"
                variant={service.liveEnabled ? "outline" : "gold"}
                onClick={() => toggle(service.slug)}
              >
                {service.liveEnabled ? "Disable" : "Enable"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
