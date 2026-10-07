import type { BoardActions } from './BoardActions';
import { useBoardStore } from './useBoardStore';

export function useBoardActions(): BoardActions {
  return useBoardStore((state) => state.actions);
}
