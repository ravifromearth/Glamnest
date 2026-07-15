import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — ${BRAND.tagline}`,
    short_name: BRAND.name,
    description:
      "Book verified beauty professionals at home — bridal makeup, facials, hair, spa, waxing and more.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8F5EF",
    theme_color: "#0F0F0F",
    categories: ["beauty", "lifestyle", "shopping"],
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Book a Service", url: "/booking", description: "Start a new booking" },
      { name: "My Bookings", url: "/account/bookings", description: "View upcoming appointments" },
    ],
  };
}
