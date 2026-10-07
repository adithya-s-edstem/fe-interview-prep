import { http, HttpResponse } from 'msw';
import { PRODUCTS_URL } from './fetchProducts';

const products = [
  { id: 1, title: 'Lip Balm', price: 0.1, thumbnail: 'https://cdn.example.test/lip-balm.png', stock: 5 },
  { id: 2, title: 'Hand Cream', price: 0.2, thumbnail: 'https://cdn.example.test/hand-cream.png', stock: 2 },
  { id: 3, title: 'Mascara', price: 9.99, thumbnail: 'https://cdn.example.test/mascara.png', stock: 99 },
];

export const cartHandlers = [
  http.get(PRODUCTS_URL, () => HttpResponse.json({ products, total: products.length, skip: 0, limit: 30 })),
];
