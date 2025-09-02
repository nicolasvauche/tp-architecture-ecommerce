export async function resetDb() {
  const driver = (process.env.DATA_DRIVER || "memory").toLowerCase();

  if (driver === "sqlite") {
    const { runSqlFile } = await import("../../src/data/sqlite/db.js");
    runSqlFile("src/data/sqlite/reset.sql");
    runSqlFile("src/data/sqlite/schema.sql");
    runSqlFile("src/data/sqlite/seed.sql");
    return;
  }

  const { resetMemoryDb } = await import("../../src/data/memory/state.js");
  resetMemoryDb();
}
