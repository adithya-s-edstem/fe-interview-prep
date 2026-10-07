import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useId, useState } from 'react';
import type { Board } from '../domain/Board';
import { cardsInColumn } from '../domain/cardsInColumn';
import { columnCardLimits } from '../domain/columnCardLimits';
import type { ColumnId } from '../domain/ColumnId';
import { columnTitles } from '../domain/columnTitles';
import { isColumnFull } from '../domain/isColumnFull';
import { listCardMoves } from '../domain/listCardMoves';
import type { BoardActions } from '../hooks/BoardActions';
import { BoardCard } from './BoardCard';
import styles from './BoardColumn.module.css';
import { cardCountLabel } from './cardCountLabel';
import { CardForm } from './CardForm';

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
          {cards.map((card) => (
            <BoardCard key={card.id} card={card} moveOptions={listCardMoves(board, card.id)} actions={actions} />
          ))}
        </ul>
      </SortableContext>
      {isAddingCard ? (
        <CardForm
          submitLabel="Add"
          onSubmit={(input) => {
            actions.addCard({ input, column });
            setIsAddingCard(false);
          }}
          onCancel={() => setIsAddingCard(false)}
        />
      ) : (
        <button
          type="button"
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
