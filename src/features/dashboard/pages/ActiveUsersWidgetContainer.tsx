import { memo } from 'react';
import { ActiveUsersWidget } from '../components/ActiveUsersWidget';
import type { ActiveUsersSample, DashboardSnapshot } from '../domain/DashboardSnapshot';
import { useDashboardSlice } from '../hooks/useDashboardSlice';

function selectActiveUsers(snapshot: DashboardSnapshot): ActiveUsersSample[] {
  return snapshot.activeUsers;
}

export const ActiveUsersWidgetContainer = memo(function ActiveUsersWidgetContainer() {
  return <ActiveUsersWidget samples={useDashboardSlice(selectActiveUsers)} />;
});
