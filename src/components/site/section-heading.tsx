import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem]",
          dark ? "text-cream-50" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-cream-100/70" : "text-ink-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
