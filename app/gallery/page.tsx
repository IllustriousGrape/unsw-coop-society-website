import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getGalleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from UNSW Co-op Society events — networking nights, BBQs, cruises, and community moments.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Gallery
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Moments from society life — captured across our events, socials, and
            community initiatives.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <GalleryGrid images={images} />
        </Container>
      </section>
    </>
  );
}
