import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { DumbGauge } from "@/components/viz/DumbGauge";

export default function MethodologyPage() {
  return (
    <div className="space-y-10">
      <section className="dm-card space-y-6 p-6">
        <p className="text-xs uppercase tracking-widest text-muted">Methodology</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          How Dumb Meter scores today
        </h1>
        <p className="text-base leading-7 text-muted">
          We track daily drift against each model's own rolling baseline. The goal is not to crown a
          winner, but to flag unusual dips in performance with explainable drivers.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dm-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted">Auto Index</p>
            <p className="text-lg font-extrabold">Weighted drift</p>
            <p className="text-sm text-muted">Accuracy, refusal, latency, variance, etc.</p>
          </div>
          <div className="dm-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted">Human Index</p>
            <p className="text-lg font-extrabold">Community signal</p>
            <p className="text-sm text-muted">Reports + corroborations.</p>
          </div>
          <div className="dm-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted">Cadence</p>
            <p className="text-lg font-extrabold">Daily runs</p>
            <p className="text-sm text-muted">Same suite, same baselines.</p>
          </div>
        </div>
      </section>

      <section className="dm-card space-y-6 p-6">
        <SectionHeader eyebrow="Auto index" title="What goes into the score" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Accuracy drift",
            "Reasoning robustness",
            "Instruction following",
            "Hallucination risk",
            "Refusal anomalies",
            "Latency and variance"
          ].map((item) => (
            <div key={item} className="border-[2px] border-border bg-bg p-4">
              <p className="text-sm font-extrabold">{item}</p>
              <p className="text-sm text-muted">
                Compared to a 21-day baseline, normalized to a 0-100 badness scale.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="dm-card space-y-6 p-6">
        <SectionHeader eyebrow="Human index" title="Community reporting loop" />
        <div className="flex flex-wrap gap-2">
          {[
            "Fast report",
            "Category tags",
            "Severity 1-5",
            "Confirm or deny",
            "Confidence score"
          ].map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
        <p className="text-sm text-muted">
          Reports are aggregated daily, weighted by corroboration. We do not store full prompts, and
          we warn users if personal data appears.
        </p>
      </section>

      <section className="dm-card space-y-6 p-6">
        <SectionHeader eyebrow="Visualization" title="How to read the gauge" />
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm text-muted">
              The gauge shows today's auto dumb index. Higher means the model is further above its
              own baseline. We never compare models directly for &quot;best overall.&quot;
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>0-25: Sharp</li>
              <li>26-50: Normal</li>
              <li>51-75: Sus</li>
              <li>76-100: Emergency</li>
            </ul>
          </div>
          <div className="dm-card flex items-center justify-center p-4">
            <DumbGauge value={67} deltaVsBaseline={11} label="Sample" size="md" />
          </div>
        </div>
      </section>

      <section className="dm-card space-y-6 p-6">
        <SectionHeader eyebrow="Disclaimers" title="What this is not" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Not a full benchmark suite.",
            "Not real-time monitoring.",
            "Not a leaderboard of all-time best.",
            "No sensitive logs or personal data."
          ].map((item) => (
            <div key={item} className="border-[2px] border-border bg-bg p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
