import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SignUpForm } from "./signup-form";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Sign Up",
    description: "Create your GlamNest account to book beauty services at home.",
    path: "/signup",
  }),
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <div className="container-gn section-gn">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Create account</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-950 md:text-4xl">
          Join GlamNest
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Your details stay on this device for 30 days so you can sign back in anytime.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-3xl border border-ink-950/8 bg-white p-6 text-sm text-ink-500 shadow-soft">Loading…</div>}>
            <SignUpForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
