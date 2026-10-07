# 0006 MSW for mock APIs

- **Status:** accepted
- **Dictated by PDF:** "mock an API (any approach)" for Q4 and Q5.

## Decision
Mock `/api/dashboard` and `/api/comments` with MSW request handlers, run by a service worker in the browser and by
`setupServer` in tests. Handlers live in each feature's `services/`.

## Why
Requests are real `fetch` calls, so they show in the browser Network tab, which is needed to demonstrate Q4-AC4
(requests stop when the tab is hidden). The same handlers drive tests, and latency and failure rates are easy to
control.

## Alternatives
- In-process fake (`setTimeout` + `Promise`): invisible in the Network tab.
- `json-server` or a small Node server: a second process to run; harder to randomise failures and latency.
