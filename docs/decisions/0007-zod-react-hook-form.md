# 0007 Zod + React Hook Form

- **Status:** accepted
- **Dictated by PDF:** no.

## Decision
Zod schemas parse every API response and define form input; React Hook Form with the Zod resolver for the Q3 card form
and the Q5 comment form.

## Why
One schema gives both the TypeScript type and runtime validation (Q3 "title required"). Uncontrolled inputs avoid a
re-render per keystroke.

## Alternatives
- Plain controlled inputs: fine for two fields, but validation and error display are hand-written.
- Valibot: smaller, less known.
