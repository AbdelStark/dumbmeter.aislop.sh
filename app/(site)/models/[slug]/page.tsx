import { notFound } from "next/navigation";
import { getModelDetailData } from "@/lib/mock-data";
import { ModelHeader } from "@/components/model/ModelHeader";
import { WhatChangedPanel } from "@/components/model/WhatChangedPanel";
import { MetricBreakdown } from "@/components/model/MetricBreakdown";
import { TaskSuiteSummary } from "@/components/model/TaskSuiteSummary";
import { CommunityPanel } from "@/components/model/CommunityPanel";

export default function ModelPage({ params }: { params: { slug: string } }) {
  const data = getModelDetailData(params.slug);
  if (!data) return notFound();

  return (
    <>
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
