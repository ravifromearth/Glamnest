# 01 — Information Architecture

> Scope: customer site, local-SEO surface, partner portal, admin panel. Grounded in
> `src/lib/catalog.ts` (10 categories / 15 services), `src/lib/seo.ts` (6 intents × 5 cities),
> `src/stores/booking-store.ts` (8-step booking flow) and the App Router layout groups in
> `docs/CONVENTIONS.md`.

---

## 1. Principles

1. **Three worlds, three shells.** Customer pages live in `(site)` and share header/footer/mobile
   tab bar. `partner/*` and `admin/*` each ship their own sidebar layout and never render the
   marketing chrome. No route belongs to two shells.
2. **URLs are the taxonomy.** `/services/{category}/{service}` mirrors the catalog exactly —
   `categorySlug` and `slug` from `SERVICES` are the only source of truth. No IDs in customer URLs;
   booking references use the human code `GN2026xxxxxx`.
3. **SEO pages are first-class routes, not landing-page clones.** `/beauty-at-home-patna` is a
   real template driven by `parseSeoLandingSlug()`, statically generated from
   `allSeoLandingSlugs()` (30 pages), and interlinked from the footer.
4. **Every page has exactly one primary CTA.** If a page needs two, it is two pages.
5. **Depth ≤ 3 clicks to "Book Now"** from anywhere on the customer site.

---

## 2. Sitemap tree

```
glamnest.in
│
├── /                                        Home (10 sections, see 04-wireframes)
│
├── /services                                Category index (all 10 categories)
│   └── /services/{category}                 Category detail + service list
│       └── /services/{category}/{service}   Service detail (packages, add-ons, FAQs)
│           Categories: bridal-makeup · party-makeup · hair · skin-facial ·
│           spa-wellness · waxing · mani-pedi · groom · mehendi · senior-care
│
├── /packages                                Occasion packages (BEAUTY_PACKAGES)
│   └── /packages/{slug}                     wedding-glow-journey · party-squad ·
│                                            monthly-essentials · groom-wedding-week
│
├── /booking                                 8-step booking wizard (single client route,
│                                            steps from BOOKING_STEPS, state in Zustand)
│   └── /booking/success/{code}              Confirmation (GN2026xxxxxx)
│
├── /membership                              Plans: Glow ₹299 · Luxe ₹599 · Royale ₹999
├── /gift-cards                              Buy / redeem gift cards
├── /offers                                  Live coupons & campaigns
│
├── /account                                 Customer dashboard (auth-gated)
│   ├── /account/bookings                    Upcoming + past bookings
│   │   └── /account/bookings/{code}         Booking detail + live status + invoice
│   ├── /account/addresses                   Saved addresses (Home/Work/Other)
│   ├── /account/wallet                      Balance + WalletTransaction ledger
│   ├── /account/membership                  Active plan, renewals, pause/cancel
│   ├── /account/referrals                   Give ₹300 / Get ₹300, referral code
│   ├── /account/rewards                     Glow Points balance, tier, history
│   ├── /account/reviews                     Reviews I've written
│   ├── /account/support                     Tickets list → /account/support/{id}
│   └── /account/profile                     Name, email, DOB, notification prefs
│
├── /login                                   Phone entry → /login/verify (OTP)
│
├── /about                                   Story, founders, safety standards
├── /how-it-works                            4-step explainer (HOW_IT_WORKS)
├── /reviews                                 Aggregate social proof wall
├── /careers                                 Corporate roles
├── /contact                                 Contact form (submitContact action)
├── /blog                                    Index → /blog/{slug}
├── /faq                                     Full FAQ (FAQS + category FAQs)
│
├── /beauty-at-home-{city}                   ┐
├── /bridal-makeup-{city}                    │ 6 intents × 5 cities = 30 static
├── /facial-at-home-{city}                   │ local-SEO pages via
├── /haircut-at-home-{city}                  │ [seoSlug]/page.tsx +
├── /waxing-at-home-{city}                   │ generateStaticParams()
├── /spa-at-home-{city}                      ┘ cities: patna muzaffarpur gaya
│                                              bhagalpur darbhanga
│
├── /terms · /privacy · /refund-policy · /partner-terms
│
├── /partner                                 Partner marketing page (earnings pitch)
│   ├── /partner/apply                       Application form (applyAsPartner action)
│   ├── /partner/login                       Phone OTP (BEAUTICIAN role)
│   └── /partner/(portal)                    ── sidebar shell, auth: BEAUTICIAN ──
│       ├── /partner/dashboard               Today's jobs, earnings snapshot, online toggle
│       ├── /partner/jobs                    Job queue → /partner/jobs/{code}
│       ├── /partner/calendar                AvailabilitySlot editor (weekly grid)
│       ├── /partner/earnings                Payout history (Payout model), UTR refs
│       ├── /partner/reviews                 My ratings & customer feedback
│       ├── /partner/kyc                     Document upload (AADHAAR/PAN/…)
│       ├── /partner/training                Certification modules & quizzes
│       └── /partner/profile                 Bio, skills, service areas
│
└── /admin                                   ── sidebar shell, auth: ADMIN/SUPPORT ──
    ├── /admin/dashboard                     KPIs: bookings, GMV, active partners
    ├── /admin/bookings                      All bookings, status filters
    │   └── /admin/bookings/{code}           Timeline (BookingStatusEvent), reassign, refund
    ├── /admin/customers                     User CRM → /admin/customers/{id}
    ├── /admin/beauticians                   Partner roster → /admin/beauticians/{id}
    ├── /admin/applications                  KYC review queue (APPLIED → ACTIVE)
    ├── /admin/catalog                       Services/packages/add-ons CRUD
    ├── /admin/pricing                       CityServicePricing multipliers + surge
    ├── /admin/coupons                       Coupon engine CRUD + usage
    ├── /admin/payouts                       Settlement batches (SettlementStatus)
    ├── /admin/reviews                       Moderation queue (isPublished, adminReply)
    ├── /admin/support                       Ticket inbox → /admin/support/{id}
    ├── /admin/cities                        City/ServiceArea go-live toggles
    ├── /admin/notifications                 Template & campaign manager
    └── /admin/blog                          BlogPost CRUD
```

