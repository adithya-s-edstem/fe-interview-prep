# Layering

Feature first, then layer. Dependencies point inward only.

```
interface ──► application ──► domain ◄── infrastructure
```

| Layer | Holds in this app | Must not |
|---|---|---|
| `domain` | Types, pure rules: cart totals and stock clamp, de-duplicating posts, board moves, latest-wins comparison, comment status transitions | import React, Zustand, TanStack Query, `fetch`, MSW |
| `application` | Hooks that orchestrate a use case: `useCart`, `useFeed`, `useBoard`, `useDashboardPolling`, `usePostComment`; Zustand stores; query option factories | render JSX, call `fetch` directly |
| `infrastructure` | API clients (`fetch` + Zod parse), MSW handlers for the feature, storage keys | contain business rules |
| `interface` | Route pages, containers, presentational components, CSS Modules | fetch, read storage, or compute business values |

## Rules

- **Components render, hooks decide.** A presentational component gets props and emits callbacks; a container
  (usually the page) calls one application hook and passes data down.
- **One data-fetching layer.** All server data goes through TanStack Query; components never call API clients.
- **Derived values are computed, not stored.** Cart totals, column counts and "has more pages" are derived from state in
  domain functions (answers the interview question "why stored vs calculated").
- **Persisted state lives in stores**, never written to `localStorage` from components.
- **Cross-feature code** goes in `src/shared/` only when a second feature needs it. Features never import from each
  other.
- **Ports only where the domain needs one.** Libraries are used directly from the application layer; no wrapper for its
  own sake.
