"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Stars } from "@/components/ui/stars";
import { SectionHeading } from "@/components/site/section-heading";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section className="section-gn bg-cream-100">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Loved Across Patna"
          description="Real reviews from real homes — every one verified after a completed booking."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <Quote className="size-6 text-gold-500/60" aria-hidden />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-950/6 pt-4">
                <Avatar initials={t.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-950">{t.name}</p>
                  <p className="truncate text-xs text-ink-500">
                    {t.locality}, {t.city} · {t.service}
                  </p>
                </div>
                <Stars rating={t.rating} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
