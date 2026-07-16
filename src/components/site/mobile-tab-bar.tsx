"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, LayoutGrid, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: LayoutGrid },
  { label: "Bookings", href: "/account/bookings", icon: CalendarDays },
  { label: "Profile", href: "/account", icon: UserRound },
];

/** App-style bottom navigation, mobile only. */
export function MobileTabBar() {
  const pathname = usePathname();

  // Hide inside portal/admin experiences which have their own nav
  if (pathname.startsWith("/partner") || pathname.startsWith("/admin") || pathname.startsWith("/booking")) {
    return null;
  }

  return (
    <nav
      className="glass fixed inset-x-0 bottom-0 z-50 border-t border-ink-950/8 pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="App navigation"
    >
      <div className="grid h-16 grid-cols-4">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                active ? "text-gold-600" : "text-ink-500"
              )}
            >
              <tab.icon className={cn("size-5", active && "fill-gold-500/15")} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
