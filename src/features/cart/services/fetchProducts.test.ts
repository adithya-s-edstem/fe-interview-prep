import { describe, expect, it } from 'vitest';
import { fetchProducts } from './fetchProducts';

describe('fetchProducts', () => {
  it('returns each product with its name, image, stock and price in whole cents', async () => {
    const products = await fetchProducts();

    expect(products[2]).toEqual({
      id: 3,
      title: 'Mascara',
      priceCents: 999,
      thumbnail: 'https://cdn.example.test/mascara.png',
      stock: 99,
    });
  });
});
