import type { Metadata } from "next";
import { FileCheck, FileClock, Upload } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Documents",
  robots: { index: false },
};

type DocStatus = "VERIFIED" | "PENDING REVIEW";

interface Doc {
  name: string;
  detail: string;
  status: DocStatus;
  updated: string;
}

const DOCS: Doc[] = [
  { name: "Aadhaar Card", detail: "XXXX XXXX 4812 · identity proof", status: "VERIFIED", updated: "Verified 4 Mar 2025" },
  { name: "PAN Card", detail: "DXXPX••••K · tax identity", status: "VERIFIED", updated: "Verified 4 Mar 2025" },
  { name: "Police Verification", detail: "Patna District · character certificate", status: "VERIFIED", updated: "Verified 12 Mar 2025" },
  { name: "Skill Certificate", detail: "VLCC Advanced Bridal Makeup Diploma", status: "VERIFIED", updated: "Verified 15 Mar 2025" },
  { name: "Bank Proof", detail: "HDFC Bank ••4521 · cancelled cheque", status: "PENDING REVIEW", updated: "Uploaded 10 Jul 2026" },
];

const STATUS_VARIANT: Record<DocStatus, BadgeProps["variant"]> = {
  VERIFIED: "success",
  "PENDING REVIEW": "warning",
};

export default function PartnerDocumentsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">KYC documents</h2>
        <p className="mt-1 text-sm text-ink-500">
          4 of 5 documents verified. Bank proof is being reviewed by our onboarding team.
        </p>
      </div>

      <div className="space-y-4">
        {DOCS.map((doc) => (
          <Card key={doc.name}>
            <CardContent className="flex flex-wrap items-center gap-4 p-5">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                  doc.status === "VERIFIED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {doc.status === "VERIFIED" ? <FileCheck className="size-5" /> : <FileClock className="size-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink-950">{doc.name}</p>
                <p className="truncate text-sm text-ink-500">{doc.detail}</p>
                <p className="mt-0.5 text-xs text-ink-400">{doc.updated}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge variant={STATUS_VARIANT[doc.status]}>{doc.status}</Badge>
                <Button variant="outline" size="sm">
                  <Upload /> Re-upload
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="rounded-2xl bg-cream-100 px-4 py-3 text-sm text-ink-600">
        Keep your documents current — expired documents pause new booking assignments until re-verified.
      </p>
    </div>
  );
}
