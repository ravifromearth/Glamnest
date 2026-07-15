"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddOn, Service, ServicePackage } from "@/lib/types";

/* ============================================================
   BOOKING ENGINE — client-side state machine
   Steps: category → service → package → address → date →
          slot → beautician → review → payment → confirmed
   ============================================================ */

export const BOOKING_STEPS = [
  "category",
  "service",
  "package",
  "address",
  "schedule",
  "beautician",
  "review",
  "payment",
] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number];

export interface BookingAddress {
  id: string;
  label: string;
  line1: string;
  locality: string;
  city: string;
  pincode: string;
}

export interface BeauticianOption {
  id: string;
  name: string;
  rating: number;
  jobs: number;
  specialty: string;
  initials: string;
}

interface BookingState {
  step: BookingStep;
  categorySlug: string | null;
  service: Service | null;
  servicePackage: ServicePackage | null;
  addOns: AddOn[];
  address: BookingAddress | null;
  date: string | null; // ISO date
  slot: string | null; // "10:00 AM"
  beautician: BeauticianOption | null;
  couponCode: string | null;
  couponDiscount: number;
  paymentMethod: "razorpay" | "pay-after" | null;

  setStep: (step: BookingStep) => void;
  goNext: () => void;
  goBack: () => void;
  selectCategory: (slug: string) => void;
  selectService: (service: Service) => void;
  selectPackage: (pkg: ServicePackage) => void;
  toggleAddOn: (addOn: AddOn) => void;
  setAddress: (address: BookingAddress) => void;
  setSchedule: (date: string, slot: string | null) => void;
  setBeautician: (b: BeauticianOption) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setPaymentMethod: (m: "razorpay" | "pay-after") => void;
  reset: () => void;
}

const initialState = {
  step: "category" as BookingStep,
  categorySlug: null,
  service: null,
  servicePackage: null,
  addOns: [] as AddOn[],
  address: null,
  date: null,
  slot: null,
  beautician: null,
  couponCode: null,
  couponDiscount: 0,
  paymentMethod: null,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      goNext: () => {
        const idx = BOOKING_STEPS.indexOf(get().step);
        if (idx < BOOKING_STEPS.length - 1) set({ step: BOOKING_STEPS[idx + 1] });
      },

      goBack: () => {
        const idx = BOOKING_STEPS.indexOf(get().step);
        if (idx > 0) set({ step: BOOKING_STEPS[idx - 1] });
      },

      selectCategory: (slug) =>
        set({ categorySlug: slug, service: null, servicePackage: null, addOns: [], step: "service" }),

      selectService: (service) =>
        set({ service, servicePackage: null, addOns: [], step: "package" }),

      selectPackage: (pkg) => set({ servicePackage: pkg }),

      toggleAddOn: (addOn) => {
        const current = get().addOns;
        const exists = current.some((a) => a.id === addOn.id);
        set({ addOns: exists ? current.filter((a) => a.id !== addOn.id) : [...current, addOn] });
      },

      setAddress: (address) => set({ address }),

      setSchedule: (date, slot) => set({ date, slot }),

      setBeautician: (beautician) => set({ beautician }),

      applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

      reset: () => set(initialState),
    }),
    { name: "glamnest-booking" }
  )
);

/** Derived pricing — GST-inclusive totals with coupon + visit fee. */
export function useBookingTotals() {
  const { servicePackage, addOns, couponDiscount } = useBookingStore();
  const packagePrice = servicePackage?.price ?? 0;
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  const subtotal = packagePrice + addOnTotal;
  const visitFee = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const discount = Math.min(couponDiscount, subtotal);
  const total = Math.max(0, subtotal + visitFee - discount);
  return { packagePrice, addOnTotal, subtotal, visitFee, discount, total };
}

export const TIME_SLOTS = [
  "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM",
] as const;

export const COUPONS: Record<string, { discount: number; description: string }> = {
  GLAMFIRST: { discount: 300, description: "₹300 off your first booking" },
  PATNA100: { discount: 100, description: "₹100 off for Patna launch" },
  GLOWUP15: { discount: 250, description: "₹250 off orders above ₹1,500" },
};
