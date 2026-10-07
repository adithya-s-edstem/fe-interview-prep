import { useId } from 'react';
import type { CartItem } from '../domain/CartItem';
import { formatCents } from '../domain/formatCents';
import styles from './CartItemRow.module.css';

type CartItemRowProps = {
  item: CartItem;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
};

export function CartItemRow({ item: { product, quantity }, onQuantityChange, onRemove }: CartItemRowProps) {
  const titleId = useId();
  return (
    <li className={styles.row} aria-labelledby={titleId}>
      <span id={titleId} className={styles.title}>
        {product.title}
      </span>
      <span className={styles.price}>{formatCents(product.priceCents)}</span>
      <span className={styles.quantityControls}>
        <button
          type="button"
          aria-label={`Decrease quantity of ${product.title}`}
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(product.id, quantity - 1)}
        >
          −
        </button>
        <span>Quantity {quantity}</span>
        <button
          type="button"
          aria-label={`Increase quantity of ${product.title}`}
          disabled={quantity >= product.stock}
          onClick={() => onQuantityChange(product.id, quantity + 1)}
        >
          +
        </button>
      </span>
      <button type="button" aria-label={`Remove ${product.title}`} onClick={() => onRemove(product.id)}>
        Remove
      </button>
    </li>
  );
}
