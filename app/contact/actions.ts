"use server";

import { contactMessageSchema } from "@/lib/validation";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createClient } from "@supabase/supabase-js";
import { logDebug, logError } from "@/utils/logger";
import type { ContactFormState } from "@/lib/form-state";

/**
 * Handles contact form submissions. Validates input server-side, applies a
 * honeypot spam check, and stores the message via the service role (the
 * contact_messages table has no public insert policy by design).
 */
export async function submitContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: real users never fill this hidden field. Return a fake
  // success so bots learn nothing.
  if (formData.get("company")) {
    return {
      status: "success",
      message: "Thanks for reaching out! We'll get back to you soon.",
      fieldErrors: {},
    };
  }

  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormState["fieldErrors"];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !serviceRoleKey) {
    // Local development without a database — accept the message so the
    // form flow can be exercised end to end.
    logDebug("Contact message received (Supabase not configured; not stored)");
    return {
      status: "success",
      message: "Thanks for reaching out! We'll get back to you soon.",
      fieldErrors: {},
    };
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { auth: { persistSession: false } }
    );
    const { error } = await supabase
      .from("contact_messages")
      .insert(parsed.data);

    if (error) {
      logError("Failed to store contact message", error);
      return {
        status: "error",
        message:
          "Something went wrong sending your message. Please try again, or email us directly.",
        fieldErrors: {},
      };
    }

    return {
      status: "success",
      message: "Thanks for reaching out! We'll get back to you soon.",
      fieldErrors: {},
    };
  } catch (error) {
    logError("Unexpected error storing contact message", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email us directly.",
      fieldErrors: {},
    };
  }
}
