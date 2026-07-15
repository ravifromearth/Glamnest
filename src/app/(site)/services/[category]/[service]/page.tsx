import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { SERVICES, getCategory, getService, getServicesByCategory } from "@/lib/catalog";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
  serviceJsonLd,
} from "@/lib/seo";
import { cn, formatDuration, formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ category: s.categorySlug, service: s.slug }));
}

type Params = Promise<{ category: string; service: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category, service } = await params;
  const svc = getService(category, service);
  if (!svc) return {};
  return buildMetadata({
    title: `${svc.name} at Home in Patna — from ${formatINR(svc.startingPrice)}`,
    description: `${svc.shortDescription} Rated ${svc.rating}★ by ${svc.reviewCount}+ customers. Book verified professionals at your doorstep.`,
    path: `/services/${svc.categorySlug}/${svc.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { category, service } = await params;
  const svc = getService(category, service);
  const cat = getCategory(category);
  if (!svc || !cat) notFound();

  const path = `/services/${svc.categorySlug}/${svc.slug}`;
  const related = getServicesByCategory(cat.slug).filter((s) => s.slug !== svc.slug).slice(0, 3);

  return (
    <>
      <script
        {...jsonLdScriptProps(
          serviceJsonLd({
            name: svc.name,
            description: svc.shortDescription,
            price: svc.startingPrice,
            path,
          })
        )}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: cat.name, path: `/services/${cat.slug}` },
            { name: svc.name, path },
          ])
        )}
      />
      {svc.faqs.length > 0 && <script {...jsonLdScriptProps(faqJsonLd(svc.faqs))} />}

      {/* Hero */}
      <section className="section-gn !pb-0">
        <div className="container-gn">
          <nav className="mb-6 text-xs text-ink-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-gold-700">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${cat.slug}`} className="hover:text-gold-700">{cat.name}</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-ink-950">{svc.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* Left: content */}
            <div>
              <div className={cn("relative flex h-64 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br shadow-soft md:h-80", svc.gradient)}>
                <div className="absolute inset-0 bg-dots opacity-30" aria-hidden />
                <span className="relative text-[7rem] drop-shadow-md md:text-[9rem]" aria-hidden>{svc.emoji}</span>
                {svc.popular && (
                  <Badge variant="gold" className="absolute left-5 top-5 bg-white/85 backdrop-blur">Bestseller</Badge>
                )}
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-3 text-sm">
                  <Stars rating={svc.rating} />
                  <span className="font-semibold text-ink-950">{svc.rating}</span>
                  <span className="text-ink-500">({svc.reviewCount.toLocaleString("en-IN")} verified reviews)</span>
                </div>
                <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 md:text-4xl">
                  {svc.name}
                </h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-600">{svc.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {svc.highlights.map((h) => (
                    <Badge key={h} variant="cream"><Check /> {h}</Badge>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-ink-950">Choose Your Package</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {svc.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={cn(
                        "relative flex flex-col rounded-3xl border bg-white p-6 shadow-soft transition-all hover:shadow-lift",
                        pkg.popular ? "border-gold-500/60 ring-2 ring-gold-500/25" : "border-ink-950/8"
                      )}
                    >
                      {pkg.popular && (
                        <Badge variant="gold" className="absolute -top-3 left-6 bg-white shadow-soft">
                          <Sparkles /> Most Booked
                        </Badge>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">{pkg.tier}</p>
                          <h3 className="mt-1 font-display text-xl font-semibold text-ink-950">{pkg.name}</h3>
                        </div>
                        <div className="text-right">
                          {pkg.strikePrice && (
                            <p className="text-xs text-ink-400 line-through">{formatINR(pkg.strikePrice)}</p>
                          )}
                          <p className="font-display text-2xl font-bold text-ink-950">{formatINR(pkg.price)}</p>
                        </div>
                      </div>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-500">
                        <Clock className="size-3.5" /> {formatDuration(pkg.durationMin)}
                      </p>
                      <ul className="mt-4 flex-1 space-y-2">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-ink-700">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-gold-600" /> {inc}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/booking?service=${svc.slug}`} className="mt-5">
                        <Button variant={pkg.popular ? "gold" : "outline"} className="w-full">
                          Book {pkg.name}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {svc.addOns.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold text-ink-950">Popular Add-Ons</h2>
                  <p className="mt-1 text-sm text-ink-500">Attach these while booking — no extra visit needed.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {svc.addOns.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between rounded-2xl border border-ink-950/8 bg-white px-5 py-4 shadow-soft">
                        <div>
                          <p className="text-sm font-medium text-ink-950">{addon.name}</p>
                          <p className="text-xs text-ink-500">+{formatDuration(addon.durationMin)}</p>
                        </div>
                        <p className="font-display text-base font-bold text-ink-950">{formatINR(addon.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {svc.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold text-ink-950">Frequently Asked</h2>
                  <Accordion items={svc.faqs} className="mt-5" />
                </div>
              )}
            </div>

            {/* Right: sticky booking card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-lift">
                <p className="text-xs uppercase tracking-wide text-ink-400">Starting at</p>
                <p className="mt-1 font-display text-4xl font-bold text-ink-950">
                  {formatINR(svc.startingPrice)}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-ink-500">
                  <Clock className="size-4" /> {formatDuration(svc.durationMin)} at your home
                </p>

                <div className="mt-5 space-y-2.5 border-t border-ink-950/6 pt-5 text-sm text-ink-700">
                  <p className="flex items-center gap-2.5"><BadgeCheck className="size-4 text-gold-600" /> Verified, trained professional</p>
                  <p className="flex items-center gap-2.5"><ShieldCheck className="size-4 text-gold-600" /> Sealed single-use hygiene kit</p>
                  <p className="flex items-center gap-2.5"><Sparkles className="size-4 text-gold-600" /> Free reschedule up to 2 hrs before</p>
                </div>

                <Link href={`/booking?service=${svc.slug}`} className="mt-6 block">
                  <Button variant="gold" size="lg" className="w-full">
                    Book Now <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-center text-xs text-ink-400">
                  Use code <span className="font-semibold text-gold-700">GLAMFIRST</span> for ₹300 off your first booking
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-gn">
          <div className="container-gn">
            <SectionHeading eyebrow="Pairs Well With" title={`More ${cat.shortName} Services`} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
