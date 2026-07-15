"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen }: AccordionItemProps) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className="rounded-2xl border border-ink-950/8 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span className="font-medium text-ink-950">{question}</span>
        <ChevronDown
          className={cn("size-5 shrink-0 text-gold-600 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  className,
}: {
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <AccordionItem key={item.question} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
