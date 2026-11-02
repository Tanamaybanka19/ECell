import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://ecell-sxcm.netlify.app";

/**
 * Canonical origin for the site, used by metadataBase, canonicals, the sitemap
 * and robots. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override; inlined at build time so the
 *      server and client bundles always agree.
 *   2. URL — injected by Netlify at build and runtime; holds the site's primary
 *      address, including a custom domain once one is attached.
 *   3. The deployed Netlify origin, so local builds and non-Netlify hosts
 *      still emit production-correct SEO tags.
 * Trailing slashes are stripped so `${SITE_URL}/path` cannot double up.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.URL,
    FALLBACK_SITE_URL,
  ];
  const value =
    candidates.find(
      (candidate): candidate is string =>
        typeof candidate === "string" && candidate.trim().length > 0,
    ) ?? FALLBACK_SITE_URL;
  return value.trim().replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

export const siteConfig = {
  name: "E-Cell SXCM",
  fullName: "Entrepreneurship Cell, St. Xavier's College Mumbai",
  description:
    "The student-run Entrepreneurship Cell of St. Xavier's College (Mumbai). We help students turn campus curiosity into ventures through events, podcasts, newsletters and a hands-on workforce.",
  url: SITE_URL,
  ogImage: "/og-image.png",
  creator: "@ecell_sxm",
  email: "ecell.sxm@gmail.com",
  address: "St. Xavier's College, 5 Mahapalika Marg, Mumbai 400001",
  socials: {
    instagram: "https://www.instagram.com/ecell_sxm",
    linkedin: "https://www.linkedin.com/company/ecell-sxm",
    youtube: "https://www.youtube.com/@ecellsxm",
    x: "https://x.com/ecell_sxm",
    spotify: "https://open.spotify.com/show/ecellsxm",
    podcastFeed: "https://podcasts.apple.com/ecellsxm",
  },
  authors: [
    {
      name: "E-Cell SXCM",
      url: SITE_URL,
    },
  ],
  keywords: [
    "E-Cell",
    "Entrepreneurship Cell",
    "St. Xavier's College Mumbai",
    "startups",
    "E-Summit",
    "student entrepreneurship",
    "Mumbai",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.fullName,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
