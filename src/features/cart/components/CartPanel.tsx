import type { CartItem } from '../domain/CartItem';
import type { CartTotals } from '../domain/CartTotals';
import { useRemoveWithFocus } from '../hooks/useRemoveWithFocus';
import { CartItemRow } from './CartItemRow';
import styles from './CartPanel.module.css';
import { CartSummary } from './CartSummary';
import { DiscountCodeForm } from './DiscountCodeForm';

type CartPanelProps = {
  cartItems: readonly CartItem[];
  totals: CartTotals;
  discountCode: string | null;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onApplyDiscountCode: (code: string) => void;
};

export function CartPanel({ cartItems, totals, discountCode, ...handlers }: CartPanelProps) {
  const { headingRef, removeButtonRef, removeAndMoveFocus } = useRemoveWithFocus(cartItems, handlers.onRemove);
  return (
    <section className={styles.panel} aria-labelledby="cart-heading">
      <h2 id="cart-heading" ref={headingRef} tabIndex={-1}>
        Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.items}>
            {cartItems.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                removeButtonRef={removeButtonRef(item.product.id)}
                onQuantityChange={handlers.onQuantityChange}
                onRemove={removeAndMoveFocus}
              />
            ))}
          </ul>
          <DiscountCodeForm appliedCode={discountCode} onApply={handlers.onApplyDiscountCode} />
          <CartSummary totals={totals} discountCode={discountCode} />
        </>
      )}
    </section>
  );
}
