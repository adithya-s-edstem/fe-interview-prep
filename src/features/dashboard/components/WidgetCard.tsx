import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Suspense, useId, type ReactNode } from 'react';
import type { WidgetId } from '../domain/widgetIds';
import styles from './WidgetCard.module.css';

type WidgetCardProps = {
  widgetId: WidgetId;
  title: string;
  children: ReactNode;
};

export function WidgetCard({ widgetId, title, children }: WidgetCardProps) {
  const headingId = useId();
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: widgetId,
  });
  return (
    <section
      ref={setNodeRef}
      aria-labelledby={headingId}
      className={isDragging ? styles.draggingCard : styles.card}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <header className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <button
          ref={setActivatorNodeRef}
          type="button"
          className={styles.handle}
          {...attributes}
          {...listeners}
          aria-label={`Move ${title}`}
        >
          ⠿
        </button>
      </header>
      <Suspense fallback={<p>Loading…</p>}>{children}</Suspense>
    </section>
  );
}
