import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminEntity } from "@/lib/admin-config";
import { DeleteEntityButton } from "@/components/forms/DeleteEntityButton";
import { ButtonLink } from "@/components/ui/Button";

interface AdminListPageProps {
  params: Promise<{ entity: string }>;
}

export default async function AdminListPage({ params }: AdminListPageProps) {
  const { entity: table } = await params;
  const entity = getAdminEntity(table);
  if (!entity) {
    notFound();
  }

  const supabase = await createClient();
  let query = supabase
    .from(entity.table)
    .select("*")
    .order(entity.orderBy.column, { ascending: entity.orderBy.ascending });
  if (entity.softDelete) {
    query = query.is("deleted_at", null);
  }
  const { data: rows } = await query;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-charcoal text-3xl font-bold">{entity.plural}</h1>
        <ButtonLink href={`/admin/${entity.table}/new`}>
          New {entity.singular.toLowerCase()}
        </ButtonLink>
      </div>

      {rows && rows.length > 0 ? (
        <ul className="divide-border border-border bg-surface mt-8 divide-y overflow-hidden rounded-2xl border">
          {rows.map((row: Record<string, unknown>) => {
            const id = String(row.id);
            const title = String(row[entity.titleColumn] ?? "Untitled");
            return (
              <li
                key={id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="text-charcoal font-semibold">{title}</p>
                  {"is_published" in row || "is_active" in row ? (
                    <p className="text-text-muted mt-0.5 text-xs">
                      {(row.is_published ?? row.is_active)
                        ? "Visible on site"
                        : "Hidden"}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/admin/${entity.table}/${id}`}
                    className="text-charcoal text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Edit
                    <span className="sr-only"> {title}</span>
                  </Link>
                  <DeleteEntityButton
                    table={entity.table}
                    id={id}
                    label={title}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-text-muted mt-8">
          No {entity.plural.toLowerCase()} yet — create the first one.
        </p>
      )}
    </div>
  );
}
