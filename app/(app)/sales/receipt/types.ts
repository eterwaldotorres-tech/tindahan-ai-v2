export interface ReceiptItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ReceiptData {
  receiptNumber: string;
  date: Date;

  items: ReceiptItem[];

  totalItems: number;
  grandTotal: number;

  cashReceived: number;
  change: number;
}