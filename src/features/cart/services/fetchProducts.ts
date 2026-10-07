import { z } from 'zod';
import type { Product } from '../domain/Product';

export const PRODUCTS_URL = 'https://dummyjson.com/products';

const productsResponseSchema = z.object({
  products: z.array(
    z
      .object({
        id: z.number(),
        title: z.string(),
        price: z.number(),
        thumbnail: z.string(),
        stock: z.number(),
      })
      .transform(({ price, ...product }): Product => ({ ...product, priceCents: Math.round(price * 100) })),
  ),
});

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL);
  const { products } = productsResponseSchema.parse(await response.json());
  return products;
}
