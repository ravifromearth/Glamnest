import type { Metadata } from "next";
import { IndianRupee, Repeat, ShoppingBag, Sparkles, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/portal/chart";
import { DataTable, type Column } from "@/components/portal/data-table";
import { StatCard } from "@/components/portal/stat-card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

const REVENUE_30D = [
  { label: "15", value: 61 },
  { label: "18", value: 68 },
  { label: "21", value: 64 },
  { label: "24", value: 72 },
  { label: "27", value: 70 },
  { label: "30", value: 78 },
  { label: "3", value: 74 },
  { label: "6", value: 81 },
  { label: "9", value: 79 },
  { label: "12", value: 84 },
  { label: "14", value: 86 },
];

const ORDERS_BY_CATEGORY = [
  { label: "Skin", value: 34 },
  { label: "Waxing", value: 26 },
  { label: "Hair", value: 18 },
  { label: "Makeup", value: 15 },
  { label: "Spa", value: 11 },
  { label: "Nails", value: 8 },
];

const FUNNEL = [
  { stage: "Visits", value: 12400 },
  { stage: "Carts", value: 1860 },
  { stage: "Bookings", value: 1240 },
  { stage: "Completed", value: 1180 },
];

type FeedStatus = "CONFIRMED" | "IN PROGRESS" | "COMPLETED";

interface FeedRow {
  code: string;
  customer: string;
  service: string;
  locality: string;
  amount: number;
  status: FeedStatus;
}

const LIVE_FEED: FeedRow[] = [
  { code: "GN202607421", customer: "Priya Kumari", service: "Party Makeup", locality: "Boring Road", amount: 2499, status: "IN PROGRESS" },
  { code: "GN202607420", customer: "Anjali Sinha", service: "Glow Facial", locality: "Kankarbagh", amount: 1299, status: "COMPLETED" },
  { code: "GN202607419", customer: "Megha Jain", service: "Full Body Waxing", locality: "Rajendra Nagar", amount: 2299, status: "CONFIRMED" },
  { code: "GN202607418", customer: "Sadaf Khan", service: "Spa Mani-Pedi", locality: "Bailey Road", amount: 1499, status: "CONFIRMED" },
  { code: "GN202607417", customer: "Ritu Verma", service: "Aroma Body Spa", locality: "Patliputra", amount: 2199, status: "IN PROGRESS" },
];

const FEED_VARIANT: Record<FeedStatus, BadgeProps["variant"]> = {
  CONFIRMED: "info",
  "IN PROGRESS": "warning",
  COMPLETED: "success",
};

const FEED_COLUMNS: Column<FeedRow>[] = [
  { header: "Booking", cell: (r) => <span className="font-mono text-xs text-ink-500">{r.code}</span> },
  { header: "Customer", cell: (r) => <span className="font-medium text-ink-950">{r.customer}</span> },
  { header: "Service", cell: (r) => r.service },
  { header: "Locality", cell: (r) => r.locality },
  { header: "Amount", align: "right", cell: (r) => formatINR(r.amount) },
  { header: "Status", align: "right", cell: (r) => <Badge variant={FEED_VARIANT[r.status]}>{r.status}</Badge> },
];

interface TopBeautician {
  name: string;
  initials: string;
  specialty: string;
  jobs: number;
  rating: number;
  revenue: number;
}

const TOP_BEAUTICIANS: TopBeautician[] = [
  { name: "Sunita Devi", initials: "SD", specialty: "Bridal & Makeup", jobs: 96, rating: 4.9, revenue: 284000 },
  { name: "Farhan Ali", initials: "FA", specialty: "Hair", jobs: 88, rating: 4.8, revenue: 176500 },
  { name: "Pooja Sharma", initials: "PS", specialty: "Skin & Facial", jobs: 82, rating: 4.9, revenue: 142300 },
  { name: "Nazia Parveen", initials: "NP", specialty: "Waxing", jobs: 79, rating: 4.7, revenue: 118400 },
  { name: "Rekha Kumari", initials: "RK", specialty: "Spa & Wellness", jobs: 71, rating: 4.8, revenue: 131900 },
];

const TOP_COLUMNS: Column<TopBeautician>[] = [
  {
    header: "Beautician",
    cell: (r) => (
      <span className="flex items-center gap-2.5">
        <Avatar initials={r.initials} className="size-8 text-xs" />
        <span className="font-medium text-ink-950">{r.name}</span>
      </span>
    ),
  },
  { header: "Specialty", cell: (r) => r.specialty },
  { header: "Jobs (30d)", align: "right", cell: (r) => r.jobs },
  { header: "Rating", align: "right", cell: (r) => <span className="font-medium text-gold-600">{r.rating.toFixed(1)}★</span> },
  { header: "Revenue", align: "right", cell: (r) => <span className="font-semibold">{formatINR(r.revenue)}</span> },
];

export default function AdminDashboardPage() {
  const maxFunnel = FUNNEL[0].value;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue today" value={formatINR(86400)} delta="+14%" icon={IndianRupee} />
        <StatCard label="Orders today" value="112" delta="+9%" icon={ShoppingBag} />
        <StatCard label="Active customers" value="4,820" delta="+6%" icon={Users} />
        <StatCard label="Active beauticians" value="342" delta="+3%" icon={Sparkles} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Revenue — last 30 days</CardTitle>
            <p className="text-sm text-ink-500">₹ thousands / day</p>
          </CardHeader>
          <CardContent>
            <LineChart data={REVENUE_30D} height={180} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Orders by category</CardTitle>
            <p className="text-sm text-ink-500">today</p>
          </CardHeader>
          <CardContent>
            <BarChart data={ORDERS_BY_CATEGORY} height={180} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {FUNNEL.map((step) => {
              const pct = Math.round((step.value / maxFunnel) * 100);
              return (
                <div key={step.stage}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-ink-950">{step.stage}</span>
                    <span className="text-ink-500">
                      {step.value.toLocaleString("en-IN")} · {pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-cream-200">
                    <div className="h-full rounded-full bg-gold-500" style={{ width: `${Math.max(pct, 4)}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Repeat rate + AOV */}
        <div className="grid grid-cols-1 gap-6 lg:col-span-2 sm:grid-cols-2">
          <Card className="flex flex-col justify-center p-6">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
              <Repeat className="size-5" />
            </span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-500">Repeat rate (90d)</p>
            <p className="mt-1 font-display text-4xl font-bold text-ink-950">46%</p>
            <p className="mt-2 text-sm text-ink-500">Customers booking a second time within 90 days.</p>
          </Card>
          <Card className="flex flex-col justify-center p-6">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
              <IndianRupee className="size-5" />
            </span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-500">Avg order value</p>
            <p className="mt-1 font-display text-4xl font-bold text-ink-950">{formatINR(1740)}</p>
            <p className="mt-2 text-sm text-ink-500">Up {formatINR(120)} vs last month, led by bridal bookings.</p>
          </Card>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">Live bookings</h3>
        <DataTable columns={FEED_COLUMNS} rows={LIVE_FEED} rowKey={(r) => r.code} />
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">Top beauticians — last 30 days</h3>
        <DataTable columns={TOP_COLUMNS} rows={TOP_BEAUTICIANS} rowKey={(r) => r.name} />
      </section>
    </div>
  );
}
