import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

const DB_PATH = process.env.SQLITE_DB ?? "var/cart.sqlite";
const INIT_SQL = path.join(root, "sql/001_init.sql");

let dbInstance = null;
export function getDb() {
  if (!dbInstance) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    dbInstance = new Database(DB_PATH);
  }
  return dbInstance;
}

export function initDb() {
  const db = getDb();
  const sql = fs.readFileSync(INIT_SQL, "utf8");
  db.exec(sql);
}

if (process.argv.includes("--init")) {
  initDb();
  console.log(`SQLite initialisé dans ${DB_PATH}`);
}
