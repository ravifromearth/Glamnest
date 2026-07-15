import Link from "next/link";
import { ArrowRight, Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServicesByCategory } from "@/lib/catalog";
import { formatINR } from "@/lib/utils";

export function BridalShowcase() {
  const bridalServices = getServicesByCategory("bridal-makeup");

  return (
    <section className="section-gn overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="container-gn grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-2 lg:order-1" aria-hidden>
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-200 via-blush-100 to-cream-100 shadow-lift">
            <div className="absolute inset-0 bg-dots opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9rem] drop-shadow-md">👰</span>
            </div>
            <div className="glass absolute bottom-6 left-6 right-6 rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-semibold text-ink-950">Celebrity Luxe Bridal</p>
                  <p className="text-xs text-ink-500">Trial included · 4-hr touch-up support</p>
                </div>
                <p className="font-display text-lg font-bold text-gold-700">{formatINR(18999)}</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-2 top-8 hidden rotate-6 rounded-2xl bg-ink-950 px-5 py-3 text-cream-50 shadow-lift sm:block">
            <p className="font-display text-sm font-semibold text-gold-400">400+ brides</p>
            <p className="text-[11px] text-cream-100/60">glammed this season</p>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
            <Crown className="size-4" /> Bridal Studio
          </p>
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-4xl md:text-[2.75rem]">
            Your Wedding Day,
            <br />
            <span className="text-gold-gradient">Perfected At Home</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-600">
            No traffic, no crowded salon chairs on your biggest morning. Senior bridal artists
            arrive with sealed premium kits, handle draping and jewellery, and stay until you
            walk out the door flawless.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "HD, airbrush & celebrity artist tiers",
              "Free consultation call + at-home trial options",
              "Family makeup, mehendi & groom add-ons",
              "On-call touch-up artist through your event",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-ink-800">
                <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                  <Check className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/services/bridal-makeup">
              <Button size="lg">
                Explore Bridal Packages <ArrowRight className="size-4" />
              </Button>
            </Link>
            <div className="flex flex-col">
              <span className="text-xs text-ink-500">Starting at</span>
              <span className="font-display text-xl font-bold text-ink-950">
                {formatINR(Math.min(...bridalServices.map((s) => s.startingPrice)))}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {bridalServices.map((s) => (
              <Badge key={s.slug} variant="cream">{s.name}</Badge>
            ))}
            <Badge variant="cream">Wedding Glow Journey</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
