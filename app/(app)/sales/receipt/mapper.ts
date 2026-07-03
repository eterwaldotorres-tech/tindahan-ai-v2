import { CheckoutResult } from "../checkout.types";
import { getTotalItems } from "../totals";

import { ReceiptData } from "./types";

export function mapCheckoutToReceipt(
  checkout: CheckoutResult
): ReceiptData {
  return {
    receiptNumber: checkout.saleId,

    date: checkout.createdAt,

    totalItems: getTotalItems(checkout.items),

    grandTotal: checkout.total,

    cashReceived: checkout.cashReceived,

    change: checkout.change,

    items: checkout.items.map((item) => ({
      productId: item.product.id ?? "",
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    })),
  };
}