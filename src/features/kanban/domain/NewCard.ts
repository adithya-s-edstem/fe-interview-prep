import type { Card } from './Card';
import type { ColumnId } from './ColumnId';

export type NewCard = {
  card: Card;
  column: ColumnId;
};
