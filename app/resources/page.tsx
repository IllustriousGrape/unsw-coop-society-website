import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ResourcesExplorer } from "@/components/sections/ResourcesExplorer";
import { getResources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Resume templates, interview guides, scholarship information, and career resources for UNSW Co-op scholars and applicants.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Resources
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Guides, templates, and links curated by scholars — for placement
            applications, interviews, and everything after.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <ResourcesExplorer resources={resources} />
        </Container>
      </section>
    </>
  );
}
