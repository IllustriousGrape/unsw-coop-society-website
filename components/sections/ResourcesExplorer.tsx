"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import type { Resource, ResourceCategory } from "@/types/database";

interface ResourcesExplorerProps {
  resources: Resource[];
}

/** Client-side search and category filtering over the resources list. */
export function ResourcesExplorer({ resources }: ResourcesExplorerProps) {
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory =
        category === "all" || resource.category === category;
      const matchesQuery =
        normalisedQuery === "" ||
        resource.title.toLowerCase().includes(normalisedQuery) ||
        resource.description.toLowerCase().includes(normalisedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [resources, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter resources by category"
          className="flex flex-wrap gap-2"
        >
          {[
            { value: "all" as const, label: "All" },
            ...RESOURCE_CATEGORIES,
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={category === option.value}
              onClick={() => setCategory(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === option.value
                  ? "bg-charcoal text-white"
                  : "bg-surface-muted text-text-muted hover:text-charcoal"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="sm:w-72">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <input
            id="resource-search"
            type="search"
            placeholder="Search resources…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="border-border bg-surface placeholder:text-text-subtle focus:border-charcoal w-full rounded-full border px-5 py-2.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} resources found
      </p>

      {filtered.length === 0 ? (
        <p className="text-text-muted mt-16 text-center">
          No resources match your search.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
