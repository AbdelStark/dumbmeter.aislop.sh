# Dumb Meter — Product Requirements Document (PRD)

**Project:** Dumb Meter  
**Domain / Hosting:** `dumbmeter.aislope.sh` on Vercel  
**App:** Next.js + React (high-polish UX/UI, Neo‑Brutalist visual identity)  
**Core promise:** A daily-updating, shareable dashboard showing when popular LLMs are “acting dumb” (automatic evals) + when people *feel* they’re acting dumb (community signal).

---

## 1) Vision

People who use LLMs daily often notice “today it’s weird” moments—slower responses, weaker reasoning, more refusals, worse instruction-following, surprising hallucinations, etc. Dumb Meter turns that vibe check into a consistent, daily signal:

- **Automatic**: a daily evaluation suite runs against each model and compares performance to its own baseline.
- **Human**: the community can quickly report odd behavior and corroborate others’ reports.
- **Visible & memetic**: the UI is bold, funny, and immediately legible at a glance.

---

## 2) Goals

### Product Goals
1. **One-glance daily status** for each model (Dumb Index + trend).
2. **Fast credibility**: show what changed vs baseline, and why the score moved.
3. **Community confirmation loop**: “I’m seeing this too” with lightweight reporting + aggregation.
4. **Memorable identity**: Neo‑Brutalist design that people screenshot/share.
5. **Stable and repeatable**: same eval suite, consistent baselines, transparent methodology.

### Business / Adoption Goals
- High shareability (social cards, “today’s dumbest model”).
- Developer-friendly (clear methodology, API-ready architecture).
- Extensible (new models, new tasks, new scoring weights).

---

## 3) Non-goals (for the first version)

- Not a full benchmark platform (no huge dataset claims; keep it lightweight + daily).
- Not real-time monitoring (daily cadence first; later can go more frequent).
- Not a “leaderboard of all time best model” (focus is *daily drift & anomalies*).
- Not a place to upload sensitive chat logs (community reports should be minimal/redacted).

---

## 4) Target Users & Use Cases

### Primary Personas
- **Power users**: people using multiple LLMs every day and noticing shifts.
- **Teams**: researchers, builders, and operators who want quick “is it just me?” confirmation.
- **Curious observers**: enjoy model drama + daily status dashboards.

### Top Use Cases
1. “Is Claude/ChatGPT/Gemini acting off today?”
2. “Which model is safest to rely on today for coding?”
3. “I’m seeing refusals / laziness—anyone else?”
4. “What changed vs yesterday / last week?”
5. “Which models are consistently stable?”

---

## 5) Model Lineup

Initial showcased models (configurable list; UI supports “featured” + “more”):

- **Claude Opus 4.5**
- **ChatGPT 5.2 Pro**
- **Gemini**
- **Minimax M2** (open-source)
- **GLM 4.7** (open-source)
- **DeepSeek V3**
- **Grok (latest)**

> The app should treat model definitions as data (not hard-coded), so you can add/remove/rename without refactoring UI.

---

## 6) Core Concepts & Metrics

### 6.1 Two Scores (always visible)
1. **Auto Dumb Index (0–100)**  
   Higher = “dumber today” relative to its usual baseline.
2. **Human Dumb Index (0–100)**  
   Higher = more community-reported weirdness today.

### 6.2 Supporting Metrics (visible on drill-down)
Auto score should have a breakdown so the number isn’t mysterious:

- **Accuracy / Task success rate** (objective checks where possible)
- **Reasoning robustness** (consistency across prompt variations)
- **Instruction-following** (format compliance, constraints followed)
- **Hallucination risk** (detect confident wrong answers on known items)
- **Refusal anomaly** (unexpected refusals on safe tasks)
- **Latency** (p50/p95, time-to-first-token if available)
- **Variance** (stability across runs)

### 6.3 “Dumb Today” Labeling
A model is “Dumb Today” when its **Auto Dumb Index** is significantly above its rolling baseline.

Example detection:
- Maintain a **rolling 14–30 day baseline** per model per metric.
- Compute drift as z-score or percentile shift.
- Flag if:
  - `Auto Dumb Index >= 75` **OR**
  - drift exceeds a threshold (e.g., `z >= +1.5`) for multiple metrics.

This creates a *relative* score: not “who is best,” but “who is unusually worse today.”

---

## 7) Scoring System Design

### 7.1 Auto Dumb Index (0–100)
**Principle:** Score = weighted anomaly of multiple metrics vs that model’s own baseline.

**Suggested components**
- Task success drift (weight high)
- Hallucination drift (weight high)
- Instruction-following drift (medium-high)
- Refusal anomaly drift (medium)
- Latency drift (medium)
- Variance drift (medium)

