import type { Metadata } from "next";
import { CalendarCheck, Clock3, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/portal/stat-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Attendance",
  robots: { index: false },
};

type DayStatus = "present" | "leave" | "off" | "future";

// July 2026 — 1 Jul is a Wednesday (week starts Monday, offset 2).
const OFFSET = 2;
const DAYS_IN_MONTH = 31;
const TODAY = 14;

const LEAVE_DAYS = new Set([3, 11]);
const OFF_DAYS = new Set([5, 12]); // weekly offs (Sundays)

function statusFor(day: number): DayStatus {
  if (day > TODAY) return "future";
  if (OFF_DAYS.has(day)) return "off";
  if (LEAVE_DAYS.has(day)) return "leave";
  return "present";
}

const DOT: Record<Exclude<DayStatus, "future">, string> = {
  present: "bg-emerald-500",
  leave: "bg-amber-500",
  off: "bg-ink-300",
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PartnerAttendancePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Days online" value="26" delta="+2" icon={CalendarCheck} />
        <StatCard label="Hours online" value="182 hrs" icon={Clock3} />
        <StatCard label="Acceptance rate" value="96%" delta="+2%" icon={Percent} />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>July 2026</CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-emerald-500" aria-hidden /> Present
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-amber-500" aria-hidden /> Leave
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-ink-300" aria-hidden /> Weekly off
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((d) => (
              <p key={d} className="pb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                {d}
              </p>
            ))}
            {Array.from({ length: OFFSET }).map((_, i) => (
              <div key={`pad-${i}`} aria-hidden />
            ))}
            {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
              const day = i + 1;
              const status = statusFor(day);
              return (
                <div
                  key={day}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border text-sm",
                    day === TODAY
                      ? "border-gold-500 bg-gold-500/10 font-semibold text-ink-950"
                      : "border-ink-950/5 bg-cream-50 text-ink-700",
                    status === "future" && "text-ink-300"
                  )}
                >
                  {day}
                  {status !== "future" && <span className={cn("size-1.5 rounded-full", DOT[status])} aria-hidden />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
