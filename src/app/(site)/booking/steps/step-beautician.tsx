"use client";

import { Check, Sparkles, Star } from "lucide-react";
import { useBookingStore, type BeauticianOption } from "@/stores/booking-store";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepHeader } from "./step-header";

export const AUTO_ASSIGN: BeauticianOption = {
  id: "auto-assign",
  name: "Auto-assign the best available",
  rating: 4.9,
  jobs: 6200,
  specialty: "We match you with the top-rated pro free at your slot",
  initials: "GN",
};

const BEAUTICIANS: BeauticianOption[] = [
  { id: "bt-priyanka", name: "Priyanka Singh", rating: 4.9, jobs: 1240, specialty: "Bridal & Makeup Specialist", initials: "PS" },
  { id: "bt-babli", name: "Babli Singh", rating: 4.8, jobs: 980, specialty: "Senior Makeup Artist", initials: "BS" },
  { id: "bt-sadhna", name: "Sadhna Singh", rating: 4.8, jobs: 720, specialty: "Makeup Artist", initials: "SS" },
];

export function StepBeautician() {
  const { beautician, setBeautician, goNext } = useBookingStore();

  return (
    <section aria-label="Choose your beautician">
      <StepHeader
        eyebrow="Step 6 · Beautician"
        title="Who would you like?"
        description="Every professional is background-verified, trained and carries a sealed single-use kit."
      />

      {/* Auto-assign — recommended */}
      <button
        type="button"
        onClick={() => setBeautician(AUTO_ASSIGN)}
        className={cn(
          "flex w-full items-start gap-4 rounded-3xl border bg-ink-950 p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
          beautician?.id === AUTO_ASSIGN.id ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-950"
        )}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-2 ring-gold-500/40">
          <Sparkles className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-semibold text-cream-50">
              Auto-assign the best available
            </span>
            <Badge variant="gold">Recommended</Badge>
          </span>
          <span className="mt-1 block text-sm text-cream-200/80">
            We match you with the highest-rated professional free at your slot — most customers choose this.
          </span>
        </span>
        <span
          className={cn(
            "mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
            beautician?.id === AUTO_ASSIGN.id
              ? "border-gold-500 bg-gold-500 text-ink-950"
              : "border-cream-50/25 text-transparent"
          )}
          aria-hidden
        >
          <Check className="size-3.5" />
        </span>
      </button>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-ink-400">
        Or pick a favourite
      </p>

      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        {BEAUTICIANS.map((b) => {
          const selected = beautician?.id === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setBeautician(b)}
              className={cn(
                "flex flex-col items-center rounded-3xl border bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                selected ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-950/8 hover:border-gold-500/50"
              )}
            >
              <Avatar initials={b.initials} className="size-14 text-base" />
              <span className="mt-3 font-display text-lg font-semibold text-ink-950">{b.name}</span>
              <span className="mt-0.5 text-xs text-ink-500">{b.specialty}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-700">
                <Star className="size-3 fill-gold-500 text-gold-500" />
                {b.rating}
                <span className="text-ink-400">·</span>
                {b.jobs.toLocaleString("en-IN")} jobs
              </span>
              {selected && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                  <Check className="size-3.5" /> Selected
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <Button variant="gold" size="lg" disabled={!beautician} onClick={goNext}>
          Continue to review
        </Button>
      </div>
    </section>
  );
}
