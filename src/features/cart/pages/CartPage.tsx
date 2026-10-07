import { CartPanel } from '../components/CartPanel';
import { ProductList } from '../components/ProductList';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import styles from './CartPage.module.css';

export function CartPage() {
  const { data: products = [] } = useProducts();
  const { cartItems, totals, discountCode, add, setQuantity, remove, applyDiscountCode } = useCart();

  return (
    <>
      <h1>Shopping Cart</h1>
      <div className={styles.layout}>
        <ProductList products={products} onAdd={add} />
        <CartPanel
          cartItems={cartItems}
          totals={totals}
          discountCode={discountCode}
          onQuantityChange={setQuantity}
          onRemove={remove}
          onApplyDiscountCode={applyDiscountCode}
        />
      </div>
    </>
  );
}
