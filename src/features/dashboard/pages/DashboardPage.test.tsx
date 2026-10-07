import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { server } from '@/mocks/server';
import { buildDashboardSnapshot } from '@/test/buildDashboardSnapshot';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { DashboardSnapshot } from '../domain/DashboardSnapshot';
import { dashboardUrl } from '../services/dashboardUrl';

const pollIntervalMs = 5_000;
const slowerThanPollingMs = 12_000;
const widgetLayoutHeightPx = 200;

type RequestLog = { started: number; finished: number; inFlight: number; maxInFlight: number };

let requestLog: RequestLog;

function isDashboardRequest(request: Request): boolean {
  return new URL(request.url).pathname === dashboardUrl;
}

function logDashboardRequests() {
  requestLog = { started: 0, finished: 0, inFlight: 0, maxInFlight: 0 };
  server.events.on('request:start', ({ request }) => {
    if (!isDashboardRequest(request)) return;
    requestLog.started += 1;
    requestLog.inFlight += 1;
    requestLog.maxInFlight = Math.max(requestLog.maxInFlight, requestLog.inFlight);
  });
  server.events.on('request:end', ({ request }) => {
    if (!isDashboardRequest(request)) return;
    requestLog.finished += 1;
    requestLog.inFlight -= 1;
  });
}

function respondInTurn(snapshots: DashboardSnapshot[]) {
  let call = 0;
  server.use(
    http.get(dashboardUrl, () => {
      const snapshot = snapshots[Math.min(call, snapshots.length - 1)];
      call += 1;
      return HttpResponse.json(snapshot);
    }),
  );
}

function salesAt(generatedAt: string, salesCents: number): DashboardSnapshot {
  return buildDashboardSnapshot({ generatedAt, salesCents });
}

function setTabVisibility(visibilityState: DocumentVisibilityState) {
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: visibilityState });
  document.dispatchEvent(new Event('visibilitychange', { bubbles: true }));
}

function stubVerticalWidgetLayout() {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const position = this.parentElement ? Array.from(this.parentElement.children).indexOf(this) : 0;
    const top = position * widgetLayoutHeightPx;
    return DOMRect.fromRect({ x: 0, y: top, width: 300, height: widgetLayoutHeightPx - 20 });
  });
}

async function openDashboard() {
  vi.resetModules();
  const { DashboardPage } = await import('./DashboardPage');
  return renderWithProviders(<DashboardPage />);
}

function widgetTitlesInOrder(): string[] {
  return screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
}

function widget(name: string) {
  return screen.getByRole('region', { name });
}

