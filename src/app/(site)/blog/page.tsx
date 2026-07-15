import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The GlamNest Journal — Beauty Tips & Stories",
  description:
    "Bridal prep timelines, honest skincare advice, monsoon hair guides and stories from the professionals behind GlamNest — written by our own artists and trainers.",
  path: "/blog",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;
  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dots">
        <div className="container-gn section-gn pb-8 md:pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
              The GlamNest Journal
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-6xl">
              Beauty wisdom, <span className="text-gold-gradient">honestly told</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
              Written by our artists, trainers and dermat advisors — no fluff, no upsell, just
              what actually works.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Badge variant="default">All Posts</Badge>
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-white">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="container-gn pb-6 md:pb-10">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift lg:grid-cols-2"
        >
          <div className={`flex min-h-64 items-center justify-center bg-gradient-to-br ${featured.gradient} lg:min-h-full`}>
            <span className="text-8xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
              {featured.emoji}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gold">{featured.category}</Badge>
              <Badge variant="cream">Featured</Badge>
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-ink-950 sm:text-3xl md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 sm:text-base">{featured.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
              <span className="font-medium text-ink-800">{featured.author}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {featured.readMinutes} min read
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
              Read the full story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      {/* Post grid */}
      <section className="section-gn pt-6 md:pt-10">
        <div className="container-gn">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${post.gradient}`}>
                  <span className="text-6xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
                    {post.emoji}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Badge variant="gold" className="self-start">
                    {post.category}
                  </Badge>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink-950">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-950/6 pt-4 text-xs text-ink-500">
                    <span className="font-medium text-ink-800">{post.author}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" /> {post.readMinutes} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="pb-16 md:pb-24">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 sm:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">
                The Glow Letter
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
                One useful beauty tip, every fortnight
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream-100/70">
                No spam, no 40% off banners. Just the advice our artists give their own families.
              </p>
              <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="h-12 border-white/15 bg-white/10 text-cream-50 placeholder:text-cream-100/40 focus-visible:border-gold-400"
                />
                <Button variant="gold" size="lg" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
