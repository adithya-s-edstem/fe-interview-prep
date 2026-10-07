# 0014 Vitest + React Testing Library

- **Status:** accepted
- **Dictated by PDF:** a test runner, and at least one automated test per question. Which runner is our choice.

## Decision
Vitest (jsdom) + React Testing Library + user-event + jest-dom, with MSW `setupServer` for network. No E2E suite.

## Why
Shares Vite's config and transforms; Jest-compatible API; fast watch mode. RTL tests behaviour the way a user sees it.

## Alternatives
- Jest: needs separate TS/ESM transform setup.
- Playwright E2E: closest to a real browser (tab visibility, offline), but slower to write and run within 2 hours.
