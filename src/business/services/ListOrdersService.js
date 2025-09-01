import { OrderRepository } from "../../data/repositories/OrderRepository.js";

export async function listOrders() {
  const repo = OrderRepository();
  return await repo.findAll();
}
