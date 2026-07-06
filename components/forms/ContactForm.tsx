"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { submitContactMessage } from "@/app/contact/actions";
import { INITIAL_CONTACT_STATE, type ContactFormState } from "@/lib/form-state";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactMessage, INITIAL_CONTACT_STATE);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border-border bg-surface-muted rounded-2xl border p-8 text-center"
      >
        <p
          aria-hidden="true"
          className="bg-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl"
        >
          ✓
        </p>
        <h2 className="text-charcoal mt-4 text-xl font-bold">Message sent</h2>
        <p className="text-text-muted mt-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      ) : null}

      {/* Honeypot field — hidden from real users, catches bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="name"
          name="name"
          label="Name"
          autoComplete="name"
          required
          maxLength={100}
          error={state.fieldErrors.name}
          disabled={isPending}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          maxLength={254}
          error={state.fieldErrors.email}
          disabled={isPending}
        />
      </div>
      <TextField
        id="subject"
        name="subject"
        label="Subject"
        required
        maxLength={150}
        error={state.fieldErrors.subject}
        disabled={isPending}
      />
      <TextAreaField
        id="message"
        name="message"
        label="Message"
        required
        maxLength={5000}
        rows={6}
        error={state.fieldErrors.message}
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
