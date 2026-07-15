import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Gift,
  MessageCircle,
  Plus,
  Sparkles,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { AccountGreeting } from "@/components/auth/account-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "My Account",
    description: "Your GlamNest dashboard — bookings, wallet, rewards and more.",
    path: "/account",
  }),
  robots: { index: false, follow: false },
};

const QUICK_STATS = [
  { label: "Bookings", value: "12", icon: CalendarDays, href: "/account/bookings" },
  { label: "Wallet", value: formatINR(450), icon: Wallet, href: "/account/wallet" },
  { label: "Glow points", value: "320", icon: Gift, href: "/account/rewards" },
  { label: "Coupons", value: "2", icon: Ticket, href: "/account/coupons" },
];

const QUICK_ACTIONS = [
  { label: "Book a service", description: "Facials, hair, spa & more", icon: Plus, href: "/booking" },
  { label: "Refer & earn ₹300", description: "Share your code ANANYA300", icon: Users, href: "/account/referrals" },
  { label: "Redeem points", description: "320 points waiting", icon: Gift, href: "/account/rewards" },
  { label: "Manage membership", description: "Luxe · renews 03 Aug", icon: Sparkles, href: "/account/membership" },
];

const RECENT_ACTIVITY = [
  { title: "Booking confirmed — Signature Glow Facial", detail: "18 Jul 2026, 11:00 AM · GN2026481253", time: "2 days ago", icon: BadgeCheck },
  { title: "₹75 cashback credited to wallet", detail: "UPI payment cashback on GN2026471102", time: "6 days ago", icon: Wallet },
  { title: "You earned 40 glow points", detail: "Completed: Spa Mani-Pedi with Farhan Ali", time: "2 weeks ago", icon: Gift },
  { title: "Riya joined with your referral code", detail: "₹300 bonus will credit after her first booking", time: "3 weeks ago", icon: Users },
];

export default function AccountOverviewPage() {
  return (
    <div className="space-y-8">
      <AccountGreeting />

      {/* Next booking */}
      <section
        aria-label="Next booking"
        className="rounded-3xl border border-ink-950/8 bg-ink-950 p-6 shadow-soft md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-gold-500/15 text-3xl" aria-hidden>
              ✨
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
                Next booking
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-cream-50 md:text-2xl">
                Signature Glow Facial
              </h2>
              <p className="mt-1 text-sm text-cream-200/80">
                Sat, 18 Jul 2026 · 11:00 AM · with Pooja Kumari
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="gold">Confirmed</Badge>
                <span className="text-xs text-cream-200/60">Booking ID GN2026481253</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar initials="PK" />
            <Link href="/account/bookings">
              <Button variant="outline-light" size="sm">
                Manage
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section aria-label="Quick stats" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {QUICK_STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lift"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-gold-500/12 text-gold-700">
              <stat.icon className="size-4.5" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-ink-950">{stat.value}</p>
            <p className="text-xs font-medium text-ink-500">{stat.label}</p>
          </Link>
        ))}
      </section>

      {/* Quick actions */}
      <section aria-label="Quick actions">
        <h2 className="font-display text-xl font-semibold text-ink-950">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-4 rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lift"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-gold-700 transition-colors group-hover:bg-gold-500/15">
                <action.icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink-950">{action.label}</span>
                <span className="block truncate text-xs text-ink-500">{action.description}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section aria-label="Recent activity">
        <h2 className="font-display text-xl font-semibold text-ink-950">Recent activity</h2>
        <div className="mt-4 divide-y divide-ink-950/6 rounded-3xl border border-ink-950/8 bg-white shadow-soft">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-100 text-gold-700">
                <item.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-950">{item.title}</p>
                <p className="mt-0.5 text-xs text-ink-500">{item.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-ink-400">{item.time}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-ink-400">
          <MessageCircle className="size-3.5" />
          Need anything? Reply to any GlamNest WhatsApp message and a human answers within minutes.
        </p>
      </section>
    </div>
  );
}
