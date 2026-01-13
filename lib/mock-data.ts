import type {
  CategoryCount,
  Driver,
  HomeData,
  MetricItem,
  Model,
  ModelCardData,
  ModelDetailData,
  Report,
  TierSummary,
  TopIssue
} from "@/lib/types";
import { getStampForScore } from "@/lib/utils";

const now = Date.now();
const hoursAgo = (hours: number) => new Date(now - hours * 60 * 60 * 1000).toISOString();

export const reportCategories = [
  "Hallucination",
  "Refusal",
  "Latency",
  "Instruction",
  "Reasoning",
  "Format",
  "Safety",
  "Tone"
];

export const models: Model[] = [
  {
    id: "claude-opus-45",
    slug: "claude-opus-45",
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    featured: true
  },
  {
    id: "chatgpt-5-2-pro",
    slug: "chatgpt-5-2-pro",
    name: "ChatGPT 5.2 Pro",
    provider: "OpenAI",
    featured: true
  },
  {
    id: "gemini",
    slug: "gemini",
    name: "Gemini",
    provider: "Google",
    featured: true
  },
  {
    id: "minimax-m2",
    slug: "minimax-m2",
    name: "Minimax M2",
    provider: "Open Source"
  },
  {
    id: "glm-4-7",
    slug: "glm-4-7",
    name: "GLM 4.7",
    provider: "Open Source"
  },
  {
    id: "deepseek-v3",
    slug: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek"
  },
  {
    id: "grok-latest",
    slug: "grok-latest",
    name: "Grok (latest)",
    provider: "xAI"
  }
];

const cardStatsById: Record<
  string,
  { auto: number; autoDelta: number; human: number; humanDelta: number; trend7d: number[]; topIssue: TopIssue }
> = {
  "claude-opus-45": {
    auto: 72,
    autoDelta: 12,
    human: 63,
    humanDelta: 8,
    trend7d: [61, 58, 63, 69, 74, 71, 72],
    topIssue: { label: "Refusals up", direction: "up", severity: "high" }
  },
  "chatgpt-5-2-pro": {
    auto: 48,
    autoDelta: 3,
    human: 35,
    humanDelta: -2,
    trend7d: [42, 45, 44, 46, 47, 45, 48],
    topIssue: { label: "Latency up", direction: "up", severity: "med" }
  },
  gemini: {
    auto: 83,
    autoDelta: 20,
    human: 70,
    humanDelta: 16,
    trend7d: [65, 69, 73, 78, 82, 84, 83],
    topIssue: { label: "Hallucinations up", direction: "up", severity: "high" }
  },
  "minimax-m2": {
    auto: 54,
    autoDelta: 5,
    human: 22,
    humanDelta: -1,
    trend7d: [40, 44, 46, 50, 52, 55, 54],
    topIssue: { label: "Instruction slips", direction: "up", severity: "med" }
  },
  "glm-4-7": {
    auto: 31,
    autoDelta: -4,
    human: 28,
    humanDelta: 0,
    trend7d: [38, 35, 33, 30, 29, 30, 31],
    topIssue: { label: "Format jitter", direction: "up", severity: "low" }
  },
  "deepseek-v3": {
    auto: 59,
    autoDelta: 9,
    human: 41,
    humanDelta: 6,
    trend7d: [47, 50, 55, 53, 58, 60, 59],
    topIssue: { label: "Reasoning drift", direction: "up", severity: "med" }
  },
  "grok-latest": {
    auto: 67,
    autoDelta: 11,
    human: 57,
    humanDelta: 10,
    trend7d: [52, 55, 60, 62, 66, 69, 67],
    topIssue: { label: "Refusal spikes", direction: "up", severity: "high" }
  }
};

