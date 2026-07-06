"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { isUpcoming } from "@/utils/format";
import type { Event, EventCategory } from "@/types/database";

interface EventsExplorerProps {
  events: Event[];
}

type CategoryFilter = EventCategory | "all";

/** Client-side search and category filtering over the events list. */
export function EventsExplorer({ events }: EventsExplorerProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesCategory = category === "all" || event.category === category;
      const matchesQuery =
        normalisedQuery === "" ||
        event.title.toLowerCase().includes(normalisedQuery) ||
        event.description.toLowerCase().includes(normalisedQuery) ||
        event.venue.toLowerCase().includes(normalisedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [events, category, query]);

  const upcoming = filtered.filter((event) => isUpcoming(event.starts_at));
  const past = filtered.filter((event) => !isUpcoming(event.starts_at));

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter events by category"
          className="flex flex-wrap gap-2"
        >
          {[{ value: "all" as const, label: "All" }, ...EVENT_CATEGORIES].map(
            (option) => (
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
            )
          )}
        </div>
        <div className="sm:w-72">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <input
            id="event-search"
            type="search"
            placeholder="Search events…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="border-border bg-surface placeholder:text-text-subtle focus:border-charcoal w-full rounded-full border px-5 py-2.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} events found
      </p>

      {filtered.length === 0 ? (
        <p className="text-text-muted mt-16 text-center">
          No events match your search. Try a different category or keyword.
        </p>
      ) : (
        <>
          {upcoming.length > 0 ? (
            <section aria-labelledby="upcoming-heading" className="mt-12">
              <h2
                id="upcoming-heading"
                className="text-charcoal text-xl font-bold"
              >
                Upcoming
              </h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ) : null}

          {past.length > 0 ? (
            <section aria-labelledby="past-heading" className="mt-16">
              <h2 id="past-heading" className="text-charcoal text-xl font-bold">
                Past Events
              </h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
