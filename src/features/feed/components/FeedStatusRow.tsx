import type { Ref } from 'react';
import type { FeedStatus } from '../domain/FeedStatus';
import styles from './FeedStatusRow.module.css';

type FeedStatusRowProps = {
  status: FeedStatus;
  onRetry: () => void;
  ref: Ref<HTMLDivElement>;
};

export function FeedStatusRow({ status, onRetry, ref }: FeedStatusRowProps) {
  return (
    <div ref={ref} role="status" className={styles.row}>
      {status === 'loading' && (
        <p className={styles.loading}>
          <span className={styles.spinner} aria-hidden="true" />
          Loading posts…
        </p>
      )}
      {status === 'error' && (
        <div className={styles.error}>
          <p role="alert">Couldn't load posts.</p>
          <button type="button" onClick={onRetry} className={styles.retry}>
            Retry
          </button>
        </div>
      )}
      {status === 'end' && <p>You've reached the end</p>}
    </div>
  );
}
