const SYDNEY_TIME_ZONE = "Australia/Sydney";

/** e.g. "Friday 14 August 2026" */
export function formatEventDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: SYDNEY_TIME_ZONE,
  }).format(new Date(isoDate));
}

/** e.g. "6:00 PM" */
export function formatEventTime(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: SYDNEY_TIME_ZONE,
  })
    .format(new Date(isoDate))
    .toUpperCase();
}

/** e.g. "14 Aug 2026" */
export function formatShortDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: SYDNEY_TIME_ZONE,
  }).format(new Date(isoDate));
}

/** True when the event start time is in the future. */
export function isUpcoming(isoDate: string): boolean {
  return new Date(isoDate).getTime() >= Date.now();
}

/** URL-safe slug from a title, e.g. "Trivia Night!" → "trivia-night". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Truncate to a maximum length at a word boundary, adding an ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}
