import type { CardId } from '../domain/Card';
import type { ColumnId } from '../domain/ColumnId';

export const focusTargetKeys = {
  editButton: (cardId: CardId) => `edit:${cardId}`,
  moveButton: (cardId: CardId) => `move:${cardId}`,
  addButton: (column: ColumnId) => `add:${column}`,
};
