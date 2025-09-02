import { config } from "./env.js";

const LEVELS = ["debug", "info", "warn", "error", "silent"];

function shouldLog(currentLevel, msgLevel) {
  const current = LEVELS.indexOf(currentLevel ?? "info");
  const incoming = LEVELS.indexOf(msgLevel);
  if (current === -1) return true;
  if (incoming === -1) return true;
  return incoming >= current;
}

function ts() {
  return new Date().toISOString();
}

export function createLogger(
  level = config.logLevel ?? "info",
  baseContext = {}
) {
  const log = (msgLevel, msg, ctx) => {
    if (!shouldLog(level, msgLevel)) return;

    const context = { ...baseContext, ...(ctx || {}) };
    const hasCtx = context && Object.keys(context).length > 0;
    const line = `[${ts()}] ${msgLevel.toUpperCase()}: ${msg}`;

    switch (msgLevel) {
      case "debug":
        hasCtx ? console.debug(line, context) : console.debug(line);
        break;
      case "info":
        hasCtx ? console.info(line, context) : console.info(line);
        break;
      case "warn":
        hasCtx ? console.warn(line, context) : console.warn(line);
        break;
      case "error":
        hasCtx ? console.error(line, context) : console.error(line);
        break;
      default:
        hasCtx ? console.log(line, context) : console.log(line);
    }
  };

  return {
    level,
    debug: (msg, ctx) => log("debug", msg, ctx),
    info: (msg, ctx) => log("info", msg, ctx),
    warn: (msg, ctx) => log("warn", msg, ctx),
    error: (msg, ctx) => log("error", msg, ctx),

    child(extraCtx = {}) {
      return createLogger(level, { ...baseContext, ...extraCtx });
    },

    stream: {
      write: (message) => log("info", String(message).trim()),
    },
  };
}

export const logger = createLogger(config.logLevel);
