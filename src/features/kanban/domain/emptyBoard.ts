import type { Board } from './Board';

export const emptyBoard: Board = {
  columns: { todo: [], inProgress: [], done: [] },
  cards: {},
};
