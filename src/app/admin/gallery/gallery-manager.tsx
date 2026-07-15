"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type GalleryCategory = "Bridal Makeup" | "Party Makeup" | "Engagement Makeup" | "Hair & Makeup" | "Other";

interface GalleryPhoto {
  id: string;
  previewUrl: string;
  fileName: string;
  category: GalleryCategory;
  caption: string;
  status: "Draft" | "Published";
  uploadedAt: string;
}

const CATEGORIES: GalleryCategory[] = [
  "Bridal Makeup",
  "Party Makeup",
  "Engagement Makeup",
  "Hair & Makeup",
  "Other",
];

const SEED: GalleryPhoto[] = [
  {
    id: "seed-1",
    previewUrl: "/gallery/priyanka/work-01.jpg",
    fileName: "work-01.jpg",
    category: "Bridal Makeup",
    caption: "Classic bridal glow — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
  {
    id: "seed-2",
    previewUrl: "/gallery/priyanka/work-02.jpg",
    fileName: "work-02.jpg",
    category: "Bridal Makeup",
    caption: "Red lehenga bridal — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
  {
    id: "seed-3",
    previewUrl: "/gallery/priyanka/work-03.jpg",
    fileName: "work-03.jpg",
    category: "Party Makeup",
    caption: "Evening party glam — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
  {
    id: "seed-4",
    previewUrl: "/gallery/priyanka/work-04.jpg",
    fileName: "work-04.jpg",
    category: "Party Makeup",
    caption: "Soft celebration look — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
  {
    id: "seed-5",
    previewUrl: "/gallery/priyanka/work-05.jpg",
    fileName: "work-05.jpg",
    category: "Bridal Makeup",
    caption: "Bridal finish — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
  {
    id: "seed-6",
    previewUrl: "/gallery/priyanka/work-06.jpg",
    fileName: "work-06.jpg",
    category: "Other",
    caption: "Signature glam — Priyanka Singh",
    status: "Published",
    uploadedAt: "15 Jul 2026",
  },
];

export function GalleryManager() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(SEED);
  const [category, setCategory] = useState<GalleryCategory>("Bridal Makeup");
  const [caption, setCaption] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const now = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const next: GalleryPhoto[] = Array.from(files).map((file) => ({
      id: `local-${Date.now()}-${file.name}`,
      previewUrl: URL.createObjectURL(file),
      fileName: file.name,
      category,
      caption: caption.trim() || file.name.replace(/\.[^.]+$/, ""),
      status: "Draft",
      uploadedAt: now,
    }));
    setPhotos((prev) => [...next, ...prev]);
    setCaption("");
    setNotice(`${next.length} photo${next.length > 1 ? "s" : ""} ready — mark as Published to show on the site.`);
    if (inputRef.current) inputRef.current.value = "";
  }

  function publish(id: string) {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Published" as const } : p))
    );
    setNotice("Photo published. It will appear in Before & After / makeup gallery on the customer site.");
  }

  function remove(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-950">Upload makeup photos</h3>
            <p className="mt-1 text-sm text-ink-500">
              Add before/after or finished looks. Choose a category, optional caption, then select
              images (JPG, PNG or WebP).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gallery-category">Service category</Label>
              <Select
                id="gallery-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery-caption">Caption (optional)</Label>
              <Input
                id="gallery-caption"
                placeholder="e.g. Soft glam bridal — Indiranagar"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink-950/20 bg-cream-50 px-6 py-12 text-center transition-colors hover:border-gold-500 hover:bg-gold-500/5"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-950 text-gold-400">
              <Upload className="size-5" />
            </span>
            <span>
              <span className="block font-medium text-ink-950">Click to upload makeup photos</span>
              <span className="mt-1 block text-sm text-ink-500">or drag files here · max 5 MB each</span>
            </span>
          </button>

          {notice && (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
              {notice}
            </p>
          )}
        </CardContent>
      </Card>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink-950">Gallery library</h3>
          <Badge variant="cream">{photos.length} photos</Badge>
        </div>

        {photos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <ImagePlus className="size-8 text-ink-300" />
              <p className="text-sm text-ink-500">No photos yet — upload your first makeup look above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div
                  className={cn(
                    "relative aspect-[4/3] bg-gradient-to-br from-cream-100 to-ink-950/5",
                    !photo.previewUrl && "flex items-center justify-center"
                  )}
                >
                  {photo.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.previewUrl}
                      alt={photo.caption}
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImagePlus className="size-10 text-ink-300" />
                  )}
                  <span className="absolute left-3 top-3">
                    <Badge variant={photo.status === "Published" ? "success" : "warning"}>
                      {photo.status}
                    </Badge>
                  </span>
                </div>
                <CardContent className="space-y-3 p-4">
                  <div>
                    <p className="font-medium text-ink-950">{photo.caption}</p>
                    <p className="text-xs text-ink-500">
                      {photo.category} · {photo.uploadedAt}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-ink-400">{photo.fileName}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {photo.status !== "Published" && (
                      <Button size="sm" variant="gold" onClick={() => publish(photo.id)}>
                        Publish
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => remove(photo.id)}>
                      <Trash2 />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
