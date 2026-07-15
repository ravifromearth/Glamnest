import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";
import { formatDuration, formatINR, cn } from "@/lib/utils";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.categorySlug}/${service.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      <div className={cn("relative flex h-40 items-center justify-center bg-gradient-to-br", service.gradient)}>
        <span className="text-6xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110" aria-hidden>
          {service.emoji}
        </span>
        {service.popular && (
          <Badge variant="gold" className="absolute left-4 top-4 bg-white/85 backdrop-blur">
            Bestseller
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-ink-500">
          <Stars rating={service.rating} />
          <span className="font-medium text-ink-800">{service.rating}</span>
          <span>({service.reviewCount.toLocaleString("en-IN")})</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-950">
          {service.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{service.shortDescription}</p>
        <div className="mt-4 flex items-end justify-between border-t border-ink-950/6 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-400">Starting at</p>
            <p className="font-display text-lg font-bold text-ink-950">{formatINR(service.startingPrice)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-ink-500">
              <Clock className="size-3.5" />
              {formatDuration(service.durationMin)}
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-ink-950 text-cream-50 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-ink-950">
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
