import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { Card } from '../domain/Card';
import type { CardMove } from '../domain/CardMove';
import type { CardMoveOption } from '../domain/CardMoveOption';
import type { BoardActions } from '../hooks/BoardActions';
import { useFocusTarget } from '../hooks/useFocusTarget';
import { useRequestFocus } from '../hooks/useRequestFocus';
import styles from './BoardCard.module.css';
import { CardForm } from './CardForm';
import { CardMoveMenu } from './CardMoveMenu';
import { focusTargetKeys } from './focusTargetKeys';

type BoardCardProps = {
  card: Card;
  moveOptions: CardMoveOption[];
  actions: BoardActions;
  onDelete: () => void;
};

export function BoardCard({ card, moveOptions, actions, onDelete }: BoardCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const requestFocus = useRequestFocus();
  const editButtonRef = useFocusTarget<HTMLButtonElement>(focusTargetKeys.editButton(card.id));
  const moveButtonRef = useFocusTarget<HTMLButtonElement>(focusTargetKeys.moveButton(card.id));
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  function finishEditing() {
    setIsEditing(false);
    requestFocus(focusTargetKeys.editButton(card.id));
  }

  function moveCard(move: CardMove) {
    actions.moveCard(move);
    requestFocus(focusTargetKeys.moveButton(card.id));
  }

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
            finishEditing();
          }}
          onCancel={finishEditing}
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
            <button
              type="button"
              ref={editButtonRef}
              aria-label={`Edit ${card.title}`}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button type="button" aria-label={`Delete ${card.title}`} onClick={onDelete}>
              Delete
            </button>
            <CardMoveMenu cardTitle={card.title} options={moveOptions} onMove={moveCard} toggleRef={moveButtonRef} />
          </div>
        </>
      )}
    </li>
  );
}
