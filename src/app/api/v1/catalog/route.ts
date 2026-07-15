import { NextResponse } from "next/server";
import { CATEGORIES, SERVICES } from "@/lib/catalog";

/**
 * GET /api/v1/catalog
 * Public catalog feed for the mobile app / PWA.
 * Production: served from PostgreSQL with per-city pricing applied.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const services = category ? SERVICES.filter((s) => s.categorySlug === category) : SERVICES;

  return NextResponse.json(
    {
      ok: true,
      data: {
        categories: CATEGORIES,
        services: services.map(({ faqs: _faqs, ...s }) => s),
      },
    },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
