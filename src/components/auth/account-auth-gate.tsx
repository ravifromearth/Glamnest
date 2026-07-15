"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";

export function AccountAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, hydrated } = useAuthStore();

  if (!hydrated) {
    return (
      <div className="rounded-3xl border border-ink-950/8 bg-white p-10 text-center text-sm text-ink-500 shadow-soft">
        Loading your account…
      </div>
    );
  }

  if (!user) {
    const next = encodeURIComponent(pathname || "/account");
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-ink-950/8 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
          <LogIn className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-ink-950">Sign in for your profile</h2>
        <p className="mt-2 text-sm text-ink-500">
          Booking &amp; payment work without an account. Sign in to view history, saved addresses and
          receipts — details stay on this device for 30 days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`/signin?next=${next}`}>
            <Button variant="gold" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
          <Link href={`/signup?next=${next}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
