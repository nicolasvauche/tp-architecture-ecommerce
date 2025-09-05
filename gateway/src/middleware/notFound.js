export function notFound() {
  return (req, res, _next) => {
    res.status(404).json({
      error: {
        code: "GATEWAY_NOT_FOUND",
        message: `No route matches ${req.method} ${req.originalUrl}`,
      },
    });
  };
}
