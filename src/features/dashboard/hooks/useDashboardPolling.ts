import { useQuery } from '@tanstack/react-query';
import { dashboardPollIntervalMs, dashboardQueryOptions } from './dashboardQueryOptions';

export function useDashboardPolling(): void {
  useQuery({
    ...dashboardQueryOptions,
    refetchInterval: dashboardPollIntervalMs,
    refetchIntervalInBackground: false,
  });
}
