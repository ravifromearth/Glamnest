import type { Metadata } from "next";
import { Landmark, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/portal/data-table";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wallet",
  robots: { index: false },
};

interface Payout {
  week: string;
  paidOn: string;
  amount: number;
  utr: string;
}

const PAYOUTS: Payout[] = [
  { week: "30 Jun – 6 Jul", paidOn: "Mon, 7 Jul 2026", amount: 11840, utr: "UTR26070712345" },
  { week: "23 – 29 Jun", paidOn: "Mon, 30 Jun 2026", amount: 13260, utr: "UTR26063098221" },
  { week: "16 – 22 Jun", paidOn: "Mon, 23 Jun 2026", amount: 10480, utr: "UTR26062377654" },
  { week: "9 – 15 Jun", paidOn: "Mon, 16 Jun 2026", amount: 12920, utr: "UTR26061654310" },
];

const COLUMNS: Column<Payout>[] = [
  { header: "Week", cell: (r) => <span className="whitespace-nowrap font-medium text-ink-950">{r.week}</span> },
  { header: "Paid on", cell: (r) => <span className="whitespace-nowrap">{r.paidOn}</span> },
  { header: "Amount", align: "right", cell: (r) => <span className="font-semibold">{formatINR(r.amount)}</span> },
  { header: "UTR reference", cell: (r) => <span className="font-mono text-xs text-ink-500">{r.utr}</span> },
  { header: "Status", align: "right", cell: () => <Badge variant="success">PAID</Badge> },
];

export default function PartnerWalletPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Balance */}
        <Card className="bg-ink-950 text-cream-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-cream-100/60">
              <Wallet className="size-4" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Wallet balance</p>
            </div>
            <p className="mt-3 font-display text-4xl font-bold text-gold-400">{formatINR(8540)}</p>
            <p className="mt-2 text-sm text-cream-100/60">Earnings since last settlement, ready for payout.</p>
          </CardContent>
        </Card>

        {/* Next payout */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-ink-500">
              <Landmark className="size-4 text-gold-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Next payout</p>
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-ink-950">Mon, 20 Jul 2026</p>
            <p className="mt-2 text-sm text-ink-500">
              To HDFC Bank ••4521 <span className="mx-1 text-ink-300">·</span> Priyanka Singh
            </p>
            <Badge variant="gold" className="mt-4">
              Auto-settlement enabled
            </Badge>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">Payout history</h3>
        <DataTable columns={COLUMNS} rows={PAYOUTS} rowKey={(r) => r.utr} />
      </section>
    </div>
  );
}
