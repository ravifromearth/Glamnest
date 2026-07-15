# GlamNest — Build Conventions (read before writing any page)

Project root: `glamnest/` inside the worktree. Next.js 15 App Router + TypeScript + Tailwind CSS v4.
Path alias: `@/*` → `src/*`.

## Design tokens (Tailwind v4, defined in `src/app/globals.css`)

Colors (use these, NOT default gray/black):
- Ink (primary #0F0F0F): `ink-950 900 800 700 600 500 400 300` (e.g. `text-ink-950`, `text-ink-600`, `border-ink-950/8`)
- Gold (#D4AF37): `gold-200..700` (e.g. `bg-gold-500`, `text-gold-600`)
- Cream (#F8F5EF): `cream-50 100 200 300` (page bg is cream-50)
- Blush: `blush-100 300 500`

Custom utilities: `container-gn` (max-w-76rem centered px), `section-gn` (py rhythm), `font-display` (Playfair), `glass`, `glass-dark`, `text-gold-gradient`, `bg-dots`, `no-scrollbar`.
Shadows: `shadow-soft`, `shadow-lift`, `shadow-gold`. Radius: use `rounded-2xl`/`rounded-3xl`/`rounded-full`.

Typography: headings = `font-display` (Playfair Display, bold, tight leading); body = default (Inter). Eyebrow labels: `text-xs font-semibold uppercase tracking-[0.24em] text-gold-600`.

## Shared components (import paths + APIs)

- `@/components/ui/button` → `Button` variants: `default` (ink), `gold`, `outline`, `outline-light`, `ghost`, `link`; sizes `sm|default|lg|xl|icon`. Renders `<button>`; wrap in `<Link>` for navigation.
- `@/components/ui/card` → `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter`
- `@/components/ui/badge` → `Badge` variants: `default|gold|cream|outline|success|warning|danger|info`
- `@/components/ui/input`, `.../textarea`, `.../label`, `.../select` (native select styled, pass `<option>` children)
- `@/components/ui/accordion` → `Accordion items={{question,answer}[]}` (client comp)
- `@/components/ui/avatar` → `Avatar initials="PS"`
- `@/components/ui/stars` → `Stars rating={4.8}`
- `@/components/site/section-heading` → `SectionHeading eyebrow title description align?="center|left" dark?`
- `@/components/site/service-card` → `ServiceCard service={Service}`
- `@/components/site/logo` → `Logo dark?`

## Data (mock/seed layer — import, never re-declare)

- `@/lib/brand` → `BRAND` (name/tagline/phone/email/address/social), `CITIES`, `TRUST_POINTS`, `HOW_IT_WORKS`
- `@/lib/catalog` → `CATEGORIES`, `SERVICES`, `MEMBERSHIP_PLANS`, `BEAUTY_PACKAGES`, `getCategory(slug)`, `getServicesByCategory(slug)`, `getService(cat, slug)`, `getPopularServices()`
- `@/lib/content` → `TESTIMONIALS`, `BEFORE_AFTER`, `STATS`, `BLOG_POSTS`, `getBlogPost(slug)`, `FAQS`
- `@/lib/types` → all domain types
- `@/lib/utils` → `cn()`, `formatINR()`, `formatDuration()`, `slugify()`
- `@/lib/seo` → `buildMetadata()`, `localBusinessJsonLd()`, `faqJsonLd()`, `serviceJsonLd()`, `breadcrumbJsonLd()`, `jsonLdScriptProps()`
- `@/server/actions` → `createBooking`, `submitContact`, `applyAsPartner` (server actions, Zod-validated, return `{ok: true, ...} | {ok: false, error}`)
- `@/stores/booking-store` → `useBookingStore`, `useBookingTotals`, `BOOKING_STEPS`, `TIME_SLOTS`, `COUPONS`

## Layout groups

- `src/app/(site)/…` — customer site (header/footer/mobile tab bar provided by `(site)/layout.tsx`). ALL customer pages go inside `(site)`.
- `src/app/partner/…` — partner portal with its OWN sidebar layout (no site header).
- `src/app/admin/…` — admin panel with its OWN sidebar layout (no site header).

## Rules

1. Server Components by default; add `"use client"` only for interactivity (forms, framer-motion, state).
2. Every page exports `metadata` via `buildMetadata()` (client pages: put metadata in a wrapping server `page.tsx` or `layout.tsx`).
3. Images: NO external images. Use gradient panels (`bg-gradient-to-br from-… to-…`) + large emoji, matching `service.gradient`/`service.emoji` pattern.
4. Icons: `lucide-react` only.
5. Animations: framer-motion (`motion.div`, `whileInView`, `viewport={{ once: true }}`) sparingly in client components; CSS transitions elsewhere.
6. Currency: `formatINR()`. Never hardcode `$`.
7. Mobile-first: single column base, `sm:`/`md:`/`lg:` upward. Touch targets ≥44px.
8. Premium tone of voice: confident, warm, no exclamation spam. India/Patna context.
9. TypeScript strict — no `any`, no unused imports (build fails on type errors).
10. framer-motion import: `import { motion } from "framer-motion"`.
