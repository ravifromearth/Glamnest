import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schedule",
  robots: { index: false },
};

type SlotKind = "makeup" | "skin" | "waxing" | "other";

interface Slot {
  time: string;
  title: string;
  kind: SlotKind;
}

const KIND_STYLE: Record<SlotKind, string> = {
  makeup: "bg-gold-500/15 text-gold-700 border-gold-500/30",
  skin: "bg-emerald-100 text-emerald-800 border-emerald-200",
  waxing: "bg-amber-100 text-amber-800 border-amber-200",
  other: "bg-sky-100 text-sky-800 border-sky-200",
};

const WEEK: { day: string; date: string; today?: boolean; slots: Slot[] }[] = [
  {
    day: "Mon",
    date: "13 Jul",
    slots: [
      { time: "11:00 AM", title: "Party Makeup", kind: "makeup" },
      { time: "4:00 PM", title: "Waxing", kind: "waxing" },
    ],
  },
  {
    day: "Tue",
    date: "14 Jul",
    today: true,
    slots: [
      { time: "10:00 AM", title: "Glow Facial", kind: "skin" },
      { time: "1:00 PM", title: "Party Makeup", kind: "makeup" },
      { time: "5:00 PM", title: "Waxing", kind: "waxing" },
    ],
  },
  {
    day: "Wed",
    date: "15 Jul",
    slots: [
      { time: "11:00 AM", title: "24K Gold Facial", kind: "skin" },
      { time: "4:30 PM", title: "Mani-Pedi", kind: "other" },
    ],
  },
  { day: "Thu", date: "16 Jul", slots: [] },
  {
    day: "Fri",
    date: "17 Jul",
    slots: [{ time: "9:00 AM", title: "Engagement Makeup", kind: "makeup" }],
  },
  {
    day: "Sat",
    date: "18 Jul",
    slots: [
      { time: "10:30 AM", title: "Cleanup", kind: "skin" },
      { time: "2:00 PM", title: "Party Makeup", kind: "makeup" },
    ],
  },
  {
    day: "Sun",
    date: "19 Jul",
    slots: [{ time: "3:00 PM", title: "De-Tan Cleanup", kind: "skin" }],
  },
];

const LEGEND: { label: string; kind: SlotKind }[] = [
  { label: "Makeup", kind: "makeup" },
  { label: "Skin & facial", kind: "skin" },
  { label: "Waxing", kind: "waxing" },
  { label: "Other", kind: "other" },
];

export default function PartnerSchedulePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle>Week of 13 – 19 July 2026</CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
            {LEGEND.map((l) => (
              <span key={l.kind} className="inline-flex items-center gap-1.5">
                <span className={cn("size-2.5 rounded-full border", KIND_STYLE[l.kind])} aria-hidden />
                {l.label}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid min-w-[840px] grid-cols-7 gap-3">
              {WEEK.map((day) => (
                <div
                  key={day.day}
                  className={cn(
                    "flex min-h-56 flex-col gap-2 rounded-2xl border p-3",
                    day.today ? "border-gold-500/50 bg-gold-500/5" : "border-ink-950/8 bg-cream-50"
                  )}
                >
                  <div className="text-center">
                    <p className={cn("text-xs font-semibold uppercase tracking-wide", day.today ? "text-gold-600" : "text-ink-500")}>
                      {day.day}
                    </p>
                    <p className="text-sm font-medium text-ink-950">{day.date}</p>
                  </div>
                  {day.slots.length === 0 ? (
                    <p className="mt-6 text-center text-xs text-ink-400">No bookings</p>
                  ) : (
                    day.slots.map((slot) => (
                      <div
                        key={slot.time}
                        className={cn("rounded-xl border px-2.5 py-2 text-xs", KIND_STYLE[slot.kind])}
                      >
                        <p className="font-semibold">{slot.time}</p>
                        <p className="mt-0.5 truncate">{slot.title}</p>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
