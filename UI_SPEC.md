# Dumb Meter — Component-Level UI Spec

This document defines the UI system at a **component** and **interaction** level (what exists, how it looks, how it behaves, how it responds, and what props/state it needs). It is intended to be implemented in **Next.js (App Router) + Tailwind** with a Neo‑Brutalist design language.

---

## 0) Global UI Principles

### 0.1 Neo‑Brutalist Rules (must-haves)
- **Borders are structural**: default card border is thick; thin borders are reserved for subtle separators.
- **Shadows are hard**: crisp offset shadows (no blur) are the “brand glue.”
- **Type is loud**: big headings; small text only for metadata.
- **Color is purposeful**: neutrals dominate; accents are reserved for scores, warnings, and calls-to-action.
- **Data should be legible at a glance**: every card answers: *what’s the score? what changed? should I worry?*

### 0.2 Interaction Rules
- Hover effects are **minimal but punchy**: translate by 1–2px; shadow swaps direction or increases offset.
- Buttons have **obvious states**: default, hover, active, disabled, loading.
- Prefer **disclosure** over navigation**: open panels/drawers for “why” instead of leaving the page.

### 0.3 Accessibility Baseline
- Every chart must have an **accessible text summary**.
- All interactive controls are keyboard accessible with visible focus rings.
- Provide reduced-motion support (`prefers-reduced-motion`).

---

## 1) Layout System

### 1.1 App Shell
**Component:** `AppShell`  
Wraps all pages with consistent frame.

**Structure**
- Top navigation (`TopNav`)
- Main content container (`<main>`)
- Footer (`Footer`)

**Layout constraints**
- Max content width: `max-w-[1200px]`
- Standard horizontal padding: `px-4 sm:px-6 lg:px-8`
- Standard vertical rhythm: sections separated by `space-y-8` or `py-10` blocks.

### 1.2 Grid Rules
- Model cards on home:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- Use consistent gutters: `gap-4 sm:gap-6`

### 1.3 Spacing Scale
Use a 4px base scale in Tailwind (default). Design system details are in `DESIGN_SYSTEM.md`, but in practice:
- Micro spacing: `1, 2, 3`
- Default: `4, 6`
- Section: `8, 10, 12`

---

## 2) Typography Scale (semantic)

All typography should use semantic utility classes via component wrappers. Sizes are expressed as Tailwind defaults; the design system defines fonts and tracking.

### 2.1 Type Tokens
- `Display` (hero): `text-5xl sm:text-6xl font-black tracking-tight`
- `H1`: `text-4xl sm:text-5xl font-black tracking-tight`
- `H2`: `text-2xl sm:text-3xl font-extrabold tracking-tight`
- `H3`: `text-xl font-extrabold`
- `Body`: `text-base leading-7`
- `Small`: `text-sm leading-6`
- `Micro`: `text-xs leading-5 uppercase tracking-widest`

### 2.2 Type Rules
- Headings are **uppercase only when used as labels** (chips, section tags), not for long titles.
- Numeric readouts (scores) use a **tabular/mono** font for alignment.

---

## 3) Core Components

### 3.1 `TopNav`
**Purpose:** Global navigation + date context + primary CTA.

**Contains**
- Brand mark (text + optional icon)
- Current date (“TODAY: YYYY-MM-DD”)
- Links: About, Methodology, API (later)
- Primary CTA: `Report dumb behavior`

**Props**
- `dateISO: string`
- `onReportClick?: () => void` (optional for opening modal)

**States**
- Normal
- Compact (mobile)
- Sticky (optional)

**A11y**
- Use `<nav aria-label="Primary">`
- CTA is a `<button>` or `<a>` with clear label

---

### 3.2 `HeroHeader`
**Purpose:** Big identity moment + “one sentence” explanation.

**Contains**
- Title “DUMB METER”
- Tagline
- Short explainer
- Optional “overall weirdness” meter (site-wide)

**Props**
- `dateISO: string`
- `overallWeirdness?: { level: "Low"|"Medium"|"High"; score: number }`

---

### 3.3 `SectionHeader`
Reusable header for sections.

**Props**
- `eyebrow?: string` (Micro label)
- `title: string`
- `rightSlot?: ReactNode` (filters, buttons)

---

### 3.4 `ModelCard`
**Purpose:** At-a-glance model status on the home page grid.

