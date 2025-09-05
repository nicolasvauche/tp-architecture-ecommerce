import { nanoid } from "nanoid";

export function requestId() {
  return (req, res, next) => {
    const id = req.headers["x-request-id"] || nanoid();
    req.id = id;
    res.setHeader("x-request-id", id);
    next();
  };
}
