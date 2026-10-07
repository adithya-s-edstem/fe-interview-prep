import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useId, useState } from 'react';
import type { Board } from '../domain/Board';
import type { Card, CardId } from '../domain/Card';
import { cardsInColumn } from '../domain/cardsInColumn';
import { columnCardLimits } from '../domain/columnCardLimits';
import type { ColumnId } from '../domain/ColumnId';
import { columnTitles } from '../domain/columnTitles';
import { isColumnFull } from '../domain/isColumnFull';
import { listCardMoves } from '../domain/listCardMoves';
import type { BoardActions } from '../hooks/BoardActions';
import { useFocusTarget } from '../hooks/useFocusTarget';
import { useRequestFocus } from '../hooks/useRequestFocus';
import { BoardCard } from './BoardCard';
import styles from './BoardColumn.module.css';
import { cardCountLabel } from './cardCountLabel';
import { CardForm } from './CardForm';
import { focusTargetKeys } from './focusTargetKeys';

type BoardColumnProps = {
  column: ColumnId;
  board: Board;
  actions: BoardActions;
};

export function BoardColumn({ column, board, actions }: BoardColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const { setNodeRef } = useDroppable({ id: column });
  const headingId = useId();
  const title = columnTitles[column];
  const cards = cardsInColumn(board, column);
  const requestFocus = useRequestFocus();
  const addButtonRef = useFocusTarget<HTMLButtonElement>(focusTargetKeys.addButton(column));

  function deleteCard(cardId: CardId, nextCard: Card | undefined) {
    actions.deleteCard(cardId);
    requestFocus(nextCard ? focusTargetKeys.editButton(nextCard.id) : focusTargetKeys.addButton(column));
  }

  function finishAdding(focusTargetKey: string) {
    setIsAddingCard(false);
    requestFocus(focusTargetKey);
  }

  return (
    <section className={styles.column} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <span className={styles.count}>{cardCountLabel(cards.length, columnCardLimits[column])}</span>
      </header>
      <SortableContext items={board.columns[column]} strategy={verticalListSortingStrategy}>
        <ul ref={setNodeRef} className={styles.cards}>
          {cards.map((card, index) => (
            <BoardCard
              key={card.id}
              card={card}
              moveOptions={listCardMoves(board, card.id)}
              actions={actions}
              onDelete={() => deleteCard(card.id, cards.at(index + 1))}
            />
          ))}
        </ul>
      </SortableContext>
      {isAddingCard ? (
        <CardForm
          submitLabel="Add"
          onSubmit={(input) => finishAdding(focusTargetKeys.editButton(actions.addCard({ input, column })))}
          onCancel={() => finishAdding(focusTargetKeys.addButton(column))}
        />
      ) : (
        <button
          type="button"
          ref={addButtonRef}
          aria-label={`Add card to ${title}`}
          disabled={isColumnFull(board, column)}
          onClick={() => setIsAddingCard(true)}
        >
          + Add card
        </button>
      )}
    </section>
  );
}
