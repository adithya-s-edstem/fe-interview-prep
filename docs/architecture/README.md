# Architecture

How the app is built. Requirements live in [../requirements](../requirements/README.md); the reasons behind each
choice live in [../decisions](../decisions/README.md).

| File | Covers |
|---|---|
| [stack.md](stack.md) | Mandated stack, chosen tooling and libraries |
| [layering.md](layering.md) | Layers, what each holds, dependency direction |
| [folder-structure.md](folder-structure.md) | Directory layout and naming |
| [data-flow.md](data-flow.md) | Data flow overall and per question |
| [testing.md](testing.md) | Test tooling, what each kind of test covers |
| [commands.md](commands.md) | How to install, run, build, lint, type-check and test |

## At a glance

- Single-page React + TypeScript (strict) app built with Vite, one route per question.
- Feature-first folders (`src/features/<feature>/`), layered inside each feature: domain → application →
  infrastructure / interface.
- Server data through TanStack Query; local persisted state through Zustand `persist`; mock APIs through MSW in both
  the browser and tests.
- Vitest + React Testing Library + MSW for tests; ESLint + Prettier + `tsc --noEmit` as gates.
