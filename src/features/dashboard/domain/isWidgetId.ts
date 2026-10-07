import { widgetIds, type WidgetId } from './widgetIds';

export function isWidgetId(value: unknown): value is WidgetId {
  return widgetIds.some((widgetId) => widgetId === value);
}
