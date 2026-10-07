import type { Board } from './Board';
import { columnIds, type ColumnId } from './ColumnId';

export function boardWithCards(cardIdsByColumn: Partial<Record<ColumnId, string[]>>): Board {
  const columns = Object.fromEntries(
    columnIds.map((column) => [column, cardIdsByColumn[column] ?? []]),
  ) as Board['columns'];
  const cards = Object.fromEntries(
    Object.values(columns)
      .flat()
      .map((id) => [id, { id, title: id, description: '' }]),
  );
  return { columns, cards };
}