---

## 3. Navigation model

### 3.1 Desktop header (customer, `(site)/layout.tsx`)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [Logo]   Services ▾   Packages   Membership   Blog   About      📍Patna ▾ │
│                                              [Login]  [Book Now ●gold]     │
└────────────────────────────────────────────────────────────────────────────┘
```

| Element | Behaviour |
|---|---|
| Services ▾ | Mega-menu: 10 categories in 2 rows w/ emoji + `shortName`; "View all" → `/services` |
| 📍 City picker | `CITIES` list; live = selectable, coming-soon = waitlist modal |
| Book Now | Gold button → `/booking`; sticky on scroll |
| Login → avatar | After auth becomes avatar menu: Bookings / Wallet / Rewards / Logout |

### 3.2 Footer (4 columns + SEO band)

| Column | Links |
|---|---|
| Services | 10 category links |
| Company | About, How it works, Careers, Blog, Contact, Reviews |
| For You | Membership, Gift cards, Offers, Referrals, FAQ |
| Partners & Legal | Become a partner, Partner login, Terms, Privacy, Refund policy |
| **SEO band** | All 30 `{intent}-{city}` links, grouped by city — the internal-linking backbone (see 09) |

### 3.3 Mobile tab bar (customer, <768px, fixed bottom)

| Tab | Icon (lucide) | Route |
|---|---|---|
| Home | `House` | `/` |
| Services | `LayoutGrid` | `/services` |
| **Book** (raised gold FAB) | `Plus` | `/booking` |
| Bookings | `CalendarCheck` | `/account/bookings` |
| Profile | `UserRound` | `/account/profile` |

Hidden inside `/booking` wizard (wizard has its own progress header + sticky total bar).

### 3.4 Partner & admin sidebars

Partner: Dashboard · Jobs · Calendar · Earnings · Reviews · KYC · Training · Profile — plus a
persistent **Online/Offline toggle** pinned at top (writes `Beautician.isOnline`).
Admin: nav grouped **Operations** (Dashboard, Bookings, Support) / **People** (Customers,
Beauticians, Applications) / **Commerce** (Catalog, Pricing, Coupons, Payouts) / **Content**
(Reviews, Blog, Notifications, Cities).

---

## 4. URL conventions

| Rule | Example |
|---|---|
| Lowercase kebab-case, no trailing slash | `/services/skin-facial/glow-facial` |
| Category & service slugs = `catalog.ts` slugs, never renamed (301 if ever) | `bridal-makeup` |
| Booking references use customer code, not cuid | `/account/bookings/GN2026412857` |
| SEO pages are flat root slugs `{intent}-{city}` (keyword-in-URL) | `/bridal-makeup-patna` |
| Query params only for filters/utm, never for content identity | `/services?sort=popular` |
| Admin/partner detail pages may use cuid (not indexed, noindex header) | `/admin/customers/{id}` |
| Canonical always absolute via `buildMetadata()` (`alternates.canonical`) | — |

---

## 5. Page inventory (~62 routes)

Legend: 🔓 public · 🔐 customer auth · 🅿 partner auth · 🅰 admin/support auth.

| # | Route | Auth | Purpose | Primary CTA |
|---|---|---|---|---|
| 1 | `/` | 🔓 | Convert: brand promise + catalog entry | Book Now |
| 2 | `/services` | 🔓 | Browse 10 categories | Open category |
| 3–12 | `/services/{category}` ×10 | 🔓 | Category pitch + service cards | Open service |
| 13–27 | `/services/{category}/{service}` ×15 | 🔓 | Packages, add-ons, FAQs, reviews | Book this service |
| 28 | `/packages` | 🔓 | Occasion bundles | View package |
| 29 | `/packages/{slug}` ×4 | 🔓 | Bundle detail + economics | Book package |
| 30 | `/booking` | 🔓→🔐 | 8-step wizard (auth gate at address step) | Continue / Pay |
| 31 | `/booking/success/{code}` | 🔐 | Confirmation + next steps | View booking |
| 32 | `/membership` | 🔓 | Sell Glow/Luxe/Royale | Join Luxe |
| 33 | `/gift-cards` | 🔓 | Buy/redeem gift card | Buy gift card |
| 34 | `/offers` | 🔓 | Active coupons | Copy code → Book |
| 35 | `/login` (+`/verify`) | 🔓 | Phone OTP | Send OTP / Verify |
| 36 | `/account` | 🔐 | Dashboard overview | Book again |
| 37 | `/account/bookings` | 🔐 | Booking list | Track / Rebook |
| 38 | `/account/bookings/{code}` | 🔐 | Live status, invoice, cancel/reschedule | Track beautician |
| 39 | `/account/addresses` | 🔐 | Address book | Add address |
| 40 | `/account/wallet` | 🔐 | Balance + ledger | Add money |
| 41 | `/account/membership` | 🔐 | Manage plan | Renew / Upgrade |
| 42 | `/account/referrals` | 🔐 | Share ₹300 code | Share on WhatsApp |
| 43 | `/account/rewards` | 🔐 | Glow Points + tier | Redeem points |
| 44 | `/account/reviews` | 🔐 | My reviews | Write review |
| 45 | `/account/support` (+`/{id}`) | 🔐 | Tickets | New ticket |
| 46 | `/account/profile` | 🔐 | Profile + prefs | Save |
| 47 | `/about` | 🔓 | Trust story | Book Now |
| 48 | `/how-it-works` | 🔓 | 4-step explainer | Book Now |
| 49 | `/reviews` | 🔓 | Social proof wall | Book Now |
| 50 | `/careers` | 🔓 | Hiring | Apply |
| 51 | `/contact` | 🔓 | Contact form → ticket | Send message |
| 52 | `/blog` (+`/{slug}`) | 🔓 | Content marketing | Read / Book |
| 53 | `/faq` | 🔓 | Objection handling | Book Now |
| 54 | `/{intent}-{city}` ×30 | 🔓 | Local SEO capture | Book in {City} |
| 55 | `/terms` `/privacy` `/refund-policy` `/partner-terms` | 🔓 | Legal | — |
| 56 | `/partner` | 🔓 | Recruit beauticians | Apply now |
| 57 | `/partner/apply` | 🔓 | Application form | Submit application |
| 58 | `/partner/login` | 🔓 | Partner OTP | Verify |
| 59 | `/partner/dashboard` … `/partner/profile` ×8 | 🅿 | Run my business | Accept job / Go online |
| 60 | `/admin/dashboard` | 🅰 | Ops cockpit | — |
| 61 | `/admin/bookings` … `/admin/blog` ×14 | 🅰 | Operate marketplace | Contextual (Approve, Refund, Publish) |
| 62 | `/booking` deep links `?service={cat}/{slug}` | 🔓 | Skip to package step from service pages | Continue |

---

## 6. Content hierarchy (per page type)

| Page type | H1 | Above the fold | Below |
|---|---|---|---|
| Home | Brand headline (`BRAND.headline`) | Hero + city + search + trust strip | Categories → popular → how-it-works → packages → membership → testimonials → stats → blog → FAQ → CTA |
| Category | `{Category.name} at Home in Patna` | `heroLine` + service cards | Highlights, hygiene promise, FAQs, cross-links |
| Service | `{Service.name}` | Price-from, rating, Book CTA | Packages table → add-ons → highlights → reviews → FAQs → related services |
| SEO landing | `{intent label} in {City}` | Localized promise + CTA | Services for `serviceHint`, localities, testimonials from city, FAQ, other-city links |
| Account | Section name | Key number (next booking / balance) | List/detail |
