"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminEntity, type AdminField } from "@/lib/admin-config";
import { slugify } from "@/utils/format";
import { logError } from "@/utils/logger";
import { type AdminFormState } from "@/lib/form-state";

const MEDIA_BUCKET = "media";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function errorState(message: string): AdminFormState {
  return { status: "error", message };
}

const OK_STATE: AdminFormState = { status: "idle", message: "" };

async function uploadImage(
  file: File,
  table: string
): Promise<{ url: string } | { error: string }> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { error: "Images must be JPEG, PNG, WebP, or AVIF." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "Images must be 5 MB or smaller." };
  }

  const supabase = await createClient();
  const extension = file.type.split("/")[1];
  const path = `${table}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) {
    logError("Image upload failed", error);
    return { error: "Image upload failed. Please try again." };
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

/** Coerce a FormData value into the column value for the given field. */
function coerceValue(
  field: AdminField,
  formData: FormData
): string | number | boolean | null {
  if (field.type === "boolean") {
    return formData.get(field.name) === "on";
  }
  const raw = formData.get(field.name);
  const text = typeof raw === "string" ? raw.trim() : "";
  if (text === "") {
    return null;
  }
  if (field.type === "number") {
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (field.type === "datetime") {
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  return text;
}

/**
 * Create or update a row for a registered admin entity. Requires an
 * authenticated committee admin; RLS enforces the same rule at the
 * database level.
 */
export async function saveEntity(
  table: string,
  id: string | null,
  _previousState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const entity = getAdminEntity(table);
  if (!entity) {
    return errorState("Unknown content type.");
  }

  const row: Record<string, string | number | boolean | null> = {};

  for (const field of entity.fields) {
    if (field.type === "image") {
      const file = formData.get(`${field.name}_file`);
      if (file instanceof File && file.size > 0) {
        const result = await uploadImage(file, table);
        if ("error" in result) {
          return errorState(result.error);
        }
        row[field.name] = result.url;
      } else {
        const existing = coerceValue({ ...field, type: "url" }, formData);
        row[field.name] = existing;
      }
      if (field.required && !row[field.name]) {
        return errorState(`${field.label} is required.`);
      }
      continue;
    }

    const value = coerceValue(field, formData);
    if (field.required && (value === null || value === "")) {
      return errorState(`${field.label} is required.`);
    }
    row[field.name] = value;
  }

  if (entity.slugSource) {
    const source = row[entity.slugSource.from];
    if (typeof source === "string") {
      row[entity.slugSource.to] = slugify(source);
    }
  }

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from(table).update(row).eq("id", id)
    : await supabase.from(table).insert(row);

  if (error) {
    logError(`Failed to save ${entity.singular}`, error);
    return errorState(
      "Saving failed. Check the values and try again — if this persists, contact the IT Director."
    );
  }

  revalidatePath("/", "layout");
  redirect(`/admin/${table}`);
}

/** Delete a row (soft delete when the table supports it). */
export async function deleteEntity(
  table: string,
  id: string
): Promise<AdminFormState> {
  await requireAdmin();

  const entity = getAdminEntity(table);
  if (!entity) {
    return errorState("Unknown content type.");
  }

  const supabase = await createClient();
  const { error } = entity.softDelete
    ? await supabase
        .from(table)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id)
    : await supabase.from(table).delete().eq("id", id);

  if (error) {
    logError(`Failed to delete ${entity.singular}`, error);
    return errorState("Delete failed. Please try again.");
  }

  revalidatePath("/", "layout");
  revalidatePath(`/admin/${table}`);
  return OK_STATE;
}

/** Mark a contact message as read. */
export async function markMessageRead(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: true })
    .eq("id", id);
  if (error) {
    logError("Failed to mark message read", error);
  }
  revalidatePath("/admin/messages");
}

/** Sign the current user out and return to the homepage. */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
