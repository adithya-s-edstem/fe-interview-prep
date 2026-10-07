import type { Board } from './Board';
import type { CardMove } from './CardMove';
import { findCardColumn } from './findCardColumn';
import { isColumnFull } from './isColumnFull';

export function isMoveBlockedByLimit(board: Board, { cardId, toColumn }: CardMove): boolean {
  return findCardColumn(board, cardId) !== toColumn && isColumnFull(board, toColumn);
}
