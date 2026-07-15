"use client";

export function StepHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-500 md:text-base">{description}</p>
    </header>
  );
}
