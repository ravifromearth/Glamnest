"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/stores/admin-auth-store";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, hydrated, hydrate } = useAdminAuthStore();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated || isLogin) return;
    if (!session) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname || "/admin")}`);
    }
  }, [hydrated, session, isLogin, pathname, router]);

  if (isLogin) return <>{children}</>;

  if (!hydrated || !session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-cream-50 text-sm text-ink-500">
        Checking admin access…
      </div>
    );
  }

  return <>{children}</>;
}
