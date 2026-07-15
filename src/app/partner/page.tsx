import type { Metadata } from "next";
import { CheckCircle2, IndianRupee, Navigation, Percent, Phone, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { BarChart } from "@/components/portal/chart";
import { StatCard } from "@/components/portal/stat-card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false },
};

const WEEKLY_EARNINGS = [
  { label: "Mon", value: 1850 },
  { label: "Tue", value: 2400 },
  { label: "Wed", value: 1600 },
  { label: "Thu", value: 2900 },
  { label: "Fri", value: 2100 },
  { label: "Sat", value: 3550 },
  { label: "Sun", value: 2450 },
];

const INCENTIVE = { target: 25, done: 22, bonus: 500 };

export default function PartnerOverviewPage() {
  const progress = Math.round((INCENTIVE.done / INCENTIVE.target) * 100);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Tuesday, 14 July 2026</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
          Good morning, Sunita
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          You have 3 jobs today across Patna. Your next one starts at 1:00 PM.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's earnings" value={formatINR(2450)} delta="+18%" icon={IndianRupee} />
        <StatCard label="Jobs today" value="3" icon={Sparkles} />
        <StatCard label="Rating" value="4.9" icon={Star} />
        <StatCard label="Acceptance" value="96%" delta="+2%" icon={Percent} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Next job */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Next job</CardTitle>
            <Badge variant="info">1:00 PM</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar initials="PK" />
              <div>
                <p className="font-medium text-ink-950">Priya Kumari</p>
                <p className="text-sm text-ink-500">Party Makeup · Full Glam</p>
              </div>
            </div>
            <div className="rounded-2xl bg-cream-100 p-4 text-sm">
              <p className="text-ink-800">
                <span className="font-medium">Boring Road</span>, near Krishna Apartment, Patna
              </p>
              <p className="mt-1 text-ink-500">Payout {formatINR(1120)} · 1 hr 35 min slot</p>
            </div>
            <div className="flex gap-3">
              <Button variant="gold" size="sm" className="flex-1">
                <Navigation /> Navigate
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Phone /> Call customer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly earnings chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>This week&apos;s earnings</CardTitle>
            <p className="text-sm font-semibold text-gold-600">{formatINR(16850)}</p>
          </CardHeader>
          <CardContent>
            <BarChart data={WEEKLY_EARNINGS} height={170} />
          </CardContent>
        </Card>
      </div>

      {/* Incentive progress */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
            <CheckCircle2 className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold text-ink-950">
              {formatINR(INCENTIVE.bonus)} weekly bonus at {INCENTIVE.target} jobs
            </p>
            <p className="text-sm text-ink-500">
              {INCENTIVE.done} of {INCENTIVE.target} jobs completed — just {INCENTIVE.target - INCENTIVE.done} more to
              unlock your bonus.
            </p>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
              <div className="h-full rounded-full bg-gold-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <Badge variant="gold" className="shrink-0">
            {INCENTIVE.done}/{INCENTIVE.target} jobs
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
