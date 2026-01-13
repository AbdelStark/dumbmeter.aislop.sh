import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelDetailData } from "@/lib/mock-data";
import { ModelHeader } from "@/components/model/ModelHeader";
import { WhatChangedPanel } from "@/components/model/WhatChangedPanel";
import { MetricBreakdown } from "@/components/model/MetricBreakdown";
import { TaskSuiteSummary } from "@/components/model/TaskSuiteSummary";
import { CommunityPanel } from "@/components/model/CommunityPanel";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

type PageParams = { params: { slug: string } };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const data = getModelDetailData(params.slug);
  if (!data) {
    return {
      title: "Model not found",
      robots: { index: false, follow: false }
    };
  }

  const title = `${data.model.name} Dumb Index`;
  const description = `Daily drift snapshot for ${data.model.name}, compared to its own baseline.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/models/${data.model.slug}`
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `/models/${data.model.slug}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${data.model.name} Dumb Meter preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [OG_IMAGE]
    }
  };
}

export default function ModelPage({ params }: PageParams) {
  const data = getModelDetailData(params.slug);
  if (!data) return notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${data.model.name} Dumb Index`,
      description: `Daily drift snapshot for ${data.model.name}, compared to its own baseline.`,
      url: `${SITE_URL}/models/${data.model.slug}`,
      about: SITE_NAME
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: data.model.name,
          item: `${SITE_URL}/models/${data.model.slug}`
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ModelHeader
        model={data.model}
        auto={data.auto}
        human={data.human}
        lastUpdatedISO={data.lastUpdatedISO}
        trend7d={data.trend7d}
      />
      <WhatChangedPanel drivers={data.drivers} />
      <MetricBreakdown items={data.metrics} baselineWindowDays={data.baselineWindowDays} />
      <TaskSuiteSummary tiers={data.tiers} />
      <CommunityPanel
        modelId={data.model.id}
        categoryCounts={data.categoryCounts}
        reports={data.reports}
      />
    </>
  );
}
