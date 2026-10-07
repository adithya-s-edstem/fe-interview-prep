import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';
import { isWidgetId } from '../domain/isWidgetId';
import type { WidgetId } from '../domain/widgetIds';
import styles from './SortableWidgetList.module.css';

type SortableWidgetListProps = {
  widgetIds: WidgetId[];
  onMove: (movedWidgetId: WidgetId, targetWidgetId: WidgetId) => void;
  children: ReactNode;
};

const dragStartDistancePx = 5;

export function SortableWidgetList({ widgetIds, onMove, children }: SortableWidgetListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: dragStartDistancePx } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function moveDroppedWidget({ active, over }: DragEndEvent) {
    if (isWidgetId(active.id) && isWidgetId(over?.id) && active.id !== over.id) {
      onMove(active.id, over.id);
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={moveDroppedWidget}>
      <SortableContext items={widgetIds} strategy={rectSortingStrategy}>
        <div className={styles.grid}>{children}</div>
      </SortableContext>
    </DndContext>
  );
}
