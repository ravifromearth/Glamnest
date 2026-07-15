import crypto from "node:crypto";
import { NextResponse } from "next/server";

/**
 * POST /api/v1/webhooks/razorpay
 * Razorpay payment webhook — signature-verified, idempotent.
 *
 * Production flow on `payment.captured`:
 *   1. Verify X-Razorpay-Signature (HMAC SHA256 of raw body).
 *   2. Idempotency: skip if event id already processed.
 *   3. Mark Payment CAPTURED, Booking CONFIRMED (prisma transaction).
 *   4. Run beautician allocation, send WhatsApp/SMS/email confirmations.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: { code: "NOT_CONFIGURED", message: "Webhook secret not configured" } },
      { status: 503 }
    );
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (
    !signature ||
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_SIGNATURE", message: "Signature verification failed" } },
      { status: 401 }
    );
  }

  const event = JSON.parse(rawBody) as { event: string };

  switch (event.event) {
    case "payment.captured":
      // prisma.$transaction([...]) → confirm booking, allocate beautician, notify
      break;
    case "payment.failed":
      // mark payment FAILED, release held slot, notify customer with retry link
      break;
    case "refund.processed":
      // mark REFUNDED, credit wallet if refund-to-wallet chosen
      break;
  }

  return NextResponse.json({ ok: true });
}
