import { config } from "./env.js";

const LEVELS = ["silent", "error", "warn", "info", "debug"];
const current = LEVELS.indexOf((config.logLevel ?? "info").toLowerCase());
const enabled = (lvl) => LEVELS.indexOf(lvl) <= current && lvl !== "silent";

function baseLog(level, ...args) {
  const ts = new Date().toISOString();
  (console[level] || console.log)(`[${ts}] [${level.toUpperCase()}]`, ...args);
}

export const logger = {
  level: LEVELS[current] ?? "info",
  error: (...args) => enabled("error") && baseLog("error", ...args),
  warn: (...args) => enabled("warn") && baseLog("warn", ...args),
  info: (...args) => enabled("info") && baseLog("info", ...args),
  debug: (...args) => enabled("debug") && baseLog("debug", ...args),

  with(meta = {}) {
    const prefix = Object.keys(meta).length
      ? `[${Object.entries(meta)
          .map(([k, v]) => `${k}=${v}`)
          .join(" ")}]`
      : "";
    return {
      error: (...args) => enabled("error") && baseLog("error", prefix, ...args),
      warn: (...args) => enabled("warn") && baseLog("warn", prefix, ...args),
      info: (...args) => enabled("info") && baseLog("info", prefix, ...args),
      debug: (...args) => enabled("debug") && baseLog("debug", prefix, ...args),
    };
  },
};
