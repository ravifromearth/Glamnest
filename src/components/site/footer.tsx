import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "./logo";
import { BRAND, CITIES } from "@/lib/brand";
import { CATEGORIES } from "@/lib/catalog";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/careers" },
  { label: "Become a Partner", href: "/become-a-partner" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const EXPLORE_LINKS = [
  { label: "All Services", href: "/services" },
  { label: "Beauty Packages", href: "/packages" },
  { label: "Membership Plans", href: "/membership" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "FAQ", href: "/faq" },
  { label: "Book a Service", href: "/booking" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-100">
      {/* Top */}
      <div className="container-gn grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo dark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/60">
            {BRAND.name} brings verified beauty professionals, sealed hygiene kits and salon-grade
            services to your doorstep. Premium beauty, honest prices, zero travel.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-cream-100/70">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-400">
              <Phone className="size-4 text-gold-500" /> {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-400">
              <Mail className="size-4 text-gold-500" /> {BRAND.email}
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
              {BRAND.address.line1}, {BRAND.address.line2}, {BRAND.address.city} {BRAND.address.pincode}
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, href: BRAND.social.instagram, label: "Instagram" },
              { icon: Facebook, href: BRAND.social.facebook, label: "Facebook" },
              { icon: Youtube, href: BRAND.social.youtube, label: "YouTube" },
              { icon: Twitter, href: BRAND.social.twitter, label: "X (Twitter)" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-cream-100/70 transition-all hover:border-gold-500 hover:text-gold-400"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/services/${cat.slug}`} className="text-cream-100/60 transition-colors hover:text-gold-400">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">Company</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream-100/60 transition-colors hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream-100/60 transition-colors hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cities strip — local SEO internal links */}
      <div className="border-t border-white/8">
        <div className="container-gn py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/40">
            Beauty at home across India
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/beauty-at-home-${city.slug}`}
                className="text-cream-100/55 transition-colors hover:text-gold-400"
              >
                Beauty at Home {city.name}
                {city.status === "coming-soon" && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-wide text-gold-600">soon</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <div className="container-gn flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-100/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name} Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-gold-400">
                {l.label}
              </Link>
            ))}
            <span className="hidden text-cream-100/25 sm:inline">|</span>
            <span className="font-display italic text-gold-500/80">{BRAND.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
