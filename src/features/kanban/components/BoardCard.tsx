import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { Card } from '../domain/Card';
import type { CardMoveOption } from '../domain/CardMoveOption';
import type { BoardActions } from '../hooks/BoardActions';
import styles from './BoardCard.module.css';
import { CardForm } from './CardForm';
import { CardMoveMenu } from './CardMoveMenu';

type BoardCardProps = {
  card: Card;
  moveOptions: CardMoveOption[];
  actions: BoardActions;
};

export function BoardCard({ card, moveOptions, actions }: BoardCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  return (
    <li
      ref={setNodeRef}
      aria-label={card.title}
      className={isDragging ? styles.draggingCard : styles.card}
      style={{ transform: CSS.Translate.toString(transform), transition }}
    >
      {isEditing ? (
        <CardForm
          initialValues={card}
          submitLabel="Save"
          onSubmit={(input) => {
            actions.editCard({ ...card, ...input });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className={styles.heading}>
            <button
              type="button"
              ref={setActivatorNodeRef}
              className={styles.dragHandle}
              {...attributes}
              {...listeners}
              aria-label={`Drag ${card.title}`}
            >
              ⠿
            </button>
            <h3 className={styles.title}>{card.title}</h3>
          </div>
          {card.description && <p className={styles.description}>{card.description}</p>}
          <div className={styles.actions}>
            <button type="button" aria-label={`Edit ${card.title}`} onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" aria-label={`Delete ${card.title}`} onClick={() => actions.deleteCard(card.id)}>
              Delete
            </button>
            <CardMoveMenu cardTitle={card.title} options={moveOptions} onMove={actions.moveCard} />
          </div>
        </>
      )}
    </li>
  );
}
