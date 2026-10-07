import { memo } from 'react';
import { RecentOrdersWidget } from '../components/RecentOrdersWidget';
import type { DashboardSnapshot, RecentOrder } from '../domain/DashboardSnapshot';
import { useDashboardSlice } from '../hooks/useDashboardSlice';

function selectRecentOrders(snapshot: DashboardSnapshot): RecentOrder[] {
  return snapshot.recentOrders;
}

export const RecentOrdersWidgetContainer = memo(function RecentOrdersWidgetContainer() {
  return <RecentOrdersWidget orders={useDashboardSlice(selectRecentOrders)} />;
});
