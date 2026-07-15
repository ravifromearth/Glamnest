import { BadgeCheck, CalendarClock, GraduationCap, IndianRupee, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";
import { PartnerForm } from "./partner-form";

export const metadata = buildMetadata({
  title: "Become a GlamNest Partner — Earn 2x with Flexible Hours",
  description:
    "Join 350+ verified beauty professionals earning ₹25,000–₹60,000 a month on their own schedule. Free training, kits and insurance. Apply in 60 seconds.",
  path: "/become-a-partner",
});

const BENEFITS = [
  {
    icon: IndianRupee,
    title: "Earn up to 2x more",
    description: "Keep the majority of every booking. Our partners average 2.3x their previous salon salary.",
  },
  {
    icon: CalendarClock,
    title: "Your hours, your areas",
    description: "Set your own availability and choose the localities you serve. School pickup stays sacred.",
  },
  {
    icon: GraduationCap,
    title: "Free certification",
    description: "Skill upgrades and hygiene certification at the GlamNest Academy — at zero cost, forever.",
  },
  {
    icon: Sparkles,
    title: "Premium kits provided",
    description: "Sealed, branded product kits (O3+, Rica, L'Oréal) supplied and replenished by us.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance & safety",
    description: "Accident insurance, verified-customer bookings and an SOS line during every appointment.",
  },
  {
    icon: Wallet,
    title: "Weekly payouts",
    description: "Earnings land in your bank account every Monday. Track every rupee in the partner app.",
  },
];

const ONBOARDING_STEPS = [
  {
    step: "01",
    title: "Apply",
    description: "Fill the 60-second form below with your city, expertise and experience.",
  },
  {
    step: "02",
    title: "KYC & Verification",
    description: "ID, address and police verification — completed within 3 working days.",
  },
  {
    step: "03",
    title: "Training & Certification",
    description: "A 5-day skill and hygiene program at the GlamNest Academy, fully free.",
  },
  {
    step: "04",
    title: "Start Earning",
    description: "Go live in the partner app, accept bookings and get paid every week.",
  },
];

const PARTNER_FAQS = [
  {
    question: "How much can I really earn with GlamNest?",
    answer:
      "Active partners in Patna earn between ₹25,000 and ₹60,000 per month depending on services offered, hours worked and ratings. Bridal specialists and keratin-certified partners sit at the top of that band. You keep the majority share of every booking, and payouts arrive weekly.",
  },
  {
    question: "Do I need my own products or equipment?",
    answer:
      "No. GlamNest supplies sealed, premium branded kits (O3+, Rica, L'Oréal, Cadiveu and more) and replenishes them as you complete bookings. You only bring your skill and your own basic tools if you prefer them — sterilised to our standard.",
  },
  {
    question: "Is there any joining fee or deposit?",
    answer:
      "Zero. Application, verification, training and certification at the GlamNest Academy are completely free. We earn only when you earn.",
  },
  {
    question: "Can I work part-time or only on weekends?",
    answer:
      "Yes. You control your calendar in the partner app — mark yourself available for mornings, weekends or full days, and change it anytime. Many of our partners work 4–6 hours a day around family commitments.",
  },
  {
    question: "What if I'm experienced but not formally certified?",
    answer:
      "Most of our best partners learned on the salon floor, not in a classroom. Our assessment is practical: demonstrate your skill at the Academy and we certify you ourselves. If there are gaps, the free 5-day training covers them.",
  },
];

export default function BecomePartnerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
        <div className="container-gn section-gn">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="gold" className="mb-5">
                Now onboarding in Patna & beyond
              </Badge>
              <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-cream-50 sm:text-5xl md:text-6xl">
                Your skill. Your hours. <span className="text-gold-gradient">2x the earnings.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/70 sm:text-lg">
                Join 350+ beauty professionals who left fixed salon shifts behind. Serve customers
                at their homes, set your own schedule and take home ₹25,000–₹60,000 a month.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  ["350+", "Active partners"],
                  ["2.3x", "Avg. earnings jump"],
                  ["₹0", "Joining fee"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-bold text-gold-400">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream-100/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="apply">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Why Partners Stay"
            title="Built around your life, not a salon roster"
            description="Everything a great salon gave you — minus the 11-hour shifts and the tiny share of your own work."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-ink-950/8 bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-600">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-950">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="section-gn bg-cream-100/60">
        <div className="container-gn">
          <SectionHeading
            eyebrow="How It Works"
            title="From application to first payout in about a week"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ONBOARDING_STEPS.map((step, i) => (
              <div key={step.step} className="relative rounded-3xl bg-white p-7 ring-1 ring-ink-950/6 shadow-soft">
                <p className="font-display text-4xl font-bold text-gold-500/30">{step.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
                {i < ONBOARDING_STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 text-ink-950 lg:flex" aria-hidden>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings band */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="overflow-hidden rounded-3xl bg-ink-950">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
                  Earnings Potential
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
                  ₹25,000 – ₹60,000 <span className="text-cream-100/60">/ month</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/70">
                  Your band depends on the services you're certified in, the hours you open and
                  your ratings. Bridal and keratin specialists consistently earn at the top.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Waxing & cleanup focus · ~5 hrs/day", value: "₹25k–₹32k", width: "w-[45%]" },
                  { label: "Facials + hair · ~6 hrs/day", value: "₹35k–₹45k", width: "w-[70%]" },
                  { label: "Bridal & keratin certified · peak season", value: "₹50k–₹60k", width: "w-full" },
                ].map((band) => (
                  <div key={band.label}>
                    <div className="flex items-center justify-between gap-4 text-xs text-cream-100/70">
                      <span>{band.label}</span>
                      <span className="font-semibold text-gold-400">{band.value}</span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-white/10">
                      <div className={`h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 ${band.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Partner FAQs"
            title="Questions we hear at every Academy batch"
          />
          <div className="mx-auto max-w-3xl">
            <Accordion items={PARTNER_FAQS} />
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-cream-100 to-cream-50 p-8 text-center ring-1 ring-ink-950/5">
              <BadgeCheck className="mx-auto size-8 text-gold-600" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink-950">
                Ready when you are
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
                Scroll up to apply in 60 seconds, or drop by the GlamNest Academy at Maurya Lok
                Complex, Patna — chai's on us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
