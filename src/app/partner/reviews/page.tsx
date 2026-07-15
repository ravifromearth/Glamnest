import type { Metadata } from "next";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Stars } from "@/components/ui/stars";

export const metadata: Metadata = {
  title: "Reviews",
  robots: { index: false },
};

const DISTRIBUTION = [
  { stars: 5, count: 289 },
  { stars: 4, count: 24 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const TOTAL = DISTRIBUTION.reduce((sum, d) => sum + d.count, 0);

const REVIEWS = [
  {
    name: "Shreya Raj",
    initials: "SR",
    rating: 5,
    service: "Engagement Makeup",
    date: "12 Jul 2026",
    quote:
      "Priyanka ji understood exactly the look I wanted for my engagement. The makeup lasted the whole evening and photographed beautifully.",
  },
  {
    name: "Anjali Sinha",
    initials: "AS",
    rating: 5,
    service: "Glow Facial",
    date: "10 Jul 2026",
    quote: "So professional — sealed products, fresh towels, and my skin is glowing. Booking her every month now.",
  },
  {
    name: "Neha Gupta",
    initials: "NG",
    rating: 4.5,
    service: "Party Makeup",
    date: "6 Jul 2026",
    quote: "Lovely soft glam for my sister's sangeet. Arrived right on time and was very patient with touch-ups.",
  },
  {
    name: "Ritu Verma",
    initials: "RV",
    rating: 5,
    service: "Full Body Waxing",
    date: "2 Jul 2026",
    quote: "Hygiene was top notch — no double dipping, everything single-use. Quick and almost painless.",
  },
];

export default function PartnerReviewsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="text-center sm:pr-6">
            <p className="font-display text-5xl font-bold text-ink-950">4.9</p>
            <Stars rating={4.9} className="mt-2 justify-center" />
            <p className="mt-1 text-xs text-ink-500">{TOTAL} reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {DISTRIBUTION.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs text-ink-500">
                <span className="w-8 shrink-0 text-right font-medium text-ink-700">{d.stars}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-gold-500"
                    style={{ width: `${Math.max((d.count / TOTAL) * 100, 1)}%` }}
                  />
                </div>
                <span className="w-8 shrink-0">{d.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-ink-950">Recent reviews</h3>
        {REVIEWS.map((review) => (
          <Card key={`${review.name}-${review.date}`}>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={review.initials} />
                <div className="min-w-0">
                  <p className="font-medium text-ink-950">{review.name}</p>
                  <p className="text-xs text-ink-500">{review.date}</p>
                </div>
                <Stars rating={review.rating} className="ml-auto shrink-0" />
              </div>
              <p className="text-sm leading-relaxed text-ink-700">&ldquo;{review.quote}&rdquo;</p>
              <Badge variant="cream">{review.service}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
