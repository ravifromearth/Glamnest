import type { AddOn, BeautyPackage, Category, MembershipPlan, Service } from "./types";

/* ============================================================
   GLAMNEST SERVICE CATALOG
   In production this data lives in PostgreSQL via Prisma
   (see prisma/schema.prisma). This module is the seed/mocked
   catalog powering the marketing site and booking flow.
   ============================================================ */

export const CATEGORIES: Category[] = [
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup",
    shortName: "Bridal",
    description: "HD, airbrush and celebrity bridal artistry for your biggest day — at home, on time, flawless.",
    icon: "Crown",
    gradient: "from-rose-200 via-blush-100 to-cream-100",
    emoji: "👰",
    heroLine: "Your wedding day face, perfected at home.",
  },
  {
    slug: "party-makeup",
    name: "Party Makeup",
    shortName: "Party",
    description: "Engagement, reception, sangeet or a night out — camera-ready glam without leaving home.",
    icon: "PartyPopper",
    gradient: "from-fuchsia-100 via-blush-100 to-cream-100",
    emoji: "💃",
    heroLine: "Turn every occasion into a red-carpet moment.",
  },
  {
    slug: "hair",
    name: "Hair Care",
    shortName: "Hair",
    description: "Blowouts, keratin, smoothening and global colour by senior stylists at your doorstep.",
    icon: "Scissors",
    gradient: "from-amber-100 via-cream-100 to-cream-50",
    emoji: "💇‍♀️",
    heroLine: "Salon-grade hair, minus the salon chair.",
  },
  {
    slug: "skin-facial",
    name: "Facial & Cleanup",
    shortName: "Skin",
    description: "Dermat-approved facials, cleanups and glow rituals with premium branded products.",
    icon: "Sparkles",
    gradient: "from-emerald-100 via-cream-100 to-cream-50",
    emoji: "✨",
    heroLine: "Glow that arrives at your doorstep.",
  },
  {
    slug: "spa-wellness",
    name: "Spa & Wellness",
    shortName: "Spa",
    description: "Aroma, Swedish and deep-tissue therapies by certified therapists — your home, your sanctuary.",
    icon: "Flower2",
    gradient: "from-teal-100 via-cream-100 to-cream-50",
    emoji: "🌿",
    heroLine: "A five-star spa, folded into your living room.",
  },
  {
    slug: "waxing",
    name: "Waxing & Threading",
    shortName: "Waxing",
    description: "Rica, chocolate and peel-off waxing with strict single-use hygiene protocols.",
    icon: "Feather",
    gradient: "from-orange-100 via-cream-100 to-cream-50",
    emoji: "🪶",
    heroLine: "Smooth, safe and completely private.",
  },
  {
    slug: "mani-pedi",
    name: "Manicure & Pedicure",
    shortName: "Mani-Pedi",
    description: "Classic to luxury spa mani-pedis with imported scrubs, masks and OPI polish.",
    icon: "Hand",
    gradient: "from-pink-100 via-cream-100 to-cream-50",
    emoji: "💅",
    heroLine: "Hands and feet that get noticed.",
  },
  {
    slug: "groom",
    name: "Groom Packages",
    shortName: "Groom",
    description: "Groom facials, haircuts, beard styling and pre-wedding packages for the modern man.",
    icon: "UserRound",
    gradient: "from-slate-200 via-cream-100 to-cream-50",
    emoji: "🤵",
    heroLine: "Because the groom deserves a glow-up too.",
  },
  {
    slug: "mehendi",
    name: "Mehendi",
    shortName: "Mehendi",
    description: "Bridal, Arabic and designer mehendi by award-winning artists using 100% natural henna.",
    icon: "Palette",
    gradient: "from-lime-100 via-cream-100 to-cream-50",
    emoji: "🌺",
    heroLine: "Intricate art, straight to your hands.",
  },
  {
    slug: "senior-care",
    name: "Senior Citizen Care",
    shortName: "Senior Care",
    description: "Gentle grooming, haircuts and pampering sessions designed for elders, at their pace.",
    icon: "HeartPulse",
    gradient: "from-sky-100 via-cream-100 to-cream-50",
    emoji: "🤍",
    heroLine: "Care and comfort for the ones who raised us.",
  },
];

