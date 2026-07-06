"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

/** Share links plus a copy-to-clipboard fallback. */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — nothing to do.
    }
  };

  const linkClasses =
    "rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-text-muted text-sm font-semibold">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        LinkedIn
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        Facebook
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className={linkClasses}
      >
        Email
      </a>
      <button type="button" onClick={copyLink} className={linkClasses}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
