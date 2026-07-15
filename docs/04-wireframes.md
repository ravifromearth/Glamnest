# 04 — Wireframes (low-fi)

> ASCII wireframes + annotations for the highest-leverage screens. Components in ⟨brackets⟩ map to
> `docs/CONVENTIONS.md` APIs. Mobile-first: frames show mobile unless marked desktop; desktop is
> the same stack laid out in `container-gn` grids.

---

## 1. Home — 10 sections

```
┌──────────────────────────────────────┐
│ ⟨Header: glass, sticky⟩              │
│  Logo   Services▾ … 📍Patna  [Book●] │
├──────────────────────────────────────┤
│ 1. HERO (cream + bg-dots)            │
│  EYEBROW: BEAUTY COMES HOME          │
│  H1: Premium Beauty Services         │
│      At Your Doorstep      (Playfair)│
│  sub: Book trusted professionals     │
│      across Patna in minutes.        │
│  [Book Now ●gold xl] [Explore ○]     │
│  ✓4.8★ 6,200 reviews ✓Verified pros  │
├──────────────────────────────────────┤
│ 2. TRUST STRIP (5 TRUST_POINTS)      │
│  [🛡Verified][✨Hygienic][₹Transparent│
│   ][🏠Doorstep][📅Easy] — icon+title │
├──────────────────────────────────────┤
│ 3. CATEGORIES (10, grid 2×5 mobile)  │
│  ⟨SectionHeading eyebrow="SERVICES"⟩ │
│  [👰Bridal][💃Party][💇Hair][✨Skin]  │
│  [🌿Spa][🪶Wax][💅Mani][🤵Groom]      │
│  [🌺Mehendi][🤍Senior]               │
├──────────────────────────────────────┤
│ 4. POPULAR SERVICES (horiz scroll)   │
│  ⟨ServiceCard⟩×8 getPopularServices()│
│  gradient panel + emoji, ₹from, ★    │
├──────────────────────────────────────┤
│ 5. HOW IT WORKS (4 steps)            │
│  ①Choose ②Select time ③Arrives ④Enjoy│
├──────────────────────────────────────┤
│ 6. OCCASION PACKAGES (4 cards)       │
│  💍Wedding Glow ₹14,999 (̶₹̶1̶9̶,̶9̶9̶9̶)   │
│  🥂Party Squad  🌸Monthly  🤵Groom    │
├──────────────────────────────────────┤
│ 7. MEMBERSHIP (3 plans, Luxe raised) │
│  Glow ₹299 │▲Luxe ₹599●│ Royale ₹999 │
│            └shadow-gold┘             │
├──────────────────────────────────────┤
│ 8. TESTIMONIALS + STATS (ink-950 bg) │
│  ⟨glass-dark⟩ quote carousel          │
│  25,000+ services · 4.8★ · 150+ pros │
├──────────────────────────────────────┤
│ 9. BLOG TEASER (3 posts) + FAQ       │
│  ⟨Accordion⟩ top 6 FAQS              │
├──────────────────────────────────────┤
│ 10. FINAL CTA BAND (gold gradient)   │
│  "Your glow is one tap away"         │
│  [Book Now ●ink]  [WhatsApp us ○]    │
├──────────────────────────────────────┤
│ ⟨Footer: ink-950⟩ 4 cols + SEO band  │
└──────────────────────────────────────┘
│ ⟨MobileTabBar⟩ 🏠 ▦ [＋] 📅 👤        │
```

Annotations: exactly one gold CTA visible per viewport; sections alternate cream-50/cream-100;
section 8 is the only ink section before the footer. All 10 sections use `SectionHeading`.

## 2. Service detail — `/services/skin-facial/glow-facial`

