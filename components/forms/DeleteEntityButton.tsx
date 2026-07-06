"use client";

import { useState, useTransition } from "react";
import { deleteEntity } from "@/app/admin/actions";

interface DeleteEntityButtonProps {
  table: string;
  id: string;
  label: string;
}

export function DeleteEntityButton({
  table,
  id,
  label,
}: DeleteEntityButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${label}"? This cannot be undone from the dashboard.`
    );
    if (!confirmed) {
      return;
    }
    startTransition(async () => {
      const result = await deleteEntity(table, id);
      setError(result.status === "error" ? result.message : null);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm font-medium text-red-600 underline-offset-4 hover:underline disabled:opacity-60"
      >
        {isPending ? "Deleting…" : "Delete"}
        <span className="sr-only"> {label}</span>
      </button>
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </>
  );
}
