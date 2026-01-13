import type { ModelCardData } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ModelCard } from "@/components/home/ModelCard";

export function ModelGrid({
  eyebrow,
  title,
  models
}: {
  eyebrow: string;
  title: string;
  models: ModelCardData[];
}) {
  return (
    <section className="space-y-6">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <ModelCard key={model.model.id} data={model} />
        ))}
      </div>
    </section>
  );
}
