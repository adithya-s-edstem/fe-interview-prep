import { useState } from 'react';
import type { CommentContent, CommentStatus, ThreadComment } from '../domain/commentTypes';
import styles from './CommentItem.module.css';
import { CommentTextForm } from './CommentTextForm';

type CommentItemProps = {
  comment: ThreadComment;
  onRetry: (content: CommentContent) => void;
  onEdit: (clientId: string, text: string) => void;
};

const statusLabels: Record<Exclude<CommentStatus, 'sent'>, string> = {
  queued: 'Queued',
  sending: 'Sending…',
  failed: 'Failed',
};

export function CommentItem({ comment: { content, status }, onRetry, onEdit }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className={styles.comment}>
        <CommentTextForm
          label="Edit comment"
          submitLabel="Save"
          defaultText={content.text}
          onSubmit={(text) => {
            onEdit(content.clientId, text);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={styles.comment}>
      <p className={styles.text}>{content.text}</p>
      <div className={styles.footer}>
        {status !== 'sent' && <span className={styles[status]}>{statusLabels[status]}</span>}
        {status === 'failed' && (
          <button type="button" onClick={() => onRetry(content)}>
            Retry
          </button>
        )}
        {status === 'queued' && (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </li>
  );
}
