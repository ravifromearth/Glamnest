import type { Metadata } from "next";
import { IndianRupee, Repeat, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/portal/data-table";
import { StatCard } from "@/components/portal/stat-card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customers",
  robots: { index: false },
};

type Plan = "Glow" | "Luxe" | "Royale" | "—";

interface Customer {
  name: string;
  phone: string;
  city: string;
  bookings: number;
  wallet: number;
  plan: Plan;
  joined: string;
}

const CUSTOMERS: Customer[] = [
  { name: "Priya Kumari", phone: "+91 98••• ••412", city: "Patna", bookings: 14, wallet: 450, plan: "Luxe", joined: "Aug 2025" },
  { name: "Anjali Sinha", phone: "+91 87••• ••903", city: "Patna", bookings: 22, wallet: 1200, plan: "Royale", joined: "May 2025" },
  { name: "Megha Jain", phone: "+91 99••• ••178", city: "Patna", bookings: 6, wallet: 0, plan: "Glow", joined: "Jan 2026" },
  { name: "Sadaf Khan", phone: "+91 70••• ••654", city: "Patna", bookings: 9, wallet: 300, plan: "Luxe", joined: "Nov 2025" },
  { name: "Ritu Verma", phone: "+91 96••• ••287", city: "Patna", bookings: 4, wallet: 150, plan: "—", joined: "Mar 2026" },
  { name: "Kavya Singh", phone: "+91 89••• ••731", city: "Patna", bookings: 11, wallet: 600, plan: "Luxe", joined: "Sep 2025" },
  { name: "Pooja Mishra", phone: "+91 93••• ••845", city: "Patna", bookings: 2, wallet: 0, plan: "—", joined: "Jun 2026" },
  { name: "Neha Gupta", phone: "+91 82••• ••529", city: "Patna", bookings: 17, wallet: 850, plan: "Royale", joined: "Jul 2025" },
];

const COLUMNS: Column<Customer>[] = [
  { header: "Name", cell: (r) => <span className="font-medium text-ink-950">{r.name}</span> },
  { header: "Phone", cell: (r) => <span className="font-mono text-xs text-ink-500">{r.phone}</span> },
  { header: "City", cell: (r) => r.city },
  { header: "Bookings", align: "right", cell: (r) => r.bookings },
  { header: "Wallet", align: "right", cell: (r) => formatINR(r.wallet) },
  {
    header: "Plan",
    cell: (r) =>
      r.plan === "—" ? (
        <span className="text-ink-400">—</span>
      ) : (
        <Badge variant={r.plan === "Royale" ? "gold" : "cream"}>{r.plan}</Badge>
      ),
  },
  { header: "Joined", align: "right", cell: (r) => <span className="whitespace-nowrap">{r.joined}</span> },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value="18,240" delta="+8%" icon={Users} />
        <StatCard label="New this month" value="1,120" delta="+12%" icon={UserPlus} />
        <StatCard label="Repeat rate" value="46%" delta="+3%" icon={Repeat} />
        <StatCard label="Avg LTV" value={formatINR(4350)} delta="+5%" icon={IndianRupee} />
      </div>
      <DataTable columns={COLUMNS} rows={CUSTOMERS} rowKey={(r) => r.name} />
    </div>
  );
}
