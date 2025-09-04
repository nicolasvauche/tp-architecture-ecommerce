import { spawnSync } from "node:child_process";

export function resetSqliteTestDb() {
  const res = spawnSync(
    process.execPath,
    ["scripts/db-reset-sqlite.js"],
    {
      env: {
        ...process.env,
        NODE_ENV: "test",
        SQLITE_DB: "var/test.sqlite",
      },
      stdio: "inherit",
    }
  );
  if (res.status !== 0) {
    throw new Error("Failed to reset test SQLite DB");
  }
}
