import { Product } from "@/lib/products";

interface CheckoutPanelProps {
  product: Product | undefined;
  quantity: number;
  total: number;
  onQuantityChange: (quantity: number) => void;
  onCheckout: () => void;
}

export default function CheckoutPanel({
  product,
  quantity,
  total,
  onQuantityChange,
  onCheckout,
}: CheckoutPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Checkout
      </h2>

      {!product ? (
        <p className="text-gray-500">
          Select a product to begin.
        </p>
      ) : (
        <>
          <div className="space-y-3">

            <div>
              <p className="text-gray-500">Product</p>

              <p className="text-xl font-bold text-slate-800">
                {product.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Price</p>

              <p className="text-xl font-bold text-blue-600">
                ₱{product.price}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">
                Quantity
              </p>

              <input
                type="number"
                min={1}
                max={product.quantity}
                value={quantity}
                onChange={(e) =>
                  onQuantityChange(Number(e.target.value))
                }
                className="w-full border rounded-lg p-3 text-black"
              />
            </div>

            <div className="border-t pt-4">

              <p className="text-gray-500">
                Total
              </p>

              <h3 className="text-3xl font-bold text-green-600">
                ₱{total}
              </h3>

            </div>

            <button
              onClick={onCheckout}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition"
            >
              Record Sale
            </button>

          </div>
        </>
      )}
    </div>
  );
}