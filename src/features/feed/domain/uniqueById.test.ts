import { describe, expect, it } from 'vitest';
import { uniqueById } from './uniqueById';

describe('uniqueById', () => {
  it('keeps the first item for every repeated id, in the original order', () => {
    const items = [
      { id: 1, label: 'first' },
      { id: 2, label: 'second' },
      { id: 1, label: 'repeat' },
      { id: 3, label: 'third' },
    ];

    expect(uniqueById(items)).toEqual([
      { id: 1, label: 'first' },
      { id: 2, label: 'second' },
      { id: 3, label: 'third' },
    ]);
  });

  it('never returns a duplicate id and never drops an id from overlapping pages', () => {
    const overlappingPageIds = [
      [1, 2, 3],
      [3, 4, 5],
      [5, 6, 1],
    ].flat();

    const uniqueIds = uniqueById(overlappingPageIds.map((id) => ({ id }))).map(({ id }) => id);

    expect(new Set(uniqueIds).size).toBe(uniqueIds.length);
    expect(new Set(uniqueIds)).toEqual(new Set(overlappingPageIds));
  });
});
