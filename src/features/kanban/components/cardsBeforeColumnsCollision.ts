import { closestCorners, pointerWithin, type CollisionDetection } from '@dnd-kit/core';
import { isColumnId } from '../domain/isColumnId';

export const cardsBeforeColumnsCollision: CollisionDetection = (args) => {
  const collisionsUnderPointer = pointerWithin(args);
  const cardsUnderPointer = collisionsUnderPointer.filter(({ id }) => !isColumnId(String(id)));
  if (cardsUnderPointer.length > 0) {
    return cardsUnderPointer;
  }
  if (collisionsUnderPointer.length > 0) {
    return collisionsUnderPointer;
  }
  return closestCorners(args);
};
