import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="GlamNest — Beauty Comes Home">
      <span className="relative flex size-9 items-center justify-center rounded-full bg-ink-950 ring-1 ring-gold-500/60 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          {/* Nest + sparkle mark */}
          <path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 13c0 2.8 2.2 5 5 5s5-2.2 5-5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          <path d="M12 3l1.2 3.1L16.4 7.3l-3.2 1.2L12 11.6 10.8 8.5 7.6 7.3l3.2-1.2L12 3z" fill="#D4AF37" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-xl font-bold tracking-tight", dark ? "text-cream-50" : "text-ink-950")}>
          Glam<span className="text-gold-gradient">Nest</span>
        </span>
        <span className={cn("text-[9px] font-medium uppercase tracking-[0.28em]", dark ? "text-cream-100/60" : "text-ink-500")}>
          Beauty Comes Home
        </span>
      </span>
    </Link>
  );
}
