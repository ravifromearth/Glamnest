import type { Metadata } from "next";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/portal/data-table";
import { cn, formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false },
};

type BookingStatus = "CONFIRMED" | "IN PROGRESS" | "COMPLETED" | "CANCELLED";

interface Booking {
  code: string;
  customer: string;
  service: string;
  beautician: string;
  city: string;
  slot: string;
  amount: number;
  status: BookingStatus;
}

const BOOKINGS: Booking[] = [
  { code: "GN202607421", customer: "Priya Kumari", service: "Party Makeup", beautician: "Sunita Devi", city: "Patna", slot: "14 Jul · 1:00 PM", amount: 2499, status: "IN PROGRESS" },
  { code: "GN202607420", customer: "Anjali Sinha", service: "Glow Facial", beautician: "Sunita Devi", city: "Patna", slot: "14 Jul · 10:00 AM", amount: 1299, status: "COMPLETED" },
  { code: "GN202607419", customer: "Megha Jain", service: "Full Body Waxing", beautician: "Nazia Parveen", city: "Patna", slot: "14 Jul · 3:00 PM", amount: 2299, status: "CONFIRMED" },
  { code: "GN202607418", customer: "Sadaf Khan", service: "Spa Mani-Pedi", beautician: "Rekha Kumari", city: "Patna", slot: "14 Jul · 4:30 PM", amount: 1499, status: "CONFIRMED" },
  { code: "GN202607417", customer: "Ritu Verma", service: "Aroma Body Spa", beautician: "Rekha Kumari", city: "Patna", slot: "14 Jul · 12:00 PM", amount: 2199, status: "IN PROGRESS" },
  { code: "GN202607416", customer: "Kavya Singh", service: "Haircut & Styling", beautician: "Farhan Ali", city: "Patna", slot: "14 Jul · 11:00 AM", amount: 999, status: "COMPLETED" },
  { code: "GN202607415", customer: "Pooja Mishra", service: "Cleanup & De-Tan", beautician: "Pooja Sharma", city: "Patna", slot: "14 Jul · 9:30 AM", amount: 1099, status: "COMPLETED" },
  { code: "GN202607414", customer: "Neha Gupta", service: "24K Gold Facial", beautician: "Pooja Sharma", city: "Patna", slot: "15 Jul · 11:00 AM", amount: 2199, status: "CONFIRMED" },
  { code: "GN202607413", customer: "Shreya Raj", service: "Engagement Makeup", beautician: "Sunita Devi", city: "Patna", slot: "17 Jul · 9:00 AM", amount: 6999, status: "CONFIRMED" },
  { code: "GN202607412", customer: "Divya Prakash", service: "Hair Colour", beautician: "Farhan Ali", city: "Patna", slot: "13 Jul · 5:00 PM", amount: 2499, status: "CANCELLED" },
];

const STATUS_VARIANT: Record<BookingStatus, BadgeProps["variant"]> = {
  CONFIRMED: "info",
  "IN PROGRESS": "warning",
  COMPLETED: "success",
  CANCELLED: "danger",
};

const FILTERS = ["All", "Confirmed", "In Progress", "Completed", "Cancelled"];

const COLUMNS: Column<Booking>[] = [
  { header: "Code", cell: (r) => <span className="font-mono text-xs text-ink-500">{r.code}</span> },
  { header: "Customer", cell: (r) => <span className="font-medium text-ink-950">{r.customer}</span> },
  { header: "Service", cell: (r) => r.service },
  { header: "Beautician", cell: (r) => r.beautician },
  { header: "City", cell: (r) => r.city },
  { header: "Slot", cell: (r) => <span className="whitespace-nowrap">{r.slot}</span> },
  { header: "Amount", align: "right", cell: (r) => formatINR(r.amount) },
  { header: "Status", align: "right", cell: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge> },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter, i) => (
          <button
            key={filter}
            type="button"
            className={cn(
              "h-9 rounded-full border px-4 text-xs font-semibold transition-colors",
              i === 0
                ? "border-ink-950 bg-ink-950 text-cream-50"
                : "border-ink-950/15 bg-white text-ink-700 hover:border-gold-500 hover:bg-gold-500/10"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <DataTable columns={COLUMNS} rows={BOOKINGS} rowKey={(r) => r.code} />
    </div>
  );
}
