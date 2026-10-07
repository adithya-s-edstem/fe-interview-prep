# Commands

Requires Node 22 LTS and npm.

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server (MSW worker on) | `npm run dev` → http://localhost:5173 |
| Production build | `npm run build` (`tsc -b && vite build`) |
| Preview build | `npm run preview` |
| Lint | `npm run lint` (`eslint .`) |
| Format | `npm run format` (`prettier --write .`) |
| Type-check | `npm run typecheck` (`tsc -b --noEmit`) |
| Tests (once) | `npm test` (`vitest run`) |
| Tests (watch) | `npm run test:watch` (`vitest`) |
| All gates | `npm run check` (lint + typecheck + test) |

## MSW

- `public/mockServiceWorker.js` is generated once with `npx msw init public --save` and committed.
- The worker starts in `src/main.tsx` before the app mounts. It mocks only `/api/*` (Q4, Q5); dummyjson requests pass
  through (`onUnhandledRequest: 'bypass'`).
- In tests the node server also mocks dummyjson.
