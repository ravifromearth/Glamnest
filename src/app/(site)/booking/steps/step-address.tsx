"use client";

import { useState } from "react";
import { Home, Briefcase, Plus, Check, MapPin } from "lucide-react";
import { useBookingStore, type BookingAddress } from "@/stores/booking-store";
import { CITIES } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { StepHeader } from "./step-header";

const SAVED_ADDRESSES: (BookingAddress & { icon: "home" | "work" })[] = [
  {
    id: "addr-home",
    label: "Home",
    line1: "A-14, Ashiana Nagar Phase 1",
    locality: "Ashiana Nagar",
    city: "Patna",
    pincode: "800025",
    icon: "home",
  },
  {
    id: "addr-work",
    label: "Work",
    line1: "5th Flr, Biscomaun Bhawan",
    locality: "Gandhi Maidan",
    city: "Patna",
    pincode: "800001",
    icon: "work",
  },
];

const LIVE_CITY_OPTIONS = CITIES.filter((c) => c.status === "live");

export function StepAddress() {
  const { address, setAddress, goNext } = useBookingStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "Home",
    line1: "",
    locality: "",
    city: LIVE_CITY_OPTIONS[0]?.name ?? "Patna",
    pincode: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  function saveNewAddress() {
    if (form.label.trim().length < 2) return setFormError("Give this address a short label.");
    if (form.line1.trim().length < 3) return setFormError("Enter your flat / house and street.");
    if (form.locality.trim().length < 2) return setFormError("Enter your locality.");
    if (!/^\d{6}$/.test(form.pincode)) return setFormError("Pincode must be exactly 6 digits.");
    setFormError(null);
    setAddress({
      id: `addr-new-${Date.now()}`,
      label: form.label.trim(),
      line1: form.line1.trim(),
      locality: form.locality.trim(),
      city: form.city,
      pincode: form.pincode,
    });
    goNext();
  }

  return (
    <section aria-label="Choose your address">
      <StepHeader
        eyebrow="Step 4 · Address"
        title="Where should we come?"
        description="Your beautician arrives with a complete portable setup — just pick the doorstep."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {SAVED_ADDRESSES.map((saved) => {
          const selected = address?.id === saved.id;
          const Icon = saved.icon === "home" ? Home : Briefcase;
          return (
            <button
              key={saved.id}
              type="button"
              onClick={() => setAddress(saved)}
              className={cn(
                "flex items-start gap-4 rounded-3xl border bg-white p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                selected ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-950/8 hover:border-gold-500/50"
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                  selected ? "bg-gold-500/15 text-gold-700" : "bg-cream-100 text-ink-600"
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold text-ink-950">
                  {saved.label}
                  {selected && <Check className="size-4 text-gold-600" />}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-500">
                  {saved.line1}, {saved.locality}, {saved.city} {saved.pincode}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-gold-500/60 px-5 py-2.5 text-sm font-medium text-gold-700 transition-colors hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <Plus className="size-4" />
          Add a new address
        </button>
      ) : (
        <div className="mt-6 rounded-3xl border border-ink-950/8 bg-white p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950">
            <MapPin className="size-4 text-gold-600" />
            New address
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="addr-label">Label</Label>
              <Input
                id="addr-label"
                placeholder="Home, Work, Parents…"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="addr-line1">Flat / house & street</Label>
              <Input
                id="addr-line1"
                placeholder="e.g. B-22, Rajendra Nagar Road 4"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="addr-locality">Locality</Label>
              <Input
                id="addr-locality"
                placeholder="e.g. Kankarbagh"
                value={form.locality}
                onChange={(e) => setForm({ ...form, locality: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="addr-city">City</Label>
                <Select
                  id="addr-city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  {LIVE_CITY_OPTIONS.map((city) => (
                    <option key={city.slug} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="addr-pincode">Pincode</Label>
                <Input
                  id="addr-pincode"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="800001"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
          </div>
          {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="gold" onClick={saveNewAddress}>
              Save & use this address
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button variant="gold" size="lg" disabled={!address} onClick={goNext}>
          Continue to schedule
        </Button>
      </div>
    </section>
  );
}
