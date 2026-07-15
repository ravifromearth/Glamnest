"use client";

import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { TIME_SLOTS, useBookingStore } from "@/stores/booking-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StepHeader } from "./step-header";

interface DayOption {
  iso: string;
  weekday: string;
  dayNum: number;
  month: string;
}

function buildNext14Days(): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    days.push({
      iso,
      weekday: i === 0 ? "Today" : i === 1 ? "Tmrw" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return days;
}

export function StepSchedule() {
  const { date, slot, setSchedule, goNext } = useBookingStore();
  const days = useMemo(buildNext14Days, []);

  const selectedDayIndex = Math.max(
    0,
    days.findIndex((d) => d.iso === date)
  );
  const selectedDay = days[selectedDayIndex];

  /* Deterministic mock availability: some slots are "taken". */
  const isUnavailable = (dayIndex: number, slotIndex: number) => (dayIndex + slotIndex) % 4 === 0;

  return (
    <section aria-label="Pick a date and time">
      <StepHeader
        eyebrow="Step 5 · Schedule"
        title="Pick your date & slot"
        description="Slots update in real time — greyed-out times are already booked in your area."
      />

      {/* Date scroller */}
      <div className="-mx-5 overflow-x-auto px-5 no-scrollbar sm:-mx-8 sm:px-8">
        <div className="flex gap-2.5 pb-2">
          {days.map((day, i) => {
            const selected = date === day.iso;
            return (
              <button
                key={day.iso}
                type="button"
                onClick={() => setSchedule(day.iso, null)}
                className={cn(
                  "flex min-h-11 w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border px-2 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  selected
                    ? "border-gold-500 bg-ink-950 text-cream-50 shadow-soft"
                    : "border-ink-950/10 bg-white text-ink-700 hover:border-gold-500/60"
                )}
                aria-pressed={selected}
              >
                <span className={cn("text-[11px] font-medium uppercase tracking-wide", selected ? "text-gold-400" : "text-ink-400")}>
                  {day.weekday}
                </span>
                <span className="mt-0.5 font-display text-xl font-bold leading-none">{day.dayNum}</span>
                <span className={cn("mt-0.5 text-[11px]", selected ? "text-cream-200" : "text-ink-400")}>
                  {day.month}
                </span>
                {i === 0 && !selected && (
                  <span className="mt-1 size-1 rounded-full bg-gold-500" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot grid */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950">
          <CalendarDays className="size-4 text-gold-600" />
          {date
            ? `Available slots · ${selectedDay.weekday === "Today" ? "Today" : `${selectedDay.dayNum} ${selectedDay.month}`}`
            : "Choose a date to see slots"}
        </h2>
        {date && (
          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
            {TIME_SLOTS.map((time, slotIndex) => {
              const unavailable = isUnavailable(selectedDayIndex, slotIndex);
              const selected = slot === time;
              return (
                <button
                  key={time}
                  type="button"
                  disabled={unavailable}
                  onClick={() => setSchedule(date, time)}
                  aria-pressed={selected}
                  className={cn(
                    "min-h-11 rounded-full border px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                    unavailable && "cursor-not-allowed border-ink-950/6 bg-cream-100 text-ink-300 line-through",
                    !unavailable && selected && "border-gold-500 bg-gold-500 text-ink-950 shadow-gold",
                    !unavailable && !selected && "border-ink-950/10 bg-white text-ink-700 hover:border-gold-500/60"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
        {date && (
          <p className="mt-3 text-xs text-ink-400">
            Struck-through slots are booked. Beauticians arrive within a 15-minute window of your slot.
          </p>
        )}
      </div>

      <div className="mt-10 flex justify-end">
        <Button variant="gold" size="lg" disabled={!date || !slot} onClick={goNext}>
          Continue to beautician
        </Button>
      </div>
    </section>
  );
}
