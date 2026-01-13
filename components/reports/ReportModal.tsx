"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { reportCategories } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const piiPattern =
  /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})|(\+?\d[\d\s().-]{7,}\d)/i;

type ReportModalProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  modelOptions: { id: string; name: string }[];
  preselectedModelId?: string;
};

export function ReportModal({
  open,
  onOpenChange,
  modelOptions,
  preselectedModelId
}: ReportModalProps) {
  const [modelId, setModelId] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(3);
  const [description, setDescription] = useState("");
  const [snippet, setSnippet] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setModelId(preselectedModelId ?? modelOptions[0]?.id ?? "");
    setCategories([]);
    setSeverity(3);
    setDescription("");
    setSnippet("");
    setSubmitted(false);
  }, [open, preselectedModelId, modelOptions]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const piiDetected = useMemo(
    () => piiPattern.test(`${description} ${snippet}`),
    [description, snippet]
  );

  const canSubmit =
    modelId && categories.length > 0 && description.trim().length > 12 && !piiDetected;

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-border/40"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        className="relative z-10 w-full max-w-2xl dm-card p-6 shadow-dm-hover"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">Report dumb behavior</p>
            <h2 id="report-title" className="text-2xl font-extrabold tracking-tight">
              What went weird?
            </h2>
            <p className="text-sm text-muted">
              Keep it short and redacted. No personal data.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold">
              Model
              <Select value={modelId} onChange={(event) => setModelId(event.target.value)}>
                {modelOptions.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="space-y-2 text-sm font-semibold">
              Severity
              <Select
                value={String(severity)}
                onChange={(event) => setSeverity(Number(event.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value} - {value < 3 ? "Minor" : value === 3 ? "Noticeable" : "Major"}
                  </option>
                ))}
              </Select>
            </label>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Categories</p>
            <div className="flex flex-wrap gap-2">
              {reportCategories.map((category) => (
                <Chip
                  key={category}
                  asButton
                  selected={categories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Chip>
              ))}
            </div>
          </div>

          <label className="space-y-2 text-sm font-semibold">
            What happened?
            <Textarea
              rows={3}
              placeholder="Quick description of the odd behavior..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label className="space-y-2 text-sm font-semibold">
            Optional redacted snippet
            <Textarea
              rows={2}
              placeholder="Optional, redacted prompt or response snippet"
              value={snippet}
              onChange={(event) => setSnippet(event.target.value)}
            />
          </label>

          {piiDetected ? (
            <div className="dm-card p-3 bg-warning/30 text-sm">
              Please remove emails or phone numbers before submitting.
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted">
              We store summary-only reports. Full prompts are never required.
            </p>
            <Button type="submit" variant="primary" disabled={!canSubmit || submitted}>
              {submitted ? "Submitted" : "Submit report"}
            </Button>
          </div>
          {submitted ? (
            <div className="dm-card mt-3 bg-success/30 p-3 text-sm">
              Report submitted. Thanks for the signal.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
