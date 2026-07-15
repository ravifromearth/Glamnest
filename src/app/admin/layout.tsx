import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel — GlamNest",
    template: "%s — GlamNest Admin",
  },
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
