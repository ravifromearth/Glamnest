import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How GlamNest collects, uses, protects and retains your personal data — including our commitments under India's DPDP Act, 2023.",
  path: "/privacy-policy",
});

type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const SECTIONS: PolicySection[] = [
  {
    title: "What this policy covers",
    paragraphs: [
      "GlamNest (\"we\", \"us\") operates glamnest.in and the GlamNest apps, connecting customers with verified beauty professionals for at-home services. This policy explains what personal data we collect, why we collect it, how we protect it and the choices you have. It applies to customers, partner professionals and visitors to our website.",
      "By using GlamNest, you consent to the practices described here. We process personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian law.",
    ],
  },
  {
    title: "Data we collect",
    paragraphs: [
      "We collect only what we need to deliver a safe, reliable doorstep service:",
    ],
    bullets: [
      "Identity and contact details — your name, mobile number and, if you share it, your email address.",
      "Service address and location — the address where services are delivered, and approximate device location (with your permission) to confirm serviceability and help professionals navigate.",
      "Booking history and preferences — services booked, packages chosen, beautician preferences, skin/hair notes you voluntarily share so we can serve you better.",
      "Payment metadata — transaction IDs, amounts and payment status. Card, UPI and banking details are processed directly by Razorpay; we never see or store them.",
      "Communications — messages with our support team and ratings or reviews you submit after a booking.",
      "Device and usage data — IP address, browser type and pages visited, collected via cookies and similar technologies.",
    ],
  },
  {
    title: "How we use your data",
    paragraphs: [
      "Your data is used to fulfil bookings, match you with the right verified professional, process payments, send booking confirmations and reminders, provide customer support, prevent fraud, and improve our services. With your consent, we also send offers and membership benefits you're eligible for.",
      "We never sell your personal data to anyone. Aggregated, anonymised analytics (for example, most-booked services by locality) contain no personally identifiable information.",
    ],
  },
  {
    title: "Payments via Razorpay",
    paragraphs: [
      "All online payments on GlamNest are processed by Razorpay Software Pvt. Ltd., a PCI-DSS compliant payment gateway. Your card numbers, UPI credentials and banking passwords are entered directly into Razorpay's secure environment and are never transmitted to or stored on GlamNest servers. Razorpay's own privacy policy governs data you provide during payment.",
    ],
  },
  {
    title: "WhatsApp and SMS communications",
    paragraphs: [
      "We use WhatsApp Business and SMS to send booking confirmations, beautician arrival updates, payment receipts and service reminders — because that's where our customers actually are. By booking with us, you consent to receiving transactional messages on your registered number. Promotional WhatsApp messages are sent only with your opt-in and every one carries a simple opt-out. Reply STOP or tell our support team to stop promotional messages at any time; transactional booking messages will continue as they are essential to the service.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "Our website uses cookies to keep you signed in, remember your city and cart, and understand how visitors use our pages so we can improve them. You can block or delete cookies through your browser settings; core booking features may not work correctly without essential cookies. We do not use cookies to track you across unrelated third-party websites.",
    ],
  },
  {
    title: "Sharing with beauty professionals",
    paragraphs: [
      "When you confirm a booking, we share with the assigned professional only what they need to serve you: your first name, service address, contact number and the services booked. Partners are contractually bound to use this information solely for delivering your booking and to delete it afterwards. Your number is masked in our partner app wherever technically feasible.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "We retain booking and transaction records for as long as your account is active and thereafter as required by Indian tax and accounting law (generally eight years for financial records). Support conversations are retained for two years. If you delete your account, we erase or anonymise your personal data within 90 days, except where retention is legally required.",
    ],
  },
  {
    title: "Your rights under the DPDP Act, 2023",
    paragraphs: [
      "As a Data Principal under the DPDP Act, you have the right to:",
    ],
    bullets: [
      "Access a summary of the personal data we hold about you and how it is processed.",
      "Request correction of inaccurate or incomplete data, and erasure of data no longer necessary.",
      "Withdraw consent at any time, as easily as you gave it.",
      "Nominate another individual to exercise your rights in the event of death or incapacity.",
      "Raise a grievance with us, and if unresolved, escalate to the Data Protection Board of India.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "Personal data is encrypted in transit (TLS 1.2+) and at rest. Access inside GlamNest is role-based and logged; support agents see only the data needed to resolve your ticket. We conduct periodic security reviews of our systems and require the same of our processors.",
    ],
  },
  {
    title: "Grievance officer",
    paragraphs: [
      "For privacy questions, data requests or complaints, contact our Grievance Officer. We acknowledge complaints within 48 hours and resolve them within 30 days as required by law.",
    ],
    bullets: [
      "Name: Ms. Ananya Sharma, Grievance Officer",
      `Email: privacy@glamnest.in (or ${BRAND.email})`,
      `Phone: ${BRAND.phone} (${BRAND.hours})`,
      `Address: ${BRAND.address.line1}, ${BRAND.address.line2}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.pincode}`,
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy as our services or the law evolve. Material changes will be notified on this page and, for significant changes affecting your rights, via WhatsApp or SMS. Continued use of GlamNest after an update constitutes acceptance of the revised policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink-950">
        <div className="container-gn py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Legal · Your Data, Respected
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-cream-50 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/70">
              We come into your home — so we hold ourselves to a higher standard with your data
              too. Here's exactly what we collect, why, and the rights you have over it.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cream-100/40">
              Last updated: 1 July 2026 · Effective for all users
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
                Questions about your data? Write to{" "}
                <a href="mailto:privacy@glamnest.in" className="font-medium text-gold-600 underline-offset-4 hover:underline">
                  privacy@glamnest.in
                </a>{" "}
                or reach us via the{" "}
                <Link href="/contact" className="font-medium text-gold-600 underline-offset-4 hover:underline">
                  contact page
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
