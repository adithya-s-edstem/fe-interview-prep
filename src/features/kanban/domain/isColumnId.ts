import { columnIds, type ColumnId } from './ColumnId';

export function isColumnId(id: string): id is ColumnId {
  return columnIds.some((columnId) => columnId === id);
}
