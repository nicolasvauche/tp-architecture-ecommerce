import dotenv from "dotenv";
import fs from "node:fs";

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

const defaultLogLevel = isTest ? "silent" : "info";

export const config = {
  port: parseInt(process.env.PORT ?? (isTest ? "3001" : "3000"), 10),
  dataSource: process.env.DATA_SOURCE ?? (isTest ? "memory" : "sqlite"),
  sqliteDb:
    process.env.SQLITE_DB ?? (isTest ? "var/test.sqlite" : "var/dev.sqlite"),
  logLevel: process.env.LOG_LEVEL ?? defaultLogLevel,
};
