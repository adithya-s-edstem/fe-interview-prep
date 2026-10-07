import type { CommentContent } from '../domain/commentTypes';
import { commentsEndpoint } from './commentsEndpoint';

export async function fetchComments(): Promise<CommentContent[]> {
  const response = await fetch(commentsEndpoint);
  if (!response.ok) throw new Error(`Loading comments failed with status ${response.status}`);
  return (await response.json()) as CommentContent[];
}
