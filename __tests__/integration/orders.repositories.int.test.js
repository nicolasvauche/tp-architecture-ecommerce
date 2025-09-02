import { resetDb } from "../helpers/resetDb.js";
import { OrderRepository } from "../../src/data/repositories/OrderRepository.js";
import { CartRepository } from "../../src/data/repositories/CartRepository.js";
import { ProductRepository } from "../../src/data/repositories/ProductRepository.js";

describe("Integration — OrderRepository & CartRepository", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("createFromCart persiste et findById retrouve la commande", async () => {
    const prodRepo = ProductRepository();
    const cartRepo = CartRepository();
    const orderRepo = OrderRepository();

    const p = await prodRepo.findById(1);
    expect(p).toBeTruthy();

    await cartRepo.addItem({ productId: p.id, quantity: 1 });

    const cart = await cartRepo.get();

    const created = await orderRepo.createFromCart({
      items: cart.items,
      total: cart.total,
      createdAt: "2025-01-01T00:00:00.000Z",
    });

    const again = await orderRepo.findById(created.id);
    expect(again).toEqual(created);
  });

  it("findAll retourne la liste des commandes (vide au départ)", async () => {
    const orderRepo = OrderRepository();
    const all = await orderRepo.findAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all).toHaveLength(0);
  });
});
