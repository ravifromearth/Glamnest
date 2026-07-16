"use client";

import Link from "next/link";
import { useLiveCategories } from "@/stores/service-flags-store";

export function FooterServicesNav() {
  const liveCategories = useLiveCategories();

  return (
    <ul className="mt-5 space-y-2.5 text-sm">
      {liveCategories.slice(0, 8).map((cat) => (
        <li key={cat.slug}>
          <Link href={`/services/${cat.slug}`} className="text-cream-100/60 transition-colors hover:text-gold-400">
            {cat.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
