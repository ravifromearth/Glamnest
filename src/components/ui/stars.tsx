import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold-500", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
      {half && <StarHalf className="size-3.5 fill-current" />}
    </span>
  );
}
