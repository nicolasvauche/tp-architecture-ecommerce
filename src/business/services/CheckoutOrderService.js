import { CartRepository } from "../../data/repositories/CartRepository.js";
import { OrderRepository } from "../../data/repositories/OrderRepository.js";

function nowIso() {
  return new Date().toISOString();
}

export async function checkoutOrder() {
  const cartRepo = CartRepository();
  const orderRepo = OrderRepository();

  const cart = await cartRepo.get();
  if (!cart.items.length) throw new Error("Cart is empty");

  const created = await orderRepo.createFromCart({
    items: cart.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      price: i.price,
    })),
    total: cart.total,
    createdAt: nowIso(),
  });

  /* await cartRepo.clear(); */

  return created;
}
