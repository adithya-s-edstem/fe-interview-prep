import { CommentList } from '../components/CommentList';
import { CommentTextForm } from '../components/CommentTextForm';
import { useCommentThread } from '../hooks/useCommentThread';
import { usePostComment } from '../hooks/usePostComment';
import { useQueuedCommentEdits } from '../hooks/useQueuedCommentEdits';
import { useSendComment } from '../hooks/useSendComment';

export function CommentThread() {
  const { comments, isLoading } = useCommentThread();
  const postComment = usePostComment();
  const retryComment = useSendComment();
  const editQueuedComment = useQueuedCommentEdits((state) => state.editQueuedComment);

  return (
    <>
      <CommentTextForm label="Comment" submitLabel="Post comment" onSubmit={postComment} />
      {isLoading && <p>Loading comments…</p>}
      <CommentList comments={comments} onRetry={retryComment} onEdit={editQueuedComment} />
    </>
  );
}
