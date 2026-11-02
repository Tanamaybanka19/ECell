import type { MaterialSymbolName } from "@/components/ui/icon";
import type { BrandName } from "@/components/ui/brand-icon";

export type Hero = {
  headingLine1: string;
  headingLine2: string;
  subhead: string;
  cardTop: string;
  cardBottom: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type WhoWeAre = {
  heading: string;
  paragraphs: string[];
};

export type Flagship = {
  id: string;
  icon: MaterialSymbolName;
  name: string;
  edition: string;
  date: string;
  description: string;
};

export type Person = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

export type Department = {
  id: string;
  icon: MaterialSymbolName;
  name: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  heads: Person[];
  subheads: Person[];
  associates: Person[];
};

export type WorkforceMember = {
  name: string;
  role: string;
};

export type WorkforceGroup = {
  title: string;
  note: string;
  members: WorkforceMember[];
};

export type EventType = "Fest" | "Competition" | "Workshop" | "Talk" | "Expo";

export type PastEvent = {
  title: string;
  date: string;
  type: EventType;
  summary: string;
};

export type EventYearGroup = {
  year: string;
  events: PastEvent[];
};

export type Aftermovie = {
  id: string;
  title: string;
  year: string;
  runtime: string;
  thumbnail: string;
};

export type NewsletterIssue = {
  id: string;
  index: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

export type PodcastEpisode = {
  id: string;
  number: string;
  title: string;
  guest: string;
  guestRole: string;
  duration: string;
  date: string;
  excerpt: string;
};

export type ContactInfoBlock = {
  icon: MaterialSymbolName;
  title: string;
  line1: string;
  line2: string;
};

export type ContactPage = {
  heading: string;
  subhead: string;
  infoBlocks: ContactInfoBlock[];
  followHeading: string;
  instagramHandle: string;
};

export type SocialLinks = Record<BrandName, string> & {
  podcastFeed: string;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  email: string;
  address: string;
  socials: SocialLinks;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
};

export type SiteContent = {
  hero: Hero;
  stats: Stat[];
  whoWeAre: WhoWeAre;
  flagships: Flagship[];
  departments: Department[];
  core: Person[];
  workforce: WorkforceGroup[];
  eventsArchive: EventYearGroup[];
  aftermovies: Aftermovie[];
  newsletterIssues: NewsletterIssue[];
  podcastEpisodes: PodcastEpisode[];
  contactPage: ContactPage;
  siteConfig: SiteConfig;
  media: MediaItem[];
};

export const EVENT_TYPES: EventType[] = [
  "Fest",
  "Competition",
  "Workshop",
  "Talk",
  "Expo",
];

export const BRAND_NAMES: BrandName[] = [
  "instagram",
  "linkedin",
  "youtube",
  "x",
  "spotify",
];

export const CONTENT_TABS = [
  "home",
  "core",
  "departments",
  "workforce",
  "events",
  "editorial",
] as const;

export type ContentTab = (typeof CONTENT_TABS)[number];

export type AdminTab = "content" | "media" | "site";
