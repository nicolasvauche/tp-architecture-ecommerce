import { createApp } from "./app.js";
import { logger } from "../../shared/logger.js";

const app = createApp();
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`HTTP server listening on http://localhost:${port}`));
