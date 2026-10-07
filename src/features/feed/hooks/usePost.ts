import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../services/fetchPost';

export function usePost(postId: number) {
  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });
  return post;
}
