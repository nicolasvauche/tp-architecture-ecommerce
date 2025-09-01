import { getCart } from "../../../business/services/GetCartService.js";
import { addToCart } from "../../../business/services/AddToCartService.js";
import { clearCart } from "../../../business/services/ClearCartService.js";
import { removeFromCart } from "../../../business/services/RemoveFromCartService.js";

export async function get(req, res, next) {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
}

export async function addItem(req, res, next) {
  try {
    const { productId, quantity } = req.body || {};
    const cart = await addToCart({ productId, quantity });
    res.status(201).json(cart);
  } catch (e) {
    next(e);
  }
}

export async function clear(req, res, next) {
  try {
    const cart = await clearCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const { productId } = req.params;
    const cart = await removeFromCart({ productId });
    res.json(cart);
  } catch (e) {
    next(e);
  }
}
