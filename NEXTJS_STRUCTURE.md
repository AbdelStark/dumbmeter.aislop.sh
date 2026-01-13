# Dumb Meter — Next.js Project Structure (App Router)

This is a recommended **file tree** for a Next.js (TypeScript) project that maps directly to the PRD and UI spec. It’s structured for maintainability: clean separation of **routes**, **components**, **data access**, and **domain logic**.

---

## 1) High-Level Folder Tree

```txt
dumb-meter/
├─ app/
│  ├─ (site)/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                      # Home dashboard
│  │  ├─ models/
│  │  │  └─ [slug]/
│  │  │     ├─ page.tsx                # Model detail page
│  │  │     └─ loading.tsx
│  │  ├─ methodology/
│  │  │  └─ page.tsx
│  │  ├─ about/
│  │  │  └─ page.tsx                   # Optional
│  │  └─ og/
│  │     └─ route.tsx                  # Dynamic OG image generation
│  ├─ api/
│  │  ├─ today/
│  │  │  └─ route.ts                   # GET today scores/cards
│  │  ├─ models/
│  │  │  └─ [id]/
│  │  │     └─ route.ts                # GET model daily details
│  │  ├─ reports/
│  │  │  ├─ route.ts                   # POST report / GET feed (optional)
│  │  │  └─ [id]/
│  │  │     └─ vote/
│  │  │        └─ route.ts             # POST confirm/deny
│  │  ├─ methodology/
│  │  │  └─ route.ts                   # GET suite version + notes
│  │  ├─ cron/
│  │  │  └─ daily-eval/
│  │  │     └─ route.ts                # POST (Vercel cron) run eval pipeline
│  │  └─ health/
│  │     └─ route.ts                   # GET
│  ├─ globals.css
│  └─ favicon.ico
├─ components/
│  ├─ shell/
│  │  ├─ AppShell.tsx
│  │  ├─ TopNav.tsx
│  │  └─ Footer.tsx
│  ├─ home/
│  │  ├─ HeroHeader.tsx
│  │  ├─ ModelGrid.tsx
│  │  └─ TodayReports.tsx
│  ├─ model/
│  │  ├─ ModelHeader.tsx
│  │  ├─ WhatChangedPanel.tsx
│  │  ├─ MetricBreakdown.tsx
│  │  ├─ TaskSuiteSummary.tsx
│  │  └─ CommunityPanel.tsx
│  ├─ reports/
│  │  ├─ ReportModal.tsx
│  │  ├─ ReportCard.tsx
│  │  └─ VoteButtons.tsx
│  ├─ viz/
│  │  ├─ DumbGauge.tsx
│  │  ├─ TrendSparkline.tsx
│  │  └─ BreakdownBars.tsx
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Chip.tsx
│  │  ├─ Input.tsx
│  │  ├─ Select.tsx
│  │  ├─ Textarea.tsx
│  │  ├─ ScorePill.tsx
│  │  ├─ StampBadge.tsx
│  │  ├─ SectionHeader.tsx
│  │  └─ Toast.tsx
│  └─ icons/
│     └─ index.ts                      # optional
├─ lib/
│  ├─ db/
│  │  ├─ prisma.ts                     # Prisma client singleton
│  │  └─ queries.ts                    # DB query functions
│  ├─ scoring/
│  │  ├─ computeAutoScore.ts           # weights + normalization
│  │  ├─ computeHumanScore.ts
│  │  └─ baselines.ts                  # rolling windows
│  ├─ eval/
│  │  ├─ runner.ts                     # orchestrates daily run
│  │  ├─ tasks.ts                      # task definitions / loader
│  │  ├─ graders/
│  │  │  ├─ jsonSchema.ts
│  │  │  ├─ unitTests.ts
│  │  │  └─ rubric.ts
│  │  └─ providers/
│  │     ├─ openai.ts
│  │     ├─ anthropic.ts
│  │     ├─ google.ts
│  │     ├─ xai.ts
│  │     └─ openrouter.ts              # optional umbrella
│  ├─ validation/
│  │  ├─ report.ts                     # zod schemas
│  │  └─ common.ts
│  ├─ security/
│  │  ├─ rateLimit.ts
│  │  └─ piiFilter.ts
│  ├─ time.ts
│  └─ types.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ public/
│  ├─ brand/
│  │  ├─ mark.svg
│  │  └─ stamp-textures/               # optional later
│  └─ og-templates/
├─ scripts/
│  ├─ seed.ts                          # seed models + tasks
│  └─ backfill.ts                      # optional
├─ tailwind.config.ts
├─ postcss.config.js
├─ next.config.js
├─ package.json
└─ README.md
```

---

## 2) Route-to-PRD Mapping

### `/` (Home Dashboard)
- PRD sections: 2, 6, 10, 12
- Components:
  - `AppShell`, `TopNav`, `HeroHeader`
  - `ModelGrid` (uses `ModelCard`, `DumbGauge` mini, `ScorePill`, `TrendSparkline`, `StampBadge`)
  - `TodayReports` (uses `ReportCard` list)
  - `ReportModal` (global)

### `/models/[slug]` (Model Detail)
- PRD sections: 6–9, 10.4, 13
- Components:
  - `ModelHeader` (big `DumbGauge`)
  - `WhatChangedPanel`
  - `MetricBreakdown` (`BreakdownBars`)
  - `TaskSuiteSummary`
  - `CommunityPanel` (`ReportModal`, `ReportCard`, `VoteButtons`)

### `/methodology`
- PRD sections: 8, 13
- Components:
  - `SectionHeader`, content blocks
  - optionally `CalloutCard` (could be a `Card` primitive wrapper)

### `/api/*`
- PRD section: 11
- `GET /api/today` → Home
- `GET /api/models/[id]` → Model detail
- `POST /api/reports` & `POST /api/reports/[id]/vote` → Community
- `GET /api/methodology` → Methodology content + suite version
- `POST /api/cron/daily-eval` → daily pipeline

---

## 3) Data Fetching Strategy (recommended)

### Home
- Use a server component to fetch `GET /api/today` (or call DB directly in server code via `lib/db/queries.ts`).
- Pass data down to client components only where needed (e.g., report modal interactions).

### Model page
- Fetch from DB in server component: `getModelDaily(modelSlug, date)`.
- Hydrate only the reporting components on the client.

---

## 4) OG Image Generation
Use `/app/(site)/og/route.tsx` (Next.js `ImageResponse`) to create:
- Today’s top “dumbest” model card
- Per-model daily card

Inputs via query params:
- `?model=claude-opus&auto=72&human=61&date=YYYY-MM-DD`

---

## 5) Configuration
- Model list and provider IDs in DB (`models` table).
- Feature flags in env:
  - `STORE_RAW_OUTPUTS=false`
  - `ENABLE_CAPTCHA=false`
  - `EVAL_RUNNER_MODE=serverless|external`

---

## 6) Minimal Implementation Milestones

1. Scaffold UI: Home + Model page with static data
2. Wire DB models + seed script
3. Implement reports API + UI
4. Implement scoring calculation
5. Implement daily cron pipeline
6. Add methodology content + OG cards
