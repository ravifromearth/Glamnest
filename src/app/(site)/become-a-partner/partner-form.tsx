"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { applyAsPartner } from "@/server/actions";
import { CITIES } from "@/lib/brand";
import { CATEGORIES } from "@/lib/catalog";

const partnerFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  city: z.string().min(2, "Please select your city"),
  expertise: z.string().min(1, "Please select your expertise"),
  experienceYears: z.coerce
    .number({ invalid_type_error: "Enter your years of experience" })
    .min(0, "Experience cannot be negative")
    .max(50, "Please enter a realistic number of years"),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export function PartnerForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [applicationId, setApplicationId] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: { name: "", phone: "", city: "", expertise: "" },
  });

  async function onSubmit(values: PartnerFormValues) {
    setServerError(null);
    const result = await applyAsPartner(values);
    if (result.ok) {
      setApplicationId(result.applicationId);
    } else {
      setServerError(result.error);
    }
  }

  if (applicationId) {
    return (
      <div className="rounded-3xl border border-ink-950/8 bg-white p-8 text-center shadow-lift sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-8 text-emerald-600" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-950">
          Application received
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          Your application ID is{" "}
          <span className="font-semibold text-ink-950">{applicationId}</span>. Our partner team
          will call you within 48 hours to schedule your KYC and skill assessment. Keep your ID
          proof handy.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-lift sm:p-8"
    >
      <h3 className="font-display text-2xl font-bold text-ink-950">Apply in 60 seconds</h3>
      <p className="mt-2 text-sm text-ink-600">
        No fees, no salon required. Just your skill and a phone number.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="partner-name">Full name</Label>
          <Input id="partner-name" placeholder="e.g. Sunita Kumari" autoComplete="name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="partner-phone">Mobile number</Label>
          <Input
            id="partner-phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            autoComplete="tel-national"
            {...register("phone")}
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="partner-city">City</Label>
            <Select id="partner-city" defaultValue="" {...register("city")}>
              <option value="" disabled>
                Select your city
              </option>
              {CITIES.map((city) => (
                <option key={city.slug} value={city.name}>
                  {city.name}
                  {city.status === "coming-soon" ? " (launching soon)" : ""}
                </option>
              ))}
            </Select>
            {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-expertise">Primary expertise</Label>
            <Select id="partner-expertise" defaultValue="" {...register("expertise")}>
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((category) => (
                <option key={category.slug} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            {errors.expertise && <p className="text-xs text-red-600">{errors.expertise.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="partner-experience">Years of experience</Label>
          <Input
            id="partner-experience"
            type="number"
            min={0}
            max={50}
            placeholder="e.g. 4"
            {...register("experienceYears")}
          />
          {errors.experienceYears && (
            <p className="text-xs text-red-600">{errors.experienceYears.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
        )}

        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Submitting…
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
        <p className="text-center text-xs text-ink-400">
          By applying you agree to our partner terms and verification process.
        </p>
      </div>
    </form>
  );
}
