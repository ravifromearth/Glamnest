import type { Metadata } from "next";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  IndianRupee,
  MessageCircleQuestion,
  Phone,
  Send,
  ShieldAlert,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Support",
  robots: { index: false },
};

const HELP_TOPICS = [
  { icon: IndianRupee, title: "Payouts & earnings", detail: "Settlement timing, UTR lookups, incentives" },
  { icon: CreditCard, title: "Wallet & bank details", detail: "Update bank account, payout failures" },
  { icon: Sparkles, title: "Bookings & jobs", detail: "OTP issues, cancellations, customer no-shows" },
  { icon: Wrench, title: "Kits & products", detail: "Kit refills, product quality, replacements" },
  { icon: ShieldAlert, title: "Safety concerns", detail: "Report an unsafe situation or customer" },
  { icon: MessageCircleQuestion, title: "Account & profile", detail: "KYC, service areas, availability" },
];

const TRAINING = [
  { icon: Video, title: "Advanced Airbrush Masterclass", meta: "45 min video · Hindi" },
  { icon: BookOpen, title: "Hygiene Protocol Refresher 2026", meta: "15 min read · mandatory" },
  { icon: GraduationCap, title: "Customer Delight Playbook", meta: "30 min course · earn a badge" },
];

export default function PartnerSupportPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Emergency helpline */}
      <Card className="bg-ink-950 text-cream-50">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
            <ShieldAlert className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold">Emergency helpline</p>
            <p className="text-sm text-cream-100/70">
              24×7 partner safety line — one tap connects you to our response team and shares your live location.
            </p>
          </div>
          <Button variant="gold" className="shrink-0">
            <Phone /> Call {BRAND.phone}
          </Button>
        </CardContent>
      </Card>

      {/* Help topics */}
      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">How can we help?</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_TOPICS.map((topic) => (
            <Card key={topic.title} className="transition-shadow hover:shadow-lift">
              <CardContent className="p-5">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
                  <topic.icon className="size-5" />
                </span>
                <p className="mt-3 font-medium text-ink-950">{topic.title}</p>
                <p className="mt-1 text-sm text-ink-500">{topic.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Raise a ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Raise a ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ticket-topic">Topic</Label>
                <Select id="ticket-topic" defaultValue="payouts">
                  <option value="payouts">Payouts & earnings</option>
                  <option value="bookings">Bookings & jobs</option>
                  <option value="kits">Kits & products</option>
                  <option value="account">Account & profile</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ticket-subject">Subject</Label>
                <Input id="ticket-subject" placeholder="Brief summary of the issue" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ticket-detail">Details</Label>
                <Textarea id="ticket-detail" placeholder="Tell us what happened…" />
              </div>
              <Button type="button" variant="gold" className="w-full">
                <Send /> Submit ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Training academy */}
        <Card>
          <CardHeader>
            <CardTitle>GlamNest Academy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TRAINING.map((course) => (
              <div
                key={course.title}
                className="flex items-center gap-3 rounded-2xl border border-ink-950/8 p-4 transition-colors hover:border-gold-500/40 hover:bg-gold-500/5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-gold-600">
                  <course.icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-950">{course.title}</p>
                  <p className="text-xs text-ink-500">{course.meta}</p>
                </div>
                <Badge variant="gold">New</Badge>
              </div>
            ))}
            <p className="pt-1 text-xs text-ink-500">
              Completing academy courses raises your profile ranking and unlocks premium bookings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
