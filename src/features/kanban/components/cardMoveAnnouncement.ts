import type { Card } from '../domain/Card';
import type { CardMove } from '../domain/CardMove';
import { columnTitles } from '../domain/columnTitles';

export function cardMoveAnnouncement(card: Card, { toColumn, toIndex }: CardMove): string {
  return `Moved ${card.title} to ${columnTitles[toColumn]}, position ${toIndex + 1}.`;
}
