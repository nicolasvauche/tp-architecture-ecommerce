import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const defaultPath =
  process.env.NODE_ENV === "test" ? "./var/test.sqlite" : "./var/dev.sqlite";

const SQLITE_PATH = process.env.SQLITE_PATH || defaultPath;
const absPath = path.resolve(process.cwd(), SQLITE_PATH);

fs.mkdirSync(path.dirname(absPath), { recursive: true });

export const db = new Database(absPath);
db.pragma("journal_mode = WAL");

export function runSqlFile(sqlFilePath) {
  const full = path.resolve(process.cwd(), sqlFilePath);
  const sql = fs.readFileSync(full, "utf8");
  db.exec(sql);
}
