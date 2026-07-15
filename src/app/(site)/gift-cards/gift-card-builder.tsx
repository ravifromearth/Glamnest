"use client";

import * as React from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { cn, formatINR } from "@/lib/utils";

const DENOMINATIONS = [500, 1000, 2000, 5000] as const;

export function GiftCardBuilder() {
  const [amount, setAmount] = React.useState<number>(1000);

  const whatsappHref = `https://wa.me/${BRAND.whatsapp.replace("+", "")}?text=${encodeURIComponent(
    `Hi GlamNest! I'd like to buy a gift card worth ${formatINR(amount)}.`
  )}`;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Decorative gift card (CSS only) */}
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-6 rounded-[2rem] bg-gold-500/15 blur-2xl" aria-hidden />
        <div className="relative aspect-[8/5] overflow-hidden rounded-3xl bg-ink-950 p-7 shadow-lift ring-1 ring-gold-500/40 sm:p-8">
          {/* sheen + texture */}
          <div className="pointer-events-none absolute -left-1/4 -top-1/2 h-[200%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full bg-gold-500/10 blur-2xl" aria-hidden />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-gold-gradient">{BRAND.name}</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.28em] text-cream-100/50">
                  Gift Card
                </p>
              </div>
              <Sparkles className="size-6 text-gold-400" aria-hidden />
            </div>

            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cream-100/40">
                Gift value
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-gold-400 sm:text-5xl">
                {formatINR(amount)}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <p className="font-mono text-xs tracking-[0.2em] text-cream-100/50">
                GN•• ••••  ••••  GIFT
              </p>
              <p className="text-[0.65rem] italic text-gold-400/80">{BRAND.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Denomination picker */}
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
          Choose a value
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          The recipient redeems it on any service — bridal, spa, hair or a monthly ritual.
          Valid for 12 months, usable across multiple bookings.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Gift card value">
          {DENOMINATIONS.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={amount === value}
              onClick={() => setAmount(value)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-center font-display text-lg font-semibold transition-all duration-300",
                amount === value
                  ? "border-gold-500 bg-ink-950 text-gold-400 shadow-gold"
                  : "border-ink-950/12 bg-white text-ink-950 hover:border-gold-500/60 hover:bg-gold-500/5"
              )}
            >
              {formatINR(value)}
            </button>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              <MessageCircle /> Buy {formatINR(amount)} Card on WhatsApp
            </Button>
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Delivered digitally within minutes — as an elegant card on WhatsApp or email, with your
          personal message.
        </p>
      </div>
    </div>
  );
}
