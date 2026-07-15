import type { Metadata } from "next";
import { KeyRound, MapPin, Navigation } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Today's Jobs",
  robots: { index: false },
};

type JobStatus = "COMPLETED" | "EN ROUTE" | "UPCOMING";

interface Job {
  time: string;
  service: string;
  packageName: string;
  customer: string;
  initials: string;
  locality: string;
  payout: number;
  status: JobStatus;
  note?: string;
}

const JOBS: Job[] = [
  {
    time: "10:00 AM",
    service: "Signature Glow Facial",
    packageName: "Glow Ritual",
    customer: "Anjali Sinha",
    initials: "AS",
    locality: "Kankarbagh",
    payout: 1040,
    status: "COMPLETED",
  },
  {
    time: "1:00 PM",
    service: "Party Makeup",
    packageName: "Full Glam",
    customer: "Priya Kumari",
    initials: "PK",
    locality: "Boring Road",
    payout: 1120,
    status: "EN ROUTE",
    note: "GPS sharing is on — the customer can see your live location.",
  },
  {
    time: "5:00 PM",
    service: "Full Body Waxing",
    packageName: "Arms + Legs + Underarms",
    customer: "Ritu Verma",
    initials: "RV",
    locality: "Bailey Road",
    payout: 960,
    status: "UPCOMING",
  },
];

const STATUS_VARIANT: Record<JobStatus, BadgeProps["variant"]> = {
  COMPLETED: "success",
  "EN ROUTE": "info",
  UPCOMING: "warning",
};

export default function PartnerJobsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Today&apos;s jobs</h2>
        <p className="mt-1 text-sm text-ink-500">Tuesday, 14 July 2026 · 3 bookings · est. {formatINR(3120)}</p>
      </div>

      <ol className="relative space-y-5 before:absolute before:inset-y-2 before:left-[19px] before:w-px before:bg-ink-950/10 sm:before:left-[27px]">
        {JOBS.map((job) => (
          <li key={job.time} className="relative pl-12 sm:pl-16">
            <span
              className={`absolute left-2.5 top-6 size-4 rounded-full ring-4 ring-cream-50 sm:left-[19px] ${
                job.status === "COMPLETED"
                  ? "bg-emerald-500"
                  : job.status === "EN ROUTE"
                    ? "bg-sky-500"
                    : "bg-gold-500"
              }`}
              aria-hidden
            />
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-lg font-semibold text-ink-950">{job.time}</p>
                  <Badge variant={STATUS_VARIANT[job.status]}>{job.status}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar initials={job.initials} />
                  <div className="min-w-0">
                    <p className="font-medium text-ink-950">{job.customer}</p>
                    <p className="truncate text-sm text-ink-500">
                      {job.service} · {job.packageName}
                    </p>
                  </div>
                  <p className="ml-auto shrink-0 font-semibold text-gold-600">{formatINR(job.payout)}</p>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-ink-500">
                  <MapPin className="size-4 shrink-0 text-gold-600" /> {job.locality}, Patna
                </p>
                {job.note && (
                  <p className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-800">
                    <Navigation className="mr-1.5 inline size-4" aria-hidden />
                    {job.note}
                  </p>
                )}
                {job.status !== "COMPLETED" && (
                  <p className="flex items-center gap-1.5 rounded-2xl bg-cream-100 px-4 py-3 text-sm text-ink-600">
                    <KeyRound className="size-4 shrink-0 text-gold-600" />
                    Ask the customer for their start OTP before beginning the service.
                  </p>
                )}
                {job.status === "UPCOMING" && (
                  <div className="flex gap-3">
                    <Button variant="gold" size="sm" className="flex-1">
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Start job
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
