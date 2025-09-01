export function errorMiddleware(err, req, res, next) {
  const msg = String(err?.message || "Unexpected error");
  const isClientError =
    /Unknown product|quantity must be|productId is required|Cart is empty|orderId is required/i.test(
      msg
    );
  const status = isClientError ? 400 : 500;
  res.status(status).json({ message: msg });
}
