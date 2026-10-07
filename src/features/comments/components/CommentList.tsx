import type { CommentContent, ThreadComment } from '../domain/commentTypes';
import { CommentItem } from './CommentItem';
import styles from './CommentList.module.css';

type CommentListProps = {
  comments: readonly ThreadComment[];
  onRetry: (content: CommentContent) => void;
  onEdit: (clientId: string, text: string) => void;
};

export function CommentList({ comments, onRetry, onEdit }: CommentListProps) {
  return (
    <ul aria-label="Comments" className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.content.clientId} comment={comment} onRetry={onRetry} onEdit={onEdit} />
      ))}
    </ul>
  );
}
