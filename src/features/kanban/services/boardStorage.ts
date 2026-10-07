import { createJSONStorage } from 'zustand/middleware';
import type { Board } from '../domain/Board';

export const boardStorageKey = 'fe-interview-prep:kanban';

export const boardStorage = createJSONStorage<Board>(() => localStorage);
