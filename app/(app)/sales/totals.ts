import { CartItem } from "./types";

export function getGrandTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

export function getTotalItems(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function getChange(
  total: number,
  cashReceived: number
): number {
  return cashReceived - total;
}