"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Crown,
  Gift,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquareHeart,
  Settings,
  Ticket,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NAV_ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "Bookings", href: "/account/bookings", icon: CalendarDays },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Membership", href: "/account/membership", icon: Crown },
  { label: "Wallet", href: "/account/wallet", icon: Wallet },
  { label: "Coupons", href: "/account/coupons", icon: Ticket },
  { label: "Rewards", href: "/account/rewards", icon: Gift },
  { label: "Referrals", href: "/account/referrals", icon: Users },
  { label: "Notifications", href: "/account/notifications", icon: Bell },
  { label: "Reviews", href: "/account/reviews", icon: MessageSquareHeart },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/account" ? pathname === "/account" : pathname.startsWith(href);
}

function initialsFrom(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const name = user?.name ?? "Guest";
  const phone = user?.phone ? `+91 ${user.phone}` : "";
  const initials = initialsFrom(name) || "GN";

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <>
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3 border-b border-ink-950/6 pb-5">
            <Avatar initials={initials} />
            <div className="min-w-0">
              <p className="flex items-center gap-2 truncate font-display text-base font-semibold text-ink-950">
                {name}
              </p>
              <p className="truncate text-xs text-ink-500">{phone}</p>
            </div>
            <Badge variant="gold" className="ml-auto shrink-0">
              Member
            </Badge>
          </div>
          <nav className="mt-4 space-y-1" aria-label="Account">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-ink-950 text-gold-400 shadow-soft"
                      : "text-ink-600 hover:bg-cream-100 hover:text-ink-950"
                  )}
                >
                  <item.icon className={cn("size-4", active ? "text-gold-400" : "text-ink-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button variant="outline" size="sm" className="mt-4 w-full" onClick={handleSignOut}>
            <LogOut />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ---------- Mobile: user strip + pill nav ---------- */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3">
          <Avatar initials={initials} />
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold text-ink-950">{name}</p>
            <p className="truncate text-xs text-ink-500">{phone}</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto shrink-0" onClick={handleSignOut}>
            <LogOut />
            Sign Out
          </Button>
        </div>
        <nav
          className="-mx-5 mt-4 overflow-x-auto px-5 no-scrollbar sm:-mx-8 sm:px-8"
          aria-label="Account"
        >
          <div className="flex gap-2 pb-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-ink-950 bg-ink-950 text-gold-400"
                      : "border-ink-950/10 bg-white text-ink-600 hover:border-gold-500/60"
                  )}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
