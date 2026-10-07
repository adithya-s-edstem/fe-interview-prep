import type { CommentContent } from './commentTypes';

export function addCommentOnce(comments: readonly CommentContent[], comment: CommentContent): CommentContent[] {
  const alreadyStored = comments.some(({ clientId }) => clientId === comment.clientId);
  return alreadyStored ? [...comments] : [...comments, comment];
}
