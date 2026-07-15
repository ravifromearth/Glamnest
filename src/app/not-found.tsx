import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-cream-50 px-6 text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-ink-950 text-gold-400 shadow-lift">
        <Sparkles className="size-8" />
      </span>
      <h1 className="mt-8 font-display text-6xl font-bold text-ink-950">404</h1>
      <p className="mt-3 font-display text-xl font-semibold text-ink-800">
        This page took a spa day.
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
        The page you're looking for doesn't exist or has moved. Let's get you back to something
        beautiful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="size-4" /> Back Home
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="outline" size="lg">Browse Services</Button>
        </Link>
      </div>
    </div>
  );
}
