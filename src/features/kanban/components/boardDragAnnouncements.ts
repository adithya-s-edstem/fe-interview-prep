import type { Active, Announcements, Over } from '@dnd-kit/core';
import type { Board } from '../domain/Board';
import { columnTitles } from '../domain/columnTitles';
import { dropTargetFor } from '../domain/dropTargetFor';

export function boardDragAnnouncements(board: Board): Announcements {
  const cardTitle = (active: Active) => board.cards[String(active.id)]?.title ?? String(active.id);
  const columnTitleUnder = (active: Active, over: Over | null) => {
    const move = over && dropTargetFor(board, String(active.id), String(over.id));
    return move ? columnTitles[move.toColumn] : 'no column';
  };

  return {
    onDragStart: ({ active }) => `Picked up ${cardTitle(active)}.`,
    onDragOver: ({ active, over }) => `${cardTitle(active)} is over ${columnTitleUnder(active, over)}.`,
    onDragEnd: ({ active, over }) => `${cardTitle(active)} was dropped in ${columnTitleUnder(active, over)}.`,
    onDragCancel: ({ active }) => `Moving ${cardTitle(active)} was cancelled.`,
  };
}
