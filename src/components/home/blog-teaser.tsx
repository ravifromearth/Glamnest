import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function BlogTeaser() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="section-gn bg-cream-100">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Beauty Tips & Stories"
          title="From The GlamNest Journal"
          description="Expert routines, honest product talk and stories from the professionals behind your bookings."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className={cn("relative flex h-40 items-center justify-center bg-gradient-to-br", post.gradient)}>
                <span className="text-6xl transition-transform duration-500 group-hover:scale-110" aria-hidden>
                  {post.emoji}
                </span>
                <Badge variant="gold" className="absolute left-4 top-4 bg-white/85 backdrop-blur">
                  {post.category}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink-950 transition-colors group-hover:text-gold-700">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-500">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink-950/6 pt-4 text-xs text-ink-500">
                  <span>{post.author}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {post.readMinutes} min read
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              Read The Journal <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
