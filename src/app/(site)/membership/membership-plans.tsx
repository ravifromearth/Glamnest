"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_PLANS } from "@/lib/catalog";
import { cn, formatINR } from "@/lib/utils";

export function MembershipPlans() {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-10 flex justify-center">
        <div
          className="inline-flex items-center rounded-full border border-ink-950/10 bg-white p-1 shadow-soft"
          role="tablist"
          aria-label="Billing period"
        >
          {(
            [
              ["monthly", "Monthly"],
              ["annual", "Annual"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={billing === value}
              onClick={() => setBilling(value)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                billing === value ? "bg-ink-950 text-cream-50 shadow-soft" : "text-ink-600 hover:text-ink-950"
              )}
            >
              {label}
              {value === "annual" && (
                <span className={cn("ml-1.5 text-xs", billing === value ? "text-gold-400" : "text-gold-600")}>
                  ~2 months free
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => {
          const price = billing === "monthly" ? plan.pricePerMonth : plan.billedAnnually;
          const effectiveMonthly = Math.round(plan.billedAnnually / 12);
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl bg-white p-8 shadow-soft transition-shadow hover:shadow-lift",
                plan.highlight
                  ? "border-2 border-gold-500 ring-4 ring-gold-500/15 md:-my-3 md:py-11"
                  : "border border-ink-950/8"
              )}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-ink-950 shadow-gold">
                  Most Loved
                </Badge>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
                {plan.tagline}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink-950">{plan.name}</h3>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold text-ink-950">{formatINR(price)}</span>
                <span className="text-sm text-ink-500">{billing === "monthly" ? "/month" : "/year"}</span>
              </div>
              <p className="mt-1.5 text-xs text-ink-500">
                {billing === "annual"
                  ? `Effectively ${formatINR(effectiveMonthly)}/month, billed once a year`
                  : `Or ${formatINR(plan.billedAnnually)}/year — save ${formatINR(plan.pricePerMonth * 12 - plan.billedAnnually)}`}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-600" />
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/booking">
                  <Button variant={plan.highlight ? "gold" : "outline"} size="lg" className="w-full">
                    Choose {plan.name.replace("GlamNest ", "")}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
