# Dumb Meter Spec Pack

This archive contains:
- `PRD.md` — Product Requirements Document
- `UI_SPEC.md` — Component-level UI spec (behavior, props, states, a11y)
- `NEXTJS_STRUCTURE.md` — Next.js project structure and route/component mapping
- `DESIGN_SYSTEM.md` — Neo‑Brutalist design system + Tailwind token set
- `tailwind.config.ts` — Token-wired Tailwind configuration
- `globals.css` — CSS variables + a few brand primitives
- `tokens.json` — Machine-readable design tokens

Implementation note:
- The docs assume **Next.js App Router** with **TypeScript** and **Tailwind**.
- The “brand primitives” (`dm-card`, `dm-button`, etc.) are meant to be used across all components.
