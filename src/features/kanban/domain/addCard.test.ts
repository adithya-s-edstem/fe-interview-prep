import { describe, expect, it } from 'vitest';
import { addCard } from './addCard';
import { boardWithCards } from './boardWithCards';

const newCard = { id: 'new', title: 'Write tests', description: '' };

describe('addCard', () => {
  it('adds the card to the end of the chosen column', () => {
    const board = boardWithCards({ done: ['a'] });

    const updated = addCard(board, { card: newCard, column: 'done' });

    expect(updated.columns.done).toEqual(['a', 'new']);
    expect(updated.cards.new).toEqual(newCard);
  });

  it('does not add a card to In progress when it already holds 3 cards', () => {
    const board = boardWithCards({ inProgress: ['a', 'b', 'c'] });

    const updated = addCard(board, { card: newCard, column: 'inProgress' });

    expect(updated.columns.inProgress).toEqual(['a', 'b', 'c']);
    expect(updated.cards.new).toBeUndefined();
  });
});
