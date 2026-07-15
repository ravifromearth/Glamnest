import type { Metadata } from "next";
import { CalendarDays, Gift, IndianRupee, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/portal/chart";
import { DataTable, type Column } from "@/components/portal/data-table";
import { StatCard } from "@/components/portal/stat-card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Earnings",
  robots: { index: false },
};

const MONTHLY = [
  { label: "Feb", value: 38200 },
  { label: "Mar", value: 41500 },
  { label: "Apr", value: 39800 },
  { label: "May", value: 47600 },
  { label: "Jun", value: 50100 },
  { label: "Jul", value: 52300 },
];

interface EarningRow {
  date: string;
  service: string;
  gross: number;
  incentive: number;
}

const ROWS: EarningRow[] = [
  { date: "14 Jul", service: "Signature Glow Facial", gross: 1299, incentive: 0 },
  { date: "13 Jul", service: "Party Makeup", gross: 2499, incentive: 100 },
  { date: "13 Jul", service: "Full Body Waxing", gross: 1199, incentive: 0 },
  { date: "12 Jul", service: "Engagement Makeup", gross: 6999, incentive: 250 },
  { date: "11 Jul", service: "Manicure & Pedicure", gross: 1499, incentive: 0 },
  { date: "10 Jul", service: "Cleanup & De-Tan", gross: 1099, incentive: 0 },
  { date: "9 Jul", service: "HD Bridal Makeup", gross: 12999, incentive: 500 },
  { date: "8 Jul", service: "Signature Glow Facial", gross: 2199, incentive: 0 },
];

const COMMISSION_RATE = 0.2;

const COLUMNS: Column<EarningRow>[] = [
  { header: "Date", cell: (r) => <span className="whitespace-nowrap">{r.date}</span> },
  { header: "Service", cell: (r) => <span className="font-medium text-ink-950">{r.service}</span> },
  { header: "Gross", align: "right", cell: (r) => formatINR(r.gross) },
  {
    header: "Commission (20%)",
    align: "right",
    cell: (r) => <span className="text-red-700">-{formatINR(Math.round(r.gross * COMMISSION_RATE))}</span>,
  },
  {
    header: "Incentive",
    align: "right",
    cell: (r) =>
      r.incentive > 0 ? <span className="text-emerald-700">+{formatINR(r.incentive)}</span> : <span className="text-ink-400">—</span>,
  },
  {
    header: "Net",
    align: "right",
    cell: (r) => (
      <span className="font-semibold text-ink-950">
        {formatINR(Math.round(r.gross * (1 - COMMISSION_RATE)) + r.incentive)}
      </span>
    ),
  },
];

export default function PartnerEarningsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="This week" value={formatINR(14850)} delta="+12%" icon={IndianRupee} />
        <StatCard label="This month" value={formatINR(52300)} delta="+4%" icon={CalendarDays} />
        <StatCard label="Avg per job" value={formatINR(780)} icon={TrendingUp} />
        <StatCard label="Incentives" value={formatINR(2100)} delta="+9%" icon={Gift} />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Monthly earnings</CardTitle>
          <p className="text-sm text-ink-500">Feb – Jul 2026</p>
        </CardHeader>
        <CardContent>
          <LineChart data={MONTHLY} height={180} />
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">Earnings by job</h3>
        <DataTable columns={COLUMNS} rows={ROWS} rowKey={(r, i) => `${r.date}-${i}`} />
        <p className="rounded-2xl bg-cream-100 px-4 py-3 text-sm text-ink-600">
          Earnings are settled weekly, every Monday, directly to your registered bank account.
        </p>
      </section>
    </div>
  );
}
