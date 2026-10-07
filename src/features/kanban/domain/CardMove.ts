import type { CardId } from './Card';
import type { ColumnId } from './ColumnId';

export type CardMove = {
  cardId: CardId;
  toColumn: ColumnId;
  toIndex: number;
};