const COMMON_ADDONS: AddOn[] = [
  { id: "addon-threading", name: "Eyebrow + Upper Lip Threading", price: 99, durationMin: 15 },
  { id: "addon-hairspa", name: "Express Hair Spa", price: 499, durationMin: 30 },
  { id: "addon-facemassage", name: "Face Massage (10 min)", price: 199, durationMin: 10 },
  { id: "addon-detan", name: "De-Tan Pack", price: 349, durationMin: 20 },
];

export const SERVICES: Service[] = [
  /* ---------------- BRIDAL ---------------- */
  {
    slug: "hd-bridal-makeup",
    categorySlug: "bridal-makeup",
    name: "HD Bridal Makeup",
    shortDescription: "High-definition bridal look with premium MAC / Huda Beauty products.",
    description:
      "Our signature HD bridal service covers base, eyes, lashes, contour, saree draping and dupatta setting. A senior bridal artist works with you on a pre-bridal consultation call, then arrives with a full sealed kit on the big day.",
    startingPrice: 8999,
    durationMin: 150,
    rating: 4.9,
    reviewCount: 412,
    gradient: "from-rose-200 to-cream-100",
    emoji: "👰",
    popular: true,
    packages: [
      { id: "hdb-essential", name: "HD Classic", tier: "essential", price: 8999, strikePrice: 11999, durationMin: 150, includes: ["HD base makeup", "Eye makeup + lashes", "Saree draping", "Hairstyle of choice"] },
      { id: "hdb-premium", name: "HD Premium", tier: "premium", price: 12999, strikePrice: 15999, durationMin: 180, popular: true, includes: ["Everything in Classic", "Airbrush-finish base", "Premium lashes + lenses", "Nail paint + touch-up kit"] },
      { id: "hdb-luxe", name: "Celebrity Luxe", tier: "luxe", price: 18999, strikePrice: 24999, durationMin: 210, includes: ["Everything in Premium", "Celebrity artist", "Pre-bridal trial session", "On-call touch-up artist for 4 hrs"] },
    ],
    addOns: [
      { id: "addon-trial", name: "Bridal Trial Session", price: 2499, durationMin: 90 },
      { id: "addon-family", name: "Family Member Makeup", price: 1999, durationMin: 60 },
      ...COMMON_ADDONS,
    ],
    highlights: ["Senior bridal artists (8+ yrs)", "MAC, Huda, Bobbi Brown kits", "Free consultation call", "Sealed single-use applicators"],
    faqs: [
      { question: "Can I book a trial before my wedding?", answer: "Yes — add the Bridal Trial Session add-on, or book the Celebrity Luxe package which includes one free trial at home." },
      { question: "How early should the artist arrive?", answer: "We recommend a start 3.5–4 hours before your event. Artists arrive 15 minutes early for setup." },
      { question: "Do you handle saree draping and jewellery setting?", answer: "Yes, every bridal package includes draping, dupatta setting and jewellery assistance." },
    ],
  },
  {
    slug: "airbrush-bridal-makeup",
    categorySlug: "bridal-makeup",
    name: "Airbrush Bridal Makeup",
    shortDescription: "Feather-light airbrush finish that lasts 12+ hours through every ritual.",
    description:
      "Airbrush application delivers an ultra-fine, sweat-proof mist of foundation for a photograph-perfect finish that survives long ceremonies. Includes eyes, lashes, draping and hairstyling by a senior artist.",
    startingPrice: 14999,
    durationMin: 180,
    rating: 4.9,
    reviewCount: 268,
    gradient: "from-blush-100 to-cream-100",
    emoji: "💍",
    packages: [
      { id: "ab-premium", name: "Airbrush Signature", tier: "premium", price: 14999, strikePrice: 18999, durationMin: 180, popular: true, includes: ["Airbrush base", "HD eye makeup", "Hairstyle + draping", "Long-wear setting spray"] },
      { id: "ab-luxe", name: "Airbrush Royale", tier: "luxe", price: 21999, strikePrice: 27999, durationMin: 220, includes: ["Everything in Signature", "Celebrity artist", "Trial session", "4-hr touch-up support"] },
    ],
    addOns: [{ id: "addon-trial-ab", name: "Airbrush Trial", price: 2999, durationMin: 90 }, ...COMMON_ADDONS],
    highlights: ["Temptu airbrush systems", "12-hour wear guarantee", "Waterproof, tear-proof finish", "Trial available at home"],
    faqs: [
      { question: "Is airbrush better than HD makeup?", answer: "Airbrush is lighter and more sweat-resistant — ideal for long summer weddings. HD gives a fuller, more sculpted finish. Our artists advise on a consult call." },
    ],
  },
  {
    slug: "engagement-makeup",
    categorySlug: "party-makeup",
    name: "Engagement & Reception Makeup",
    shortDescription: "Soft-glam or bold looks for engagements, receptions and sangeet nights.",
    description:
      "A senior artist designs a look around your outfit and jewellery — soft glam, smokey or full glam — with lashes, hairstyling and draping included.",
    startingPrice: 4999,
    durationMin: 120,
    rating: 4.8,
    reviewCount: 521,
    gradient: "from-fuchsia-100 to-cream-100",
    emoji: "💃",
    popular: true,
    packages: [
      { id: "eng-essential", name: "Soft Glam", tier: "essential", price: 4999, strikePrice: 6499, durationMin: 105, includes: ["HD base", "Soft glam eyes", "Lashes", "Simple hairstyle"] },
      { id: "eng-premium", name: "Full Glam", tier: "premium", price: 6999, strikePrice: 8999, durationMin: 130, popular: true, includes: ["Airbrush-finish base", "Statement eyes + lenses", "Premium lashes", "Styled updo + draping"] },
    ],
    addOns: COMMON_ADDONS,
    highlights: ["Look consultation on WhatsApp", "Premium branded kits", "Hairstyle + draping included"],
    faqs: [
      { question: "Can two people book one slot?", answer: "Yes — add a Family Member Makeup add-on or book a Party Squad package for groups of 3+." },
    ],
  },
  {
    slug: "party-makeup-classic",
    categorySlug: "party-makeup",
    name: "Party Makeup",
    shortDescription: "Birthday, anniversary or girls' night — get camera-ready in 75 minutes.",
    description:
      "Quick, gorgeous and long-lasting party glam with base, eyes, lashes and a finished hairstyle. Perfect before any celebration.",
    startingPrice: 2499,
    durationMin: 75,
    rating: 4.8,
    reviewCount: 894,
    gradient: "from-violet-100 to-cream-100",
    emoji: "🥂",
    popular: true,
    packages: [
      { id: "party-essential", name: "Party Ready", tier: "essential", price: 2499, strikePrice: 3299, durationMin: 75, popular: true, includes: ["HD base makeup", "Party eyes + lashes", "Blow-dry or curls"] },
      { id: "party-premium", name: "Party Premium", tier: "premium", price: 3799, strikePrice: 4799, durationMin: 95, includes: ["Everything in Party Ready", "Premium products (Huda/MAC)", "Styled updo", "Touch-up kit"] },
    ],
    addOns: COMMON_ADDONS,
    highlights: ["75-minute express option", "Long-wear formulas", "Same-day slots available"],
    faqs: [],
  },

  /* ---------------- HAIR ---------------- */
  {
    slug: "haircut-styling",
    categorySlug: "hair",
    name: "Haircut & Styling",
    shortDescription: "Advanced cuts, layers, and styling by senior stylists at home.",
    description:
      "From blunt bobs to face-framing layers — our senior stylists carry professional shears, sectioning kits and finish every cut with a blow-dry.",
    startingPrice: 599,
    durationMin: 45,
    rating: 4.8,
    reviewCount: 1240,
    gradient: "from-amber-100 to-cream-100",
    emoji: "💇‍♀️",
    popular: false,
    enabled: false,
    packages: [
      { id: "cut-essential", name: "Classic Cut", tier: "essential", price: 599, strikePrice: 799, durationMin: 45, popular: true, includes: ["Consultation", "Shampoo-ready cut", "Blow-dry finish"] },
      { id: "cut-premium", name: "Cut + Style", tier: "premium", price: 999, strikePrice: 1299, durationMin: 70, includes: ["Advanced cut (layers/steps)", "Wash + conditioning", "Ironing or curls"] },
    ],
    addOns: [{ id: "addon-headmassage", name: "Head Massage (15 min)", price: 299, durationMin: 15 }, ...COMMON_ADDONS],
    highlights: ["Senior stylists only", "Sanitised professional tools", "Kids' cuts available"],
    faqs: [],
  },
  {
    slug: "hair-color",
    categorySlug: "hair",
    name: "Hair Colour",
    shortDescription: "Root touch-up to global colour with ammonia-free L'Oréal / Schwarzkopf.",
    description:
      "Certified colourists bring the salon colour bar home — root touch-ups, global colour, highlights and fashion shades with premium ammonia-free ranges.",
    startingPrice: 1099,
    durationMin: 90,
    rating: 4.7,
    reviewCount: 632,
    gradient: "from-orange-100 to-cream-100",
    emoji: "🎨",
    packages: [
      { id: "color-root", name: "Root Touch-Up", tier: "essential", price: 1099, strikePrice: 1399, durationMin: 60, includes: ["Ammonia-free colour", "Application + rinse", "Blow-dry"] },
      { id: "color-global", name: "Global Colour", tier: "premium", price: 2499, strikePrice: 3199, durationMin: 120, popular: true, includes: ["Full-length colour", "L'Oréal INOA range", "Post-colour spa rinse"] },
      { id: "color-highlights", name: "Highlights / Balayage", tier: "luxe", price: 3999, strikePrice: 5499, durationMin: 150, includes: ["Foil highlights or balayage", "Toner", "Olaplex-protected process"] },
    ],
    addOns: [{ id: "addon-olaplex", name: "Olaplex Bond Treatment", price: 999, durationMin: 20 }],
    highlights: ["Certified colourists", "Patch test on request", "Ammonia-free options"],
    faqs: [
      { question: "Do you do a patch test?", answer: "Yes — request a free patch test 48 hours before your appointment while booking." },
    ],
  },
  {
    slug: "keratin-smoothening",
    categorySlug: "hair",
    name: "Keratin & Smoothening",
    shortDescription: "Frizz-free, glass-smooth hair for up to 6 months.",
    description:
      "Professional keratin, smoothening and botox treatments using Cadiveu and GK ranges, executed with salon-grade irons and aftercare guidance.",
    startingPrice: 3499,
    durationMin: 150,
    rating: 4.8,
    reviewCount: 389,
    gradient: "from-yellow-100 to-cream-100",
    emoji: "✨",
    packages: [
      { id: "keratin-shoulder", name: "Keratin (Up to Shoulder)", tier: "premium", price: 3499, strikePrice: 4499, durationMin: 150, popular: true, includes: ["Keratin treatment", "Wash + blow-dry", "Aftercare kit guidance"] },
      { id: "keratin-waist", name: "Keratin (Below Shoulder)", tier: "luxe", price: 4999, strikePrice: 6499, durationMin: 180, includes: ["Keratin treatment", "Wash + blow-dry", "Free hair spa after 15 days"] },
    ],
    addOns: [],
    highlights: ["Formaldehyde-safe formulas", "Lasts 4–6 months", "Free aftercare consult"],
    faqs: [],
  },

  /* ---------------- SKIN ---------------- */
  {
    slug: "glow-facial",
    categorySlug: "skin-facial",
    name: "Signature Glow Facial",
    shortDescription: "Instant-radiance facial with cleanup, massage and glow mask.",
    description:
      "Our best-selling ritual: deep cleanse, exfoliation, de-tan, pressure-point face massage and a brightening peel-off mask — powered by O3+ and Lotus professional ranges.",
    startingPrice: 1299,
    durationMin: 75,
    rating: 4.8,
    reviewCount: 1560,
    gradient: "from-emerald-100 to-cream-100",
    emoji: "✨",
    popular: true,
    packages: [
      { id: "facial-glow", name: "Glow Ritual", tier: "essential", price: 1299, strikePrice: 1699, durationMin: 75, popular: true, includes: ["Deep cleanse + scrub", "10-min face massage", "Brightening mask", "Serum finish"] },
      { id: "facial-gold", name: "24K Gold Facial", tier: "premium", price: 2199, strikePrice: 2799, durationMin: 90, includes: ["Gold-infused ritual", "Anti-ageing massage", "Neck + shoulder relief", "Sheet mask finish"] },
      { id: "facial-hydra", name: "HydraGlow Luxe", tier: "luxe", price: 3499, strikePrice: 4499, durationMin: 105, includes: ["Hydra device cleanse", "AHA/BHA exfoliation", "Collagen mask", "SPF finish"] },
    ],
    addOns: COMMON_ADDONS,
    highlights: ["O3+, Lotus Pro, Casmara ranges", "Single-use sponges & spatulas", "Dermat-approved protocols"],
    faqs: [
      { question: "Which facial is right for my skin?", answer: "Tell us your skin type at checkout — oily, dry, sensitive or combination — and your beautician tailors actives accordingly. Sensitive skin gets a mandatory patch test." },
    ],
  },
  {
    slug: "cleanup-detan",
    categorySlug: "skin-facial",
    name: "Cleanup & De-Tan",
    shortDescription: "45-minute express cleanse, exfoliation and de-tan glow.",
    description:
      "A quick reset for dull, tanned skin: cleanse, scrub, de-tan pack and moisture seal. Perfect before events or as a monthly ritual.",
    startingPrice: 699,
    durationMin: 45,
    rating: 4.7,
    reviewCount: 980,
    gradient: "from-lime-100 to-cream-100",
    emoji: "🍋",
    packages: [
      { id: "cleanup-express", name: "Express Cleanup", tier: "essential", price: 699, strikePrice: 899, durationMin: 45, popular: true, includes: ["Cleanse + steam", "Scrub + blackhead removal", "Hydrating mask"] },
      { id: "cleanup-detan", name: "Cleanup + De-Tan", tier: "premium", price: 1099, strikePrice: 1399, durationMin: 60, includes: ["Everything in Express", "De-tan pack (face + neck)", "SPF finish"] },
    ],
    addOns: COMMON_ADDONS,
    highlights: ["Great monthly ritual", "Same-day slots", "Pairs well with waxing"],
    faqs: [],
  },

  /* ---------------- SPA ---------------- */
  {
    slug: "aroma-spa",
    categorySlug: "spa-wellness",
    name: "Aromatherapy Body Spa",
    shortDescription: "60–90 min full-body aroma massage by certified therapists.",
    description:
      "Certified female therapists bring the spa home: aromatherapy oils, Swedish strokes and optional head-to-toe rituals, with disposable linens and a portable spa setup.",
    startingPrice: 1499,
    durationMin: 60,
    rating: 4.9,
    reviewCount: 745,
    gradient: "from-teal-100 to-cream-100",
    emoji: "🌿",
    popular: true,
    packages: [
      { id: "spa-aroma60", name: "Aroma Relax (60 min)", tier: "essential", price: 1499, strikePrice: 1899, durationMin: 60, popular: true, includes: ["Full-body aroma massage", "Choice of oils", "Disposable linens"] },
      { id: "spa-swedish90", name: "Swedish Deep (90 min)", tier: "premium", price: 2199, strikePrice: 2799, durationMin: 90, includes: ["Deep-pressure Swedish massage", "Head + foot focus", "Hot towel finish"] },
      { id: "spa-royal", name: "Royal Ritual (120 min)", tier: "luxe", price: 3299, strikePrice: 4199, durationMin: 120, includes: ["Body scrub + wrap", "90-min massage", "Express glow facial"] },
    ],
    addOns: [{ id: "addon-scrub", name: "Body Scrub (20 min)", price: 599, durationMin: 20 }],
    highlights: ["Certified therapists", "Female therapists for female clients", "Portable spa setup included"],
    faqs: [
      { question: "What do I need to arrange at home?", answer: "Nothing — the therapist carries a foldable spa bed, fresh disposable linens, oils and music. You just need a quiet room." },
    ],
  },

  /* ---------------- WAXING ---------------- */
  {
    slug: "full-body-waxing",
    categorySlug: "waxing",
    name: "Full Body Waxing",
    shortDescription: "Rica / chocolate full-body waxing with single-use hygiene kit.",
    description:
      "Full arms, legs, underarms and more with premium Rica or chocolate wax. Strict no-double-dip policy, disposable spatulas and post-wax soothing gel.",
    startingPrice: 1199,
    durationMin: 75,
    rating: 4.8,
    reviewCount: 1105,
    gradient: "from-orange-100 to-cream-100",
    emoji: "🪶",
    popular: true,
    packages: [
      { id: "wax-essential", name: "Arms + Legs + Underarms", tier: "essential", price: 1199, strikePrice: 1499, durationMin: 60, popular: true, includes: ["Honey or chocolate wax", "Post-wax soothing gel"] },
      { id: "wax-rica", name: "Full Body Rica", tier: "premium", price: 2299, strikePrice: 2899, durationMin: 90, includes: ["Rica wax full body", "Threading (brows + lip)", "Moisture seal"] },
    ],
    addOns: [{ id: "addon-bikini", name: "Bikini Wax (Rica)", price: 899, durationMin: 30 }, ...COMMON_ADDONS],
    highlights: ["No double-dipping, ever", "Rica & peel-off options", "Female beauticians only"],
    faqs: [],
  },

  /* ---------------- MANI-PEDI ---------------- */
  {
    slug: "manicure-pedicure",
    categorySlug: "mani-pedi",
    name: "Manicure & Pedicure",
    shortDescription: "Classic to luxury spa mani-pedi with imported scrubs and OPI polish.",
    description:
      "Soak, scrub, cuticle care, massage and polish — from a quick classic to the AVL luxury ritual with paraffin masks.",
    startingPrice: 899,
    durationMin: 75,
    rating: 4.8,
    reviewCount: 867,
    gradient: "from-pink-100 to-cream-100",
    emoji: "💅",
    popular: true,
    packages: [
      { id: "mp-classic", name: "Classic Mani-Pedi", tier: "essential", price: 899, strikePrice: 1199, durationMin: 75, popular: true, includes: ["Soak + scrub", "Cuticle care + shaping", "Massage + polish"] },
      { id: "mp-spa", name: "Spa Mani-Pedi", tier: "premium", price: 1499, strikePrice: 1899, durationMin: 95, includes: ["AVL spa ritual", "De-tan pack", "Extended massage", "OPI polish"] },
    ],
    addOns: [{ id: "addon-nailart", name: "Minimal Nail Art (2 nails)", price: 299, durationMin: 20 }],
    highlights: ["Sterilised steel tools", "Single-use liners for soak tubs", "OPI / Kiko polish bar"],
    faqs: [],
  },

  /* ---------------- GROOM ---------------- */
  {
    slug: "groom-glow",
    categorySlug: "groom",
    name: "Groom Glow Package",
    shortDescription: "Facial, haircut, beard styling and de-tan for the big day.",
    description:
      "A complete pre-event ritual for men: brightening facial, precision haircut, beard sculpting and de-tan — by male grooming experts.",
    startingPrice: 1999,
    durationMin: 105,
    rating: 4.7,
    reviewCount: 356,
    gradient: "from-slate-200 to-cream-100",
    emoji: "🤵",
    packages: [
      { id: "groom-essential", name: "Groom Refresh", tier: "essential", price: 1999, strikePrice: 2599, durationMin: 90, popular: true, includes: ["Glow facial", "Haircut", "Beard trim + shape"] },
      { id: "groom-royal", name: "Groom Royale", tier: "premium", price: 3499, strikePrice: 4499, durationMin: 150, includes: ["24K gold facial", "Premium cut + style", "Beard spa", "De-tan (face + arms)", "Head massage"] },
    ],
    addOns: [{ id: "addon-hairwash-m", name: "Hair Wash + Styling", price: 299, durationMin: 20 }],
    highlights: ["Male grooming specialists", "Wedding-week scheduling", "Pairs with bridal bookings"],
    faqs: [],
  },

  /* ---------------- MEHENDI ---------------- */
  {
    slug: "bridal-mehendi",
    categorySlug: "mehendi",
    name: "Bridal Mehendi",
    shortDescription: "Intricate bridal mehendi by award-winning artists, 100% natural henna.",
    description:
      "Traditional, Arabic, Indo-Arabic or figurative bridal designs — full hands and feet — by artists with 500+ bridal portfolios. Natural, chemical-free henna cones made in-house.",
    startingPrice: 3499,
    durationMin: 180,
    rating: 4.9,
    reviewCount: 289,
    gradient: "from-lime-100 to-cream-100",
    emoji: "🌺",
    packages: [
      { id: "mehendi-bridal", name: "Bridal (Hands + Feet)", tier: "premium", price: 3499, strikePrice: 4499, durationMin: 180, popular: true, includes: ["Full hands up to elbow", "Feet up to ankle", "Design consultation", "Natural henna cones"] },
      { id: "mehendi-family", name: "Family Add-On (per person)", tier: "essential", price: 499, strikePrice: 699, durationMin: 30, includes: ["Single-side hands", "Arabic or minimal design"] },
    ],
    addOns: [],
    highlights: ["100% natural henna", "Design portfolio on WhatsApp", "Group bookings for sangeet"],
    faqs: [],
  },

  /* ---------------- SENIOR CARE ---------------- */
  {
    slug: "senior-grooming",
    categorySlug: "senior-care",
    name: "Senior Citizen Grooming",
    shortDescription: "Gentle haircuts, grooming and pampering for elders at home.",
    description:
      "Patient, gentle beauticians trained in elder care provide haircuts, grooming, manicures and relaxing massages — at the elder's own pace, in their own home.",
    startingPrice: 799,
    durationMin: 60,
    rating: 4.9,
    reviewCount: 174,
    gradient: "from-sky-100 to-cream-100",
    emoji: "🤍",
    packages: [
      { id: "senior-groom", name: "Senior Grooming", tier: "essential", price: 799, strikePrice: 999, durationMin: 60, popular: true, includes: ["Gentle haircut", "Nail care", "Head massage"] },
      { id: "senior-pamper", name: "Senior Pamper Day", tier: "premium", price: 1499, strikePrice: 1899, durationMin: 100, includes: ["Haircut + grooming", "Mild facial", "Hand + foot massage"] },
    ],
    addOns: [],
    highlights: ["Elder-care trained staff", "Mobility-friendly setup", "Family can book on their behalf"],
    faqs: [],
  },
];

