import Image from "next/image";
import type { CommitteeMember } from "@/types/database";

interface CommitteeCardProps {
  member: CommitteeMember;
}

export function CommitteeCard({ member }: CommitteeCardProps) {
  return (
    <article className="group border-border bg-surface overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
      <div className="bg-surface-muted relative aspect-square overflow-hidden">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="bg-charcoal flex h-full items-center justify-center text-5xl font-extrabold text-white"
          >
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-text-muted text-sm font-semibold">{member.role}</p>
        <h3 className="text-charcoal mt-1 text-lg font-bold">{member.name}</h3>
        <p className="text-text-muted mt-1 text-sm">
          {member.degree} · {member.year}
        </p>
        <p className="text-text-muted mt-3 text-sm leading-relaxed">
          {member.biography}
        </p>
        <div className="mt-4 flex items-center gap-4">
          {member.linkedin_url ? (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal text-sm font-semibold underline-offset-4 hover:underline"
            >
              LinkedIn
              <span className="sr-only"> profile of {member.name}</span>
            </a>
          ) : null}
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="text-charcoal text-sm font-semibold underline-offset-4 hover:underline"
            >
              Email
              <span className="sr-only"> {member.name}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
