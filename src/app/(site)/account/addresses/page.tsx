import type { Metadata } from "next";
import { Briefcase, Home, Pencil, Plus, Trash2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Saved Addresses",
    description: "Manage the doorsteps GlamNest comes to.",
    path: "/account/addresses",
  }),
  robots: { index: false, follow: false },
};

const ADDRESSES = [
  {
    id: "addr-home",
    label: "Home",
    icon: Home,
    lines: "A-14, Ashiana Nagar Phase 1, Patna 800025",
    isDefault: true,
  },
  {
    id: "addr-work",
    label: "Work",
    icon: Briefcase,
    lines: "5th Flr, Biscomaun Bhawan, Gandhi Maidan, Patna 800001",
    isDefault: false,
  },
];

export default function AddressesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Addresses</p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
          Saved addresses
        </h1>
        <p className="mt-2 text-sm text-ink-500 md:text-base">
          Every doorstep we&apos;ve glammed — add as many as you like.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {ADDRESSES.map((address) => (
          <article
            key={address.id}
            className="flex flex-col rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-cream-100 text-gold-700">
                <address.icon className="size-5" />
              </span>
              {address.isDefault && <Badge variant="gold">Default</Badge>}
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">{address.label}</h2>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-500">{address.lines}</p>
            <div className="mt-5 flex gap-2 border-t border-ink-950/6 pt-4">
              <Button variant="outline" size="sm">
                <Pencil />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                <Trash2 />
                Remove
              </Button>
            </div>
          </article>
        ))}

        {/* Add-address ghost card */}
        <button
          type="button"
          className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-gold-500/40 bg-gold-500/5 p-6 text-gold-700 transition-colors hover:border-gold-500/70 hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-gold-500/15">
            <Plus className="size-6" />
          </span>
          <span className="font-medium">Add a new address</span>
          <span className="text-xs text-ink-400">Home, work, parents — we come anywhere in Patna</span>
        </button>
      </div>
    </div>
  );
}
