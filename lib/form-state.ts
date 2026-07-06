/**
 * Shared form-state shapes for server actions. Kept outside the
 * "use server" files because those may only export async functions.
 */

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<
    Record<"name" | "email" | "subject" | "message", string>
  >;
}

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export interface AdminFormState {
  status: "idle" | "error";
  message: string;
}

export const INITIAL_ADMIN_STATE: AdminFormState = {
  status: "idle",
  message: "",
};
