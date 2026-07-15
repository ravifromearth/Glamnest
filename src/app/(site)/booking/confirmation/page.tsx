import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Check, Home, MessageCircle, Sparkles, UserCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Booking Confirmed",
    description: "Your GlamNest booking is confirmed — a verified beautician will arrive at your slot.",
    path: "/booking/confirmation",
  }),
  robots: { index: false, follow: false },
};

function formatConfirmationDate(iso?: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; service?: string; date?: string; slot?: string }>;
}) {
  const { id, service, date, slot } = await searchParams;
  const prettyDate = formatConfirmationDate(date);

  const timeline = [
    {
      icon: Check,
      title: "Booking confirmed",
      description: "Your slot is locked in. A confirmation is on its way on WhatsApp.",
      done: true,
    },
    {
      icon: UserCheck,
      title: "Beautician assigned",
      description: "A verified professional is matched to your booking about 12 hours before the visit.",
      done: false,
    },
    {
      icon: CalendarCheck,
      title: "Arrives at your slot",
      description: prettyDate
        ? `Expect your beautician on ${prettyDate}${slot ? ` around ${slot}` : ""}, sealed kit in hand.`
        : "Your beautician arrives at your chosen slot, sealed kit in hand.",
      done: false,
    },
  ];

  return (
    <div className="container-gn section-gn">
      {/* Gold check animation */}
      <style>{`
        @keyframes gn-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes gn-halo {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .gn-pop { animation: gn-pop 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .gn-halo { animation: gn-halo 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both; }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <div className="relative mx-auto flex size-24 items-center justify-center">
          <span className="gn-halo absolute inset-0 rounded-full bg-gold-500/30" aria-hidden />
          <span className="gn-pop relative flex size-20 items-center justify-center rounded-full bg-gold-500 shadow-gold">
            <Check className="size-10 text-ink-950" strokeWidth={3} />
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
          Booking confirmed
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink-950 md:text-5xl">
          The salon is coming to you
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          {service ? (
            <>
              Your <span className="font-medium text-ink-800">{service}</span> is booked
              {prettyDate ? ` for ${prettyDate}` : ""}
              {slot ? ` at ${slot}` : ""}. Sit back — we handle everything from here.
            </>
          ) : (
            "Your booking is locked in. Sit back — we handle everything from here."
          )}
        </p>

        {id && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-gold-500/60 bg-gold-500/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-gold-700">
            <Sparkles className="size-4" />
            Booking ID · {id}
          </p>
        )}

        {/* What happens next */}
        <div className="mt-12 rounded-3xl border border-ink-950/8 bg-white p-6 text-left shadow-soft md:p-8">
          <h2 className="font-display text-xl font-semibold text-ink-950">What happens next</h2>
          <ol className="mt-6 space-y-0">
            {timeline.map((item, i) => (
              <li key={item.title} className="relative flex gap-4 pb-8 last:pb-0">
                {i < timeline.length - 1 && (
                  <span
                    className="absolute left-[1.35rem] top-11 h-[calc(100%-2.75rem)] w-px bg-gradient-to-b from-gold-500/60 to-ink-950/8"
                    aria-hidden
                  />
                )}
                <span
                  className={
                    item.done
                      ? "flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-gold"
                      : "flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-100 text-ink-500"
                  }
                >
                  <item.icon className="size-5" />
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-ink-950">{item.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-emerald-50 px-4 py-3.5 text-sm text-emerald-800">
            <MessageCircle className="mt-0.5 size-4 shrink-0" />
            We&apos;ve sent your booking details on WhatsApp — reply there any time to reschedule,
            add services or reach your beautician.
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/account/bookings">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              <CalendarCheck />
              View my bookings
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
