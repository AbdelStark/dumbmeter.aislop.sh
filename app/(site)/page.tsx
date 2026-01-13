import type { Metadata } from "next";
import { HeroHeader } from "@/components/home/HeroHeader";
import { ModelGrid } from "@/components/home/ModelGrid";
import { TodayReports } from "@/components/home/TodayReports";
import { getHomeData } from "@/lib/mock-data";
import { DEFAULT_DESCRIPTION, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Daily LLM vibe check`,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${SITE_NAME} — Daily LLM vibe check`,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Dumb Meter dashboard preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Daily LLM vibe check`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE]
  }
};

export default function HomePage() {
  const data = getHomeData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    applicationCategory: "AnalyticsApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroHeader dateISO={data.dateISO} overallWeirdness={data.overallWeirdness} />
      <ModelGrid eyebrow="Featured" title="Models on the edge" models={data.featured} />
      <ModelGrid eyebrow="More" title="Full lineup" models={data.more} />
      <TodayReports reports={data.reports} />
    </>
  );
}
