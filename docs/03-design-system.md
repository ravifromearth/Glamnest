# 03 — GlamNest Design System

> The spec behind the tokens in `src/app/globals.css` and the component APIs in
> `docs/CONVENTIONS.md`. Everything here is enforceable in code review: if a screen can't cite a
> token or component from this doc, it doesn't ship.

---

## 1. Brand personality

**"A five-star salon that makes house calls."** Premium but never cold; warm but never cutesy.

| Axis | We are | We are not |
|---|---|---|
| Luxury | Understated gold, cream, editorial serif | Glittery, neon, maximalist |
| Warmth | Personal, first-name, Patna-proud | Corporate, generic "valued customer" |
| Trust | Specific (sealed kits, verified pros, exact prices) | Vague claims ("best in class") |
| Energy | Calm confidence | Exclamation-mark hype |

Voice pillars: **Confident. Warm. Specific. Indian.**

## 2. Logo usage

- Wordmark: "GlamNest" in Playfair Display Bold; "Glam" ink-950, "Nest" gold-gradient
  (`text-gold-gradient`). Component: `@/components/site/logo` (`Logo dark?`).
- On dark surfaces pass `dark` → wordmark in cream-50 with gold accent unchanged.
- Clear space = height of the capital "G" on all sides. Minimum width 96px.
- Never: stretch, recolor beyond the two approved schemes, place on busy gradients without a
  `glass` backing, or pair with a second decorative typeface.

## 3. Color palette

### 3.1 Core ramps (Tailwind v4 tokens in `globals.css`)

| Token | Hex (anchor) | Role | Usage rules |
|---|---|---|---|
| `ink-950` | `#0F0F0F` | Primary text, default buttons, dark sections | Body headings; `Button variant="default"` |
| `ink-900`–`ink-700` | derived | Secondary text, dark-surface tiers | `ink-600` is the ONLY body-secondary gray |
| `ink-600` | ~`#5B5B57` | Secondary/body text on cream | Never lighter than ink-500 for text |
| `ink-400`–`ink-300` | derived | Disabled, placeholders, hairlines | Borders prefer `border-ink-950/8` alpha |
| `gold-500` | `#D4AF37` | THE accent. CTAs, highlights, ratings | One gold CTA per viewport; never body text |
| `gold-600`/`gold-700` | darker | Gold text on cream (contrast), hover | Text-gold must be ≥ gold-600 on cream |
| `gold-200`/`gold-300` | lighter | Tints, badge backgrounds | Backgrounds only |
| `cream-50` | `#F8F5EF` | Page background | Default `<body>` bg |
| `cream-100`–`cream-300` | derived | Cards-on-cream tiers, section alternation | Alternate cream-50/cream-100 sections |
| `blush-100/300/500` | rose family | Femininity accent, category gradients, empty states | Decorative only — never CTAs, never semantic |

### 3.2 Semantic colors

| Token | Use | Badge variant |
|---|---|---|
| success (emerald 600/100) | Confirmed, verified, payout PAID | `Badge variant="success"` |
| warning (amber 600/100) | Pending, KYC under review | `warning` |
| danger (red 600/100) | Cancelled, failed, refund | `danger` |
| info (sky 600/100) | En-route, informational | `info` |

Rules: semantic colors mean state, never decoration. Gold ≠ success — a CONFIRMED booking badge
is emerald, not gold. Red is reserved for destructive/negative; the "Cancel booking" button is
`outline` with red text, never a filled red primary.

### 3.3 Dark sections

Marketing pages may use full-bleed ink-950 sections (footer, stats band). On ink: text cream-50 /
ink-300 secondary, CTAs `gold` or `outline-light`, glass panels use `glass-dark`.

## 4. Typography

| Font | Role | Loading |
|---|---|---|
| Playfair Display (700/800) | Display & headings — `font-display` | `next/font`, swap |
| Inter (400/500/600/700) | Body, UI, numbers | `next/font`, variable |

### Size ramp

