import { Hero } from "@/components/home/hero";
import { PopularServices } from "@/components/home/popular-services";
import { WhyGlamNest } from "@/components/home/why-glamnest";
import { HowItWorks } from "@/components/home/how-it-works";
import { BridalShowcase } from "@/components/home/bridal-showcase";
import { PackagesPreview } from "@/components/home/packages-preview";
import { MembershipPreview } from "@/components/home/membership-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WorkGallery } from "@/components/home/work-gallery";
import { AppDownload } from "@/components/home/app-download";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { FAQS } from "@/lib/content";
import {
  buildMetadata,
  faqJsonLd,
  jsonLdScriptProps,
  localBusinessJsonLd,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GlamNest — Beauty Comes Home | Salon at Home in Patna",
  description:
    "Premium beauty services at your doorstep. Book verified beauticians, bridal makeup artists, hairstylists and spa therapists across Patna in minutes.",
  path: "/",
  keywords: [
    "salon at home patna",
    "beauty parlour at home",
    "bridal makeup at home patna",
    "beautician home service patna",
  ],
});

export default function HomePage() {
  return (
    <>
      <script {...jsonLdScriptProps(localBusinessJsonLd("patna"))} />
      <script {...jsonLdScriptProps(faqJsonLd(FAQS.slice(0, 6)))} />

      <Hero />
      <PopularServices />
      <WhyGlamNest />
      <HowItWorks />
      <BridalShowcase />
      <PackagesPreview />
      <MembershipPreview />
      <TestimonialsSection />
      <WorkGallery />
      <AppDownload />
      <BlogTeaser />
    </>
  );
}
