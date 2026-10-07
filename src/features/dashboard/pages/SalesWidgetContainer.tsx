import { memo } from 'react';
import { SalesWidget } from '../components/SalesWidget';
import type { DashboardSnapshot } from '../domain/DashboardSnapshot';
import { useDashboardSlice } from '../hooks/useDashboardSlice';

function selectSales(snapshot: DashboardSnapshot): number {
  return snapshot.salesCents;
}

export const SalesWidgetContainer = memo(function SalesWidgetContainer() {
  return <SalesWidget salesCents={useDashboardSlice(selectSales)} />;
});
