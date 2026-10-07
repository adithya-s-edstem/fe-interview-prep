import type { Board } from './Board';
import type { Card } from './Card';

export function editCard(board: Board, card: Card): Board {
  return { columns: board.columns, cards: { ...board.cards, [card.id]: card } };
}
