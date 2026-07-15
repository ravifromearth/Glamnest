"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";

export default function AccountSettingsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Settings</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-950">Account settings</h1>
        <p className="mt-2 text-sm text-ink-500">
          Your profile is stored locally on this device for 30 days.
        </p>
      </header>

      <div className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink-950">Profile</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-ink-950/6 pb-3">
            <dt className="text-ink-500">Name</dt>
            <dd className="font-medium text-ink-950">{user?.name}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-ink-950/6 pb-3">
            <dt className="text-ink-500">Mobile</dt>
            <dd className="font-medium text-ink-950">+91 {user?.phone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Email</dt>
            <dd className="font-medium text-ink-950">{user?.email || "—"}</dd>
          </div>
        </dl>
      </div>

      <Button variant="outline" onClick={handleSignOut}>
        <LogOut />
        Sign Out
      </Button>
    </div>
  );
}
