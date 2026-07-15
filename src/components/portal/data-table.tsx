import * as React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  align?: "left" | "right" | "center";
  cell: (row: T) => React.ReactNode;
}

const ALIGN: Record<NonNullable<Column<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

/**
 * Simple typed table for portal pages: header row, zebra hover,
 * arbitrary cells (badges, actions). Wrap actions in the last
 * column with align: "right".
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-3xl border border-ink-950/8 bg-white shadow-soft", className)}>
      <table className="w-full min-w-max text-sm">
        <thead>
          <tr className="border-b border-ink-950/8">
            {columns.map((col) => (
              <th
                key={col.header}
                scope="col"
                className={cn(
                  "px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink-500",
                  ALIGN[col.align ?? "left"]
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className="border-b border-ink-950/5 transition-colors last:border-0 odd:bg-cream-50/60 hover:bg-gold-500/8"
            >
              {columns.map((col) => (
                <td key={col.header} className={cn("px-5 py-3.5 text-ink-800", ALIGN[col.align ?? "left"])}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