**Contains**
- Model name + provider badge
- Auto score pill + Human score pill
- Mini gauge (or simplified meter)
- 7‑day sparkline
- “Top issue” label (“Latency ↑”, “Refusals ↑”)
- Stamp overlay (OK / SUS / BROKEN)

**Props**
```ts
type Score = { value: number; deltaVsBaseline?: number; label?: string };
type ModelCardProps = {
  model: { id: string; slug: string; name: string; provider?: string; featured?: boolean };
  auto: Score;
  human: Score;
  trend7d: number[]; // length 7, 0–100
  topIssue?: { label: string; direction?: "up"|"down"; severity?: "low"|"med"|"high" };
  statusStamp?: "OK"|"SUS"|"BROKEN"|"NO_DATA";
};
```

**Interactions**
- Whole card is clickable (link to `/models/[slug]`)
- Hover: card “lifts” (translate -1px), shadow increases, border thickens (subtle)
- Keyboard: focus ring on card link

**Responsive**
- On small screens: gauge and sparkline stack under name

---

### 3.5 `ScorePill`
**Purpose:** A loud, glanceable score label (Auto / Human).

**Variants**
- `AUTO` pill
- `HUMAN` pill

**Props**
```ts
type ScorePillProps = {
  kind: "AUTO" | "HUMAN";
  value: number;          // 0–100
  delta?: number;         // positive = worse (for Auto); configurable
  size?: "sm"|"md";
};
```

**Behavior**
- Color mapping by zone:
  - 0–25 Sharp
  - 26–50 Normal
  - 51–75 Sus
  - 76–100 Emergency
- If `delta` exists: show `+12` or `-3` in small chip

**A11y**
- `aria-label="Auto score 72, up 12 vs baseline"`

---

### 3.6 `StampBadge`
**Purpose:** Rubber-stamp overlay that communicates a vibe instantly.

**Props**
- `stamp: "OK"|"SUS"|"BROKEN"|"NO_DATA"`
- `size?: "sm"|"md"|"lg"`

**Rendering**
- Rotated by a small angle (deterministic, not random)
- Thick border, uppercase, slightly imperfect effect (CSS jitter optional later)

---

### 3.7 `DumbGauge`
**Purpose:** The signature visualization for “dumb level.”

**Type**
- SVG arc gauge with needle + segmented zones
- Full-size on model page; mini version on cards

**Props**
```ts
type DumbGaugeProps = {
  value: number; // 0–100
  deltaVsBaseline?: number;
  label?: string; // optional, e.g., "AUTO"
  size?: "mini"|"md"|"lg";
  showZones?: boolean; // defaults true
  showNeedle?: boolean; // defaults true
  stamp?: "OK"|"SUS"|"BROKEN"|"NO_DATA";
};
```

**Zones**
- 0–25: Sharp
- 26–50: Normal
- 51–75: Sus
- 76–100: Emergency

**Behavior**
- Needle animates on first render **unless reduced motion**.
- On hover/focus: show a tooltip:
  - “Auto Dumb Index 72 (Sus). +12 vs baseline.”
- Optional small tick labels: 0 / 25 / 50 / 75 / 100

**A11y**
- Provide an offscreen summary:
  - `<span className="sr-only">Auto Dumb Index: 72 (Sus), twelve points worse than baseline.</span>`
- Ensure sufficient contrast of segment fills.

---

### 3.8 `TrendSparkline`
**Purpose:** 7-day micro-trend visualization embedded in cards and pages.

**Type**
- Minimal SVG polyline or bar sparkline.

**Props**
```ts
type TrendSparklineProps = {
  values: number[]; // normalized 0–100
  ariaLabel: string;
  height?: number;
};
```

**Rules**
- No chart junk; no axis by default.
- On hover: show last value + direction arrow.

---

## 4) Model Detail Page Components

### 4.1 `ModelHeader`
**Contains**
- Model name, provider, last run timestamp
- Two big score blocks (Auto + Human)
- Primary gauge

**Props**
- `model`
- `auto`, `human`
- `lastUpdatedISO`

---

### 4.2 `WhatChangedPanel`
**Purpose:** “Why did it move?” narrative summary.

**Content**
- 3–5 bullet “drivers” (e.g. Accuracy ↓, Latency ↑)
- Each bullet links to the relevant section below

**Props**
```ts
type Driver = { label: string; severity: "low"|"med"|"high"; delta: number; hint?: string };
type WhatChangedPanelProps = { drivers: Driver[] };
```

