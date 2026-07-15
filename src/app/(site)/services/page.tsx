import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES, SERVICES, getServicesByCategory } from "@/lib/catalog";
import { buildMetadata, breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { cn, formatINR } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "All Beauty Services at Home in Patna",
  description:
    "Browse GlamNest's full menu — bridal makeup, party makeup, hair, facials, spa, waxing, mani-pedi, groom, mehendi and senior care. Verified professionals at your doorstep in Patna.",
  path: "/services",
  keywords: ["beauty services at home patna", "salon services home", "beautician services patna"],
});

export default function ServicesPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />

      {/* Page hero */}
      <section className="bg-ink-950 py-16 text-cream-50 md:py-20">
        <div className="container-gn text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
            The Full Menu
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Every Service, <span className="text-gold-gradient">At Your Doorstep</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/65 md:text-base">
            {SERVICES.length}+ professional services across {CATEGORIES.length} categories —
            each delivered by verified experts with sealed hygiene kits.
          </p>
        </div>
      </section>

      {/* Category jump nav */}
      <div className="glass sticky top-16 z-40 border-b border-ink-950/6 md:top-[72px]">
        <div className="container-gn no-scrollbar flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-950/10 bg-white px-4 py-1.5 text-xs font-medium text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-700"
            >
              <span aria-hidden>{cat.emoji}</span> {cat.shortName}
            </a>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="section-gn space-y-16 md:space-y-24">
        {CATEGORIES.map((cat) => {
          const services = getServicesByCategory(cat.slug);
          if (services.length === 0) return null;
          const minPrice = Math.min(...services.map((s) => s.startingPrice));
          return (
            <section key={cat.slug} id={cat.slug} className="container-gn scroll-mt-36">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-soft",
                      cat.gradient
                    )}
                    aria-hidden
                  >
                    {cat.emoji}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink-950 md:text-3xl">
                      {cat.name}
                    </h2>
                    <p className="mt-1 text-sm text-ink-500">
                      {cat.heroLine} · from {formatINR(minPrice)}
                    </p>
                  </div>
                </div>
                <Link href={`/services/${cat.slug}`}>
                  <Button variant="outline" size="sm">
                    View Category <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
