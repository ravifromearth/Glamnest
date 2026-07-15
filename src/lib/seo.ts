import type { Metadata } from "next";
import { BRAND, CITIES } from "./brand";

/** Build consistent page metadata with Open Graph + canonical URLs. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${BRAND.domain}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** LocalBusiness (BeautySalon) JSON-LD for local SEO. */
export function localBusinessJsonLd(citySlug?: string) {
  const city = CITIES.find((c) => c.slug === citySlug) ?? CITIES[0];
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: BRAND.name,
    slogan: BRAND.tagline,
    description: `${BRAND.name} brings verified beauty professionals to your home in ${city.name} — bridal makeup, facials, hair, spa, waxing and more.`,
    url: BRAND.domain,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BRAND.address.line1}, ${BRAND.address.line2}`,
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: BRAND.address.pincode,
      addressCountry: BRAND.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.latitude,
      longitude: city.longitude,
    },
    areaServed: CITIES.filter((c) => c.status === "live").map((c) => ({
      "@type": "City",
      name: c.name,
    })),
    openingHours: "Mo-Su 07:00-21:00",
    sameAs: Object.values(BRAND.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "6200",
    },
  };
}

/** FAQPage JSON-LD. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Service JSON-LD for service detail pages. */
export function serviceJsonLd({
  name,
  description,
  price,
  path,
}: {
  name: string;
  description: string;
  price: number;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "BeautySalon", name: BRAND.name, url: BRAND.domain },
    areaServed: { "@type": "City", name: "Patna" },
    offers: {
      "@type": "Offer",
      price: String(price),
      priceCurrency: "INR",
      url: `${BRAND.domain}${path}`,
    },
  };
}

/** BreadcrumbList JSON-LD. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BRAND.domain}${item.path}`,
    })),
  };
}

/** Render JSON-LD safely inside a <script> tag. */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  } as const;
}

/** Local SEO landing page definitions: /beauty-at-home-patna etc. */
export const SEO_LANDING_PAGES = [
  { intent: "beauty-at-home", label: "Beauty Services at Home", serviceHint: "salon-at-home" },
  { intent: "bridal-makeup", label: "Bridal Makeup at Home", serviceHint: "bridal-makeup" },
  { intent: "facial-at-home", label: "Facial at Home", serviceHint: "skin-facial" },
  { intent: "haircut-at-home", label: "Haircut at Home", serviceHint: "hair" },
  { intent: "waxing-at-home", label: "Waxing at Home", serviceHint: "waxing" },
  { intent: "spa-at-home", label: "Spa at Home", serviceHint: "spa-wellness" },
] as const;

/** Must match `CITIES[].slug` (lowercase) — never use display names. */
export const SEO_CITY_SLUGS = ["patna", "bangalore", "muzaffarpur", "jamui", "bhagalpur"] as const;

export function allSeoLandingSlugs() {
  const slugs: string[] = [];
  for (const page of SEO_LANDING_PAGES) {
    for (const citySlug of SEO_CITY_SLUGS) {
      // Skip if a city was removed from CITIES to avoid broken prerenders
      if (!CITIES.some((c) => c.slug === citySlug)) continue;
      slugs.push(`${page.intent}-${citySlug}`);
    }
  }
  return slugs;
}

export function parseSeoLandingSlug(slug: string) {
  for (const page of SEO_LANDING_PAGES) {
    for (const citySlug of SEO_CITY_SLUGS) {
      if (slug !== `${page.intent}-${citySlug}`) continue;
      const cityInfo = CITIES.find((c) => c.slug === citySlug);
      if (!cityInfo) return null;
      return { page, city: cityInfo };
    }
  }
  return null;
}
