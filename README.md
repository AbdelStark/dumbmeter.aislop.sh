# Dumb Meter

Daily LLM vibe check. Dumb Meter is a shareable dashboard that shows when popular models drift from their own baseline. It combines automated evals (Auto Dumb Index) with community reports (Human Dumb Index) to surface "today feels off" moments in a fast, memetic UI.

This repo contains a fully mocked, front-end MVP you can demo and extend. The data layer is hardcoded and intentionally easy to swap for real APIs later.

## Concept in one paragraph
Models change day to day. Users feel it but lack a consistent signal. Dumb Meter turns that intuition into a daily, explainable index per model, showing drift vs baseline and what drove it (accuracy down, latency up, refusal spikes, etc.). The interface is loud and legible, built to be screenshot and shared.

## What is in this MVP
- Home dashboard with featured and full model grids
- Model detail pages with gauge, drivers, breakdowns, task tier summary, and community reports
- Reporting flow with category tags, severity, and basic PII warning
- Neo-brutalist design system and reusable components
- Mocked data that mimics real daily signals

## Tech stack
- Next.js App Router + React
- TypeScript
- Tailwind (tokenized design system)

## Local dev
1) Install dependencies
   - `npm install`
2) Run dev server
   - `npm run dev`

The app will be available at `http://localhost:3000`.

## Where the mock data lives
- `lib/mock-data.ts` contains all models, scores, trends, and reports
- `lib/types.ts` defines the shared types for UI and data
- Replace `getHomeData()` and `getModelDetailData()` with real API calls once you have a backend

## Repo layout (high level)
- `app/(site)` contains the App Router pages
- `components/` contains UI, viz, and page-level components
- `lib/` contains mock data and helpers
- `globals.css`, `tailwind.config.ts`, and `tokens.json` define the design system
- `PRD.md`, `UI_SPEC.md`, `DESIGN_SYSTEM.md`, `NEXTJS_STRUCTURE.md` document the full spec

## What it takes to build this for real

### 1) Data pipeline and eval runner
- Define a repeatable eval suite (tasks, graders, expected outputs)
- Schedule daily runs (Vercel Cron, dedicated worker, or external pipeline)
- Store raw results and aggregates per model per day
- Compute drift vs rolling baseline (14-30 days)

### 2) Model integrations
- Provider adapters (OpenAI, Anthropic, Google, xAI, etc.)
- Consistent prompt templates and task execution
- Rate limiting and budget controls

### 2.1) Provider collaboration path
- Invite providers to run daily evals on their own infrastructure and post results to a standard API
- Start with good-faith reporting; later add verifiable computation (e.g., ZK proofs) if needed

### 3) Scoring and explainability
- Implement weighted scoring for accuracy, reasoning, instruction, refusal, latency, variance
- Capture deltas and drivers that map to UI explanations
- Log versioned methodology changes

### 4) Backend and storage
- API endpoints for today, model detail, reports, and methodology
- Database for models, runs, metrics, reports, and votes
- Optional object storage for raw eval artifacts

### 5) Community reporting and moderation
- Report submission and vote endpoints
- Rate limiting, PII filters, and basic abuse controls
- Confidence score based on sample size and corroboration

### 6) Product polish
- Authentication (optional for trust weighting)
- Public API and OG cards for sharing
- Monitoring and alerting for failed evals

## Suggested milestones
1) Replace mock data with API-backed endpoints
2) Build eval runner and daily cron
3) Add reporting backend + moderation guardrails
4) Ship share cards and a public API

## Notes
- This is a UI-first MVP meant to test interest/demand and seed a collaborative effort.
- It is easy to swap mock data for real APIs when you are ready.
