import Link from "next/link";
import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customer Stories & Reviews",
  description:
    "Rated 4.8 stars across 6,200+ reviews. Read what customers across Patna say about GlamNest's at-home bridal makeup, facials, spa and salon services.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Customer Stories
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Loved in living rooms <span className="text-gold-gradient">across Patna</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              From bridal mornings on Boring Road to spa evenings in Danapur — real words from the
              homes we visit every day.
            </p>
          </div>
        </div>
      </section>

      {/* Rating summary banner */}
      <section className="container-gn">
        <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-ink-950 px-6 py-10 text-center sm:flex-row sm:gap-12 sm:text-left">
          <div className="flex items-center gap-4">
            <p className="font-display text-6xl font-bold text-gold-400">4.8</p>
            <div>
              <Stars rating={4.8} className="[&_svg]:size-5" />
              <p className="mt-1 text-sm text-cream-100/70">Average rating</p>
            </div>
          </div>
          <div className="hidden h-14 w-px bg-cream-50/15 sm:block" aria-hidden />
          <div>
            <p className="font-display text-3xl font-bold text-cream-50">6,200+ reviews</p>
            <p className="mt-1 text-sm text-cream-100/70">
              Verified post-service ratings, collected after every single booking
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial cards */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="In Their Words"
            title="Six stories we keep coming back to"
            description="Unedited, straight from post-booking reviews — the moments that tell us we're doing this right."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-3xl border border-ink-950/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Quote className="size-7 text-gold-500/40" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-ink-950/6 pt-5">
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.initials} />
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold text-ink-950">{t.name}</p>
                      <p className="text-xs text-ink-500">
                        {t.locality}, {t.city}
                      </p>
                    </div>
                    <Stars rating={t.rating} className="ml-auto" />
                  </div>
                  <Badge variant="cream" className="mt-4">
                    {t.service}
                  </Badge>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="rounded-3xl bg-gradient-to-br from-rose-200 via-blush-100 to-cream-100 px-6 py-14 text-center sm:px-12 md:py-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-ink-950 sm:text-4xl">
              Your review could be next
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-700 sm:text-base">
              Book a service, experience the GlamNest standard, and tell us how we did — we read
              every word.
            </p>
            <div className="mt-8">
              <Link href="/booking">
                <Button size="xl">Book Your First Service</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
