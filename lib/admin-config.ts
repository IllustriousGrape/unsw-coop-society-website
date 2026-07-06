import { EVENT_CATEGORIES, RESOURCE_CATEGORIES } from "@/lib/constants";

/**
 * Registry driving the admin dashboard. Each entity gets list, create,
 * edit, and delete pages generated from this config — adding a new
 * managed content type means adding an entry here (plus its table).
 */

export type AdminFieldType =
  | "text"
  | "textarea"
  | "url"
  | "email"
  | "number"
  | "boolean"
  | "datetime"
  | "select"
  | "image";

export interface AdminField {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
}

export interface AdminEntity {
  /** URL segment and Supabase table name. */
  table: string;
  singular: string;
  plural: string;
  /** Column shown as the row title in list views. */
  titleColumn: string;
  /** Column receiving an auto-generated slug, if any. */
  slugSource?: { from: string; to: string };
  /** Table has a deleted_at column — delete becomes soft delete. */
  softDelete?: boolean;
  orderBy: { column: string; ascending: boolean };
  fields: AdminField[];
}

const GALLERY_CATEGORY_OPTIONS = [
  { value: "events", label: "Events" },
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
  { value: "community", label: "Community" },
];

export const ADMIN_ENTITIES: AdminEntity[] = [
  {
    table: "events",
    singular: "Event",
    plural: "Events",
    titleColumn: "title",
    slugSource: { from: "title", to: "slug" },
    softDelete: true,
    orderBy: { column: "starts_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "agenda",
        label: "Agenda",
        type: "textarea",
        help: "One agenda item per line, e.g. '6:00 PM — Doors open'.",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: EVENT_CATEGORIES,
      },
      { name: "starts_at", label: "Starts", type: "datetime", required: true },
      { name: "ends_at", label: "Ends", type: "datetime" },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "registration_url", label: "Registration link", type: "url" },
      { name: "banner_url", label: "Banner image", type: "image" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  {
    table: "committee",
    singular: "Committee member",
    plural: "Committee",
    titleColumn: "name",
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "year", label: "Year", type: "text", required: true },
      {
        name: "biography",
        label: "Biography",
        type: "textarea",
        required: true,
      },
      { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
      { name: "email", label: "Email", type: "email" },
      { name: "term", label: "Committee term", type: "text", required: true },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    table: "sponsors",
    singular: "Sponsor",
    plural: "Sponsors",
    titleColumn: "name",
    slugSource: { from: "name", to: "slug" },
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      { name: "industry", label: "Industry", type: "text", required: true },
      { name: "website_url", label: "Website", type: "url" },
      {
        name: "partnership_info",
        label: "Partnership information",
        type: "textarea",
      },
      {
        name: "tier",
        label: "Tier",
        type: "select",
        required: true,
        options: [
          { value: "principal", label: "Principal" },
          { value: "major", label: "Major" },
          { value: "supporting", label: "Supporting" },
        ],
      },
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    table: "news",
    singular: "News article",
    plural: "News",
    titleColumn: "title",
    slugSource: { from: "title", to: "slug" },
    softDelete: true,
    orderBy: { column: "published_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "body", label: "Body", type: "textarea", required: true },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "published_at", label: "Publish date", type: "datetime" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  {
    table: "resources",
    singular: "Resource",
    plural: "Resources",
    titleColumn: "title",
    orderBy: { column: "title", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: RESOURCE_CATEGORIES,
      },
      {
        name: "file_url",
        label: "File URL",
        type: "url",
        help: "Link to an uploaded PDF. Leave blank for external links.",
      },
      { name: "external_url", label: "External URL", type: "url" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  {
    table: "gallery",
    singular: "Gallery image",
    plural: "Gallery",
    titleColumn: "alt_text",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "image_url", label: "Image", type: "image", required: true },
      {
        name: "alt_text",
        label: "Alt text",
        type: "text",
        required: true,
        help: "Describe the photo for screen readers.",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: GALLERY_CATEGORY_OPTIONS,
      },
      { name: "width", label: "Width (px)", type: "number", required: true },
      { name: "height", label: "Height (px)", type: "number", required: true },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
];

export function getAdminEntity(table: string): AdminEntity | undefined {
  return ADMIN_ENTITIES.find((entity) => entity.table === table);
}
