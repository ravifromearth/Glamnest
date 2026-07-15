"use client";

import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PortalShell, type PortalNavGroup } from "@/components/portal/portal-shell";
import { AdminAuthGate } from "@/components/auth/admin-auth-gate";
import { useAdminAuthStore } from "@/stores/admin-auth-store";
import { Button } from "@/components/ui/button";

const NAV: PortalNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: "LayoutDashboard" }],
  },
  {
    label: "Marketplace",
    items: [
      { label: "Bookings", href: "/admin/bookings", icon: "CalendarDays" },
      { label: "Customers", href: "/admin/customers", icon: "Users" },
      { label: "Beauticians", href: "/admin/beauticians", icon: "Sparkles" },
      { label: "Reviews", href: "/admin/reviews", icon: "Star" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Services", href: "/admin/services", icon: "Scissors" },
      { label: "Categories", href: "/admin/categories", icon: "LayoutGrid" },
      { label: "Pricing", href: "/admin/pricing", icon: "IndianRupee" },
      { label: "Locations", href: "/admin/locations", icon: "MapPin" },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Coupons", href: "/admin/coupons", icon: "Ticket" },
      { label: "Referrals", href: "/admin/referrals", icon: "Gift" },
      { label: "Memberships", href: "/admin/memberships", icon: "Crown" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", href: "/admin/payments", icon: "CreditCard" },
      { label: "Settlements", href: "/admin/settlements", icon: "Landmark" },
      { label: "Wallets", href: "/admin/wallets", icon: "Wallet" },
    ],
  },
  {
    label: "Content & Ops",
    items: [
      { label: "Makeup Gallery", href: "/admin/gallery", icon: "ImagePlus" },
      { label: "Blogs", href: "/admin/blogs", icon: "Newspaper" },
      { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
      { label: "Support", href: "/admin/support", icon: "LifeBuoy" },
      { label: "Reports", href: "/admin/reports", icon: "BarChart3" },
      { label: "Settings", href: "/admin/settings", icon: "Settings" },
    ],
  },
];

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAdminAuthStore((s) => s.session);
  const signOut = useAdminAuthStore((s) => s.signOut);

  if (pathname === "/admin/login") {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-dvh items-center justify-center text-sm text-ink-500">Loading…</div>
        }
      >
        {children}
      </Suspense>
    );
  }

  const name = session?.name ?? "Admin";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <PortalShell
      subtitle="Admin Panel"
      nav={NAV}
      rootHref="/admin"
      user={{ name, initials, role: "Admin · GlamNest" }}
      topbarExtra={
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            signOut();
            router.push("/admin/login");
          }}
        >
          Sign Out
        </Button>
      }
    >
      {children}
    </PortalShell>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <AdminShellInner>{children}</AdminShellInner>
    </AdminAuthGate>
  );
}
