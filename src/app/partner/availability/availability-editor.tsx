"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DayAvailability {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

const TIME_OPTIONS = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

const INITIAL: DayAvailability[] = [
  { day: "Monday", enabled: true, start: "9:00 AM", end: "7:00 PM" },
  { day: "Tuesday", enabled: true, start: "9:00 AM", end: "7:00 PM" },
  { day: "Wednesday", enabled: true, start: "9:00 AM", end: "7:00 PM" },
  { day: "Thursday", enabled: true, start: "10:00 AM", end: "6:00 PM" },
  { day: "Friday", enabled: true, start: "9:00 AM", end: "8:00 PM" },
  { day: "Saturday", enabled: true, start: "8:00 AM", end: "8:00 PM" },
  { day: "Sunday", enabled: false, start: "10:00 AM", end: "4:00 PM" },
];

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-gold-500" : "bg-ink-950/15"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow-soft transition-all",
          on ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

export function AvailabilityEditor() {
  const [days, setDays] = React.useState(INITIAL);
  const [maxJobs, setMaxJobs] = React.useState(4);

  const update = (index: number, patch: Partial<DayAvailability>) =>
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly hours</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-ink-950/5">
          {days.map((d, i) => (
            <div key={d.day} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <Toggle on={d.enabled} onClick={() => update(i, { enabled: !d.enabled })} label={`Toggle ${d.day}`} />
              <p className={cn("w-24 text-sm font-medium", d.enabled ? "text-ink-950" : "text-ink-400")}>{d.day}</p>
              {d.enabled ? (
                <div className="ml-auto flex items-center gap-2">
                  <Select
                    aria-label={`${d.day} start time`}
                    value={d.start}
                    onChange={(e) => update(i, { start: e.target.value })}
                    className="h-10 w-32"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                  <span className="text-sm text-ink-400">to</span>
                  <Select
                    aria-label={`${d.day} end time`}
                    value={d.end}
                    onChange={(e) => update(i, { end: e.target.value })}
                    className="h-10 w-32"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Select>
                </div>
              ) : (
                <p className="ml-auto text-sm text-ink-400">Unavailable</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="font-display text-lg font-semibold text-ink-950">Max jobs per day</p>
            <p className="text-sm text-ink-500">We stop assigning new bookings once you reach this limit.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMaxJobs((v) => Math.max(1, v - 1))}
              className="flex size-11 items-center justify-center rounded-full border border-ink-950/15 text-ink-700 transition-colors hover:border-gold-500 hover:bg-gold-500/10"
              aria-label="Decrease max jobs"
            >
              <Minus className="size-4" />
            </button>
            <p className="w-8 text-center font-display text-2xl font-bold text-ink-950">{maxJobs}</p>
            <button
              type="button"
              onClick={() => setMaxJobs((v) => Math.min(8, v + 1))}
              className="flex size-11 items-center justify-center rounded-full border border-ink-950/15 text-ink-700 transition-colors hover:border-gold-500 hover:bg-gold-500/10"
              aria-label="Increase max jobs"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
