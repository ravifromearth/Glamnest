import type { Metadata } from "next";
import { ServicesManager } from "./services-manager";

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false },
};

export default function AdminServicesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Services</h2>
        <p className="mt-1 text-sm text-ink-500">
          Enable or disable services for the customer catalog and booking flow.
        </p>
      </div>
      <ServicesManager />
    </div>
  );
}
