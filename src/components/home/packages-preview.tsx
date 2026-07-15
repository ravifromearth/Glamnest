import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BEAUTY_PACKAGES } from "@/lib/catalog";
import { cn, formatINR } from "@/lib/utils";

export function PackagesPreview() {
  return (
    <section className="section-gn bg-cream-100">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Curated Bundles"
          title="Beauty Packages For Every Occasion"
          description="Weddings, party seasons and monthly rituals — bundled, discounted and delivered home."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BEAUTY_PACKAGES.map((pkg) => {
            const savings = pkg.strikePrice - pkg.price;
            return (
              <div
                key={pkg.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={cn("relative flex h-32 items-center justify-center bg-gradient-to-br", pkg.gradient)}>
                  <span className="text-5xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
                    {pkg.emoji}
                  </span>
                  {pkg.popular && (
                    <Badge variant="gold" className="absolute left-4 top-4 bg-white/85 backdrop-blur">
                      Bestseller
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">{pkg.occasion}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-950">{pkg.name}</h3>
                  <ul className="mt-3 flex-1 space-y-1.5">
                    {pkg.includes.slice(0, 3).map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-xs text-ink-600">
                        <Check className="mt-0.5 size-3 shrink-0 text-gold-600" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-end justify-between border-t border-ink-950/6 pt-3">
                    <div>
                      <p className="text-xs text-ink-400 line-through">{formatINR(pkg.strikePrice)}</p>
                      <p className="font-display text-lg font-bold text-ink-950">{formatINR(pkg.price)}</p>
                    </div>
                    <Badge variant="success">Save {formatINR(savings)}</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/packages">
            <Button variant="outline" size="lg">
              View All Packages <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
