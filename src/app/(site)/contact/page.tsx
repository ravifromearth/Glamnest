import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { BRAND } from "@/lib/brand";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata = buildMetadata({
  title: "Contact GlamNest — We Reply Within 30 Minutes",
  description:
    "Call, WhatsApp or email the GlamNest team for booking help, partnerships or feedback. Support hours 7 AM – 9 PM, all 7 days.",
  path: "/contact",
});

const CHANNELS = [
  {
    icon: Phone,
    title: "Call us",
    value: BRAND.phone,
    detail: "For urgent booking help and same-day changes.",
    href: `tel:${BRAND.phone.replace(/\s/g, "")}`,
    cta: "Call now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: BRAND.phone,
    detail: "Fastest replies — share screenshots, get slot links.",
    href: `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`,
    cta: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    value: BRAND.email,
    detail: "For partnerships, invoices and anything detailed.",
    href: `mailto:${BRAND.email}`,
    cta: "Write to us",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-10 md:pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Contact Us
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              We're a message away, <span className="text-gold-gradient">always</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              Booking help, partnership ideas or honest feedback — every message gets a human
              reply within 30 minutes, 7 AM to 9 PM.
            </p>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="container-gn">
        <div className="grid gap-6 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="group rounded-3xl border border-ink-950/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-600">
                <channel.icon className="size-6" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">{channel.title}</h2>
              <p className="mt-1 text-sm font-medium text-ink-800">{channel.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{channel.detail}</p>
              <span className="mt-4 inline-block text-sm font-medium text-gold-600 transition-colors group-hover:text-gold-700">
                {channel.cta} →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Form + office details */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <SectionHeading
                align="left"
                eyebrow="Visit Us"
                title="Our nest in Patna"
                className="mb-6 md:mb-8"
              />
              <div className="space-y-5">
                <div className="flex gap-4 rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-display text-base font-semibold text-ink-950">Registered office</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                      {BRAND.address.line1}
                      <br />
                      {BRAND.address.line2}
                      <br />
                      {BRAND.address.city}, {BRAND.address.state} {BRAND.address.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
                  <Clock className="mt-0.5 size-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-display text-base font-semibold text-ink-950">Support hours</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{BRAND.hours}</p>
                    <p className="mt-1 text-xs text-ink-400">
                      Bookings can be placed online 24×7 — we confirm first thing next morning.
                    </p>
                  </div>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-cream-100 to-cream-50 p-6 ring-1 ring-ink-950/5">
                  <p className="font-display text-base font-semibold text-ink-950">
                    Prefer to walk in?
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                    Visit us at Satyam Technology Bhawan, Digha — weekdays 11 AM – 5 PM.
                    No appointment needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
