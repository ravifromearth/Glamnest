"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/catalog";
import { useLiveCategories, useServiceFlagsStore } from "@/stores/service-flags-store";

export function PopularServices() {
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  const liveCategories = useLiveCategories();
  void flags;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const services = SERVICES.filter((s) => s.popular && isEnabled(s.slug)).slice(0, 8);

  return (
    <section className="section-gn">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Most Loved"
          title="Popular Services"
          description="The rituals Patna books again and again — delivered at home with sealed kits and senior professionals."
        />

        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {liveCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-950/10 bg-white px-4 py-2 text-sm font-medium text-ink-800 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-lift"
            >
              <span aria-hidden>{cat.emoji}</span>
              {cat.shortName}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View all services <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
