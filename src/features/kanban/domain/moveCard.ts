import type { Board } from './Board';
import type { CardMove } from './CardMove';
import { findCardColumn } from './findCardColumn';
import { isColumnFull } from './isColumnFull';

export function moveCard(board: Board, { cardId, toColumn, toIndex }: CardMove): Board {
  const fromColumn = findCardColumn(board, cardId);
  if (fromColumn === undefined) {
    return board;
  }
  if (fromColumn !== toColumn && isColumnFull(board, toColumn)) {
    return board;
  }
  const columnsWithoutCard = {
    ...board.columns,
    [fromColumn]: board.columns[fromColumn].filter((id) => id !== cardId),
  };
  const targetColumn = columnsWithoutCard[toColumn].toSpliced(toIndex, 0, cardId);
  return { columns: { ...columnsWithoutCard, [toColumn]: targetColumn }, cards: board.cards };
}
