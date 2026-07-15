import type { Metadata } from "next";
import { AccountNav } from "./account-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-gn py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr] lg:gap-10">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
