import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline} | Salon at Home in Patna`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Book verified beauticians, makeup artists, hairstylists and spa therapists at home in Patna. Premium products, transparent pricing, sealed hygiene kits. GlamNest — Beauty Comes Home.",
  applicationName: BRAND.name,
  keywords: [
    "salon at home patna",
    "beauty services at home",
    "bridal makeup patna",
    "facial at home",
    "beautician at home patna",
  ],
  appleWebApp: {
    capable: true,
    title: BRAND.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
