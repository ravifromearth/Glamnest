import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at GlamNest",
  description:
    "Help us bring premium beauty services to every home in Bharat. Open roles in operations, training, growth, engineering and customer delight — based in Patna.",
  path: "/careers",
});

const OPEN_ROLES = [
  {
    title: "Operations Manager",
    location: "Patna",
    type: "Full-time",
    team: "Operations",
    description:
      "Own the daily heartbeat of the marketplace — partner allocation, slot utilisation and on-time arrival rates across 40+ localities.",
  },
  {
    title: "Beautician Trainer",
    location: "Patna · Academy",
    type: "Full-time",
    team: "Training",
    description:
      "Run skill and hygiene certification at the GlamNest Academy. Senior salon experience in makeup or skin is a must; teaching heart, mandatory.",
  },
  {
    title: "Growth Marketer",
    location: "Patna / Hybrid",
    type: "Full-time",
    team: "Growth",
    description:
      "Own performance, referral and local WhatsApp-first campaigns. You'll make GlamNest the first name whispered at every kitty party in town.",
  },
  {
    title: "Full-Stack Engineer",
    location: "Remote (IST)",
    type: "Full-time",
    team: "Engineering",
    description:
      "Next.js, TypeScript and Postgres across booking, partner and admin surfaces. Small team, huge ownership, shipped-to-production weekly.",
  },
  {
    title: "Customer Delight Associate",
    location: "Patna",
    type: "Full-time",
    team: "Support",
    description:
      "Be the calm, kind voice behind our 30-minute response promise — resolving reschedules, redos and the occasional bridal-morning emergency.",
  },
  {
    title: "City Launcher",
    location: "Muzaffarpur / Gaya",
    type: "Full-time",
    team: "Expansion",
    description:
      "Parachute into our next city, recruit the first 50 partners, set up training and run the launch playbook end to end. Founder energy required.",
  },
];

const PERKS = [
  { emoji: "💰", title: "Meaningful ESOPs", description: "Every full-time employee owns a piece of GlamNest, from day one." },
  { emoji: "🩺", title: "Family health cover", description: "Insurance for you, your spouse, kids and parents — because Bharat runs on family." },
  { emoji: "✨", title: "Monthly glow budget", description: "Free GlamNest services every month. Yes, the spa counts as research." },
  { emoji: "📚", title: "Learning allowance", description: "Courses, books and conferences on us — grow faster than the company does." },
  { emoji: "🏡", title: "Flexible hours", description: "We measure outcomes, not hours at a desk. Most of us do school pickups." },
  { emoji: "🚀", title: "Ground-floor impact", description: "Ship something on Monday, hear a customer mention it by Friday." },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero / culture pitch */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Careers
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Do the best work of your life, <span className="text-gold-gradient">from Patna</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              We're building India's most trusted beauty-at-home marketplace — starting where the
              big players never bothered to look. Small team, real ownership, customers you'll
              meet at the sabzi mandi.
            </p>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Open Roles"
            title="Six seats at the table"
            description="Each role reports close to the founders and owns a metric that matters."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OPEN_ROLES.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col rounded-3xl border border-ink-950/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="gold">{role.team}</Badge>
                  <Briefcase className="size-5 text-ink-300" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">{role.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{role.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-950/6 pt-4 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-gold-600" /> {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-gold-600" /> {role.type}
                  </span>
                </div>
                <a
                  href={`mailto:careers@glamnest.in?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 transition-colors group-hover:text-gold-700"
                >
                  Apply for this role <ArrowRight className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-gn bg-cream-100/60">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Perks & Care"
            title="We take care of the people who take care of people"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk) => (
              <div key={perk.title} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/6 shadow-soft">
                <span className="text-3xl" aria-hidden>
                  {perk.emoji}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Don't See Your Role?
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
              Exceptional people make their own openings
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/70 sm:text-base">
              Tell us what you'd own and why it matters. A crisp email beats a fancy resume, every
              time.
            </p>
            <div className="mt-8">
              <a href="mailto:careers@glamnest.in?subject=Hello%20GlamNest">
                <Button variant="gold" size="xl">
                  Mail careers@glamnest.in
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
