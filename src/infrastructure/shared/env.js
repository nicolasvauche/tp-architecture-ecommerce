import dotenv from "dotenv";

dotenv.config();

function required(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return process.env[name];
}

export const config = {
  port: parseInt(process.env.PORT ?? "3000", 10),
  dataSource: process.env.DATA_SOURCE ?? "memory",
  sqliteDb: process.env.SQLITE_DB ?? "var/dev.sqlite",
  logLevel: process.env.LOG_LEVEL ?? "info",
};
