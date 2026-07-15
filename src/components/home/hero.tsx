"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-cream-50">
      {/* Ambient gold glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] size-[480px] rounded-full bg-gold-500/14 blur-[120px]" />
        <div className="absolute bottom-[-30%] left-[-8%] size-[420px] rounded-full bg-blush-500/12 blur-[110px]" />
        <div className="absolute left-1/3 top-1/4 size-64 rounded-full bg-gold-500/8 blur-[90px]" />
      </div>

      <div className="container-gn relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        {/* Copy */}
        <div className="max-w-2xl">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-300">
              <MapPin className="size-3.5" />
              Now live in Patna · {BRAND.tagline}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            Premium Beauty Services{" "}
            <span className="text-gold-gradient">At Your Doorstep</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-cream-100/70 md:text-lg"
          >
            {BRAND.subheadline} Verified professionals, sealed hygiene kits and salon-grade
            products — without stepping out of home.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/booking">
              <Button variant="gold" size="xl" className="w-full sm:w-auto">
                Book Now <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline-light" size="xl" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-cream-100/60"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-gold-500 text-gold-500" />
              <strong className="text-cream-50">4.8</strong> from 6,200+ reviews
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-gold-500" /> 350+ verified professionals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-gold-500" /> GlamNest hygiene promise
            </span>
          </motion.div>
        </div>

        {/* Visual composition — pure CSS, no imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block"
          aria-hidden
        >
          {/* Main portrait panel */}
          <div className="absolute inset-x-6 top-0 bottom-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush-300/90 via-blush-100 to-cream-100 shadow-lift ring-1 ring-white/20">
            <div className="absolute inset-0 bg-dots opacity-40" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10">
              <span className="text-[7rem] leading-none drop-shadow-md">💆‍♀️</span>
            </div>
            <div className="absolute left-6 top-6 rounded-2xl bg-white/80 px-4 py-2.5 backdrop-blur">
              <p className="font-display text-sm font-semibold text-ink-950">Signature Glow Facial</p>
              <p className="text-xs text-ink-500">75 min · at your home</p>
            </div>
          </div>

          {/* Floating booking card */}
          <div className="glass absolute -left-2 bottom-24 w-56 animate-float rounded-3xl p-4 shadow-lift">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-ink-950 font-display text-xs font-bold text-gold-400 ring-2 ring-gold-500/40">
                SD
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-950">Sunita is on the way</p>
                <p className="text-xs text-ink-500">Arriving 10:00 AM · 2.1 km</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-950/10">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-gold-600 to-gold-400" />
            </div>
          </div>

          {/* Floating rating chip */}
          <div className="glass absolute -right-3 top-16 animate-float rounded-2xl px-4 py-3 shadow-lift [animation-delay:1.2s]">
            <p className="flex items-center gap-1 text-sm font-bold text-ink-950">
              <Sparkles className="size-4 text-gold-600" /> 25,000+
            </p>
            <p className="text-xs text-ink-500">services delivered</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom curve into cream */}
      <div className="h-6 rounded-t-[2.5rem] bg-cream-50" aria-hidden />
    </section>
  );
}
