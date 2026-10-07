import { describe, expect, it } from 'vitest';
import { buildDashboardSnapshot } from '@/test/buildDashboardSnapshot';
import { isNewer } from './isNewer';

const earlier = buildDashboardSnapshot({ generatedAt: '2026-10-07T10:00:00.000Z' });
const later = buildDashboardSnapshot({ generatedAt: '2026-10-07T10:00:05.000Z' });

describe('isNewer', () => {
  it('treats a snapshot generated later as newer', () => {
    expect(isNewer(later, earlier)).toBe(true);
  });

  it('treats a snapshot generated earlier as not newer', () => {
    expect(isNewer(earlier, later)).toBe(false);
  });

  it('treats a snapshot generated at the same moment as not newer', () => {
    expect(isNewer(earlier, buildDashboardSnapshot({ generatedAt: earlier.generatedAt }))).toBe(false);
  });
});
