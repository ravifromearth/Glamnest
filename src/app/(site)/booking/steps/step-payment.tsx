"use client";

import { useState } from "react";
import { Banknote, Check, CreditCard, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { useBookingStore, useBookingTotals } from "@/stores/booking-store";
import { createBooking } from "@/server/actions";
import { whatsappHref } from "@/lib/brand";
import { cn, formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StepHeader } from "./step-header";

function formatBookingDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildWhatsAppBookingMessage(params: {
  bookingId: string;
  serviceName: string;
  packageName: string;
  addOns: string[];
  date: string;
  slot: string;
  beauticianName: string;
  address: {
    label: string;
    line1: string;
    locality: string;
    city: string;
    pincode: string;
  };
  couponCode: string | null;
  paymentMethod: "razorpay" | "pay-after";
  total: number;
}) {
  const addOnLine =
    params.addOns.length > 0 ? params.addOns.join(", ") : "None";
  const paymentLabel =
    params.paymentMethod === "razorpay" ? "Pay Online (Razorpay)" : "Pay After Service";

  return [
    `Hi GlamNest! I'd like to confirm this booking:`,
    ``,
    `*Booking ID:* ${params.bookingId}`,
    `*Service:* ${params.serviceName}`,
    `*Package:* ${params.packageName}`,
    `*Add-ons:* ${addOnLine}`,
    `*Date:* ${formatBookingDate(params.date)}`,
    `*Slot:* ${params.slot}`,
    `*Beautician:* ${params.beauticianName}`,
    `*Address:* ${params.address.label} — ${params.address.line1}, ${params.address.locality}, ${params.address.city} ${params.address.pincode}`,
    params.couponCode ? `*Coupon:* ${params.couponCode}` : null,
    `*Payment:* ${paymentLabel}`,
    `*Total:* ${formatINR(params.total)}`,
    ``,
    `Please confirm my booking. Thank you!`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function StepPayment() {
  const store = useBookingStore();
  const { total } = useBookingTotals();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { service, servicePackage, addOns, address, date, slot, beautician, couponCode, paymentMethod } = store;
  if (!service || !servicePackage || !address || !date || !slot || !beautician) return null;

  async function confirmBooking() {
    if (!service || !servicePackage || !address || !date || !slot || !beautician || !paymentMethod) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await createBooking({
        serviceSlug: service.slug,
        packageId: servicePackage.id,
        addOnIds: addOns.map((a) => a.id),
        date,
        slot,
        beauticianId: beautician.id,
        address: {
          label: address.label,
          line1: address.line1,
          locality: address.locality,
          city: address.city,
          pincode: address.pincode,
        },
        couponCode,
        paymentMethod,
        total,
      });
      if (result.ok) {
        const message = buildWhatsAppBookingMessage({
          bookingId: result.bookingId,
          serviceName: service.name,
          packageName: servicePackage.name,
          addOns: addOns.map((a) => a.name),
          date,
          slot,
          beauticianName: beautician.name,
          address,
          couponCode,
          paymentMethod,
          total,
        });
        store.reset();
        window.location.href = whatsappHref(message);
        return;
      }
      setError(result.error);
      setSubmitting(false);
    } catch {
      setError("Something went wrong while confirming. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section aria-label="Choose how to pay">
      <StepHeader
        eyebrow="Step 8 · Payment"
        title="How would you like to pay?"
        description="Both options are safe — pay now for instant confirmation and cashback, or settle after your service."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Razorpay */}
        <button
          type="button"
          onClick={() => store.setPaymentMethod("razorpay")}
          className={cn(
            "relative flex flex-col rounded-3xl border bg-white p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
            paymentMethod === "razorpay"
              ? "border-gold-500 ring-2 ring-gold-500"
              : "border-ink-950/8 hover:border-gold-500/50"
          )}
        >
          <span className="absolute -top-3 left-6">
            <Badge variant="gold" className="bg-gold-500 text-ink-950 ring-0 shadow-gold">
              Recommended
            </Badge>
          </span>
          <span className="flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-ink-950 text-gold-400">
              <CreditCard className="size-5" />
            </span>
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border transition-colors",
                paymentMethod === "razorpay"
                  ? "border-gold-500 bg-gold-500 text-ink-950"
                  : "border-ink-950/15 text-transparent"
              )}
              aria-hidden
            >
              <Check className="size-3.5" />
            </span>
          </span>
          <span className="mt-4 font-display text-lg font-semibold text-ink-950">
            Pay Online (Razorpay)
          </span>
          <span className="mt-1 text-sm text-ink-500">
            UPI, credit & debit cards, netbanking and wallets — 100% secure.
          </span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <Sparkles className="size-3.5" />
            Get up to ₹75 cashback on UPI payments
          </span>
        </button>

        {/* Pay after service */}
        <button
          type="button"
          onClick={() => store.setPaymentMethod("pay-after")}
          className={cn(
            "flex flex-col rounded-3xl border bg-white p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
            paymentMethod === "pay-after"
              ? "border-gold-500 ring-2 ring-gold-500"
              : "border-ink-950/8 hover:border-gold-500/50"
          )}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-cream-100 text-ink-700">
              <Banknote className="size-5" />
            </span>
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border transition-colors",
                paymentMethod === "pay-after"
                  ? "border-gold-500 bg-gold-500 text-ink-950"
                  : "border-ink-950/15 text-transparent"
              )}
              aria-hidden
            >
              <Check className="size-3.5" />
            </span>
          </span>
          <span className="mt-4 font-display text-lg font-semibold text-ink-950">Pay After Service</span>
          <span className="mt-1 text-sm text-ink-500">
            Relax first, pay later — cash or UPI directly to GlamNest once you are glowing.
          </span>
          <span className="mt-3 text-xs font-medium text-ink-400">No advance needed</span>
        </button>
      </div>

      {error && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col items-stretch gap-3 rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Amount payable</p>
          <p className="font-display text-2xl font-bold text-ink-950">{formatINR(total)}</p>
        </div>
        <Button
          variant="gold"
          size="xl"
          disabled={!paymentMethod || submitting}
          onClick={confirmBooking}
          className="sm:min-w-56"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Opening WhatsApp…
            </>
          ) : (
            <>
              <MessageCircle />
              Confirm on WhatsApp
            </>
          )}
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-ink-400">
        Your booking details will open in WhatsApp so you can share them with our team.
        Free rescheduling up to 4 hours before your slot.
      </p>
    </section>
  );
}
