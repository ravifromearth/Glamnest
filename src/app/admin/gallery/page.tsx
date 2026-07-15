import type { Metadata } from "next";
import { GalleryManager } from "./gallery-manager";

export const metadata: Metadata = {
  title: "Makeup Gallery",
  robots: { index: false },
};

export default function AdminGalleryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Makeup Gallery</h2>
        <p className="mt-1 text-sm text-ink-500">
          Upload bridal, party and other makeup photos here. Publish when ready — they feed the
          customer site gallery and Before &amp; After section.
        </p>
      </div>
      <GalleryManager />
    </div>
  );
}
