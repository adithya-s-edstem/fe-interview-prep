import { describe, expect, it } from 'vitest';
import { boardWithCards } from './boardWithCards';
import { listCardMoves } from './listCardMoves';

describe('listCardMoves', () => {
  it('offers moving up, down and to every other column for a card in the middle of a column', () => {
    const board = boardWithCards({ todo: ['a', 'b', 'c'], done: ['x'] });

    expect(listCardMoves(board, 'b')).toEqual([
      { label: 'Move up', move: { cardId: 'b', toColumn: 'todo', toIndex: 0 } },
      { label: 'Move down', move: { cardId: 'b', toColumn: 'todo', toIndex: 2 } },
      { label: 'Move to In progress', move: { cardId: 'b', toColumn: 'inProgress', toIndex: 0 } },
      { label: 'Move to Done', move: { cardId: 'b', toColumn: 'done', toIndex: 1 } },
    ]);
  });

  it('does not offer moving up the first card or down the last card', () => {
    const board = boardWithCards({ done: ['only'] });

    expect(listCardMoves(board, 'only').map(({ label }) => label)).toEqual(['Move to To do', 'Move to In progress']);
  });

  it('does not offer moving a card into In progress when it already holds 3 cards', () => {
    const board = boardWithCards({ todo: ['a'], inProgress: ['b', 'c', 'd'] });

    expect(listCardMoves(board, 'a').map(({ label }) => label)).toEqual(['Move to Done']);
  });
});
