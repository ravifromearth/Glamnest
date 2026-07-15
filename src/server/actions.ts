"use server";

import { z } from "zod";

/* ============================================================
   SERVER ACTIONS — booking, contact, partner onboarding.
   In production these write to PostgreSQL via Prisma and
   trigger Razorpay orders + WhatsApp/SMS/email notifications.
   Here they validate with Zod and return realistic results.
   ============================================================ */

const bookingSchema = z.object({
  serviceSlug: z.string().min(1),
  packageId: z.string().min(1),
  addOnIds: z.array(z.string()),
  date: z.string().min(1),
  slot: z.string().min(1),
  beauticianId: z.string().min(1),
  address: z.object({
    label: z.string(),
    line1: z.string().min(3),
    locality: z.string().min(2),
    city: z.string().min(2),
    pincode: z.string().regex(/^\d{6}$/),
  }),
  couponCode: z.string().nullable(),
  paymentMethod: z.enum(["razorpay", "pay-after"]),
  total: z.number().positive(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export async function createBooking(input: BookingInput) {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid booking details. Please review and try again." };
  }

  // Production flow:
  // 1. prisma.booking.create(...) with PENDING_PAYMENT status
  // 2. razorpay.orders.create({ amount: total * 100, currency: "INR" })
  // 3. On payment webhook → confirm booking, allocate beautician
  // 4. Send WhatsApp (interakt/gupshup), SMS (MSG91) and email (Resend)
  const bookingId = `GN${new Date().getFullYear()}${Math.floor(100000 + (Date.now() % 900000))}`;

  return {
    ok: true as const,
    bookingId,
    message: "Booking confirmed! A WhatsApp confirmation is on its way.",
  };
}

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  subject: z.string().min(1),
  message: z.string().min(10, "Tell us a little more (min 10 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function submitContact(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid form" };
  }
  // Production: prisma.supportTicket.create + email to care@glamnest.in
  return { ok: true as const, ticketId: `TKT${Date.now() % 1000000}` };
}

const partnerSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  city: z.string().min(2),
  expertise: z.string().min(1),
  experienceYears: z.coerce.number().min(0).max(50),
});

export type PartnerInput = z.infer<typeof partnerSchema>;

export async function applyAsPartner(input: PartnerInput) {
  const parsed = partnerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid form" };
  }
  // Production: prisma.beauticianApplication.create + KYC pipeline kickoff
  return { ok: true as const, applicationId: `APP${Date.now() % 1000000}` };
}
