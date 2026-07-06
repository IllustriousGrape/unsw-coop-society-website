import type { EventCategory, ResourceCategory } from "@/types/database";

export const SITE_NAME = "UNSW Co-op Society";

export const SITE_DESCRIPTION =
  "The official student society for UNSW Co-op Program scholars — connecting students, alumni, and industry through professional and social events.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/unswcoopsoc",
  linkedin: "https://www.linkedin.com/company/unsw-co-op-society",
  email: "mailto:hello@unswcoopsoc.com",
} as const;

export const CONTACT_EMAIL = "hello@unswcoopsoc.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/committee", label: "Committee" },
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const EVENT_CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: "social", label: "Social" },
  { value: "professional", label: "Professional" },
  { value: "charity", label: "Charity" },
  { value: "networking", label: "Networking" },
  { value: "academic", label: "Academic" },
];

export const RESOURCE_CATEGORIES: { value: ResourceCategory; label: string }[] =
  [
    { value: "resume", label: "Resume" },
    { value: "interview", label: "Interview Tips" },
    { value: "scholarship", label: "Scholarships" },
    { value: "career", label: "Career Guides" },
    { value: "general", label: "General" },
  ];

export const ACKNOWLEDGEMENT_OF_COUNTRY =
  "UNSW Co-op Society acknowledges the Bedegal people, the Traditional Custodians of the land on which UNSW Kensington stands. We pay our respects to Elders past and present, and extend that respect to all Aboriginal and Torres Strait Islander peoples.";
