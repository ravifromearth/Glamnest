import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/site/service-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { CATEGORIES, getCategory, getServicesByCategory } from "@/lib/catalog";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { cn, formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} at Home in Patna`,
    description: `${cat.description} Book verified professionals at your doorstep with GlamNest.`,
    path: `/services/${cat.slug}`,
    keywords: [`${cat.name.toLowerCase()} at home`, `${cat.name.toLowerCase()} patna`, "salon at home"],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const services = getServicesByCategory(cat.slug);
  const faqs = services.flatMap((s) => s.faqs).slice(0, 5);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 6);

  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: cat.name, path: `/services/${cat.slug}` },
          ])
        )}
      />
      {faqs.length > 0 && <script {...jsonLdScriptProps(faqJsonLd(faqs))} />}

      {/* Hero */}
      <section className={cn("relative overflow-hidden bg-gradient-to-br py-16 md:py-24", cat.gradient)}>
        <div className="absolute inset-0 bg-dots opacity-30" aria-hidden />
        <div className="container-gn relative">
          <nav className="mb-6 text-xs text-ink-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-gold-700">Services</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-ink-950">{cat.name}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex size-20 items-center justify-center rounded-3xl bg-white/70 text-5xl shadow-soft backdrop-blur" aria-hidden>
              {cat.emoji}
            </span>
            <div className="max-w-xl">
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 md:text-5xl">
                {cat.name} <span className="text-gold-700">at Home</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-700 md:text-base">{cat.description}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-ink-700">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="size-4 text-gold-700" /> Verified professionals</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-gold-700" /> Sealed hygiene kits</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="size-4 text-gold-700" /> Premium branded products</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-ink-950 p-8 text-center text-cream-50 md:p-10">
            <h2 className="font-display text-2xl font-bold">
              Not sure which one is right for you?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-cream-100/65">
              Start a booking and our flow will guide you — or WhatsApp us and a beauty advisor
              will recommend the perfect ritual.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={`/booking?category=${cat.slug}`}>
                <Button variant="gold" size="lg">
                  Book {cat.shortName} Now <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline-light" size="lg">Ask an Advisor</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-gn bg-cream-100">
          <div className="container-gn max-w-3xl">
            <SectionHeading eyebrow="Good to Know" title={`${cat.shortName} FAQs`} />
            <Accordion items={faqs} />
          </div>
        </section>
      )}

      {/* Cross-links */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading eyebrow="Keep Exploring" title="You Might Also Love" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className={cn(
                  "group flex flex-col items-center gap-3 rounded-3xl border border-ink-950/8 bg-gradient-to-br p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  c.gradient
                )}
              >
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110" aria-hidden>
                  {c.emoji}
                </span>
                <span className="text-sm font-semibold text-ink-950">{c.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
