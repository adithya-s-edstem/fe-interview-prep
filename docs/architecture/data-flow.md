# Data flow

## Overall

```
Page (interface) ─► application hook ─► TanStack Query ─► api client (infrastructure) ─► fetch ─► dummyjson / MSW
                 └► Zustand store (persist ─► localStorage)
```

- Remote data: `useQuery` / `useInfiniteQuery` / `useMutation` with options built in `hooks/`. API clients parse
  responses with Zod.
- Local data: Zustand stores with `persist`; each store has a versioned storage key `fe-interview-prep:<feature>`.
- Components subscribe with narrow selectors so unrelated state changes do not re-render them.

## Q1 Shopping Cart

- Products: `useQuery(['products'])` → `GET https://dummyjson.com/products`.
- Cart: Zustand store `{ items: Record<productId, { product snapshot, quantity }> }`, persisted.
- Stock rule in domain (`clampQuantity(quantity, stock)`), applied in the store's `add` / `setQuantity` actions.
- Totals derived on render by `calculateTotals(items)` in integer cents: tax = `round(subtotal × 18 / 100)`,
  total = subtotal + tax; formatted with `Intl.NumberFormat` to 2 decimals.

## Q2 Infinite Feed

- `useInfiniteQuery(['posts'])` → `GET /posts?limit=10&skip=<pageParam>`; `getNextPageParam` returns `undefined` when
  `skip + limit >= total` (end state).
- A sentinel element observed by `useInView` calls `fetchNextPage()` only when `hasNextPage && !isFetchingNextPage`;
  TanStack Query also de-duplicates in-flight fetches for the same key. A domain `uniqueById` guards the rendered list.
- Error on a page → error row with retry calling `fetchNextPage()` again.
- Detail: `/feed/:postId` → `useQuery(['post', id])`. Back navigation: cached pages are still in the QueryClient, so
  the list re-renders at full length and `<ScrollRestoration>` restores the position.

## Q3 Kanban Board

- Zustand store `{ columns: Record<ColumnId, CardId[]>, cards: Record<CardId, Card> }`, persisted.
- Domain `moveCard(board, cardId, toColumn, toIndex)` is the single move rule used by drag end, keyboard drag and the
  "Move to…" menu.
- Counts derived from `columns[id].length`.
- Card form: React Hook Form + Zod (`title` trimmed, min 1).

## Q4 Live Dashboard

- MSW handler `GET /api/dashboard` returns `{ generatedAt, sales, activeUsers[], recentOrders[] }` with new random
  values per call; optional artificial delay to exercise slow paths.
- One `useQuery(['dashboard'])` with `refetchInterval: 5000` and `refetchIntervalInBackground: false` (stops while the
  tab is hidden; resumes on visibility).
- No pile-up: a query has at most one fetch in flight; interval ticks while fetching do not start another.
- Latest wins: the query function compares each response with the cached snapshot (domain `keepNewerSnapshot`, built
  on `isNewer` over `generatedAt`) and returns the cached one when the response is not newer. A late response is
  dropped silently: no error state, and the newer data stays on screen. (A custom `structuralSharing` function was not
  used because TanStack Query also runs it on every widget's `select` result, not only on the whole snapshot.)
- Each widget subscribes through `select` to its own slice; structural sharing keeps unchanged slices referentially
  equal, and widgets are `memo`ized, so only widgets whose slice changed re-render.
- Widget visibility and order: Zustand store `{ order: WidgetId[], hidden: WidgetId[] }`, persisted under
  `fe-interview-prep:dashboard`; widgets are rearranged with dnd-kit (pointer and keyboard).

## Q5 Comments with Offline Support

- MSW handler `GET/POST /api/comments`: 1–2 s random delay, ~20% failures, stores comments in `localStorage` keyed
  by a client-generated `clientId` (idempotency key) — a repeated POST with a known `clientId` returns the existing
  comment. The store survives a page reload, so a request that is re-sent after a refresh still creates exactly one
  comment (Q5-AC5, Q5-AC6).
- Posting: a `useMutation` registered via `queryClient.setMutationDefaults(['addComment'], …)` with
  `scope: { id: 'comments' }` so mutations run one at a time in creation order.
- Optimistic UI: unsent comments are read from `useMutationState` (variables + status) and merged with the
  `['comments']` server list by `clientId`; `onSuccess` adds the server copy to the `['comments']` cache; a failed
  mutation shows as `failed`. Retry re-runs the same variables (same `clientId`).
- Offline: TanStack Query's `onlineManager` pauses mutations while offline (status `queued`); they resume in order on
  reconnect via `resumePausedMutations()`.
- Durability: `PersistQueryClientProvider` with a localStorage persister dehydrates unsent mutations (queued, failed,
  in-flight ones saved as paused) and the comments cache; on load the mutations are restored and resumed.
- Domain owns the status model: `queued → sending → sent | failed`, `failed → sending` on retry.
