# 0002 ESLint flat config + Prettier

- **Status:** accepted
- **Dictated by PDF:** "a linter" must exist; which one is our choice.

## Decision
ESLint flat config with `typescript-eslint` (type-aware recommended), `eslint-plugin-react-hooks`,
`eslint-plugin-react-refresh` and `eslint-plugin-jsx-a11y`. Prettier for formatting (`printWidth: 120`).

## Why
Vite template default; `react-hooks` catches stale-closure and dependency bugs the interview will probe; `jsx-a11y`
supports the keyboard requirement in Q3. `printWidth` matches the 120-char line limit.

## Alternatives
- Biome: faster, single tool, but no hooks-dependency rule parity and less familiar to reviewers.
