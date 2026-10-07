import { queryOptions } from '@tanstack/react-query';
import type { DashboardSnapshot } from '../domain/DashboardSnapshot';
import { keepNewerSnapshot } from '../domain/keepNewerSnapshot';
import { fetchDashboardSnapshot } from '../services/fetchDashboardSnapshot';

export const dashboardPollIntervalMs = 5_000;

export const dashboardQueryOptions = queryOptions({
  queryKey: ['dashboard'],
  queryFn: async ({ client, queryKey, signal }) => {
    const incoming = await fetchDashboardSnapshot(signal);
    return keepNewerSnapshot(client.getQueryData<DashboardSnapshot>(queryKey), incoming);
  },
  staleTime: dashboardPollIntervalMs,
});
