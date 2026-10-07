import { KanbanBoard } from '../components/KanbanBoard';
import { useBoard } from '../hooks/useBoard';
import { useBoardActions } from '../hooks/useBoardActions';

export function KanbanPage() {
  const board = useBoard();
  const actions = useBoardActions();

  return (
    <>
      <h1>Kanban Board</h1>
      <p>
        Drag a card by its handle, or focus the handle and press Space, the arrow keys, then Space to drop. Each card
        also has a Move menu.
      </p>
      <KanbanBoard board={board} actions={actions} />
    </>
  );
}