const driversById: Record<string, Driver[]> = {
  "claude-opus-45": [
    { label: "Accuracy down", severity: "high", delta: 9, hint: "Tier 2 math drift" },
    { label: "Refusal anomaly", severity: "high", delta: 7, hint: "Safe tasks refused" },
    { label: "Latency up", severity: "med", delta: 5, hint: "p95 jumped" },
    { label: "Variance up", severity: "med", delta: 4, hint: "Inconsistent reruns" }
  ],
  "chatgpt-5-2-pro": [
    { label: "Latency up", severity: "med", delta: 4, hint: "TTFT slower" },
    { label: "Instruction slips", severity: "low", delta: 2, hint: "Format misses" },
    { label: "Accuracy steady", severity: "low", delta: -1, hint: "No major drift" }
  ],
  gemini: [
    { label: "Hallucination risk", severity: "high", delta: 11, hint: "Tier 1 QA" },
    { label: "Reasoning drift", severity: "high", delta: 9, hint: "Logic tasks" },
    { label: "Refusal spikes", severity: "med", delta: 6, hint: "Over-cautious" },
    { label: "Variance up", severity: "med", delta: 5, hint: "Wide spread" }
  ],
  "minimax-m2": [
    { label: "Instruction drift", severity: "med", delta: 6, hint: "JSON compliance" },
    { label: "Latency up", severity: "med", delta: 4, hint: "p95 higher" },
    { label: "Accuracy steady", severity: "low", delta: 1, hint: "Flat baseline" }
  ],
  "glm-4-7": [
    { label: "Format jitter", severity: "low", delta: 3, hint: "Extra tokens" },
    { label: "Latency better", severity: "low", delta: -2, hint: "Faster today" },
    { label: "Accuracy steady", severity: "low", delta: 0, hint: "Stable" }
  ],
  "deepseek-v3": [
    { label: "Reasoning drift", severity: "med", delta: 7, hint: "Tier 3 coding" },
    { label: "Hallucination risk", severity: "med", delta: 5, hint: "Known answers" },
    { label: "Variance up", severity: "med", delta: 4, hint: "More spread" }
  ],
  "grok-latest": [
    { label: "Refusal spikes", severity: "high", delta: 8, hint: "Safety overshoot" },
    { label: "Instruction slips", severity: "med", delta: 5, hint: "Constraint misses" },
    { label: "Latency up", severity: "med", delta: 4, hint: "TTFT slower" }
  ]
};

const metricsById: Record<string, MetricItem[]> = {
  "claude-opus-45": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 62,
      delta: 9,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 58,
      delta: 7,
      direction: "worse",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 54,
      delta: 6,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 66,
      delta: 8,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 71,
      delta: 10,
      direction: "worse",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 57,
      delta: 5,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 52,
      delta: 4,
      direction: "worse",
      description: "Run-to-run stability."
    }
  ],
  "chatgpt-5-2-pro": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 38,
      delta: 1,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 34,
      delta: 0,
      direction: "better",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 31,
      delta: 2,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 40,
      delta: 1,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 29,
      delta: -1,
      direction: "better",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 44,
      delta: 4,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 28,
      delta: -2,
      direction: "better",
      description: "Run-to-run stability."
    }
  ],
  gemini: [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 78,
      delta: 13,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 74,
      delta: 11,
      direction: "worse",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 69,
      delta: 8,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 82,
      delta: 14,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 63,
      delta: 7,
      direction: "worse",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 58,
      delta: 5,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 70,
      delta: 9,
      direction: "worse",
      description: "Run-to-run stability."
    }
  ],
  "minimax-m2": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 46,
      delta: 4,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 42,
      delta: 3,
      direction: "worse",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 55,
      delta: 7,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 39,
      delta: 2,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 33,
      delta: 1,
      direction: "worse",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 50,
      delta: 5,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 44,
      delta: 3,
      direction: "worse",
      description: "Run-to-run stability."
    }
  ],
  "glm-4-7": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 28,
      delta: -2,
      direction: "better",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 26,
      delta: -1,
      direction: "better",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 31,
      delta: 1,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 22,
      delta: -2,
      direction: "better",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 18,
      delta: -3,
      direction: "better",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 27,
      delta: -2,
      direction: "better",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 24,
      delta: -1,
      direction: "better",
      description: "Run-to-run stability."
    }
  ],
  "deepseek-v3": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 56,
      delta: 6,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 61,
      delta: 7,
      direction: "worse",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 48,
      delta: 4,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 52,
      delta: 5,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 39,
      delta: 3,
      direction: "worse",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 46,
      delta: 4,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 50,
      delta: 5,
      direction: "worse",
      description: "Run-to-run stability."
    }
  ],
  "grok-latest": [
    {
      key: "accuracy",
      label: "Accuracy",
      value: 63,
      delta: 8,
      direction: "worse",
      description: "Objective tasks solved correctly."
    },
    {
      key: "reasoning",
      label: "Reasoning robustness",
      value: 58,
      delta: 6,
      direction: "worse",
      description: "Consistency across prompt variations."
    },
    {
      key: "instruction",
      label: "Instruction following",
      value: 60,
      delta: 7,
      direction: "worse",
      description: "Format and constraint compliance."
    },
    {
      key: "hallucination",
      label: "Hallucination risk",
      value: 61,
      delta: 6,
      direction: "worse",
      description: "Confident wrong answers on known items."
    },
    {
      key: "refusal",
      label: "Refusal anomaly",
      value: 69,
      delta: 9,
      direction: "worse",
      description: "Unexpected refusals on safe prompts."
    },
    {
      key: "latency",
      label: "Latency",
      value: 55,
      delta: 5,
      direction: "worse",
      description: "p50/p95 response time drift."
    },
    {
      key: "variance",
      label: "Variance",
      value: 53,
      delta: 4,
      direction: "worse",
      description: "Run-to-run stability."
    }
  ]
};

