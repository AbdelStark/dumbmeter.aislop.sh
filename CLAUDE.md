<identity>
Dumb Meter is a Next.js App Router frontend MVP that showcases a daily, shareable dashboard for LLM drift vs baseline using mocked data.
</identity>

<environment>
You are operating in the Codex CLI on the user's machine with full filesystem access and network enabled.
Git is available; only commit or push when explicitly asked.
</environment>

<stack>
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS + PostCSS
- Package manager: npm (package-lock.json)
- Node: 18+ recommended for Next 14
</stack>

<structure>
- app/                 App Router layouts and routes
- app/(site)/          Site pages (home, model detail, methodology)
- components/          UI, viz, reports, shell, and page sections
- lib/                 Mock data, types, utilities
- globals.css          Design tokens and brand primitives
- tailwind.config.ts   Tailwind token wiring
- PRD.md, UI_SPEC.md, DESIGN_SYSTEM.md, NEXTJS_STRUCTURE.md  Specs (reference)
</structure>

<commands>
  | Task   | Command       | Notes                 |
  | ------ | ------------- | --------------------- |
  | Install| npm install   | Uses package-lock.json|
  | Dev    | npm run dev   | http://localhost:3000 |
  | Build  | npm run build |                       |
  | Start  | npm run start |                       |
  | Lint   | npm run lint  | next lint             |
</commands>

<conventions>
<do>
- Use functional React components with typed props.
- Keep server components by default; add "use client" only for state/hooks.
- Use design primitives from globals.css (dm-card, dm-button, dm-input, dm-chip).
- Keep UI text concise and memetic, but not mean-spirited.
- Keep data mocked in lib/mock-data.ts unless asked to integrate APIs.
- Prefer ASCII-only text when editing files.
</do>
<dont>
- Don't change package.json or lockfiles unless asked.
- Don't edit spec docs (PRD/UI_SPEC/DESIGN_SYSTEM) unless requested.
- Don't add heavy state libraries or new frameworks without approval.
</dont>
</conventions>

<workflows>
- Update mocked data: edit lib/mock-data.ts (models, cardStatsById, drivers, metrics, tiers, reports).
- Add a new page: create under app/(site)/ and compose existing components.
- Add a component: place under components/ and keep styles tokenized via Tailwind + dm-* classes.
- Interactive UI: mark component "use client"; avoid hooks in server components.
</workflows>

<boundaries>
- DO NOT modify .env* files or credentials.
- DO NOT run destructive git commands (reset/clean) unless asked.
- Keep .next/ and node_modules/ out of version control (use .gitignore).
</boundaries>

<troubleshooting>
- Styles missing: ensure globals.css is imported in app/layout.tsx.
- Hook error in server component: add "use client" at file top or move logic to a client child.
- Tailwind classes not applied: verify tailwind.config.ts content paths include app/ and components/.
</troubleshooting>
