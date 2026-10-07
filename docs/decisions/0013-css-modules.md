# 0013 CSS Modules, no component library

- **Status:** accepted
- **Dictated by PDF:** no UI library that does the core work of a question. Styling approach is our choice.

## Decision
Plain CSS Modules per component, a few CSS custom properties for colours and spacing in `src/index.css`, and a handful
of shared primitives in `src/shared/ui`.

## Why
Built into Vite, zero runtime, scoped class names. Keeps every pixel explainable and avoids any doubt about a library
doing the work.

## Alternatives
- Tailwind: fast, but adds config and long class strings to explain.
- MUI / Chakra / shadcn: risk of overlapping with question features; heavier.
