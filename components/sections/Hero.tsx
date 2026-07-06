import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section className="bg-charcoal relative isolate overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="from-charcoal/60 via-charcoal/40 to-charcoal/80 absolute inset-0 bg-gradient-to-b"
      />
      <Container className="relative py-28 sm:py-36 lg:py-44">
        <div className="max-w-3xl">
          <p className="bg-primary text-charcoal mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold">
            UNSW Co-op Society
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where UNSW&apos;s Co-op scholars connect, grow, and lead.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            We bring together Co-op Program scholars across commerce,
            engineering, and computing — through professional events, industry
            connections, and a community that lasts well beyond graduation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/events">Upcoming Events</ButtonLink>
            <ButtonLink
              href="/committee"
              variant="ghost"
              className="border-white/40 text-white hover:border-white"
            >
              Meet the Committee
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
