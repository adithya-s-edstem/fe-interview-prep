import type { Product } from '../domain/Product';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.css';

type ProductListProps = {
  products: readonly Product[];
  onAdd: (product: Product) => void;
};

export function ProductList({ products, onAdd }: ProductListProps) {
  return (
    <section aria-labelledby="products-heading">
      <h2 id="products-heading">Products</h2>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </section>
  );
}
