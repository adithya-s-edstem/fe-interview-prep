import type { Board } from './Board';
import type { CardId } from './Card';
import { findCardColumn } from './findCardColumn';

export function deleteCard(board: Board, cardId: CardId): Board {
  const column = findCardColumn(board, cardId);
  if (column === undefined) {
    return board;
  }
  const remainingCards = Object.fromEntries(Object.entries(board.cards).filter(([id]) => id !== cardId));
  return {
    columns: { ...board.columns, [column]: board.columns[column].filter((id) => id !== cardId) },
    cards: remainingCards,
  };
}
