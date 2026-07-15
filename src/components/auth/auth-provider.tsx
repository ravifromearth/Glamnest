"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

/** Hydrates the auth store from localStorage on the client. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
