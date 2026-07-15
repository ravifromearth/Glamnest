"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Lock, ShieldCheck, Check } from "lucide-react";
import {
  BOOKING_STEPS,
  useBookingStore,
  type BookingStep,
} from "@/stores/booking-store";
import { CATEGORIES, SERVICES } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { StepCategory } from "./steps/step-category";
import { StepService } from "./steps/step-service";
import { StepPackage } from "./steps/step-package";
import { StepAddress } from "./steps/step-address";
import { StepSchedule } from "./steps/step-schedule";
import { StepBeautician } from "./steps/step-beautician";
import { StepReview } from "./steps/step-review";
import { StepPayment } from "./steps/step-payment";

const STEP_LABELS: Record<BookingStep, string> = {
  category: "Category",
  service: "Service",
  package: "Package",
  address: "Address",
  schedule: "Schedule",
  beautician: "Beautician",
  review: "Review",
  payment: "Payment",
};

export function BookingFlow() {
  const store = useBookingStore();
  const searchParams = useSearchParams();
  const seeded = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  /* Avoid SSR/localStorage hydration mismatch — render after mount. */
  useEffect(() => setHydrated(true), []);

  /* Pre-seed from ?category= / ?service= URL params on first load. */
  useEffect(() => {
    if (!hydrated || seeded.current) return;
    seeded.current = true;
    const serviceSlug = searchParams.get("service");
    const categorySlug = searchParams.get("category");
    if (serviceSlug) {
      const service = SERVICES.find((s) => s.slug === serviceSlug);
      if (service) {
        useBookingStore.getState().selectCategory(service.categorySlug);
        useBookingStore.getState().selectService(service);
        return;
      }
    }
    if (categorySlug && CATEGORIES.some((c) => c.slug === categorySlug)) {
      useBookingStore.getState().selectCategory(categorySlug);
    }
  }, [hydrated, searchParams]);

  /* Guard: snap back to the earliest incomplete step on deep links. */
  useEffect(() => {
    if (!hydrated) return;
    const completed: Record<BookingStep, boolean> = {
      category: store.categorySlug !== null,
      service: store.service !== null,
      package: store.servicePackage !== null,
      address: store.address !== null,
      schedule: store.date !== null && store.slot !== null,
      beautician: store.beautician !== null,
      review: true,
      payment: true,
    };
    const earliestIncomplete = BOOKING_STEPS.find((s) => !completed[s]) ?? "payment";
    const earliestIdx = BOOKING_STEPS.indexOf(earliestIncomplete);
    const currentIdx = BOOKING_STEPS.indexOf(store.step);
    if (currentIdx > earliestIdx) {
      store.setStep(earliestIncomplete);
    }
  }, [hydrated, store]);

  if (!hydrated) {
    return (
      <div className="container-gn py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-4 w-40 animate-pulse rounded-full bg-cream-200" />
          <div className="h-10 w-72 animate-pulse rounded-full bg-cream-200" />
          <div className="h-64 animate-pulse rounded-3xl bg-cream-200" />
        </div>
      </div>
    );
  }

  const currentIdx = BOOKING_STEPS.indexOf(store.step);

  return (
    <div className="min-h-[70vh]">
      {/* ---------- Progress header ---------- */}
      <div className="sticky top-0 z-30 border-b border-ink-950/8 bg-cream-50/90 backdrop-blur-md">
        <div className="container-gn py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={store.goBack}
              disabled={currentIdx === 0}
              className={cn(
                "inline-flex h-11 min-w-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-950/5",
                currentIdx === 0 && "pointer-events-none opacity-0"
              )}
              aria-label="Go back a step"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <p className="text-sm font-medium text-ink-600 md:hidden">
              Step {currentIdx + 1} of {BOOKING_STEPS.length} ·{" "}
              <span className="text-ink-950">{STEP_LABELS[store.step]}</span>
            </p>

            {/* Step dots (md+) */}
            <ol className="hidden items-center md:flex" aria-label="Booking progress">
              {BOOKING_STEPS.map((step, i) => {
                const done = i < currentIdx;
                const current = i === currentIdx;
                return (
                  <li key={step} className="flex items-center">
                    {i > 0 && (
                      <span
                        className={cn(
                          "mx-1.5 h-px w-5 lg:w-7",
                          done || current ? "bg-gold-500" : "bg-ink-950/12"
                        )}
                        aria-hidden
                      />
                    )}
                    <span className="flex flex-col items-center gap-1">
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                          done && "bg-gold-500 text-ink-950",
                          current && "bg-ink-950 text-gold-400 ring-2 ring-gold-500",
                          !done && !current && "bg-cream-200 text-ink-500"
                        )}
                      >
                        {done ? <Check className="size-3.5" /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "hidden text-[10px] font-medium lg:block",
                          current ? "text-ink-950" : done ? "text-gold-600" : "text-ink-400"
                        )}
                      >
                        {STEP_LABELS[step]}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
              <ShieldCheck className="size-4 text-gold-600" />
              <span className="hidden sm:inline">GlamNest Secure Booking</span>
              <Lock className="size-3 sm:hidden" />
            </p>
          </div>

          {/* Mobile progress bar */}
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-cream-200 md:hidden" aria-hidden>
            <div
              className="h-full rounded-full bg-gold-500 transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / BOOKING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ---------- Active step ---------- */}
      <div className="container-gn py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {store.step === "category" && <StepCategory />}
          {store.step === "service" && <StepService />}
          {store.step === "package" && <StepPackage />}
          {store.step === "address" && <StepAddress />}
          {store.step === "schedule" && <StepSchedule />}
          {store.step === "beautician" && <StepBeautician />}
          {store.step === "review" && <StepReview />}
          {store.step === "payment" && <StepPayment />}
        </div>
      </div>
    </div>
  );
}
