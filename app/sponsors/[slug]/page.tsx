import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getSponsorBySlug } from "@/lib/data";
import { truncate } from "@/utils/format";

interface SponsorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SponsorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = await getSponsorBySlug(slug);
  if (!sponsor) {
    return { title: "Sponsor not found" };
  }
  return {
    title: sponsor.name,
    description: truncate(sponsor.description, 160),
    alternates: { canonical: `/sponsors/${sponsor.slug}` },
  };
}

export default async function SponsorPage({ params }: SponsorPageProps) {
  const { slug } = await params;
  const sponsor = await getSponsorBySlug(slug);
  if (!sponsor) {
    notFound();
  }

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <Badge tone="primary">{sponsor.tier} sponsor</Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {sponsor.name}
          </h1>
          <p className="mt-4 text-lg text-white/75">{sponsor.industry}</p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-charcoal text-2xl font-bold">
                About {sponsor.name}
              </h2>
              <p className="text-text-muted mt-4 leading-relaxed">
                {sponsor.description}
              </p>
              {sponsor.partnership_info ? (
                <>
                  <h2 className="text-charcoal mt-10 text-2xl font-bold">
                    Our partnership
                  </h2>
                  <p className="text-text-muted mt-4 leading-relaxed">
                    {sponsor.partnership_info}
                  </p>
                </>
              ) : null}
            </div>

            <aside aria-label="Sponsor details">
              <div className="border-border bg-surface-muted rounded-2xl border p-6">
                <div className="bg-surface flex h-24 items-center justify-center rounded-xl px-6">
                  {sponsor.logo_url ? (
                    <Image
                      src={sponsor.logo_url}
                      alt={`${sponsor.name} logo`}
                      width={180}
                      height={64}
                      className="max-h-16 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-charcoal text-xl font-bold">
                      {sponsor.name}
                    </span>
                  )}
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-charcoal font-semibold">Industry</dt>
                    <dd className="text-text-muted mt-1">{sponsor.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal font-semibold">Tier</dt>
                    <dd className="text-text-muted mt-1 capitalize">
                      {sponsor.tier}
                    </dd>
                  </div>
                </dl>
                {sponsor.website_url ? (
                  <div className="mt-6">
                    <ButtonLink
                      href={sponsor.website_url}
                      external
                      variant="primary"
                      className="w-full"
                    >
                      Visit website
                    </ButtonLink>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <ButtonLink href="/sponsors" variant="ghost">
              ← All sponsors
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
