import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { buildMetadata } from "@/lib/seo";
import { MembershipPlans } from "./membership-plans";

export const metadata = buildMetadata({
  title: "GlamNest Membership — Glow, Luxe & Royale Plans",
  description:
    "Save up to 20% on every service with GlamNest membership. Free monthly facials, priority slots and a dedicated relationship manager from ₹299/month.",
  path: "/membership",
});

const COMPARISON: { perk: string; plans: [boolean | string, boolean | string, boolean | string] }[] = [
  { perk: "Discount on all services", plans: ["10%", "15%", "20%"] },
  { perk: "Free threading with every booking", plans: [true, true, true] },
  { perk: "Free monthly service", plans: [false, "Express Cleanup", "Glow Facial"] },
  { perk: "Free add-on per booking (₹199)", plans: [false, true, true] },
  { perk: "Priority & same-day slots", plans: [false, true, true] },
  { perk: "Dedicated relationship manager", plans: [false, true, true] },
  { perk: "Spa upgrade twice a year", plans: [false, false, true] },
  { perk: "Celebrity artist priority for events", plans: [false, false, true] },
  { perk: "Birthday pamper session", plans: [false, false, true] },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick your plan",
    description: "Glow for the monthly ritual, Luxe for regulars, Royale for the full experience. Switch or cancel anytime.",
  },
  {
    step: "02",
    title: "Benefits apply automatically",
    description: "Discounts, free services and priority slots appear at checkout the moment your membership is active.",
  },
  {
    step: "03",
    title: "Glow on repeat",
    description: "Use your free monthly service, stack member offers and let your relationship manager handle the rest.",
  },
];

const MEMBER_FAQS = [
  {
    question: "Can I cancel my membership anytime?",
    answer:
      "Yes. Monthly plans can be cancelled anytime and stay active till the end of the billing period. Annual plans can be cancelled within 15 days for a full refund if no benefit has been used; after that, they run until the year ends.",
  },
  {
    question: "Do unused free services carry forward?",
    answer:
      "Free monthly services (like the Luxe plan's Express Cleanup) are use-it-or-lose-it within the calendar month — that's how we keep prices this low. Discounts and priority slots, of course, never expire.",
  },
  {
    question: "Can my family use my membership?",
    answer:
      "Membership benefits apply to bookings made from your account at your saved addresses — so services for your mother, sister or spouse at home are covered. The free monthly service is limited to one person per month.",
  },
  {
    question: "Does membership stack with coupons and packages?",
    answer:
      "Your member discount applies to standard service prices and add-ons. Beauty packages and promotional coupons are already discounted, so the better of the two prices applies automatically at checkout — always in your favour.",
  },
];

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-10 md:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              GlamNest Membership
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Self-care, on a <span className="text-gold-gradient">standing invitation</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              Save up to 20% on every booking, unlock free monthly services and skip the queue
              with priority slots — from less than the cost of one facial a year.
            </p>
          </div>
        </div>
      </section>

      {/* Plans with toggle */}
      <section className="container-gn pb-6 md:pb-10">
        <MembershipPlans />
      </section>

      {/* Perks comparison */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading
            eyebrow="Compare Plans"
            title="Every perk, side by side"
          />
          <div className="mx-auto max-w-4xl overflow-x-auto rounded-3xl border border-ink-950/8 bg-white shadow-soft">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-950/8">
                  <th className="p-5 font-medium text-ink-500">Perk</th>
                  <th className="p-5 font-display text-base font-semibold text-ink-950">Glow</th>
                  <th className="bg-gold-500/8 p-5 font-display text-base font-semibold text-ink-950">
                    Luxe <span className="ml-1 align-middle text-[0.65rem] font-sans font-semibold uppercase tracking-wider text-gold-600">Most loved</span>
                  </th>
                  <th className="p-5 font-display text-base font-semibold text-ink-950">Royale</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.perk} className="border-b border-ink-950/6 last:border-0">
                    <td className="p-5 text-ink-700">{row.perk}</td>
                    {row.plans.map((value, planIndex) => (
                      <td
                        key={`${row.perk}-${planIndex}`}
                        className={planIndex === 1 ? "bg-gold-500/8 p-5" : "p-5"}
                      >
                        {value === true ? (
                          <Check className="size-4.5 text-gold-600" aria-label="Included" />
                        ) : value === false ? (
                          <Minus className="size-4 text-ink-300" aria-label="Not included" />
                        ) : (
                          <span className="font-medium text-ink-950">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-gn bg-cream-100/60">
        <div className="container-gn">
          <SectionHeading eyebrow="How It Works" title="Three steps to member status" />
          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/6 shadow-soft">
                <p className="font-display text-4xl font-bold text-gold-500/30">{step.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member FAQ */}
      <section className="section-gn">
        <div className="container-gn">
          <SectionHeading eyebrow="Member FAQs" title="Before you commit" />
          <div className="mx-auto max-w-3xl">
            <Accordion items={MEMBER_FAQS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Join the Inner Circle
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
              One booking usually pays for the whole month
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/70 sm:text-base">
              A Luxe member booking a Glow Facial and a mani-pedi saves more than the plan costs.
              The maths simply works.
            </p>
            <div className="mt-8">
              <Link href="/booking">
                <Button variant="gold" size="xl">
                  Start with a Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
