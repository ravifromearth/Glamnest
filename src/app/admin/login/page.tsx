import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-ink-950 text-sm text-cream-100/70">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
