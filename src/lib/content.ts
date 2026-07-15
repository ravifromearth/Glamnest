import type { BlogPost, Testimonial } from "./types";

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sinha",
    locality: "Boring Road",
    city: "Patna",
    rating: 5,
    service: "HD Bridal Makeup",
    quote:
      "My bridal makeup was flawless from the jaimala to the vidaai — 9 straight hours. The artist arrived early, the kit was sealed, and my photos look unreal. Worth every rupee.",
    initials: "PS",
  },
  {
    name: "Anamika Kumari",
    locality: "Kankarbagh",
    city: "Patna",
    rating: 5,
    service: "Signature Glow Facial",
    quote:
      "I was skeptical about salon-at-home, but the hygiene changed my mind — every sponge and spatula came out of a sealed pouch. My monthly facial is now a GlamNest ritual.",
    initials: "AK",
  },
  {
    name: "Ritu Verma",
    locality: "Bailey Road",
    city: "Patna",
    rating: 5,
    service: "Full Body Rica Waxing",
    quote:
      "As a working mom, saving 3 hours of salon travel every month is priceless. The beautician is always on time and my regular now knows exactly how I like everything.",
    initials: "RV",
  },
  {
    name: "Shalini Gupta",
    locality: "Rajendra Nagar",
    city: "Patna",
    rating: 4.5,
    service: "Keratin Treatment",
    quote:
      "Got a keratin done at home for almost half of what the big salons quoted, with the same Cadiveu products. Six weeks in and my hair is still glass-smooth.",
    initials: "SG",
  },
  {
    name: "Rohit Ranjan",
    locality: "Patliputra Colony",
    city: "Patna",
    rating: 5,
    service: "Groom Royale Package",
    quote:
      "Booked the groom package before my wedding week. Facial, haircut, beard spa — all at home while I handled wedding chaos. The convenience is honestly unmatched.",
    initials: "RR",
  },
  {
    name: "Neha Prakash",
    locality: "Danapur",
    city: "Patna",
    rating: 5,
    service: "Aromatherapy Body Spa",
    quote:
      "The therapist brought a full spa bed, fresh linens and soft music. For an hour my bedroom was a five-star spa. I've already gifted two sessions to my mother.",
    initials: "NP",
  },
];

export const BEFORE_AFTER = [
  { service: "Bridal Makeup", locality: "Boring Road, Patna", emoji: "👰", beforeShade: "from-stone-200 to-stone-100", afterShade: "from-rose-200 to-amber-100" },
  { service: "Hair Colour & Style", locality: "Kankarbagh, Patna", emoji: "💇‍♀️", beforeShade: "from-stone-200 to-stone-100", afterShade: "from-amber-200 to-orange-100" },
  { service: "24K Gold Facial", locality: "Bailey Road, Patna", emoji: "✨", beforeShade: "from-stone-200 to-stone-100", afterShade: "from-yellow-100 to-emerald-100" },
  { service: "Bridal Mehendi", locality: "Rajendra Nagar, Patna", emoji: "🌺", beforeShade: "from-stone-200 to-stone-100", afterShade: "from-lime-100 to-orange-100" },
];

