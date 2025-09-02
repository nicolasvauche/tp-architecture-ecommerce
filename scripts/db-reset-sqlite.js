import { runSqlFile } from "../src/data/sqlite/db.js";

console.log("Resetting SQLite database...");

runSqlFile("src/data/sqlite/schema.sql");
runSqlFile("src/data/sqlite/seed.sql");

console.log("Database reset done.");
