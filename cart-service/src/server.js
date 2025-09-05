import dotenv from "dotenv";
import app from "./app.js";
import { initDb } from "./db/sqlite.js";

dotenv.config();

const PORT = parseInt(process.env.PORT ?? "4002", 10);

initDb();

app.listen(PORT, () => {
  console.log(`Cart service listening on http://localhost:${PORT}`);
});
