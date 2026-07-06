import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_ENTITIES } from "@/lib/admin-config";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const counts = await Promise.all(
    ADMIN_ENTITIES.map(async (entity) => {
      const { count } = await supabase
        .from(entity.table)
        .select("id", { count: "exact", head: true });
      return { entity, count: count ?? 0 };
    })
  );

  const { count: unreadMessages } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("is_read", false);

  return (
    <div>
      <h1 className="text-charcoal text-3xl font-bold">Dashboard</h1>
      <p className="text-text-muted mt-2">
        Manage the society&apos;s public content. Changes go live immediately.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map(({ entity, count }) => (
          <Link
            key={entity.table}
            href={`/admin/${entity.table}`}
            className="border-border bg-surface rounded-2xl border p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-text-muted text-sm font-medium">
              {entity.plural}
            </p>
            <p className="text-charcoal mt-1 text-3xl font-bold">{count}</p>
          </Link>
        ))}
        <Link
          href="/admin/messages"
          className="border-border bg-surface rounded-2xl border p-6 transition-shadow hover:shadow-md"
        >
          <p className="text-text-muted text-sm font-medium">Unread messages</p>
          <p className="text-charcoal mt-1 text-3xl font-bold">
            {unreadMessages ?? 0}
          </p>
        </Link>
      </div>
    </div>
  );
}
