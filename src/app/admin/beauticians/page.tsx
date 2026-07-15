import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/portal/data-table";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Beauticians",
  robots: { index: false },
};

type KycStatus = "VERIFIED" | "PENDING";
type PartnerStatus = "ACTIVE" | "ONBOARDING" | "SUSPENDED";

interface Beautician {
  name: string;
  initials: string;
  specialty: string;
  city: string;
  rating: number;
  jobs: number;
  kyc: KycStatus;
  status: PartnerStatus;
  commission: number;
}

const BEAUTICIANS: Beautician[] = [
  { name: "Sunita Devi", initials: "SD", specialty: "Bridal & Makeup", city: "Patna", rating: 4.9, jobs: 322, kyc: "VERIFIED", status: "ACTIVE", commission: 20 },
  { name: "Farhan Ali", initials: "FA", specialty: "Hair", city: "Patna", rating: 4.8, jobs: 415, kyc: "VERIFIED", status: "ACTIVE", commission: 20 },
  { name: "Pooja Sharma", initials: "PS", specialty: "Skin & Facial", city: "Patna", rating: 4.9, jobs: 289, kyc: "VERIFIED", status: "ACTIVE", commission: 18 },
  { name: "Nazia Parveen", initials: "NP", specialty: "Waxing", city: "Patna", rating: 4.7, jobs: 356, kyc: "VERIFIED", status: "ACTIVE", commission: 20 },
  { name: "Rekha Kumari", initials: "RK", specialty: "Spa & Wellness", city: "Patna", rating: 4.8, jobs: 244, kyc: "VERIFIED", status: "ACTIVE", commission: 20 },
  { name: "Shabnam Ara", initials: "SA", specialty: "Mehendi", city: "Patna", rating: 4.9, jobs: 118, kyc: "VERIFIED", status: "ACTIVE", commission: 15 },
  { name: "Anita Kumari", initials: "AK", specialty: "Skin & Facial", city: "Patna", rating: 0, jobs: 0, kyc: "PENDING", status: "ONBOARDING", commission: 20 },
  { name: "Ruby Singh", initials: "RS", specialty: "Party Makeup", city: "Patna", rating: 4.1, jobs: 67, kyc: "VERIFIED", status: "SUSPENDED", commission: 20 },
];

const STATUS_VARIANT: Record<PartnerStatus, BadgeProps["variant"]> = {
  ACTIVE: "success",
  ONBOARDING: "info",
  SUSPENDED: "danger",
};

const COLUMNS: Column<Beautician>[] = [
  {
    header: "Name",
    cell: (r) => (
      <span className="flex items-center gap-2.5">
        <Avatar initials={r.initials} className="size-8 text-xs" />
        <span className="font-medium text-ink-950">{r.name}</span>
      </span>
    ),
  },
  { header: "Specialty", cell: (r) => r.specialty },
  { header: "City", cell: (r) => r.city },
  {
    header: "Rating",
    align: "right",
    cell: (r) => (r.rating > 0 ? <span className="font-medium text-gold-600">{r.rating.toFixed(1)}★</span> : <span className="text-ink-400">—</span>),
  },
  { header: "Jobs", align: "right", cell: (r) => r.jobs },
  {
    header: "KYC",
    cell: (r) => <Badge variant={r.kyc === "VERIFIED" ? "success" : "warning"}>{r.kyc}</Badge>,
  },
  { header: "Status", cell: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge> },
  { header: "Commission", align: "right", cell: (r) => `${r.commission}%` },
];

const TABS = [
  { label: "Active", count: 342 },
  { label: "Onboarding", count: 28 },
  { label: "Applied", count: 64 },
  { label: "Suspended", count: 6 },
];

const PENDING_QUEUE = [
  { name: "Anita Kumari", initials: "AK", specialty: "Skin & Facial", note: "Police verification received · skill test cleared 4.6/5", applied: "8 Jul 2026" },
  { name: "Julie Kumari", initials: "JK", specialty: "Mani-Pedi", note: "Aadhaar + PAN verified · awaiting bank proof", applied: "10 Jul 2026" },
  { name: "Sana Firdaus", initials: "SF", specialty: "Party Makeup", note: "All documents verified · trial job scheduled 16 Jul", applied: "11 Jul 2026" },
];

export default function AdminBeauticiansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            className={cn(
              "h-9 rounded-full border px-4 text-xs font-semibold transition-colors",
              i === 0
                ? "border-ink-950 bg-ink-950 text-cream-50"
                : "border-ink-950/15 bg-white text-ink-700 hover:border-gold-500 hover:bg-gold-500/10"
            )}
          >
            {tab.label} <span className={cn("ml-1", i === 0 ? "text-gold-400" : "text-ink-400")}>{tab.count}</span>
          </button>
        ))}
      </div>

      <DataTable columns={COLUMNS} rows={BEAUTICIANS} rowKey={(r) => r.name} />

      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">Pending verification</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PENDING_QUEUE.map((p) => (
            <Card key={p.name}>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={p.initials} />
                  <div className="min-w-0">
                    <p className="font-medium text-ink-950">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.specialty} · applied {p.applied}</p>
                  </div>
                </div>
                <p className="rounded-2xl bg-cream-100 px-3.5 py-2.5 text-xs leading-relaxed text-ink-600">{p.note}</p>
                <div className="flex gap-2.5">
                  <Button variant="gold" size="sm" className="flex-1">
                    <Check /> Approve
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <X /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
