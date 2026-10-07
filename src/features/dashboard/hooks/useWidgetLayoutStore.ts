import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { widgetIds, type WidgetId } from '../domain/widgetIds';

type WidgetLayout = {
  order: WidgetId[];
  hidden: WidgetId[];
};

type WidgetLayoutActions = {
  toggleWidget: (widgetId: WidgetId) => void;
  moveWidget: (movedWidgetId: WidgetId, targetWidgetId: WidgetId) => void;
};

export const useWidgetLayoutStore = create<WidgetLayout & WidgetLayoutActions>()(
  persist(
    (set) => ({
      order: [...widgetIds],
      hidden: [],
      toggleWidget: (widgetId) =>
        set(({ hidden }) => ({
          hidden: hidden.includes(widgetId) ? hidden.filter((id) => id !== widgetId) : [...hidden, widgetId],
        })),
      moveWidget: (movedWidgetId, targetWidgetId) =>
        set(({ order }) => ({ order: arrayMove(order, order.indexOf(movedWidgetId), order.indexOf(targetWidgetId)) })),
    }),
    {
      name: 'fe-interview-prep:dashboard',
      version: 1,
      partialize: ({ order, hidden }): WidgetLayout => ({ order, hidden }),
    },
  ),
);
