import { CartItem } from "./types";

export type CheckoutResult = {
  saleId: string;
  createdAt: Date;
  total: number;
  cashReceived: number;
  change: number;
  items: CartItem[];
};