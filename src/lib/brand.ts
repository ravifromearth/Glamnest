/**
 * GlamNest brand constants — single source of truth for identity,
 * contact details and service geography.
 */

export const BRAND = {
  name: "GlamNest",
  tagline: "Beauty Comes Home",
  headline: "Premium Beauty Services At Your Doorstep",
  subheadline: "Book trusted beauty professionals across Patna in minutes.",
  domain: "https://glamnest.in",
  phone: "+91 8002708000",
  whatsapp: "+918002708000",
  email: "care@glamnest.in",
  address: {
    line1: "Satyam Technology Bhawan",
    line2: "Digha",
    city: "Patna",
    state: "Bihar",
    pincode: "800012",
    country: "IN",
  },
  social: {
    instagram: "https://instagram.com/glamnest.in",
    facebook: "https://facebook.com/glamnest.in",
    youtube: "https://youtube.com/@glamnest",
    twitter: "https://x.com/glamnest_in",
  },
  hours: "7:00 AM – 9:00 PM, all 7 days",
} as const;

/** Digits-only WhatsApp / tel target, e.g. 918002708000 */
export function brandWhatsAppDigits() {
  return BRAND.whatsapp.replace(/\D/g, "");
}

/** Build a wa.me link, optionally with a prefilled message. */
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${brandWhatsAppDigits()}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export interface City {
  name: string;
  state: string;
  slug: string;
  status: "live" | "coming-soon";
  latitude: number;
  longitude: number;
}

export const CITIES: City[] = [
  { name: "Patna", state: "Bihar", slug: "patna", status: "live", latitude: 25.5941, longitude: 85.1376 },
  { name: "Muzaffarpur", state: "Bihar", slug: "muzaffarpur", status: "coming-soon", latitude: 26.1225, longitude: 85.3906 },
  { name: "Gaya", state: "Bihar", slug: "gaya", status: "coming-soon", latitude: 24.7914, longitude: 85.0002 },
  { name: "Bhagalpur", state: "Bihar", slug: "bhagalpur", status: "coming-soon", latitude: 25.2425, longitude: 86.9842 },
  { name: "Darbhanga", state: "Bihar", slug: "darbhanga", status: "coming-soon", latitude: 26.1542, longitude: 85.8918 },
  { name: "Ranchi", state: "Jharkhand", slug: "ranchi", status: "coming-soon", latitude: 23.3441, longitude: 85.3096 },
  { name: "Varanasi", state: "Uttar Pradesh", slug: "varanasi", status: "coming-soon", latitude: 25.3176, longitude: 82.9739 },
  { name: "Lucknow", state: "Uttar Pradesh", slug: "lucknow", status: "coming-soon", latitude: 26.8467, longitude: 80.9462 },
];

export const LIVE_CITIES = CITIES.filter((c) => c.status === "live");

export const TRUST_POINTS = [
  {
    title: "Verified Professionals",
    description: "Every beautician is background-verified, trained and certified before their first booking.",
    icon: "BadgeCheck",
  },
  {
    title: "Hygienic Products",
    description: "Single-use kits and premium branded products, sealed and opened in front of you.",
    icon: "Sparkles",
  },
  {
    title: "Transparent Pricing",
    description: "What you see is what you pay. No hidden charges, no surprises at the door.",
    icon: "IndianRupee",
  },
  {
    title: "Doorstep Convenience",
    description: "Salon-grade services in the comfort and safety of your own home.",
    icon: "Home",
  },
  {
    title: "Easy Booking",
    description: "Pick a service, choose a slot and pay online — all in under two minutes.",
    icon: "CalendarCheck",
  },
] as const;

export const HOW_IT_WORKS = [
  { step: 1, title: "Choose Service", description: "Browse our menu and pick exactly what you need.", icon: "LayoutGrid" },
  { step: 2, title: "Select Time", description: "Choose a date and a real-time slot that suits you.", icon: "Clock" },
  { step: 3, title: "Beautician Arrives", description: "A verified professional reaches your doorstep with a sealed kit.", icon: "DoorOpen" },
  { step: 4, title: "Enjoy Service", description: "Relax at home while we bring the salon to you.", icon: "HeartHandshake" },
] as const;
