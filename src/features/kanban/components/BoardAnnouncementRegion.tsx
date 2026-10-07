import { LiveRegion, useAnnouncement } from '@dnd-kit/accessibility';
import { useDndMonitor } from '@dnd-kit/core';
import { useId, type ReactNode } from 'react';
import type { Board } from '../domain/Board';
import { boardAnnouncementContext } from '../hooks/boardAnnouncementContext';
import { boardDragAnnouncements } from './boardDragAnnouncements';

type BoardAnnouncementRegionProps = {
  board: Board;
  children: ReactNode;
};

export function BoardAnnouncementRegion({ board, children }: BoardAnnouncementRegionProps) {
  const regionId = useId();
  const { announcement, announce } = useAnnouncement();
  const dragAnnouncements = boardDragAnnouncements(board);

  useDndMonitor({
    onDragStart: (event) => announce(dragAnnouncements.onDragStart(event)),
    onDragOver: (event) => announce(dragAnnouncements.onDragOver(event)),
    onDragEnd: (event) => announce(dragAnnouncements.onDragEnd(event)),
    onDragCancel: (event) => announce(dragAnnouncements.onDragCancel(event)),
  });

  return (
    <boardAnnouncementContext.Provider value={announce}>
      {children}
      <LiveRegion id={regionId} announcement={announcement} />
    </boardAnnouncementContext.Provider>
  );
}
