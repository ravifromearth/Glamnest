# GlamNest — Beauty Comes Home ✨

Premium on-demand beauty-at-home marketplace for India, launching in **Patna, Bihar**.
Customers book verified beauticians, makeup artists, hairstylists and spa therapists who
deliver salon-grade services at their doorstep.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (custom design tokens), shadcn-style component library |
| Animation | Framer Motion |
| State | Zustand (booking engine), TanStack Query (server cache — production) |
| Forms | React Hook Form + Zod |
| Database | PostgreSQL + Prisma (`prisma/schema.prisma`) |
| Auth | Auth.js — phone OTP (see `docs/06-auth-and-security.md`) |
| Payments | Razorpay (primary) + Stripe, webhook at `/api/v1/webhooks/razorpay` |
| Deployment | Vercel + Neon/Supabase Postgres (see `docs/10-deployment-and-scale.md`) |
| PWA | `manifest.ts` + installable app shell |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

The catalog/booking data is served from a typed mock layer (`src/lib/catalog.ts`) that mirrors
the Prisma schema — swap it for Prisma queries when a database is provisioned:

```bash
cp .env.example .env   # fill DATABASE_URL etc.
npm run db:generate
npm run db:push
```

## Application surfaces

| Surface | Route | Notes |
|---|---|---|
| Customer site | `/` | 21 marketing pages, services catalog, local-SEO city pages |
| Booking engine | `/booking` | 8-step flow: category → service → package → address → schedule → beautician → review → payment |
| Customer dashboard | `/account` | Bookings, wallet, rewards, referrals, membership… |
| Partner portal | `/partner` | Jobs, earnings, payouts, KYC, availability… |
| Admin panel | `/admin` | 20 modules: analytics, bookings, settlements, pricing… |
| Mobile API | `/api/v1/*` | Catalog, slots, webhooks (see `docs/05-api-architecture.md`) |

## Documentation

All product/architecture deliverables live in [`docs/`](docs/):

1. Information architecture · 2. User journeys · 3. Design system · 4. Wireframes ·
5. API architecture · 6. Auth & security · 7. Booking engine · 8. Growth systems
(subscriptions/referrals/loyalty) · 9. SEO strategy · 10. Deployment & scale ·
11. Mobile app design — plus `CONVENTIONS.md` for contributors.

## Brand

- **Primary** `#0F0F0F` (ink) · **Gold** `#D4AF37` · **Cream** `#F8F5EF`
- Headings: Playfair Display · Body: Inter
- Voice: premium, warm, trustworthy — "luxury startup, not luxury salon"
