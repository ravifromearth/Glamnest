/** Client-side Razorpay Checkout helper (test or live key via env). */

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export function getRazorpayKey() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || "";
}

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(!!window.Razorpay));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(!!window.Razorpay);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(options: {
  amountInr: number;
  bookingId: string;
  name: string;
  phone: string;
  email?: string;
  description: string;
}): Promise<RazorpaySuccessResponse | null> {
  const key = getRazorpayKey();
  if (!key) {
    // Demo fallback when no key is configured — simulates a successful payment.
    const confirmed = window.confirm(
      `Demo Razorpay checkout\n\nPay ${options.amountInr.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      })} for booking ${options.bookingId}?\n\n(Set NEXT_PUBLIC_RAZORPAY_KEY_ID for real checkout.)`
    );
    if (!confirmed) return null;
    return { razorpay_payment_id: `pay_demo_${Date.now()}` };
  }

  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Could not load Razorpay. Please try again.");
  }

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key,
      amount: Math.round(options.amountInr * 100),
      currency: "INR",
      name: "GlamNest",
      description: options.description,
      order_id: undefined,
      prefill: {
        name: options.name,
        contact: options.phone,
        email: options.email || undefined,
      },
      notes: { bookingId: options.bookingId },
      theme: { color: "#D4AF37" },
      handler: (response: RazorpaySuccessResponse) => resolve(response),
      modal: {
        ondismiss: () => resolve(null),
      },
    });
    rzp.on("payment.failed", () => {
      reject(new Error("Payment failed. Please try again or choose pay after service."));
    });
    rzp.open();
  });
}
