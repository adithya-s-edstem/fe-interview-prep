import type { Card, CardId } from './Card';
import type { ColumnId } from './ColumnId';

export type Board = {
  columns: Record<ColumnId, CardId[]>;
  cards: Record<CardId, Card>;
};
