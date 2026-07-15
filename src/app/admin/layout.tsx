import type { Metadata } from "next";
import { PortalShell, type PortalNavGroup } from "@/components/portal/portal-shell";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel — GlamNest",
    template: "%s — GlamNest Admin",
  },
  robots: { index: false },
};

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      subtitle="Admin Panel"
      nav={NAV}
      rootHref="/admin"
      user={{ name: "Ravi", initials: "RA", role: "Admin · GlamNest HQ Patna" }}
    >
      {children}
    </PortalShell>
  );
}
