import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { WORK_GALLERY } from "@/lib/content";

export function WorkGallery() {
  return (
    <section className="section-gn">
      <div className="container-gn">
        <SectionHeading
          eyebrow="Our Work"
          title="Looks From Priyanka’s Kit"
          description="Real bridal and party makeup by Priyanka Singh — Bridal & Makeup Specialist."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_GALLERY.map((item, index) => (
            <figure
              key={item.src}
              className="group overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={index < 2}
                />
              </div>
              <figcaption className="p-4">
                <p className="font-display text-sm font-semibold text-ink-950">{item.title}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  {item.category} · {item.artist}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
