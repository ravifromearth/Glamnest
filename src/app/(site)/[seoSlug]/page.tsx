import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { Accordion } from "@/components/ui/accordion";
import { CATEGORIES, SERVICES, getServicesByCategory } from "@/lib/catalog";
import { FAQS, TESTIMONIALS } from "@/lib/content";
import {
  allSeoLandingSlugs,
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
  localBusinessJsonLd,
  parseSeoLandingSlug,
} from "@/lib/seo";

/* ============================================================
   LOCAL SEO LANDING PAGES
   /beauty-at-home-patna, /bridal-makeup-patna, /facial-at-home-gaya …
   {intent} × {city} statically generated, LocalBusiness schema.
   ============================================================ */

export function generateStaticParams() {
  return allSeoLandingSlugs().map((seoSlug) => ({ seoSlug }));
}

export const dynamicParams = false;

type Params = Promise<{ seoSlug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { seoSlug } = await params;
  const parsed = parseSeoLandingSlug(seoSlug);
  if (!parsed) return {};
  const { page, city } = parsed;
  return buildMetadata({
    title: `${page.label} in ${city.name} — Verified Professionals | GlamNest`,
    description: `Book ${page.label.toLowerCase()} in ${city.name} with GlamNest. Verified beauticians, sealed hygiene kits, transparent prices and doorstep convenience. ${city.status === "live" ? "Same-day slots available." : `Launching soon in ${city.name}.`}`,
    path: `/${seoSlug}`,
    keywords: [
      `${page.label.toLowerCase()} ${city.name.toLowerCase()}`,
      `salon at home ${city.name.toLowerCase()}`,
      `beautician at home ${city.name.toLowerCase()}`,
    ],
  });
}

export default async function SeoLandingPage({ params }: { params: Params }) {
  const { seoSlug } = await params;
  const parsed = parseSeoLandingSlug(seoSlug);
  if (!parsed) notFound();

  const { page, city } = parsed;
  const isLive = city.status === "live";
  const services =
    page.serviceHint === "salon-at-home"
      ? SERVICES.filter((s) => s.popular).slice(0, 6)
      : getServicesByCategory(page.serviceHint).slice(0, 6);
  const displayServices = services.length > 0 ? services : SERVICES.slice(0, 6);
  const localFaqs = [
    {
      question: `Is ${page.label.toLowerCase()} available in ${city.name}?`,
      answer: isLive
        ? `Yes — GlamNest serves 40+ localities across ${city.name} with same-day and scheduled slots from 7 AM to 9 PM, all 7 days.`
        : `${city.name} is launching soon. Join the waitlist via our contact page and get ₹500 launch credit when we go live.`,
    },
    ...FAQS.slice(1, 4),
  ];

  return (
    <>
      <script {...jsonLdScriptProps(localBusinessJsonLd(city.slug))} />
      <script {...jsonLdScriptProps(faqJsonLd(localFaqs))} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: `${page.label} ${city.name}`, path: `/${seoSlug}` },
          ])
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-16 text-cream-50 md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-[-20%] size-96 rounded-full bg-gold-500/12 blur-[110px]" />
        </div>
        <div className="container-gn relative max-w-3xl text-center md:text-left">
          <Badge variant="gold" className="bg-gold-500/10">
            <MapPin /> {city.name}, {city.state} {isLive ? "· Live now" : "· Launching soon"}
          </Badge>
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {page.label} in <span className="text-gold-gradient">{city.name}</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            {isLive
              ? `Skip the salon commute. GlamNest brings verified beauty professionals, premium branded products and sealed hygiene kits to homes across ${city.name} — bookable in under two minutes.`
              : `GlamNest is coming to ${city.name}. The same verified professionals, premium products and doorstep luxury that Patna loves — arriving in your city soon.`}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {isLive ? (
              <>
                <Link href="/booking">
                  <Button variant="gold" size="lg">Book Now <ArrowRight className="size-4" /></Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline-light" size="lg">Explore Services</Button>
                </Link>
              </>
            ) : (
              <Link href="/contact">
                <Button variant="gold" size="lg">Join the {city.name} Waitlist <ArrowRight className="size-4" /></Button>
              </Link>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream-100/60 md:justify-start">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="size-4 text-gold-500" /> Background-verified experts</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-gold-500" /> Sealed hygiene kits</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-gold-500" /> 7 AM – 9 PM, all week</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow={isLive ? `Available in ${city.name}` : "Coming to your city"}
            title={`Popular ${page.label} Options`}
            description={`Transparent pricing, senior professionals and premium products — the GlamNest standard${isLive ? ` in every ${city.name} home` : ""}.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why + local FAQs */}
      <section className="section-gn bg-cream-100">
        <div className="container-gn grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The GlamNest Standard"
              title={`Why ${city.name} Chooses GlamNest`}
            />
            <ul className="space-y-4">
              {[
                { icon: BadgeCheck, text: "Every professional is ID-verified, police-checked and certified at our training academy." },
                { icon: ShieldCheck, text: "Single-use applicators and sealed kits, opened in front of you — audited monthly." },
                { icon: Sparkles, text: "O3+, Lotus Professional, Rica, L'Oréal and MAC — never refilled, never unbranded." },
                { icon: Clock, text: "Real-time slots from 7 AM to 9 PM with free rescheduling up to 2 hours before." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3.5 rounded-2xl border border-ink-950/8 bg-white p-4 shadow-soft">
                  <item.icon className="mt-0.5 size-5 shrink-0 text-gold-600" />
                  <span className="text-sm leading-relaxed text-ink-700">{item.text}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-6 rounded-2xl bg-ink-950 p-5 text-sm italic leading-relaxed text-cream-100/80">
              “{TESTIMONIALS[0].quote}”
              <footer className="mt-2 not-italic text-xs text-gold-400">
                — {TESTIMONIALS[0].name}, {TESTIMONIALS[0].locality}
              </footer>
            </blockquote>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Good to Know" title={`${city.name} FAQs`} />
            <Accordion items={localFaqs} />
          </div>
        </div>
      </section>

      {/* Cross-links to other intents */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading eyebrow="More at Home" title={`Everything Else We Bring to ${city.name}`} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {CATEGORIES.slice(0, 10).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-ink-950/8 bg-white p-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="text-3xl transition-transform group-hover:scale-110" aria-hidden>{c.emoji}</span>
                <span className="text-xs font-semibold text-ink-800">{c.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
