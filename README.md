# Character Compendium

A SaaS-dashboard-styled directory of fictional characters, built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. Each character reads like a "client profile" — level, stats, skills, equipment, achievements, and relationships — with roster-wide analytics on a dedicated stats page.

---

## Current Status

Live, static-data app. All character data currently lives in `lib/character-data.ts` — there is no database yet.

**Planned Phase 2:** viewer-submitted characters via an approval queue, backed by Prisma + MongoDB (matching the rest of the Drakeze ecosystem). Not implemented yet.

---

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5 (strict)
- Tailwind CSS v4 + shadcn/ui ("new-york" style) + Radix UI primitives
- Recharts for analytics/data visualization
- Bun as the runtime and package manager

---

## Running Locally

```bash
bun install
bun dev          # start dev server
bun run build    # production build
bun run lint     # ESLint
```

---

## Structure

- `app/page.tsx` — filterable character directory (grid)
- `app/stats/page.tsx` — roster-wide analytics (Recharts)
- `app/character/[id]/page.tsx` + `components/character-detail-client.tsx` — per-character detail page
- `lib/character-data.ts` — static character data (the current "database")
- `lib/theme.ts` — per-class accent color system shared across cards, detail pages, and charts

---

## Author

Drakeze
