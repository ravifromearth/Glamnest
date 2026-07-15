import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { CATEGORIES, SERVICES } from "@/lib/catalog";
import { BLOG_POSTS } from "@/lib/content";
import { allSeoLandingSlugs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.domain;
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/services", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/packages", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/membership", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/gift-cards", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/booking", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.4, changeFrequency: "weekly" as const },
    { path: "/become-a-partner", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${base}/services/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const servicePages = SERVICES.map((svc) => ({
    url: `${base}/services/${svc.categorySlug}/${svc.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const seoPages = allSeoLandingSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...seoPages, ...blogPages];
}
