"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CalendarCheck, Home, IndianRupee, Sparkles, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { TRUST_POINTS } from "@/lib/brand";
import { STATS } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  BadgeCheck,
  Sparkles,
  IndianRupee,
  Home,
  CalendarCheck,
};

export function WhyGlamNest() {
  return (
    <section className="section-gn bg-ink-950 text-cream-50">
      <div className="container-gn">
        <SectionHeading
          dark
          eyebrow="The GlamNest Promise"
          title="Why 25,000+ Bookings Trust Us"
          description="We built GlamNest around one obsession: salon-grade luxury with hospital-grade hygiene, delivered to your door."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[point.icon] ?? Sparkles;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-3xl border border-white/8 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-gold-500/40 hover:bg-white/[0.07]"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/60">{point.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats band */}
        <div className="mt-14 grid grid-cols-2 gap-6 rounded-3xl border border-gold-500/20 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10 p-8 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-gold-400 md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-cream-100/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
