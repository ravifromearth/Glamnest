"use client";

import { Check, Plus, Clock } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { cn, formatDuration, formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepHeader } from "./step-header";

const TIER_LABELS = { essential: "Essential", premium: "Premium", luxe: "Luxe" } as const;
const TIER_VARIANTS = { essential: "cream", premium: "gold", luxe: "default" } as const;

export function StepPackage() {
  const { service, servicePackage, addOns, selectPackage, toggleAddOn, goNext } = useBookingStore();

  if (!service) return null;

  return (
    <section aria-label="Choose a package">
      <StepHeader
        eyebrow="Step 3 · Package"
        title={service.name}
        description="Choose the package that fits your occasion — every kit is sealed and single-use."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {service.packages.map((pkg) => {
          const selected = servicePackage?.id === pkg.id;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => selectPackage(pkg)}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-white p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                selected ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-950/8 hover:border-gold-500/50",
                pkg.popular && !selected && "ring-gold-hairline"
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-5">
                  <Badge variant="gold" className="bg-gold-500 text-ink-950 ring-0 shadow-gold">
                    Most Popular
                  </Badge>
                </span>
              )}
              <span className="flex items-start justify-between gap-2">
                <span>
                  <Badge variant={TIER_VARIANTS[pkg.tier]}>{TIER_LABELS[pkg.tier]}</Badge>
                  <span className="mt-2 block font-display text-lg font-semibold text-ink-950">
                    {pkg.name}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    selected ? "border-gold-500 bg-gold-500 text-ink-950" : "border-ink-950/15 text-transparent"
                  )}
                  aria-hidden
                >
                  <Check className="size-3.5" />
                </span>
              </span>

              <span className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-ink-950">
                  {formatINR(pkg.price)}
                </span>
                {pkg.strikePrice && (
                  <span className="text-sm text-ink-400 line-through">{formatINR(pkg.strikePrice)}</span>
                )}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-ink-500">
                <Clock className="size-3" />
                {formatDuration(pkg.durationMin)}
              </span>

              <ul className="mt-4 space-y-2 border-t border-ink-950/6 pt-4">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-gold-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {service.addOns.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink-950">Popular add-ons</h2>
          <p className="mt-1 text-sm text-ink-500">Tap to add — done in the same visit, no extra travel.</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {service.addOns.map((addOn) => {
              const active = addOns.some((a) => a.id === addOn.id);
              return (
                <button
                  key={addOn.id}
                  type="button"
                  onClick={() => toggleAddOn(addOn)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                    active
                      ? "border-gold-500 bg-gold-500/15 text-ink-950"
                      : "border-ink-950/12 bg-white text-ink-700 hover:border-gold-500/60"
                  )}
                >
                  {active ? <Check className="size-3.5 text-gold-600" /> : <Plus className="size-3.5 text-ink-400" />}
                  {addOn.name}
                  <span className={cn("font-semibold", active ? "text-gold-700" : "text-ink-950")}>
                    {formatINR(addOn.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button variant="gold" size="lg" disabled={!servicePackage} onClick={goNext}>
          Continue to address
        </Button>
      </div>
    </section>
  );
}
