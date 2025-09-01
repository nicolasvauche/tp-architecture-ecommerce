import { OrderRepository } from "../../data/repositories/OrderRepository.js";

export async function getOrderDetail({ orderId }) {
  if (!orderId) throw new Error("orderId is required");
  const repo = OrderRepository();
  return await repo.findById(orderId);
}