```
┌──────────────────────────────────────┐
│ Home › Skin › Glow Facial (breadcrumb│
│ + BreadcrumbList JSON-LD)            │
│ ┌──────────────┐  H1 Signature Glow  │
│ │ gradient     │  Facial             │
│ │ panel  ✨    │  ★4.8 (1,560) · 75m │
│ │ (emerald→    │  From ₹1,299        │
│ │  cream)      │  ✓O3+, Lotus Pro    │
│ └──────────────┘  ✓Single-use kit    │
├──────────────────────────────────────┤
│ CHOOSE PACKAGE (radio cards)         │
│ ┌ Glow Ritual      ₹1,299 ̶₹̶1̶,̶6̶9̶9̶ ◉ ┐ │
│ │ [gold badge: POPULAR] 75 min      │ │
│ │ • Deep cleanse • Massage • Mask   │ │
│ ├ 24K Gold Facial  ₹2,199  90m   ○ ┤ │
│ ├ HydraGlow Luxe   ₹3,499 105m   ○ ┤ │
├──────────────────────────────────────┤
│ ADD-ONS (checkbox rows)              │
│ ☐ Threading ₹99 ☐ Hair Spa ₹499 …   │
├──────────────────────────────────────┤
│ HIGHLIGHTS ✓×4 │ REVIEWS (3 + link)  │
│ FAQs ⟨Accordion⟩ (+FAQPage JSON-LD)  │
│ RELATED: Cleanup & De-Tan …          │
├──────────────────────────────────────┤
│ ██ STICKY BAR (glass): ₹1,398 total  │
│    [Book this service ●gold]         │
└──────────────────────────────────────┘
```

Sticky bar total updates live with package+add-on selection; CTA deep-links
`/booking?service=skin-facial/glow-facial` hydrating the store past steps 1–2.

## 3. Booking wizard — 8 steps (`BOOKING_STEPS`)

Shell (constant across steps):

```
┌──────────────────────────────────────┐
│ ← back   ●●●○○○○○  Step 3 of 8       │  progress = BOOKING_STEPS index
├──────────────────────────────────────┤
│           [step content]             │
├──────────────────────────────────────┤
│ ██ glass bar: Total ₹1,398 ▾breakdown│
│              [Continue ●gold]        │
└──────────────────────────────────────┘
```

| # | Step | Content | Continue enabled when |
|---|---|---|---|
| 1 | category | 10 category tiles (2-col) | `selectCategory` (auto-advances) |
| 2 | service | ⟨ServiceCard⟩ list for category | `selectService` (auto-advances) |
| 3 | package | Tier radio cards (essential/premium/luxe) + add-on checkboxes | `servicePackage != null` |
| 4 | address | Saved addresses radio + "Add new" (line1, locality, city, 6-digit pincode) — **OTP login gate if anonymous** | `address != null` |
| 5 | schedule | 14-day date chips + `TIME_SLOTS` grid (07:00 AM–07:00 PM); sold-out slots disabled | `date && slot` |
| 6 | beautician | 2–3 ⟨BeauticianOption⟩ cards: ⟨Avatar⟩ + name + ★rating + jobs + specialty; "No preference" default | `beautician != null` |
| 7 | review | Line items: package, add-ons, visit fee ₹99 (if subtotal<₹999), coupon field (GLAMFIRST…), −discount, **Total** | always |
| 8 | payment | ◉ Razorpay (UPI/card/netbanking) ○ Pay after service → `createBooking` → success | `paymentMethod != null` |

Success screen `/booking/success/GN2026412857`:

```
│      ✅ (gold burst, one-time anim)  │
│   Booking confirmed, Priya           │
│   GN2026412857                       │
│   Glow Ritual · Tue 4:00 PM          │
│   Anjali S. ★4.8 · Boring Road       │
│   WhatsApp confirmation sent ✓       │
│   [View my booking ●] [Home ○]      │
│   ┌ Give ₹300, get ₹300 → share ┐   │
```

## 4. Customer dashboard — `/account`

```
┌ Hi Ritu 👋            [Avatar RS] ┐
│ ⟨Card gold-tint⟩ NEXT BOOKING     │
│  Glow Facial · tomorrow 4 PM      │
│  Anjali S ★4.8   [Track →]        │
├───────────────────────────────────┤
│ [Wallet ₹450] [Points 1,240] [Luxe│
│  −15%]              (3 stat cards)│
├───────────────────────────────────┤
│ BOOK AGAIN (last 3 services,      │
│  1-tap rebook → wizard step 5)    │
├───────────────────────────────────┤
│ Menu list: Bookings › Addresses › │
│ Wallet › Membership › Referrals › │
│ Rewards › Reviews › Support ›     │
└───────────────────────────────────┘
```

## 5. Partner overview — `/partner/dashboard`

