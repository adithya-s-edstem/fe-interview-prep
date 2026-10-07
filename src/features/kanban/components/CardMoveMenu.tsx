import { useState, type Ref } from 'react';
import type { CardMove } from '../domain/CardMove';
import type { CardMoveOption } from '../domain/CardMoveOption';
import styles from './CardMoveMenu.module.css';

type CardMoveMenuProps = {
  cardTitle: string;
  options: CardMoveOption[];
  onMove: (move: CardMove) => void;
  toggleRef: Ref<HTMLButtonElement>;
};

export function CardMoveMenu({ cardTitle, options, onMove, toggleRef }: CardMoveMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function chooseMove(move: CardMove) {
    setIsOpen(false);
    onMove(move);
  }

  return (
    <div className={styles.menu}>
      <button
        type="button"
        ref={toggleRef}
        aria-label={`Move ${cardTitle}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Move…
      </button>
      {isOpen && (
        <div role="group" aria-label={`Move ${cardTitle} options`} className={styles.options}>
          {options.map(({ label, move }) => (
            <button key={label} type="button" onClick={() => chooseMove(move)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
