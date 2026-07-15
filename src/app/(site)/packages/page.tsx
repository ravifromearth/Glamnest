import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { BRAND } from "@/lib/brand";
import { BEAUTY_PACKAGES } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Beauty Packages — Curated Bundles, Better Prices",
  description:
    "Wedding glow journeys, party squad bundles and monthly essentials — GlamNest's curated at-home beauty packages save up to 25% over booking individually.",
  path: "/packages",
});

export default function PackagesPage() {
  const whatsappHref = `https://wa.me/${BRAND.whatsapp.replace("+", "")}?text=${encodeURIComponent(
    "Hi GlamNest! I'd like to build a custom beauty package."
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-10 md:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Beauty Packages
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Curated rituals, <span className="text-gold-gradient">kinder prices</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              Our most-loved services, bundled by occasion and priced better than booking them
              one by one. One checkout, one team, zero coordination headaches.
            </p>
          </div>
        </div>
      </section>

      {/* Package cards */}
      <section className="container-gn pb-14 md:pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {BEAUTY_PACKAGES.map((pkg) => {
            const savings = pkg.strikePrice - pkg.price;
            return (
              <div
                key={pkg.slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Gradient header */}
                <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${pkg.gradient}`}>
                  <span className="text-7xl" aria-hidden>
                    {pkg.emoji}
                  </span>
                  {pkg.popular && (
                    <Badge className="absolute left-5 top-5 bg-ink-950 text-gold-400">
                      Most Popular
                    </Badge>
                  )}
                  <Badge variant="success" className="absolute right-5 top-5">
                    Save {formatINR(savings)}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <Badge variant="gold" className="self-start">
                    {pkg.occasion}
                  </Badge>
                  <h2 className="mt-3 font-display text-2xl font-bold text-ink-950">{pkg.name}</h2>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-600" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/6 pt-6">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold text-ink-950">
                          {formatINR(pkg.price)}
                        </span>
                        <span className="text-sm text-ink-400 line-through">
                          {formatINR(pkg.strikePrice)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-500">All-inclusive, at home</p>
                    </div>
                    <Link href="/booking">
                      <Button variant="gold" size="lg">
                        Book This Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Build your own */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 sm:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  dark
                  eyebrow="Build Your Own"
                  title="Don't see your occasion?"
                  description="Tell us the event, the people and the date — our team assembles a custom package with bundle pricing within the hour, on WhatsApp."
                  className="mb-0 md:mb-0"
                />
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="xl">
                    <MessageCircle /> Build My Package on WhatsApp
                  </Button>
                </a>
                <p className="text-xs text-cream-100/50">
                  Replies within 30 minutes, {BRAND.hours.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