```
┌ sidebar ┐┌──────────────────────────┐
│ ◉ ONLINE ││ Namaste, Anjali          │
│ Dashboard││ [Today ₹2,598][Week      │
│ Jobs (2) ││  ₹8,400][★4.9][Jobs 212] │
│ Calendar ││──────────────────────────│
│ Earnings ││ TODAY'S JOBS             │
│ Reviews  ││ ┌ 4:00 PM Glow Ritual    │
│ KYC ✓    ││ │ Boring Rd · ₹1,299     │
│ Training ││ │ [Navigate][EN_ROUTE ●] │
│ Profile  ││ ┌ 6:30 PM Waxing …       │
│          ││──────────────────────────│
│          ││ NEW REQUEST (expires 90s)│
│          ││ Party Makeup ₹2,499 2.1km│
│          ││ [Accept ●gold] [Decline] │
└──────────┘└──────────────────────────┘
```

Online toggle writes `Beautician.isOnline`; job status buttons advance
`BEAUTICIAN_ASSIGNED → EN_ROUTE → IN_PROGRESS → COMPLETED` and log `BookingStatusEvent`.
Accept timer feeds acceptance-rate scoring (doc 07).

## 6. Admin dashboard — `/admin/dashboard`

```
┌ sidebar ┐┌────────────────────────────┐
│ OPS      ││ Today · Patna ▾            │
│ Dashboard││ [Bookings 47↑12%][GMV      │
│ Bookings ││ ₹68,400][Online pros 34]   │
│ Support 3││ [Avg ★4.82][Refunds ₹2.4k] │
│ PEOPLE   ││────────────────────────────│
│ Customers││ LIVE BOARD (auto-refresh)  │
│ Partners ││ code   status      slot    │
│ Applic. 5││ GN…857 EN_ROUTE ●  4:00PM  │
│ COMMERCE ││ GN…858 CONFIRMED   4:30PM  │
│ Catalog  ││ GN…859 PENDING_PAY 5:00PM ⚠│
│ Pricing  ││────────────────────────────│
│ Coupons  ││ ⚠ NEEDS ATTENTION          │
│ Payouts  ││ • 1 URGENT ticket (burn)   │
│ CONTENT  ││ • 5 KYC apps waiting 36h   │
│ Reviews 2││ • 3 unassigned bookings <2h│
└──────────┘└────────────────────────────┘
```

## 7. Mobile app — 6 key screens + bottom nav

```
①SPLASH            ②ONBOARDING(3)      ③HOME
┌──────────┐      ┌──────────┐      ┌──────────┐
│          │      │  👰 art   │      │📍Patna ▾🔔│
│ GlamNest │      │ Salon at  │      │ Hi Priya  │
│  (gold   │      │ your door │      │[search 🔍]│
│ wordmark)│      │ ● ○ ○     │      │ categories│
│ Beauty   │      │[Next ●]   │      │ 2×5 grid  │
│ Comes    │      │ Skip      │      │ POPULAR → │
│ Home     │      └──────────┘      │ offers 🎁 │
└──────────┘                        ├──────────┤
 ink-950 bg, gold wordmark,         │🏠▦＋📅👤 │
 lottie shimmer ≤1.8s               └──────────┘

④SERVICE DETAIL     ⑤CHECKOUT           ⑥BOOKING SUCCESS
┌──────────┐      ┌──────────┐      ┌──────────┐
│← ✨ panel │      │← Review   │      │ ✅ burst  │
│ Glow      │      │ Glow ₹1299│      │ Confirmed │
│ Facial    │      │ +Thread 99│      │ GN2026…   │
│ ★4.8·75m  │      │ Visit fee0│      │ Tue 4 PM  │
│ packages◉ │      │ GLAMFIRST │      │ Anjali ★  │
│ add-ons ☐ │      │   −300    │      │ [Track ●] │
│──────────│      │ ₹1,098    │      │ Share ₹300│
│₹1,398[Book│      │ ◉UPI ○Pay │      └──────────┘
│      ●]  │      │  after    │
└──────────┘      │[Pay ●gold]│
                  └──────────┘
```

**Bottom nav spec (app):**

| Tab | Icon | Route | Badge |
|---|---|---|---|
| Home | House | home | — |
| Services | LayoutGrid | catalog | — |
| Bookings | CalendarCheck | orders | live dot when EN_ROUTE |
| Rewards | Gift | rewards/referrals | unclaimed-perk count |
| Profile | UserRound | profile | — |

56px bar + safe-area inset; active = gold-600 icon + label, inactive ink-400; center of screen
persists per-tab (independent stacks). The website's tab bar swaps Rewards for the raised Book FAB
(see doc 01 §3.3); the app keeps booking entry inside Home/Services.
