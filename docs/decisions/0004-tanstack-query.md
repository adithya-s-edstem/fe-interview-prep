# 0004 TanStack Query for server state

- **Status:** accepted
- **Dictated by PDF:** no.

## Decision
All remote data (products, posts, dashboard, comments) goes through TanStack Query v5.

## Why
It provides the primitives the questions test: in-flight de-duplication (Q2 no duplicate pages), `useInfiniteQuery`
(Q2), `refetchInterval` paused while the tab is hidden with one fetch per key at a time (Q4), `select` with structural
sharing (Q4 re-render isolation), and mutations with optimistic updates, retry, `onlineManager` pausing and serial
`scope` (Q5). It is a data layer, not a UI library, so it does not do the core work of building the UI; the
interview-relevant logic (when to fetch, latest-wins, idempotency, status model) stays in our code.

## Alternatives
- Hand-written `useEffect` + `AbortController`: more code, easy to get races wrong, harder to explain in 20 seconds.
- SWR: lighter, but a weaker infinite/mutation/offline story.
- RTK Query: would pull in Redux for no other reason.
