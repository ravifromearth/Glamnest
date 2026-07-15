import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { BRAND, CITIES } from "@/lib/brand";
import { STATS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About GlamNest — Beauty Comes Home",
  description:
    "Founded in Patna in 2025, GlamNest brings verified beauty professionals to your doorstep. Read our story, values and where we're headed next.",
  path: "/about",
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust Before Glamour",
    description:
      "Every professional is ID-verified, police-checked and hygiene-audited monthly. Beauty means nothing without safety at your doorstep.",
  },
  {
    icon: Sparkles,
    title: "Salon-Grade, Always",
    description:
      "Sealed kits, premium branded products and certified artistry — the same standard a five-star salon would hold itself to, in your living room.",
  },
  {
    icon: Users,
    title: "Partners, Not Workers",
    description:
      "Our beauticians set their own hours and keep the majority of every booking. When they thrive, every customer feels it.",
  },
  {
    icon: Heart,
    title: "Bharat-First",
    description:
      "We started in Patna, not a metro — because premium self-care shouldn't require living in one. Tier-2 India deserves the best, first.",
  },
];

const CULTURE_POINTS = [
  {
    emoji: "🌱",
    title: "Small team, big ownership",
    description: "Everyone at GlamNest — from engineers to trainers — spends a day each month shadowing a beautician on real bookings.",
  },
  {
    emoji: "🎓",
    title: "The GlamNest Academy",
    description: "Our in-house training floor in Maurya Lok certifies every partner on skill, hygiene and etiquette before their first booking.",
  },
  {
    emoji: "🤝",
    title: "Customer-obsessed, kindly",
    description: "Support replies within 30 minutes, 7 AM to 9 PM. Every complaint is read aloud in our Monday all-hands — no exceptions.",
  },
];

export default function AboutPage() {
  const liveCities = CITIES.filter((c) => c.status === "live");
  const comingCities = CITIES.filter((c) => c.status === "coming-soon");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Our Story · Est. 2025, Patna
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Beauty Comes <span className="text-gold-gradient">Home</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              GlamNest began with a simple frustration: in a city of two million people, a great
              salon experience still meant traffic, waiting rooms and doubtful hygiene. So we
              flipped the model — and brought the salon to you.
            </p>
          </div>
        </div>
      </section>

      {/* Founder-style narrative */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-gradient-to-br from-rose-200 via-blush-100 to-cream-100 shadow-soft">
                <span className="text-8xl" aria-hidden>
                  🏡
                </span>
              </div>
              <div className="glass absolute -bottom-5 left-5 rounded-2xl px-5 py-4 shadow-lift">
                <p className="font-display text-lg font-semibold text-ink-950">Maurya Lok, Patna</p>
                <p className="text-xs text-ink-600">Where it all started, 2025</p>
              </div>
            </div>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Why We Exist"
                title="Built in Patna, for every home that deserves better"
                className="mb-6 md:mb-8"
              />
              <div className="space-y-4 text-base leading-relaxed text-ink-600">
                <p>
                  In early 2025, our founding team watched a bride's family spend her wedding
                  morning shuttling between three salons across Patna — while her mehendi artist
                  waited at a fourth. The city had talent everywhere, but no way to bring it home
                  reliably, hygienically and on time.
                </p>
                <p>
                  We started with twelve beauticians, one training room in Maurya Lok Complex and
                  an obsessive rule: every kit sealed, every professional verified, every booking
                  backed by a promise. Word travelled the way it does in Patna — from one
                  drawing room to the next.
                </p>
                <p>
                  Today, {STATS[2].value.toLowerCase()} verified professionals serve{" "}
                  {STATS[3].value.replace("+", "").trim()}+ localities across the city, and we're
                  packing our kits for the rest of Bihar and beyond. The mission hasn't changed
                  since day one: <em className="font-medium text-ink-800">{BRAND.tagline}.</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink-950">
        <div className="container-gn py-14 md:py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-gold-400 sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream-100/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Four values, non-negotiable"
            description="They shape every hire, every training module and every booking we deliver."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-600">
                  <value.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion map */}
      <section className="section-gn bg-cream-100/60">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Where We Are"
            title="One city live. Seven warming up."
            description="We go deep before we go wide — every new city launches with its own trained, verified partner network."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...liveCities, ...comingCities].map((city) => (
              <div
                key={city.slug}
                className={
                  city.status === "live"
                    ? "relative overflow-hidden rounded-3xl bg-ink-950 p-6 text-cream-50 shadow-lift"
                    : "rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={
                        city.status === "live"
                          ? "font-display text-xl font-semibold text-cream-50"
                          : "font-display text-xl font-semibold text-ink-950"
                      }
                    >
                      {city.name}
                    </p>
                    <p
                      className={
                        city.status === "live" ? "mt-1 text-xs text-cream-100/60" : "mt-1 text-xs text-ink-500"
                      }
                    >
                      {city.state}
                    </p>
                  </div>
                  {city.status === "live" ? (
                    <Badge variant="gold">
                      <span className="size-1.5 rounded-full bg-gold-500" aria-hidden /> Live
                    </Badge>
                  ) : (
                    <Badge variant="cream">Coming soon</Badge>
                  )}
                </div>
                <div
                  className={
                    city.status === "live"
                      ? "mt-5 flex items-center gap-1.5 text-xs text-gold-400"
                      : "mt-5 flex items-center gap-1.5 text-xs text-ink-400"
                  }
                >
                  <MapPin className="size-3.5" />
                  {city.status === "live" ? "40+ localities served" : "Partner onboarding underway"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team culture */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Inside GlamNest"
            title="A team that smells faintly of rose water"
            description="We're beauticians, trainers, engineers and city-launchers — most of us from the towns we serve."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {CULTURE_POINTS.map((point) => (
              <div key={point.title} className="rounded-3xl bg-gradient-to-br from-cream-100 to-cream-50 p-7 ring-1 ring-ink-950/5">
                <span className="text-4xl" aria-hidden>
                  {point.emoji}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Be Part of the Story
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
              Your home is the next chapter
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/70 sm:text-base">
              Book a verified professional today and see why thousands across Patna stopped going
              to the salon.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking">
                <Button variant="gold" size="xl">
                  Book a Service
                </Button>
              </Link>
              <Link href="/become-a-partner">
                <Button variant="outline-light" size="xl">
                  Join as a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
