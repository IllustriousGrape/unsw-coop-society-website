import { Hero } from "@/components/sections/Hero";
import {
  CommitteePreviewSection,
  GalleryPreviewSection,
  InstagramSection,
  NewsSection,
  SponsorsSection,
  UpcomingEventsSection,
} from "@/components/sections/HomeSections";
import {
  getCommittee,
  getGalleryImages,
  getNews,
  getSponsors,
  getUpcomingEvents,
} from "@/lib/data";

export default async function HomePage() {
  const [events, news, sponsors, gallery, committee] = await Promise.all([
    getUpcomingEvents(),
    getNews(),
    getSponsors(),
    getGalleryImages(),
    getCommittee(),
  ]);

  return (
    <>
      <Hero />
      <UpcomingEventsSection events={events} />
      <NewsSection news={news} />
      <SponsorsSection sponsors={sponsors} />
      <InstagramSection />
      <GalleryPreviewSection images={gallery} />
      <CommitteePreviewSection members={committee} />
    </>
  );
}
