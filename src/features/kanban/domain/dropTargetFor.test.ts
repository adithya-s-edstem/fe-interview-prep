import { describe, expect, it } from 'vitest';
import { boardWithCards } from './boardWithCards';
import { dropTargetFor } from './dropTargetFor';

const board = boardWithCards({ todo: ['a', 'b'], done: ['x', 'y'] });

describe('dropTargetFor', () => {
  it('places a card dropped on another card at that card position', () => {
    expect(dropTargetFor(board, 'a', 'y')).toEqual({ cardId: 'a', toColumn: 'done', toIndex: 1 });
  });

  it('places a card dropped on a column at the end of that column', () => {
    expect(dropTargetFor(board, 'a', 'done')).toEqual({ cardId: 'a', toColumn: 'done', toIndex: 2 });
  });

  it('places a card dropped on a card of its own column at that card position', () => {
    expect(dropTargetFor(board, 'a', 'b')).toEqual({ cardId: 'a', toColumn: 'todo', toIndex: 1 });
  });
});
