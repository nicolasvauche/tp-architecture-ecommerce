import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export function createDb({ file }) {
  const db = new Database(file, { fileMustExist: false });

  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.pragma("foreign_keys = ON");

  return db;
}

export function runScript(db, absoluteSqlPath) {
  const sql = fs.readFileSync(absoluteSqlPath, "utf8");
  db.exec(sql);
}

export function withTransaction(db, fn) {
  const tx = db.transaction(fn);
  return tx();
}
