import { NextResponse } from "next/server";
import { z } from "zod";
import { TIME_SLOTS } from "@/stores/booking-store";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  serviceSlug: z.string().min(1),
});

/**
 * GET /api/v1/slots?date=2026-07-20&serviceSlug=glow-facial
 * Real-time slot availability.
 * Production: availability = beautician schedules ∩ existing bookings ∩ travel buffers
 * (see docs/07-booking-engine.md). Mocked deterministically here.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    date: searchParams.get("date"),
    serviceSlug: searchParams.get("serviceSlug"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_QUERY", message: "date (YYYY-MM-DD) and serviceSlug are required" } },
      { status: 400 }
    );
  }

  const dayIndex = new Date(parsed.data.date).getDate();
  const slots = TIME_SLOTS.map((slot, i) => ({
    slot,
    available: (dayIndex + i) % 4 !== 0,
  }));

  return NextResponse.json({ ok: true, data: { date: parsed.data.date, slots } });
}
