import type { Metadata } from "next";
import { AvailabilityEditor } from "./availability-editor";

export const metadata: Metadata = {
  title: "Availability",
  robots: { index: false },
};

export default function PartnerAvailabilityPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Availability</h2>
        <p className="mt-1 text-sm text-ink-500">
          Set the hours you want to receive bookings. Changes apply from tomorrow.
        </p>
      </div>
      <AvailabilityEditor />
    </div>
  );
}
