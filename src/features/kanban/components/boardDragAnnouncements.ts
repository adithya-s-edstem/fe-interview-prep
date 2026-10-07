import type { Active, Announcements, Over } from '@dnd-kit/core';
import type { Board } from '../domain/Board';
import { columnTitles } from '../domain/columnTitles';
import { dropTargetFor } from '../domain/dropTargetFor';
import { findCardColumn } from '../domain/findCardColumn';
import { isMoveBlockedByLimit } from '../domain/isMoveBlockedByLimit';

export function boardDragAnnouncements(board: Board) {
  const cardTitle = (active: Active) => board.cards[String(active.id)]?.title ?? String(active.id);
  const moveUnder = (active: Active, over: Over | null) =>
    over ? dropTargetFor(board, String(active.id), String(over.id)) : undefined;
  const columnTitleUnder = (active: Active, over: Over | null) => {
    const move = moveUnder(active, over);
    return move ? columnTitles[move.toColumn] : 'no column';
  };
  const dropMessage = (active: Active, over: Over | null) => {
    const move = moveUnder(active, over);
    const fromColumn = findCardColumn(board, String(active.id));
    if (move === undefined || fromColumn === undefined || !isMoveBlockedByLimit(board, move)) {
      return `${cardTitle(active)} was dropped in ${columnTitleUnder(active, over)}.`;
    }
    return `${columnTitles[move.toColumn]} is full, ${cardTitle(active)} stayed in ${columnTitles[fromColumn]}.`;
  };

  return {
    onDragStart: ({ active }) => `Picked up ${cardTitle(active)}.`,
    onDragOver: ({ active, over }) => `${cardTitle(active)} is over ${columnTitleUnder(active, over)}.`,
    onDragEnd: ({ active, over }) => dropMessage(active, over),
    onDragCancel: ({ active }) => `Moving ${cardTitle(active)} was cancelled.`,
  } satisfies Announcements;
}
