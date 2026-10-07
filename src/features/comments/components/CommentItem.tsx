import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { CommentContent, CommentStatus, ThreadComment } from '../domain/commentTypes';
import styles from './CommentItem.module.css';
import { CommentTextForm } from './CommentTextForm';

type CommentItemProps = {
  comment: ThreadComment;
  onRetry: (content: CommentContent) => void;
  onEdit: (clientId: string, text: string) => void;
};

const statusLabels: Record<CommentStatus, string> = {
  queued: 'Queued',
  sending: 'Sending…',
  sent: '',
  failed: 'Failed',
};

export function CommentItem({ comment: { content, status }, onRetry, onEdit }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const commentRef = useRef<HTMLLIElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  function stopEditing() {
    flushSync(() => setIsEditing(false));
    editButtonRef.current?.focus();
  }

  function retry() {
    onRetry(content);
    commentRef.current?.focus();
  }

  return (
    <li ref={commentRef} tabIndex={-1} className={styles.comment}>
      {isEditing ? (
        <CommentTextForm
          label="Edit comment"
          submitLabel="Save"
          defaultText={content.text}
          focusOnOpen
          onSubmit={(text) => {
            onEdit(content.clientId, text);
            stopEditing();
          }}
          onCancel={stopEditing}
        />
      ) : (
        <>
          <p className={styles.text}>{content.text}</p>
          <div className={styles.footer}>
            <span role="status" className={styles[status]}>
              {statusLabels[status]}
            </span>
            {status === 'failed' && (
              <button type="button" aria-label={`Retry "${content.text}"`} onClick={retry}>
                Retry
              </button>
            )}
            {status === 'queued' && (
              <button
                ref={editButtonRef}
                type="button"
                aria-label={`Edit "${content.text}"`}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </li>
  );
}