| Step | Class | Size/leading | Use |
|---|---|---|---|
| Display | `text-5xl md:text-6xl font-display font-bold tracking-tight` | 48→60 / 1.05 | Home hero only |
| H1 | `text-4xl md:text-5xl font-display font-bold` | 36→48 / 1.1 | Page titles |
| H2 | `text-3xl md:text-4xl font-display font-bold` | 30→36 / 1.15 | Section titles (via `SectionHeading`) |
| H3 | `text-xl md:text-2xl font-display font-semibold` | 20→24 / 1.25 | Card titles |
| Body-lg | `text-lg text-ink-600` | 18 / 1.6 | Lede paragraphs |
| Body | `text-base` | 16 / 1.6 | Default |
| Small | `text-sm text-ink-600` | 14 / 1.5 | Meta, captions |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.24em] text-gold-600` | 12 | Section kickers — the signature GlamNest detail |
| Price | `text-2xl font-bold tabular-nums` | Inter, never Playfair | Prices via `formatINR()` |

Rules: Playfair for headings only — never UI labels, buttons, prices or numbers. Max line length
65ch. One Display per page.

## 5. Spacing, radius, elevation

- **Spacing:** 4px base grid. Section rhythm via `section-gn` (≈ py-16 md:py-24); page gutter via
  `container-gn` (max-w-[76rem], centered, responsive px). Card padding 24px (`p-6`), tight cards 16px.
- **Radius:** `rounded-2xl` (cards, inputs) · `rounded-3xl` (hero panels, modals) ·
  `rounded-full` (pills, avatars, FAB). Nothing squarer than 2xl except table cells.
- **Elevation:**

| Token | Feel | Use |
|---|---|---|
| `shadow-soft` | Barely-there diffuse | Resting cards, inputs |
| `shadow-lift` | Hover lift | Interactive card hover (+`-translate-y-0.5`) |
| `shadow-gold` | Gold-tinted glow | Gold CTAs, highlighted membership card only |

- **Glassmorphism:** `glass` (light blur + white/60) on sticky header, booking summary bar,
  overlays on gradient heroes; `glass-dark` on ink sections. Rules: only over gradient/ink
  backgrounds (never cream-on-cream), max one glass layer deep, always with a 1px `border-white/20`.

## 6. Motion

| Token | Value | Use |
|---|---|---|
| duration-fast | 150ms | Hovers, color/opacity |
| duration-base | 250ms | Reveals, accordion |
| duration-slow | 400ms | Section entrances, modals |
| ease-luxe | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything that moves position |

Principles:
1. Animate entrances once (`whileInView` + `viewport={{ once: true }}`), never on scroll-up replay.
2. Only `transform` and `opacity` animate; never layout properties.
3. Stagger children 60–80ms; max 5 staggered items.
4. Framer-motion in client components only and sparingly; CSS transitions elsewhere (rule 5 of CONVENTIONS).
5. Respect `prefers-reduced-motion`: disable translation, keep opacity fades.
6. Never animate: prices, form errors, anything the user is mid-reading.

## 7. Component inventory

| Component | API (from CONVENTIONS) | Do | Don't |
|---|---|---|---|
| `Button` | variants `default·gold·outline·outline-light·ghost·link`; sizes `sm·default·lg·xl·icon` | One `gold` per viewport = the money action; `default` (ink) for secondary-primary; wrap in `<Link>` to navigate | Two gold buttons side by side; gold for destructive; `xl` outside heroes |
| `Card` (+Header/Title/…) | composition slots | cream-50/white bg, `shadow-soft`, hover `shadow-lift` if clickable | Nested cards; borders + shadow together |
| `Badge` | `default·gold·cream·outline·success·warning·danger·info` | Semantic variants for state; `gold` for "Popular"/"Bestseller" only | Badges as buttons; >2 badges per card |
| `Input/Textarea/Select/Label` | native, styled | Always pair with `Label`; error text `text-sm text-red-600` below | Placeholder-as-label |
| `Accordion` | `items={{question,answer}[]}` | FAQs, package includes | Navigation, critical info collapsed by default on desktop |
| `Avatar` | `initials="PS"` | Beauticians/customers without photos — blush bg, ink text | Random colors per user |
| `Stars` | `rating={4.8}` | Gold stars + numeric value alongside | Stars without the number |
| `SectionHeading` | `eyebrow title description align dark` | Every marketing section header | Hand-rolled section headers |
| `ServiceCard` | `service={Service}` | Gradient panel + emoji visual (no external images, rule 3) | Stock photography |
| Stat cards | pattern: big `tabular-nums` number + eyebrow label | Home stats band, dashboards | Animated count-up beyond 1s |
| Data tables | admin/partner: `text-sm`, sticky header, row hover cream-100, status `Badge` | Right-align numbers; empty state w/ emoji + CTA | Zebra stripes + hover together; horizontal scroll without shadow hint |

## 8. Accessibility standards

| Standard | Requirement |
|---|---|
| Contrast | WCAG AA: 4.5:1 body, 3:1 large text. Gold on cream fails for text → use gold-600/700 for text, gold-500 only for fills with ink text |
| Touch targets | ≥ 44×44px (CONVENTIONS rule 7); tab bar items ≥ 48px |
| Focus | Visible ring on every interactive element: `focus-visible:ring-2 ring-gold-500 ring-offset-2 ring-offset-cream-50`; never `outline-none` without replacement |
| Semantics | One `<h1>` per page; landmarks (`header/nav/main/footer`); `Accordion` uses proper `aria-expanded` |
| Forms | Programmatic labels, `aria-invalid` + `aria-describedby` on errors, errors announced (`role="alert"`) |
| Motion | `prefers-reduced-motion` honored globally |
| Language | `lang="en-IN"`; currency via `formatINR()` with proper ₹ glyph |

## 9. Voice & tone

Rules: sentence case everywhere (buttons included). No exclamation spam — max one "!" per screen,
earned. Numbers are specific ("1,560 reviews", "arrives in 15 minutes"), never vague. Hindi-adjacent
warmth is welcome in campaigns, English-first in UI.

| Context | Don't write | Write |
|---|---|---|
| Hero | "Best beauty services!!" | "Premium beauty services at your doorstep" |
| CTA | "SUBMIT" | "Book my facial" |
| Empty state | "No bookings found." | "No bookings yet — your first glow is one tap away." |
| Error | "Error 400: invalid input" | "That pincode doesn't look right — it should be 6 digits." |
| OTP screen | "Enter verification code" | "We've WhatsApped a code to +91 …4321" |
| Cancellation | "Booking cancelled." | "Done — your ₹1,299 refund is on its way to your wallet." |
| Partner payout | "Payment processed" | "₹7,220 is on its way to your account. UTR: …" |
| Delay apology | "We apologise for the inconvenience" | "Anjali is running 15 minutes late — we've added ₹100 to your wallet for the wait." |

Words we use: glow, ritual, doorstep, verified, sealed, artist, at-home.
Words we ban: cheap, deal, luxury (as adjective spam), world-class, hassle-free, "oops".
