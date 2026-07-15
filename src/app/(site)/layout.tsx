import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileTabBar } from "@/components/site/mobile-tab-bar";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { AuthProvider } from "@/components/auth/auth-provider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileTabBar />
        <WhatsAppButton />
      </div>
    </AuthProvider>
  );
}
