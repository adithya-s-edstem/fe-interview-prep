import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Profiler, Suspense } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '@/mocks/server';
import { buildDashboardSnapshot } from '@/test/buildDashboardSnapshot';
import { renderWithProviders } from '@/test/renderWithProviders';
import { widgetIds, type WidgetId } from '../domain/widgetIds';
import { useDashboardPolling } from '../hooks/useDashboardPolling';
import { dashboardUrl } from '../services/dashboardUrl';
import { widgetContainers } from './widgetContainers';

const pollIntervalMs = 5_000;

function DashboardPolling() {
  useDashboardPolling();
  return null;
}

function renderWidgetsCountingRenders() {
  const renderCounts: Record<WidgetId, number> = { sales: 0, activeUsers: 0, recentOrders: 0 };
  renderWithProviders(
    <>
      <DashboardPolling />
      {widgetIds.map((widgetId) => {
        const WidgetContainer = widgetContainers[widgetId];
        return (
          <Profiler key={widgetId} id={widgetId} onRender={() => (renderCounts[widgetId] += 1)}>
            <Suspense fallback={null}>
              <WidgetContainer />
            </Suspense>
          </Profiler>
        );
      })}
    </>,
  );
  return renderCounts;
}

describe('widgetContainers', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('re-renders only the widget whose data changed', async () => {
    const first = buildDashboardSnapshot({ generatedAt: '2026-10-07T10:00:00.000Z', salesCents: 100_00 });
    const salesOnlyChanged = { ...first, generatedAt: '2026-10-07T10:00:05.000Z', salesCents: 200_00 };
    const responses = [first, salesOnlyChanged];
    server.use(http.get(dashboardUrl, () => HttpResponse.json(responses.shift() ?? salesOnlyChanged)));
    const renderCounts = renderWidgetsCountingRenders();
    await screen.findByText('$100.00');
    const countsBeforeUpdate = { ...renderCounts };

    await vi.advanceTimersByTimeAsync(pollIntervalMs);
    await screen.findByText('$200.00');

    expect(renderCounts.sales).toBeGreaterThan(countsBeforeUpdate.sales);
    expect(renderCounts.activeUsers).toBe(countsBeforeUpdate.activeUsers);
    expect(renderCounts.recentOrders).toBe(countsBeforeUpdate.recentOrders);
  });
});
