# Production Readiness Audit (Next.js / Vercel)

Date: 2026-04-02

This repository is **not production-ready** in its current state.

## Blockers

1. Next.js build fails because `app/character/[id]/page.tsx` is a Client Component and also exports `generateStaticParams`.
2. TypeScript errors are hidden via `ignoreBuildErrors: true`.
3. Relationship type union in `lib/types.ts` does not match actual data in `lib/character-data.ts`.
4. `Empty` component is used with unsupported props (`icon`, `title`, `description`, `action`).
5. Lint pipeline is broken (`eslint` is run but no ESLint flat config exists).

## High-Risk Issues

1. `app/global-error.tsx` renders raw stack traces to users.
2. App mutates shared in-memory dataset using in-place `sort()` in `app/stats/page.tsx`.
3. Select component usage in `app/page.tsx` is incompatible with the Radix Select wrapper API.

## Vercel / Runtime Notes

1. No runtime API routes exist (`app/api/**` missing), so there is no server-side trust boundary implementation.
2. Python script exists (`scripts/generate_characters.py`) but has no integration with Next build or Vercel runtime.
3. README still states this repository is in planning/no implementation state and documents Bun-based commands while `package.json` uses npm scripts.

## Immediate Remediation

1. Convert `app/character/[id]/page.tsx` to a Server Component and move client-only logic into a nested client child component.
2. Remove `ignoreBuildErrors` and make `npx tsc --noEmit`, `next build`, and lint mandatory CI gates.
3. Fix domain model mismatch (`CharacterRelationship.type`).
4. Replace `Empty` usage with actual exported composition API (`EmptyHeader`, `EmptyTitle`, etc.) or implement required props in `Empty`.
5. Add `eslint.config.mjs` and enforce lint in CI.
6. Remove stack trace exposure from global error UI in production.
7. Replace in-place sorts with immutable copies (`[...CHARACTERS].sort(...)`).
8. Rewrite filter Select controls to use `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`.
