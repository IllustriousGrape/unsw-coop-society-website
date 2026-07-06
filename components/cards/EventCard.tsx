import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatEventDate, formatEventTime, truncate } from "@/utils/format";
import type { Event } from "@/types/database";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="group border-border bg-surface overflow-hidden rounded-2xl border transition-shadow duration-200 hover:shadow-lg">
      <Link
        href={`/events/${event.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        <div className="bg-surface-muted relative aspect-[16/9] overflow-hidden">
          {event.banner_url ? (
            <Image
              src={event.banner_url}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-charcoal text-primary flex h-full items-center justify-center text-4xl font-extrabold"
            >
              {event.title.charAt(0)}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Badge tone="primary">{event.category}</Badge>
            <p className="text-text-muted text-sm">
              <time dateTime={event.starts_at}>
                {formatEventDate(event.starts_at)}
              </time>
            </p>
          </div>
          <h3 className="text-charcoal mt-3 text-lg font-bold group-hover:underline">
            {event.title}
          </h3>
          <p className="text-text-muted mt-2 text-sm leading-relaxed">
            {truncate(event.description, 120)}
          </p>
          <p className="text-text-muted mt-4 text-sm font-medium">
            {formatEventTime(event.starts_at)} · {event.venue}
          </p>
        </div>
      </Link>
    </article>
  );
}
