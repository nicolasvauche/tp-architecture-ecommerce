import { DomainError } from "../../src/core/shared-kernel/errors/DomainError.js";

export default function errorMiddleware(logger) {
  const log =
    (logger?.with ? logger.with({ ctx: "error" }) : logger) ?? console;

  return (err, req, res, _next) => {
    const status =
      err.status ??
      err.httpStatus ??
      (err instanceof DomainError && guessDomainStatus(err)) ??
      guessByName(err?.name) ??
      500;

    const correlationId =
      req.headers["x-correlation-id"] ||
      req.id ||
      Math.random().toString(36).slice(2, 10);

    if (status >= 500) {
      log.error({
        status,
        correlationId,
        path: req.originalUrl,
        method: req.method,
        err,
      });
    } else {
      log.warn({
        status,
        correlationId,
        path: req.originalUrl,
        method: req.method,
        message: err?.message,
      });
    }

    const body = {
      error: err?.message || "Internal Server Error",
      code: err?.code ?? undefined,
      correlationId,
    };

    res.status(status).json(body);
  };
}

function guessDomainStatus(err) {
  const code = (err.code || "").toString().toLowerCase();

  if (/(not[_-]?found|unknown[_-]?id)/.test(code)) return 404;
  if (/(forbidden|not[_-]?allowed)/.test(code)) return 403;
  if (/(unauth|auth|token)/.test(code)) return 401;
  if (/(conflict|already|duplicate)/.test(code)) return 409;
  if (/(invalid|validation|format|range|quantity|sku|money)/.test(code))
    return 400;

  return 400;
}

function guessByName(name = "") {
  switch (name) {
    case "NotFoundError":
      return 404;
    case "ForbiddenError":
      return 403;
    case "UnauthorizedError":
    case "JsonWebTokenError":
      return 401;
    case "ConflictError":
      return 409;
    case "ValidationError":
      return 400;
    default:
      return undefined;
  }
}
