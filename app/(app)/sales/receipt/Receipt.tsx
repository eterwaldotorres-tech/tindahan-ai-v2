"use client";

import { formatPeso } from "../currency";
import { ReceiptData } from "./types";

interface ReceiptProps {
  receipt: ReceiptData;
}

export default function Receipt({
  receipt,
}: ReceiptProps) {
  return (
    <div className="mx-auto w-full max-w-sm bg-white p-6 font-mono text-sm text-black">
      <div className="text-center border-b pb-4">
        <h1 className="text-xl font-bold">
          Tindahan AI
        </h1>

        <p>Your Friendly Neighborhood Store</p>

        <p className="mt-2 text-xs">
          Receipt #: {receipt.receiptNumber}
        </p>

        <p className="text-xs">
          {receipt.date.toLocaleString()}
        </p>
      </div>

      <div className="py-4 space-y-2">
        {receipt.items.map((item) => (
          <div key={item.productId}>
            <div className="font-semibold">
              {item.name}
            </div>

            <div className="flex justify-between text-xs">
              <span>
                {item.quantity} × {formatPeso(item.price)}
              </span>

              <span>
                {formatPeso(item.total)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{receipt.totalItems}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>
            {formatPeso(receipt.grandTotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Cash</span>
          <span>
            {formatPeso(receipt.cashReceived)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Change</span>
          <span>
            {formatPeso(receipt.change)}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 mt-6 text-center text-xs">
        <p>Thank you for shopping!</p>

        <p>Please come again.</p>
      </div>
    </div>
  );
}