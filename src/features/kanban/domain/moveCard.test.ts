import { describe, expect, it } from 'vitest';
import { boardWithCards } from './boardWithCards';
import type { CardMove } from './CardMove';
import { columnIds } from './ColumnId';
import { moveCard } from './moveCard';

describe('moveCard', () => {
  it('moves a card to another column at the given position', () => {
    const board = boardWithCards({ todo: ['a', 'b'], done: ['x', 'y'] });

    const moved = moveCard(board, { cardId: 'a', toColumn: 'done', toIndex: 1 });

    expect(moved.columns).toEqual({ todo: ['b'], inProgress: [], done: ['x', 'a', 'y'] });
  });

  it('reorders a card within its column', () => {
    const board = boardWithCards({ todo: ['a', 'b', 'c'] });

    const moved = moveCard(board, { cardId: 'a', toColumn: 'todo', toIndex: 2 });

    expect(moved.columns.todo).toEqual(['b', 'c', 'a']);
  });

  it('updates the card count of both the source and the target column', () => {
    const board = boardWithCards({ todo: ['a', 'b'], inProgress: ['c'] });

    const moved = moveCard(board, { cardId: 'b', toColumn: 'inProgress', toIndex: 0 });

    expect([moved.columns.todo.length, moved.columns.inProgress.length]).toEqual([1, 2]);
  });

  it.each<CardMove>([
    { cardId: 'a', toColumn: 'done', toIndex: 0 },
    { cardId: 'b', toColumn: 'todo', toIndex: 0 },
    { cardId: 'c', toColumn: 'inProgress', toIndex: 9 },
    { cardId: 'd', toColumn: 'todo', toIndex: 1 },
  ])('keeps every card exactly once after moving $cardId to $toColumn', (move) => {
    const board = boardWithCards({ todo: ['a', 'b'], inProgress: ['c'], done: ['d'] });

    const moved = moveCard(board, move);

    const cardIdsOnBoard = columnIds.flatMap((column) => moved.columns[column]);
    expect(cardIdsOnBoard.toSorted()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('does not move a card into In progress when it already holds 3 cards', () => {
    const board = boardWithCards({ todo: ['a'], inProgress: ['b', 'c', 'd'] });

    const moved = moveCard(board, { cardId: 'a', toColumn: 'inProgress', toIndex: 0 });

    expect(moved.columns).toEqual(board.columns);
  });

  it('moves a card into In progress while it holds fewer than 3 cards', () => {
    const board = boardWithCards({ todo: ['a'], inProgress: ['b', 'c'] });

    const moved = moveCard(board, { cardId: 'a', toColumn: 'inProgress', toIndex: 2 });

    expect(moved.columns.inProgress).toEqual(['b', 'c', 'a']);
  });

  it('reorders a card within a full In progress column', () => {
    const board = boardWithCards({ inProgress: ['b', 'c', 'd'] });

    const moved = moveCard(board, { cardId: 'd', toColumn: 'inProgress', toIndex: 0 });

    expect(moved.columns.inProgress).toEqual(['d', 'b', 'c']);
  });
});
