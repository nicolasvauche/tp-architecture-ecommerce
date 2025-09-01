import { listOrders } from "../../../business/services/ListOrdersService.js";
import { getOrderDetail } from "../../../business/services/GetOrderDetailService.js";
import { checkoutOrder } from "../../../business/services/CheckoutOrderService.js";

export async function list(req, res, next) {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (e) {
    next(e);
  }
}

export async function detail(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await getOrderDetail({ orderId });
    if (!order) return res.status(404).json({ message: "Not found" });
    res.json(order);
  } catch (e) {
    next(e);
  }
}

export async function checkout(req, res, next) {
  try {
    const order = await checkoutOrder();
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
}
