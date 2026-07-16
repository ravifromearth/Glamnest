"use client";

import { useLiveCategories } from "@/stores/service-flags-store";

export function ServicesJumpNav() {
  const liveCategories = useLiveCategories();

  return (
    <div className="glass sticky top-16 z-40 border-b border-ink-950/6 md:top-[72px]">
      <div className="container-gn no-scrollbar flex gap-2 overflow-x-auto py-3">
        {liveCategories.map((cat) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-950/10 bg-white px-4 py-1.5 text-xs font-medium text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-700"
          >
            <span aria-hidden>{cat.emoji}</span> {cat.shortName}
          </a>
        ))}
      </div>
    </div>
  );
}
