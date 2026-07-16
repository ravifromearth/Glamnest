/** Shared domain types for the GlamNest catalog and booking engine. */

export interface ServicePackage {
  id: string;
  name: string;
  tier: "essential" | "premium" | "luxe";
  price: number;
  strikePrice?: number;
  durationMin: number;
  includes: string[];
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  durationMin: number;
}

export interface Service {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  durationMin: number;
  rating: number;
  reviewCount: number;
  gradient: string; // tailwind gradient classes for the visual card
  emoji: string;
  packages: ServicePackage[];
  addOns: AddOn[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
  popular?: boolean;
  /** When false, hidden from customer catalog/booking. Admin can override via local flags. */
  enabled?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // lucide icon name
  gradient: string;
  emoji: string;
  heroLine: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  pricePerMonth: number;
  billedAnnually: number;
  tagline: string;
  perks: string[];
  highlight?: boolean;
}

export interface BeautyPackage {
  slug: string;
  name: string;
  occasion: string;
  price: number;
  strikePrice: number;
  durationMin: number;
  includes: string[];
  gradient: string;
  emoji: string;
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  locality: string;
  city: string;
  rating: number;
  service: string;
  quote: string;
  initials: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  gradient: string;
  emoji: string;
  content: { heading?: string; paragraphs: string[] }[];
}
