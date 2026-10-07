import type { Board } from './Board';
import type { ColumnId } from './ColumnId';
import { columnCardLimits } from './columnCardLimits';

export function isColumnFull(board: Board, column: ColumnId): boolean {
  const limit = columnCardLimits[column];
  return limit !== undefined && board.columns[column].length >= limit;
}
