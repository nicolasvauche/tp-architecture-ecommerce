import { OrderRepositoryInMemory } from "../memory/OrderRepositoryInMemory.js";
import { OrderRepositorySqlite } from "../sqlite/OrderRepositorySqlite.js";

export function OrderRepository() {
  const driver = (process.env.DATA_DRIVER || "memory").toLowerCase();
  if (driver === "sqlite") {
    return new OrderRepositorySqlite();
  }
  return new OrderRepositoryInMemory();
}
