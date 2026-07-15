import type { Metadata } from "next";
import { PortalShell, type PortalNavGroup } from "@/components/portal/portal-shell";
import { OnlineToggle } from "@/components/portal/online-toggle";

export const metadata: Metadata = {
  title: {
    default: "Partner Portal — GlamNest",
    template: "%s — GlamNest Partner",
  },
  robots: { index: false },
};

const NAV: PortalNavGroup[] = [
  {
    items: [
      { label: "Overview", href: "/partner", icon: "LayoutDashboard" },
      { label: "Today's Jobs", href: "/partner/jobs", icon: "Briefcase" },
      { label: "Appointments", href: "/partner/appointments", icon: "CalendarDays" },
      { label: "Earnings", href: "/partner/earnings", icon: "IndianRupee" },
      { label: "Wallet", href: "/partner/wallet", icon: "Wallet" },
      { label: "Attendance", href: "/partner/attendance", icon: "CalendarCheck" },
      { label: "Schedule", href: "/partner/schedule", icon: "CalendarRange" },
      { label: "Reviews", href: "/partner/reviews", icon: "Star" },
      { label: "Documents", href: "/partner/documents", icon: "FileCheck" },
      { label: "Service Areas", href: "/partner/areas", icon: "MapPin" },
      { label: "Availability", href: "/partner/availability", icon: "Clock3" },
      { label: "Support", href: "/partner/support", icon: "LifeBuoy" },
    ],
  },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      subtitle="Partner Portal"
      nav={NAV}
      rootHref="/partner"
      user={{ name: "Sunita Devi", initials: "SD", role: "Bridal & Makeup Specialist" }}
      topbarExtra={<OnlineToggle />}
    >
      {children}
    </PortalShell>
  );
}
