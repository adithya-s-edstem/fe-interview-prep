# Testing

## Tooling

- **Vitest** (configured in `vite.config.ts`, `environment: 'jsdom'`, `globals: false`).
- **React Testing Library** + `@testing-library/user-event` + `@testing-library/jest-dom`.
- **MSW** `setupServer` in `src/test/setup.ts` for every network call (dummyjson and the mock APIs). Unhandled requests
  fail the test.
- `vi.useFakeTimers()` for polling (Q4) and mock latency (Q5).
- `localStorage` cleared between tests.

## What to test

Tests assert observable behaviour and are named after the acceptance criterion they prove.

| Kind | Scope | Examples |
|---|---|---|
| Unit | domain functions | `calculateTotals` (Q1-AC6), `clampQuantity` (Q1-AC3), `moveCard` (Q3-AC6), `isNewer` (Q4-AC5) |
| Component / page | a route rendered with providers and MSW | quantity change updates totals (Q1-AC5); fast scroll makes one request per page (Q2-AC3); keyboard move updates counts (Q3-AC5/6); hidden tab stops requests (Q4-AC4); offline ×3 then online sends 3 in order (Q5-AC4) |

Each question ships at least one automated test (its `*-AC` "At least one automated test" criterion); the target is one
test per acceptance criterion that can be automated.

## Simulating browser conditions

- Tab hidden/visible: set `document.visibilityState` and dispatch `visibilitychange` (TanStack Query `focusManager`).
- Offline/online: `onlineManager.setOnline(false|true)` or dispatch `offline` / `online` events.
- Intersection: mock `IntersectionObserver` via `react-intersection-observer/test-utils`.
- Refresh: unmount, keep `localStorage`, remount with a fresh `QueryClient`.
- Drag and drop: keyboard sensor via `user.keyboard` (space, arrows, space).

## Out of scope

No end-to-end browser suite; the 2-hour limit favours component tests. The Network-tab checks (Q4-AC4) are also shown
manually in the PR screenshots/GIF.
