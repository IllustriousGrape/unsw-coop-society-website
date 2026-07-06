import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the UNSW Co-op Society — our mission, vision, history, and the values that guide our community of Co-op Program scholars.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Community",
    description:
      "Every scholar belongs. We build genuine friendships across cohorts, degrees, and generations of the program.",
  },
  {
    title: "Professionalism",
    description:
      "We hold ourselves to the standard the Co-op Program is known for — in our events, our partnerships, and how we represent UNSW.",
  },
  {
    title: "Growth",
    description:
      "From first-year workshops to alumni mentoring, we create opportunities for members to develop beyond the classroom.",
  },
  {
    title: "Giving Back",
    description:
      "Through charity events and volunteering, we use our community's energy to support causes beyond the university.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            About the Society
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            The UNSW Co-op Society is the official student society for scholars
            of the UNSW Co-operative Education Program — one of Australia&apos;s
            most prestigious industry-linked scholarship programs.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading
                eyebrow="Who we are"
                title="What is the Co-op Society?"
              />
              <div className="text-text-muted mt-6 space-y-4 text-base leading-relaxed">
                <p>
                  The Co-op Program awards scholarships to high-achieving
                  students across commerce, engineering, science, and computing,
                  pairing their studies with paid industry placements at
                  Australia&apos;s leading organisations.
                </p>
                <p>
                  The Co-op Society exists to bring those scholars together. We
                  run the social calendar that turns a scholarship cohort into a
                  community — welcome BBQs, networking nights, workshops,
                  charity events, and end-of-term celebrations — and connect
                  current scholars with the program&apos;s extensive alumni
                  network.
                </p>
                <p>
                  Whether you&apos;re a prospective applicant, a first-year
                  finding your feet, or an alum who wants to stay involved, the
                  society is your home within the program.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-surface-muted relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
                  alt="Students socialising together on campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="bg-surface rounded-3xl p-8 sm:p-10">
                <h2 className="text-charcoal text-2xl font-bold">
                  Our Mission
                </h2>
                <p className="text-text-muted mt-4 text-base leading-relaxed">
                  To enrich the Co-op scholar experience by fostering a
                  connected, supportive, and professionally engaged community —
                  creating opportunities for friendship, development, and
                  industry connection at every stage of the program.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-surface rounded-3xl p-8 sm:p-10">
                <h2 className="text-charcoal text-2xl font-bold">Our Vision</h2>
                <p className="text-text-muted mt-4 text-base leading-relaxed">
                  A Co-op community where every scholar — past, present, and
                  future — feels part of something lasting: a network of
                  colleagues, mentors, and friends that extends across
                  industries and generations.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-20 sm:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow="Our story"
              title="History"
              description="The society has grown alongside the Co-op Program itself."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="text-text-muted mt-8 max-w-3xl space-y-4 text-base leading-relaxed">
              <p>
                The UNSW Co-op Program was established in 1989 with the backing
                of industry partners who wanted graduates ready for the
                workplace from day one. As cohorts grew, scholars began
                organising their own social and professional events — and the
                Co-op Society was formed to give that community a permanent
                home.
              </p>
              <p>
                Today the society represents scholars across every Co-op stream,
                runs a full calendar of events each year, and maintains
                partnerships with the employers and alumni who make the program
                what it is.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="py-20 sm:py-24">
          <FadeIn>
            <SectionHeading
              eyebrow="What guides us"
              title="Our Values"
              align="center"
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.08}>
                <div className="border-border bg-surface h-full rounded-2xl border p-6">
                  <div
                    aria-hidden="true"
                    className="bg-charcoal mb-4 h-1.5 w-10 rounded-full"
                  />
                  <h3 className="text-charcoal text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="text-text-muted mt-2 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
