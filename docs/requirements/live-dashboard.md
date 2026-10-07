# Q4 — Live Dashboard

Build a dashboard whose widgets refresh with live data. Branch `feature/q4-dashboard`. Suggested time: 25 minutes.

## Requirements

- **Q4-R1 Mock API** — Mock an API (any approach) that returns sales, active users and recent orders, with values that
  change on every call.
- **Q4-R2 Widgets** — Show at least 3 widgets: a sales number, an active-users chart and a recent-orders list.
- **Q4-R3 Polling** — Refresh the data every 5 seconds.
- **Q4-R4 Visibility pause** — Pause refreshing while the browser tab is hidden, and resume when it's visible again.
- **Q4-R5 No stale overwrite** — Newer data on screen is never replaced by an older, late response.
- **Q4-R6 No pile-up** — Requests don't pile up when the API is slow.
- **Q4-R7 Widget visibility** — Users can show or hide widgets, and their choice survives a refresh.
- **Q4-R8 Isolated re-renders** — Updating one widget's data should not re-render the widgets whose data didn't change.

## Acceptance criteria

- **Q4-AC1** Two consecutive calls to the mock API return different values.
- **Q4-AC2** The sales number, active-users chart and recent-orders list are all on the page.
- **Q4-AC3** While visible, a new request is made about every 5 seconds.
- **Q4-AC4** Switching to another tab stops the requests (visible in the browser Network tab), and they resume on
  return.
- **Q4-AC5** If a slower, older response arrives after a newer one, the screen keeps the newer data.
- **Q4-AC6** With an API slower than 5 seconds, there is at most one request in flight at a time.
- **Q4-AC7** Hiding a widget removes it from the page; after refresh it is still hidden. Showing it again restores it.
- **Q4-AC8** When only one widget's data changes, the other widgets do not re-render (verifiable with React
  Profiler or a render-count test).
- **Q4-AC9** At least one automated test.

## Optional

Not required; only after all 5 core questions are done.

- **Q4-O1** Let users rearrange widgets, and remember the layout.
