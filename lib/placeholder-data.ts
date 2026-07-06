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
 * Placeholder content used when Supabase is not configured (local
 * development without a database) so every page renders realistically.
 * Mirrors supabase/seed.sql — update both together.
 */

const NOW = "2026-01-01T00:00:00.000Z";
const base = (id: string) => ({ id, created_at: NOW, updated_at: NOW });

const img = (id: string, w = 1600, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const placeholderCommittee: CommitteeMember[] = [
  {
    ...base("c1"),
    name: "Aisha Rahman",
    role: "President",
    photo_url: img("photo-1573496359142-b8d87734a5a2", 800, 800),
    degree: "B. Commerce (Co-op)",
    year: "4th Year",
    biography:
      "Aisha leads the society's strategic direction and represents Co-op scholars across UNSW and industry. She is passionate about building a community where every scholar feels at home.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: "president@unswcoopsoc.com",
    term: "2026",
    sort_order: 1,
    is_active: true,
  },
  {
    ...base("c2"),
    name: "Liam Chen",
    role: "Vice President",
    photo_url: img("photo-1507003211169-0a1dd7228f2d", 800, 800),
    degree: "B. Software Engineering (Co-op)",
    year: "3rd Year",
    biography:
      "Liam supports the executive team and oversees internal operations, making sure every portfolio has what it needs to deliver great experiences for members.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: null,
    term: "2026",
    sort_order: 2,
    is_active: true,
  },
  {
    ...base("c3"),
    name: "Sofia Nguyen",
    role: "Treasurer",
    photo_url: img("photo-1580489944761-15a19d654956", 800, 800),
    degree: "B. Actuarial Studies (Co-op)",
    year: "2nd Year",
    biography:
      "Sofia manages the society's finances and sponsorship budgets, keeping every event funded and every dollar accounted for.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: null,
    term: "2026",
    sort_order: 3,
    is_active: true,
  },
  {
    ...base("c4"),
    name: "James Patel",
    role: "Secretary",
    photo_url: img("photo-1500648767791-00dcc994a43e", 800, 800),
    degree: "B. Civil Engineering (Co-op)",
    year: "3rd Year",
    biography:
      "James keeps the society organised — minutes, records, and communications — so the committee can focus on serving members.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: null,
    term: "2026",
    sort_order: 4,
    is_active: true,
  },
  {
    ...base("c5"),
    name: "Emily Zhao",
    role: "Events Director",
    photo_url: img("photo-1438761681033-6461ffad8d80", 800, 800),
    degree: "B. Marketing (Co-op)",
    year: "2nd Year",
    biography:
      "Emily designs and delivers the society's calendar of social and professional events, from first-year welcomes to industry networking nights.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: null,
    term: "2026",
    sort_order: 5,
    is_active: true,
  },
  {
    ...base("c6"),
    name: "Daniel Kim",
    role: "Marketing Director",
    photo_url: img("photo-1472099645785-5658abf4ff4e", 800, 800),
    degree: "B. Computer Science (Co-op)",
    year: "3rd Year",
    biography:
      "Daniel runs the society's brand and channels, keeping members informed and showcasing the Co-op community to the wider university.",
    linkedin_url: "https://www.linkedin.com/in/example",
    email: null,
    term: "2026",
    sort_order: 6,
    is_active: true,
  },
];

export const placeholderEvents: Event[] = [
  {
    ...base("e1"),
    title: "Industry Networking Night 2026",
    slug: "industry-networking-night-2026",
    banner_url: img("photo-1511578314322-379afb476865"),
    description:
      "Our flagship networking evening connecting Co-op scholars with sponsor companies across banking, consulting, engineering, and technology. Meet graduate recruiters, hear from alumni, and build relationships that shape your career.",
    agenda:
      "6:00 PM — Registration and welcome drinks\n6:30 PM — Opening address\n7:00 PM — Structured networking rotations\n8:30 PM — Canapés and open networking\n9:30 PM — Close",
    category: "networking",
    starts_at: "2026-08-14T08:00:00.000Z",
    ends_at: "2026-08-14T11:30:00.000Z",
    venue: "Roundhouse, UNSW Kensington",
    registration_url: "https://events.humanitix.com/example",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("e2"),
    title: "First Year Welcome BBQ",
    slug: "first-year-welcome-bbq",
    banner_url: img("photo-1529156069898-49953e39b3ac"),
    description:
      "Kick off the year with the Co-op community! Meet your cohort, senior scholars, and the committee over a relaxed BBQ on the Village Green. All scholars welcome — food and drinks provided.",
    agenda:
      "12:00 PM — BBQ opens\n12:30 PM — Welcome from the President\n1:00 PM — Games and mingling\n3:00 PM — Close",
    category: "social",
    starts_at: "2026-07-24T02:00:00.000Z",
    ends_at: "2026-07-24T05:00:00.000Z",
    venue: "Village Green, UNSW Kensington",
    registration_url: "https://events.humanitix.com/example",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("e3"),
    title: "Resume & Interview Workshop",
    slug: "resume-interview-workshop",
    banner_url: img("photo-1454165804606-c3d57bc86b40"),
    description:
      "A hands-on workshop with industry mentors covering resume writing, behavioural interviews, and assessment centres — tailored to Co-op placement applications.",
    agenda:
      "5:00 PM — Resume clinic\n6:00 PM — Interview techniques panel\n7:00 PM — Mock interview practice\n8:00 PM — Close",
    category: "professional",
    starts_at: "2026-08-05T07:00:00.000Z",
    ends_at: "2026-08-05T10:00:00.000Z",
    venue: "Colombo Theatre B, UNSW Kensington",
    registration_url: "https://events.humanitix.com/example",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("e4"),
    title: "Charity Trivia Night",
    slug: "charity-trivia-night",
    banner_url: img("photo-1543269865-cbf427effbad"),
    description:
      "An evening of trivia, prizes, and fundraising, with all proceeds supporting youth education charities. Bring a team of six or join one on the night.",
    agenda:
      "6:30 PM — Doors open\n7:00 PM — Trivia rounds begin\n9:00 PM — Prizes and raffle\n9:30 PM — Close",
    category: "charity",
    starts_at: "2026-09-10T08:30:00.000Z",
    ends_at: "2026-09-10T11:30:00.000Z",
    venue: "The Whitehouse, UNSW Kensington",
    registration_url: "https://events.humanitix.com/example",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("e5"),
    title: "Exam Season Study Sessions",
    slug: "exam-season-study-sessions",
    banner_url: img("photo-1522202176988-66273c2fd55f"),
    description:
      "Structured group study sessions across common Co-op courses, with senior scholars on hand to help. Coffee and snacks provided.",
    agenda: null,
    category: "academic",
    starts_at: "2026-11-02T23:00:00.000Z",
    ends_at: "2026-11-03T07:00:00.000Z",
    venue: "Main Library, UNSW Kensington",
    registration_url: null,
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("e6"),
    title: "End of Term Harbour Cruise",
    slug: "end-of-term-harbour-cruise",
    banner_url: img("photo-1506973035872-a4ec16b8e8d9"),
    description:
      "Celebrate the end of term with the Co-op community on Sydney Harbour. Dinner, music, and views — our most anticipated social event of the year.",
    agenda: null,
    category: "social",
    starts_at: "2026-04-17T08:00:00.000Z",
    ends_at: "2026-04-17T12:00:00.000Z",
    venue: "King Street Wharf, Darling Harbour",
    registration_url: null,
    is_published: true,
    deleted_at: null,
  },
];

export const placeholderEventImages: EventImage[] = [
  {
    ...base("ei1"),
    event_id: "e6",
    image_url: img("photo-1514933651103-005eec06c04b", 1200, 800),
    alt_text: "Scholars enjoying dinner on the harbour cruise",
    sort_order: 1,
  },
  {
    ...base("ei2"),
    event_id: "e6",
    image_url: img("photo-1533174072545-7a4b6ad7a6c3", 1200, 800),
    alt_text: "Sunset over Sydney Harbour from the cruise deck",
    sort_order: 2,
  },
];

export const placeholderSponsors: Sponsor[] = [
  {
    ...base("s1"),
    name: "Macquarie Group",
    slug: "macquarie-group",
    logo_url: null,
    description:
      "A global financial services group providing banking, advisory, and asset management services, and a long-standing employer of UNSW Co-op scholars.",
    website_url: "https://www.macquarie.com",
    industry: "Financial Services",
    partnership_info:
      "Principal sponsor supporting our flagship networking events and professional development workshops.",
    tier: "principal",
    sort_order: 1,
    is_active: true,
  },
  {
    ...base("s2"),
    name: "Atlassian",
    slug: "atlassian",
    logo_url: null,
    description:
      "An Australian software company building collaboration tools used by teams worldwide, with strong graduate and Co-op placement pathways.",
    website_url: "https://www.atlassian.com",
    industry: "Technology",
    partnership_info:
      "Major sponsor hosting site visits and technical workshops for our members.",
    tier: "major",
    sort_order: 2,
    is_active: true,
  },
  {
    ...base("s3"),
    name: "Arup",
    slug: "arup",
    logo_url: null,
    description:
      "A global firm of designers, engineers, and consultants working across the built environment, offering placements to Co-op engineering scholars.",
    website_url: "https://www.arup.com",
    industry: "Engineering & Consulting",
    partnership_info:
      "Major sponsor supporting our engineering stream events and mentoring initiatives.",
    tier: "major",
    sort_order: 3,
    is_active: true,
  },
  {
    ...base("s4"),
    name: "KPMG Australia",
    slug: "kpmg-australia",
    logo_url: null,
    description:
      "A professional services firm providing audit, tax, and advisory services, partnering with the society on career development programs.",
    website_url: "https://kpmg.com/au",
    industry: "Professional Services",
    partnership_info:
      "Supporting sponsor contributing to our resume workshops and case competitions.",
    tier: "supporting",
    sort_order: 4,
    is_active: true,
  },
];

export const placeholderNews: NewsItem[] = [
  {
    ...base("n1"),
    title: "2026 Committee Announced",
    slug: "2026-committee-announced",
    excerpt:
      "Meet the scholars leading the society this year — a team spanning commerce, engineering, and computing cohorts.",
    body: "We are excited to announce the 2026 committee. Following our AGM, six scholars were elected to lead the society this year. The new team brings experience across every Co-op stream and a shared vision: more events, deeper industry ties, and a stronger community for every scholar.",
    cover_url: img("photo-1523580494863-6f3031224c94"),
    published_at: "2026-02-10T00:00:00.000Z",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("n2"),
    title: "Record Turnout at O-Week Stall",
    slug: "record-turnout-o-week",
    excerpt:
      "Hundreds of new and returning students visited our O-Week stall to learn about the Co-op Program and society life.",
    body: "This year's O-Week was our biggest yet. Over three days, the committee met hundreds of prospective and current scholars, answered questions about the Co-op Program, and signed up a record number of new members. Thank you to everyone who stopped by — we can't wait to see you at the Welcome BBQ.",
    cover_url: img("photo-1540575467063-178a50c2df87"),
    published_at: "2026-02-20T00:00:00.000Z",
    is_published: true,
    deleted_at: null,
  },
  {
    ...base("n3"),
    title: "New Sponsor Partnerships for 2026",
    slug: "new-sponsor-partnerships-2026",
    excerpt:
      "We're welcoming new industry partners this year, expanding placement insights and networking opportunities for members.",
    body: "The society is proud to welcome new sponsor partners for 2026. These partnerships fund our free member events and connect scholars directly with graduate recruiters and alumni mentors across finance, technology, and engineering.",
    cover_url: img("photo-1556761175-5973dc0f32e7"),
    published_at: "2026-03-05T00:00:00.000Z",
    is_published: true,
    deleted_at: null,
  },
];

export const placeholderGallery: GalleryImage[] = [
  {
    ...base("g1"),
    image_url: img("photo-1523580494863-6f3031224c94", 1200, 800),
    alt_text: "Students celebrating at a society event",
    category: "events",
    width: 1200,
    height: 800,
    is_published: true,
  },
  {
    ...base("g2"),
    image_url: img("photo-1511578314322-379afb476865", 800, 1200),
    alt_text: "Networking night at the Roundhouse",
    category: "professional",
    width: 800,
    height: 1200,
    is_published: true,
  },
  {
    ...base("g3"),
    image_url: img("photo-1529156069898-49953e39b3ac", 1200, 800),
    alt_text: "Friends at the welcome BBQ on the Village Green",
    category: "social",
    width: 1200,
    height: 800,
    is_published: true,
  },
  {
    ...base("g4"),
    image_url: img("photo-1540575467063-178a50c2df87", 1200, 900),
    alt_text: "Speaker presenting at a professional workshop",
    category: "professional",
    width: 1200,
    height: 900,
    is_published: true,
  },
  {
    ...base("g5"),
    image_url: img("photo-1533174072545-7a4b6ad7a6c3", 900, 1200),
    alt_text: "Evening celebration on the harbour cruise",
    category: "social",
    width: 900,
    height: 1200,
    is_published: true,
  },
  {
    ...base("g6"),
    image_url: img("photo-1559027615-cd4628902d4a", 1200, 800),
    alt_text: "Volunteers at our charity fundraising event",
    category: "community",
    width: 1200,
    height: 800,
    is_published: true,
  },
  {
    ...base("g7"),
    image_url: img("photo-1522202176988-66273c2fd55f", 1200, 800),
    alt_text: "Scholars studying together during exam season",
    category: "events",
    width: 1200,
    height: 800,
    is_published: true,
  },
  {
    ...base("g8"),
    image_url: img("photo-1543269865-cbf427effbad", 1200, 900),
    alt_text: "Team celebrating a trivia night win",
    category: "community",
    width: 1200,
    height: 900,
    is_published: true,
  },
];

export const placeholderResources: Resource[] = [
  {
    ...base("r1"),
    title: "Co-op Scholar Resume Template",
    description:
      "A clean, recruiter-approved resume template tailored to Co-op placement applications, with annotated examples.",
    category: "resume",
    file_url: "/resources/coop-resume-template.pdf",
    external_url: null,
    is_published: true,
  },
  {
    ...base("r2"),
    title: "Behavioural Interview Question Bank",
    description:
      "Common behavioural questions asked in Co-op and graduate interviews, with STAR-method answer frameworks.",
    category: "interview",
    file_url: "/resources/interview-question-bank.pdf",
    external_url: null,
    is_published: true,
  },
  {
    ...base("r3"),
    title: "UNSW Co-op Program — Official Site",
    description:
      "The official UNSW Co-op Program page: scholarship details, eligible degrees, and application dates.",
    category: "scholarship",
    file_url: null,
    external_url: "https://www.coop.unsw.edu.au",
    is_published: true,
  },
  {
    ...base("r4"),
    title: "First Placement Survival Guide",
    description:
      "Advice from senior scholars on making the most of your first industry placement — expectations, etiquette, and growth.",
    category: "career",
    file_url: "/resources/first-placement-guide.pdf",
    external_url: null,
    is_published: true,
  },
  {
    ...base("r5"),
    title: "Scholarship Application Tips",
    description:
      "How current scholars approached the Co-op application: personal statements, interviews, and assessment days.",
    category: "scholarship",
    file_url: "/resources/scholarship-application-tips.pdf",
    external_url: null,
    is_published: true,
  },
  {
    ...base("r6"),
    title: "LinkedIn Profile Checklist",
    description:
      "A practical checklist for building a professional LinkedIn presence before recruitment season.",
    category: "career",
    file_url: "/resources/linkedin-checklist.pdf",
    external_url: null,
    is_published: true,
  },
];
