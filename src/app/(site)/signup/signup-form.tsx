"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const signUp = useAuthStore((s) => s.signUp);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signUp({ name, phone, email, password });
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
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          autoComplete="name"
          placeholder="e.g. Priya Sinha"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-phone">Mobile number</Label>
        <Input
          id="signup-phone"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">
          Email <span className="font-normal text-ink-400">(optional)</span>
        </Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
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
            <Loader2 className="animate-spin" /> Creating account…
          </>
        ) : (
          "Sign Up"
        )}
      </Button>

      <p className="text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link href={`/signin?next=${encodeURIComponent(next)}`} className="font-medium text-gold-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
