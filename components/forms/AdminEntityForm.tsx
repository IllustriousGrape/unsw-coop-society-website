"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { saveEntity } from "@/app/admin/actions";
import { INITIAL_ADMIN_STATE, type AdminFormState } from "@/lib/form-state";
import type { AdminEntity, AdminField } from "@/lib/admin-config";

interface AdminEntityFormProps {
  entity: AdminEntity;
  id: string | null;
  initialValues: Record<string, unknown>;
}

function toInputValue(field: AdminField, value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (field.type === "datetime") {
    // datetime-local expects "YYYY-MM-DDTHH:mm" in local time.
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    const offsetMs = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  }
  return String(value);
}

function FieldControl({
  field,
  defaultValue,
}: {
  field: AdminField;
  defaultValue: string;
}) {
  const common = {
    id: field.name,
    name: field.name,
    label: field.label,
    required: field.required,
    defaultValue,
  };

  switch (field.type) {
    case "textarea":
      return <TextAreaField {...common} rows={5} />;
    case "select":
      return <SelectField {...common} options={field.options ?? []} />;
    case "number":
      return <TextField {...common} type="number" />;
    case "datetime":
      return <TextField {...common} type="datetime-local" />;
    case "url":
      return <TextField {...common} type="url" />;
    case "email":
      return <TextField {...common} type="email" />;
    case "boolean":
      return (
        <div className="flex items-center gap-3">
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            defaultChecked={defaultValue === "true"}
            className="border-border accent-charcoal h-5 w-5 rounded"
          />
          <label
            htmlFor={field.name}
            className="text-charcoal text-sm font-medium"
          >
            {field.label}
          </label>
        </div>
      );
    case "image":
      return (
        <div className="space-y-3">
          <TextField
            {...common}
            type="url"
            label={`${field.label} URL`}
            required={false}
          />
          <div>
            <label
              htmlFor={`${field.name}_file`}
              className="text-charcoal mb-2 block text-sm font-medium"
            >
              …or upload a new {field.label.toLowerCase()}
            </label>
            <input
              id={`${field.name}_file`}
              name={`${field.name}_file`}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="text-text-muted file:bg-charcoal block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />
          </div>
        </div>
      );
    default:
      return <TextField {...common} type="text" />;
  }
}

export function AdminEntityForm({
  entity,
  id,
  initialValues,
}: AdminEntityFormProps) {
  const boundAction = saveEntity.bind(null, entity.table, id);
  const [state, formAction, isPending] = useActionState<
    AdminFormState,
    FormData
  >(boundAction, INITIAL_ADMIN_STATE);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      ) : null}

      {entity.fields.map((field) => (
        <div key={field.name}>
          <FieldControl
            field={field}
            defaultValue={toInputValue(field, initialValues[field.name])}
          />
          {field.help ? (
            <p className="text-text-subtle mt-2 text-xs">{field.help}</p>
          ) : null}
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : id
              ? `Save ${entity.singular.toLowerCase()}`
              : `Create ${entity.singular.toLowerCase()}`}
        </Button>
      </div>
    </form>
  );
}
