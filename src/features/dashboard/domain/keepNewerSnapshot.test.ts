import { describe, expect, it } from 'vitest';
import { buildDashboardSnapshot } from '@/test/buildDashboardSnapshot';
import { keepNewerSnapshot } from './keepNewerSnapshot';

const earlier = buildDashboardSnapshot({ generatedAt: '2026-10-07T10:00:00.000Z', salesCents: 100 });
const later = buildDashboardSnapshot({ generatedAt: '2026-10-07T10:00:05.000Z', salesCents: 200 });

describe('keepNewerSnapshot', () => {
  it('takes the incoming snapshot when nothing is shown yet', () => {
    expect(keepNewerSnapshot(undefined, earlier)).toBe(earlier);
  });

  it('replaces the shown snapshot with a newer one', () => {
    expect(keepNewerSnapshot(earlier, later)).toBe(later);
  });

  it('keeps the shown snapshot when a late, older response arrives', () => {
    expect(keepNewerSnapshot(later, earlier)).toBe(later);
  });
});
