import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Board } from '../domain/Board';
import { columnIds } from '../domain/ColumnId';
import { dropTargetFor } from '../domain/dropTargetFor';
import type { BoardActions } from '../hooks/BoardActions';
import { BoardColumn } from './BoardColumn';
import { boardDragAnnouncements } from './boardDragAnnouncements';
import { cardsBeforeColumnsCollision } from './cardsBeforeColumnsCollision';
import { FocusRequestProvider } from './FocusRequestProvider';
import styles from './KanbanBoard.module.css';

const pointerDragStartDistance = 5;

type KanbanBoardProps = {
  board: Board;
  actions: BoardActions;
};

export function KanbanBoard({ board, actions }: KanbanBoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: pointerDragStartDistance } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function moveDroppedCard({ active, over }: DragEndEvent) {
    if (over === null) {
      return;
    }
    const move = dropTargetFor(board, String(active.id), String(over.id));
    if (move !== undefined) {
      actions.moveCard(move);
    }
  }

  return (
    <FocusRequestProvider>
      <DndContext
        sensors={sensors}
        collisionDetection={cardsBeforeColumnsCollision}
        accessibility={{ announcements: boardDragAnnouncements(board) }}
        onDragEnd={moveDroppedCard}
      >
        <div className={styles.board}>
          {columnIds.map((column) => (
            <BoardColumn key={column} column={column} board={board} actions={actions} />
          ))}
        </div>
      </DndContext>
    </FocusRequestProvider>
  );
}
