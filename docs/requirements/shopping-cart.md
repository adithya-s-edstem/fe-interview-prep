# Q1 — Shopping Cart

Build a product list with a shopping cart. Branch `feature/q1-cart`. Suggested time: 15 minutes.

## Requirements

- **Q1-R1 Product list** — Show products from `https://dummyjson.com/products` with name, price, image and stock.
- **Q1-R2 Add to cart** — Add products to the cart.
- **Q1-R3 Change quantity** — Change the quantity of a cart item. A quantity can't exceed the product's stock.
- **Q1-R4 Remove** — Remove items from the cart.
- **Q1-R5 Totals** — Show the subtotal, an 18% tax and the total. Amounts always display correctly to 2 decimal places.
- **Q1-R6 Persistence** — The cart survives a page refresh.
- **Q1-R7 Empty state** — Show an empty-cart state.

## Acceptance criteria

- **Q1-AC1** Each product shows name, price, image and stock from the API.
- **Q1-AC2** Adding a product puts it in the cart with quantity 1; adding it again increases the quantity.
- **Q1-AC3** The quantity cannot be raised above the product's stock (control disabled or value clamped).
- **Q1-AC4** Removing an item takes it out of the cart and out of the totals.
- **Q1-AC5** Changing a quantity updates subtotal, tax and total immediately (same render, no reload).
- **Q1-AC6** Tax = 18% of subtotal; total = subtotal + tax; every amount is shown with exactly 2 decimals and no
  floating-point artefacts (e.g. `0.1 + 0.2` never shows as `0.30000000000000004`).
- **Q1-AC7** After a page refresh the cart contents and quantities are unchanged.
- **Q1-AC8** With no items the cart shows an empty-cart message instead of totals.
- **Q1-AC9** At least one automated test.

## Optional

Not required; only after all 5 core questions are done.

- **Q1-O1** A discount code field.
