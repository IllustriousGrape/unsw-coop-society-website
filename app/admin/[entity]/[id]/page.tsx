import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminEntity } from "@/lib/admin-config";
import { AdminEntityForm } from "@/components/forms/AdminEntityForm";

interface AdminEditPageProps {
  params: Promise<{ entity: string; id: string }>;
}

export default async function AdminEditPage({ params }: AdminEditPageProps) {
  const { entity: table, id } = await params;
  const entity = getAdminEntity(table);
  if (!entity) {
    notFound();
  }

  const supabase = await createClient();
  const { data: row } = await supabase
    .from(entity.table)
    .select("*")
    .eq("id", id)
    .single();

  if (!row) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-charcoal text-3xl font-bold">
        Edit {entity.singular.toLowerCase()}
      </h1>
      <div className="mt-8">
        <AdminEntityForm entity={entity} id={id} initialValues={row} />
      </div>
    </div>
  );
}
