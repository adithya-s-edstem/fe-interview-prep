import { useSuspenseQuery } from '@tanstack/react-query';
import type { DashboardSnapshot } from '../domain/DashboardSnapshot';
import { dashboardQueryOptions } from './dashboardQueryOptions';

export function useDashboardSlice<Slice>(selectSlice: (snapshot: DashboardSnapshot) => Slice): Slice {
  return useSuspenseQuery({ ...dashboardQueryOptions, select: selectSlice }).data;
}
