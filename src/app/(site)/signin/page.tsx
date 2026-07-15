import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Sign In",
    description: "Sign in to your GlamNest account to manage bookings and pay securely.",
    path: "/signin",
  }),
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="container-gn section-gn">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Welcome back</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-950 md:text-4xl">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Use the mobile number and password you created. Sessions last 30 days on this device.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-3xl border border-ink-950/8 bg-white p-6 text-sm text-ink-500 shadow-soft">Loading…</div>}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