describe('DashboardPage live data', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    logDashboardRequests();
  });

  afterEach(() => {
    server.events.removeAllListeners();
    setTabVisibility('visible');
    vi.useRealTimers();
  });

  it('shows the sales number, the active users chart and the recent orders list', async () => {
    respondInTurn([buildDashboardSnapshot()]);

    await openDashboard();

    expect(await within(widget('Sales')).findByText('$1,234.56')).toBeInTheDocument();
    expect(within(widget('Active users')).getByRole('figure', { name: /active users/i })).toBeInTheDocument();
    expect(within(widget('Recent orders')).getAllByRole('listitem')[0]).toHaveTextContent('Asha Menon');
  });

  it('requests new data about every 5 seconds while the tab is visible and updates the widgets', async () => {
    respondInTurn([
      salesAt('2026-10-07T10:00:00.000Z', 100_00),
      salesAt('2026-10-07T10:00:05.000Z', 200_00),
      salesAt('2026-10-07T10:00:10.000Z', 300_00),
    ]);
    await openDashboard();
    expect(await screen.findByText('$100.00')).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(pollIntervalMs);
    expect(await screen.findByText('$200.00')).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(pollIntervalMs);
    expect(await screen.findByText('$300.00')).toBeInTheDocument();
    expect(requestLog.started).toBe(3);
  });

  it('stops requesting while the tab is hidden and resumes when it is visible again', async () => {
    await openDashboard();
    await waitFor(() => expect(requestLog.finished).toBe(1));

    setTabVisibility('hidden');
    await vi.advanceTimersByTimeAsync(pollIntervalMs * 3);
    expect(requestLog.started).toBe(1);

    setTabVisibility('visible');
    await vi.advanceTimersByTimeAsync(pollIntervalMs);
    expect(requestLog.started).toBeGreaterThan(1);
  });

  it('keeps the newer data on screen when an older response arrives late', async () => {
    respondInTurn([salesAt('2026-10-07T10:00:05.000Z', 200_00), salesAt('2026-10-07T10:00:00.000Z', 100_00)]);
    await openDashboard();
    expect(await screen.findByText('$200.00')).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(pollIntervalMs);
    await waitFor(() => expect(requestLog.finished).toBe(2));

    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.queryByText('$100.00')).not.toBeInTheDocument();
  });

  it('keeps at most one request in flight when the API is slower than the polling interval', async () => {
    server.use(
      http.get(dashboardUrl, async () => {
        await delay(slowerThanPollingMs);
        return HttpResponse.json(buildDashboardSnapshot({ generatedAt: new Date().toISOString() }));
      }),
    );
    await openDashboard();

    await vi.advanceTimersByTimeAsync(slowerThanPollingMs * 3);

    expect(requestLog.started).toBeGreaterThan(1);
    expect(requestLog.maxInFlight).toBe(1);
  });
});

describe('DashboardPage widget layout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('removes a widget from the page when the user hides it', async () => {
    const user = userEvent.setup();
    await openDashboard();

    await user.click(screen.getByRole('checkbox', { name: 'Sales' }));

    expect(screen.queryByRole('region', { name: 'Sales' })).not.toBeInTheDocument();
    expect(widget('Active users')).toBeInTheDocument();
  });

  it('keeps a hidden widget hidden after a page refresh', async () => {
    const user = userEvent.setup();
    const firstVisit = await openDashboard();
    await user.click(screen.getByRole('checkbox', { name: 'Recent orders' }));
    firstVisit.unmount();

    await openDashboard();

    expect(screen.getByRole('checkbox', { name: 'Recent orders' })).not.toBeChecked();
    expect(screen.queryByRole('region', { name: 'Recent orders' })).not.toBeInTheDocument();
  });

  it('restores a hidden widget when the user shows it again', async () => {
    const user = userEvent.setup();
    await openDashboard();
    await user.click(screen.getByRole('checkbox', { name: 'Sales' }));

    await user.click(screen.getByRole('checkbox', { name: 'Sales' }));

    expect(await within(widget('Sales')).findByText(/^\$/)).toBeInTheDocument();
  });

  it('shows the widgets in the new order after the user moves one with the keyboard', async () => {
    const user = userEvent.setup();
    stubVerticalWidgetLayout();
    await openDashboard();

    await user.click(screen.getByRole('button', { name: 'Move Sales' }));
    await user.keyboard(' ');
    await user.keyboard('{ArrowDown}');
    await user.keyboard(' ');

    await waitFor(() => expect(widgetTitlesInOrder()).toEqual(['Active users', 'Sales', 'Recent orders']));
  });

  it('keeps the rearranged order after a page refresh', async () => {
    const user = userEvent.setup();
    stubVerticalWidgetLayout();
    const firstVisit = await openDashboard();
    await user.click(screen.getByRole('button', { name: 'Move Recent orders' }));
    await user.keyboard(' ');
    await user.keyboard('{ArrowUp}');
    await user.keyboard(' ');
    await waitFor(() => expect(widgetTitlesInOrder()).toEqual(['Sales', 'Recent orders', 'Active users']));
    firstVisit.unmount();

    await openDashboard();

    expect(widgetTitlesInOrder()).toEqual(['Sales', 'Recent orders', 'Active users']);
  });
});
