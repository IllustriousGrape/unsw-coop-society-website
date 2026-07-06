/**
 * Domain types mirroring the Supabase schema in supabase/migrations.
 * Keep these in sync with the SQL — they are the single source of truth
 * for entity shapes across the app.
 */

export type EventCategory =
  "social" | "professional" | "charity" | "networking" | "academic";

export type GalleryCategory =
  "events" | "social" | "professional" | "community";

export type ResourceCategory =
  "resume" | "interview" | "scholarship" | "career" | "general";

interface BaseRow {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Profile extends BaseRow {
  email: string;
  full_name: string;
  is_admin: boolean;
  avatar_url: string | null;
}

export interface CommitteeMember extends BaseRow {
  name: string;
  role: string;
  photo_url: string | null;
  degree: string;
  year: string;
  biography: string;
  linkedin_url: string | null;
  email: string | null;
  term: string;
  sort_order: number;
  is_active: boolean;
}

export interface Event extends BaseRow {
  title: string;
  slug: string;
  banner_url: string | null;
  description: string;
  agenda: string | null;
  category: EventCategory;
  starts_at: string;
  ends_at: string | null;
  venue: string;
  registration_url: string | null;
  is_published: boolean;
  deleted_at: string | null;
}

export interface EventImage extends BaseRow {
  event_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

export interface GalleryImage extends BaseRow {
  image_url: string;
  alt_text: string;
  category: GalleryCategory;
  width: number;
  height: number;
  is_published: boolean;
}

export interface Sponsor extends BaseRow {
  name: string;
  slug: string;
  logo_url: string | null;
  description: string;
  website_url: string | null;
  industry: string;
  partnership_info: string | null;
  tier: string;
  sort_order: number;
  is_active: boolean;
}

export interface NewsItem extends BaseRow {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  published_at: string | null;
  is_published: boolean;
  deleted_at: string | null;
}

export interface Resource extends BaseRow {
  title: string;
  description: string;
  category: ResourceCategory;
  file_url: string | null;
  external_url: string | null;
  is_published: boolean;
}

export interface ContactMessage extends BaseRow {
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
}

export interface SiteSetting extends BaseRow {
  key: string;
  value: string;
}
