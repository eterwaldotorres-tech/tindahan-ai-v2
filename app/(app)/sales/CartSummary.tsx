"use client";

import { useEffect, useRef } from "react";
import { CartItem } from "./types";
import QuickCashButtons from "./QuickCashButtons";
import { getGrandTotal, getTotalItems } from "./totals";
import { formatPeso } from "./currency";



interface CartSummaryProps {
  items: CartItem[];
  cashReceived: number;
  onCashChange: (amount: number) => void;
  onCheckout: () => void;
  loading: boolean;
}

export default function CartSummary({
  items,
  cashReceived,
  onCashChange,
  onCheckout,
  loading,
}: CartSummaryProps) {
  const cashInputRef = useRef<HTMLInputElement>(null);

  const hasItems = items.length > 0;

  useEffect(() => {
    if (hasItems) {
      cashInputRef.current?.focus();
      cashInputRef.current?.select();
    }
  }, [hasItems]);

  const totalItems = getTotalItems(items);
  const grandTotal = getGrandTotal(items);

  const change = cashReceived - grandTotal;

  const canCheckout =
    hasItems &&
    cashReceived >= grandTotal &&
    !loading;

    <QuickCashButtons
  total={grandTotal}
  onSelect={(amount) => onCashChange(amount)}
  
/>

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="flex justify-between text-gray-700">
        <span>Total Items</span>
        <span className="font-semibold">
          {totalItems}
        </span>
      </div>

      <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-900">
        <span>Grand Total</span>
        <span>{formatPeso(grandTotal)}</span>
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700">
          Cash Received
        </label>

        <input
          ref={cashInputRef}
          type="number"
          min={0}
          value={cashReceived || ""}
          onChange={(e) =>
          onCashChange(Number(e.target.value))
          }
          onKeyDown={(e) => {
             if (e.key === "Enter" && canCheckout) {
             e.preventDefault();
              onCheckout();
        }
        }}
         className="w-full rounded-lg border p-3 text-black"
        placeholder="Enter cash amount"
          />
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">
            Change
          </span>

          <span
            className={`font-bold text-xl ${
              change >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formatPeso(Math.abs(change))}
          </span>
        </div>

        {cashReceived > 0 && change < 0 && (
          <p className="mt-2 text-sm text-red-600">
            Insufficient cash received.
          </p>
        )}
      </div>

      <button
        onClick={onCheckout}
        disabled={!canCheckout}
        className="w-full rounded-lg bg-green-600 p-3 text-white font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Complete Checkout"}
      </button>
    </div>
  );
}