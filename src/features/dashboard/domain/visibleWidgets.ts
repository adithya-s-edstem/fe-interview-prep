import type { WidgetId } from './widgetIds';

export function visibleWidgets(order: readonly WidgetId[], hidden: readonly WidgetId[]): WidgetId[] {
  return order.filter((widgetId) => !hidden.includes(widgetId));
}
