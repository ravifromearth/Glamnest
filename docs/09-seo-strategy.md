# 09 — SEO Strategy (Local-first)

> Grounded in `src/lib/seo.ts`: `SEO_LANDING_PAGES` (6 intents) × `SEO_CITY_SLUGS` (5 cities)
> = 30 static landing pages via `allSeoLandingSlugs()` / `parseSeoLandingSlug()`, plus the JSON-LD
> builders (`localBusinessJsonLd`, `serviceJsonLd`, `faqJsonLd`, `breadcrumbJsonLd`) and
> `buildMetadata()` canonical/OG handling. Tier-2 Bihar SEO is a land-grab: competition is thin,
> intent is high, and rankings compound before competitors arrive.

## 1. Keyword matrix — {intent} × {city}

Primary keyword = page H1/title; slug = `{intent}-{city}` at root (keyword-in-URL).
Est. difficulty: Patna medium, others low.

| Intent (from `SEO_LANDING_PAGES`) | Primary keyword pattern | Secondary keywords | Money page links to (`serviceHint`) |
|---|---|---|---|
| beauty-at-home | beauty services at home in {city} | salon at home {city}, beauty parlour home service {city}, home salon near me | all categories |
| bridal-makeup | bridal makeup at home in {city} | bridal makeup artist {city} price, HD/airbrush bridal makeup {city}, dulhan makeup | `/services/bridal-makeup/*` |
| facial-at-home | facial at home in {city} | facial home service {city}, gold facial price {city}, cleanup at home | `/services/skin-facial/*` |
| haircut-at-home | haircut at home in {city} | ladies hair stylist home service {city}, keratin/smoothening {city} price | `/services/hair/*` |
| waxing-at-home | waxing at home in {city} | full body waxing price {city}, rica waxing home service {city} | `/services/waxing/*` |
| spa-at-home | spa at home in {city} | body massage home service {city} (female therapist), aromatherapy {city} | `/services/spa-wellness/*` |

Cities: patna (live) · muzaffarpur · gaya · bhagalpur · darbhanga (coming-soon pages rank early,
convert to waitlist, flip CTA on launch day). Hindi variants ("पटना में ब्यूटी पार्लर होम सर्विस")
enter via blog content first; dedicated `hi` pages are a phase-2 decision, not a template fork.

## 2. On-page template spec (`/[seoSlug]/page.tsx`)

| Slot | Content rule |
|---|---|
| `<title>` | `{Intent label} in {City} — from ₹{min price} \| GlamNest` (≤ 60 chars) |
| Meta description | Price anchor + trust + city locality names, 150–160 chars |
| H1 | `{Intent label} in {City}` — exactly one |
| Hero | City-specific promise + live/waitlist CTA + rating badge |
| Section 2 | Service cards filtered by `serviceHint` with real "from" prices (unique data ≠ doorway page) |
| Section 3 | "How it works" 4 steps (shared, rewritten intro per intent) |
| Section 4 | Localities served: real `ServiceArea` names (Boring Road, Kankarbagh…) — the local-relevance signal |
| Section 5 | 3 testimonials filtered to city |
| Section 6 | FAQ ⟨Accordion⟩: 5–7 intent×city Q&As (price, hygiene, female beautician, areas served) + `faqJsonLd` |
| Section 7 | Cross-links: other 5 intents in this city + this intent in other 4 cities |
| Word count | ≥ 600 words of city/intent-specific copy; zero boilerplate paragraphs shared verbatim between cities |

Every page: `buildMetadata()` (canonical!), `generateStaticParams` from `allSeoLandingSlugs()`,
`export const dynamic = "error"` (fully static).

## 3. JSON-LD inventory

| Schema | Builder (`src/lib/seo.ts`) | Placed on |
|---|---|---|
| BeautySalon (LocalBusiness) | `localBusinessJsonLd(citySlug)` — geo, hours Mo-Su 07:00-21:00, areaServed live cities, aggregateRating | Home, every SEO landing page (city-parameterized) |
| Service + Offer | `serviceJsonLd({name, description, price, path})` | All 15 service detail pages, SEO pages (top service) |
| FAQPage | `faqJsonLd(faqs)` | Service pages w/ FAQs, `/faq`, all 30 SEO pages |
| BreadcrumbList | `breadcrumbJsonLd(items)` | Every page ≥ 2 levels deep |
| Article | (add to seo.ts) | Blog posts |
| Injection | `jsonLdScriptProps()` — the only sanctioned way (escapes `<`) | everywhere |

