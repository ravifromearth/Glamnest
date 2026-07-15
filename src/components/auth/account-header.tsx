"use client";

import { useAuthStore } from "@/stores/auth-store";

export function AccountGreeting() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Overview</p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
        Good to see you, {firstName}
      </h1>
      <p className="mt-2 text-sm text-ink-500 md:text-base">
        {user?.phone ? `Signed in as +91 ${user.phone}` : "Your glow, on schedule — here’s everything at a glance."}
      </p>
    </header>
  );
}
