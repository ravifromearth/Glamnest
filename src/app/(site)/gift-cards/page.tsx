import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";
import { GiftCardBuilder } from "./gift-card-builder";

export const metadata = buildMetadata({
  title: "GlamNest Gift Cards — Gift a Glow",
  description:
    "Gift salon-grade beauty at home. GlamNest gift cards from ₹500 to ₹5,000, delivered digitally in minutes and redeemable on any service across Patna.",
  path: "/gift-cards",
});

const GIFTING_STEPS = [
  {
    step: "01",
    title: "Pick a value & message",
    description: "Choose from ₹500 to ₹5,000 and add a personal note — we'll set it in gold, quite literally.",
  },
  {
    step: "02",
    title: "We deliver it in minutes",
    description: "The card lands on their WhatsApp or email as an elegant digital card with a unique code.",
  },
  {
    step: "03",
    title: "They book, we pamper",
    description: "They redeem it at checkout on any service, any slot. Unused balance stays for next time.",
  },
];

const OCCASIONS = [
  {
    emoji: "🎂",
    title: "Birthday",
    description: "Better than another mug. A birthday glow they'll actually use.",
    gradient: "from-fuchsia-100 via-blush-100 to-cream-100",
  },
  {
    emoji: "💞",
    title: "Anniversary",
    description: "A couples' spa evening at home — the most romantic logistics ever.",
    gradient: "from-rose-200 via-blush-100 to-cream-100",
  },
  {
    emoji: "💍",
    title: "Wedding",
    description: "For brides, grooms and exhausted wedding planners alike.",
    gradient: "from-amber-100 via-cream-100 to-cream-50",
  },
  {
    emoji: "🌸",
    title: "Thank You",
    description: "For mothers, mentors and the friend who always shows up.",
    gradient: "from-emerald-100 via-cream-100 to-cream-50",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-10 md:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Gift Cards
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Gift a glow, <span className="text-gold-gradient">not another gadget</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              The one gift that's never the wrong size: salon-grade pampering, delivered to their
              home whenever they want it.
            </p>
          </div>
        </div>
      </section>

      {/* Card builder */}
      <section className="container-gn pb-14 md:pb-20">
        <GiftCardBuilder />
      </section>

      {/* How gifting works */}
      <section className="section-gn bg-cream-100/60">
        <div className="container-gn">
          <SectionHeading
            eyebrow="How Gifting Works"
            title="From your heart to their doorstep in three steps"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {GIFTING_STEPS.map((step) => (
              <div key={step.step} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/6 shadow-soft">
                <p className="font-display text-4xl font-bold text-gold-500/30">{step.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="For Every Occasion"
            title="Some moments deserve more than a message"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OCCASIONS.map((occasion) => (
              <div
                key={occasion.title}
                className="overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${occasion.gradient}`}>
                  <span className="text-5xl" aria-hidden>
                    {occasion.emoji}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-ink-950">{occasion.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{occasion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms note */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="mx-auto max-w-3xl rounded-3xl bg-cream-100 p-7 ring-1 ring-ink-950/5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              The Small Print
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              Gift cards are valid for 12 months from purchase and redeemable on any GlamNest
              service in serviceable areas. Balances can be used across multiple bookings. Cards
              are non-refundable and cannot be exchanged for cash. Full details in our{" "}
              <Link href="/terms" className="font-medium text-gold-600 underline-offset-4 hover:underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
