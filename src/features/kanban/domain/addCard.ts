import type { Board } from './Board';
import { isColumnFull } from './isColumnFull';
import type { NewCard } from './NewCard';

export function addCard(board: Board, { card, column }: NewCard): Board {
  if (isColumnFull(board, column)) {
    return board;
  }
  return {
    columns: { ...board.columns, [column]: [...board.columns[column], card.id] },
    cards: { ...board.cards, [card.id]: card },
  };
}
