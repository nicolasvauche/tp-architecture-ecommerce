import fs from "fs";
import dotenv from "dotenv";

if (fs.existsSync(".env.test")) {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

process.env.NODE_ENV ||= "test";
process.env.DATA_DRIVER ||= "memory";
