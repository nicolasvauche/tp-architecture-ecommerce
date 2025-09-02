export function errorMiddleware(logger, config) {
  return (err, req, res, _next) => {
    logger?.error?.("Unhandled error", {
      message: err.message,
      stack: err.stack,
    });

    if (err.name === "DomainError") {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }

    res.status(500).json({
      error: "InternalServerError",
      message: config.logLevel === "debug" ? err.message : "Unexpected error",
    });
  };
}
