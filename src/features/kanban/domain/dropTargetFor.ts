import type { Board } from './Board';
import type { CardId } from './Card';
import type { CardMove } from './CardMove';
import { findCardColumn } from './findCardColumn';
import { isColumnId } from './isColumnId';

export function dropTargetFor(board: Board, cardId: CardId, overId: string): CardMove | undefined {
  if (isColumnId(overId)) {
    return { cardId, toColumn: overId, toIndex: board.columns[overId].length };
  }
  const overColumn = findCardColumn(board, overId);
  if (overColumn === undefined) {
    return undefined;
  }
  return { cardId, toColumn: overColumn, toIndex: board.columns[overColumn].indexOf(overId) };
}
