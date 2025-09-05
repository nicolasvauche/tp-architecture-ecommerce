import axios from "axios";
import { OrdersRepository } from "../repositories/orders.repository.js";
import { generateOrderNumber } from "../utils/orderNumber.js";

export class OrdersService {
  constructor({
    repo = new OrdersRepository(),
    cartUrl = process.env.CART_URL ?? "http://localhost:4002",
    timeout = parseInt(process.env.TIMEOUT_MS ?? "5000", 10),
  } = {}) {
    this.repo = repo;
    this.http = axios.create({ baseURL: cartUrl, timeout });
  }

  async checkout() {
    const cart = await this.fetchCart();
    if (!cart.items?.length) {
      const err = new Error("Cart is empty");
      err.statusCode = 400;
      throw err;
    }

    const currency =
      cart.total?.currency ?? cart.items[0]?.unitPrice?.currency ?? "EUR";
    const totalAmount = Number(cart.total?.amount ?? 0);
    const createdAt = new Date().toISOString();
    const number = generateOrderNumber();

    const lines = cart.items.map((it) => ({
      productId: String(it.productId),
      quantity: Number(it.quantity),
      unitAmount: Number(it.unitPrice?.amount ?? 0),
      lineTotal: Number(
        it.lineTotal?.amount ??
          Number(it.unitPrice?.amount ?? 0) * Number(it.quantity)
      ),
    }));

    const { id } = this.repo.createOrder({
      number,
      totalAmount,
      currency,
      createdAt,
      lines,
    });

    try {
      await this.http.delete("/cart");
    } catch {
      // pas de throw ici : la commande est créée quoi qu'il arrive
    }

    return this.repo.getById(id);
  }

  async fetchCart() {
    try {
      const { data } = await this.http.get("/");
      return data;
    } catch (e) {
      const err = new Error("Unable to reach cart service");
      err.statusCode = 502;
      throw err;
    }
  }

  getById(id) {
    const order = this.repo.getById(id);
    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      throw err;
    }
    return order;
  }

  list({ limit = 20, offset = 0 } = {}) {
    return this.repo.list({ limit, offset });
  }
}
