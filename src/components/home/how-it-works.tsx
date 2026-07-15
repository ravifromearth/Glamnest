"use client";

import { motion } from "framer-motion";
import { Clock, DoorOpen, HeartHandshake, LayoutGrid, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { HOW_IT_WORKS } from "@/lib/brand";

const ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  Clock,
  DoorOpen,
  HeartHandshake,
};

export function HowItWorks() {
  return (
    <section className="section-gn">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Effortless by Design"
          title="How It Works"
          description="From scroll to salon-at-home in four simple steps."
        />

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent md:block"
          />
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon] ?? LayoutGrid;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full bg-ink-950 text-gold-400 shadow-lift ring-4 ring-cream-50">
                  <Icon className="size-6" />
                  <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gold-500 font-display text-xs font-bold text-ink-950">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
