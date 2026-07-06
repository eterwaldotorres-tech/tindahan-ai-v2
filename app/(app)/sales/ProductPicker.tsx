"use client";

import { Product } from "@/lib/products";

interface ProductPickerProps {
  products: Product[];
  selectedId: string;
  quantity: number;
  onSelect: (id: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProductPicker({
  products,
  selectedId,
  quantity,
  onSelect,
  onQuantityChange,
  onAddToCart,
}: ProductPickerProps) {
  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Add Product
      </h2>

      <select
        className="w-full border rounded-lg p-3 text-black"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Product</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ₱{product.price}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700 space-y-1">
          <div>
            <strong>Price:</strong> ₱{selectedProduct.price}
          </div>

          <div>
            <strong>Available:</strong> {selectedProduct.quantity}
          </div>
        </div>
      )}

      <input
        type="number"
        min={1}
        max={selectedProduct?.quantity ?? 1}
        value={quantity}
        onChange={(e) =>
          onQuantityChange(Math.max(1, Number(e.target.value)))
        }
        className="w-full border rounded-lg p-3 text-black"
      />

      <button
        onClick={onAddToCart}
        disabled={!selectedProduct}
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        Add to Cart
      </button>
    </div>
  );
}