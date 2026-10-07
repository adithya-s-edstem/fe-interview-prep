import type { Card, CardId } from '../domain/Card';
import type { CardInput } from '../domain/cardInputSchema';
import type { CardMove } from '../domain/CardMove';
import type { ColumnId } from '../domain/ColumnId';

export type CardToAdd = {
  input: CardInput;
  column: ColumnId;
};

export type BoardActions = {
  addCard: (cardToAdd: CardToAdd) => CardId;
  editCard: (card: Card) => void;
  deleteCard: (cardId: CardId) => void;
  moveCard: (move: CardMove) => void;
};
