import type { Board } from './Board';
import type { CardId } from './Card';
import type { CardMoveOption } from './CardMoveOption';
import { columnIds } from './ColumnId';
import { columnTitles } from './columnTitles';
import { findCardColumn } from './findCardColumn';
import { isColumnFull } from './isColumnFull';

export function listCardMoves(board: Board, cardId: CardId): CardMoveOption[] {
  const column = findCardColumn(board, cardId);
  if (column === undefined) {
    return [];
  }
  const index = board.columns[column].indexOf(cardId);
  const lastIndex = board.columns[column].length - 1;
  const moveUp: CardMoveOption = { label: 'Move up', move: { cardId, toColumn: column, toIndex: index - 1 } };
  const moveDown: CardMoveOption = { label: 'Move down', move: { cardId, toColumn: column, toIndex: index + 1 } };
  const moveToOtherColumns = columnIds
    .filter((otherColumn) => otherColumn !== column && !isColumnFull(board, otherColumn))
    .map((otherColumn) => ({
      label: `Move to ${columnTitles[otherColumn]}`,
      move: { cardId, toColumn: otherColumn, toIndex: board.columns[otherColumn].length },
    }));
  return [...(index > 0 ? [moveUp] : []), ...(index < lastIndex ? [moveDown] : []), ...moveToOtherColumns];
}
