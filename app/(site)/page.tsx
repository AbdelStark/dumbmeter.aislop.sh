import { HeroHeader } from "@/components/home/HeroHeader";
import { ModelGrid } from "@/components/home/ModelGrid";
import { TodayReports } from "@/components/home/TodayReports";
import { getHomeData } from "@/lib/mock-data";

export default function HomePage() {
  const data = getHomeData();

  return (
    <>
      <HeroHeader dateISO={data.dateISO} overallWeirdness={data.overallWeirdness} />
      <ModelGrid eyebrow="Featured" title="Models on the edge" models={data.featured} />
      <ModelGrid eyebrow="More" title="Full lineup" models={data.more} />
      <TodayReports reports={data.reports} />
    </>
  );
}
