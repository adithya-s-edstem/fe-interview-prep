import type { CommentContent, EditedTextByClientId } from './commentTypes';

export function applyQueuedEdit(content: CommentContent, editedTextByClientId: EditedTextByClientId): CommentContent {
  const editedText = editedTextByClientId[content.clientId];
  return editedText === undefined ? content : { ...content, text: editedText };
}
