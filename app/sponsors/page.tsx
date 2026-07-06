import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SponsorCard } from "@/components/cards/SponsorCard";
import { ButtonLink } from "@/components/ui/Button";
import { getSponsors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The industry partners who support the UNSW Co-op Society — from financial services to technology and engineering.",
  alternates: { canonical: "/sponsors" },
};

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Sponsors
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Industry partners who invest in Co-op scholars — funding our events
            and connecting members with placement and graduate opportunities.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-20 sm:py-24">
          {sponsors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sponsors.map((sponsor, index) => (
                <FadeIn key={sponsor.id} delay={(index % 3) * 0.06}>
                  <SponsorCard sponsor={sponsor} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              Sponsor announcements for this year are coming soon.
            </p>
          )}

          <FadeIn>
            <div className="bg-surface-muted mt-16 rounded-3xl p-8 text-center sm:p-12">
              <h2 className="text-charcoal text-2xl font-bold">
                Interested in partnering with us?
              </h2>
              <p className="text-text-muted mx-auto mt-3 max-w-xl text-base">
                Reach hundreds of high-achieving UNSW Co-op scholars across
                commerce, engineering, and computing.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact">Contact the committee</ButtonLink>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
