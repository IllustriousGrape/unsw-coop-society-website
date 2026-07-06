"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryCategory, GalleryImage } from "@/types/database";

const CATEGORY_OPTIONS: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "events", label: "Events" },
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
  { value: "community", label: "Community" },
];

interface GalleryGridProps {
  images: GalleryImage[];
}

/** Masonry-style gallery with category filters and a keyboard-accessible lightbox. */
export function GalleryGrid({ images }: GalleryGridProps) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(
    () =>
      category === "all"
        ? images
        : images.filter((image) => image.category === category),
    [images, category]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const showPrevious = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? null : (index - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? null : (index + 1) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, close, showPrevious, showNext]);

  const activeImage = lightboxIndex === null ? null : filtered[lightboxIndex];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2"
      >
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={category === option.value}
            onClick={() => {
              setCategory(option.value);
              setLightboxIndex(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === option.value
                ? "bg-charcoal text-white"
                : "bg-surface-muted text-text-muted hover:text-charcoal"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-text-muted mt-16 text-center">
          No photos in this category yet.
        </p>
      ) : (
        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {filtered.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group bg-surface-muted block w-full overflow-hidden rounded-2xl"
              aria-label={`View photo: ${image.alt_text}`}
            >
              <Image
                src={image.image_url}
                alt={image.alt_text}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              />
            </button>
          ))}
        </div>
      )}

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt_text}
          className="bg-charcoal/95 fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.image_url}
              alt={activeImage.alt_text}
              width={activeImage.width}
              height={activeImage.height}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-4 text-center text-sm text-white/80">
              {activeImage.alt_text}
            </p>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute -top-2 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <span aria-hidden="true">✕</span>
            </button>
            {filtered.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
