# Decisions

Short records of choices **not** dictated by the assignment PDF. One file per decision, numbered, never renumbered.
Supersede a decision with a new record instead of editing the old one.

| # | Decision |
|---|---|
| [0001](0001-vite-react-ts.md) | Vite + React 19 + TypeScript strict, npm, Node 22 |
| [0002](0002-lint-format.md) | ESLint flat config + Prettier |
| [0003](0003-react-router.md) | React Router data router with `<ScrollRestoration>` |
| [0004](0004-tanstack-query.md) | TanStack Query for all server state |
| [0005](0005-zustand-persist.md) | Zustand + `persist` for client state |
| [0006](0006-msw-mocks.md) | MSW for mock APIs (browser and tests) |
| [0007](0007-zod-react-hook-form.md) | Zod schemas + React Hook Form |
| [0008](0008-intersection-observer.md) | `react-intersection-observer` for infinite scroll |
| [0009](0009-dnd-kit.md) | dnd-kit for drag and drop, plus a "Move to…" menu |
| [0010](0010-recharts.md) | Recharts for the active-users chart |
| [0011](0011-offline-queue.md) | Offline queue on paused, scoped, persisted mutations + idempotency keys |
| [0012](0012-money-in-cents.md) | Money as integer cents |
| [0013](0013-css-modules.md) | CSS Modules, no component library |
| [0014](0014-vitest-rtl.md) | Vitest + React Testing Library, no E2E |
| [0015](0015-fast-check.md) | fast-check for property-based invariant tests |

## Template

```markdown
# NNNN Title

- **Status:** accepted | superseded by NNNN
- **Dictated by PDF:** what the assignment fixes, if anything

## Decision
## Why
## Alternatives
```
