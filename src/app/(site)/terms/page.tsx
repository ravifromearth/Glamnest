import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern GlamNest bookings — cancellations and rescheduling, refunds, the GlamNest Promise redo policy, partner conduct and liability.",
  path: "/terms",
});

type TermsSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const SECTIONS: TermsSection[] = [
  {
    title: "Acceptance of these terms",
    paragraphs: [
      "These Terms & Conditions form a binding agreement between you and GlamNest (\"we\", \"us\") whenever you browse glamnest.in, use our apps or book a service. If you do not agree with any part of these terms, please do not use the platform. We may update these terms from time to time; the version published on this page at the time of your booking applies to that booking.",
      "GlamNest is a marketplace: we connect you with independent, verified beauty professionals (\"partners\") and stand behind every booking with the GlamNest Promise described below.",
    ],
  },
  {
    title: "Bookings",
    paragraphs: [
      "A booking is confirmed once you receive a confirmation with a booking ID on WhatsApp, SMS or email. Prices shown at checkout are final and inclusive of product, professional and travel costs — no doorstep surprises.",
    ],
    bullets: [
      "Provide an accurate service address and ensure someone 18+ is present during the appointment.",
      "Slots are reserved for your address; a partner may wait up to 15 minutes past the slot start, after which the booking may be treated as a no-show.",
      "For services requiring patch tests (e.g. hair colour, sensitive-skin facials), request the free patch test at least 48 hours ahead. Declining one is at your own risk.",
      "Services are for personal, non-commercial use. Group bookings (3+ people) should be placed as such so we can staff them correctly.",
    ],
  },
  {
    title: "Cancellation & rescheduling",
    paragraphs: [
      "Plans change — especially before weddings. Our policy is simple:",
    ],
    bullets: [
      "Reschedule free of charge any time up to 2 hours before your slot, from the app, website or by calling support.",
      "Cancel up to 2 hours before your slot for a full refund to your original payment method or GlamNest wallet — your choice.",
      "Cancellations within 2 hours of the slot, or no-shows, may attract a fee of up to 50% of the booking value, since the partner has already committed the time and prepared the kit.",
      "If a partner cancels or we cannot serve your slot, you receive a full refund plus a goodwill credit — automatically.",
    ],
  },
  {
    title: "Refunds",
    paragraphs: [
      "Eligible refunds are initiated within 24 hours of approval. Amounts paid online are returned to the original payment method within 5–7 working days (timelines depend on your bank and Razorpay processing). Wallet refunds are instant. Pay-after-service bookings that qualify for a refund are settled via UPI transfer or wallet credit.",
    ],
  },
  {
    title: "The GlamNest Promise (redo policy)",
    paragraphs: [
      "Every booking is backed by the GlamNest Promise. If a service falls short of the standard you were promised, report it within 24 hours of completion via the app, WhatsApp or support line.",
    ],
    bullets: [
      "We will first offer a free redo of the affected service by a senior professional, scheduled at your convenience within 72 hours.",
      "If a redo is not feasible or you prefer otherwise, we will issue a partial or full refund after a fair review, typically within 48 hours.",
      "The Promise covers service quality and hygiene failures. It does not cover changes of mind about a chosen style or look communicated and confirmed before the service.",
      "Claims made after 24 hours are reviewed case by case — we're reasonable people; talk to us.",
    ],
  },
  {
    title: "Partner conduct & your conduct",
    paragraphs: [
      "Every GlamNest partner completes identity verification, police-record checks, skill certification and monthly hygiene audits. Partners must open sealed kits in front of you, use single-use consumables where applicable, and behave with complete professionalism. Any breach can be reported and leads to immediate investigation, suspension or permanent removal.",
      "In turn, we ask customers to treat partners with dignity and provide a safe working environment. Harassment, abuse or unsafe conditions result in immediate service termination without refund and, where warranted, reporting to authorities. Our partners have an SOS line active during every appointment.",
    ],
  },
  {
    title: "Memberships, packages & gift cards",
    paragraphs: [
      "Membership fees are charged in advance and are non-refundable once a membership benefit has been used in the billing period. Beauty packages must be consumed within their stated validity. Gift cards are valid for 12 months from purchase, are non-refundable and cannot be redeemed for cash; unused balances remain available across multiple bookings until expiry.",
    ],
  },
  {
    title: "Liability",
    paragraphs: [
      "We carry insurance for accidental damage during service delivery and our partners are trained in safety protocols. To the maximum extent permitted by law, GlamNest's aggregate liability for any claim arising from a booking is limited to the value of that booking. We are not liable for indirect or consequential losses, or for reactions arising from conditions or allergies not disclosed to us before the service. This does not limit any rights you have under the Consumer Protection Act, 2019 that cannot be limited by contract.",
    ],
  },
  {
    title: "Intellectual property & platform use",
    paragraphs: [
      "All content on the platform — the GlamNest name, logo, text, design and imagery — belongs to us or our licensors. You may not scrape, copy or reuse it commercially without written permission. You agree not to misuse the platform, attempt unauthorised access, or book services with fraudulent payment instruments.",
    ],
  },
  {
    title: "Governing law & jurisdiction",
    paragraphs: [
      "These terms are governed by the laws of India. Any dispute arising out of or relating to the platform or a booking is subject to the exclusive jurisdiction of the competent courts at Patna, Bihar. Before litigation, we encourage you to raise the matter with our support team and Grievance Officer — the vast majority of issues are resolved within 48 hours.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "For anything relating to these terms:",
    ],
    bullets: [
      `Email: ${BRAND.email}`,
      `Phone: ${BRAND.phone} (${BRAND.hours})`,
      `Registered office: ${BRAND.address.line1}, ${BRAND.address.line2}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.pincode}`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink-950">
        <div className="container-gn py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Legal · The Fine Print, Made Readable
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-cream-50 sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/70">
              The promises we make to you, and the few things we ask in return. Written to be
              read, not skimmed.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cream-100/40">
              Last updated: 1 July 2026 · Governed by the laws of India
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="mx-auto max-w-3xl">
            {SECTIONS.map((section, i) => (
              <section key={section.title} className={i === 0 ? "" : "mt-14"}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl font-bold leading-tight text-ink-950 sm:text-[1.75rem]">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4 border-l border-gold-500/30 pl-[2.15rem]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-4 text-[0.95rem] leading-relaxed text-ink-700 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 40)} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-700">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <div className="mt-16 rounded-3xl bg-cream-100 p-7 text-center ring-1 ring-ink-950/5">
              <p className="text-sm leading-relaxed text-ink-600">
                See also our{" "}
                <Link href="/privacy-policy" className="font-medium text-gold-600 underline-offset-4 hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/faq" className="font-medium text-gold-600 underline-offset-4 hover:underline">
                  FAQs
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
