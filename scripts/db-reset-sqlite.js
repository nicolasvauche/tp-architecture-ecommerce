import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import dotenv from "dotenv";

const isTest = process.env.NODE_ENV === "test";
const CANDIDATES = isTest
  ? [".env.test.local", ".env.test", ".env.local", ".env"]
  : [".env.local", ".env"];

for (const file of CANDIDATES) {
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    break;
  }
}

const dbFile =
  process.env.SQLITE_DB ?? (isTest ? "var/test.sqlite" : "var/dev.sqlite");

if (isTest && /(?:^|\/)var\/dev\.sqlite$/.test(dbFile)) {
  console.error(
    `[db-reset] Sécurité: NODE_ENV=test mais SQLITE_DB="${dbFile}" pointe vers la base de dev. ` +
      `Définis SQLITE_DB=var/test.sqlite ou corrige ton .env.test.`
  );
  process.exit(1);
}

const baseDir = path.resolve("src/adapters/out/persistence/sqlite");
const files = {
  reset: path.join(baseDir, "reset.sql"),
  schema: path.join(baseDir, "schema.sql"),
  seed: path.join(baseDir, "seed.sql"),
};

function runSqlFile(db, filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[db-reset] fichier manquant : ${filePath}`);
    return;
  }
  const sql = fs.readFileSync(filePath, "utf-8");
  db.exec(sql);
  console.log(`[db-reset] exécuté : ${path.basename(filePath)}`);
}

function main() {
  fs.mkdirSync(path.dirname(dbFile), { recursive: true });

  console.log(
    `[db-reset] NODE_ENV=${
      process.env.NODE_ENV ?? "undefined"
    } | base=${dbFile}`
  );

  const db = new Database(dbFile);
  try {
    runSqlFile(db, files.reset);
    runSqlFile(db, files.schema);
    runSqlFile(db, files.seed);
    console.log("[db-reset] terminé ✅");
  } catch (err) {
    console.error("[db-reset] erreur :", err);
    process.exit(1);
  } finally {
    db.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
