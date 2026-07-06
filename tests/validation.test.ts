import { describe, expect, it } from "vitest";
import { contactMessageSchema } from "@/lib/validation";

const validInput = {
  name: "Jordan Smith",
  email: "jordan@example.com",
  subject: "Sponsorship enquiry",
  message: "Hello, I would like to discuss a partnership opportunity.",
};

describe("contactMessageSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactMessageSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = contactMessageSchema.parse({
      ...validInput,
      name: "  Jordan Smith  ",
    });
    expect(result.name).toBe("Jordan Smith");
  });

  it("rejects an invalid email", () => {
    const result = contactMessageSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short message", () => {
    const result = contactMessageSchema.safeParse({
      ...validInput,
      message: "hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects oversized fields", () => {
    const result = contactMessageSchema.safeParse({
      ...validInput,
      subject: "x".repeat(151),
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = contactMessageSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