const tiersById: Record<string, TierSummary[]> = {
  "claude-opus-45": [
    { tier: 0, label: "Sanity checks", score: 62, delta: -4, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 58, delta: -6, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 51, delta: -9, tasks: 18 },
    { tier: 3, label: "Coding", score: 55, delta: -7, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 49, delta: -8, tasks: 10 }
  ],
  "chatgpt-5-2-pro": [
    { tier: 0, label: "Sanity checks", score: 78, delta: 1, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 73, delta: -1, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 69, delta: -2, tasks: 18 },
    { tier: 3, label: "Coding", score: 71, delta: 0, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 66, delta: -1, tasks: 10 }
  ],
  gemini: [
    { tier: 0, label: "Sanity checks", score: 58, delta: -7, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 52, delta: -9, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 47, delta: -11, tasks: 18 },
    { tier: 3, label: "Coding", score: 49, delta: -10, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 41, delta: -12, tasks: 10 }
  ],
  "minimax-m2": [
    { tier: 0, label: "Sanity checks", score: 66, delta: -4, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 63, delta: -3, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 60, delta: -5, tasks: 18 },
    { tier: 3, label: "Coding", score: 58, delta: -4, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 55, delta: -6, tasks: 10 }
  ],
  "glm-4-7": [
    { tier: 0, label: "Sanity checks", score: 82, delta: 2, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 78, delta: 1, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 74, delta: 0, tasks: 18 },
    { tier: 3, label: "Coding", score: 70, delta: -1, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 76, delta: 1, tasks: 10 }
  ],
  "deepseek-v3": [
    { tier: 0, label: "Sanity checks", score: 68, delta: -3, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 62, delta: -5, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 57, delta: -7, tasks: 18 },
    { tier: 3, label: "Coding", score: 54, delta: -6, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 52, delta: -6, tasks: 10 }
  ],
  "grok-latest": [
    { tier: 0, label: "Sanity checks", score: 60, delta: -5, tasks: 12 },
    { tier: 1, label: "Factual QA", score: 56, delta: -6, tasks: 20 },
    { tier: 2, label: "Reasoning + math", score: 53, delta: -7, tasks: 18 },
    { tier: 3, label: "Coding", score: 51, delta: -8, tasks: 12 },
    { tier: 4, label: "Instruction stress", score: 47, delta: -9, tasks: 10 }
  ]
};

const categoryCountsById: Record<string, CategoryCount[]> = {
  "claude-opus-45": [
    { label: "Refusal", count: 12 },
    { label: "Latency", count: 8 },
    { label: "Instruction", count: 6 },
    { label: "Hallucination", count: 5 },
    { label: "Reasoning", count: 4 }
  ],
  "chatgpt-5-2-pro": [
    { label: "Latency", count: 7 },
    { label: "Instruction", count: 5 },
    { label: "Reasoning", count: 3 },
    { label: "Hallucination", count: 2 },
    { label: "Refusal", count: 2 }
  ],
  gemini: [
    { label: "Hallucination", count: 14 },
    { label: "Reasoning", count: 10 },
    { label: "Refusal", count: 7 },
    { label: "Instruction", count: 6 },
    { label: "Latency", count: 5 }
  ],
  "minimax-m2": [
    { label: "Instruction", count: 6 },
    { label: "Latency", count: 5 },
    { label: "Format", count: 4 },
    { label: "Reasoning", count: 3 },
    { label: "Hallucination", count: 2 }
  ],
  "glm-4-7": [
    { label: "Format", count: 4 },
    { label: "Latency", count: 3 },
    { label: "Instruction", count: 2 },
    { label: "Reasoning", count: 2 },
    { label: "Hallucination", count: 1 }
  ],
  "deepseek-v3": [
    { label: "Reasoning", count: 8 },
    { label: "Hallucination", count: 6 },
    { label: "Instruction", count: 4 },
    { label: "Latency", count: 4 },
    { label: "Refusal", count: 3 }
  ],
  "grok-latest": [
    { label: "Refusal", count: 11 },
    { label: "Tone", count: 7 },
    { label: "Instruction", count: 5 },
    { label: "Latency", count: 4 },
    { label: "Reasoning", count: 4 }
  ]
};

