import type { Announcements } from '@dnd-kit/core';

const silence = () => undefined;

export const silentDragAnnouncements: Announcements = {
  onDragStart: silence,
  onDragOver: silence,
  onDragEnd: silence,
  onDragCancel: silence,
};
