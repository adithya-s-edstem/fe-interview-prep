import { describe, expect, it } from 'vitest';
import { boardWithCards } from './boardWithCards';
import { deleteCard } from './deleteCard';

describe('deleteCard', () => {
  it('removes the card from its column and from the board', () => {
    const board = boardWithCards({ todo: ['a', 'b'], done: ['c'] });

    const updated = deleteCard(board, 'a');

    expect(updated.columns).toEqual({ todo: ['b'], inProgress: [], done: ['c'] });
    expect(Object.keys(updated.cards).toSorted()).toEqual(['b', 'c']);
  });
});
