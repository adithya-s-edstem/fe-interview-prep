import { describe, expect, it } from 'vitest';
import { fetchDashboardSnapshot } from './fetchDashboardSnapshot';

describe('mock dashboard API', () => {
  it('returns sales, active users and recent orders', async () => {
    const snapshot = await fetchDashboardSnapshot(new AbortController().signal);

    expect(snapshot.salesCents).toBeGreaterThan(0);
    expect(snapshot.activeUsers.length).toBeGreaterThan(0);
    expect(snapshot.recentOrders.length).toBeGreaterThan(0);
  });

  it('returns different values on two consecutive calls', async () => {
    const first = await fetchDashboardSnapshot(new AbortController().signal);
    const second = await fetchDashboardSnapshot(new AbortController().signal);

    const valuesOf = ({ salesCents, activeUsers, recentOrders }: typeof first) => ({
      salesCents,
      activeUsers: activeUsers.map(({ count }) => count),
      recentOrders,
    });
    expect(valuesOf(second)).not.toEqual(valuesOf(first));
  });
});
