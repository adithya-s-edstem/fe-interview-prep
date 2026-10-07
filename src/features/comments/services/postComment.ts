import type { CommentContent } from '../domain/commentTypes';
import { commentsEndpoint } from './commentsEndpoint';

export async function postComment(comment: CommentContent): Promise<CommentContent> {
  const response = await fetch(commentsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!response.ok) throw new Error(`Sending the comment failed with status ${response.status}`);
  return (await response.json()) as CommentContent;
}
