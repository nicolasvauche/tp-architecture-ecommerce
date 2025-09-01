import { resetDb } from "../helpers/resetDb.js";
import { addToCart } from "../../src/business/services/AddToCartService.js";
import { removeFromCart } from "../../src/business/services/RemoveFromCartService.js";
import { clearCart } from "../../src/business/services/ClearCartService.js";
import { getCart } from "../../src/business/services/GetCartService.js";

describe("Unit — Cart services", () => {
  beforeEach(() => resetDb());

  it("addToCart ajoute et cumule les quantités", async () => {
    await addToCart({ productId: "P-001", quantity: 1 });
    await addToCart({ productId: "P-001", quantity: 2 });
    const cart = await getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual(
      expect.objectContaining({ productId: "P-001", quantity: 3 })
    );
    expect(cart.total).toBeCloseTo(59.7, 2);
  });

  it("addToCart rejette un productId inconnu", async () => {
    await expect(
      addToCart({ productId: "P-XXX", quantity: 1 })
    ).rejects.toThrow(/Unknown product/i);
  });

  it("removeFromCart supprime un item", async () => {
    await addToCart({ productId: "P-001", quantity: 1 });
    await removeFromCart({ productId: "P-001" });
    const cart = await getCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBeCloseTo(0, 2);
  });

  it("clearCart vide le panier", async () => {
    await addToCart({ productId: "P-001", quantity: 2 });
    await clearCart();
    const cart = await getCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBeCloseTo(0, 2);
  });
});
