import type { Board } from './Board';
import type { CardMove } from './CardMove';
import { findCardColumn } from './findCardColumn';
import { isMoveBlockedByLimit } from './isMoveBlockedByLimit';

export function moveCard(board: Board, move: CardMove): Board {
  const { cardId, toColumn, toIndex } = move;
  const fromColumn = findCardColumn(board, cardId);
  if (fromColumn === undefined || isMoveBlockedByLimit(board, move)) {
    return board;
  }
  const columnsWithoutCard = {
    ...board.columns,
    [fromColumn]: board.columns[fromColumn].filter((id) => id !== cardId),
  };
  const targetColumn = columnsWithoutCard[toColumn].toSpliced(toIndex, 0, cardId);
  return { columns: { ...columnsWithoutCard, [toColumn]: targetColumn }, cards: board.cards };
}
