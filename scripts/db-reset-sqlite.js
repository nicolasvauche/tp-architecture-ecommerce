import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDb, runScript } from "../infrastructure/sqlite/db.js";
import { config } from "../infrastructure/shared/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = createDb({ file: config.sqliteDb });

const base = path.resolve(__dirname, "../infrastructure/sqlite");
runScript(db, path.join(base, "reset.sql"));
runScript(db, path.join(base, "schema.sql"));
runScript(db, path.join(base, "seed.sql"));

console.log("SQLite reset + seed OK.");
