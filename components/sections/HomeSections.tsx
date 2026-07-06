import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { SponsorCard } from "@/components/cards/SponsorCard";
import { SOCIAL_LINKS } from "@/lib/constants";
import type {
  CommitteeMember,
  Event,
  GalleryImage,
  NewsItem,
  Sponsor,
} from "@/types/database";

interface SectionProps {
  children: React.ReactNode;
  muted?: boolean;
}

function Section({ children, muted = false }: SectionProps) {
  return (
    <section className={muted ? "bg-surface-muted" : "bg-surface"}>
      <Container className="py-20 sm:py-24">{children}</Container>
    </section>
  );
}

export function UpcomingEventsSection({ events }: { events: Event[] }) {
  return (
    <Section>
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's on"
            title="Upcoming Events"
            description="From networking nights to trivia — there's always something on the calendar."
          />
          <ButtonLink href="/events" variant="ghost">
            View all events
          </ButtonLink>
        </div>
      </FadeIn>
      {events.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event, index) => (
            <FadeIn key={event.id} delay={index * 0.08}>
              <EventCard event={event} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <p className="text-text-muted mt-12">
          New events are being planned — check back soon or follow us on
          Instagram for announcements.
        </p>
      )}
    </Section>
  );
}

export function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) {
    return null;
  }
  return (
    <Section muted>
      <FadeIn>
        <SectionHeading
          eyebrow="Latest news"
          title="From the Society"
          description="Announcements, recaps, and updates from the committee."
        />
      </FadeIn>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.slice(0, 3).map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.08}>
            <NewsCard item={item} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function SponsorsSection({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) {
    return null;
  }
  return (
    <Section>
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our partners"
            title="Proudly Sponsored By"
            description="Industry partners who invest in the next generation of Co-op scholars."
          />
          <ButtonLink href="/sponsors" variant="ghost">
            All sponsors
          </ButtonLink>
        </div>
      </FadeIn>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sponsors.slice(0, 4).map((sponsor, index) => (
          <FadeIn key={sponsor.id} delay={index * 0.06}>
            <SponsorCard sponsor={sponsor} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function InstagramSection() {
  return (
    <Section muted>
      <FadeIn>
        <div className="bg-charcoal rounded-3xl px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Follow the story on Instagram
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Event photos, announcements, and life as a Co-op scholar —
            @unswcoopsoc is where it all happens first.
          </p>
          <div className="mt-8">
            <ButtonLink href={SOCIAL_LINKS.instagram} external>
              @unswcoopsoc on Instagram
            </ButtonLink>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

export function GalleryPreviewSection({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return null;
  }
  return (
    <Section>
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from the Community"
            description="A glimpse of society life — from BBQs to boardrooms."
          />
          <ButtonLink href="/gallery" variant="ghost">
            Browse gallery
          </ButtonLink>
        </div>
      </FadeIn>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.slice(0, 4).map((image, index) => (
          <FadeIn key={image.id} delay={index * 0.06}>
            <div className="bg-surface-muted relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function CommitteePreviewSection({
  members,
}: {
  members: CommitteeMember[];
}) {
  if (members.length === 0) {
    return null;
  }
  return (
    <Section muted>
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the Committee"
            description="The scholars who keep the society running."
          />
          <ButtonLink href="/committee" variant="ghost">
            Full committee
          </ButtonLink>
        </div>
      </FadeIn>
      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {members.slice(0, 4).map((member, index) => (
          <FadeIn key={member.id} delay={index * 0.06}>
            <Link
              href="/committee"
              className="group block text-center focus-visible:outline-offset-4"
            >
              <div className="bg-surface-muted relative mx-auto aspect-square w-full max-w-44 overflow-hidden rounded-2xl">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 176px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="bg-charcoal text-primary flex h-full items-center justify-center text-4xl font-extrabold"
                  >
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="text-charcoal mt-4 text-base font-bold group-hover:underline">
                {member.name}
              </p>
              <p className="text-text-muted text-sm">{member.role}</p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
