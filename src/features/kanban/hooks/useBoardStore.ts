import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addCard } from '../domain/addCard';
import type { Board } from '../domain/Board';
import { deleteCard } from '../domain/deleteCard';
import { editCard } from '../domain/editCard';
import { emptyBoard } from '../domain/emptyBoard';
import { moveCard } from '../domain/moveCard';
import { boardStorage, boardStorageKey } from '../services/boardStorage';
import type { BoardActions } from './BoardActions';

type BoardState = Board & { actions: BoardActions };

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      ...emptyBoard,
      actions: {
        addCard: ({ input, column }) =>
          set((board) => addCard(board, { card: { id: crypto.randomUUID(), ...input }, column })),
        editCard: (card) => set((board) => editCard(board, card)),
        deleteCard: (cardId) => set((board) => deleteCard(board, cardId)),
        moveCard: (move) => set((board) => moveCard(board, move)),
      },
    }),
    {
      name: boardStorageKey,
      version: 1,
      storage: boardStorage,
      partialize: ({ columns, cards }) => ({ columns, cards }),
    },
  ),
);
