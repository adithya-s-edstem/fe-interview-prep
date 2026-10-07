import { useMutation } from '@tanstack/react-query';
import type { CommentContent } from '../domain/commentTypes';
import { addCommentMutationKey } from './commentKeys';

export function useSendComment(): (comment: CommentContent) => void {
  const { mutate } = useMutation<CommentContent, Error, CommentContent>({ mutationKey: addCommentMutationKey });
  return mutate;
}
