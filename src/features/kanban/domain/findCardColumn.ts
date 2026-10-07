import type { Board } from './Board';
import type { CardId } from './Card';
import { columnIds, type ColumnId } from './ColumnId';

export function findCardColumn(board: Board, cardId: CardId): ColumnId | undefined {
  return columnIds.find((column) => board.columns[column].includes(cardId));
}
