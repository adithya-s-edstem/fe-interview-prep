import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EditedTextByClientId } from '../domain/commentTypes';

type QueuedCommentEdits = {
  editedTextByClientId: EditedTextByClientId;
  editQueuedComment: (clientId: string, text: string) => void;
  forgetEdit: (clientId: string) => void;
};

export const useQueuedCommentEdits = create<QueuedCommentEdits>()(
  persist(
    (set) => ({
      editedTextByClientId: {},
      editQueuedComment: (clientId, text) =>
        set(({ editedTextByClientId }) => ({ editedTextByClientId: { ...editedTextByClientId, [clientId]: text } })),
      forgetEdit: (clientId) =>
        set(({ editedTextByClientId }) => ({
          editedTextByClientId: Object.fromEntries(
            Object.entries(editedTextByClientId).filter(([editedClientId]) => editedClientId !== clientId),
          ),
        })),
    }),
    { name: 'queued-comment-edits' },
  ),
);
