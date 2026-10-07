import { describe, expect, it } from 'vitest';
import { itemToFocusAfterRemoving } from './itemToFocusAfterRemoving';
import { handCream, lipBalm } from './testProducts';

const lipBalmItem = { product: lipBalm, quantity: 1 };
const handCreamItem = { product: handCream, quantity: 1 };

describe('itemToFocusAfterRemoving', () => {
  it('picks the item after the removed one', () => {
    expect(itemToFocusAfterRemoving([lipBalmItem, handCreamItem], lipBalm.id)).toBe(handCreamItem);
  });

  it('picks the item before the removed one when the last item is removed', () => {
    expect(itemToFocusAfterRemoving([lipBalmItem, handCreamItem], handCream.id)).toBe(lipBalmItem);
  });

  it('picks nothing when the only item is removed', () => {
    expect(itemToFocusAfterRemoving([lipBalmItem], lipBalm.id)).toBeUndefined();
  });
});
