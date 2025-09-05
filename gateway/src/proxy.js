import { createProxyMiddleware } from "http-proxy-middleware";

export function buildServiceProxy({ target, timeout, serviceName }) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: timeout,
    timeout,
    onProxyReq(proxyReq, req) {
      if (req.id) proxyReq.setHeader("x-request-id", req.id);
    },
    onError(err, req, res) {
      res.status(502).json({
        error: {
          code: "BAD_GATEWAY",
          message: `${serviceName} unreachable`,
          details:
            process.env.NODE_ENV === "development" ? String(err) : undefined,
        },
      });
    },
    selfHandleResponse: false,
  });
}
