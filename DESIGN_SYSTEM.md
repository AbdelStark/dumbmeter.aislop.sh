# Dumb Meter — First-Pass Design System (Tailwind Tokens)

This is a first-pass design system tuned for a Neo‑Brutalist look that is:
- bold
- highly legible
- meme-ready
- consistent

It’s designed to work with Tailwind + CSS variables so you can theme (or add dark mode) without refactoring components.

---

## 1) Design DNA (rules you can enforce)

### Borders
- Default surface border: **3px solid**
- Interactive surfaces (buttons/cards) keep thick border even on hover/focus.
- Avoid hairlines except for subtle dividers inside cards.

### Shadows (hard, offset)
- Primary shadow: `6px 6px 0 0`
- Hover shadow: `8px 8px 0 0`
- Active shadow: `3px 3px 0 0`

### Radius
- Default: squared or barely rounded
- Tokens:
  - `--radius-0: 0px`
  - `--radius-1: 6px` (optional for inputs/chips)

### Type
- Headings: heavy grotesk
- Numbers: mono/tabular
- Labels: uppercase microtype

### Color
- Mostly neutral, accents for meaning.
- Accents should be consistent for zones.

---

## 2) Color Tokens

### 2.1 CSS Variables (recommended)
Put this in `app/globals.css` (see file included in this archive). Colors are stored as `r g b` for easy Tailwind `rgb(var(--token))` usage.

**Neutrals**
- `--bg`: off-white paper
- `--fg`: near-black ink
- `--muted`: gray ink
- `--paper`: card surface
- `--border`: heavy border ink

**Accents**
- `--accent`: brand pop (used for primary CTA)
- `--sharp`: zone color (0–25)
- `--normal`: zone color (26–50)
- `--sus`: zone color (51–75)
- `--panic`: zone color (76–100)

**Support**
- `--info`, `--success`, `--warning`, `--danger`

### 2.2 Recommended Palette (accessible + loud)
- `bg`: 250 248 244
- `paper`: 255 255 255
- `fg`: 18 18 18
- `muted`: 80 80 80
- `border`: 18 18 18

- `accent` (electric): 0 102 255
- `sharp` (mint): 0 200 140
- `normal` (sky): 90 160 255
- `sus` (yellow): 255 204 0
- `panic` (hot): 255 58 94

- `warning`: 255 204 0
- `danger`: 255 58 94
- `success`: 0 200 140
- `info`: 0 102 255

> You can swap accents later; the main thing is keeping zone semantics stable.

---

## 3) Typography Tokens

### 3.1 Fonts
Recommended:
- Sans: `Space Grotesk` (or `Inter` if you want default)
- Mono: `IBM Plex Mono` (or `ui-monospace` fallback)

In Next.js:
- Use `next/font/google` for `Space_Grotesk` and `IBM_Plex_Mono`.

### 3.2 Type scale (utility mapping)
Use semantic wrappers but here are the sizes:
- Display: `text-5xl sm:text-6xl font-black tracking-tight`
- H1: `text-4xl sm:text-5xl font-black tracking-tight`
- H2: `text-2xl sm:text-3xl font-extrabold tracking-tight`
- H3: `text-xl font-extrabold`
- Body: `text-base leading-7`
- Small: `text-sm leading-6`
- Micro label: `text-xs uppercase tracking-widest`

### 3.3 Numeric Style
For score values:
- `font-mono tabular-nums`
- `tracking-tight`

---

## 4) Spacing & Sizing Tokens

- Base unit: 4px
- Default paddings:
  - Card: `p-4`
  - Section: `py-10`
  - Hero: `p-6 sm:p-8`
- Gutters:
  - Grid: `gap-4 sm:gap-6`

---

## 5) Component Tokens

### 5.1 Border widths
- `--bw-strong: 3px`
- `--bw-soft: 2px` (inputs)
- `--bw-hair: 1px` (rare)

### 5.2 Shadows
- `--shadow-strong: 6px 6px 0 0 rgb(var(--border))`
- `--shadow-hover: 8px 8px 0 0 rgb(var(--border))`
- `--shadow-press: 3px 3px 0 0 rgb(var(--border))`

### 5.3 Focus ring
- Use Tailwind `focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent))]`

---

## 6) Tailwind Config (token wiring)

A sample `tailwind.config.ts` is included in this archive. Core ideas:
- Colors reference CSS vars
- Shadows reference CSS vars
- Border width references CSS var via custom utility classes

---

## 7) Utility Class Conventions (recommended)

Create a few “brand primitives” using Tailwind `@layer components` in `globals.css`:
- `.dm-card`
- `.dm-button`
- `.dm-input`
- `.dm-chip`
- `.dm-shadow`
- `.dm-shadow-hover`

This keeps components clean and consistent.

---

## 8) Zone Semantics (must stay consistent)

- 0–25 → Sharp (`--sharp`)
- 26–50 → Normal (`--normal`)
- 51–75 → Sus (`--sus`)
- 76–100 → Panic (`--panic`)

Any component showing a score must use these mappings:
- `ScorePill`
- `DumbGauge`
- `StampBadge`
- Any heatmap/histogram

---

## 9) Dark Mode (optional later)
Because tokens use CSS variables, you can add:
```css
@media (prefers-color-scheme: dark) { :root { ... } }
```
Or a `.dark` class strategy.

---

## 10) Included Files in This Archive
- `tailwind.config.ts`
- `globals.css`
- `tokens.json`
