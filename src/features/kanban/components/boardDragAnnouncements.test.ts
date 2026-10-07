import type { Active, Over } from '@dnd-kit/core';
import { describe, expect, it } from 'vitest';
import type { Board } from '../domain/Board';
import { boardDragAnnouncements } from './boardDragAnnouncements';

const board: Board = {
  columns: { todo: ['draft'], inProgress: ['review'], done: [] },
  cards: {
    draft: { id: 'draft', title: 'Write draft', description: '' },
    review: { id: 'review', title: 'Peer review', description: '' },
  },
};

function draggable(id: string): Active {
  return { id, data: { current: undefined }, rect: { current: { initial: null, translated: null } } };
}

function droppable(id: string): Over {
  const emptyRect = { width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 };
  return { id, data: { current: undefined }, rect: emptyRect, disabled: false };
}

describe('boardDragAnnouncements', () => {
  const announcements = boardDragAnnouncements(board);

  it('names the card that was picked up', () => {
    expect(announcements.onDragStart({ active: draggable('draft') })).toBe('Picked up Write draft.');
  });

  it('names the column a card is over when it is over the column itself', () => {
    expect(announcements.onDragOver({ active: draggable('draft'), over: droppable('done') })).toBe(
      'Write draft is over Done.',
    );
  });

  it('names the column of the card a dragged card is over', () => {
    expect(announcements.onDragOver({ active: draggable('draft'), over: droppable('review') })).toBe(
      'Write draft is over In progress.',
    );
  });

  it('names the card and the column it was dropped in', () => {
    expect(announcements.onDragEnd({ active: draggable('draft'), over: droppable('inProgress') })).toBe(
      'Write draft was dropped in In progress.',
    );
  });

  it('says the card stayed in its column when it is dropped in a full column', () => {
    const boardWithFullInProgress: Board = {
      columns: { todo: [], inProgress: ['review', 'test', 'deploy'], done: ['gamma'] },
      cards: {
        review: { id: 'review', title: 'Peer review', description: '' },
        test: { id: 'test', title: 'Test', description: '' },
        deploy: { id: 'deploy', title: 'Deploy', description: '' },
        gamma: { id: 'gamma', title: 'Gamma', description: '' },
      },
    };

    const dropMessage = boardDragAnnouncements(boardWithFullInProgress).onDragEnd({
      active: draggable('gamma'),
      over: droppable('inProgress'),
    });

    expect(dropMessage).toBe('In progress is full, Gamma stayed in Done.');
  });

  it('names the card whose move was cancelled', () => {
    expect(announcements.onDragCancel({ active: draggable('draft'), over: null })).toBe(
      'Moving Write draft was cancelled.',
    );
  });
});
