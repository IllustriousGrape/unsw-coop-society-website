import { notFound } from "next/navigation";
import { getAdminEntity } from "@/lib/admin-config";
import { AdminEntityForm } from "@/components/forms/AdminEntityForm";

interface AdminNewPageProps {
  params: Promise<{ entity: string }>;
}

export default async function AdminNewPage({ params }: AdminNewPageProps) {
  const { entity: table } = await params;
  const entity = getAdminEntity(table);
  if (!entity) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-charcoal text-3xl font-bold">
        New {entity.singular.toLowerCase()}
      </h1>
      <div className="mt-8">
        <AdminEntityForm entity={entity} id={null} initialValues={{}} />
      </div>
    </div>
  );
}
