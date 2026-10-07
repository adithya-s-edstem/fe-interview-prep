import { useShallow } from 'zustand/react/shallow';
import type { Board } from '../domain/Board';
import { useBoardStore } from './useBoardStore';

export function useBoard(): Board {
  return useBoardStore(useShallow(({ columns, cards }) => ({ columns, cards })));
}
