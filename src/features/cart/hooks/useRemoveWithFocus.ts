import { useRef } from 'react';
import type { CartItems } from '../domain/CartItem';
import { itemToFocusAfterRemoving } from '../domain/itemToFocusAfterRemoving';

export function useRemoveWithFocus(items: CartItems, onRemove: (productId: number) => void) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const removeButtons = useRef(new Map<number, HTMLButtonElement>());

  const removeButtonRef = (productId: number) => (button: HTMLButtonElement) => {
    removeButtons.current.set(productId, button);
    return () => {
      removeButtons.current.delete(productId);
    };
  };

  function removeAndMoveFocus(productId: number) {
    const itemToFocus = itemToFocusAfterRemoving(items, productId);
    onRemove(productId);
    const focusTarget = itemToFocus ? removeButtons.current.get(itemToFocus.product.id) : headingRef.current;
    focusTarget?.focus();
  }

  return { headingRef, removeButtonRef, removeAndMoveFocus };
}
