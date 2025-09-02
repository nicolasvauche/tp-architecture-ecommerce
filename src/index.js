import "dotenv/config";
import app from "./presentation/http/app.js";

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.APP_PORT || process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HTTP up on http://localhost:${PORT} (env=${NODE_ENV})`);
});
