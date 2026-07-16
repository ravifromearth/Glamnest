"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { CATEGORIES, SERVICES, isServiceEnabledByDefault } from "@/lib/catalog";

/** Bump version to reset stale local overrides that re-enabled disabled services. */
const FLAGS_KEY = "glamnest-service-flags-v2";

type FlagMap = Record<string, boolean>;

/** Catalog defaults — disabled services start off unless admin enables them. */
function catalogDefaults(): FlagMap {
  const defaults: FlagMap = {};
  for (const service of SERVICES) {
    defaults[service.slug] = service.enabled !== false;
  }
  return defaults;
}

function readFlags(): FlagMap {
  if (typeof window === "undefined") return catalogDefaults();
  try {
    const raw = localStorage.getItem(FLAGS_KEY);
    if (!raw) {
      const defaults = catalogDefaults();
      localStorage.setItem(FLAGS_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const stored = JSON.parse(raw) as FlagMap;
    return { ...catalogDefaults(), ...stored };
  } catch {
    return catalogDefaults();
  }
}

function writeFlags(flags: FlagMap) {
  localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
}

interface ServiceFlagsState {
  flags: FlagMap;
  hydrated: boolean;
  hydrate: () => void;
  isEnabled: (slug: string) => boolean;
  setEnabled: (slug: string, enabled: boolean) => void;
  toggle: (slug: string) => void;
}

export const useServiceFlagsStore = create<ServiceFlagsState>((set, get) => ({
  flags: {},
  hydrated: false,

  hydrate: () => {
    set({ flags: readFlags(), hydrated: true });
  },

  isEnabled: (slug) => {
    const { flags, hydrated } = get();
    if (hydrated && Object.prototype.hasOwnProperty.call(flags, slug)) {
      return flags[slug];
    }
    return isServiceEnabledByDefault(slug);
  },

  setEnabled: (slug, enabled) => {
    const next = { ...get().flags, [slug]: enabled };
    writeFlags(next);
    set({ flags: next, hydrated: true });
  },

  toggle: (slug) => {
    const current = get().isEnabled(slug);
    get().setEnabled(slug, !current);
  },
}));

/** All catalog services with live enable state (for admin). */
export function useAdminServiceRows() {
  const flags = useServiceFlagsStore((s) => s.flags);
  const hydrated = useServiceFlagsStore((s) => s.hydrated);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);

  void flags;
  void hydrated;

  return SERVICES.map((service) => ({
    ...service,
    liveEnabled: isEnabled(service.slug),
  }));
}

/** Categories that still have at least one enabled service (header / footer / booking). */
export function useLiveCategories() {
  const hydrate = useServiceFlagsStore((s) => s.hydrate);
  const isEnabled = useServiceFlagsStore((s) => s.isEnabled);
  const flags = useServiceFlagsStore((s) => s.flags);
  const hydrated = useServiceFlagsStore((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  void flags;
  void hydrated;

  return CATEGORIES.filter((cat) =>
    SERVICES.some((s) => s.categorySlug === cat.slug && isEnabled(s.slug))
  );
}
