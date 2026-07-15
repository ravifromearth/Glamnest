import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { MEMBERSHIP_PLANS } from "@/lib/catalog";
import { cn, formatINR } from "@/lib/utils";

export function MembershipPreview() {
  return (
    <section className="section-gn">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Subscription Plans"
          title="Beauty On Repeat, For Less"
          description="Members save up to 20% on every booking, unlock free monthly services and skip the queue with priority slots."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                plan.highlight
                  ? "border-gold-500/60 ring-2 ring-gold-500/30"
                  : "border-ink-950/8"
              )}
            >
              {plan.highlight && (
                <Badge variant="gold" className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white shadow-soft">
                  <Sparkles /> Most Loved
                </Badge>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{plan.tagline}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink-950">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-ink-950">{formatINR(plan.pricePerMonth)}</span>
                <span className="text-sm text-ink-500">/month</span>
              </p>
              <p className="mt-1 text-xs text-ink-400">or {formatINR(plan.billedAnnually)} billed annually</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                      <Check className="size-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <Link href="/membership" className="mt-7">
                <Button variant={plan.highlight ? "gold" : "outline"} className="w-full">
                  Choose {plan.name.replace("GlamNest ", "")}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Compare all benefits on the{" "}
          <Link href="/membership" className="font-medium text-gold-700 underline-offset-4 hover:underline">
            membership page <ArrowRight className="inline size-3" />
          </Link>
        </p>
      </div>
    </section>
  );
}
