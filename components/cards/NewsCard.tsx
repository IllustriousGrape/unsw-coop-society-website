import Image from "next/image";
import { formatShortDate } from "@/utils/format";
import type { NewsItem } from "@/types/database";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="border-border bg-surface overflow-hidden rounded-2xl border">
      <div className="bg-surface-muted relative aspect-[16/9]">
        {item.cover_url ? (
          <Image
            src={item.cover_url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="p-6">
        {item.published_at ? (
          <time
            dateTime={item.published_at}
            className="text-text-muted text-sm"
          >
            {formatShortDate(item.published_at)}
          </time>
        ) : null}
        <h3 className="text-charcoal mt-2 text-lg font-bold">{item.title}</h3>
        <p className="text-text-muted mt-2 text-sm leading-relaxed">
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}
