export interface SaleItemDocument {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface SaleDocument {
  id: string;
  createdAt?: unknown;

  items: SaleItemDocument[];

  subtotal: number;
  total: number;

  cashReceived: number;
  change: number;
}

export interface SaleHistoryItem {
  id: string;
  soldAt: Date | null;

  itemCount: number;

  subtotal: number;
  total: number;

  cashReceived: number;
  change: number;

  sale: SaleDocument;
}