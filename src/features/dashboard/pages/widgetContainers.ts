import type { ComponentType } from 'react';
import type { WidgetId } from '../domain/widgetIds';
import { ActiveUsersWidgetContainer } from './ActiveUsersWidgetContainer';
import { RecentOrdersWidgetContainer } from './RecentOrdersWidgetContainer';
import { SalesWidgetContainer } from './SalesWidgetContainer';

export const widgetContainers: Record<WidgetId, ComponentType> = {
  sales: SalesWidgetContainer,
  activeUsers: ActiveUsersWidgetContainer,
  recentOrders: RecentOrdersWidgetContainer,
};
