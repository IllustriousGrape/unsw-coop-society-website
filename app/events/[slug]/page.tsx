import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { ShareButtons } from "@/components/sections/ShareButtons";
import { getEventBySlug, getEventImages, getEvents } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import {
  formatEventDate,
  formatEventTime,
  isUpcoming,
  truncate,
} from "@/utils/format";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return { title: "Event not found" };
  }
  return {
    title: event.title,
    description: truncate(event.description, 160),
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.title,
      description: truncate(event.description, 160),
      images: event.banner_url ? [event.banner_url] : undefined,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    notFound();
  }

  const [images, allEvents] = await Promise.all([
    getEventImages(event.id),
    getEvents(),
  ]);
  const related = allEvents
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);
  const upcoming = isUpcoming(event.starts_at);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: truncate(event.description, 300),
    startDate: event.starts_at,
    ...(event.ends_at ? { endDate: event.ends_at } : {}),
    location: { "@type": "Place", name: event.venue },
    organizer: { "@type": "Organization", name: "UNSW Co-op Society" },
    ...(event.banner_url ? { image: [event.banner_url] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-charcoal relative isolate overflow-hidden">
        {event.banner_url ? (
          <>
            <Image
              src={event.banner_url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div
              aria-hidden="true"
              className="from-charcoal/50 to-charcoal/85 absolute inset-0 bg-gradient-to-b"
            />
          </>
        ) : null}
        <Container className="relative py-20 sm:py-28">
          <Badge tone="primary">{event.category}</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {event.title}
          </h1>
          <p className="mt-6 text-lg text-white/80">
            <time dateTime={event.starts_at}>
              {formatEventDate(event.starts_at)} ·{" "}
              {formatEventTime(event.starts_at)}
            </time>
            {event.ends_at ? ` – ${formatEventTime(event.ends_at)}` : ""}
          </p>
          <p className="mt-2 text-lg text-white/80">{event.venue}</p>
          {upcoming && event.registration_url ? (
            <div className="mt-8">
              <ButtonLink href={event.registration_url} external>
                Register now
              </ButtonLink>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-charcoal text-2xl font-bold">
                About this event
              </h2>
              <p className="text-text-muted mt-4 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {event.agenda ? (
                <div className="mt-10">
                  <h2 className="text-charcoal text-2xl font-bold">Agenda</h2>
                  <ul className="mt-4 space-y-2">
                    {event.agenda.split("\n").map((line) => (
                      <li
                        key={line}
                        className="bg-surface-muted text-text-muted rounded-lg px-4 py-3 text-sm"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {images.length > 0 ? (
                <div className="mt-10">
                  <h2 className="text-charcoal text-2xl font-bold">
                    Photo gallery
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="bg-surface-muted relative aspect-[3/2] overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={image.image_url}
                          alt={image.alt_text}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-10">
                <ShareButtons
                  title={event.title}
                  url={`${SITE_URL}/events/${event.slug}`}
                />
              </div>
            </div>

            <aside aria-label="Event details">
              <div className="border-border bg-surface-muted sticky top-24 rounded-2xl border p-6">
                <h2 className="text-charcoal text-lg font-bold">Details</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-charcoal font-semibold">Date</dt>
                    <dd className="text-text-muted mt-1">
                      {formatEventDate(event.starts_at)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-charcoal font-semibold">Time</dt>
                    <dd className="text-text-muted mt-1">
                      {formatEventTime(event.starts_at)}
                      {event.ends_at
                        ? ` – ${formatEventTime(event.ends_at)}`
                        : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-charcoal font-semibold">Location</dt>
                    <dd className="text-text-muted mt-1">{event.venue}</dd>
                  </div>
                </dl>
                {upcoming && event.registration_url ? (
                  <div className="mt-6">
                    <ButtonLink
                      href={event.registration_url}
                      external
                      className="w-full"
                    >
                      Register
                    </ButtonLink>
                  </div>
                ) : null}
                {!upcoming ? (
                  <p className="text-text-muted mt-6 text-sm">
                    This event has ended.
                  </p>
                ) : null}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-surface-muted">
          <Container className="py-16 sm:py-20">
            <SectionHeading eyebrow="More like this" title="Related Events" />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedEvent) => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
