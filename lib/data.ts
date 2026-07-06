import "server-only";
import { cache } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  placeholderCommittee,
  placeholderEventImages,
  placeholderEvents,
  placeholderGallery,
  placeholderNews,
  placeholderResources,
  placeholderSponsors,
} from "@/lib/placeholder-data";
import { logError } from "@/utils/logger";
import type {
  CommitteeMember,
  Event,
  EventImage,
  GalleryImage,
  NewsItem,
  Resource,
  Sponsor,
} from "@/types/database";

/**
 * Data-access layer. Every page reads through these functions, which query
 * Supabase when configured and otherwise return placeholder content so the
 * site works without a database. Failures degrade to empty results rather
 * than crashing the page.
 */

async function fetchTable<T>(
  table: string,
  fallback: T[],
  query: (client: Awaited<ReturnType<typeof createClient>>) => PromiseLike<{
    data: T[] | null;
    error: { message: string } | null;
  }>
): Promise<T[]> {
  if (!isSupabaseConfigured()) {
    return fallback;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await query(supabase);
    if (error) {
      logError(`Failed to fetch ${table}`, error);
      return [];
    }
    return data ?? [];
  } catch (error) {
    logError(`Unexpected error fetching ${table}`, error);
    return [];
  }
}

export const getCommittee = cache(async (): Promise<CommitteeMember[]> => {
  return fetchTable("committee", placeholderCommittee, (supabase) =>
    supabase
      .from("committee")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
  );
});

export const getEvents = cache(async (): Promise<Event[]> => {
  return fetchTable("events", placeholderEvents, (supabase) =>
    supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .is("deleted_at", null)
      .order("starts_at", { ascending: false })
  );
});

export const getUpcomingEvents = cache(async (): Promise<Event[]> => {
  const events = await getEvents();
  const now = Date.now();
  return events
    .filter((event) => new Date(event.starts_at).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
    );
});

export const getEventBySlug = cache(
  async (slug: string): Promise<Event | null> => {
    const events = await getEvents();
    return events.find((event) => event.slug === slug) ?? null;
  }
);

export const getEventImages = cache(
  async (eventId: string): Promise<EventImage[]> => {
    return fetchTable(
      "event_images",
      placeholderEventImages.filter((image) => image.event_id === eventId),
      (supabase) =>
        supabase
          .from("event_images")
          .select("*")
          .eq("event_id", eventId)
          .order("sort_order", { ascending: true })
    );
  }
);

export const getSponsors = cache(async (): Promise<Sponsor[]> => {
  return fetchTable("sponsors", placeholderSponsors, (supabase) =>
    supabase
      .from("sponsors")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
  );
});

export const getSponsorBySlug = cache(
  async (slug: string): Promise<Sponsor | null> => {
    const sponsors = await getSponsors();
    return sponsors.find((sponsor) => sponsor.slug === slug) ?? null;
  }
);

export const getNews = cache(async (): Promise<NewsItem[]> => {
  return fetchTable("news", placeholderNews, (supabase) =>
    supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .is("deleted_at", null)
      .order("published_at", { ascending: false })
  );
});

export const getNewsBySlug = cache(
  async (slug: string): Promise<NewsItem | null> => {
    const news = await getNews();
    return news.find((item) => item.slug === slug) ?? null;
  }
);

export const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
  return fetchTable("gallery", placeholderGallery, (supabase) =>
    supabase
      .from("gallery")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
  );
});

export const getResources = cache(async (): Promise<Resource[]> => {
  return fetchTable("resources", placeholderResources, (supabase) =>
    supabase
      .from("resources")
      .select("*")
      .eq("is_published", true)
      .order("title", { ascending: true })
  );
});
