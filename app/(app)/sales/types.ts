import { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutResult {
  success: boolean;
  message: string;
}

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

export function calculateItemCount(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}