import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account/", "/partner/", "/admin/", "/api/", "/booking/confirmation"],
      },
    ],
    sitemap: `${BRAND.domain}/sitemap.xml`,
    host: BRAND.domain,
  };
}
