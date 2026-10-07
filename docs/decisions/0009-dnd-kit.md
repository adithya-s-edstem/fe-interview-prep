# 0009 dnd-kit for drag and drop

- **Status:** accepted
- **Dictated by PDF:** drag to move and reorder, and a non-mouse way to move.

## Decision
`@dnd-kit/core` + `@dnd-kit/sortable` with pointer and keyboard sensors, plus a per-card "Move to…" menu. All moves go
through one domain function, `moveCard`.

## Why
dnd-kit supplies drag sensors and screen-reader announcements, not a board: columns, cards, CRUD, counts and
persistence remain ours, so it does not do the core work. Keyboard sensor + menu covers users who can't use a mouse.

`@dnd-kit/accessibility` (already pulled in by `@dnd-kit/core`) supplies the live region. The board owns one region
for both drag messages and "Move…" menu messages, so a screen reader never hears a stale drag message after a menu
move. dnd-kit's own region is kept silent. Alternative: a second hand-written `role="status"` element, rejected
because two regions would disagree.

## Alternatives
- Native HTML5 drag and drop: no keyboard or touch support, awkward reordering.
- `@hello-pangea/dnd`: list-oriented and closer to a ready-made board; less flexible.
- A kanban component library: forbidden by the "no UI library doing the core work" rule.
