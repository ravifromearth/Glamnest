import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { BookingFlow } from "./booking-flow";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Book a Service",
    description:
      "Book premium beauty services at home in Patna — pick a service, choose a slot and a verified beautician arrives at your doorstep.",
    path: "/booking",
  }),
  robots: { index: false, follow: true },
};

function BookingFallback() {
  return (
    <div className="container-gn py-16">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-4 w-40 animate-pulse rounded-full bg-cream-200" />
        <div className="h-10 w-72 animate-pulse rounded-full bg-cream-200" />
        <div className="h-64 animate-pulse rounded-3xl bg-cream-200" />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingFallback />}>
      <BookingFlow />
    </Suspense>
  );
}