/* ---------------- MEMBERSHIPS ---------------- */

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "glow",
    name: "GlamNest Glow",
    pricePerMonth: 299,
    billedAnnually: 2999,
    tagline: "For your monthly ritual",
    perks: [
      "10% off all services",
      "Free threading with every booking",
      "Priority customer support",
      "Member-only monthly offers",
    ],
  },
  {
    id: "luxe",
    name: "GlamNest Luxe",
    pricePerMonth: 599,
    billedAnnually: 5999,
    tagline: "Our most-loved plan",
    highlight: true,
    perks: [
      "15% off all services",
      "1 free Express Cleanup every month",
      "Free add-on worth ₹199 per booking",
      "Priority slots & same-day booking",
      "Dedicated relationship manager",
    ],
  },
  {
    id: "royale",
    name: "GlamNest Royale",
    pricePerMonth: 999,
    billedAnnually: 9999,
    tagline: "The full luxury experience",
    perks: [
      "20% off all services",
      "1 free Glow Facial every month",
      "Free spa upgrade twice a year",
      "Celebrity artist priority for events",
      "Complimentary birthday pamper session",
    ],
  },
];

/* ---------------- OCCASION PACKAGES ---------------- */

export const BEAUTY_PACKAGES: BeautyPackage[] = [
  {
    slug: "wedding-glow-journey",
    name: "Wedding Glow Journey",
    occasion: "Bride-to-be · 3 months",
    price: 14999,
    strikePrice: 19999,
    durationMin: 0,
    gradient: "from-rose-200 to-cream-100",
    emoji: "💍",
    popular: true,
    includes: [
      "6 facials (fortnightly glow plan)",
      "3 full-body Rica waxing sessions",
      "2 hair spas + 1 keratin treatment",
      "2 spa mani-pedis",
      "Free bridal trial session",
    ],
  },
  {
    slug: "party-squad",
    name: "Party Squad",
    occasion: "Groups of 3+",
    price: 5999,
    strikePrice: 7499,
    durationMin: 180,
    gradient: "from-fuchsia-100 to-cream-100",
    emoji: "🥂",
    includes: [
      "Party makeup for 3 people",
      "Hairstyling for 3 people",
      "1 beautician team, 1 visit",
      "Add extra members at ₹1,799 each",
    ],
  },
  {
    slug: "monthly-essentials",
    name: "Monthly Essentials",
    occasion: "Every month, sorted",
    price: 1799,
    strikePrice: 2399,
    durationMin: 150,
    gradient: "from-emerald-100 to-cream-100",
    emoji: "🌸",
    includes: [
      "Full arms + legs + underarms waxing",
      "Express cleanup",
      "Threading (brows + lip)",
      "Classic pedicure",
    ],
  },
  {
    slug: "groom-wedding-week",
    name: "Groom Wedding Week",
    occasion: "Groom-to-be · 7 days",
    price: 6999,
    strikePrice: 8999,
    durationMin: 0,
    gradient: "from-slate-200 to-cream-100",
    emoji: "🤵",
    includes: [
      "2 brightening facials",
      "Premium haircut + beard sculpting",
      "Full-body de-tan",
      "Relaxation massage before the big day",
    ],
  },
];

/* ---------------- LOOKUPS ---------------- */

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getServicesByCategory(categorySlug: string, opts?: { includeDisabled?: boolean }) {
  return SERVICES.filter(
    (s) => s.categorySlug === categorySlug && (opts?.includeDisabled || s.enabled !== false)
  );
}

export function getService(categorySlug: string, slug: string, opts?: { includeDisabled?: boolean }) {
  const service = SERVICES.find((s) => s.categorySlug === categorySlug && s.slug === slug);
  if (!service) return undefined;
  if (!opts?.includeDisabled && service.enabled === false) return undefined;
  return service;
}

export function getPopularServices(opts?: { includeDisabled?: boolean }) {
  return SERVICES.filter((s) => s.popular && (opts?.includeDisabled || s.enabled !== false));
}

export function isServiceEnabledByDefault(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug);
  return service ? service.enabled !== false : false;
}
