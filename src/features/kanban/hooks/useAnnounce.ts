import { useContext } from 'react';
import { boardAnnouncementContext } from './boardAnnouncementContext';

export function useAnnounce() {
  return useContext(boardAnnouncementContext);
}