---

### 4.3 `MetricBreakdown`
**Purpose:** Bar breakdown of the Auto score components.

**Props**
```ts
type MetricItem = { key: string; label: string; value: number; delta?: number; direction: "worse"|"better" };
type MetricBreakdownProps = {
  items: MetricItem[];
  baselineWindowDays: number;
};
```

**Behavior**
- Each row is clickable to show “definition” + recent values (accordion)

---

### 4.4 `TaskSuiteSummary`
**Purpose:** Summarize eval results by tier/category.

**Props**
```ts
type TierSummary = { tier: number; label: string; score: number; delta?: number; tasks: number };
type TaskSuiteSummaryProps = { tiers: TierSummary[] };
```

**MVP display**
- Stacked rows per tier: score + number of tasks + delta

---

### 4.5 `CommunityPanel`
**Purpose:** Reports + corroboration + top categories.

**Contains**
- “Report dumb behavior” button (preselected model)
- Category histogram (today)
- Report feed list
- Confirm / Can’t reproduce controls

---

## 5) Reporting Components (MVP)

### 5.1 `ReportModal`
**Purpose:** Quick, safe report submission.

**Props**
```ts
type ReportModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  modelOptions: { id: string; name: string }[];
  preselectedModelId?: string;
};
```

**Fields**
- Model (select)
- Categories (multi-select chips)
- Severity (1–5)
- Description (textarea, max length)
- Optional redacted snippet (textarea, max length)
- Submit button

**Validation**
- Require: model, at least 1 category, severity, description
- Soft block: detect emails/phones/addresses and warn/deny submit

**Success state**
- “Report submitted” toast + closes modal

---

### 5.2 `ReportCard`
Displays one report.

**Contains**
- Category chips
- Severity
- Age (“2h ago”)
- Confirm count
- Confirm / Can’t reproduce buttons

---

### 5.3 `VoteButtons`
**Props**
- `onConfirm`, `onDeny`
- `disabled`, `loading`

**A11y**
- Buttons have explicit labels, not just icons.

---

## 6) Primitive Components

### 6.1 `Button`
**Variants**
- `primary` (loud accent, thick border)
- `secondary` (neutral)
- `ghost` (transparent)
- `danger` (for moderation later)

**Sizes**
- `sm`, `md`, `lg`

**States**
- hover, active, focus-visible, disabled, loading

### 6.2 `Input`, `Textarea`, `Select`
- Thick border, high-contrast placeholder
- Focus ring matches accent color
- Error state: border + label change; show helper text

### 6.3 `Chip`
Used for categories and labels.
- Toggleable variant for multi-select

---

## 7) Page-Level Composition

### 7.1 Home (`/`)
**Blocks**
1. `HeroHeader`
2. Featured models grid (`ModelCard`)
3. More models grid (`ModelCard`)
4. Today’s Reports (`ReportFeed`)
5. Footer links

**Must be visible above the fold**
- Today’s date
- At least 3 model cards with scores

### 7.2 Model Detail (`/models/[slug]`)
**Blocks**
1. `ModelHeader` (big gauge)
2. `WhatChangedPanel`
3. `MetricBreakdown`
4. `TaskSuiteSummary`
5. `CommunityPanel`

### 7.3 Methodology (`/methodology`)
- Friendly explanation, suite version, scoring basics, disclaimers

---

## 8) Visual Specs (concrete)

### 8.1 Card (default)
- Border: `3px` solid (near-black)
- Radius: small or none
- Shadow: hard offset `6px 6px 0 0` (near-black)
- Padding: `p-4` (card), `p-6` (hero)
- Hover: translate `-1px -1px`, shadow becomes `8px 8px`

### 8.2 Zones (scores)
- Sharp: calm accent
- Normal: neutral accent
- Sus: warning accent
- Emergency: danger accent

(Exact tokens are in `DESIGN_SYSTEM.md`.)

---

## 9) Content Rules

- Never say “Model X is bad.” Prefer: “Model X is **worse than its baseline today**.”
- Always show “why” if you show a high score.
- Keep meme labels short and consistent.

---

## 10) Done Definition for UI (MVP)

- Home page looks like a product, not a dashboard template.
- Gauges readable on mobile.
- Report flow takes < 30 seconds.
- All interactive elements have keyboard focus + ARIA labels.
