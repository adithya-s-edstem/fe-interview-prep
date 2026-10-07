import { describe, expect, it } from 'vitest';
import { visibleWidgets } from './visibleWidgets';

describe('visibleWidgets', () => {
  it('keeps the chosen order and leaves out hidden widgets', () => {
    expect(visibleWidgets(['recentOrders', 'sales', 'activeUsers'], ['sales'])).toEqual([
      'recentOrders',
      'activeUsers',
    ]);
  });

  it('shows every widget when none is hidden', () => {
    expect(visibleWidgets(['sales', 'activeUsers', 'recentOrders'], [])).toEqual([
      'sales',
      'activeUsers',
      'recentOrders',
    ]);
  });
});
