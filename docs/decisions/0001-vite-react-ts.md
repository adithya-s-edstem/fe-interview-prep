# 0001 Vite + React 19 + TypeScript strict

- **Status:** accepted
- **Dictated by PDF:** React and TypeScript strict only. Build tool is our choice.

## Decision
Scaffold with Vite's `react-ts` template on React 19, TypeScript 5.x with `strict` and `noUncheckedIndexedAccess`.
npm with a committed lockfile, Node 22 LTS.

## Why
Fastest start and HMR for a 2-hour build; zero-config TS; Vitest reuses the same config. The app is a client-only SPA
calling public or mocked APIs, so server rendering adds nothing.

## Alternatives
- Next.js: SSR/app-router overhead not needed; complicates MSW and scroll restoration.
- Create React App: deprecated.
- pnpm/yarn: no benefit at this size; npm needs no extra install.
