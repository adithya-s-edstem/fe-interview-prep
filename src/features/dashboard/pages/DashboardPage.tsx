import { SortableWidgetList } from '../components/SortableWidgetList';
import { WidgetCard } from '../components/WidgetCard';
import { WidgetToggles } from '../components/WidgetToggles';
import { widgetTitles } from '../components/widgetTitles';
import { visibleWidgets } from '../domain/visibleWidgets';
import { useDashboardPolling } from '../hooks/useDashboardPolling';
import { useWidgetLayoutStore } from '../hooks/useWidgetLayoutStore';
import { widgetContainers } from './widgetContainers';

export function DashboardPage() {
  useDashboardPolling();
  const order = useWidgetLayoutStore((layout) => layout.order);
  const hidden = useWidgetLayoutStore((layout) => layout.hidden);
  const toggleWidget = useWidgetLayoutStore((layout) => layout.toggleWidget);
  const moveWidget = useWidgetLayoutStore((layout) => layout.moveWidget);
  const shownWidgetIds = visibleWidgets(order, hidden);

  return (
    <>
      <h1>Live Dashboard</h1>
      <WidgetToggles hidden={hidden} onToggle={toggleWidget} />
      <SortableWidgetList widgetIds={shownWidgetIds} onMove={moveWidget}>
        {shownWidgetIds.map((widgetId) => {
          const WidgetContainer = widgetContainers[widgetId];
          return (
            <WidgetCard key={widgetId} widgetId={widgetId} title={widgetTitles[widgetId]}>
              <WidgetContainer />
            </WidgetCard>
          );
        })}
      </SortableWidgetList>
    </>
  );
}
