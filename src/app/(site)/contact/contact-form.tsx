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
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/server/actions";

const SUBJECTS = ["Booking Help", "Partnership", "Feedback", "Other"] as const;

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  subject: z.string().min(1, "Please choose a subject"),
  message: z.string().min(10, "Tell us a little more (min 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [ticketId, setTicketId] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    const result = await submitContact(values);
    if (result.ok) {
      setTicketId(result.ticketId);
    } else {
      setServerError(result.error);
    }
  }

  if (ticketId) {
    return (
      <div className="rounded-3xl border border-ink-950/8 bg-white p-8 text-center shadow-lift sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-8 text-emerald-600" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-950">Message received</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          Your ticket ID is <span className="font-semibold text-ink-950">{ticketId}</span>. Our
          team replies within 30 minutes between 7 AM and 9 PM — usually much faster.
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
      <h3 className="font-display text-2xl font-bold text-ink-950">Send us a message</h3>
      <p className="mt-2 text-sm text-ink-600">We reply within 30 minutes, 7 AM – 9 PM.</p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Your name</Label>
            <Input id="contact-name" placeholder="e.g. Priya Sinha" autoComplete="name" {...register("name")} />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Mobile number</Label>
            <Input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              autoComplete="tel-national"
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-email">
              Email <span className="font-normal text-ink-400">(optional)</span>
            </Label>
            <Input id="contact-email" type="email" placeholder="you@example.com" autoComplete="email" {...register("email")} />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-subject">Subject</Label>
            <Select id="contact-subject" defaultValue="" {...register("subject")}>
              <option value="" disabled>
                What's this about?
              </option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
            {errors.subject && <p className="text-xs text-red-600">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            placeholder="Tell us how we can help…"
            {...register("message")}
          />
          {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
        </div>

        {serverError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}
