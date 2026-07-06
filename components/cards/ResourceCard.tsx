import { Badge } from "@/components/ui/Badge";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import type { Resource } from "@/types/database";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const categoryLabel =
    RESOURCE_CATEGORIES.find((c) => c.value === resource.category)?.label ??
    resource.category;
  const href = resource.external_url ?? resource.file_url;
  const isExternal = Boolean(resource.external_url);

  return (
    <article className="border-border bg-surface flex flex-col rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-lg">
      <Badge>{categoryLabel}</Badge>
      <h3 className="text-charcoal mt-3 text-lg font-bold">{resource.title}</h3>
      <p className="text-text-muted mt-2 flex-1 text-sm leading-relaxed">
        {resource.description}
      </p>
      {href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          download={!isExternal || undefined}
          className="text-charcoal mt-4 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {isExternal ? "Visit link" : "Download PDF"}
          <span className="sr-only">: {resource.title}</span>
          <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </article>
  );
}
