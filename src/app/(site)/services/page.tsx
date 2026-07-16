import { ServicesCatalog } from "./services-catalog";
import { buildMetadata, breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Beauty Services at Home in Patna",
  description:
    "Browse GlamNest's full menu — bridal makeup, party makeup, hair, facials, spa, waxing, mani-pedi, groom, mehendi and senior care. Verified professionals at your doorstep in Patna.",
  path: "/services",
  keywords: ["beauty services at home patna", "salon services home", "beautician services patna"],
});

export default function ServicesPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <ServicesCatalog />
    </>
  );
}
