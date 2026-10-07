# Q3 — Kanban Board

Build a task board with three columns: **To do**, **In progress** and **Done**. Branch `feature/q3-kanban`.
Suggested time: 25 minutes.

## Requirements

- **Q3-R1 Columns** — Exactly three columns: To do, In progress, Done.
- **Q3-R2 Cards CRUD** — Add, edit and delete cards. A card has a title (required) and an optional description.
- **Q3-R3 Drag and drop** — Move cards between columns and reorder them within a column by dragging.
- **Q3-R4 Non-mouse moves** — Users who can't use a mouse can still move cards (for example, with the keyboard or a
  menu).
- **Q3-R5 Counts** — Show the number of cards in each column.
- **Q3-R6 Persistence** — The board survives a page refresh.

## Acceptance criteria

- **Q3-AC1** A card cannot be saved with an empty (or whitespace-only) title; the description may be empty.
- **Q3-AC2** Added cards appear in the chosen column; edits change title/description in place; deleted cards disappear.
- **Q3-AC3** Dragging a card to another column moves it there at the drop position.
- **Q3-AC4** Dragging a card within a column changes its order.
- **Q3-AC5** A card can be moved between columns and reordered using only the keyboard (no pointer).
- **Q3-AC6** Moving a card updates both columns and their counts correctly.
- **Q3-AC7** After a page refresh all cards, their columns and their order are unchanged.
- **Q3-AC8** At least one automated test.

## Optional

Not required; only after all 5 core questions are done.

- **Q3-O1** A limit of 3 cards in In progress.
