import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Sponsor } from "@/types/database";

interface SponsorCardProps {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <article className="group border-border bg-surface rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-lg">
      <Link
        href={`/sponsors/${sponsor.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        <div className="bg-surface-muted flex h-20 items-center justify-center rounded-xl px-6">
          {sponsor.logo_url ? (
            <Image
              src={sponsor.logo_url}
              alt={`${sponsor.name} logo`}
              width={160}
              height={56}
              className="max-h-14 w-auto object-contain"
            />
          ) : (
            <span className="text-charcoal text-lg font-bold">
              {sponsor.name}
            </span>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <h3 className="text-charcoal text-base font-bold group-hover:underline">
            {sponsor.name}
          </h3>
          <Badge>{sponsor.tier}</Badge>
        </div>
        <p className="text-text-muted mt-1 text-sm">{sponsor.industry}</p>
      </Link>
    </article>
  );
}
