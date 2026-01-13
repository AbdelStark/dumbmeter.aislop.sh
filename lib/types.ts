export type Score = {
  value: number;
  deltaVsBaseline?: number;
  label?: string;
};

export type StatusStamp = "OK" | "SUS" | "BROKEN" | "NO_DATA";

export type TopIssue = {
  label: string;
  direction?: "up" | "down";
  severity?: "low" | "med" | "high";
};

export type Model = {
  id: string;
  slug: string;
  name: string;
  provider?: string;
  featured?: boolean;
  description?: string;
};

export type ModelCardData = {
  model: Model;
  auto: Score;
  human: Score;
  trend7d: number[];
  topIssue?: TopIssue;
  statusStamp?: StatusStamp;
};

export type Driver = {
  label: string;
  severity: "low" | "med" | "high";
  delta: number;
  hint?: string;
};

export type MetricItem = {
  key: string;
  label: string;
  value: number;
  delta?: number;
  direction: "worse" | "better";
  description?: string;
  recent?: number[];
};

export type TierSummary = {
  tier: number;
  label: string;
  score: number;
  delta?: number;
  tasks: number;
};

export type Report = {
  id: string;
  modelId: string;
  modelName: string;
  categories: string[];
  severity: number;
  description: string;
  snippet?: string;
  createdAt: string;
  confirms: number;
  denies: number;
};

export type CategoryCount = {
  label: string;
  count: number;
};

export type ModelDetailData = {
  model: Model;
  auto: Score;
  human: Score;
  trend7d: number[];
  lastUpdatedISO: string;
  drivers: Driver[];
  metrics: MetricItem[];
  tiers: TierSummary[];
  reports: Report[];
  categoryCounts: CategoryCount[];
  baselineWindowDays: number;
};

export type HomeData = {
  dateISO: string;
  overallWeirdness: { level: "Low" | "Medium" | "High"; score: number };
  featured: ModelCardData[];
  more: ModelCardData[];
  reports: Report[];
};