export const STATS = [
  { value: "25,000+", label: "Services Delivered" },
  { value: "4.8★", label: "Average Rating" },
  { value: "350+", label: "Verified Professionals" },
  { value: "40+", label: "Localities in Patna" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "bridal-skin-prep-timeline",
    title: "The 90-Day Bridal Skin Prep Timeline Every Bride Needs",
    excerpt:
      "Glowing bridal skin isn't a one-facial miracle — it's a 12-week ritual. Here's the exact timeline our senior bridal artists recommend.",
    category: "Bridal",
    author: "Meera Joshi",
    authorRole: "Head of Bridal Artistry",
    publishedAt: "2026-06-18",
    readMinutes: 6,
    gradient: "from-rose-200 to-cream-100",
    emoji: "👰",
    content: [
      {
        paragraphs: [
          "Every bride wants that lit-from-within glow, but the secret is rarely the makeup itself — it's the canvas underneath. Our bridal artists see the difference a structured prep timeline makes on hundreds of faces every wedding season.",
        ],
      },
      {
        heading: "Days 90–60: Build the foundation",
        paragraphs: [
          "Start with a professional skin analysis and a monthly deep-cleansing facial. This is the window to treat tanning, pigmentation and texture — actives need weeks to show results.",
          "Begin a simple home routine: gentle cleanser, vitamin C serum in the morning, moisturiser and SPF 50. Consistency beats complexity.",
        ],
      },
      {
        heading: "Days 60–30: Ritual and rhythm",
        paragraphs: [
          "Move to fortnightly facials alternating between hydration and brightening. Add a weekly hair spa — bridal hairstyles hold dramatically better on conditioned hair.",
          "This is also when to schedule your first waxing session so your skin's sensitivity pattern is known well before the wedding week.",
        ],
      },
      {
        heading: "The final 30 days",
        paragraphs: [
          "Your last facial should be 5–7 days before the wedding — never the day before. Book your bridal trial in this window too, wearing your outfit's dupatta shade.",
          "In the final week: sleep, water, and zero new products. Let your skin coast into the big day calm and predictable.",
        ],
      },
    ],
  },
  {
    slug: "rica-vs-normal-wax",
    title: "Rica vs Regular Wax: What's Actually Worth Paying For?",
    excerpt:
      "Rica costs more per session — but is it hype or genuinely better for your skin? A beautician's honest breakdown.",
    category: "Skin",
    author: "Sunita Devi",
    authorRole: "Senior Beautician, Patna",
    publishedAt: "2026-06-02",
    readMinutes: 4,
    gradient: "from-orange-100 to-cream-100",
    emoji: "🪶",
    content: [
      {
        paragraphs: [
          "The most common question we hear at doorsteps across Patna: 'Didi, Rica lagwaun ya normal?' Here's the honest answer, without the upsell.",
        ],
      },
      {
        heading: "What makes Rica different",
        paragraphs: [
          "Rica is a white chocolate liposoluble wax from Italy, made without colophony — the pine resin in regular wax that most commonly triggers redness and post-wax bumps.",
          "It grips hair at a lower temperature, which means less pulling on the skin and noticeably less pain, especially on sensitive areas.",
        ],
      },
      {
        heading: "When regular wax is fine",
        paragraphs: [
          "If you've waxed for years with no reaction, honey wax on arms and legs is perfectly fine and easier on the wallet.",
          "Choose Rica for underarms, bikini and face — or if you have sensitive, acne-prone or first-time skin. Whatever you choose, insist on single-use spatulas. We never double-dip; no one touching your skin should.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-hair-care-guide",
    title: "Monsoon Hair Survival Guide for Bihar's Humidity",
    excerpt:
      "Frizz, flat roots and sudden hairfall — Patna's monsoon is brutal on hair. Our stylists share the routine that actually works.",
    category: "Hair",
    author: "Farhan Ali",
    authorRole: "Senior Hairstylist",
    publishedAt: "2026-07-05",
    readMinutes: 5,
    gradient: "from-teal-100 to-cream-100",
    emoji: "🌧️",
    content: [
      {
        paragraphs: [
          "When humidity crosses 80%, hair cuticles swell, frizz explodes and everything you styled collapses by noon. Here's how our stylists keep client hair alive from June to September.",
        ],
      },
      {
        heading: "Wash smarter, not more",
        paragraphs: [
          "Sweat and rainwater buildup make scalps oilier in monsoon, but daily shampooing strips the barrier and doubles the oil production. Stick to alternate days with a gentle sulphate-free formula, and always — always — dry your roots fully.",
        ],
      },
      {
        heading: "The monthly fix",
        paragraphs: [
          "A monthly hair spa is the single highest-impact monsoon habit: it seals the cuticle so humidity has less to grab onto. If frizz rules your life, a keratin treatment before peak monsoon lasts through the entire season.",
        ],
      },
    ],
  },
  {
    slug: "at-home-salon-hygiene-checklist",
    title: "The 7-Point Hygiene Checklist for Any At-Home Beauty Service",
    excerpt:
      "Inviting a beautician home? Here's exactly what to check before anyone touches your skin — the standard we hold ourselves to.",
    category: "Trust & Safety",
    author: "Dr. Kavita Rao",
    authorRole: "Hygiene & Training Advisor",
    publishedAt: "2026-05-20",
    readMinutes: 4,
    gradient: "from-emerald-100 to-cream-100",
    emoji: "🧼",
    content: [
      {
        paragraphs: [
          "At-home beauty is only as premium as its hygiene. Whether you book with GlamNest or anyone else, these seven checks are non-negotiable.",
        ],
      },
      {
        heading: "The checklist",
        paragraphs: [
          "1. Sealed kit — products and applicators should be opened in front of you. 2. Single-use sponges, spatulas and files. 3. Sterilised steel tools carried in a closed pouch. 4. Fresh disposable linens for spa and waxing. 5. Hand sanitisation before starting. 6. No double-dipping in wax, ever. 7. A verified professional profile you can see before they arrive.",
          "Every GlamNest professional is audited on all seven points, every month, with customer-reported checks after each booking.",
        ],
      },
    ],
  },
  {
    slug: "facial-frequency-by-skin-type",
    title: "How Often Should You Really Get a Facial? By Skin Type",
    excerpt:
      "Monthly? Fortnightly? Only before events? The right facial frequency depends on your skin type — here's the dermat-approved answer.",
    category: "Skin",
    author: "Dr. Kavita Rao",
    authorRole: "Hygiene & Training Advisor",
    publishedAt: "2026-04-28",
    readMinutes: 5,
    gradient: "from-blush-100 to-cream-100",
    emoji: "✨",
    content: [
      {
        paragraphs: [
          "Your skin completes a full renewal cycle roughly every 28 days — which is why the classic 'monthly facial' advice exists. But the ideal rhythm shifts with your skin type and season.",
        ],
      },
      {
        heading: "By skin type",
        paragraphs: [
          "Oily and congestion-prone skin benefits from every 3 weeks, focusing on deep cleansing. Dry skin does best monthly with hydration-first rituals. Sensitive skin should stretch to every 5–6 weeks with gentle, fragrance-free protocols and a mandatory patch test.",
          "Combination skin? Alternate: deep-cleanse one month, hydrate the next. And before big events, schedule your facial 5–7 days out — never the day before.",
        ],
      },
    ],
  },
  {
    slug: "why-beauticians-love-glamnest",
    title: "From Salon Chair to CEO of Her Own Day: Beautician Stories",
    excerpt:
      "Meet the professionals behind GlamNest — women building independent careers with flexible hours and double the earnings.",
    category: "Community",
    author: "Team GlamNest",
    authorRole: "Editorial",
    publishedAt: "2026-03-15",
    readMinutes: 6,
    gradient: "from-violet-100 to-cream-100",
    emoji: "💜",
    content: [
      {
        paragraphs: [
          "Behind every GlamNest booking is a professional who chose independence. Over 70% of our partners are women who previously worked fixed 11-hour salon shifts for a fraction of what their skills earned.",
        ],
      },
      {
        heading: "The partner model",
        paragraphs: [
          "Partners set their own availability, choose their service areas, and keep the majority of every booking. Training, kits and insurance come from us; the schedule stays theirs.",
          "Sunita, one of our first Patna partners, now earns 2.3× her old salon salary working six hours a day — and picks her daughter up from school every afternoon. That's the marketplace we're building.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const FAQS = [
  {
    question: "Which areas of Patna do you serve?",
    answer:
      "We currently serve 40+ localities across Patna including Boring Road, Bailey Road, Kankarbagh, Rajendra Nagar, Patliputra Colony, Danapur, Ashiana Nagar and Phulwari Sharif. Enter your address at checkout to confirm availability.",
  },
  {
    question: "Are your beauticians verified?",
    answer:
      "Yes. Every professional completes government ID and address verification, a police-record check, skill certification at our training academy, and monthly hygiene audits before and while serving customers.",
  },
  {
    question: "What products do you use?",
    answer:
      "Only premium branded ranges — O3+, Lotus Professional, Rica, L'Oréal, Cadiveu, MAC and Huda Beauty depending on the service. Kits are sealed and single-use items are opened in front of you.",
  },
  {
    question: "How do I pay?",
    answer:
      "Pay online via UPI, cards, net banking or wallets through Razorpay, or choose pay-after-service in cash or UPI. Members get additional wallet cashback on prepaid bookings.",
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes — reschedule free up to 2 hours before your slot from the app or website. Cancellations up to 2 hours prior are fully refunded to your original payment method or wallet.",
  },
  {
    question: "What if I'm not happy with a service?",
    answer:
      "Every booking is backed by the GlamNest Promise: report an issue within 24 hours and we'll offer a free redo or a refund after review. Our support team responds within 30 minutes, 7 AM–9 PM.",
  },
  {
    question: "Do you serve men?",
    answer:
      "Yes — our Groom and men's grooming services cover facials, haircuts, beard styling and massage, delivered by male grooming specialists.",
  },
  {
    question: "Is there a membership plan?",
    answer:
      "Three: Glow (₹299/mo), Luxe (₹599/mo) and Royale (₹999/mo) — with service discounts, free monthly services and priority slots. See the Membership page for details.",
  },
];
