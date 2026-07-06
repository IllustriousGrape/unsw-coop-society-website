import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "primary" | "neutral";
}

/** Small label pill for categories and statuses. */
export function Badge({ children, tone = "neutral" }: BadgeProps) {
  const toneClasses =
    tone === "primary"
      ? "bg-charcoal text-white"
      : "bg-surface-muted text-text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${toneClasses}`}
    >
      {children}
    </span>
  );
}
