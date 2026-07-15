import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Appointments",
  robots: { index: false },
};

type ApptStatus = "CONFIRMED" | "PENDING" | "COMPLETED";

interface Appointment {
  time: string;
  customer: string;
  initials: string;
  service: string;
  locality: string;
  payout: number;
  status: ApptStatus;
}

const DAYS: { date: string; appointments: Appointment[] }[] = [
  {
    date: "Today · Tue, 14 Jul",
    appointments: [
      { time: "1:00 PM", customer: "Priya Kumari", initials: "PK", service: "Party Makeup · Full Glam", locality: "Boring Road", payout: 1120, status: "CONFIRMED" },
      { time: "5:00 PM", customer: "Ritu Verma", initials: "RV", service: "Full Body Waxing", locality: "Bailey Road", payout: 960, status: "PENDING" },
    ],
  },
  {
    date: "Tomorrow · Wed, 15 Jul",
    appointments: [
      { time: "11:00 AM", customer: "Neha Gupta", initials: "NG", service: "Signature Glow Facial · 24K Gold", locality: "Rajendra Nagar", payout: 1760, status: "CONFIRMED" },
      { time: "4:30 PM", customer: "Kavya Singh", initials: "KS", service: "Manicure & Pedicure · Spa", locality: "Kankarbagh", payout: 1200, status: "CONFIRMED" },
    ],
  },
  {
    date: "Fri, 17 Jul",
    appointments: [
      { time: "9:00 AM", customer: "Shreya Raj", initials: "SR", service: "Engagement Makeup · Full Glam", locality: "Boring Road", payout: 5600, status: "CONFIRMED" },
    ],
  },
  {
    date: "Sun, 19 Jul",
    appointments: [
      { time: "3:00 PM", customer: "Pooja Mishra", initials: "PM", service: "Cleanup & De-Tan", locality: "Bailey Road", payout: 880, status: "PENDING" },
    ],
  },
];

const STATUS_VARIANT: Record<ApptStatus, BadgeProps["variant"]> = {
  CONFIRMED: "success",
  PENDING: "warning",
  COMPLETED: "cream",
};

export default function PartnerAppointmentsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Upcoming appointments</h2>
        <p className="mt-1 text-sm text-ink-500">Next 7 days · 6 bookings</p>
      </div>

      {DAYS.map((day) => (
        <section key={day.date} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">{day.date}</h3>
          {day.appointments.map((appt) => (
            <Card key={`${day.date}-${appt.time}`}>
              <CardContent className="flex flex-wrap items-center gap-4 p-5">
                <Avatar initials={appt.initials} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink-950">{appt.customer}</p>
                  <p className="truncate text-sm text-ink-500">{appt.service}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5 text-gold-600" /> {appt.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-gold-600" /> {appt.locality}, Patna
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Badge variant={STATUS_VARIANT[appt.status]}>{appt.status}</Badge>
                  <p className="text-sm font-semibold text-gold-600">{formatINR(appt.payout)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      ))}
    </div>
  );
}
