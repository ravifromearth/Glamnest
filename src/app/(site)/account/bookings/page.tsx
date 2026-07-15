import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, RotateCcw, Star, User, X } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "My Bookings",
    description: "Upcoming and past GlamNest bookings.",
    path: "/account/bookings",
  }),
  robots: { index: false, follow: false },
};

type BookingStatus = "CONFIRMED" | "BEAUTICIAN_ASSIGNED" | "COMPLETED" | "CANCELLED";

interface MockBooking {
  id: string;
  service: string;
  emoji: string;
  pkg: string;
  date: string;
  slot: string;
  beautician: string;
  address: string;
  amount: number;
  status: BookingStatus;
  serviceSlug: string;
}

const STATUS_META: Record<BookingStatus, { label: string; variant: "success" | "info" | "cream" | "danger" }> = {
  CONFIRMED: { label: "Confirmed", variant: "success" },
  BEAUTICIAN_ASSIGNED: { label: "Beautician assigned", variant: "info" },
  COMPLETED: { label: "Completed", variant: "cream" },
  CANCELLED: { label: "Cancelled", variant: "danger" },
};

const UPCOMING: MockBooking[] = [
  {
    id: "GN2026481253",
    service: "Signature Glow Facial",
    emoji: "✨",
    pkg: "24K Gold Facial",
    date: "Sat, 18 Jul 2026",
    slot: "11:00 AM",
    beautician: "Babli Singh",
    address: "Home · Ashiana Nagar, Patna",
    amount: 2199,
    status: "CONFIRMED",
    serviceSlug: "glow-facial",
  },
  {
    id: "GN2026482017",
    service: "Full Body Waxing",
    emoji: "🪶",
    pkg: "Full Body Rica",
    date: "Fri, 24 Jul 2026",
    slot: "04:00 PM",
    beautician: "Priyanka Singh",
    address: "Home · Ashiana Nagar, Patna",
    amount: 2299,
    status: "BEAUTICIAN_ASSIGNED",
    serviceSlug: "full-body-waxing",
  },
];

const HISTORY: MockBooking[] = [
  {
    id: "GN2026471102",
    service: "Spa Mani-Pedi",
    emoji: "💅",
    pkg: "Spa Mani-Pedi",
    date: "Tue, 30 Jun 2026",
    slot: "05:00 PM",
    beautician: "Sadhna Singh",
    address: "Home · Ashiana Nagar, Patna",
    amount: 1499,
    status: "COMPLETED",
    serviceSlug: "manicure-pedicure",
  },
  {
    id: "GN2026465540",
    service: "Haircut & Styling",
    emoji: "💇‍♀️",
    pkg: "Cut + Style",
    date: "Sun, 14 Jun 2026",
    slot: "12:00 PM",
    beautician: "Babli Singh",
    address: "Work · Gandhi Maidan, Patna",
    amount: 999,
    status: "COMPLETED",
    serviceSlug: "haircut-styling",
  },
  {
    id: "GN2026458821",
    service: "Cleanup & De-Tan",
    emoji: "🍋",
    pkg: "Cleanup + De-Tan",
    date: "Sat, 23 May 2026",
    slot: "10:00 AM",
    beautician: "Sadhna Singh",
    address: "Home · Ashiana Nagar, Patna",
    amount: 1099,
    status: "COMPLETED",
    serviceSlug: "cleanup-detan",
  },
  {
    id: "GN2026452210",
    service: "Aromatherapy Body Spa",
    emoji: "🌿",
    pkg: "Aroma Relax (60 min)",
    date: "Sun, 10 May 2026",
    slot: "03:00 PM",
    beautician: "—",
    address: "Home · Ashiana Nagar, Patna",
    amount: 1499,
    status: "CANCELLED",
    serviceSlug: "aroma-spa",
  },
];

function BookingCard({ booking, upcoming }: { booking: MockBooking; upcoming: boolean }) {
  const status = STATUS_META[booking.status];
  return (
    <article className="rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-2xl" aria-hidden>
            {booking.emoji}
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-950">{booking.service}</h3>
            <p className="text-xs text-ink-500">
              {booking.pkg} · {booking.id}
            </p>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 text-ink-600">
          <CalendarDays className="size-3.5 text-gold-600" />
          <span>{booking.date}</span>
          <Clock className="ml-1 size-3.5 text-gold-600" />
          <span>{booking.slot}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-600">
          <User className="size-3.5 text-gold-600" />
          <span>{booking.beautician}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-600 sm:col-span-2">
          <MapPin className="size-3.5 text-gold-600" />
          <span>{booking.address}</span>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-950/6 pt-4">
        <p className="font-display text-lg font-bold text-ink-950">{formatINR(booking.amount)}</p>
        <div className="flex flex-wrap gap-2">
          {upcoming ? (
            <>
              <Button variant="outline" size="sm">
                <RotateCcw />
                Reschedule
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                <X />
                Cancel
              </Button>
            </>
          ) : booking.status === "COMPLETED" ? (
            <>
              <Link href={`/booking?service=${booking.serviceSlug}`}>
                <Button variant="gold" size="sm">
                  <RotateCcw />
                  Book Again
                </Button>
              </Link>
              <Link href="/account/reviews">
                <Button variant="outline" size="sm">
                  <Star />
                  Rate
                </Button>
              </Link>
            </>
          ) : (
            <Link href={`/booking?service=${booking.serviceSlug}`}>
              <Button variant="outline" size="sm">
                <RotateCcw />
                Book Again
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BookingsPage() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Bookings</p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
          My bookings
        </h1>
        <p className="mt-2 text-sm text-ink-500 md:text-base">
          Reschedule for free up to 4 hours before your slot.
        </p>
      </header>

      <section aria-label="Upcoming bookings">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">Upcoming</h2>
          <Badge variant="gold">{UPCOMING.length}</Badge>
        </div>
        <div className="mt-4 space-y-4">
          {UPCOMING.map((booking) => (
            <BookingCard key={booking.id} booking={booking} upcoming />
          ))}
        </div>
      </section>

      <section aria-label="Booking history">
        <h2 className="font-display text-xl font-semibold text-ink-950">History</h2>
        <div className="mt-4 space-y-4">
          {HISTORY.map((booking) => (
            <BookingCard key={booking.id} booking={booking} upcoming={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
