"use client";

import { useState } from "react";
import { BadgePercent, CalendarDays, Check, MapPin, Pencil, Tag, User, X } from "lucide-react";
import {
  COUPONS,
  useBookingStore,
  useBookingTotals,
  type BookingStep,
} from "@/stores/booking-store";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepHeader } from "./step-header";

function formatBookingDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function StepReview() {
  const store = useBookingStore();
  const totals = useBookingTotals();
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const { service, servicePackage, addOns, address, date, slot, beautician } = store;
  if (!service || !servicePackage || !address || !date || !slot || !beautician) return null;

  function applyCode() {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;
    const coupon = COUPONS[normalized];
    if (!coupon) {
      setCouponError("That code doesn't look right. Try GLAMFIRST or PATNA100.");
      return;
    }
    store.applyCoupon(normalized, coupon.discount);
    setCouponError(null);
    setCode("");
  }

  const editStep = (step: BookingStep) => store.setStep(step);

  return (
    <section aria-label="Review your booking">
      <StepHeader
        eyebrow="Step 7 · Review"
        title="Almost there — one last look"
        description="Check every detail. You can edit any part before payment."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Order summary */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${service.gradient}`}
                  aria-hidden
                >
                  {service.emoji}
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink-950">{service.name}</h2>
                  <p className="mt-0.5 text-sm text-ink-500">
                    {servicePackage.name} <Badge variant="cream" className="ml-1 capitalize">{servicePackage.tier}</Badge>
                  </p>
                  {addOns.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {addOns.map((a) => (
                        <li key={a.id} className="flex items-center gap-1.5 text-xs text-ink-600">
                          <Check className="size-3 text-gold-600" />
                          {a.name} · {formatINR(a.price)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => editStep("package")}
                className="inline-flex size-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-cream-100 hover:text-ink-700"
                aria-label="Edit package"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
          </div>

          {[
            {
              icon: MapPin,
              label: "Address",
              value: `${address.label} — ${address.line1}, ${address.locality}, ${address.city} ${address.pincode}`,
              step: "address" as BookingStep,
            },
            {
              icon: CalendarDays,
              label: "Date & slot",
              value: `${formatBookingDate(date)} · ${slot}`,
              step: "schedule" as BookingStep,
            },
            {
              icon: User,
              label: "Beautician",
              value:
                beautician.id === "auto-assign"
                  ? "Auto-assigned — the best available pro"
                  : `${beautician.name} · ${beautician.specialty}`,
              step: "beautician" as BookingStep,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-3 rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-gold-700">
                  <row.icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{row.label}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-ink-800">{row.value}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => editStep(row.step)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-cream-100 hover:text-ink-700"
                aria-label={`Edit ${row.label.toLowerCase()}`}
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Price breakdown + coupon */}
        <aside className="h-fit rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-semibold text-ink-950">Price details</h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-600">{servicePackage.name}</dt>
              <dd className="font-medium text-ink-950">{formatINR(totals.packagePrice)}</dd>
            </div>
            {totals.addOnTotal > 0 && (
              <div className="flex justify-between">
                <dt className="text-ink-600">Add-ons ({addOns.length})</dt>
                <dd className="font-medium text-ink-950">{formatINR(totals.addOnTotal)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-ink-950/6 pt-2.5">
              <dt className="text-ink-600">Subtotal</dt>
              <dd className="font-medium text-ink-950">{formatINR(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">Visit fee</dt>
              <dd className={totals.visitFee === 0 ? "font-medium text-emerald-600" : "font-medium text-ink-950"}>
                {totals.visitFee === 0 ? "Free" : formatINR(totals.visitFee)}
              </dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <dt>Coupon savings</dt>
                <dd className="font-medium">− {formatINR(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-ink-950/10 pt-3">
              <dt className="font-display text-base font-semibold text-ink-950">Total (incl. GST)</dt>
              <dd className="font-display text-base font-bold text-ink-950">{formatINR(totals.total)}</dd>
            </div>
          </dl>

          {/* Coupon */}
          <div className="mt-5 border-t border-dashed border-gold-500/40 pt-5">
            {store.couponCode ? (
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-emerald-50 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                  <BadgePercent className="size-4" />
                  {store.couponCode} applied — you saved {formatINR(totals.discount)}
                </span>
                <button
                  type="button"
                  onClick={store.removeCoupon}
                  className="inline-flex size-8 items-center justify-center rounded-full text-emerald-700 transition-colors hover:bg-emerald-100"
                  aria-label="Remove coupon"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <>
                <label htmlFor="coupon" className="flex items-center gap-1.5 text-sm font-medium text-ink-800">
                  <Tag className="size-3.5 text-gold-600" />
                  Have a coupon?
                </label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="coupon"
                    placeholder="e.g. GLAMFIRST"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyCode()}
                    className="uppercase"
                  />
                  <Button variant="outline" onClick={applyCode}>
                    Apply
                  </Button>
                </div>
                {couponError && <p className="mt-2 text-xs text-red-600">{couponError}</p>}
              </>
            )}
          </div>

          <Button variant="gold" size="lg" className="mt-6 w-full" onClick={store.goNext}>
            Continue to payment
          </Button>
        </aside>
      </div>
    </section>
  );
}
