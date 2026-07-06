import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past UNSW Co-op Society events — social, professional, charity, networking, and academic.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            The society calendar — professional development, social
            celebrations, and everything in between.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <EventsExplorer events={events} />
        </Container>
      </section>
    </>
  );
}
