import { CartRepositoryInMemory } from "../memory/CartRepositoryInMemory.js";
import { CartRepositorySqlite } from "../sqlite/CartRepositorySqlite.js";

export function CartRepository() {
  const driver = (process.env.DATA_DRIVER || "memory").toLowerCase();
  if (driver === "sqlite") {
    return new CartRepositorySqlite();
  }
  return new CartRepositoryInMemory();
}
