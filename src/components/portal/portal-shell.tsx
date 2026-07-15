"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Clock3,
  CreditCard,
  Crown,
  FileCheck,
  Gift,
  ImagePlus,
  IndianRupee,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  Menu,
  Newspaper,
  Scissors,
  Search,
  Settings,
  Sparkles,
  Star,
  Ticket,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** Icon registry so server layouts can pass serialisable icon names. */
const ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Clock3,
  CreditCard,
  Crown,
  FileCheck,
  Gift,
  ImagePlus,
  IndianRupee,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  Newspaper,
  Scissors,
  Settings,
  Sparkles,
  Star,
  Ticket,
  Users,
  Wallet,
};

export interface PortalNavItem {
  label: string;
  href: string;
  icon: string;
}

export interface PortalNavGroup {
  label?: string;
  items: PortalNavItem[];
}

export interface PortalUser {
  name: string;
  initials: string;
  role: string;
}

function isActive(pathname: string, href: string, rootHref: string) {
  if (href === rootHref) return pathname === rootHref;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function PortalLogo({ subtitle }: { subtitle: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-950 ring-1 ring-gold-500/60">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 13c0 2.8 2.2 5 5 5s5-2.2 5-5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          <path d="M12 3l1.2 3.1L16.4 7.3l-3.2 1.2L12 11.6 10.8 8.5 7.6 7.3l3.2-1.2L12 3z" fill="#D4AF37" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-cream-50">
          Glam<span className="text-gold-gradient">Nest</span>
        </span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-cream-100/50">{subtitle}</span>
      </span>
    </div>
  );
}

function SidebarNav({
  nav,
  rootHref,
  pathname,
  onNavigate,
}: {
  nav: PortalNavGroup[];
  rootHref: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 no-scrollbar" aria-label="Portal navigation">
      {nav.map((group, gi) => (
        <div key={group.label ?? gi}>
          {group.label && (
            <p className="px-6 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-100/40">
              {group.label}
            </p>
          )}
          <ul>
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? LayoutDashboard;
              const active = isActive(pathname, item.href, rootHref);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 border-l-2 px-6 py-2.5 text-sm transition-colors",
                      active
                        ? "border-gold-500 bg-white/5 font-medium text-gold-400"
                        : "border-transparent text-cream-100/70 hover:bg-white/5 hover:text-cream-50"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function PortalShell({
  subtitle,
  nav,
  rootHref,
  user,
  topbarExtra,
  children,
}: {
  /** Small caption under the logo, e.g. "Partner Portal". */
  subtitle: string;
  nav: PortalNavGroup[];
  /** Root path of this portal, e.g. "/partner" — matched exactly for active state. */
  rootHref: string;
  user: PortalUser;
  /** Extra topbar content (e.g. online/offline toggle). */
  topbarExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const allItems = nav.flatMap((g) => g.items);
  const current =
    allItems.find((i) => i.href !== rootHref && isActive(pathname, i.href, rootHref)) ??
    allItems.find((i) => i.href === rootHref && pathname === rootHref);

  const sidebarInner = (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
        <PortalLogo subtitle={subtitle} />
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full text-cream-100/70 hover:text-cream-50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>
      <SidebarNav nav={nav} rootHref={rootHref} pathname={pathname} onNavigate={() => setOpen(false)} />
      <div className="flex shrink-0 items-center gap-3 border-t border-white/10 px-6 py-4">
        <Avatar initials={user.initials} className="size-10" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-cream-50">{user.name}</p>
          <p className="truncate text-xs text-cream-100/50">{user.role}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-cream-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink-950 lg:flex">
        {sidebarInner}
      </aside>

      {/* Mobile slide-over */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-ink-950 shadow-lift">
            {sidebarInner}
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-ink-950/8 bg-white/85 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full text-ink-700 hover:bg-ink-950/5 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="min-w-0 truncate font-display text-lg font-semibold text-ink-950">
            {current?.label ?? subtitle}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                placeholder="Search…"
                readOnly
                className="h-10 w-56 rounded-full border border-ink-950/10 bg-cream-50 pl-10 pr-4 text-sm text-ink-950 placeholder:text-ink-400 focus-visible:border-gold-500 focus-visible:outline-none"
                aria-label="Search (decorative)"
              />
            </div>
            {topbarExtra}
            <Avatar initials={user.initials} className="size-10" />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
