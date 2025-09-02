import { resetDb } from "../helpers/resetDb.js";
import { checkoutOrder } from "../../src/business/services/CheckoutOrderService.js";
import { listOrders } from "../../src/business/services/ListOrdersService.js";
import { getOrderDetail } from "../../src/business/services/GetOrderDetailService.js";
import { addToCart } from "../../src/business/services/AddToCartService.js";
import { getCart } from "../../src/business/services/GetCartService.js";

describe("Unit — Orders services", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("checkoutOrder crée une commande et vide le panier", async () => {
    await addToCart({ productId: 1, quantity: 2 });
    const created = await checkoutOrder();
    expect(created).toHaveProperty("id", "O-0001");

    const all = await listOrders();
    expect(all.map((o) => o.id)).toContain("O-0001");

    const cart = await getCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBeCloseTo(0, 2);
  });

  it("checkoutOrder échoue si panier vide", async () => {
    await expect(checkoutOrder()).rejects.toThrow(/cart is empty/i);
  });

  it("getOrderDetail retourne null si inconnue", async () => {
    const found = await getOrderDetail({ orderId: "O-9999" });
    expect(found).toBeNull();
  });
});