**Normalization idea**
- For each metric `m`:
  - Compute baseline mean/median over rolling window.
  - Compute today’s value.
  - Convert to “badness” (directional: e.g., lower accuracy = worse, higher latency = worse).
  - Scale to 0–1 by percentile or capped z-score.
- Weighted sum → 0–1 → map to 0–100.

**Explainability requirement**
Every model’s page must show:
- “Auto Dumb Index moved +12 since yesterday because: Accuracy ↓, Latency ↑, Refusals ↑.”
- A breakdown chart with component contributions.

### 7.2 Human Dumb Index (0–100)
**Principle:** Aggregate community reports into a daily signal with confidence.

Inputs:
- Count of reports by category (e.g., “lazy reasoning”, “hallucination”, “refusal”, “slow”)
- Corroborations/upvotes
- Reporter trust score (later; initially just rate-limits + basic anti-spam)

Output:
- Score increases with volume + corroboration
- Score increases faster if reports cluster around the same failure mode
- Score shows a **confidence** indicator (low/med/high) based on sample size

---

## 8) Evaluation Suite

### 8.1 Requirements
- Runs **daily** on schedule.
- Covers **multiple difficulty tiers**.
- Prefer **objective grading** (unit tests, known answers, parsable outputs).
- Store raw results for audit.

### 8.2 Task Categories (example set)
**Tier 0 — Sanity / formatting**
- JSON schema compliance
- “Answer with exactly N bullets”
- Strict output constraints

**Tier 1 — Factual known answers**
- Small set of unambiguous QA (avoid current events)
- Closed-book style, fixed expected answers

**Tier 2 — Reasoning + math**
- Deterministic math problems
- Logic puzzles with known solutions

**Tier 3 — Coding**
- Small functions with unit tests
- Bug-fix tasks with expected diff or test pass

**Tier 4 — Instruction-following under pressure**
- Conflicting constraints resolution
- Long prompt with multiple requirements

---

## 9) Community Reporting

### 9.1 Reporting UX (MVP)
A single **“Report dumb behavior”** button on the homepage and each model card.

Form fields:
- Model (preselected if from model page)
- Category (multi-select)
- Severity (1–5)
- Short description
- Optional: redacted prompt snippet (warn: no personal data)

### 9.2 Corroboration UX
- Each report can be “Confirmed ✅” or “Can’t reproduce ❌”
- Aggregate on model page: top categories today + report trend

### 9.3 Abuse / Spam Controls (MVP)
- Rate limit by IP + browser fingerprint (lightweight)
- CAPTCHA only if abuse spikes
- Basic content moderation rules (PII filters)

---

## 10) UX/UI & Visual Identity (Neo‑Brutalist)

### 10.1 Design DNA
- Thick borders, hard shadows, high contrast
- Loud accent colors on a mostly neutral base
- Big typography, playful microcopy
- “Instrument panel” vibe: gauges, tick marks, warning labels

### 10.2 “Dumb Level” Visualization
Primary visualization: **a bold speedometer gauge** per model.

- Scale: **0 → 100**
- Zones: Sharp / Normal / Sus / Smooth-brain emergency
- Needle + big numeric readout
- Annotation: “vs baseline: +X”

Secondary visualization: **a daily trend sparkline** (last 7 days) embedded in each model card.

---

## 11) Technical Architecture

**Frontend:** Next.js App Router  
**Backend:** Next.js Route Handlers (API), Vercel Cron for daily pipeline  
**DB:** Postgres + Prisma  
**Storage:** optional object storage for raw eval artifacts

Key endpoints:
- `GET /api/today`
- `GET /api/models/[id]?date=YYYY-MM-DD`
- `POST /api/reports`
- `POST /api/reports/[id]/vote`
- `GET /api/methodology`
- `POST /api/cron/daily-eval`

---

## 12) Launch Scope

### MVP (ship first)
- Homepage dashboard (today’s scores)
- Model detail pages
- Daily eval pipeline + baseline drift
- Community reporting + corroboration
- Methodology page

### Next
- Auth (Twitter/X later)
- Public API
- More frequent runs

---

## 13) Success Metrics

- Daily returning users
- Reports submitted per day
- Eval pipeline reliability
- Explainability coverage (“why” surfaced)
- Low spam/abuse rate

---

## 14) Brand Starter Kit

**Name:** Dumb Meter  
**Tagline ideas**
- “Daily LLM Vibe Check.”
- “Are they dumb today?”

**Tone**
- Funny, sharp, not mean-spirited.
- Always pairs humor with transparency.
