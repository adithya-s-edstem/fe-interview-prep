import type { Board } from './Board';
import type { Card } from './Card';
import type { ColumnId } from './ColumnId';

export function cardsInColumn(board: Board, column: ColumnId): Card[] {
  return board.columns[column].flatMap((cardId) => {
    const card = board.cards[cardId];
    return card === undefined ? [] : [card];
  });
}
