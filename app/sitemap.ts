import type { MetadataRoute } from "next";
import { getEvents, getSponsors } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, sponsors] = await Promise.all([getEvents(), getSponsors()]);

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/committee",
    "/events",
    "/sponsors",
    "/gallery",
    "/resources",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/events/${event.slug}`,
    lastModified: event.updated_at,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const sponsorPages: MetadataRoute.Sitemap = sponsors.map((sponsor) => ({
    url: `${SITE_URL}/sponsors/${sponsor.slug}`,
    lastModified: sponsor.updated_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...eventPages, ...sponsorPages];
}
