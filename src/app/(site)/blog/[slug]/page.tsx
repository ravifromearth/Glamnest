import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, getBlogPost } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      description: "The article you're looking for doesn't exist.",
      path: "/blog",
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 2);

  return (
    <>
      {/* Post hero */}
      <section className={`bg-gradient-to-br ${post.gradient}`}>
        <div className="container-gn py-14 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors hover:text-ink-950"
          >
            <ArrowLeft className="size-4" /> Back to the Journal
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">{post.category}</Badge>
              <span className="text-4xl" aria-hidden>
                {post.emoji}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" /> {post.readMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="section-gn">
        <div className="container-gn">
          <div className="mx-auto max-w-2xl">
            {post.content.map((section, i) => (
              <section key={section.heading ?? `intro-${i}`} className={i === 0 ? "" : "mt-10"}>
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold leading-tight text-ink-950 sm:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={`mt-5 leading-relaxed text-ink-700 ${i === 0 ? "text-lg" : "text-base"}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {/* Author block */}
            <div className="mt-14 flex items-center gap-4 rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
              <Avatar initials={initialsOf(post.author)} className="size-14 text-base" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
                  Written by
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-950">{post.author}</p>
                <p className="text-sm text-ink-500">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="bg-cream-100/60 py-14 md:py-20">
        <div className="container-gn">
          <h2 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex gap-5 rounded-3xl border border-ink-950/8 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={`flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${rel.gradient}`}>
                  <span className="text-4xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
                    {rel.emoji}
                  </span>
                </div>
                <div className="min-w-0">
                  <Badge variant="gold">{rel.category}</Badge>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-950">
                    {rel.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-500">
                    {formatDate(rel.publishedAt)} · {rel.readMinutes} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-gn">
        <div className="container-gn">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-center sm:px-12 md:py-16">
            <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-cream-50 sm:text-4xl">
              Reading about glow is nice. Booking it is better.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-100/70 sm:text-base">
              Verified professionals, sealed kits and salon-grade results — at your doorstep
              across Patna.
            </p>
            <div className="mt-8">
              <Link href="/booking">
                <Button variant="gold" size="xl">
                  Book a Service <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
