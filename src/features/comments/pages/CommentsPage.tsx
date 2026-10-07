import { commentsQueryClient } from '../hooks/commentsQueryClient';
import { CommentsQueryProvider } from './CommentsQueryProvider';
import { CommentThread } from './CommentThread';

export function CommentsPage() {
  return (
    <CommentsQueryProvider client={commentsQueryClient}>
      <h1>Comments with Offline Support</h1>
      <CommentThread />
    </CommentsQueryProvider>
  );
}