const reports: Report[] = [
  {
    id: "r1",
    modelId: "claude-opus-45",
    modelName: "Claude Opus 4.5",
    categories: ["Refusal", "Instruction"],
    severity: 4,
    description: "Refused a safe request to summarize a public article.",
    snippet: "Asked for a neutral summary and got a safety refusal.",
    createdAt: hoursAgo(2),
    confirms: 18,
    denies: 2
  },
  {
    id: "r2",
    modelId: "gemini",
    modelName: "Gemini",
    categories: ["Hallucination", "Reasoning"],
    severity: 5,
    description: "Confidently gave wrong steps in a deterministic math task.",
    snippet: "Got 2+2=5 with long reasoning.",
    createdAt: hoursAgo(4),
    confirms: 22,
    denies: 3
  },
  {
    id: "r3",
    modelId: "chatgpt-5-2-pro",
    modelName: "ChatGPT 5.2 Pro",
    categories: ["Latency"],
    severity: 3,
    description: "p95 latency jumped to ~14s for short prompts.",
    snippet: "Short prompts felt sluggish in the last hour.",
    createdAt: hoursAgo(1),
    confirms: 9,
    denies: 1
  },
  {
    id: "r4",
    modelId: "deepseek-v3",
    modelName: "DeepSeek V3",
    categories: ["Reasoning"],
    severity: 4,
    description: "Struggled with a simple algorithm refactor that it usually passes.",
    snippet: "Failed a known unit test case.",
    createdAt: hoursAgo(3),
    confirms: 12,
    denies: 2
  },
  {
    id: "r5",
    modelId: "grok-latest",
    modelName: "Grok (latest)",
    categories: ["Refusal", "Tone"],
    severity: 4,
    description: "Over-refused a benign request and got snarky.",
    snippet: "Normal request flagged as unsafe.",
    createdAt: hoursAgo(6),
    confirms: 14,
    denies: 4
  },
  {
    id: "r6",
    modelId: "glm-4-7",
    modelName: "GLM 4.7",
    categories: ["Format"],
    severity: 2,
    description: "Ignored the JSON-only requirement twice in a row.",
    snippet: "Added commentary outside JSON.",
    createdAt: hoursAgo(5),
    confirms: 5,
    denies: 1
  },
  {
    id: "r7",
    modelId: "minimax-m2",
    modelName: "Minimax M2",
    categories: ["Instruction", "Latency"],
    severity: 3,
    description: "Missed a formatting constraint and slowed down.",
    snippet: "Returned extra fields and took 9s.",
    createdAt: hoursAgo(7),
    confirms: 6,
    denies: 1
  }
];

export function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export function getModelOptions() {
  return models.map((model) => ({ id: model.id, name: model.name }));
}

export function getHomeData(): HomeData {
  const featuredModels = models.filter((model) => model.featured);
  const moreModels = models.filter((model) => !model.featured);

  const toCardData = (model: Model): ModelCardData => {
    const stats = cardStatsById[model.id];
    return {
      model,
      auto: { value: stats.auto, deltaVsBaseline: stats.autoDelta },
      human: { value: stats.human, deltaVsBaseline: stats.humanDelta },
      trend7d: stats.trend7d,
      topIssue: stats.topIssue,
      statusStamp: getStampForScore(stats.auto)
    };
  };

  const featured = featuredModels.map(toCardData);
  const more = moreModels.map(toCardData);
  const autoAverage = Math.round(
    [...featured, ...more].reduce((sum, card) => sum + card.auto.value, 0) /
      (featured.length + more.length)
  );

  const overallWeirdness = {
    score: autoAverage,
    level: autoAverage >= 70 ? "High" : autoAverage >= 45 ? "Medium" : "Low"
  } as const;

  return {
    dateISO: getTodayISO(),
    overallWeirdness,
    featured,
    more,
    reports: reports.slice(0, 5)
  };
}

export function getModelDetailData(slug: string): ModelDetailData | null {
  const model = models.find((item) => item.slug === slug);
  if (!model) return null;
  const stats = cardStatsById[model.id];
  const lastUpdatedISO = new Date(now - 90 * 60 * 1000).toISOString();

  return {
    model,
    auto: { value: stats.auto, deltaVsBaseline: stats.autoDelta },
    human: { value: stats.human, deltaVsBaseline: stats.humanDelta },
    trend7d: stats.trend7d,
    lastUpdatedISO,
    drivers: driversById[model.id] ?? [],
    metrics: metricsById[model.id] ?? [],
    tiers: tiersById[model.id] ?? [],
    reports: reports.filter((report) => report.modelId === model.id),
    categoryCounts: categoryCountsById[model.id] ?? [],
    baselineWindowDays: 21
  };
}
