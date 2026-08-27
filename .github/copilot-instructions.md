# Copilot Instructions — Travel Planner

## Project Overview

An online travel planner built as a **fully static site** — no backend, no server-side code, no database. All user data lives exclusively in the browser:

- **URL** (compressed/encoded state for sharing plans via link)
- **localStorage** (persistence across sessions)
- **Import/export** (users can download/upload their plan as a JSON file)

## Tech Stack

- **React 18+** with **TypeScript** (strict mode)
- **Vite** as build tool — output is a purely static bundle (`vite build`), deployable to any static host
- **shadcn/ui** for all UI components (built on Radix UI + Tailwind CSS)
- **Tailwind CSS** for styling
- No server frameworks, no SSR, no API routes — client-only SPA

## Architecture Rules

### Data & State
- All application state must be serializable (plain JSON-compatible objects).
- Single source of truth for the travel plan; derive everything else.
- State persistence layers, in order of priority:
  1. URL — encode plan state (compressed, e.g. via `lz-string`) in the hash or query params so plans are shareable by link
  2. localStorage — auto-save on change, restore on load
  3. File import/export — JSON download/upload with a versioned schema
- Include a schema `version` field in persisted data; write migrations when the shape changes.
- Never send user data to any external service. No analytics that capture plan contents.

### Components
- Use **shadcn/ui components** for all standard UI (buttons, dialogs, inputs, cards, tabs, etc.). Add them via `npx shadcn@latest add <component>` — do not hand-roll equivalents.
- Custom components go in `src/components/`; shadcn primitives live in `src/components/ui/` (do not heavily edit generated files; wrap them instead).
- Keep components small and focused; extract logic into hooks (`src/hooks/`).

### Styling
- **Reference designs are provided as images in the `ref/` directory.** Always check `ref/` and match the visual style (colors, spacing, typography, layout) shown there before styling any screen or component.
- Use Tailwind utility classes; define shared design tokens (colors, radii, fonts) in the Tailwind/CSS-variable theme so shadcn components pick them up.
- No CSS-in-JS libraries; no separate CSS files beyond the Tailwind entry and theme variables.

### Project Structure
```
src/
  components/       # app components
    ui/             # shadcn/ui generated components
  hooks/            # custom hooks (state, persistence, url-sync)
  lib/              # utilities (serialization, compression, schema, import/export)
  types/            # shared TypeScript types
ref/                # design reference images (read-only, not bundled)
```

## Coding Conventions

- TypeScript strict; avoid `any`. Model the travel plan domain with explicit types (trips, destinations, days, activities, budgets, etc.).
- Functional components with hooks only; no class components.
- Validate imported JSON (e.g. with `zod`) before loading it into state — imported files are untrusted input.
- Handle URL-state decode failures gracefully (fall back to localStorage, then to empty state); never crash on malformed input.
- Keep the bundle lean: prefer small dependencies, lazy-load heavy views.

## Build & Deploy

- `npm run dev` — local development
- `npm run build` — static production build to `dist/`
- The build must work when served from a static file host (relative asset paths / correct `base` if deployed to a subpath).
- No environment secrets are needed or allowed — everything runs client-side.
