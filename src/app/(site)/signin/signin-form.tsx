"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const signIn = useAuthStore((s) => s.signIn);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn({ phone, password });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(next);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
      <div className="space-y-2">
        <Label htmlFor="signin-phone">Mobile number</Label>
        <Input
          id="signin-phone"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="gold" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Signing in…
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-center text-sm text-ink-500">
        New to GlamNest?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-medium text-gold-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
