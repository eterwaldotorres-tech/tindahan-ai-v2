"use client";

import { CartItem } from "./types";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

interface CartProps {
  items: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function Cart({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: CartProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Shopping Cart
        </h2>

        <p className="text-gray-500">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Shopping Cart
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                {item.product.name}
              </h3>

              <p className="text-gray-600 text-sm">
                ₱{item.product.price} each
              </p>

              <p className="font-semibold text-blue-600 mt-1">
                ₱{item.product.price * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrease(item.product.id!)}
                className="p-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                <FaMinus />
              </button>

              <span className="w-8 text-center font-semibold text-black">
                {item.quantity}
              </span>

              <button
                onClick={() => onIncrease(item.product.id!)}
                className="p-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                <FaPlus />
              </button>

              <button
                onClick={() => onRemove(item.product.id!)}
                className="ml-3 p-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}