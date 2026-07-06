import { describe, expect, it } from "vitest";
import {
  formatEventDate,
  formatEventTime,
  formatShortDate,
  isUpcoming,
  slugify,
  truncate,
} from "@/utils/format";

describe("slugify", () => {
  it("converts titles to URL-safe slugs", () => {
    expect(slugify("Industry Networking Night 2026")).toBe(
      "industry-networking-night-2026"
    );
  });

  it("strips punctuation and collapses whitespace", () => {
    expect(slugify("  Trivia   Night!!  ")).toBe("trivia-night");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("--hello world--")).toBe("hello-world");
  });

  it("handles an empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("returns short text unchanged", () => {
    expect(truncate("short", 100)).toBe("short");
  });

  it("cuts at a word boundary and appends an ellipsis", () => {
    expect(truncate("the quick brown fox jumps", 15)).toBe("the quick…");
  });

  it("handles text with no spaces", () => {
    expect(truncate("abcdefghij", 5)).toBe("abcde…");
  });
});

describe("date formatting", () => {
  // 8:00 UTC = 6:00 PM in Sydney (AEST, UTC+10) on this date.
  const iso = "2026-08-14T08:00:00.000Z";

  it("formats a full event date in Sydney time", () => {
    expect(formatEventDate(iso)).toBe("Friday 14 August 2026");
  });

  it("formats the event time in Sydney time", () => {
    expect(formatEventTime(iso)).toMatch(/6:00\s?PM/i);
  });

  it("formats a short date", () => {
    expect(formatShortDate(iso)).toBe("14 Aug 2026");
  });
});

describe("isUpcoming", () => {
  it("returns true for future dates", () => {
    const future = new Date(Date.now() + 86_400_000).toISOString();
    expect(isUpcoming(future)).toBe(true);
  });

  it("returns false for past dates", () => {
    const past = new Date(Date.now() - 86_400_000).toISOString();
    expect(isUpcoming(past)).toBe(false);
  });
});
