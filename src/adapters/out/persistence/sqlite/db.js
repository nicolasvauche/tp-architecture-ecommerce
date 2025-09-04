import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = process.env.SQLITE_DB || "var/dev.sqlite";

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);

export function toRowMoney(m) {
  if (!m) return { amount: 0, currency: "EUR" };
  return { amount: m.amount ?? 0, currency: m.currency ?? "EUR" };
}
