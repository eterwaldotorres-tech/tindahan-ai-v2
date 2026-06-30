"use client";

import { CartItem } from "./types";

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
  loading: boolean;
}

export default function CartSummary({
  items,
  onCheckout,
  loading,
}: CartSummaryProps) {
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const grandTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Order Summary
      </h2>

      <div className="flex justify-between text-gray-700">
        <span>Total Items</span>
        <span className="font-semibold">{totalItems}</span>
      </div>

      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>Grand Total</span>
        <span>₱{grandTotal}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={items.length === 0 || loading}
        className="w-full rounded-lg bg-green-600 p-3 text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}