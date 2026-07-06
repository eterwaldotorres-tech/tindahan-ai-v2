import type { ReceiptData } from "./types";
import type { SaleDocument } from "@/app/(app)/sales-history/types";

export function mapSaleToReceiptData(
  sale: SaleDocument
): ReceiptData {
  return {
    receiptNumber: sale.id,

    date: (sale.createdAt as { toDate(): Date }).toDate(),

    totalItems: sale.items.reduce(
      (total, item) => total + item.quantity,
      0
    ),

    grandTotal: sale.total,

    cashReceived: sale.cashReceived,

    change: sale.change,

    items: sale.items.map((item) => ({
      productId: item.productId,
      name: item.productName,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
    })),
  };
}