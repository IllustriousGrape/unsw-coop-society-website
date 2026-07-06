/**
 * Production-safe logging. Errors are always recorded (and can be wired to
 * an error-reporting service in one place); debug output only appears in
 * development to avoid console noise in production.
 */

const isDevelopment = process.env.NODE_ENV === "development";

export function logError(message: string, error?: unknown): void {
  const detail =
    error instanceof Error ? error.message : error ? String(error) : "";
  // Hook point for an error-reporting service (e.g. Sentry).
  console.error(`[error] ${message}${detail ? `: ${detail}` : ""}`);
}

export function logDebug(message: string): void {
  if (isDevelopment) {
    console.warn(`[debug] ${message}`);
  }
}
