import dotenv from "dotenv";
import fs from "node:fs";

const MODE = process.env.NODE_ENV ?? "development";

const files = [
  ".env",
  ".env.local",
  ...(MODE === "test" ? [".env.test", ".env.test.local"] : []),
];

for (const file of files) {
  if (fs.existsSync(file)) {
    dotenv.config({ path: file, override: true, quiet: true });
  }
}

const defaultLogLevel = MODE === "test" ? "silent" : "info";

export const config = {
  port: parseInt(process.env.PORT ?? "3000", 10),
  dataSource: process.env.DATA_SOURCE ?? "memory",
  sqliteDb: process.env.SQLITE_DB ?? "var/dev.sqlite",
  logLevel: process.env.LOG_LEVEL ?? defaultLogLevel,
};
