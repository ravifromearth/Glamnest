import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { FAQS } from "@/lib/content";
import { buildMetadata, faqJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Everything you need to know about GlamNest — service areas in Patna, beautician verification, products, payments, rescheduling and the GlamNest Promise.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script {...jsonLdScriptProps(faqJsonLd(FAQS))} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-10 md:pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              Help Centre
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Questions, <span className="text-gold-gradient">answered honestly</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              From hygiene protocols to refunds — the eight questions we hear most, answered the
              way we'd want them answered for our own families. Can't find yours? Our support
              team replies within 30 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="container-gn pb-6 md:pb-10">
        <div className="mx-auto max-w-3xl">
          <Accordion items={[...FAQS]} />
        </div>
      </section>

      {/* Support CTA */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="mx-auto max-w-3xl rounded-3xl bg-ink-950 px-6 py-12 text-center sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
              Still Curious?
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-cream-50 sm:text-3xl">
              A real person is 30 minutes away
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream-100/70">
              Support runs {BRAND.hours.toLowerCase()} — on call, WhatsApp and email.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`https://wa.me/${BRAND.whatsapp.replace("+", "")}`}>
                <Button variant="gold" size="lg">
                  <MessageCircle /> WhatsApp Us
                </Button>
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                <Button variant="outline-light" size="lg">
                  <Phone /> {BRAND.phone}
                </Button>
              </a>
            </div>
            <p className="mt-6 text-xs text-cream-100/50">
              Or write to us from the{" "}
              <Link href="/contact" className="text-gold-400 underline-offset-4 hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
