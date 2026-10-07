import { addCommentOnce } from '../domain/addCommentOnce';
import type { CommentContent } from '../domain/commentTypes';

const storageKey = 'mock-comments-server';

export function readStoredComments(): CommentContent[] {
  const stored = localStorage.getItem(storageKey);
  return stored === null ? [] : (JSON.parse(stored) as CommentContent[]);
}

export function storeCommentOnce(comment: CommentContent): CommentContent {
  const comments = addCommentOnce(readStoredComments(), comment);
  localStorage.setItem(storageKey, JSON.stringify(comments));
  return comments.find(({ clientId }) => clientId === comment.clientId) ?? comment;
}
