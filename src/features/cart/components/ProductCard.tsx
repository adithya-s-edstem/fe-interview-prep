import { useId } from 'react';
import { formatCents } from '../domain/formatCents';
import type { Product } from '../domain/Product';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const titleId = useId();
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <img className={styles.image} src={product.thumbnail} alt={product.title} width={96} height={96} />
      <h3 id={titleId} className={styles.title}>
        {product.title}
      </h3>
      <p className={styles.price}>{formatCents(product.priceCents)}</p>
      <p className={styles.stock}>{product.stock} in stock</p>
      <button
        type="button"
        className={styles.addButton}
        aria-label={`Add ${product.title} to cart`}
        onClick={() => onAdd(product)}
      >
        Add to cart
      </button>
    </article>
  );
}