Backlog for `seo.ts`: add `review`/`aggregateRating` per-service once real review counts flow from
Prisma instead of catalog constants — never mark up ratings that aren't on the page.

## 4. Internal linking scheme

```
Home ──► 10 categories ──► 15 services
 │            ▲                ▲
 │            └── related-services cross-links (same category + 2 adjacent)
 ├──► Footer SEO band: all 30 {intent}-{city} links, grouped by city (sitewide)
 │
 SEO page ──► services (money) ──► booking
     │  ▲
     │  └── blog posts link DOWN to their intent×city page (contextual anchors)
     └──► sibling intents (same city) + same intent (other cities)
```

Rules: anchor text = target keyword, varied naturally; SEO pages receive links from footer
(sitewide) + blog (contextual) + home city-selector; no orphan pages; max 1 click from home to
any SEO page.

## 5. Sitemap & robots

- `app/sitemap.ts`: home, static pages, 10 categories, 15 services, 4 packages, 30 SEO pages,
  blog index + posts. `lastModified` real; priority 1.0 home / 0.9 SEO+category / 0.8 service.
- `app/robots.ts`: allow all; `Disallow: /account, /admin, /partner/dashboard…, /booking, /api`;
  sitemap reference. Admin/partner also send `X-Robots-Tag: noindex`.
- Canonicals via `buildMetadata()` on every page; UTM'd ad landings self-canonicalize.

## 6. Core Web Vitals budget

| Metric | Budget | How |
|---|---|---|
| LCP | < 2.0 s (4G mid-range Android — Patna reality) | Static pages, no hero images (gradient+emoji per CONVENTIONS rule 3), `next/font` swap |
| INP | < 200 ms | Server Components default; framer-motion only in leaf client components |
| CLS | < 0.05 | Fixed heights for slots/cards, font swap with size-adjust |
| JS on marketing routes | < 170 KB gz | No moment/lodash; wizard code stays in `/booking` chunk |
| TTFB | < 500 ms | Static + Vercel edge cache; ISR for blog |

CI gate: Lighthouse CI on `/`, one SEO page, one service page — fail build < 90 performance/SEO.

## 7. GMB & citations (offline SEO)

1. Google Business Profile "GlamNest — Beauty Services at Home, Patna" (service-area business,
   Maurya Lok address per `BRAND.address`), category Beauty Salon; UTM-tagged website link.
2. Weekly GBP posts (offers from `/offers`), review pipeline: post-COMPLETED WhatsApp asks 5★
   customers to also review on Google (target 25/mo).
3. NAP consistency (`BRAND.phone` +91 91100 00000) across Justdial, Sulekha, IndiaMART, Facebook,
   Instagram bio, Apple Maps.
4. Local links: Patna lifestyle bloggers, wedding photographers/planners (bridal cross-referrals),
   RWA newsletters, local news launch story.
5. Per-city GBP replay at each expansion (doc 10 playbook step).

## 8. Content calendar — 12 blog topics × funnel

| Mo | Title (working) | Stage | Target intent page |
|---|---|---|---|
| 1 | Bridal Makeup Prices in Patna: the 2026 Guide | BOFU | bridal-makeup-patna |
| 1 | HD vs Airbrush Bridal Makeup — Which Lasts a Bihar Wedding Day? | MOFU | bridal-makeup-patna |
| 2 | Facial at Home vs Parlour: Cost, Hygiene, Results | BOFU | facial-at-home-patna |
| 2 | The 3-Month Bridal Skin Timeline (Dermat-Approved) | MOFU | packages/wedding-glow-journey |
| 3 | Rica vs Honey vs Chocolate Wax: an Honest Comparison | MOFU | waxing-at-home-patna |
| 3 | How We Verify Every GlamNest Beautician | TOFU/trust | partner + home |
| 4 | Keratin vs Smoothening vs Botox for Hair | MOFU | haircut-at-home-patna |
| 4 | Best Salon-at-Home Services in Patna (Comparison) | BOFU | beauty-at-home-patna |
| 5 | Home Spa Guide: What a Certified Therapist Brings | MOFU | spa-at-home-patna |
| 5 | Grooming for Grooms: Wedding-Week Checklist | MOFU | groom category |
| 6 | Monthly Beauty Routine on a Budget (Patna Edition) | TOFU | membership |
| 6 | Senior-Citizen Grooming at Home: a Family Guide | TOFU | senior-care category |

Cadence: 2/month, each ≥ 1,200 words, one contextual link to its money page, Article JSON-LD,
author = real team member. Review quarterly against Search Console queries; double down on
whatever Patna actually searches.
