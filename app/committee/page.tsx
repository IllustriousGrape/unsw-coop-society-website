import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { CommitteeCard } from "@/components/cards/CommitteeCard";
import { getCommittee } from "@/lib/data";

export const metadata: Metadata = {
  title: "Committee",
  description:
    "Meet the UNSW Co-op Society committee — the scholars leading the society's events, partnerships, and community this year.",
  alternates: { canonical: "/committee" },
};

export default async function CommitteePage() {
  const members = await getCommittee();
  const term = members[0]?.term;

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Meet the Committee
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {term ? `The ${term} committee — ` : ""}scholars elected by their
            peers to run the society&apos;s events, partnerships, and community.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-20 sm:py-24">
          {members.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <FadeIn key={member.id} delay={(index % 3) * 0.08}>
                  <CommitteeCard member={member} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              Committee details will be published shortly after our next AGM.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
